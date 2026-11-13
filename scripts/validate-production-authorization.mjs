import { readFileSync } from 'node:fs';
import { verifyProductionPromotion, readFileAtCommit } from './lib/verify-production-promotion.mjs';
import { assertMuruganPublicationReady } from './lib/verify-murugan-publication.mjs';

const gate = JSON.parse(readFileSync(new URL('../release/OSB_RELEASE_GATE.json', import.meta.url), 'utf8'));
const index = JSON.parse(readFileSync(new URL('../release/OSB_RELEASE_EVIDENCE_INDEX.json', import.meta.url), 'utf8'));
const uat = JSON.parse(readFileSync(new URL('../release/OSB_UAT_EVIDENCE_TEMPLATE.json', import.meta.url), 'utf8'));
const murugan = JSON.parse(readFileSync(new URL('../lib/murugan-library.json', import.meta.url), 'utf8'));

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
try {
  assertMuruganPublicationReady(murugan);
} catch (error) {
  fail(error.message);
}
if (!uat.ownerApproval?.approved) fail('final owner release approval is required');
if (!uat.ownerApproval?.approvedBy || !uat.ownerApproval?.approvedAt || !uat.ownerApproval?.evidenceRef) fail('owner approval metadata is incomplete');

const candidateSha = index.exactManualUatCandidateSha;
if (!/^[0-9a-f]{40}$/i.test(String(candidateSha ?? ''))) fail('release evidence index lacks exact manual UAT candidate SHA');
if (uat.candidate?.sha !== candidateSha) fail('UAT evidence SHA does not match release evidence index');
let promotion;
try {
  promotion = verifyProductionPromotion({ candidateSha, deploymentSha: expectedSha });
} catch (error) {
  fail(error.message);
}

// Non-self-reference: the UAT-tested candidate commit, as it stood at the
// point it was actually tested, must NOT already assert production
// approval/completion. verifyProductionPromotion() confirms the deploy SHA
// only changes the allowed release-metadata files relative to the
// candidate - it does not (and structurally cannot, since it is
// schema-agnostic) check what those files said at the candidate commit
// itself. Without this check, a single commit could claim to be both "the
// thing UAT tested" and "the thing that approved itself", with the
// required later commit doing nothing but a cosmetic edit.
const parseAtCandidate = (relPath, label) => {
  const text = readFileAtCommit(candidateSha, relPath);
  if (text === null) fail(`could not read ${label} from the UAT-tested candidate commit`);
  try {
    return JSON.parse(text);
  } catch {
    fail(`${label} at the UAT-tested candidate commit is not valid JSON`);
  }
};
const gateAtCandidate = parseAtCandidate('release/OSB_RELEASE_GATE.json', 'release gate');
const indexAtCandidate = parseAtCandidate('release/OSB_RELEASE_EVIDENCE_INDEX.json', 'release evidence index');
const uatAtCandidate = parseAtCandidate('release/OSB_UAT_EVIDENCE_TEMPLATE.json', 'UAT evidence');
if (
  gateAtCandidate.productionDeploymentApproved === true ||
  gateAtCandidate.productionReleaseStatus === 'PROD_GO' ||
  indexAtCandidate.releaseStatus === 'PROD_GO' ||
  uatAtCandidate.status === 'COMPLETE' ||
  uatAtCandidate.decision === 'PROD_GO' ||
  uatAtCandidate.ownerApproval?.approved === true
) {
  fail('UAT-tested candidate commit already asserted production approval/UAT-completion at the point it was tested - approval must be recorded only in a later, separate promotion commit (self-referential promotion rejected)');
}

console.log('OSB_PRODUCTION_AUTH_PASS');
console.log(`tested_candidate_sha=${promotion.testedCandidateSha}`);
console.log(`authorized_deployment_sha=${promotion.deploymentSha}`);
console.log(`approval_only_files=${promotion.changedFiles.join(',')}`);
