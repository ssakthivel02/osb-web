import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';
import { careerResources } from '../../../lib/career-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.map((academy) => ({ academy: academy.slug }));
}

export default function AcademyCareerPage({ params }: { params: { academy: string } }) {
  const academy = academyMap[params.academy];
  if (!academy) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Career path · {academy.name}</p>
          <h1>Build proof that survives interviews and production pressure.</h1>
          <p className="lead">Convert academy learning into certification readiness, portfolio evidence, a credible capstone and role-specific capability.</p>
          <div className="actions">
            <a className="secondary" href={`/${academy.slug}/`}>Return to academy</a>
            <a className="primary" href={`/career/${academy.slug}/capstone-project/`}>Start capstone</a>
          </div>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {careerResources.map((resource, index) => (
              <article className="card academyCard" key={resource.slug}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <a className="textLink" href={`/career/${academy.slug}/${resource.slug}/`}>Open resource →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
