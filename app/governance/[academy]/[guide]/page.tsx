import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/site-header';
import { academies, academyMap } from '../../../../lib/academy-data';
import { governanceGuides, governanceMap } from '../../../../lib/governance-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.flatMap((academy) => governanceGuides.map((guide) => ({ academy: academy.slug, guide: guide.slug })));
}

export default function GovernanceGuidePage({ params }: { params: { academy: string; guide: string } }) {
  const academy = academyMap[params.academy];
  const guide = governanceMap[params.guide];
  if (!academy || !guide) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name} · governance guide</p>
          <h1>{guide.title}</h1>
          <p className="lead">{guide.summary}</p>
          <div className="academyMeta"><span>Enterprise control pattern</span><span>Evidence-led review</span></div>
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
            <strong>Completion evidence</strong>
            <p>Produce a reviewed artefact for {academy.name}: named owner, approval date, linked evidence, unresolved risks and the next review trigger.</p>
          </div>
          <div className="actions"><a className="secondary" href={`/governance/${academy.slug}/`}>← Back to governance pack</a></div>
        </section>
      </main>
    </>
  );
}
