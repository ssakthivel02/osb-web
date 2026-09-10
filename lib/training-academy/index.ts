import fs from 'node:fs';
import path from 'node:path';

type JsonRecord = Record<string, unknown>;
export type TrainingRelationship = {
  relationship_id: string;
  from_id: string;
  to_id: string;
  relationship_type: 'PREREQUISITE_OF' | 'CROSS_LINK';
  rationale: string;
};

const ROOT = path.join(process.cwd(), 'data', 'training-academy');
const RECORD_FILES = [
  'lessons/lessons.jsonl',
  'easy-learn/easy-learn.jsonl',
  'deep-dive/deep-dive.jsonl',
  'labs/labs.jsonl',
  'troubleshooting/troubleshooting.jsonl',
  'assessments/assessments.jsonl',
  'interviews/interviews.jsonl',
  'capstones/capstones.jsonl',
  'visual-specs/visual-specs.jsonl',
  'expansion/batch020r3/records.jsonl',
  'expansion/batch020r3b/records.jsonl',
  'expansion/batch020r3c/records.jsonl',
  'expansion/batch020r3d/records.jsonl',
  'expansion/batch020r3e/records.jsonl',
  'expansion/batch020r4/records.jsonl',
  'expansion/batch020r4b/records.jsonl',
  'expansion/batch020r4c/records.jsonl',
] as const;
const TOPIC_FILES = [
  'canonical/topics.jsonl',
  'expansion/batch020r3/topics.jsonl',
  'expansion/batch020r3b/topics.jsonl',
  'expansion/batch020r3c/topics.jsonl',
  'expansion/batch020r3d/topics.jsonl',
  'expansion/batch020r3e/topics.jsonl',
  'expansion/batch020r4/topics.jsonl',
  'expansion/batch020r4b/topics.jsonl',
  'expansion/batch020r4c/topics.jsonl',
] as const;
const SOURCE_FILES = [
  'sources/source-register.jsonl',
  'expansion/batch020r3/sources.jsonl',
  'expansion/batch020r3b/sources.jsonl',
  'expansion/batch020r3c/sources.jsonl',
  'expansion/batch020r3d/sources.jsonl',
  'expansion/batch020r3e/sources.jsonl',
  'expansion/batch020r4/sources.jsonl',
  'expansion/batch020r4b/sources.jsonl',
  'expansion/batch020r4c/sources.jsonl',
] as const;

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8')) as T;
}

function readJsonl(relativePath: string): JsonRecord[] {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try { return JSON.parse(line) as JsonRecord; }
      catch (error) { throw new Error(`Malformed JSONL at ${relativePath}:${index + 1}: ${(error as Error).message}`); }
    });
}

function assertUnique(records: JsonRecord[], key: string, label: string) {
  const seen = new Set<string>();
  for (const record of records) {
    const value = String(record[key] ?? '');
    if (!value) throw new Error(`${label} is missing ${key}`);
    if (seen.has(value)) throw new Error(`Duplicate ${label} ${key}: ${value}`);
    seen.add(value);
  }
}

export function deriveTrainingRelationships(records: JsonRecord[]): TrainingRelationship[] {
  const relationships: TrainingRelationship[] = [];
  let sequence = 1;
  for (const record of [...records].sort((a, b) => String(a.id).localeCompare(String(b.id)))) {
    const id = String(record.id);
    for (const prerequisite of (record.prerequisites as string[] | undefined) ?? []) {
      relationships.push({ relationship_id: `REL-${String(sequence++).padStart(4, '0')}`, from_id: prerequisite, to_id: id, relationship_type: 'PREREQUISITE_OF', rationale: `${prerequisite} is a stated prerequisite of ${id}` });
    }
    for (const relatedId of (record.related_ids as string[] | undefined) ?? []) {
      relationships.push({ relationship_id: `REL-${String(sequence++).padStart(4, '0')}`, from_id: id, to_id: relatedId, relationship_type: 'CROSS_LINK', rationale: `${id} is related to ${relatedId}` });
    }
  }
  return relationships;
}

export function getTrainingAcademyCorpus() {
  const tracks = readJson<{ tracks: JsonRecord[] }>('canonical/tracks.json').tracks;
  const topics = TOPIC_FILES.flatMap(readJsonl);
  const sources = SOURCE_FILES.flatMap(readJsonl);
  const learningPaths = readJson<{ paths: JsonRecord[] }>('learning-paths/learning-paths.json').paths;
  const relationshipProvenance = readJson<JsonRecord>('canonical/relationship-provenance.json');
  const records = RECORD_FILES.flatMap(readJsonl).sort((a, b) => String(a.id).localeCompare(String(b.id)));

  assertUnique(records, 'id', 'Training Academy record');
  assertUnique(tracks, 'track_id', 'Training Academy track');
  assertUnique(topics, 'topic_id', 'Training Academy topic');
  assertUnique(sources, 'source_id', 'Training Academy source');

  const ids = new Set(records.map((record) => String(record.id)));
  const trackIds = new Set(tracks.map((track) => String(track.track_id)));
  const topicIds = new Set(topics.map((topic) => String(topic.topic_id)));
  const sourceIds = new Set(sources.map((source) => String(source.source_id)));

  for (const record of records) {
    if (!trackIds.has(String(record.track_id))) throw new Error(`${record.id}: unknown track ${record.track_id}`);
    if (!topicIds.has(String(record.topic_id))) throw new Error(`${record.id}: unknown topic ${record.topic_id}`);
    for (const sourceId of (record.sources as string[] | undefined) ?? []) {
      if (!sourceIds.has(sourceId)) throw new Error(`${record.id}: unknown source ${sourceId}`);
    }
  }

  const relationships = deriveTrainingRelationships(records);
  for (const edge of relationships) {
    if (!ids.has(edge.from_id) || !ids.has(edge.to_id)) {
      throw new Error(`Broken Training Academy relationship ${edge.relationship_id}: ${edge.from_id} -> ${edge.to_id}`);
    }
  }

  return { tracks, topics, sources, learningPaths, records, relationships, relationshipProvenance };
}

export function getTrainingAcademyCounts() {
  const corpus = getTrainingAcademyCorpus();
  const typeBreakdown: Record<string, number> = {};
  const populatedTracks = new Set<string>();
  for (const record of corpus.records) {
    const type = String(record.record_type ?? 'UNKNOWN');
    typeBreakdown[type] = (typeBreakdown[type] ?? 0) + 1;
    if (record.track_id) populatedTracks.add(String(record.track_id));
  }
  return {
    learnerRecords: corpus.records.length,
    typeBreakdown,
    trackTaxonomy: corpus.tracks.length,
    populatedTracks: populatedTracks.size,
    learningPaths: corpus.learningPaths.length,
    sources: corpus.sources.length,
    relationships: corpus.relationships.length,
  };
}

export function getTrainingRecordById(id: string) { return getTrainingAcademyCorpus().records.find((record) => record.id === id); }
export function getTrainingRecordsByTrack(trackId: string) { return getTrainingAcademyCorpus().records.filter((record) => record.track_id === trackId); }
export function getTrainingRecordsByType(recordType: string) { return getTrainingAcademyCorpus().records.filter((record) => record.record_type === recordType); }
export function getTrainingSourceById(sourceId: string) { return getTrainingAcademyCorpus().sources.find((source) => source.source_id === sourceId); }
export function getTrainingRelationshipsForRecord(id: string) { return getTrainingAcademyCorpus().relationships.filter((edge) => edge.from_id === id || edge.to_id === id); }
