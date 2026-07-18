const capabilities = [
  ['AI Learning Paths', 'Adaptive journeys for cloud, infrastructure, DevOps, security and cultural learning.'],
  ['Enterprise Simulations', 'Scenario-based labs that convert theory into practical decision-making experience.'],
  ['Assessment & Certification', 'Structured assessments, evidence-based progress and verifiable achievements.'],
  ['Community Knowledge', 'Mentoring, discussion and shared learning across a global practitioner community.'],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Primary navigation">
          <strong>OmSaravanaBhava</strong>
          <a href="#platform">Explore platform</a>
        </nav>
        <div className="heroContent">
          <p className="eyebrow">OSB Learning Ecosystem</p>
          <h1>Learn deeply. Practise safely. Grow continuously.</h1>
          <p className="lead">
            An AI-native learning platform combining professional education, enterprise simulations,
            certification, community and cultural knowledge.
          </p>
          <div className="actions">
            <a className="primary" href="#platform">Discover the ecosystem</a>
            <a className="secondary" href="https://omsaravanabhava.org/">Visit OmSaravanaBhava</a>
          </div>
        </div>
      </section>

      <section className="section" id="platform">
        <p className="eyebrow">Platform foundation</p>
        <h2>One ecosystem, multiple learning experiences</h2>
        <div className="grid">
          {capabilities.map(([title, description]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section status">
        <div>
          <p className="eyebrow">Current release</p>
          <h2>Foundation deployment is active</h2>
        </div>
        <p>
          This site is the first deployable web baseline. Authentication, learner dashboards,
          searchable content and service integrations will be introduced through controlled releases.
        </p>
      </section>

      <footer>© {new Date().getFullYear()} OmSaravanaBhava Learning Ecosystem</footer>
    </main>
  );
}
