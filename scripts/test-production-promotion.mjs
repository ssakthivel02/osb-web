import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifyProductionPromotion } from './lib/verify-production-promotion.mjs';

const root = mkdtempSync(join(tmpdir(), 'osb-promotion-test-'));
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const file = (name, content) => writeFileSync(join(root, name), content);
const approvalPaths = [
  'release/OSB_RELEASE_GATE.json',
  'release/OSB_RELEASE_EVIDENCE_INDEX.json',
  'release/OSB_UAT_EVIDENCE_TEMPLATE.json',
  'release/OSB_UAT_PREVIEW_CONTRACT.json',
];
const commit = (message) => {
  git('add', '-A');
  git('commit', '-q', '-m', message);
  return git('rev-parse', 'HEAD');
};
const check = (candidateSha, deploymentSha) =>
  verifyProductionPromotion({ candidateSha, deploymentSha, repoDir: root });
let assertions = 0;
const reject = (fn, label) => {
  assert.throws(fn, /OSB_PROMOTION_LINEAGE_FAIL/);
  assertions += 1;
  console.log('REJECTED:', label);
};

try {
  git('init', '-q', '-b', 'main');
  git('config', 'user.email', 'ci@example.invalid');
  git('config', 'user.name', 'OSB Test Fixture');
  mkdirSync(join(root, 'release'));
  mkdirSync(join(root, 'src'));
  file('src/app.js', 'export const message = "unchanged application";\n');
  for (const p of approvalPaths) file(p, '{"status":"HOLD"}\n');
  const candidate = commit('tested application candidate');

  for (const p of approvalPaths) file(p, '{"status":"APPROVED"}\n');
  const promotion = commit('approval-only promotion metadata');

  const valid = check(candidate, promotion);
  assert.equal(valid.changedFiles.length, 4);
  assertions += 1;

  reject(() => check(promotion, promotion), 'self-reference / identical commits');
  reject(() => check('0'.repeat(40), promotion), 'unknown UAT candidate');
  reject(() => check(candidate, 'f'.repeat(40)), 'wrong deployment checkout SHA');

  file('src/app.js', 'export const message = "unauthorized source change";\n');
  const codeChange = commit('unreviewed source change');
  reject(() => check(candidate, codeChange), 'application changed since UAT');

  git('reset', '--hard', promotion);
  file('release/EXTRA_APPROVAL.json', '{}\n');
  const extraFile = commit('unapproved added release file');
  reject(() => check(candidate, extraFile), 'unallowlisted metadata');

  git('reset', '--hard', promotion);
  unlinkSync(join(root, approvalPaths[0]));
  const deletedGate = commit('deleted authorization gate');
  reject(() => check(candidate, deletedGate), 'removed approval control');

  git('reset', '--hard', promotion);
  git('checkout', '-q', '-b', 'unrelated', candidate);
  file('src/app.js', 'export const message = "different release";\n');
  const unrelated = commit('unrelated candidate branch');
  git('checkout', '-q', 'main');
  reject(() => check(unrelated, promotion), 'non-ancestor UAT candidate');

  console.log('OSB_PRODUCTION_PROMOTION_REGRESSION_PASS: ' + assertions + ' assertions');
} finally {
  rmSync(root, { recursive: true, force: true });
}
