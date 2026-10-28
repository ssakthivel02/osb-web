# OSB Tamil Murugan Library — Source-aware intake

**Status: content pending human approval; production HOLD.**

This is a new self-contained /murugan-library/ route in the existing OSB Academy app. It does NOT replace or rewrite existing navigation links, DNS, published site assets or the separate OmSaravanaBhava site. The new pages are noindex pending approval.

- **12 complete Tiruppugazh Tamil texts**: original OmSaravanaBhava source-linked reader files 0006 through 0017. Imported as real Unicode verse text without AI reconstruction. The source's internal record says song 0006 was manually checked before original publication; the governed inventory recognizes all twelve as existing source-linked records. Cross-site publication still requires rights/editorial review.
- **Kanda Sashti Kavasam**: only the source-linked reviewed opening extract from the previous user-provided compilation. Not a complete critical edition.
- **16 classical/related books**: titles only; verse body withheld pending verified edition/rights assessment.
- **6 modern Murugan songs**: metadata/title only; no lyrics or audio without rights-holder permission.
- No external href values in the new pages, no scraped lyrics, invented verse text, modern recordings or changed links in existing site navigation.

Private governed source archive: existing OmSaravanaBhava Drive files. Public pages display source filenames but not private Drive URLs/IDs. Retain exact source IDs and review decisions in the owner's private release-control register.

### Publication acceptance criteria
1. Owner confirms this belongs in OSB Learning as well as the dedicated OmSaravanaBhava literature site; avoid unintended canonical/SEO duplication.
2. Tamil editor checks each imported song word-for-word against approved source edition and validates numbering.
3. Rights reviewer confirms underlying classical text, particular transcription/edition and cross-site publication. Modern songs/recordings remain withheld.
4. All 13 reader pages display actual text, with accurate partial/full labels. Existing site links remain unchanged.
5. node scripts/test-murugan-library.mjs passes, followed by the full exact-head GitHub CI, static export and Chromium/Firefox/WebKit matrix.
6. Exact qualified export is validated on isolated SSO UAT; human UAT, content/rights, security/governance and owner GO are still mandatory.

The present slice is not a claim that all Murugan books and songs have been published.


### Edition crosswalk — 27 October 2026 (research only, NO rights approval)

Official Project Madurai reference text and contributor-credit headers were checked for the following editions. These URL strings are **private release-register source references**, not changes to website navigation or new links in the public reader.

| Existing or queued work | Primary Unicode edition | Editorial disposition |
| --- | --- | --- |
| Tiruppugazh imported songs 0006–0017 | Project Madurai PM-0180, https://www.projectmadurai.org/pm_etexts/utf8/pmuni0180.html | Existing imported filenames map to the numbered songs 6–17. Opening wording and sequence for songs 6–13 were compared for identification only; this is **not** a complete word-for-word proof or approval of edition transcription. |
| Tiruppugazh proposed larger collection | PM-0180 (1–330), PM-0187 (331–670), PM-0189 (671–1000), PM-0191 (1001–1326) at https://www.projectmadurai.org/pm_etexts/utf8/ | Four numbered volumes identified; **zero** additional lyrics imported. Check every number, alternate numbering system, attribution header and extraction boundary before import. |
| Kandar Anubhuti / கந்தர் அனுபூதி | PM-0023, https://www.projectmadurai.org/pm_etexts/utf8/pmuni0023.html | Unicode base text identified; legacy local OCR version has errors. **Do not** ingest old garbled OCR. |
| Kandar Alankaram / கந்தர் அலங்காரம் | PM-0023 (same complete credited file) | Candidate edition identified, unpublished. |
| Vel, Mayil and Seval Virutham / வேல்–மயில்–சேவல் விருத்தங்கள் | PM-0023 | Three separately titled works in one credited Unicode file; do not lose shared header or split without permission. |
| Shanmuga Kavasam / சண்முகக் கவசம் | PM-0034_01, https://www.projectmadurai.org/pm_etexts/utf8/pmuni0034_01.html | Pamban Kumaragurudasa Swamigal work; edition identified; unpublished. |
| Tiruchendur Kandar Kalivenba / திருச்செந்தூர் கந்தர் கலிவெண்பா | PM-0034_01 and PM-0144, https://www.projectmadurai.org/pm_etexts/utf8/pmuni0144.html | Two independently credited editions: compare lineation and textual variants before choosing one. |
| Six Kandar Kavachams / கந்தர் கவசங்கள் ஆறு | PM-0034_02, https://www.projectmadurai.org/pm_etexts/utf8/pmuni0034_02.html | Devaraya Swamigal work; includes its own header, credits and six shrine-specific sections. Do not call the existing partial Kanda Sashti extract a complete book. |
| Tirumurugatruppadai / திருமுருகாற்றுப்படை | PM-0067, https://www.projectmadurai.org/pm_etexts/utf8/pmuni0067.html | Nakkirar text; identified 317-line edition; no new lines imported. |
| Kanda Puranam / கந்த புராணம் | PM-0239 and later parts; catalog check required | Multi-part source, contributors' rights and complete set not yet cleared. |

**Permission state:** NOT CLEARED. Project Madurai's edition notices permit distribution of the entire credited file only with its original header intact; individual on-site poem pages, rearranged sections, page-per-verse presentation and offline reader use require written scope confirmation. Current Gmail permission request to pmadurai@gmail.com remains an **UNSENT DRAFT**; no license approval or human Tamil proof has been recorded. Project Madurai's contributor credits must be reproduced exactly if permission is granted. This crosswalk contains only titles, identifiers and editorial metadata, **no newly reproduced lyric text or audio**.

**Production-promotion ordering dependency:** `scripts/lib/verify-production-promotion.mjs` allows only approval-metadata changes after the **exact UAT-tested commit**. If human editorial approval is granted, apply the resulting authorized `lib/murugan-library.json` content/approval edits, requalify them in CI, and then perform hosted UAT on that exact new candidate. Do **not** set content approval flags only in the post-UAT release-metadata promotion commit: that would change a disallowed application/content file and fail lineage verification. Post-UAT metadata-only owner approval remains a separate action.

Unmatched catalogue works (Kandar Andhadhi, Subramanya Bhujangam, Thiruvaguppu, Vel Maaral, Kumarastavam, Panchaamirtha Vannam, Murugan Ashtothram) stay marked **SOURCE / EDITION REVIEW PENDING**. Six modern-song lyrics and all audio stay **WITHHELD** without separate rights-holder permission. Site links must remain unchanged.
