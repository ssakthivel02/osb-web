const tracks = [
  ['Cloud Architecture', 'Azure, AWS, Google Cloud, hybrid infrastructure and enterprise design.'],
  ['DevOps & Platform Engineering', 'Terraform, Kubernetes, CI/CD, GitOps, observability and reliability engineering.'],
  ['Security & Identity', 'Zero Trust, Entra ID, privileged access, cloud security and governance.'],
  ['Infrastructure Engineering', 'Windows Server, Linux, VMware, Hyper-V, networking, storage and operations.'],
  ['AI-Assisted Learning', 'Context-aware tutoring, personalised plans, interview preparation and practical guidance.'],
  ['Cultural Knowledge', 'Structured devotional, Tamil heritage and spiritual learning experiences.'],
];

const outcomes = [
  ['01', 'Assess', 'Understand your current capability, experience and target role.'],
  ['02', 'Learn', 'Follow a structured path with concise lessons and deep technical references.'],
  ['03', 'Practise', 'Apply knowledge through guided labs, architecture scenarios and simulations.'],
  ['04', 'Validate', 'Measure progress through assessments, evidence and certification readiness.'],
];

const stats = [
  ['6+', 'Learning domains'],
  ['AI-native', 'Guided experience'],
  ['24/7', 'Self-paced access'],
  ['One', 'Connected ecosystem'],
];

export default function HomePage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="OmSaravanaBhava Learning home">
          <span className="brandMark">OSB</span>
          <span>OmSaravanaBhava Learning</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#tracks">Learning tracks</a>
          <a href="#journey">How it works</a>
          <a href="#platform">Platform</a>
          <a className="navCta" href="#start">Start learning</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />
        <div className="heroContent">
          <p className="eyebrow"><span /> OSB Platform Release 001</p>
          <h1>Build real capability.<br /><em>Not just credentials.</em></h1>
          <p className="lead">
            A connected AI-native learning ecosystem for cloud, infrastructure, DevOps, security,
            enterprise architecture and cultural knowledge.
          </p>
          <div className="actions">
            <a className="primary" href="#tracks">Explore learning tracks <span>→</span></a>
            <a className="secondary" href="#journey">See how it works</a>
          </div>
        </div>
        <div className="heroPanel" aria-label="Platform capabilities">
          <div className="panelTop"><span className="statusDot" /> Platform foundation online</div>
          <div className="terminalLine"><span>01</span> Personalised learning paths</div>
          <div className="terminalLine"><span>02</span> Enterprise scenario simulations</div>
          <div className="terminalLine"><span>03</span> AI tutor and interview preparation</div>
          <div className="terminalLine"><span>04</span> Assessments and progress evidence</div>
        </div>
      </section>

      <section className="stats" aria-label="Platform summary">
        {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="section" id="tracks">
        <div className="sectionIntro">
          <div><p className="eyebrow">Learning catalogue</p><h2>Skills that survive<br />real-world pressure.</h2></div>
          <p>Move beyond passive video consumption. Each domain connects concepts, implementation, troubleshooting, design decisions and interview readiness.</p>
        </div>
        <div className="trackGrid">
          {tracks.map(([title, description], index) => (
            <article className="trackCard" key={title}>
              <span className="cardNumber">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href="#start" aria-label={`Explore ${title}`}>Explore track <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="sectionIntro compact">
          <div><p className="eyebrow">Learning journey</p><h2>From uncertainty<br />to demonstrated skill.</h2></div>
        </div>
        <div className="journeyGrid">
          {outcomes.map(([number, title, description]) => (
            <article className="journeyStep" key={number}>
              <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section platform" id="platform">
        <div className="platformCopy">
          <p className="eyebrow">Connected platform</p>
          <h2>One identity.<br />One learning record.<br />Many experiences.</h2>
          <p>The OSB platform foundation connects web, mobile, shared UI, authentication, assessment, search, recommendations, certification, monitoring and observability as governed services.</p>
        </div>
        <div className="architecture" aria-label="OSB platform architecture">
          <div className="coreNode">OSB<br /><small>Platform</small></div>
          {['Web', 'Identity', 'Learning', 'Assessment', 'Search', 'Mobile'].map((item, index) => <div className={`orbitNode node${index + 1}`} key={item}>{item}</div>)}
        </div>
      </section>

      <section className="ctaSection" id="start">
        <p className="eyebrow">Your next move</p>
        <h2>Stop collecting information.<br />Start building capability.</h2>
        <p>The public foundation is live. Learning catalogue, identity, dashboards and AI-guided experiences are being released in controlled stages.</p>
        <div className="actions centered">
          <a className="primary" href="https://omsaravanabhava.org/">Explore OmSaravanaBhava <span>→</span></a>
          <a className="secondary" href="mailto:ssakthivel02@gmail.com">Contact the platform team</a>
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brandMark">OSB</span><span>OmSaravanaBhava Learning</span></div>
        <p>Platform Foundation · Production Release 001</p>
        <p>© {new Date().getFullYear()} OmSaravanaBhava</p>
      </footer>
    </main>
  );
}