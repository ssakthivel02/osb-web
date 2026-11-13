/**
 * Synthetic, non-deploying exercise of production rollback ancestry rules.
 * The application revert MUST NOT be mistaken for approved production.
 * A reverted application may be safely requalified as a NEW UAT candidate,
 * followed only by approval-metadata changes before deploying it.
 * This exercises git lineage only, not UAT, rights, artifact recovery or Pages.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifyProductionPromotion } from './lib/verify-production-promotion.mjs';

const dir = mkdtempSync(join(tmpdir(), 'osb-recovery-lineage-'));
const git = (...args) => execFileSync('git', args, {
  cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
}).trim();
const release = [
  'OSB_RELEASE_GATE.json',
  'OSB_RELEASE_EVIDENCE_INDEX.json',
  'OSB_UAT_EVIDENCE_TEMPLATE.json',
  'OSB_UAT_PREVIEW_CONTRACT.json',
];
const writeEvidence = (stage) => {
  for (const name of release) {
    writeFileSync(join(dir, 'release', name), JSON.stringify({
      fixtureOnly: true, state: stage, humanAcceptanceEvidence: 'NOT_EXECUTED',
    }) + '\n');
  }
};
const commit = (message) => {
  git('add', '-A');
  git('commit', '-q', '-m', message);
  return git('rev-parse', 'HEAD');
};
let assertions = 0;
try {
  git('init', '-q', '-b', 'main');
  git('config', 'user.name', 'OSB synthetic test only');
  git('config', 'user.email', 'test@example.invalid');
  mkdirSync(join(dir, 'app'));
  mkdirSync(join(dir, 'release'));
  const app = join(dir, 'app', 'website.txt');
  writeFileSync(app, 'last-known-good website content\n');
  writeEvidence('HOLD');
  const previousGood = commit('existing previously released content');

  writeFileSync(app, 'new website content\n');
  const candidate = commit('exact new hosted-UAT candidate');
  writeEvidence('PROD_GO_SIMULATED');
  const approved = commit('only release metadata changes after UAT');

  const forward = verifyProductionPromotion({
    candidateSha: candidate, deploymentSha: approved, repoDir: dir,
  });
  assert.equal(forward.changedFiles.length, 4);
  assertions += 1;

  // Revert the application to the last-known-good bytes. Even retaining
  // previous approval metadata, this changes app content since prior UAT.
  writeFileSync(app, 'last-known-good website content\n');
  const naiveRevert = commit('naive application-only revert');
  assert.equal(readFileSync(app,'utf8'),'last-known-good website content\n');
  assert.throws(() => verifyProductionPromotion({
    candidateSha: candidate, deploymentSha: naiveRevert, repoDir: dir,
  }), /OSB_PROMOTION_LINEAGE_FAIL: change outside permitted release metadata/);
  assertions += 1;
  assert.throws(() => verifyProductionPromotion({
    candidateSha: approved, deploymentSha: naiveRevert, repoDir: dir,
  }), /OSB_PROMOTION_LINEAGE_FAIL: change outside permitted release metadata/);
  assertions += 1;
  assert.notEqual(previousGood, naiveRevert);
  assertions += 1;

  // This is a NEW recovery candidate, not an authorized deployment:
  // real exact-SHA hosting, human UAT, release/legal approval and governance
  // must be performed separately before metadata can be made PROD_GO.
  writeEvidence('HOLD_REQUALIFICATION_REQUIRED');
  const recoveryCandidate = commit('restore HOLD and requalify old content as new candidate');
  assert.throws(() => verifyProductionPromotion({
    candidateSha: candidate, deploymentSha: recoveryCandidate, repoDir: dir,
  }), /OSB_PROMOTION_LINEAGE_FAIL: change outside permitted release metadata/);
  assertions += 1;
  writeEvidence('PROD_GO_SIMULATED_AFTER_NEW_UAT');
  const recovered = commit('new approval-only metadata after requalified UAT');
  const result = verifyProductionPromotion({
    candidateSha: recoveryCandidate, deploymentSha: recovered, repoDir: dir,
  });
  assert.equal(result.testedCandidateSha, recoveryCandidate);
  assert.equal(result.deploymentSha, recovered);
  assert.deepEqual(result.changedFiles.sort(), release.map(name=>'release/'+name).sort());
  assertions += 3;
  console.log('OSB_ROLLBACK_LINEAGE_SIMULATION_PASS:', assertions,
    'assertions; naive revert rejected, new-candidate metadata-only path accepted; NO actual rollback or UAT performed');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
