import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/site-header';
import { getTrainingAcademyCorpus, getTrainingRecordsByTrack } from '../../../../lib/training-academy';

export function generateStaticParams() {
  return getTrainingAcademyCorpus().tracks.map((track) => ({ trackId: String(track.track_id) }));
}

export function generateMetadata({ params }: { params: { trackId: string } }) {
  const track = getTrainingAcademyCorpus().tracks.find((item) => String(item.track_id) === params.trackId);
  if (!track) return { title: 'Training Academy Track | OSB Learning' };
  return {
    title: `${String(track.name ?? track.track_id)} | OSB Training Academy`,
    description: String(track.description ?? 'Verified OSB Training Academy track.'),
  };
}

export default function TrainingTrackPage({ params }: { params: { trackId: string } }) {
  const corpus = getTrainingAcademyCorpus();
  const track = corpus.tracks.find((item) => String(item.track_id) === params.trackId);
  if (!track) notFound();

  const records = getTrainingRecordsByTrack(params.trackId);
  const typeCounts = new Map<string, number>();
  for (const record of records) {
    const type = String(record.record_type ?? 'RECORD');
    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">Verified Training Academy track</p>
          <h1>{String(track.name ?? track.track_id)}</h1>
          <p className="lead">{String(track.description ?? '')}</p>
          <p><strong>{records.length}</strong> physical learner records · {typeCounts.size} record types</p>
        </section>
        <section className="section">
          <p className="eyebrow">Coverage</p>
          <div className="grid">
            {Array.from(typeCounts.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([type, count]) => (
              <article className="card" key={type}><h2>{type.replaceAll('_', ' ')}</h2><p><strong>{count}</strong> verified records</p></article>
            ))}
          </div>
        </section>
        <section className="section">
          <p className="eyebrow">Physical corpus</p>
          <h2>Verified records</h2>
          <div className="grid">
            {records.map((record) => (
              <article className="card" key={String(record.id)}>
                <p className="eyebrow">{String(record.record_type ?? 'RECORD').replaceAll('_', ' ')}</p>
                <h3>{String(record.title ?? record.id)}</h3>
                <p>{String(record.summary ?? record.description ?? '')}</p>
                <a className="textLink" href={`/training-academy/${encodeURIComponent(String(record.id))}/`}>Open verified record →</a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
