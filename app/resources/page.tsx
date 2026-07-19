import SiteHeader from '../../components/site-header';
import { resourceAcademies } from '../../lib/resource-data';

export default function ResourcesHub() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Production resources</p>
          <h1>Use repeatable guides, not memory and improvisation.</h1>
          <p className="lead">Open academy-specific cheat sheets, troubleshooting runbooks, architecture reviews, migration playbooks, delivery templates and weekly study plans.</p>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {resourceAcademies.map((academy, index) => (
              <article className="card academyCard" key={academy.slug}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h2>{academy.name}</h2>
                <p>{academy.description}</p>
                <a className="textLink" href={`/resources/${academy.slug}/`}>Open resources →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
