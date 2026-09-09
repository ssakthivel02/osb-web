import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'data', 'training-academy');
const recordFiles = [
  'lessons/lessons.jsonl',
  'easy-learn/easy-learn.jsonl',
  'deep-dive/deep-dive.jsonl',
  'labs/labs.jsonl',
  'troubleshooting/troubleshooting.jsonl',
  'assessments/assessments.jsonl',
  'interviews/interviews.jsonl',
  'capstones/capstones.jsonl',
  'visual-specs/visual-specs.jsonl',
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'));
}

function readJsonl(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try { return JSON.parse(line); }
      catch (error) { throw new Error(`${relativePath}:${index + 1}: ${error.message}`); }
    });
}

const errors = [];
const tracks = readJson('canonical/tracks.json').tracks;
const topics = readJsonl('canonical/topics.jsonl');
const sources = readJsonl('sources/source-register.jsonl');
const paths = readJson('learning-paths/learning-paths.json').paths;
const records = recordFiles.flatMap(readJsonl);

const trackIds = new Set(tracks.map((item) => item.track_id));
const topicIds = new Set(topics.map((item) => item.topic_id));
const sourceIds = new Set(sources.map((item) => item.source_id));
const recordIds = new Set();

for (const record of records) {
  if (!record.id) errors.push('record missing id');
  else if (recordIds.has(record.id)) errors.push(`duplicate record id: ${record.id}`);
  else recordIds.add(record.id);
  if (!trackIds.has(record.track_id)) errors.push(`${record.id}: unknown track ${record.track_id}`);
  if (!topicIds.has(record.topic_id)) errors.push(`${record.id}: unknown topic ${record.topic_id}`);
  for (const sourceId of record.sources ?? []) {
    if (!sourceIds.has(sourceId)) errors.push(`${record.id}: unknown source ${sourceId}`);
  }
}

for (const record of records) {
  for (const field of ['prerequisites', 'related_ids']) {
    for (const id of record[field] ?? []) {
      if (!recordIds.has(id)) errors.push(`${record.id}: ${field} references missing record ${id}`);
    }
  }
}

for (const learningPath of paths) {
  for (const milestone of learningPath.milestones ?? []) {
    for (const id of milestone.record_ids ?? []) {
      if (!recordIds.has(id)) errors.push(`${learningPath.path_id}: milestone references missing record ${id}`);
    }
  }
  for (const id of [learningPath.capstone_id, ...(learningPath.assessment_ids ?? []), ...(learningPath.interview_ids ?? [])].filter(Boolean)) {
    if (!recordIds.has(id)) errors.push(`${learningPath.path_id}: references missing record ${id}`);
  }
}

const typeBreakdown = Object.fromEntries(
  [...new Set(records.map((r) => r.record_type))].sort().map((type) => [type, records.filter((r) => r.record_type === type).length]),
);
const populatedTrackIds = [...new Set(records.map((r) => r.track_id))].sort();
const safetyBreakdown = {};
for (const record of records) {
  if (record.safety_classification) {
    safetyBreakdown[record.safety_classification] = (safetyBreakdown[record.safety_classification] ?? 0) + 1;
  }
}

const expected = {
  records: 44,
  tracks: 19,
  populatedTracks: 1,
  paths: 1,
  sources: 13,
  typeBreakdown: {
    ASSESSMENT: 10,
    CAPSTONE: 1,
    DEEP_DIVE: 5,
    EASY_LEARN: 5,
    INTERVIEW: 5,
    LAB: 5,
    LESSON: 5,
    TROUBLESHOOTING: 5,
    VISUAL_SPEC: 3,
  },
};

if (records.length !== expected.records) errors.push(`record count ${records.length} != ${expected.records}`);
if (tracks.length !== expected.tracks) errors.push(`track count ${tracks.length} != ${expected.tracks}`);
if (populatedTrackIds.length !== expected.populatedTracks) errors.push(`populated track count ${populatedTrackIds.length} != ${expected.populatedTracks}`);
if (paths.length !== expected.paths) errors.push(`path count ${paths.length} != ${expected.paths}`);
if (sources.length !== expected.sources) errors.push(`source count ${sources.length} != ${expected.sources}`);
for (const [type, count] of Object.entries(expected.typeBreakdown)) {
  if ((typeBreakdown[type] ?? 0) !== count) errors.push(`${type} count ${typeBreakdown[type] ?? 0} != ${count}`);
}

const result = {
  gate: errors.length === 0 ? 'PASS' : 'FAIL',
  learnerRecords: records.length,
  typeBreakdown,
  trackTaxonomy: tracks.length,
  populatedTracks: populatedTrackIds.length,
  populatedTrackIds,
  learningPaths: paths.length,
  sources: sources.length,
  duplicateIds: records.length - recordIds.size,
  brokenReferences: errors.filter((e) => e.includes('references missing') || e.includes('unknown ')).length,
  safetyBreakdown,
  errors,
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
