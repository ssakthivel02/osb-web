import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import { academies, academyMap } from '../../../lib/academy-data';

export const dynamicParams = false;

export function generateStaticParams() {
  return academies.flatMap((academy) =>
    academy.topics.map((topic) => ({ academy: academy.slug, topic: topic.slug })),
  );
}

export default function AcademyTopicPage({ params }: { params: { academy: string; topic: string } }) {
  const academy = academyMap[params.academy];
  const topic = academy?.topics.find((item) => item.slug === params.topic);
  if (!academy || !topic) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">{academy.name}</p>
          <h1>{topic.title}</h1>
          <p className="lead">{topic.summary}</p>
          <div className="actions">
            <a className="secondary" href={`/${academy.slug}/`}>← Academy modules</a>
          </div>
        </section>
        <section className="section topicLayout">
          <article className="topicPanel">
            <p className="eyebrow">Learning outcomes</p>
            <h2>What you should be able to explain and demonstrate</h2>
            <div className="moduleList">
              {topic.outcomes.map((outcome, index) => (
                <div className="module" key={outcome}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{outcome}</h3>
                  <p>Explain the principle, apply it to a realistic system and identify the operational trade-offs.</p>
                </div>
              ))}
            </div>
          </article>
          <aside className="topicAside">
            <div className="metricCard">
              <span>Hands-on practice</span>
              <h3>{topic.practice}</h3>
              <p>Capture commands, diagrams, screenshots and the reasoning behind each decision.</p>
            </div>
            <div className="metricCard">
              <span>Interview scenario</span>
              <h3>{topic.interview}</h3>
              <p>Answer using requirements, design choice, risk, validation, rollback and measurable outcome.</p>
            </div>
            <div className="metricCard">
              <span>Completion standard</span>
              <h3>Evidence, not familiarity</h3>
              <p>You are complete only when you can build it, break it, diagnose it and explain the recovery path.</p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
