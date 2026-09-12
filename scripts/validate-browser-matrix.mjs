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

async function checkSemanticAccessibility(page, label) {
  const result = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    };

    const accessibleName = (element) => {
      const ariaLabel = element.getAttribute('aria-label')?.trim();
      if (ariaLabel) return ariaLabel;
      const labelledBy = element.getAttribute('aria-labelledby');
      if (labelledBy) {
        const text = labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
          .filter(Boolean)
          .join(' ');
        if (text) return text;
      }
      const title = element.getAttribute('title')?.trim();
      if (title) return title;
      const text = element.textContent?.trim();
      if (text) return text;
      const imageAlt = element.querySelector('img[alt]')?.getAttribute('alt')?.trim();
      return imageAlt ?? '';
    };

    const unlabeledControls = [...document.querySelectorAll('input, select, textarea')]
      .filter((element) => visible(element) && element.getAttribute('type') !== 'hidden')
      .filter((element) => {
        const id = element.getAttribute('id');
        return !(
          element.getAttribute('aria-label')?.trim() ||
          element.getAttribute('aria-labelledby')?.trim() ||
          element.getAttribute('title')?.trim() ||
          (id && document.querySelector(`label[for="${CSS.escape(id)}"]`)) ||
          element.closest('label')
        );
      })
      .map((element) => element.outerHTML.slice(0, 180));

    const unnamedInteractive = [...document.querySelectorAll('a[href], button, summary')]
      .filter(visible)
      .filter((element) => !accessibleName(element))
      .map((element) => element.outerHTML.slice(0, 180));

    const imagesMissingAlt = [...document.querySelectorAll('img')]
      .filter(visible)
      .filter((element) => !element.hasAttribute('alt'))
      .map((element) => element.outerHTML.slice(0, 180));

    const visibleMains = [...document.querySelectorAll('main')].filter(visible).length;
    const visibleH1s = [...document.querySelectorAll('h1')].filter(visible).length;

    return {
      lang: document.documentElement.getAttribute('lang')?.trim() ?? '',
      visibleMains,
      visibleH1s,
      unlabeledControls,
      unnamedInteractive,
      imagesMissingAlt,
    };
  });

  if (!result.lang) failures.push(`${label}: document language is missing`);
  if (result.visibleMains !== 1) failures.push(`${label}: expected exactly one visible main landmark, found ${result.visibleMains}`);
  if (result.visibleH1s !== 1) failures.push(`${label}: expected exactly one visible h1, found ${result.visibleH1s}`);
  if (result.unlabeledControls.length) failures.push(`${label}: unlabeled form controls: ${result.unlabeledControls.join(' | ')}`);
  if (result.unnamedInteractive.length) failures.push(`${label}: unnamed interactive controls: ${result.unnamedInteractive.join(' | ')}`);
  if (result.imagesMissingAlt.length) failures.push(`${label}: images missing alt attribute: ${result.imagesMissingAlt.join(' | ')}`);
}

async function focusByTab(page, locator, label, maxTabs = 60) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });
  for (let i = 0; i < maxTabs; i += 1) {
    await page.keyboard.press('Tab');
    if (await locator.evaluate((element) => document.activeElement === element)) {
      const style = await locator.evaluate((element) => {
        const computed = getComputedStyle(element);
        return {
          outlineStyle: computed.outlineStyle,
          outlineWidth: computed.outlineWidth,
          boxShadow: computed.boxShadow,
        };
      });
      const outlineVisible = style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0;
      const shadowVisible = style.boxShadow !== 'none';
      if (!outlineVisible && !shadowVisible) failures.push(`${label}: keyboard focus has no visible indicator`);
      return true;
    }
  }
  failures.push(`${label}: target was not reachable by Tab within ${maxTabs} key presses`);
  return false;
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
    await checkSemanticAccessibility(page, `${label} search`);
    const searchInput = page.locator('#training-search');
    if (!(await focusByTab(page, searchInput, `${label} search input`))) return;
    await searchInput.fill('Azure');
    await searchInput.press('Enter');
    const liveText = (await page.locator('[aria-live="polite"]').innerText()).trim();
    if (!/result.*Azure/i.test(liveText)) failures.push(`${label}: search live-region did not update: ${liveText}`);
    if ((await page.locator('main a[href^="/training-academy/"]').count()) < 1) failures.push(`${label}: search produced no academy links`);

    await page.goto(`${BASE}/training-academy/`, { waitUntil: 'networkidle' });
    await checkNoHorizontalOverflow(page, `${label} catalogue`);
    await checkSemanticAccessibility(page, `${label} catalogue`);
    if (!(await page.locator('main h1').isVisible())) failures.push(`${label}: catalogue missing visible h1`);

    const trackLink = page.locator('main a[href^="/training-academy/tracks/"]').first();
    const trackHref = await trackLink.getAttribute('href');
    if (!trackHref) {
      failures.push(`${label}: catalogue exposes no track link`);
      return;
    }
    if (!(await focusByTab(page, trackLink, `${label} track link`))) return;
    await page.keyboard.press('Enter');
    await page.waitForURL((url) => url.pathname.startsWith('/training-academy/tracks/'));
    await checkNoHorizontalOverflow(page, `${label} track`);
    await checkSemanticAccessibility(page, `${label} track`);
    if (!(await page.locator('main h1').isVisible())) failures.push(`${label}: track missing visible h1`);

    const recordLink = page.locator('main a[href^="/training-academy/"]:not([href="/training-academy/"]):not([href^="/training-academy/tracks/"])').first();
    const recordHref = await recordLink.getAttribute('href');
    if (!recordHref) {
      failures.push(`${label}: track exposes no learner-record link`);
      return;
    }
    if (!(await focusByTab(page, recordLink, `${label} learner-record link`))) return;
    await page.keyboard.press('Enter');
    await page.waitForURL((url) => url.pathname === new URL(recordHref, BASE).pathname);
    await checkNoHorizontalOverflow(page, `${label} record`);
    await checkSemanticAccessibility(page, `${label} record`);
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
  classification: 'AUTOMATED_MULTI_ENGINE_RESPONSIVE_KEYBOARD_SEMANTIC_SMOKE_ONLY',
  engines: engines.map(([name]) => name),
  viewports: viewports.map(([name, viewport]) => ({ name, ...viewport })),
  scenarios: 9,
  checks: [
    'hydrated search and aria-live update',
    'Tab reachability for search, track and learner-record controls',
    'visible keyboard focus indication',
    'keyboard activation for track and learner-record navigation',
    'document language presence',
    'exactly one visible main landmark on tested pages',
    'exactly one visible h1 on tested pages',
    'visible form controls have an accessible label source',
    'visible links/buttons/summaries have a basic accessible-name source',
    'visible images provide an alt attribute',
    'horizontal-overflow detection at mobile/tablet/desktop widths',
    'basic pageerror detection',
  ],
  claimBoundary: 'This automated matrix is not manual UAT, WCAG certification, assistive-technology or screen-reader testing, exhaustive accessible-name computation, exhaustive focus-order review, exhaustive responsive review, or owner release approval.',
  failures,
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
