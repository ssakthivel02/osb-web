import { existsSync, readFileSync } from 'node:fs';

const gateUrl = new URL('../release/OSB_RELEASE_GATE.json', import.meta.url);
const indexUrl = new URL('../release/OSB_RELEASE_EVIDENCE_INDEX.json', import.meta.url);
const uatUrl = new URL('../release/OSB_UAT_EVIDENCE_TEMPLATE.json', import.meta.url);
const gate = JSON.parse(readFileSync(gateUrl, 'utf8'));
const index = JSON.parse(readFileSync(indexUrl, 'utf8'));
const uat = JSON.parse(readFileSync(uatUrl, 'utf8'));

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
  'uat_preview_contract',
  'release_state_regression_cases',
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

if (index.schema !== 'osb.release-evidence-index.v2') fail('release evidence index schema mismatch');
if (index.repository !== gate.canonicalRepository) fail('release evidence repository mismatch');
if (index.evidenceBranch !== gate.evidenceBranch) fail('release evidence branch mismatch');
if (index.productPr !== gate.productPr) fail('release evidence PR mismatch');

const snapshot = index.automatedEvidenceSnapshot ?? {};
if (!/^[0-9a-f]{40}$/.test(snapshot.candidateSha ?? '')) fail('automated evidence snapshot SHA missing or invalid');
if (!Number.isInteger(snapshot.workflowRun) || snapshot.workflowRun < 1) fail('automated evidence snapshot workflow run missing');
if (snapshot.workflowName !== 'Validate Web Baseline') fail('unexpected automated evidence workflow name');
if (snapshot.result !== 'SUCCESS') fail('automated evidence snapshot must record a successful run');
if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.capturedOn ?? '')) fail('automated evidence snapshot date missing or invalid');
if (typeof snapshot.semantics !== 'string' || !snapshot.semantics.includes('previously passed exact candidate')) fail('automated evidence snapshot semantics missing');

if (!['HOLD','CONDITIONAL_GO','PROD_GO'].includes(index.releaseStatus)) fail('invalid release evidence index status');
if (!['NOT_RUN','IN_PROGRESS','COMPLETE'].includes(uat.status)) fail('invalid UAT status');
if (!['HOLD','CONDITIONAL_GO','PROD_GO'].includes(uat.decision)) fail('invalid UAT decision');
if (uat.candidate?.repository !== gate.canonicalRepository) fail('UAT repository mismatch');
if (uat.candidate?.branch !== gate.evidenceBranch) fail('UAT branch mismatch');

const exactUatSha = index.exactManualUatCandidateSha;
if (exactUatSha !== null && !/^[0-9a-f]{40}$/i.test(String(exactUatSha))) fail('manual UAT candidate SHA must be null or exact 40-character SHA');
if (uat.candidate?.sha !== exactUatSha) fail('UAT evidence and release evidence index candidate SHA mismatch');
if (uat.decision !== index.releaseStatus) fail('UAT decision and release evidence index status mismatch');
if (gate.productionReleaseStatus !== index.releaseStatus) fail('release gate and release evidence index status mismatch');

const requiredEvidenceIds = [
  'corpus_integrity',
  'learner_journey_closure',
  'pre_uat_readiness',
  'uat_evidence_integrity',
  'uat_preview_contract',
  'release_state_regression_cases',
  'served_export_runtime_smoke',
  'chromium_interaction_smoke',
  'multi_engine_responsive_keyboard_smoke',
];
if (!Array.isArray(index.automatedEvidence)) fail('automated evidence index missing');
const automatedIds = index.automatedEvidence.map((entry) => entry?.id);
if (new Set(automatedIds).size !== automatedIds.length) fail('duplicate automated evidence id');
for (const id of requiredEvidenceIds) {
  if (!automatedIds.includes(id)) fail(`missing automated evidence index entry: ${id}`);
}
for (const entry of index.automatedEvidence) {
  if (typeof entry?.ref !== 'string' || entry.ref.length === 0) fail(`automated evidence ref missing for ${entry?.id ?? 'unknown id'}`);
  const refUrl = new URL(`../${entry.ref}`, import.meta.url);
  if (!existsSync(refUrl)) fail(`missing automated evidence reference: ${entry.ref}`);
}
for (const evidenceRef of index.releaseEvidence ?? []) {
  const refUrl = new URL(`../${evidenceRef}`, import.meta.url);
  if (!existsSync(refUrl)) fail(`missing release evidence reference: ${evidenceRef}`);
}

