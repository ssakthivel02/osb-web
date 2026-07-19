import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/site-header';
import { resourceAcademies, resourceAcademyMap, resourceTypes, resourceTypeMap } from '../../../../lib/resource-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceAcademies.flatMap((academy) =>
    resourceTypes.map((resource) => ({ academy: academy.slug, resource: resource.slug })),
  );
}

export default function ResourcePage({ params }: { params: { academy: string; resource: string } }) {
  const academy = resourceAcademyMap[params.academy];
  const resource = resourceTypeMap[params.resource];
  if (!academy || !resource) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name} · Resource</p>
          <h1>{resource.title}</h1>
          <p className="lead">{resource.summary}</p>
        </section>
        <section className="section">
          <div className="resourceSections">
            {resource.sections.map((section, index) => (
              <article className="resourceSection" key={section}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section}</h2>
                  <p>Apply this section specifically to {academy.name}. Record assumptions, commands, screenshots, decisions, validation results and rollback evidence where relevant.</p>
                  <ul className="checkList">
                    <li>□ State the objective and expected outcome.</li>
                    <li>□ Identify dependencies, risk and failure signals.</li>
                    <li>□ Execute the smallest safe validation step.</li>
                    <li>□ Capture evidence that another engineer can review.</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section status">
          <div><p className="eyebrow">Quality standard</p><h2>Reusable by someone who was not present.</h2></div>
          <p>A strong resource removes ambiguity. It states prerequisites, decision points, commands, validation, rollback and ownership clearly enough for another engineer to execute safely.</p>
        </section>
      </main>
    </>
  );
}
