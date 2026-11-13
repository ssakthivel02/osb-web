import SiteHeader from '../../components/site-header';
import TrainingAcademySearch, { type TrainingSearchEntry } from '../../components/training-academy-search';
import { getTrainingAcademyCorpus } from '../../lib/training-academy';

export const metadata = {
  title: 'Search Verified Training Academy | OSB Learning',
  description: 'Search the repository-backed OSB Training Academy across all canonical tracks and learner records.',
};

export default function SearchPage() {
  const corpus = getTrainingAcademyCorpus();
  const trackNames = new Map(corpus.tracks.map((track) => [String(track.track_id), String(track.name ?? track.track_id)]));
  const entries: TrainingSearchEntry[] = [
    ...corpus.tracks.map((track) => ({
      id: String(track.track_id),
      kind: 'TRACK' as const,
      title: String(track.name ?? track.track_id),
      summary: String(track.description ?? 'Verified Training Academy track.'),
      track: String(track.name ?? track.track_id),
      href: `/training-academy/tracks/${encodeURIComponent(String(track.track_id))}/`,
    })),
    ...corpus.records.map((record) => ({
      id: String(record.id),
      kind: 'RECORD' as const,
      title: String(record.title ?? record.id),
      summary: String(record.summary ?? record.description ?? ''),
      track: trackNames.get(String(record.track_id)) ?? String(record.track_id),
      recordType: String(record.record_type ?? 'RECORD'),
      href: `/training-academy/${encodeURIComponent(String(record.id))}/`,
    })),
  ];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pageHero compactHero">
          <p className="eyebrow">Verified knowledge discovery</p>
          <h1>Search all 19 Training Academy tracks and physical learner records.</h1>
          <p className="lead">Results come from the same repository-backed corpus used by the integrity gate; planned or narrative-only records are not searchable here.</p>
        </section>
        <section className="section">
          <TrainingAcademySearch entries={entries} />
        </section>
      </main>
    </>
  );
}
