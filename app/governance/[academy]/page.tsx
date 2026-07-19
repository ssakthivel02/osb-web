import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';
import { governanceGuides } from '../../../lib/governance-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.map((academy) => ({ academy: academy.slug }));
}

export default function GovernanceAcademyPage({ params }: { params: { academy: string } }) {
  const academy = academyMap[params.academy];
  if (!academy) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name} · governance</p>
          <h1>Control decisions and prove readiness.</h1>
          <p className="lead">Use these six governance packs to make {academy.name.toLowerCase()} decisions reviewable, changes controlled and evidence audit-ready.</p>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {governanceGuides.map((guide, index) => (
              <article className="card governanceCard" key={guide.slug}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
                <a className="textLink" href={`/governance/${academy.slug}/${guide.slug}/`}>Open guide →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
