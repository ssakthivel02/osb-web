export function SiteHeader() {
  return (
    <header className="siteHeader">
      <a className="brand" href="/">
        <span className="brandMark">OSB</span>
        <span>OmSaravanaBhava Learning</span>
      </a>
      <nav className="siteNav" aria-label="Main navigation">
        <a href="/training-academy/">Academy</a>
        <a href="/tracks/">Tracks</a>
        <a href="/search/">Search</a>
        <a href="/career/">Career</a>
        <a href="/resources/">Resources</a>
        <a className="navCta" href="/login/">Sign in</a>
      </nav>
    </header>
  );
}

export default SiteHeader;
