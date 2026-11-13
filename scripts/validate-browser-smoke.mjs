import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4174;
const BASE = `http://127.0.0.1:${PORT}`;
const failures = [];

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

let browser;
try {
  await waitForServer();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto(`${BASE}/search/`, { waitUntil: 'networkidle' });
  const searchInput = page.locator('#training-search');
  await searchInput.fill('PowerShell');
  await searchInput.press('Enter');
  const liveText = (await page.locator('[aria-live="polite"]').innerText()).trim();
  if (!/result.*PowerShell/i.test(liveText)) failures.push(`search live-region did not update as expected: ${liveText}`);
  if ((await page.locator('a[href^="/training-academy/"]').count()) < 1) failures.push('PowerShell search produced no learner/track links');

  await searchInput.fill('zzzz-no-osb-result-zzzz');
  await searchInput.press('Enter');
  if (!(await page.getByText('No verified Training Academy records or tracks matched that search.').isVisible())) {
    failures.push('zero-result state was not rendered after search submit');
  }

  await page.goto(`${BASE}/training-academy/`, { waitUntil: 'networkidle' });
  const trackLink = page.locator('main a[href^="/training-academy/tracks/"]').first();
  const trackHref = await trackLink.getAttribute('href');
  if (!trackHref) {
    failures.push('catalogue exposes no track navigation link');
  } else {
    await trackLink.click();
    await page.waitForLoadState('networkidle');
    if (!page.url().includes('/training-academy/tracks/')) failures.push(`track click did not navigate to track page: ${page.url()}`);
    if (!(await page.locator('main h1').isVisible())) failures.push('track page missing visible primary heading');

    const recordLink = page
      .locator('main a[href^="/training-academy/"]:not([href="/training-academy/"]):not([href^="/training-academy/tracks/"])')
      .first();
    if ((await recordLink.count()) === 0) {
      failures.push('track page exposes no learner-record link');
    } else {
      const recordHref = await recordLink.getAttribute('href');
      if (!recordHref) {
        failures.push('track page learner-record link is missing href');
      } else {
        await recordLink.focus();
        await page.keyboard.press('Enter');
        await page.waitForURL((url) => url.pathname === recordHref || url.pathname === `${recordHref.replace(/\/$/, '')}/`, { timeout: 5000 });
        await page.waitForLoadState('networkidle');
        if (page.url().includes('/training-academy/tracks/')) failures.push(`keyboard activation did not leave track route: ${page.url()}`);
        if (!(await page.locator('main h1').isVisible())) failures.push('record page missing visible primary heading');
      }
    }
  }

  const runtimeErrors = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  await page.goto(`${BASE}/search/`, { waitUntil: 'networkidle' });
  await page.locator('#training-search').fill('Azure');
  await page.locator('#training-search').press('Enter');
  await page.waitForTimeout(150);
  if (runtimeErrors.length) failures.push(`browser runtime errors: ${runtimeErrors.join(' | ')}`);
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}

const result = {
  gate: failures.length ? 'FAIL' : 'PASS',
  classification: 'PINNED_CHROMIUM_INTERACTION_SMOKE_ONLY',
  candidateSurface: 'built static export served locally over HTTP',
  checks: [
    'hydrated search submit and aria-live result update',
    'zero-result rendering',
    'catalogue-to-track click navigation',
    'track-to-record keyboard Enter activation',
    'visible primary headings on navigated pages',
    'basic browser pageerror detection',
  ],
  claimBoundary: 'This Chromium-only smoke does not certify WCAG conformance, full keyboard usability, focus order/visibility, responsive layouts, Firefox/WebKit parity, screen readers, funding/claims review, owner approval or production readiness.',
  failures,
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
