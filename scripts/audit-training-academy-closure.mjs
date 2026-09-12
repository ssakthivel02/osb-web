import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'data', 'training-academy');
const EXPANSION_ROOT = path.join(ROOT, 'expansion');
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), 'utf8'));
const readJsonl = (relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8').split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map(JSON.parse);
const expansionFiles = (filename) => fs.existsSync(EXPANSION_ROOT)
  ? fs.readdirSync(EXPANSION_ROOT, { withFileTypes: true }).filter((entry) => entry.isDirectory())
      .map((entry) => `expansion/${entry.name}/${filename}`).filter((relative) => fs.existsSync(path.join(ROOT, relative)))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  : [];

const tracks = readJson('canonical/tracks.json').tracks;
const records = [
  'lessons/lessons.jsonl','easy-learn/easy-learn.jsonl','deep-dive/deep-dive.jsonl','labs/labs.jsonl',
  'troubleshooting/troubleshooting.jsonl','assessments/assessments.jsonl','interviews/interviews.jsonl',
  'capstones/capstones.jsonl','visual-specs/visual-specs.jsonl',...expansionFiles('records.jsonl')
].flatMap(readJsonl);
const learningPaths = ['learning-paths/learning-paths.json',...expansionFiles('learning-paths.json')].flatMap((file)=>readJson(file).paths);
const releaseGate = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'release', 'OSB_RELEASE_GATE.json'), 'utf8'));

const recordById = new Map(records.map((record) => [String(record.id), record]));
const populatedTrackIds = new Set(records.map((record) => String(record.track_id)));
const capstoneTrackIds = new Set(records.filter((record) => record.record_type === 'CAPSTONE').map((record) => String(record.track_id)));
const pathTrackIds = new Set();
for (const learningPath of learningPaths) {
  for (const milestone of learningPath.milestones ?? []) {
    for (const recordId of milestone.record_ids ?? []) {
      const record = recordById.get(String(recordId));
      if (record?.track_id) pathTrackIds.add(String(record.track_id));
    }
  }
}

const essentialTypes = ['EASY_LEARN','LESSON','LAB','TROUBLESHOOTING','ASSESSMENT','INTERVIEW'];
const weakTracks = tracks.map((track) => {
  const trackId = String(track.track_id);
  const types = new Set(records.filter((record) => String(record.track_id) === trackId).map((record) => String(record.record_type)));
  const missingTypes = essentialTypes.filter((type) => !types.has(type));
  return missingTypes.length ? { trackId, missingTypes } : null;
}).filter(Boolean);

const incompleteManualGates = Object.entries(releaseGate.manualGates ?? {}).filter(([, complete]) => complete !== true).map(([name]) => name);
const journeyClosureComplete = pathTrackIds.size === tracks.length && capstoneTrackIds.size === tracks.length;
const knownBlockers = [];
if (pathTrackIds.size < tracks.length) knownBlockers.push(`structured learning paths cover ${pathTrackIds.size}/${tracks.length} tracks`);
if (capstoneTrackIds.size < tracks.length) knownBlockers.push(`capstones cover ${capstoneTrackIds.size}/${tracks.length} tracks`);
if (weakTracks.length) knownBlockers.push(`${weakTracks.length} tracks are missing one or more essential learner record types`);
if (incompleteManualGates.length) knownBlockers.push(`${incompleteManualGates.length} manual release gates remain incomplete`);
if (releaseGate.githubServerSideProtectionVerified !== true) knownBlockers.push('GitHub/server-side protection evidence is not verified');

const errors = [];
if (tracks.length !== 19) errors.push(`canonical track count ${tracks.length} != 19`);
if (populatedTrackIds.size !== tracks.length) errors.push(`physically populated tracks ${populatedTrackIds.size} != ${tracks.length}`);
if (knownBlockers.length && releaseGate.productionReleaseStatus !== 'HOLD') errors.push('known closure blockers exist but productionReleaseStatus is not HOLD');
if (incompleteManualGates.length && releaseGate.productionDeploymentApproved === true) errors.push('production deployment is approved while manual gates are incomplete');

const searchPage = fs.readFileSync(path.join(process.cwd(), 'app', 'search', 'page.tsx'), 'utf8');
const tracksPage = fs.readFileSync(path.join(process.cwd(), 'app', 'tracks', 'page.tsx'), 'utf8');
if (!searchPage.includes('getTrainingAcademyCorpus') || !searchPage.includes('TrainingAcademySearch')) errors.push('search page is not backed by the verified Training Academy corpus');
if (!tracksPage.includes('getTrainingAcademyCorpus')) errors.push('tracks page is not backed by the verified Training Academy corpus');

const result = {
  gate: errors.length ? 'FAIL' : 'PASS',
  closureStatus: journeyClosureComplete && incompleteManualGates.length === 0 && releaseGate.githubServerSideProtectionVerified === true ? 'CLOSURE_CANDIDATE' : 'HOLD',
  canonicalTracks: tracks.length,
  physicallyPopulatedTracks: populatedTrackIds.size,
  learnerRecords: records.length,
  structuredLearningPaths: learningPaths.length,
  pathTrackCoverage: pathTrackIds.size,
  capstoneTrackCoverage: capstoneTrackIds.size,
  weakTracks,
  incompleteManualGates,
  productionReleaseStatus: releaseGate.productionReleaseStatus,
  productionDeploymentApproved: releaseGate.productionDeploymentApproved,
  knownBlockers,
  errors,
};

console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
