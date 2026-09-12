import { readFileSync } from 'node:fs';

const evidence = JSON.parse(readFileSync(new URL('../release/OSB_UAT_EVIDENCE_TEMPLATE.json', import.meta.url), 'utf8'));
const fail = (message) => {
  console.error(`OSB_UAT_EVIDENCE_FAIL: ${message}`);
  process.exit(1);
};

if (evidence.schema !== 'osb.uat-evidence.v1') fail('unexpected schema');
if (!['NOT_RUN','IN_PROGRESS','COMPLETE'].includes(evidence.status)) fail('invalid status');
if (!['HOLD','CONDITIONAL_GO','PROD_GO'].includes(evidence.decision)) fail('invalid decision');
if (evidence.candidate?.repository !== 'ssakthivel02/osb-web') fail('candidate repository mismatch');
if (evidence.candidate?.branch !== 'agent/batch017-website-productization') fail('candidate branch mismatch');

const sha = evidence.candidate?.sha;
if (sha !== null && !/^[0-9a-f]{40}$/i.test(String(sha))) fail('candidate sha must be null or an exact 40-character commit sha');

const allowedResult = new Set(['NOT_RUN','PASS','FAIL','BLOCKED']);
for (const [sectionName, section] of Object.entries({ accessibility: evidence.accessibility, responsive: evidence.responsive, browsers: evidence.browsers })) {
  if (!section || typeof section !== 'object') fail(`${sectionName} section missing`);
  for (const [key, value] of Object.entries(section)) {
    if (key === 'evidenceRefs') continue;
    if (!allowedResult.has(value)) fail(`${sectionName}.${key} has invalid result ${value}`);
  }
  if (!Array.isArray(section.evidenceRefs)) fail(`${sectionName}.evidenceRefs must be an array`);
}

if (!Array.isArray(evidence.criticalJourneys)) fail('criticalJourneys must be an array');
if (!Array.isArray(evidence.defects)) fail('defects must be an array');
if (!evidence.linksAndClaims || !Array.isArray(evidence.linksAndClaims.evidenceRefs)) fail('linksAndClaims evidenceRefs missing');
if (!evidence.ownerApproval || typeof evidence.ownerApproval.approved !== 'boolean') fail('ownerApproval missing');

const manualResults = [
  ...Object.entries(evidence.accessibility).filter(([k]) => k !== 'evidenceRefs').map(([,v]) => v),
  ...Object.entries(evidence.responsive).filter(([k]) => k !== 'evidenceRefs').map(([,v]) => v),
  ...Object.entries(evidence.browsers).filter(([k]) => k !== 'evidenceRefs').map(([,v]) => v),
  evidence.linksAndClaims.internalLinks,
  evidence.linksAndClaims.officialExternalLinks,
];

const anyExecuted = manualResults.some((value) => value !== 'NOT_RUN');
const allPass = manualResults.every((value) => value === 'PASS');
const openBlockingDefects = evidence.defects.filter((d) => ['P0','P1'].includes(String(d.severity)) && String(d.status).toUpperCase() !== 'CLOSED');

if (evidence.status === 'NOT_RUN') {
  if (sha !== null) fail('NOT_RUN evidence must not record a candidate sha');
  if (anyExecuted) fail('status NOT_RUN cannot contain executed manual results');
  if (evidence.decision !== 'HOLD') fail('NOT_RUN evidence must remain HOLD');
  if (evidence.ownerApproval.approved) fail('owner approval cannot be true before UAT runs');
}

if (evidence.status === 'IN_PROGRESS') {
  if (!sha) fail('IN_PROGRESS evidence requires exact candidate sha');
  if (evidence.decision !== 'HOLD') fail('IN_PROGRESS evidence must remain HOLD');
  if (evidence.ownerApproval.approved) fail('owner approval is final release evidence and cannot be true while UAT is in progress');
}

if (evidence.status === 'COMPLETE') {
  if (!sha) fail('COMPLETE evidence requires exact candidate sha');
  if (!evidence.candidate.previewUrl || !evidence.candidate.testedAt || !evidence.candidate.tester || !evidence.candidate.environment) fail('COMPLETE evidence requires candidate preview/test metadata');
  if (!allPass) fail('COMPLETE evidence requires all mandatory manual checks to PASS');
  if (!evidence.linksAndClaims.fundingClaimsReviewed) fail('COMPLETE evidence requires funding claim review');
  if (openBlockingDefects.length) fail('COMPLETE evidence cannot contain open P0/P1 defects');
}

if (evidence.decision !== 'HOLD' && evidence.status !== 'COMPLETE') fail('release decision cannot leave HOLD before UAT evidence is COMPLETE');

if (evidence.decision === 'CONDITIONAL_GO' && evidence.ownerApproval.approved) {
  fail('CONDITIONAL_GO must not carry final owner production approval; use PROD_GO only after final release approval');
}

if (evidence.decision === 'PROD_GO') {
  if (!evidence.ownerApproval.approved) fail('PROD_GO requires explicit owner approval');
  if (!evidence.ownerApproval.approvedBy || !evidence.ownerApproval.approvedAt || !evidence.ownerApproval.evidenceRef) fail('approved evidence requires approver, timestamp and evidence reference');
}

console.log('OSB_UAT_EVIDENCE_PASS');
console.log(`status=${evidence.status} decision=${evidence.decision} blocking_defects=${openBlockingDefects.length}`);
console.log('This validates evidence integrity only; it does not perform browser, accessibility, responsive or claims testing.');
