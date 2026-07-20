export function SiteHeader() {
  return (
    <header className="siteHeader">
      <a className="brand" href="/">
        <span className="brandMark">OSB</span>
        <span>OmSaravanaBhava Learning</span>
      </a>
      <nav className="siteNav" aria-label="Main navigation">
        <a href="/academies/">Academies</a>
        <a href="/career/">Career</a>
        <a href="/resources/">Resources</a>
        <a href="/operations/">Operations</a>
        <a href="/governance/">Governance</a>
        <a href="/delivery/">Delivery</a>
        <a href="/leadership/">Leadership</a>
        <a href="/workshops/">Workshops</a>
        <a href="/interview/">Interview</a>
        <a href="/runbooks/">Runbooks</a>
        <a href="/patterns/">Patterns</a>
        <a href="/architecture/">Architecture</a>
        <a href="/certifications/">Certifications</a>
        <a href="/learning-plans/">Learning Plans</a>
        <a href="/assessments/">Assessments</a>
        <a href="/downloads/">Downloads</a>
        <a href="/projects/">Projects</a>
        <a href="/portfolio/">Portfolio</a>
        <a href="/troubleshooting/">Troubleshooting</a>
        <a href="/checklists/">Checklists</a>
        <a href="/tracks/">Tracks</a>
        <a href="/search/">Search</a>
        <a href="/dashboard/">Dashboard</a>
        <a className="navCta" href="/login/">Sign in</a>
      </nav>
    </header>
  );
}

export default SiteHeader;