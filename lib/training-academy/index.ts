import fs from 'node:fs';
import path from 'node:path';

type JsonRecord = Record<string, unknown>;

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
      try {
        return JSON.parse(line) as JsonRecord;
      } catch (error) {
        throw new Error(`Malformed JSONL at ${relativePath}:${index + 1}: ${(error as Error).message}`);
      }
    });
}

export function getTrainingAcademyCorpus() {
  const tracks = readJson<{ tracks: JsonRecord[] }>('canonical/tracks.json').tracks;
  const topics = readJsonl('canonical/topics.jsonl');
  const sources = readJsonl('sources/source-register.jsonl');
  const learningPaths = readJson<{ paths: JsonRecord[] }>('learning-paths/learning-paths.json').paths;
  const records = RECORD_FILES.flatMap(readJsonl).sort((a, b) => String(a.id).localeCompare(String(b.id)));

  const ids = new Set<string>();
  for (const record of records) {
    const id = String(record.id ?? '');
    if (!id) throw new Error('Training Academy record is missing id');
    if (ids.has(id)) throw new Error(`Duplicate Training Academy record id: ${id}`);
    ids.add(id);
  }

  return { tracks, topics, sources, learningPaths, records };
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
  };
}

export function getTrainingRecordById(id: string) {
  return getTrainingAcademyCorpus().records.find((record) => record.id === id);
}

export function getTrainingRecordsByTrack(trackId: string) {
  return getTrainingAcademyCorpus().records.filter((record) => record.track_id === trackId);
}

export function getTrainingRecordsByType(recordType: string) {
  return getTrainingAcademyCorpus().records.filter((record) => record.record_type === recordType);
}

export function getTrainingSourceById(sourceId: string) {
  return getTrainingAcademyCorpus().sources.find((source) => source.source_id === sourceId);
}
