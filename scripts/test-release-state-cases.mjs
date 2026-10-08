import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const RELEASE_DIR = path.join(ROOT, 'release');
const PATHS = {
  gate: path.join(RELEASE_DIR, 'OSB_RELEASE_GATE.json'),
  index: path.join(RELEASE_DIR, 'OSB_RELEASE_EVIDENCE_INDEX.json'),
  uat: path.join(RELEASE_DIR, 'OSB_UAT_EVIDENCE_TEMPLATE.json'),
  preview: path.join(RELEASE_DIR, 'OSB_UAT_PREVIEW_CONTRACT.json'),
};
const ORIGINALS = Object.fromEntries(Object.entries(PATHS).map(([key, file]) => [key, fs.readFileSync(file, 'utf8')]));
const BASE = Object.fromEntries(Object.entries(ORIGINALS).map(([key, raw]) => [key, JSON.parse(raw)]));
const SHA = '1111111111111111111111111111111111111111';
const OTHER_SHA = '2222222222222222222222222222222222222222';
const PREVIEW_URL = `https://uat-preview.example.invalid/osb/${SHA}/`;
const validators = [
  ['release', 'scripts/validate-release-gate.mjs'],
  ['readiness', 'scripts/validate-pre-uat-readiness.mjs'],
  ['uat', 'scripts/validate-uat-evidence.mjs'],
  ['preview', 'scripts/validate-uat-preview-contract.mjs'],
];

const clone = (value) => JSON.parse(JSON.stringify(value));
const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);

function restore() {
  for (const [key, file] of Object.entries(PATHS)) fs.writeFileSync(file, ORIGINALS[key]);
}

function writeState(state) {
  writeJson(PATHS.gate, state.gate);
  writeJson(PATHS.index, state.index);
  writeJson(PATHS.uat, state.uat);
  writeJson(PATHS.preview, state.preview);
}

