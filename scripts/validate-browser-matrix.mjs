import { spawn } from 'node:child_process';
import { chromium, firefox, webkit } from 'playwright';

const PORT = 4175;
const BASE = `http://127.0.0.1:${PORT}`;
const failures = [];
const engines = [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
];
const viewports = [
  ['mobile', { width: 390, height: 844 }],
  ['tablet', { width: 768, height: 1024 }],
  ['desktop', { width: 1440, height: 900 }],
];

const server = spawn('python3', ['-m', 'http.server', String(PORT), '--directory', 'out'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(`${BASE}/training-academy/`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('static export server did not become ready');
}

async function checkNoHorizontalOverflow(page, label) {
  const result = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (result.scrollWidth > result.clientWidth + 2) {
    failures.push(`${label}: horizontal overflow ${result.scrollWidth}px > ${result.clientWidth}px`);
  }
}

async function runScenario(engineName, browserType, viewportName, viewport) {
  let browser;
  try {
    browser = await browserType.launch({ headless: true });
    const page = await browser.newPage({ viewport });
    const label = `${engineName}/${viewportName}`;
    const runtimeErrors = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));

    await page.goto(`${BASE}/search/`, { waitUntil: 'networkidle' });
    await checkNoHorizontalOverflow(page, `${label} search`);
    const searchInput = page.locator('#training-search');
    await searchInput.fill('Azure');
    await searchInput.press('Enter');
    const liveText = (await page.locator('[aria-live="polite"]').innerText()).trim();
    if (!/result.*Azure/i.test(liveText)) failures.push(`${label}: search live-region did not update: ${liveText}`);
    if ((await page.locator('main a[href^="/training-academy/"]').count()) < 1) failures.push(`${label}: search produced no academy links`);

    await page.goto(`${BASE}/training-academy/`, { waitUntil: 'networkidle' });
    await checkNoHorizontalOverflow(page, `${label} catalogue`);
    if (!(await page.locator('main h1').isVisible())) failures.push(`${label}: catalogue missing visible h1`);

    const trackLink = page.locator('main a[href^="/training-academy/tracks/"]').first();
    const trackHref = await trackLink.getAttribute('href');
    if (!trackHref) {
      failures.push(`${label}: catalogue exposes no track link`);
      return;
    }
    await trackLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL((url) => url.pathname.startsWith('/training-academy/tracks/'));
    await checkNoHorizontalOverflow(page, `${label} track`);
    if (!(await page.locator('main h1').isVisible())) failures.push(`${label}: track missing visible h1`);

    const recordLink = page.locator('main a[href^="/training-academy/"]:not([href="/training-academy/"]):not([href^="/training-academy/tracks/"])').first();
    const recordHref = await recordLink.getAttribute('href');
    if (!recordHref) {
      failures.push(`${label}: track exposes no learner-record link`);
      return;
    }
    await recordLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL((url) => url.pathname === new URL(recordHref, BASE).pathname);
    await checkNoHorizontalOverflow(page, `${label} record`);
    if (!(await page.locator('main h1').isVisible())) failures.push(`${label}: record missing visible h1`);

    if (runtimeErrors.length) failures.push(`${label}: browser runtime errors: ${runtimeErrors.join(' | ')}`);
  } catch (error) {
    failures.push(`${engineName}/${viewportName}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (browser) await browser.close();
  }
}

try {
  await waitForServer();
  for (const [engineName, browserType] of engines) {
    for (const [viewportName, viewport] of viewports) {
      await runScenario(engineName, browserType, viewportName, viewport);
    }
  }
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
} finally {
  server.kill('SIGTERM');
}

const result = {
  gate: failures.length ? 'FAIL' : 'PASS',
  classification: 'AUTOMATED_MULTI_ENGINE_RESPONSIVE_SMOKE_ONLY',
  engines: engines.map(([name]) => name),
  viewports: viewports.map(([name, viewport]) => ({ name, ...viewport })),
  scenarios: 9,
  checks: [
    'hydrated search and aria-live update',
    'keyboard activation for track and learner-record navigation',
    'visible primary headings',
    'horizontal-overflow detection at mobile/tablet/desktop widths',
    'basic pageerror detection',
  ],
  claimBoundary: 'This automated matrix is not manual UAT, WCAG certification, screen-reader testing, exhaustive responsive review, or owner release approval.',
  failures,
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
