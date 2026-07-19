import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { resourceAcademies, resourceAcademyMap, resourceTypes } from '../../../lib/resource-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceAcademies.map((academy) => ({ academy: academy.slug }));
}

export default function AcademyResourcesPage({ params }: { params: { academy: string } }) {
  const academy = resourceAcademyMap[params.academy];
  if (!academy) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">Resource library</p>
          <h1>{academy.name} resources</h1>
          <p className="lead">Reusable operational and learning material for implementation, review, troubleshooting and interview preparation.</p>
        </section>
        <section className="section">
          <div className="grid academyGrid">
            {resourceTypes.map((resource, index) => (
              <article className="card academyCard" key={resource.slug}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h2>{resource.title}</h2>
                <p>{resource.summary}</p>
                <a className="textLink" href={`/resources/${academy.slug}/${resource.slug}/`}>Open resource →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
