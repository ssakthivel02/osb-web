// Passive, read-only production smoke. Must never mutate deployed content.
const ORIGIN = 'https://learn.omsaravanabhava.org';
const cases = [
  { path: '/', marker: 'OmSaravanaBhava Learning Ecosystem' },
  { path: '/training-academy/', marker: 'Training Academy' },
];
let failed = false;

for (const item of cases) {
  const expected = new URL(item.path, ORIGIN);
  try {
    const response = await fetch(expected, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
      headers: { 'user-agent': 'OSB-production-readonly-smoke/1.0' },
    });
    const destination = new URL(response.url);
    if (destination.protocol !== 'https:' || destination.hostname !== expected.hostname) {
      throw new Error('redirected outside approved production HTTPS origin');
    }
    if (!response.ok) throw new Error('HTTP status ' + response.status);
    if (!response.headers.get('content-type')?.includes('text/html')) {
      throw new Error('unexpected response content type');
    }
    const html = await response.text();
    if (!html.includes(item.marker) || !/<html\b/i.test(html)) {
      throw new Error('expected route identity missing');
    }
    console.log('OSB_LIVE_SMOKE_PASS ' + item.path + ' status=' + response.status);
  } catch (error) {
    failed = true;
    console.error('OSB_LIVE_SMOKE_FAIL ' + item.path + ': ' + error.message);
  }
}
if (failed) process.exitCode = 1;
