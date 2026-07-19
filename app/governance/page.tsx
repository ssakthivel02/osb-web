import SiteHeader from '../../components/site-header';
import { academies } from '../../lib/academy-data';

export default function GovernanceHub() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Enterprise governance</p>
          <h1>Make technical decisions traceable, controlled and auditable.</h1>
          <p className="lead">Use governance patterns that connect architecture, risk, compliance, change and release evidence across every academy.</p>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {academies.map((academy, index) => (
              <article className="card governanceCard" key={academy.slug}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h2>{academy.name}</h2>
                <p>Apply architecture decisions, risk controls, evidence, change governance and compliance mapping to {academy.name.toLowerCase()}.</p>
                <a className="textLink" href={`/governance/${academy.slug}/`}>Open governance pack →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
