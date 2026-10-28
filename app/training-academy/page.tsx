import SiteHeader from '../../components/site-header';
import { getTrainingAcademyCorpus, getTrainingAcademyCounts } from '../../lib/training-academy';

export const metadata = {
  title: 'Verified Training Academy | OSB Learning',
  description: 'Evidence-backed OSB Training Academy corpus with source, safety and relationship metadata.',
};

export default function TrainingAcademyPage() {
  const corpus = getTrainingAcademyCorpus();
  const counts = getTrainingAcademyCounts();
  const recordsByType = Object.entries(counts.typeBreakdown).sort(([a], [b]) => a.localeCompare(b));
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
          <p className="eyebrow">Evidence-first curriculum</p>
          <h1>Verified Training Academy</h1>
          <p className="lead">This catalogue only counts learner records that physically exist in the repository and pass the corpus integrity gate. Narrative or planned records are never included in these totals.</p>
          <p><a className="textLink" href="/search/">Search the verified academy →</a></p>
        </section>

        <section className="section">
          <div className="grid">
            <article className="card"><p className="eyebrow">Physical records</p><h2>{counts.learnerRecords}</h2><p>Repository-backed learner records.</p></article>
            <article className="card"><p className="eyebrow">Track taxonomy</p><h2>{counts.trackTaxonomy}</h2><p>{counts.populatedTracks} tracks currently have physical learner content.</p></article>
            <article className="card"><p className="eyebrow">Learning paths</p><h2>{counts.learningPaths}</h2><p>Structured evidence-backed paths; track population does not imply path completion.</p></article>
            <article className="card"><p className="eyebrow">Source register</p><h2>{counts.sources}</h2><p>Traceable source entries carried with the corpus.</p></article>
            <article className="card"><p className="eyebrow">Knowledge graph</p><h2>{counts.relationships}</h2><p>Validated prerequisite and cross-link relationships.</p></article>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Physical coverage</p>
          <h2>Record types</h2>
          <div className="grid">
            {recordsByType.map(([type, count]) => <article className="card" key={type}><h3>{type.replaceAll('_', ' ')}</h3><p><strong>{count}</strong> verified records</p></article>)}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Canonical taxonomy</p>
          <h2>19-track curriculum map</h2>
          <div className="grid">
            {corpus.tracks.map((track) => {
              const id = String(track.track_id);
              const recordCount = recordsByTrack.get(id) ?? 0;
              return (
                <article className="card" key={id}>
                  <p className="eyebrow">{recordCount > 0 ? 'PHYSICAL · VERIFIED' : 'TAXONOMY · NOT YET POPULATED'}</p>
                  <h3>{String(track.name ?? id)}</h3>
                  <p>{String(track.description ?? '')}</p>
                  <p><strong>{recordCount}</strong> physical records</p>
                  {recordCount > 0 ? <a className="textLink" href={`/training-academy/tracks/${encodeURIComponent(id)}/`}>Browse verified track →</a> : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Full verified corpus</p>
          <h2>Browse every physically verified record</h2>
          <div className="grid">
            {corpus.records.map((record) => (
              <article className="card" key={String(record.id)}>
                <p className="eyebrow">{String(record.record_type).replaceAll('_', ' ')}</p>
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
