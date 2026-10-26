import { execFileSync } from 'node:child_process';

const HEX_SHA = /^[a-f0-9]{40}$/i;
const APPROVAL_ONLY_FILES = new Set([
  'release/OSB_RELEASE_GATE.json',
  'release/OSB_RELEASE_EVIDENCE_INDEX.json',
  'release/OSB_UAT_EVIDENCE_TEMPLATE.json',
  'release/OSB_UAT_PREVIEW_CONTRACT.json',
]);

const fail = (message) => {
  throw new Error('OSB_PROMOTION_LINEAGE_FAIL: ' + message);
};

const git = (repoDir, args) =>
  execFileSync('git', ['-C', repoDir, ...args], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 1048576,
  }).trim();

/**
 * Allow a production SHA to differ from the exact hosted-UAT SHA ONLY when
 * their complete Git tree differs in approved release metadata, never in
 * application code, dependencies, build settings, workflows, or validators.
 *
 * Must be called in a full-history checkout of the exact deploying commit.
 * This does not substitute for owner approval, UAT evidence, or CI checks.
 */
export function verifyProductionPromotion({ candidateSha, deploymentSha, repoDir = process.cwd() }) {
  if (!HEX_SHA.test(String(candidateSha ?? ''))) fail('invalid exact UAT candidate SHA');
  if (!HEX_SHA.test(String(deploymentSha ?? ''))) fail('invalid exact deployment SHA');
  if (candidateSha.toLowerCase() === deploymentSha.toLowerCase()) {
    fail('approval metadata must be committed after the UAT candidate');
  }

  let checkoutSha;
  try {
    checkoutSha = git(repoDir, ['rev-parse', '--verify', 'HEAD^{commit}']);
  } catch {
    fail('Git checkout metadata unavailable');
  }
  if (checkoutSha.toLowerCase() !== deploymentSha.toLowerCase()) {
    fail('checked-out HEAD is not the exact deployment SHA');
  }

  try {
    git(repoDir, ['cat-file', '-e', candidateSha + '^{commit}']);
  } catch {
    fail('UAT candidate commit is not available; a full-history checkout is required');
  }
  try {
    execFileSync('git', ['-C', repoDir, 'merge-base', '--is-ancestor', candidateSha, deploymentSha], {
      stdio: 'ignore',
    });
  } catch {
    fail('UAT candidate is not an ancestor of deployment commit');
  }

  let changes;
  try {
    changes = git(repoDir, ['diff', '--name-status', '--no-renames', candidateSha, deploymentSha])
      .split('\n').filter(Boolean).map((line) => line.split('\t'));
  } catch {
    fail('cannot inspect exact candidate-to-deployment diff');
  }

  if (!changes.length) fail('no approval-metadata changes since UAT candidate');
  for (const [status, filename, ...extra] of changes) {
    if (status !== 'M' || extra.length || !APPROVAL_ONLY_FILES.has(filename)) {
      fail('change outside permitted release metadata: ' + [status, filename].join(' '));
    }
  }
  for (const requiredFile of [
    'release/OSB_RELEASE_GATE.json',
    'release/OSB_RELEASE_EVIDENCE_INDEX.json',
    'release/OSB_UAT_EVIDENCE_TEMPLATE.json',
  ]) {
    if (!changes.some(([status, file]) => status === 'M' && file === requiredFile)) {
      fail('required release approval evidence did not change after UAT: ' + requiredFile);
    }
  }
  return { testedCandidateSha: candidateSha, deploymentSha, changedFiles: changes.map(([, path]) => path) };
}
