#!/usr/bin/env python3
"""Verify local HTML anchors in OSB static export resolve to exported files.

python scripts/audit_static_links.py out
python scripts/audit_static_links.py exported-site.zip
No network access, extra dependencies, runtime credentials or link rewrites.
"""
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
import posixpath
import sys
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile


class AnchorCollector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.hrefs.extend(value for name, value in attrs if name == "href" and value is not None)


def resolve_anchor(source, href, files):
    href = href.strip()
    if not href or href.startswith(("#", "//")):
        return None
    url = urlsplit(href)
    if url.scheme or url.netloc or not url.path:
        return None
    path = unquote(url.path)
    if path.startswith("/"):
        name = path.lstrip("/")
    else:
        name = posixpath.normpath(posixpath.join(posixpath.dirname(source), path))
    if name == ".":
        name = ""
    if name == ".." or name.startswith("../"):
        return "path escapes static export: " + href
    candidates = [name, name.rstrip("/") + "/index.html", name.rstrip("/") + ".html"]
    if not name:
        candidates = ["index.html"]
    if not any(entry in files for entry in candidates):
        return "missing destination: " + href
    return None


def assert_unit_cases():
    files = {"index.html", "learning/index.html", "murugan-library/song/index.html", "the-manual.html"}
    assert resolve_anchor("learning/index.html", "/", files) is None
    assert resolve_anchor("index.html", "/learning/", files) is None
    assert resolve_anchor("index.html", "/murugan-library/song/?source=local#text", files) is None
    assert resolve_anchor("learning/index.html", "../the-manual.html", files) is None
    assert resolve_anchor("index.html", "https://example.org/test", files) is None
    assert resolve_anchor("index.html", "#section", files) is None
    assert resolve_anchor("index.html", "/not-found/", files) is not None
    assert resolve_anchor("index.html", "../../escape/", files) is not None


def audit(files, reader):
    pages = sorted(name for name in files if name.endswith(".html"))
    if len(pages) < 100:
        raise AssertionError("unexpectedly small OSB site: " + str(len(pages)))
    examined = 0
    missing = defaultdict(list)
    for page in pages:
        collector = AnchorCollector()
        collector.feed(reader(page))
        for href in collector.hrefs:
            issue = resolve_anchor(page, href, files)
            if issue:
                if len(missing[issue]) < 3:
                    missing[issue].append(page)
            else:
                item = href.strip()
                parsed = urlsplit(item)
                if item and not item.startswith(("#", "//")) and not parsed.scheme and not parsed.netloc and parsed.path:
                    examined += 1
    if examined <= 1000:
        raise AssertionError(f"too few local links in OSB export: {examined}")
    if missing:
        for issue, sources in sorted(missing.items())[:30]:
            print("FAIL:", issue, "examples:", ", ".join(sources), file=sys.stderr)
        raise AssertionError(f"{len(missing)} unresolved local link paths across {len(pages)} HTML pages")
    return len(pages), examined


def main():
    assert_unit_cases()
    target = Path(sys.argv[1] if len(sys.argv) > 1 else "out")
    if target.is_file() and target.suffix == ".zip":
        with ZipFile(target) as archive:
            files = {item.filename for item in archive.infolist() if not item.is_dir()}
            pages, checked = audit(files, lambda name: archive.read(name).decode("utf-8", errors="replace"))
    elif target.is_dir():
        files = {p.relative_to(target).as_posix() for p in target.rglob("*") if p.is_file()}
        pages, checked = audit(files, lambda name: (target / name).read_text(encoding="utf-8", errors="replace"))
    else:
        raise SystemExit("Expected export directory or ZIP: " + str(target))
    print(f"OSB_STATIC_LINKS_PASS: {pages} HTML pages and {checked} internal hrefs resolved; no missing destinations")


if __name__ == "__main__":
    main()
