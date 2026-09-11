import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const DATA = path.join(ROOT, 'data', 'training-academy');
const EXPANSION = path.join(DATA, 'expansion');
const PORT = Number(process.env.OSB_SMOKE_PORT ?? 4173);
const BASE = `http://127.0.0.1:${PORT}`;
const PUBLIC_BASE = 'https://learn.omsaravanabhava.org';
const EXPECTED_PHYSICAL_LEARNER_ROUTES = 334;
const errors = [];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
}

function readJsonl(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8').split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map(JSON.parse);
}

function expansionFiles(name) {
  if (!fs.existsSync(EXPANSION)) return [];
  return fs.readdirSync(EXPANSION, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `data/training-academy/expansion/${entry.name}/${name}`)
    .filter((file) => fs.existsSync(path.join(ROOT, file)))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

if (!fs.existsSync(OUT)) {
  console.error('FAIL: production export directory out/ does not exist. Run npm run build first.');
  process.exit(1);
}

const tracks = readJson('data/training-academy/canonical/tracks.json').tracks;
const seedRecordFiles = [
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
const records = [
  ...seedRecordFiles.flatMap((file) => readJsonl(`data/training-academy/${file}`)),
  ...expansionFiles('records.jsonl').flatMap(readJsonl),
];
const uniqueRecords = [...new Map(records.map((record) => [String(record.id), record])).values()];
if (records.some((record) => !record.id)) errors.push('physical learner record lacks an id');
if (records.length !== uniqueRecords.length) errors.push(`physical learner record IDs are not unique: ${records.length} records / ${uniqueRecords.length} unique IDs`);
if (uniqueRecords.length !== EXPECTED_PHYSICAL_LEARNER_ROUTES) errors.push(`physical learner route count ${uniqueRecords.length} != ${EXPECTED_PHYSICAL_LEARNER_ROUTES}`);

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '--directory', 'out'], {
  cwd: ROOT,
  stdio: 'ignore',
});

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(`${BASE}/training-academy/`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Static export server did not become ready.');
}

async function verifyRoute(route, marker) {
  try {
    const response = await fetch(`${BASE}${route}`, { redirect: 'manual' });
    const body = await response.text();
    if (response.status !== 200) errors.push(`${route} returned ${response.status}`);
    if (!body.includes('<main')) errors.push(`${route} lacks <main> in served HTML`);
    if (marker && !body.includes(marker)) errors.push(`${route} missing marker: ${marker}`);
  } catch (error) {
    errors.push(`${route} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  await waitForServer();

  await verifyRoute('/training-academy/', 'Verified Training Academy');
  await verifyRoute('/search/', 'Search all 19 Training Academy tracks');
  const sitemapResponse = await fetch(`${BASE}/sitemap.xml`);
  const sitemapBody = await sitemapResponse.text();
  if (sitemapResponse.status !== 200) errors.push(`/sitemap.xml returned ${sitemapResponse.status}`);
  if (!sitemapBody.includes(`${PUBLIC_BASE}/training-academy/</loc>`)) errors.push('sitemap lacks Training Academy landing route');

  for (const track of tracks) {
    const id = encodeURIComponent(String(track.track_id));
    await verifyRoute(`/training-academy/tracks/${id}/`, 'Verified Training Academy track');
    if (!sitemapBody.includes(`${PUBLIC_BASE}/training-academy/tracks/${id}/</loc>`)) errors.push(`sitemap lacks verified track route: ${id}`);
  }

  for (const record of uniqueRecords) {
    const id = encodeURIComponent(String(record.id));
    await verifyRoute(`/training-academy/${id}/`, 'Verified learner record');
    if (!sitemapBody.includes(`${PUBLIC_BASE}/training-academy/${id}/</loc>`)) errors.push(`sitemap lacks verified learner route: ${id}`);
  }

  const missing = await fetch(`${BASE}/__osb_missing_route__/`, { redirect: 'manual' });
  if (missing.status !== 404) errors.push(`missing-route boundary returned ${missing.status}, expected 404`);

  const result = {
    gate: errors.length ? 'FAIL' : 'PASS',
    classification: 'SERVED_STATIC_EXPORT_RUNTIME_SMOKE',
    canonicalTracks: tracks.length,
    physicalLearnerRoutes: uniqueRecords.length,
    fixedRoutesChecked: 3,
    invalidRouteBoundaryChecked: true,
    totalSuccessfulSurfaceExpected: tracks.length + uniqueRecords.length + 3,
    claimBoundary: 'This validates the served production export over HTTP. It does not certify client-side interaction, keyboard usability, WCAG conformance, responsive layout, cross-browser behavior, or manual UAT.',
    errors,
  };
  console.log(JSON.stringify(result, null, 2));
  if (errors.length) process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
}
