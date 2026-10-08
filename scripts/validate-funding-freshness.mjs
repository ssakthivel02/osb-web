import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const sourcePath=path.join(process.cwd(),'lib','funding-data.ts');
const sf=ts.createSourceFile(sourcePath,fs.readFileSync(sourcePath,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TS);
const errors=[];
const lit=(n)=>ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)?n.text:ts.isNumericLiteral(n)?Number(n.text):undefined;
const props=(o)=>Object.fromEntries(o.properties.filter(ts.isPropertyAssignment).map(p=>[(ts.isIdentifier(p.name)||ts.isStringLiteral(p.name))?p.name.text:'',lit(p.initializer)]).filter(([k])=>k));
const find=(name)=>{for(const s of sf.statements)if(ts.isVariableStatement(s))for(const d of s.declarationList.declarations)if(ts.isIdentifier(d.name)&&d.name.text===name)return d.initializer};
const rn=find('fundingRoutes'),pn=find('fundingEvidencePolicy');
if(!rn||!ts.isArrayLiteralExpression(rn))errors.push('fundingRoutes must be a literal array');
if(!pn||!ts.isObjectLiteralExpression(pn))errors.push('fundingEvidencePolicy must be a literal object');
const routes=rn&&ts.isArrayLiteralExpression(rn)?rn.elements.filter(ts.isObjectLiteralExpression).map(props):[];
const policy=pn&&ts.isObjectLiteralExpression(pn)?props(pn):{};
const now=new Date(process.env.OSB_FUNDING_NOW||new Date().toISOString()),maxAge=policy.maxReviewAgeDays;
if(!Number.isFinite(now.getTime()))errors.push('invalid OSB_FUNDING_NOW');
if(!Number.isFinite(maxAge)||maxAge<1||maxAge>90)errors.push('maxReviewAgeDays must be 1..90');
const ids=new Set();
for(const r of routes){const id=String(r.id||'');if(!id)errors.push('route missing id');if(ids.has(id))errors.push('duplicate route: '+id);ids.add(id);
if(!['open','upcoming','ongoing-route'].includes(r.status))errors.push(id+': invalid status');
if(typeof r.sourceUrl!=='string'||!r.sourceUrl.startsWith('https://'))errors.push(id+': sourceUrl must be HTTPS');
if(!/^\d{4}-\d{2}-\d{2}$/.test(String(r.reviewedOn||'')))errors.push(id+': invalid reviewedOn');
const reviewedEnd=new Date(String(r.reviewedOn)+'T23:59:59.999Z'),age=(now-reviewedEnd)/86400000;if(Number.isFinite(age)&&age>maxAge)errors.push(id+': official-source review is stale');
const opens=r.opensAt?new Date(r.opensAt):null,closes=r.closesAt?new Date(r.closesAt):null;if(opens&&!Number.isFinite(opens.getTime()))errors.push(id+': invalid opensAt');if(closes&&!Number.isFinite(closes.getTime()))errors.push(id+': invalid closesAt');if(opens&&closes&&opens>=closes)errors.push(id+': opensAt must precede closesAt');
if(r.status==='open'){if(!closes)errors.push(id+': open route requires closesAt');else if(now>=closes)errors.push(id+': status=open is stale because closesAt has passed');}
if(r.status==='upcoming'){if(!opens)errors.push(id+': upcoming route requires opensAt');else if(now>=opens)errors.push(id+': status=upcoming is stale because opensAt has arrived');}}
if(routes.some(r=>r.reviewedOn!==policy.reviewedOn))errors.push('route/policy reviewedOn mismatch');
console.log(JSON.stringify({gate:errors.length?'FAIL':'PASS',now:now.toISOString(),routes:routes.length,policyReviewedOn:policy.reviewedOn,maxReviewAgeDays:maxAge,errors,claimBoundary:'Freshness only; no eligibility, provider, partnership or award claim.'},null,2));if(errors.length)process.exit(1);
