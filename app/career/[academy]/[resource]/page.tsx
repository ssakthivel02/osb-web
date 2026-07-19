import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/site-header';
import { academies } from '../../../../lib/academy-data';
import { careerResources, getCareerContent, type CareerResourceSlug } from '../../../../lib/career-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.flatMap((academy) => careerResources.map((resource) => ({ academy: academy.slug, resource: resource.slug })));
}

export default function CareerResourcePage({ params }: { params: { academy: string; resource: string } }) {
  const result = getCareerContent(params.academy, params.resource as CareerResourceSlug);
  if (!result) notFound();

  const { academy, resource, content } = result;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name} · {resource.title}</p>
          <h1>{content.heading}</h1>
          <p className="lead">{content.intro}</p>
          <div className="actions">
            <a className="secondary" href={`/career/${academy.slug}/`}>Career path</a>
            <a className="secondary" href={`/${academy.slug}/`}>Academy</a>
          </div>
        </section>
        <section className="section">
          <div className="careerSections">
            {content.sections.map((section, index) => (
              <article className="careerSection" key={section.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  <ul className="checkList">
                    {section.items.map((item) => <li key={item}>✓ {item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section status">
          <div>
            <p className="eyebrow">Completion standard</p>
            <h2>Produce evidence, not a completion claim.</h2>
          </div>
          <p>Save diagrams, code, decisions, test output, failure recovery and a concise explanation of what you would improve. That evidence becomes your interview story and portfolio.</p>
        </section>
      </main>
    </>
  );
}
