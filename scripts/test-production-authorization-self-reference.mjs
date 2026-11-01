/**
 * End-to-end regression for the non-self-reference check added to
 * scripts/validate-production-authorization.mjs. Exercises the real CLI
 * script (not just the lib) against a disposable, throwaway git repository
 * so it never touches this repository's own history or release files.
 *
 * Closes a real gap found by independent audit: verifyProductionPromotion()
 * correctly enforces ancestry and a metadata-only diff between the
 * UAT-tested candidate and the deployment commit, but - being git-lineage
 * only and schema-agnostic - it never inspected what the release files
 * said AT the candidate commit itself. Before this fix, a candidate commit
 * could already assert PROD_GO/approved/COMPLETE at the point it was
 * "tested", and a trivial, cosmetic metadata edit afterward (touching only
 * the required files, satisfying every existing check) was enough to pass
 * scripts/validate-production-authorization.mjs. Verified reproducible
 * against the pre-fix script before writing the fix; this test fails on
 * the pre-fix script and passes on the fixed one.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRootReal = path.resolve(scriptsDir, '..');

const GIT_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: 'OSB Test Harness',
  GIT_AUTHOR_EMAIL: 'osb-test@example.invalid',
  GIT_COMMITTER_NAME: 'OSB Test Harness',
  GIT_COMMITTER_EMAIL: 'osb-test@example.invalid',
  GIT_CONFIG_NOSYSTEM: '1',
  HOME: tmpdir(),
};
const sh = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, env: GIT_ENV, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const headSha = (repo) => sh('git', ['rev-parse', 'HEAD'], repo).trim();

const VALID_MURUGAN = {
  schema: 'osb.murugan-tamil-library.v1',
  productionContentApproval: true,
  texts: [
    {
      slug: 'test-fixture-item',
      humanPublicationApproval: true,
      publicationStatus: 'reviewed-opening-only',
      sourceFile: 'fixture.html',
      text: 'அறம் '.repeat(30),
    },
  ],
  queuedWorks: [],
  modernSongs: [],
};

function gateJson(extra = {}) {
  return JSON.stringify({
    productionReleaseStatus: 'HOLD',
    productionDeploymentApproved: false,
    githubServerSideProtectionVerified: false,
    manualGates: { a: true, b: true },
    ...extra,
  }, null, 2);
}
function indexJson(candidateSha, extra = {}) {
  return JSON.stringify({
    exactManualUatCandidateSha: candidateSha,
    releaseStatus: 'HOLD',
    externalEvidenceReviews: { githubServerSideProtection: { status: 'VERIFIED' } },
    ...extra,
  }, null, 2);
}
function uatJson(candidateSha, extra = {}) {
  return JSON.stringify({
    status: 'NOT_RUN',
    decision: 'HOLD',
    candidate: { sha: candidateSha },
    ownerApproval: { approved: false, approvedBy: null, approvedAt: null, evidenceRef: null },
    ...extra,
  }, null, 2);
}
const APPROVED = {
  gate: { productionReleaseStatus: 'PROD_GO', productionDeploymentApproved: true, githubServerSideProtectionVerified: true },
  index: { releaseStatus: 'PROD_GO' },
  uat: { status: 'COMPLETE', decision: 'PROD_GO', ownerApproval: { approved: true, approvedBy: 'owner@example.invalid', approvedAt: '2026-11-01T00:00:00Z', evidenceRef: 'release/approval.txt' } },
};

function writeReleaseFiles(repo, candidateSha, approved, cosmeticNote) {
  const bump = cosmeticNote ? { _note: cosmeticNote } : {};
  mkdirSync(path.join(repo, 'release'), { recursive: true });
  writeFileSync(path.join(repo, 'release', 'OSB_RELEASE_GATE.json'), gateJson({ ...(approved ? APPROVED.gate : {}), ...bump }));
  writeFileSync(path.join(repo, 'release', 'OSB_RELEASE_EVIDENCE_INDEX.json'), indexJson(candidateSha, { ...(approved ? APPROVED.index : {}), ...bump }));
  writeFileSync(path.join(repo, 'release', 'OSB_UAT_EVIDENCE_TEMPLATE.json'), uatJson(candidateSha, { ...(approved ? APPROVED.uat : {}), ...bump }));
}

function initRepo() {
  const repo = mkdtempSync(path.join(tmpdir(), 'osb-selfref-e2e-'));
  sh('git', ['init', '-q'], repo);
  sh('git', ['config', 'commit.gpgsign', 'false'], repo);
  mkdirSync(path.join(repo, 'scripts', 'lib'), { recursive: true });
  mkdirSync(path.join(repo, 'lib'), { recursive: true });
  copyFileSync(path.join(repoRootReal, 'scripts', 'validate-production-authorization.mjs'), path.join(repo, 'scripts', 'validate-production-authorization.mjs'));
  copyFileSync(path.join(repoRootReal, 'scripts', 'lib', 'verify-production-promotion.mjs'), path.join(repo, 'scripts', 'lib', 'verify-production-promotion.mjs'));
  copyFileSync(path.join(repoRootReal, 'scripts', 'lib', 'verify-murugan-publication.mjs'), path.join(repo, 'scripts', 'lib', 'verify-murugan-publication.mjs'));
  writeFileSync(path.join(repo, 'lib', 'murugan-library.json'), JSON.stringify(VALID_MURUGAN, null, 2));
  return repo;
}
function commit(repo, message) {
  sh('git', ['add', '-A'], repo);
  sh('git', ['commit', '-q', '-m', message], repo);
  return headSha(repo);
}
function runAuth(repo, deploySha) {
  try {
    const out = execFileSync('node', ['scripts/validate-production-authorization.mjs'], { cwd: repo, env: { ...GIT_ENV, EXPECTED_DEPLOY_SHA: deploySha }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 1, out: e.stdout ?? '', err: e.stderr ?? '' };
  }
}

let assertions = 0;
let repo;

// NEGATIVE: candidate commit is already self-approved when "UAT-tested";
// only a trivial, cosmetic follow-up edit to the three required files
// comes after it. Must be REJECTED.
repo = initRepo();
writeReleaseFiles(repo, '0'.repeat(40), /* approved */ true);
const selfApprovedCandidate = commit(repo, 'candidate already claims its own approval at UAT time');
writeReleaseFiles(repo, selfApprovedCandidate, /* approved */ true, /* cosmeticNote */ 'promotion-timestamp-bump');
const cosmeticPromotion = commit(repo, 'cosmetic-only follow-up (no real new approval act)');
{
  const result = runAuth(repo, cosmeticPromotion);
  assert.equal(result.code, 1, 'self-referential promotion must be rejected, not accepted');
  assert.match(result.err, /self-referential/i);
  assertions += 1;
  console.log('REJECTED: candidate pre-approved at UAT time + cosmetic-only follow-up');
}
rmSync(repo, { recursive: true, force: true });

// POSITIVE: candidate is honestly unapproved at UAT time; a real, separate
// promotion commit later records genuine approval. Must still PASS - the
// fix must not reject legitimate promotions.
repo = initRepo();
writeReleaseFiles(repo, '0'.repeat(40), /* approved */ false);
const honestCandidate = commit(repo, 'candidate: genuinely unapproved at UAT time');
writeReleaseFiles(repo, honestCandidate, /* approved */ true);
const genuinePromotion = commit(repo, 'release: record real owner approval after UAT');
{
  const result = runAuth(repo, genuinePromotion);
  assert.equal(result.code, 0, `legitimate promotion must still pass: ${result.err}`);
  assert.match(result.out, /OSB_PRODUCTION_AUTH_PASS/);
  assertions += 1;
  console.log('ACCEPTED: honest UAT candidate + genuine later approval commit');
}
rmSync(repo, { recursive: true, force: true });

console.log(`OSB_SELF_REFERENCE_REGRESSION_PASS: ${assertions} assertions`);