function run(script, env = {}) {
  return spawnSync(process.execPath, [script], {
    cwd: ROOT,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
}

function details(result) {
  return `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();
}

function expectPass(name, script, env = {}) {
  const result = run(script, env);
  if (result.status !== 0) throw new Error(`${name} expected PASS but failed:\n${details(result)}`);
}

function expectFail(name, script, env = {}) {
  const result = run(script, env);
  if (result.status === 0) throw new Error(`${name} expected FAIL but passed`);
}

function hostedPreview(preview, sha = SHA) {
  preview.status = 'HOSTED';
  preview.candidateSha = sha;
  preview.hosting = {
    provider: 'release-state-fixture',
    previewUrl: PREVIEW_URL,
    sourceArtifactName: `${preview.source.artifactPrefix}${sha}`,
    hostedAt: '2026-09-12T20:00:00Z',
  };
}

function setAllManualResults(uat, value) {
  for (const sectionName of ['accessibility', 'responsive', 'browsers']) {
    for (const key of Object.keys(uat[sectionName])) {
      if (key !== 'evidenceRefs') uat[sectionName][key] = value;
    }
  }
  uat.linksAndClaims.internalLinks = value;
  uat.linksAndClaims.officialExternalLinks = value;
}

function baseState() {
  return clone(BASE);
}

function inProgressState() {
  const state = baseState();
  hostedPreview(state.preview);
  state.index.exactManualUatCandidateSha = SHA;
  state.uat.status = 'IN_PROGRESS';
  state.uat.candidate.sha = SHA;
  state.uat.candidate.previewUrl = PREVIEW_URL;
  state.uat.accessibility.keyboardOnly = 'PASS';
  state.gate.manualGates.accessibilityReviewComplete = true;
  return state;
}

function completeState(decision) {
  const state = baseState();
  hostedPreview(state.preview);
  state.index.exactManualUatCandidateSha = SHA;
  state.index.releaseStatus = decision;
  state.gate.productionReleaseStatus = decision;
  state.uat.status = 'COMPLETE';
  state.uat.decision = decision;
  state.uat.candidate.sha = SHA;
  state.uat.candidate.previewUrl = PREVIEW_URL;
  state.uat.candidate.testedAt = '2026-09-12T20:15:00Z';
  state.uat.candidate.tester = 'release-state-fixture';
  state.uat.candidate.environment = 'isolated-uat-preview';
  state.uat.criticalJourneys = [{ id: 'fixture-journey', result: 'PASS' }];
  setAllManualResults(state.uat, 'PASS');
  state.uat.linksAndClaims.fundingClaimsReviewed = true;
  state.gate.manualGates.previewUatComplete = true;
  state.gate.manualGates.accessibilityReviewComplete = true;
  state.gate.manualGates.responsiveCrossBrowserReviewComplete = true;
  state.gate.manualGates.criticalLearnerJourneysVerified = true;
  state.gate.manualGates.fundingClaimsReviewedAgainstOfficialSources = true;
  return state;
}

function conditionalState() {
  const state = completeState('CONDITIONAL_GO');
  state.gate.manualGates.ownerReleaseApproval = false;
  state.uat.ownerApproval = { approved: false, approvedBy: null, approvedAt: null, evidenceRef: null };
  state.gate.githubServerSideProtectionVerified = false;
  state.gate.productionDeploymentApproved = false;
  state.index.externalEvidenceReviews.githubServerSideProtection = {
    status: 'ABSENT',
    reviewedOn: '2026-09-12',
    branch: 'main',
    branchProtected: false,
    requiredStatusChecksEnforced: false,
    rulesetsObserved: 0,
    claimBoundary: 'fixture: governance intentionally absent',
  };
  return state;
}

function prodGoState() {
  const state = completeState('PROD_GO');
  state.gate.manualGates.ownerReleaseApproval = true;
  state.gate.githubServerSideProtectionVerified = true;
  state.gate.productionDeploymentApproved = true;
  state.index.externalEvidenceReviews.githubServerSideProtection = {
    status: 'VERIFIED',
    reviewedOn: '2026-09-12',
    branch: 'main',
    branchProtected: true,
    requiredStatusChecksEnforced: true,
    rulesetsObserved: 1,
    claimBoundary: 'fixture: verified governance',
  };
  state.uat.ownerApproval = {
    approved: true,
    approvedBy: 'release-state-fixture',
    approvedAt: '2026-09-12T20:30:00Z',
    evidenceRef: 'fixture://owner-approval',
  };
  return state;
}

function assertLegal(name, state, { productionAuth = false } = {}) {
  writeState(state);
  for (const [validatorName, script] of validators) expectPass(`${name}/${validatorName}`, script);
  if (productionAuth) expectPass(`${name}/production-auth`, 'scripts/validate-production-authorization.mjs', { EXPECTED_DEPLOY_SHA: SHA });
}

function assertIllegal(name, state, script, env = {}) {
  writeState(state);
  expectFail(name, script, env);
}

let caught;
try {
  assertLegal('PRE_UAT_HOLD', baseState());
  assertLegal('UAT_IN_PROGRESS_HOLD_PARTIAL_MANUAL', inProgressState());
  assertLegal('UAT_COMPLETE_CONDITIONAL_GO', conditionalState());
  assertLegal('UAT_COMPLETE_PROD_GO', prodGoState(), { productionAuth: true });

  {
    const state = baseState();
    state.gate.manualGates.previewUatComplete = true;
    assertIllegal('NOT_RUN_WITH_MANUAL_GATE_TRUE', state, 'scripts/validate-release-gate.mjs');
  }
  {
    const state = inProgressState();
    state.index.exactManualUatCandidateSha = null;
    state.uat.candidate.sha = null;
    assertIllegal('IN_PROGRESS_WITHOUT_EXACT_SHA', state, 'scripts/validate-release-gate.mjs');
  }
  {
    const state = conditionalState();
    state.uat.status = 'IN_PROGRESS';
    assertIllegal('CONDITIONAL_GO_BEFORE_UAT_COMPLETE', state, 'scripts/validate-release-gate.mjs');
  }
  {
    const state = conditionalState();
    state.gate.productionDeploymentApproved = true;
    assertIllegal('CONDITIONAL_GO_WITH_DEPLOYMENT_APPROVAL', state, 'scripts/validate-release-gate.mjs');
  }
  {
    const state = prodGoState();
    state.gate.githubServerSideProtectionVerified = false;
    state.index.externalEvidenceReviews.githubServerSideProtection = {
      status: 'ABSENT', reviewedOn: '2026-09-12', branch: 'main', branchProtected: false,
      requiredStatusChecksEnforced: false, rulesetsObserved: 0, claimBoundary: 'fixture: governance absent',
    };
    assertIllegal('PROD_GO_WITHOUT_GOVERNANCE', state, 'scripts/validate-release-gate.mjs');
  }
  {
    const state = prodGoState();
    state.uat.ownerApproval = { approved: false, approvedBy: null, approvedAt: null, evidenceRef: null };
    assertIllegal('PROD_GO_WITHOUT_OWNER_APPROVAL', state, 'scripts/validate-uat-evidence.mjs');
  }
  {
    const state = prodGoState();
    assertIllegal('DEPLOYMENT_SHA_MISMATCH', state, 'scripts/validate-production-authorization.mjs', { EXPECTED_DEPLOY_SHA: OTHER_SHA });
  }
  {
    const state = inProgressState();
    state.preview.hosting.previewUrl = 'https://learn.omsaravanabhava.org/uat/';
    assertIllegal('PREVIEW_USES_PRODUCTION_HOST', state, 'scripts/validate-uat-preview-contract.mjs');
  }
  {
    const state = inProgressState();
    state.preview.status = 'PROVIDER_PENDING';
    state.preview.candidateSha = null;
    state.preview.hosting = { provider: null, previewUrl: null, sourceArtifactName: null, hostedAt: null };
    assertIllegal('UAT_STARTED_WITHOUT_HOSTED_PREVIEW', state, 'scripts/validate-uat-preview-contract.mjs');
  }

  console.log('OSB_RELEASE_STATE_REGRESSION_PASS');
  console.log('legal_cases=4 illegal_cases=9');
} catch (error) {
  caught = error;
} finally {
  restore();
}

for (const [key, file] of Object.entries(PATHS)) {
  if (fs.readFileSync(file, 'utf8') !== ORIGINALS[key]) throw new Error(`release-state test failed to restore ${key} evidence file`);
}
if (caught) throw caught;
