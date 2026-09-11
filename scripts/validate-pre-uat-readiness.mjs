import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const DATA=path.join(ROOT,'data','training-academy');
const EXPANSION=path.join(DATA,'expansion');
const errors=[];
const read=(p)=>fs.readFileSync(path.join(ROOT,p),'utf8');
const readJson=(p)=>JSON.parse(read(p));
const expansionFiles=(name)=>fs.existsSync(EXPANSION)?fs.readdirSync(EXPANSION,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>`data/training-academy/expansion/${x.name}/${name}`).filter(p=>fs.existsSync(path.join(ROOT,p))).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})):[];

const tracks=readJson('data/training-academy/canonical/tracks.json').tracks;
const paths=['data/training-academy/learning-paths/learning-paths.json',...expansionFiles('learning-paths.json')].flatMap(p=>readJson(p).paths);
const recordFiles=['data/training-academy/capstones/capstones.jsonl',...expansionFiles('records.jsonl')];
const records=recordFiles.flatMap(p=>read(p).split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map(JSON.parse));
const capstones=records.filter(r=>r.record_type==='CAPSTONE');
const gate=readJson('release/OSB_RELEASE_GATE.json');
const uat=read('release/OSB_UAT_PROTOCOL.md');
const layout=read('app/layout.tsx');
const searchPage=read('app/search/page.tsx');
const searchComponent=read('components/training-academy-search.tsx');
const trackPage=read('app/training-academy/tracks/[trackId]/page.tsx');
const recordPage=read('app/training-academy/[id]/page.tsx');
const academyPage=read('app/training-academy/page.tsx');

const trackIds=new Set(tracks.map(t=>String(t.track_id)));
const pathTrackIds=new Set();
for(const p of paths){
  for(const m of p.milestones??[])for(const id of m.record_ids??[]){const r=records.find(x=>x.id===id);if(r?.track_id)pathTrackIds.add(String(r.track_id));}
  const cap=records.find(x=>x.id===p.capstone_id);if(cap?.track_id)pathTrackIds.add(String(cap.track_id));
}
const capstoneTrackIds=new Set(capstones.map(r=>String(r.track_id)));
if(tracks.length!==19)errors.push(`track count ${tracks.length} != 19`);
if(paths.length!==19)errors.push(`learning path count ${paths.length} != 19`);
if(capstones.length!==19)errors.push(`capstone count ${capstones.length} != 19`);
for(const id of trackIds){if(!pathTrackIds.has(id))errors.push(`track lacks structured path coverage: ${id}`);if(!capstoneTrackIds.has(id))errors.push(`track lacks capstone: ${id}`);}

if(!layout.includes('<html lang="en">'))errors.push('root layout lacks explicit html lang');
if(!searchPage.includes('getTrainingAcademyCorpus'))errors.push('search page is not corpus-backed');
if(!academyPage.includes('getTrainingAcademyCorpus'))errors.push('academy catalogue is not corpus-backed');
for(const marker of ['role="search"','<label','htmlFor="training-search"','id="training-search"','aria-live="polite"'])if(!searchComponent.includes(marker))errors.push(`search accessibility prerequisite missing: ${marker}`);
for(const [name,source] of [['track route',trackPage],['record route',recordPage]]){if(!source.includes('generateStaticParams'))errors.push(`${name} does not enumerate static params`);if(!source.includes('notFound()'))errors.push(`${name} lacks notFound boundary`);if(!source.includes('<main>'))errors.push(`${name} lacks main landmark`);if(!source.includes('<h1>'))errors.push(`${name} lacks primary heading`);}

const manual=gate.manualGates??{};
const incomplete=Object.entries(manual).filter(([,v])=>v!==true).map(([k])=>k);
if((incomplete.length>0||gate.githubServerSideProtectionVerified!==true)&&gate.productionReleaseStatus!=='HOLD')errors.push('release must remain HOLD while manual/server-side gates are incomplete');
if(gate.productionDeploymentApproved===true&&incomplete.length>0)errors.push('production deployment approved while manual gates remain incomplete');
if(!uat.includes('keyboard-only navigation')||!uat.includes('Chromium, Firefox and WebKit/Safari-equivalent'))errors.push('UAT protocol lacks required accessibility/browser matrix');

const result={gate:errors.length?'FAIL':'PASS',classification:'PRE_UAT_AUTOMATED_EVIDENCE_ONLY',canonicalTracks:tracks.length,structuredLearningPaths:paths.length,capstones:capstones.length,pathTrackCoverage:pathTrackIds.size,capstoneTrackCoverage:capstoneTrackIds.size,manualGatesIncomplete:incomplete,githubServerSideProtectionVerified:gate.githubServerSideProtectionVerified,productionReleaseStatus:gate.productionReleaseStatus,claimBoundary:'This automated gate does not certify browser usability, WCAG conformance, responsive behavior, funding claims, owner approval, server-side protection or production readiness.',errors};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exit(1);
