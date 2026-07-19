export function SiteHeader() {
  return (
    <header className="siteHeader">
      <a className="brand" href="/">
        <span className="brandMark">OSB</span>
        <span>OmSaravanaBhava Learning</span>
      </a>
      <nav className="siteNav" aria-label="Main navigation">
        <a href="/tracks/">Tracks</a>
        <a href="/search/">Search</a>
        <a href="/dashboard/">Dashboard</a>
        <a className="navCta" href="/login/">Sign in</a>
      </nav>
    </header>
  );
}
