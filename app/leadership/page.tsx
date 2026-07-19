import SiteHeader from '../../components/site-header';
import { academies } from '../../lib/academy-data';

export default function LeadershipHub() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Senior leadership library</p>
          <h1>Lead technical change with clear decisions and accountable execution.</h1>
          <p className="lead">Use strategy, operating-model, communication and transformation tools across every OSB academy.</p>
        </section>
        <section className="section">
          <div className="grid">
            {academies.map((academy) => (
              <article className="card" key={academy.slug}>
                <p className="eyebrow">{academy.eyebrow}</p>
                <h2>{academy.name}</h2>
                <p>{academy.description}</p>
                <a className="textLink" href={`/leadership/${academy.slug}/`}>Open leadership pack →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
