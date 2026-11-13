import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');
const DATA = path.join(ROOT, 'data', 'training-academy');
const EXPANSION = path.join(DATA, 'expansion');
const PORT = Number(process.env.OSB_SMOKE_PORT ?? 4173);
const BASE = `http://127.0.0.1:${PORT}`;
const PUBLIC_BASE = 'https://learn.omsaravanabhava.org';
const EXPECTED_PHYSICAL_LEARNER_ROUTES = 334;
const INACTIVE_IDENTITY_ROUTES = ['/login/', '/register/', '/dashboard/', '/profile/', '/settings/'];
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

// Fail closed: publication flags must constrain deployable content, not just GO.
const muruganCatalogue = readJson('lib/murugan-library.json');
const muruganApproved = Boolean(muruganCatalogue.productionContentApproval) &&
  Array.isArray(muruganCatalogue.texts) &&
  muruganCatalogue.texts.length > 0 &&
  muruganCatalogue.texts.every((entry) => Boolean(entry.humanPublicationApproval));
if (!muruganApproved) {
  const entries = muruganCatalogue.texts ?? [];
  for (const entry of entries) {
    if (fs.existsSync(path.join(OUT, 'murugan-library', entry.slug, 'index.html'))) {
      errors.push(`Unapproved Murugan reader route exported: ${entry.slug}`);
    }
  }
  const markers = entries.map((entry) => ({
    slug: entry.slug,
    text: String(entry.text ?? '').split(/\r?\n/).find((line) => line.trim().length >= 18)?.trim().slice(0, 30),
  })).filter((entry) => entry.text);
  if (markers.length !== entries.length) errors.push('Some Murugan texts lack a usable output-leak marker');
  const stack = [OUT];
  const extensions = /\.(?:html|rsc|js|json|txt|xml|css)$/i;
  while (stack.length) {
    const dir = stack.pop();
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) { stack.push(full); continue; }
      if (!item.isFile() || !extensions.test(item.name)) continue;
      const content = fs.readFileSync(full, 'utf8');
      for (const marker of markers) {
        if (content.includes(marker.text)) {
          errors.push(`Unapproved Tamil excerpt in exported asset: ${path.relative(OUT, full)} (${marker.slug})`);
        }
      }
    }
  }
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

async function verifyInactiveIdentityRoute(route) {
  try {
    const response = await fetch(`${BASE}${route}`, { redirect: 'manual' });
    const body = await response.text();
    if (response.status !== 200) errors.push(`${route} returned ${response.status}`);
    if (!body.includes('<main')) errors.push(`${route} lacks <main> in served HTML`);
    const robotsMeta = body.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i)
      ?? body.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["'][^>]*>/i);
    if (!robotsMeta) {
      errors.push(`${route} lacks generated robots meta`);
      return;
    }
    const directives = robotsMeta[1].toLowerCase().split(',').map((value) => value.trim());
    if (!directives.includes('noindex')) errors.push(`${route} generated robots meta lacks noindex`);
    if (!directives.includes('nofollow')) errors.push(`${route} generated robots meta lacks nofollow`);
  } catch (error) {
    errors.push(`${route} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function verifyPublishedSitemapRoutes(locations, concurrency = 24) {
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(concurrency, locations.length) }, async () => {
    while (nextIndex < locations.length) {
      const location = locations[nextIndex];
      nextIndex += 1;
      try {
        const url = new URL(location);
        if (url.origin !== PUBLIC_BASE) {
          errors.push(`sitemap URL uses unexpected origin: ${location}`);
          continue;
        }
        const response = await fetch(`${BASE}${url.pathname}${url.search}`, { method: 'HEAD', redirect: 'manual' });
        if (response.status !== 200) errors.push(`published sitemap route returned ${response.status}: ${url.pathname}${url.search}`);
      } catch (error) {
        errors.push(`invalid or unreachable sitemap URL ${location}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  });
  await Promise.all(workers);
}

