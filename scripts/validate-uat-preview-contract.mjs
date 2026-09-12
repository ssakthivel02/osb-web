import { readFileSync } from 'node:fs';

const contract = JSON.parse(readFileSync(new URL('../release/OSB_UAT_PREVIEW_CONTRACT.json', import.meta.url), 'utf8'));
const uat = JSON.parse(readFileSync(new URL('../release/OSB_UAT_EVIDENCE_TEMPLATE.json', import.meta.url), 'utf8'));
const index = JSON.parse(readFileSync(new URL('../release/OSB_RELEASE_EVIDENCE_INDEX.json', import.meta.url), 'utf8'));
const workflow = readFileSync(new URL('../.github/workflows/validate-web-baseline.yml', import.meta.url), 'utf8');

const fail = (message) => {
  console.error(`OSB_UAT_PREVIEW_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

if (contract.schema !== 'osb.uat-preview-contract.v1') fail('unexpected schema');
if (!['PROVIDER_PENDING', 'HOSTED'].includes(contract.status)) fail('invalid contract status');
if (contract.source?.repository !== 'ssakthivel02/osb-web') fail('source repository mismatch');
if (contract.source?.branch !== 'agent/batch017-website-productization') fail('source branch mismatch');
if (contract.source?.workflow !== 'Validate Web Baseline') fail('source workflow mismatch');
if (contract.source?.artifactPrefix !== 'osb-validated-static-export-') fail('unexpected validated export artifact prefix');
if (contract.source?.artifactRetentionDays !== 3) fail('validated export retention must remain 3 days');
if (contract.source?.requiresSuccessfulExactHeadValidation !== true) fail('exact-head validation requirement missing');
if (contract.source?.consumeExistingValidatedArtifact !== true) fail('preview must consume the existing validated artifact');
if (contract.source?.rebuildForPreviewForbidden !== true) fail('preview rebuild must remain forbidden');

for (const key of [
  'productionPagesForbidden',
  'productionEnvironmentForbidden',
  'productionCustomDomainForbidden',
  'productionCnameForbidden',
  'repositoryWritePermissionForbidden',
  'previewMustBeIsolatedFromProduction',
]) {
  if (contract.isolation?.[key] !== true) fail(`isolation control must remain true: ${key}`);
}

const forbiddenHosts = new Set(contract.isolation?.forbiddenHosts ?? []);
for (const host of ['learn.omsaravanabhava.org', 'ssakthivel02.github.io']) {
  if (!forbiddenHosts.has(host)) fail(`missing forbidden preview host: ${host}`);
}

if (!workflow.includes('name: osb-validated-static-export-${{ github.event.pull_request.head.sha || github.sha }}')) fail('validation workflow lacks exact-SHA static export artifact');
if (!workflow.includes('retention-days: 3')) fail('validation workflow artifact retention mismatch');
if (!workflow.includes('test ! -e out/CNAME')) fail('validation workflow must reject CNAME from validated export');
if (!workflow.includes('permissions:\n  contents: read')) fail('validation workflow must remain read-only');
if (workflow.includes('pages: write') || workflow.includes('id-token: write')) fail('validation workflow must not gain deployment permissions');

const contractSha = contract.candidateSha;
const uatSha = uat.candidate?.sha;
const indexSha = index.exactManualUatCandidateSha;

if (contract.status === 'PROVIDER_PENDING') {
  if (contractSha !== null) fail('provider-pending contract must not claim a candidate SHA');
  if (contract.hosting?.provider !== null || contract.hosting?.previewUrl !== null || contract.hosting?.sourceArtifactName !== null || contract.hosting?.hostedAt !== null) fail('provider-pending contract cannot claim hosting evidence');
  if (uat.status !== 'NOT_RUN') fail('manual UAT cannot start while preview provider is pending');
}

if (contract.status === 'HOSTED') {
  if (!/^[0-9a-f]{40}$/i.test(String(contractSha ?? ''))) fail('hosted preview requires exact candidate SHA');
  if (contract.hosting?.sourceArtifactName !== `${contract.source.artifactPrefix}${contractSha}`) fail('hosted preview artifact name must bind to exact candidate SHA');
  if (typeof contract.hosting?.provider !== 'string' || contract.hosting.provider.trim().length === 0) fail('hosted preview requires provider name');
  if (!contract.hosting?.hostedAt) fail('hosted preview requires hostedAt');
  let url;
  try { url = new URL(contract.hosting?.previewUrl); } catch { fail('hosted preview requires valid preview URL'); }
  if (url.protocol !== 'https:') fail('preview URL must use HTTPS');
  if (forbiddenHosts.has(url.hostname)) fail(`preview host is forbidden: ${url.hostname}`);
  if (uatSha !== contractSha || indexSha !== contractSha) fail('preview, UAT evidence, and release evidence index must use the same exact candidate SHA');
}

if (uat.status !== 'NOT_RUN' && contract.status !== 'HOSTED') fail('manual UAT requires a hosted isolated preview');

console.log('OSB_UAT_PREVIEW_CONTRACT_PASS');
console.log(`status=${contract.status} candidate=${contractSha ?? 'none'} provider=${contract.hosting?.provider ?? 'none'}`);
console.log('Preview provenance/isolation contract is valid; no hosting or UAT completion is claimed by this check.');
