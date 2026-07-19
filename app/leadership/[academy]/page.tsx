import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';
import { leadershipGuides } from '../../../lib/leadership-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.map((academy) => ({ academy: academy.slug }));
}

export default function AcademyLeadershipPage({ params }: { params: { academy: string } }) {
  const academy = academyMap[params.academy];
  if (!academy) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name} · leadership pack</p>
          <h1>Lead {academy.name.replace(' Academy', '')} as a business capability.</h1>
          <p className="lead">Use these guides to align technical direction, team ownership, stakeholder decisions and transformation delivery.</p>
        </section>
        <section className="section">
          <div className="grid">
            {leadershipGuides.map((guide) => (
              <article className="card" key={guide.slug}>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
                <a className="textLink" href={`/leadership/${academy.slug}/${guide.slug}/`}>Open guide →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