function testAcademyRouteUniqueness() {
  // Test the actual TypeScript validator with the real registry and bad copies.
  const source = fs.readFileSync(path.join(ROOT, 'lib', 'academy-data.ts'), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const sandbox = { exports: {} };
  runInNewContext(compiled, sandbox, { timeout: 2000, filename: 'academy-data.cjs' });
  const { academies, assertUniqueAcademyRoutes } = sandbox.exports;
  if (!Array.isArray(academies) || typeof assertUniqueAcademyRoutes !== 'function') {
    throw new Error('Academy route validator is missing from source');
  }
  const clone = () => JSON.parse(JSON.stringify(academies));
  const expectedRoutes = 124;
  const count = assertUniqueAcademyRoutes(clone());
  if (count !== expectedRoutes) throw new Error(`Expected ${expectedRoutes} distinct declared academy routes; got ${count}`);
  for (const [label, inject] of [
    ['topic/practice collision', (registry) => { registry[1].topics[0].slug = 'interview'; }],
    ['topic/topic collision', (registry) => { registry[1].topics[1].slug = registry[1].topics[0].slug; }],
    ['duplicate academy slug', (registry) => { registry[1].slug = registry[0].slug; }],
  ]) {
    const invalid = clone();
    inject(invalid);
    let rejected = false;
    try { assertUniqueAcademyRoutes(invalid); }
    catch (err) {
      if (String(err).includes('Academy route collision:')) rejected = true;
      else throw err;
    }
    if (!rejected) throw new Error(`Negative route-registry case was NOT rejected: ${label}`);
  }
}

try {
  testAcademyRouteUniqueness();
  await waitForServer();

  await verifyRoute('/training-academy/', 'Verified Training Academy');
  await verifyRoute('/search/', 'Search all 19 Training Academy tracks');

  // Both dedicated practice and module-detail URLs must be owned correctly.
  await verifyRoute('/terraform/interview/', 'Senior interview drills');
  await verifyRoute('/terraform/labs/', 'Hands-on lab briefs');
  await verifyRoute('/terraform/interview-module/', '<h1>Terraform Interviews</h1>');
  await verifyRoute('/terraform/labs-module/', '<h1>Terraform Labs</h1>');
  const terraformOverview = await fetch(`${BASE}/terraform/`);
  const terraformOverviewHtml = await terraformOverview.text();
  if (terraformOverview.status !== 200) errors.push(`/terraform/ returned ${terraformOverview.status}`);
  for (const slug of ['interview-module', 'labs-module']) {
    if (!terraformOverviewHtml.includes(`href="/terraform/${slug}/"`)) {
      errors.push(`Terraform academy module card missing distinct link: /terraform/${slug}/`);
    }
  }

  const robotsResponse = await fetch(`${BASE}/robots.txt`);
  const robotsBody = await robotsResponse.text();
  if (robotsResponse.status !== 200) errors.push(`/robots.txt returned ${robotsResponse.status}`);
  if (!/^User-Agent:\s*\*/im.test(robotsBody)) errors.push('/robots.txt lacks wildcard user-agent rule');
  if (!/^Allow:\s*\/$/im.test(robotsBody)) errors.push('/robots.txt lacks root allow directive');
  if (!new RegExp(`^Host:\\s*${PUBLIC_BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/?$`, 'im').test(robotsBody)) errors.push('/robots.txt host does not match canonical production origin');
  if (!new RegExp(`^Sitemap:\\s*${PUBLIC_BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap\\.xml$`, 'im').test(robotsBody)) errors.push('/robots.txt sitemap directive does not match canonical sitemap');

  const sitemapResponse = await fetch(`${BASE}/sitemap.xml`);
  const sitemapBody = await sitemapResponse.text();
  const sitemapLocations = [...sitemapBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const uniqueSitemapLocations = new Set(sitemapLocations);
  for (const route of [
    '/terraform/interview/', '/terraform/labs/',
    '/terraform/interview-module/', '/terraform/labs-module/',
  ]) {
    const occurrences = sitemapLocations.filter((url) => url === `${PUBLIC_BASE}${route}`).length;
    if (occurrences !== 1) errors.push(`Terraform sitemap route ${route} appears ${occurrences} times; expected 1`);
  }
  const expectedTrainingLocations = EXPECTED_PHYSICAL_LEARNER_ROUTES + tracks.length + 1;
  if (sitemapResponse.status !== 200) errors.push(`/sitemap.xml returned ${sitemapResponse.status}`);
  if (sitemapLocations.length !== uniqueSitemapLocations.size) errors.push(`sitemap contains duplicate URLs: ${sitemapLocations.length} entries / ${uniqueSitemapLocations.size} unique URLs`);
  if (sitemapLocations.filter((location) => location.startsWith(`${PUBLIC_BASE}/training-academy/`)).length !== expectedTrainingLocations) errors.push(`sitemap Training Academy URL count does not equal ${expectedTrainingLocations}`);
  if (!sitemapBody.includes(`${PUBLIC_BASE}/training-academy/</loc>`)) errors.push('sitemap lacks Training Academy landing route');
  for (const route of INACTIVE_IDENTITY_ROUTES) {
    const inactiveLocation = `${PUBLIC_BASE}${route}`;
    if (uniqueSitemapLocations.has(inactiveLocation)) errors.push(`inactive identity route must not appear in sitemap: ${route}`);
  }
  await verifyPublishedSitemapRoutes(sitemapLocations);

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

  for (const route of INACTIVE_IDENTITY_ROUTES) await verifyInactiveIdentityRoute(route);

  const missing = await fetch(`${BASE}/__osb_missing_route__/`, { redirect: 'manual' });
  if (missing.status !== 404) errors.push(`missing-route boundary returned ${missing.status}, expected 404`);

  const result = {
    gate: errors.length ? 'FAIL' : 'PASS',
    classification: 'SERVED_STATIC_EXPORT_RUNTIME_SMOKE',
    canonicalTracks: tracks.length,
    physicalLearnerRoutes: uniqueRecords.length,
    publishedSitemapRoutesChecked: sitemapLocations.length,
    inactiveIdentityRoutesChecked: INACTIVE_IDENTITY_ROUTES.length,
    robotsTxtChecked: true,
    fixedRoutesChecked: 7,
    invalidRouteBoundaryChecked: true,
    totalSuccessfulSurfaceExpected: tracks.length + uniqueRecords.length + INACTIVE_IDENTITY_ROUTES.length + 8,
    claimBoundary: 'This validates the served production export over HTTP, including generated crawl controls. It does not certify client-side interaction, keyboard usability, WCAG conformance, responsive layout, cross-browser behavior, or manual UAT.',
    errors,
  };
  console.log(JSON.stringify(result, null, 2));
  if (errors.length) process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
}
