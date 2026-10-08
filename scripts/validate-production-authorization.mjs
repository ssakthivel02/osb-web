import { readFileSync } from 'node:fs';

const gate = JSON.parse(readFileSync(new URL('../release/OSB_RELEASE_GATE.json', import.meta.url), 'utf8'));
const index = JSON.parse(readFileSync(new URL('../release/OSB_RELEASE_EVIDENCE_INDEX.json', import.meta.url), 'utf8'));
const uat = JSON.parse(readFileSync(new URL('../release/OSB_UAT_EVIDENCE_TEMPLATE.json', import.meta.url), 'utf8'));

const fail = (message) => {
  console.error(`OSB_PRODUCTION_AUTH_FAIL: ${message}`);
  process.exit(1);
};

const expectedSha = String(process.env.EXPECTED_DEPLOY_SHA ?? '').trim();
if (!/^[0-9a-f]{40}$/i.test(expectedSha)) fail('EXPECTED_DEPLOY_SHA must be an exact 40-character commit SHA');

if (gate.productionReleaseStatus !== 'PROD_GO') fail(`release status is ${gate.productionReleaseStatus}, expected PROD_GO`);
if (index.releaseStatus !== 'PROD_GO') fail(`evidence index status is ${index.releaseStatus}, expected PROD_GO`);
if (uat.status !== 'COMPLETE') fail(`UAT status is ${uat.status}, expected COMPLETE`);
if (uat.decision !== 'PROD_GO') fail(`UAT decision is ${uat.decision}, expected PROD_GO`);
if (gate.productionDeploymentApproved !== true) fail('productionDeploymentApproved must be true');
if (gate.githubServerSideProtectionVerified !== true) fail('server-side protection/governance must be verified');
if (index.externalEvidenceReviews?.githubServerSideProtection?.status !== 'VERIFIED') fail('evidence index must record VERIFIED server-side protection/governance');
if (!Object.values(gate.manualGates ?? {}).length || !Object.values(gate.manualGates).every((value) => value === true)) fail('all manual release gates must be true');
if (!uat.ownerApproval?.approved) fail('final owner release approval is required');
if (!uat.ownerApproval?.approvedBy || !uat.ownerApproval?.approvedAt || !uat.ownerApproval?.evidenceRef) fail('owner approval metadata is incomplete');

const candidateSha = index.exactManualUatCandidateSha;
if (!/^[0-9a-f]{40}$/i.test(String(candidateSha ?? ''))) fail('release evidence index lacks exact manual UAT candidate SHA');
if (uat.candidate?.sha !== candidateSha) fail('UAT evidence SHA does not match release evidence index');
if (candidateSha !== expectedSha) fail(`authorized candidate ${candidateSha} does not match deployment SHA ${expectedSha}`);

console.log('OSB_PRODUCTION_AUTH_PASS');
console.log(`authorized_sha=${expectedSha}`);
