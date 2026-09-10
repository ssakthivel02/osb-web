import { readFileSync } from 'node:fs';

const gate = JSON.parse(readFileSync(new URL('../release/OSB_RELEASE_GATE.json', import.meta.url), 'utf8'));

const fail = (message) => {
  console.error(`OSB_RELEASE_GATE_FAIL: ${message}`);
  process.exit(1);
};

if (gate.control !== 'OSB-RELEASE-GATE-001') fail('unexpected control id');
if (gate.canonicalRepository !== 'ssakthivel02/osb-web') fail('canonical repository mismatch');
if (gate.integrationBranch !== 'main') fail('integration branch mismatch');
if (gate.productPr !== 2) fail('product PR mismatch');
if (!Array.isArray(gate.verifiedAutomatedChecks) || gate.verifiedAutomatedChecks.length < 6) fail('automated evidence list incomplete');

const requiredChecks = [
  'web_baseline_validation',
  'web_safety_cases',
  'dependency_install',
  'corpus_integrity',
  'typescript_typecheck',
  'production_next_build',
];
for (const check of requiredChecks) {
  if (!gate.verifiedAutomatedChecks.includes(check)) fail(`missing automated check marker: ${check}`);
}

if (gate.githubServerSideProtectionVerified !== false) fail('server-side protection must remain false until independently verified');
if (gate.productionDeploymentApproved !== false) fail('production deployment must remain unapproved');
if (gate.productionReleaseStatus !== 'HOLD') fail('release status must remain HOLD while manual gates are incomplete');

const manual = gate.manualGates ?? {};
const incomplete = Object.entries(manual).filter(([, value]) => value !== false);
if (incomplete.length > 0) fail('manual gate values may only be promoted with real evidence and deliberate release update');

console.log('OSB_RELEASE_GATE_PASS');
console.log('Technical repository evidence is controlled; production remains HOLD pending preview/UAT, accessibility, cross-browser, claim review, owner approval and server-side protection evidence.');
