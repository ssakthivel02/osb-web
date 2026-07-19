import SiteHeader from '../../components/site-header';
import { academies } from '../../lib/academy-data';

export default function AcademiesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">OSB technical academies</p>
          <h1>Eight disciplines. One connected delivery system.</h1>
          <p className="lead">Choose an academy, complete its practical modules and connect the knowledge across cloud, automation, containers, platforms and cost.</p>
        </section>
        <section className="section">
          <div className="grid">
            {academies.map((academy, index) => (
              <article className="card" key={academy.slug}>
                <span className="eyebrow">Batch {String(index + 1).padStart(2, '0')}</span>
                <h2>{academy.name}</h2>
                <p>{academy.description}</p>
                <p>{academy.topics.length} learning modules</p>
                <a className="textLink" href={`/${academy.slug}/`}>Enter academy →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
