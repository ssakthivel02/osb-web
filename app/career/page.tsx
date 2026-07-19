import SiteHeader from '../../components/site-header';
import { academies } from '../../lib/academy-data';
import { careerResources } from '../../lib/career-data';

export default function CareerHub() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Career development</p>
          <h1>Turn learning into evidence, interviews and career progression.</h1>
          <p className="lead">Use certification roadmaps, capstones, role paths, revision plans, portfolio evidence and mock-exam strategy across every academy.</p>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {academies.map((academy) => (
              <article className="card academyCard" key={academy.slug}>
                <p className="eyebrow">{academy.eyebrow}</p>
                <h2>{academy.name}</h2>
                <p>{academy.description}</p>
                <a className="textLink" href={`/career/${academy.slug}/`}>Open career path →</a>
              </article>
            ))}
          </div>
        </section>
        <section className="section">
          <h2>Six evidence-led resources per academy</h2>
          <div className="grid">
            {careerResources.map((resource) => (
              <article className="card" key={resource.slug}>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
