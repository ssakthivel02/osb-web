import SiteHeader from '../../components/site-header';
import { getTrainingAcademyCorpus } from '../../lib/training-academy';

export const metadata = {
  title: 'Training Academy Tracks | OSB Learning',
  description: 'Browse the 19 canonical OSB Training Academy tracks backed by physical repository records.',
};

export default function TracksPage() {
  const corpus = getTrainingAcademyCorpus();
  const recordsByTrack = new Map<string, number>();
  for (const record of corpus.records) {
    const trackId = String(record.track_id);
    recordsByTrack.set(trackId, (recordsByTrack.get(trackId) ?? 0) + 1);
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Verified learning catalogue</p>
          <h1>19 canonical tracks backed by physical Training Academy records.</h1>
          <p className="lead">Browse what is actually present in the evidence-backed corpus. Track population does not by itself claim a complete learning path or capstone.</p>
        </section>
        <section className="section">
          <div className="grid">
            {corpus.tracks.map((track) => {
              const id = String(track.track_id);
              const recordCount = recordsByTrack.get(id) ?? 0;
              return (
                <article className="card" key={id}>
                  <p className="eyebrow">{recordCount > 0 ? 'PHYSICAL · VERIFIED' : 'TAXONOMY ONLY'}</p>
                  <h2>{String(track.name ?? id)}</h2>
                  <p>{String(track.description ?? '')}</p>
                  <p><strong>{recordCount}</strong> physical learner records</p>
                  {recordCount > 0 ? <a className="textLink" href={`/training-academy/tracks/${encodeURIComponent(id)}/`}>Browse verified track →</a> : null}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
