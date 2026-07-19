import { notFound } from 'next/navigation';
import SiteHeader from '../../components/site-header';
import { academies, academyMap } from '../../lib/academy-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.map((academy) => ({ academy: academy.slug }));
}

export default function AcademyPage({ params }: { params: { academy: string } }) {
  const academy = academyMap[params.academy];
  if (!academy) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">{academy.eyebrow}</p>
          <h1>{academy.name}</h1>
          <p className="lead">{academy.description}</p>
          <div className="academyMeta">
            <span>{academy.topics.length} structured modules</span>
            <span>{academy.audience}</span>
          </div>
          <div className="actions academyActions">
            <a className="primary" href={`/${academy.slug}/labs/`}>Start hands-on labs</a>
            <a className="secondary" href={`/${academy.slug}/assessment/`}>Take assessment</a>
            <a className="secondary" href={`/${academy.slug}/flashcards/`}>Review flashcards</a>
            <a className="secondary" href={`/${academy.slug}/interview/`}>Interview drills</a>
            <a className="secondary" href={`/${academy.slug}/scenarios/`}>Architecture scenarios</a>
          </div>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {academy.topics.map((topic, index) => (
              <article className="card academyCard" key={topic.slug}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h2>{topic.title}</h2>
                <p>{topic.summary}</p>
                <a className="textLink" href={`/${academy.slug}/${topic.slug}/`}>Open module →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
