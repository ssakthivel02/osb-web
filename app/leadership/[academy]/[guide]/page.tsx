import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/site-header';
import { academies, academyMap } from '../../../../lib/academy-data';
import { leadershipGuides, leadershipMap } from '../../../../lib/leadership-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.flatMap((academy) => leadershipGuides.map((guide) => ({ academy: academy.slug, guide: guide.slug })));
}

export default function LeadershipGuidePage({ params }: { params: { academy: string; guide: string } }) {
  const academy = academyMap[params.academy];
  const guide = leadershipMap[params.guide];
  if (!academy || !guide) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name} · leadership guide</p>
          <h1>{guide.title}</h1>
          <p className="lead">{guide.summary}</p>
          <div className="academyMeta"><span>Senior-level decision support</span><span>Outcome-led leadership</span></div>
        </section>
        <section className="section">
          <div className="governanceSections">
            {guide.sections.map((section, index) => (
              <article className="governanceSection" key={section.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  <ul className="checkList">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="decisionBox">
            <strong>Leadership evidence</strong>
            <p>Produce a concise, reviewed artefact for {academy.name}: the decision required, accountable owner, measurable outcome, key risks and next checkpoint.</p>
          </div>
          <div className="actions"><a className="secondary" href={`/leadership/${academy.slug}/`}>← Back to leadership pack</a></div>
        </section>
      </main>
    </>
  );
}