const manual = gate.manualGates ?? {};
const allManualComplete = Object.values(manual).length > 0 && Object.values(manual).every((value) => value === true);
const anyManualComplete = Object.values(manual).some((value) => value === true);
const protectionEvidence = index.externalEvidenceReviews?.githubServerSideProtection ?? {};
const protectionStatus = protectionEvidence.status;
if (!['UNVERIFIED', 'ABSENT', 'VERIFIED'].includes(protectionStatus)) fail(`invalid server-side protection evidence status: ${protectionStatus}`);
if (protectionStatus === 'ABSENT') {
  if (protectionEvidence.branch !== 'main') fail('ABSENT protection evidence must identify main branch');
  if (protectionEvidence.branchProtected !== false) fail('ABSENT protection evidence must record branchProtected=false');
  if (protectionEvidence.requiredStatusChecksEnforced !== false) fail('ABSENT protection evidence must record requiredStatusChecksEnforced=false');
  if (!Number.isInteger(protectionEvidence.rulesetsObserved) || protectionEvidence.rulesetsObserved !== 0) fail('ABSENT protection evidence must record zero observed rulesets');
  if (gate.githubServerSideProtectionVerified !== false) fail('release gate cannot claim verified server-side protection while evidence status is ABSENT');
}
if (protectionStatus === 'VERIFIED' && gate.githubServerSideProtectionVerified !== true) fail('VERIFIED protection evidence requires release gate verification=true');
if (gate.githubServerSideProtectionVerified === true && protectionStatus !== 'VERIFIED') fail('release gate protection verification requires VERIFIED external evidence');
const protectionComplete = gate.githubServerSideProtectionVerified === true && protectionStatus === 'VERIFIED';

if (uat.status === 'NOT_RUN') {
  if (exactUatSha !== null) fail('NOT_RUN UAT must not record a manual candidate SHA');
  if (index.releaseStatus !== 'HOLD') fail('NOT_RUN UAT must remain HOLD');
  if (anyManualComplete) fail('manual gates cannot be complete before UAT begins');
  if (gate.productionDeploymentApproved !== false) fail('production deployment must remain unapproved before UAT');
}

if (uat.status === 'IN_PROGRESS') {
  if (!exactUatSha) fail('IN_PROGRESS UAT requires exact candidate SHA');
  if (index.releaseStatus !== 'HOLD') fail('IN_PROGRESS UAT must remain HOLD');
  if (gate.productionDeploymentApproved !== false) fail('production deployment must remain unapproved while UAT is in progress');
}

if (index.releaseStatus === 'CONDITIONAL_GO') {
  if (uat.status !== 'COMPLETE') fail('CONDITIONAL_GO requires COMPLETE UAT evidence');
  if (!exactUatSha) fail('CONDITIONAL_GO requires exact candidate SHA');
  if (gate.productionDeploymentApproved !== false) fail('CONDITIONAL_GO must not authorize production deployment');
  if (allManualComplete && protectionComplete) fail('CONDITIONAL_GO is inconsistent when all production gates are complete');
}

if (index.releaseStatus === 'PROD_GO') {
  if (uat.status !== 'COMPLETE') fail('PROD_GO requires COMPLETE UAT evidence');
  if (!exactUatSha) fail('PROD_GO requires exact candidate SHA');
  if (!allManualComplete) fail('PROD_GO requires every manual release gate');
  if (!protectionComplete) fail('PROD_GO requires verified server-side governance protection');
  if (gate.productionDeploymentApproved !== true) fail('PROD_GO requires explicit production deployment approval');
}

if (index.releaseStatus !== 'PROD_GO' && gate.productionDeploymentApproved !== false) fail('production deployment approval is only valid for PROD_GO');

console.log('OSB_RELEASE_GATE_PASS');
console.log(`phase=${uat.status} release=${index.releaseStatus} manual_candidate=${exactUatSha ?? 'none'}`);
console.log(`governance=${protectionStatus} rulesets=${protectionEvidence.rulesetsObserved ?? 'unknown'} branch_protected=${protectionEvidence.branchProtected ?? 'unknown'}`);
console.log(`Automated evidence snapshot: ${snapshot.candidateSha} / ${snapshot.workflowName} #${snapshot.workflowRun} (${snapshot.result}).`);
console.log('The snapshot is historical evidence; the commit containing this index must independently pass CI before it becomes a validated candidate.');
console.log('Release authorization remains fail-closed: only a fully evidenced PROD_GO state may approve production deployment.');
