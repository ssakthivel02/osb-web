import { existsSync, readFileSync } from 'node:fs';

const gateUrl = new URL('../release/OSB_RELEASE_GATE.json', import.meta.url);
const indexUrl = new URL('../release/OSB_RELEASE_EVIDENCE_INDEX.json', import.meta.url);
const gate = JSON.parse(readFileSync(gateUrl, 'utf8'));
const index = JSON.parse(readFileSync(indexUrl, 'utf8'));

const fail = (message) => {
  console.error(`OSB_RELEASE_GATE_FAIL: ${message}`);
  process.exit(1);
};

if (gate.control !== 'OSB-RELEASE-GATE-001') fail('unexpected control id');
if (gate.canonicalRepository !== 'ssakthivel02/osb-web') fail('canonical repository mismatch');
if (gate.integrationBranch !== 'main') fail('integration branch mismatch');
if (gate.productPr !== 2) fail('product PR mismatch');

const requiredChecks = [
  'web_baseline_validation',
  'web_safety_cases',
  'dependency_install',
  'corpus_integrity',
  'learner_journey_closure',
  'pre_uat_readiness',
  'uat_evidence_integrity',
  'typescript_typecheck',
  'production_next_build',
  'served_export_runtime_smoke',
  'chromium_interaction_smoke',
  'multi_engine_responsive_keyboard_smoke',
];
if (!Array.isArray(gate.verifiedAutomatedChecks)) fail('automated evidence list missing');
for (const check of requiredChecks) {
  if (!gate.verifiedAutomatedChecks.includes(check)) fail(`missing automated check marker: ${check}`);
}

const fundingReview = gate.evidenceReviews?.fundingClaimsOfficialSourceReview;
if (fundingReview?.complete !== true) fail('funding public-source evidence review must be recorded');
if (fundingReview.reviewedOn !== '2026-09-11') fail('unexpected funding review date');
if (fundingReview.evidenceRef !== 'lib/funding-data.ts') fail('funding review evidence reference mismatch');

if (index.schema !== 'osb.release-evidence-index.v1') fail('release evidence index schema mismatch');
if (index.repository !== gate.canonicalRepository) fail('release evidence repository mismatch');
if (index.evidenceBranch !== gate.evidenceBranch) fail('release evidence branch mismatch');
if (index.productPr !== gate.productPr) fail('release evidence PR mismatch');
if (!/^[0-9a-f]{40}$/.test(index.generatedFromPassedHead ?? '')) fail('release evidence base SHA missing or invalid');
if (!Number.isInteger(index.latestPassedCiRun) || index.latestPassedCiRun < 1) fail('latest passed CI run missing');
if (index.exactManualUatCandidateSha !== null) fail('manual UAT candidate SHA must remain null until real manual UAT begins');
if (index.releaseStatus !== 'HOLD') fail('release evidence index must remain HOLD');
if (index.externalEvidenceReviews?.githubServerSideProtection?.status !== 'UNVERIFIED') fail('server-side protection must remain unverified');

for (const evidenceRef of index.releaseEvidence ?? []) {
  const refUrl = new URL(`../${evidenceRef}`, import.meta.url);
  if (!existsSync(refUrl)) fail(`missing release evidence reference: ${evidenceRef}`);
}

if (gate.githubServerSideProtectionVerified !== false) fail('server-side protection must remain false until independently verified');
if (gate.productionDeploymentApproved !== false) fail('production deployment must remain unapproved');
if (gate.productionReleaseStatus !== 'HOLD') fail('release status must remain HOLD while manual gates are incomplete');

const manual = gate.manualGates ?? {};
const promotedManualGates = Object.entries(manual).filter(([, value]) => value !== false);
if (promotedManualGates.length > 0) fail('manual gate values may only be promoted with real evidence and deliberate release update');

console.log('OSB_RELEASE_GATE_PASS');
console.log(`Release evidence indexed from passed head ${index.generatedFromPassedHead} / CI #${index.latestPassedCiRun}.`);
console.log('Automated and public-source evidence is controlled; production remains HOLD pending exact-candidate manual UAT, accessibility judgement, final claim review, owner approval and server-side protection evidence.');
