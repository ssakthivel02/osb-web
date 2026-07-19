import { SiteHeader } from '../../components/site-header';
import { learningTracks } from '../../lib/learning-data';

export default function TracksPage() {
  return (
    <main>
      <SiteHeader />
      <section className="pageHero">
        <p className="eyebrow">Learning catalogue</p>
        <h1>Build skills that survive real-world pressure.</h1>
        <p className="lead">Choose a structured path, practise through realistic scenarios and validate your capability with evidence.</p>
      </section>
      <section className="section">
        <div className="grid">
          {learningTracks.map((track) => (
            <article className="card" key={track.slug}>
              <p className="eyebrow">{track.level}</p>
              <h2>{track.title}</h2>
              <p>{track.description}</p>
              <p><strong>{track.duration}</strong> · {track.modules.length} modules</p>
              <a className="textLink" href={`/tracks/${track.slug}/`}>View learning path →</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
