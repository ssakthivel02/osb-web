import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../components/site-header';
import { learningTracks } from '../../../lib/learning-data';

export function generateStaticParams() {
  return learningTracks.map((track) => ({ slug: track.slug }));
}

export default function TrackDetailPage({ params }: { params: { slug: string } }) {
  const track = learningTracks.find((item) => item.slug === params.slug);
  if (!track) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="pageHero">
        <p className="eyebrow">{track.level} · {track.duration}</p>
        <h1>{track.title}</h1>
        <p className="lead">{track.description}</p>
        <div className="actions">
          <a className="primary" href="/login/">Start this path</a>
          <a className="secondary" href="/tracks/">Back to catalogue</a>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">Curriculum</p>
        <h2>What you will learn</h2>
        <div className="moduleList">
          {track.modules.map((module, index) => (
            <article className="module" key={module}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{module}</h3>
              <p>Concepts, guided implementation, troubleshooting scenarios, architecture decisions and interview preparation.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
