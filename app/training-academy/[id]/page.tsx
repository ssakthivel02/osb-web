import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/site-header';
import {
  getTrainingAcademyCorpus,
  getTrainingRecordById,
  getTrainingRelationshipsForRecord,
  getTrainingSourceById,
} from '../../../lib/training-academy';

export function generateStaticParams() {
  return getTrainingAcademyCorpus().records.map((record) => ({ id: String(record.id) }));
}

export default async function TrainingRecordPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const record = getTrainingRecordById(params.id);
  if (!record) notFound();

  const sourceIds = ((record.sources as string[] | undefined) ?? []);
  const sources = sourceIds.map((id) => getTrainingSourceById(id)).filter(Boolean);
  const relationships = getTrainingRelationshipsForRecord(String(record.id));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Verified learner record · {String(record.record_type).replaceAll('_', ' ')}</p>
          <h1>{String(record.title ?? record.id)}</h1>
          <p className="lead">{String(record.summary ?? record.description ?? '')}</p>
        </section>

        <section className="section">
          <div className="grid">
            <article className="card"><p className="eyebrow">Record ID</p><h3>{String(record.id)}</h3></article>
            <article className="card"><p className="eyebrow">Track</p><h3>{String(record.track_id)}</h3></article>
            <article className="card"><p className="eyebrow">Topic</p><h3>{String(record.topic_id)}</h3></article>
            <article className="card"><p className="eyebrow">Graph links</p><h3>{relationships.length}</h3></article>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Provenance</p>
          <h2>Sources</h2>
          {sources.length === 0 ? <p>No source entry is attached to this record.</p> : (
            <div className="grid">
              {sources.map((source) => (
                <article className="card" key={String(source!.source_id)}>
                  <h3>{String(source!.title ?? source!.source_id)}</h3>
                  <p>{String(source!.publisher ?? source!.source_type ?? '')}</p>
                  {source!.url ? <a className="textLink" href={String(source!.url)} rel="noreferrer">Open source →</a> : null}
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <p className="eyebrow">Knowledge graph</p>
          <h2>Prerequisites and cross-links</h2>
          {relationships.length === 0 ? <p>No relationships are attached to this record.</p> : (
            <div className="grid">
              {relationships.map((edge) => {
                const neighbour = edge.from_id === record.id ? edge.to_id : edge.from_id;
                return (
                  <article className="card" key={edge.relationship_id}>
                    <p className="eyebrow">{edge.relationship_type.replaceAll('_', ' ')}</p>
                    <h3>{neighbour}</h3>
                    <p>{edge.rationale}</p>
                    <a className="textLink" href={`/training-academy/${encodeURIComponent(neighbour)}/`}>Open connected record →</a>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
