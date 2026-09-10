import fs from 'node:fs';
import path from 'node:path';

const ROOT=path.join(process.cwd(),'data','training-academy');
const EXPANSION_ROOT=path.join(ROOT,'expansion');
const expansionFiles=filename=>fs.existsSync(EXPANSION_ROOT)
  ? fs.readdirSync(EXPANSION_ROOT,{withFileTypes:true}).filter(x=>x.isDirectory())
      .map(x=>`expansion/${x.name}/${filename}`).filter(p=>fs.existsSync(path.join(ROOT,p)))
      .sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))
  : [];
const recordFiles=['lessons/lessons.jsonl','easy-learn/easy-learn.jsonl','deep-dive/deep-dive.jsonl','labs/labs.jsonl','troubleshooting/troubleshooting.jsonl','assessments/assessments.jsonl','interviews/interviews.jsonl','capstones/capstones.jsonl','visual-specs/visual-specs.jsonl',...expansionFiles('records.jsonl')];
const topicFiles=['canonical/topics.jsonl',...expansionFiles('topics.jsonl')];
const sourceFiles=['sources/source-register.jsonl',...expansionFiles('sources.jsonl')];
const readJson=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const readJsonl=p=>fs.readFileSync(path.join(ROOT,p),'utf8').split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map((line,i)=>{try{return JSON.parse(line)}catch(e){throw new Error(`${p}:${i+1}: ${e.message}`)}});

const errors=[];
const tracks=readJson('canonical/tracks.json').tracks;
const topics=topicFiles.flatMap(readJsonl);
const sources=sourceFiles.flatMap(readJsonl);
const paths=readJson('learning-paths/learning-paths.json').paths;
const provenance=readJson('canonical/relationship-provenance.json');
const records=recordFiles.flatMap(readJsonl);
const trackIds=new Set(tracks.map(x=>x.track_id));
const topicIds=new Set(topics.map(x=>x.topic_id));
const sourceIds=new Set(sources.map(x=>x.source_id));
const recordIds=new Set();
const assertUnique=(items,key,label)=>{const seen=new Set();for(const item of items){if(!item[key])errors.push(`${label} missing ${key}`);else if(seen.has(item[key]))errors.push(`duplicate ${label} ${key}: ${item[key]}`);else seen.add(item[key]);}};
assertUnique(tracks,'track_id','track');
assertUnique(topics,'topic_id','topic');
assertUnique(sources,'source_id','source');
assertUnique(paths,'path_id','learning path');
for(const record of records){
  if(!record.id)errors.push('record missing id');else if(recordIds.has(record.id))errors.push(`duplicate record id: ${record.id}`);else recordIds.add(record.id);
  if(!trackIds.has(record.track_id))errors.push(`${record.id}: unknown track ${record.track_id}`);
  if(!topicIds.has(record.topic_id))errors.push(`${record.id}: unknown topic ${record.topic_id}`);
  for(const sourceId of record.sources??[])if(!sourceIds.has(sourceId))errors.push(`${record.id}: unknown source ${sourceId}`);
}
for(const record of records)for(const field of ['prerequisites','related_ids'])for(const id of record[field]??[])if(!recordIds.has(id))errors.push(`${record.id}: ${field} references missing record ${id}`);
for(const learningPath of paths){
  for(const milestone of learningPath.milestones??[])for(const id of milestone.record_ids??[])if(!recordIds.has(id))errors.push(`${learningPath.path_id}: milestone references missing record ${id}`);
  for(const id of [learningPath.capstone_id,...(learningPath.assessment_ids??[]),...(learningPath.interview_ids??[])].filter(Boolean))if(!recordIds.has(id))errors.push(`${learningPath.path_id}: references missing record ${id}`);
}
const relationships=[];
let sequence=1;
for(const record of [...records].sort((a,b)=>String(a.id).localeCompare(String(b.id)))){
  for(const id of record.prerequisites??[])relationships.push({relationship_id:`REL-${String(sequence++).padStart(4,'0')}`,from_id:id,to_id:record.id,relationship_type:'PREREQUISITE_OF'});
  for(const id of record.related_ids??[])relationships.push({relationship_id:`REL-${String(sequence++).padStart(4,'0')}`,from_id:record.id,to_id:id,relationship_type:'CROSS_LINK'});
}
const relationshipIds=new Set();
const relationshipTypeBreakdown={};
for(const edge of relationships){
  if(relationshipIds.has(edge.relationship_id))errors.push(`duplicate relationship id: ${edge.relationship_id}`);
  relationshipIds.add(edge.relationship_id);
  if(!recordIds.has(edge.from_id)||!recordIds.has(edge.to_id))errors.push(`${edge.relationship_id}: broken endpoint ${edge.from_id} -> ${edge.to_id}`);
  relationshipTypeBreakdown[edge.relationship_type]=(relationshipTypeBreakdown[edge.relationship_type]??0)+1;
}
const typeBreakdown=Object.fromEntries([...new Set(records.map(r=>r.record_type))].sort().map(type=>[type,records.filter(r=>r.record_type===type).length]));
const populatedTrackIds=[...new Set(records.map(r=>r.track_id))].sort();
const safetyBreakdown={};
for(const record of records)if(record.safety_classification)safetyBreakdown[record.safety_classification]=(safetyBreakdown[record.safety_classification]??0)+1;

const expected={
  records:229,tracks:19,populatedTracks:8,paths:2,sources:142,relationships:847,
  relationshipTypeBreakdown:{PREREQUISITE_OF:365,CROSS_LINK:482},
  typeBreakdown:{ASSESSMENT:32,CAPSTONE:2,DEEP_DIVE:27,EASY_LEARN:26,INTERVIEW:28,LAB:27,LESSON:55,TROUBLESHOOTING:29,VISUAL_SPEC:3}
};
if(records.length!==expected.records)errors.push(`record count ${records.length} != ${expected.records}`);
if(tracks.length!==expected.tracks)errors.push(`track count ${tracks.length} != ${expected.tracks}`);
if(populatedTrackIds.length!==expected.populatedTracks)errors.push(`populated track count ${populatedTrackIds.length} != ${expected.populatedTracks}`);
if(paths.length!==expected.paths)errors.push(`path count ${paths.length} != ${expected.paths}`);
if(sources.length!==expected.sources)errors.push(`source count ${sources.length} != ${expected.sources}`);
if(relationships.length!==expected.relationships)errors.push(`relationship count ${relationships.length} != ${expected.relationships}`);
for(const [type,count] of Object.entries(expected.typeBreakdown))if((typeBreakdown[type]??0)!==count)errors.push(`${type} count ${typeBreakdown[type]??0} != ${count}`);
for(const [type,count] of Object.entries(expected.relationshipTypeBreakdown))if((relationshipTypeBreakdown[type]??0)!==count)errors.push(`${type} relationship count ${relationshipTypeBreakdown[type]??0} != ${count}`);

if(provenance.relationship_count!==142)errors.push('seed relationship provenance count mismatch');
if(provenance.relationship_type_counts?.PREREQUISITE_OF!==50||provenance.relationship_type_counts?.CROSS_LINK!==92)errors.push('seed relationship provenance type-count mismatch');
if(provenance.source_relationship_file_sha256!=='321ff03683441ff8d0aa75abdaa70a4dd98d9f41ad6dd4550efda9b5bd79ec58')errors.push('seed relationship provenance SHA mismatch');
if(provenance.source_zip_sha256!=='a1d53ee3f4650e3304ea32d38d830d79743d01e17cb6ce628c662d195f58b0ce')errors.push('seed ZIP provenance SHA mismatch');

const adPath=paths.find(p=>p.path_id==='OSB-PATH-AD-SPECIALIST');
if(!adPath)errors.push('missing AD specialist learning path');
else{
  if(adPath.status!=='CORE_CONTENT_COMPLETE')errors.push(`AD path status ${adPath.status} != CORE_CONTENT_COMPLETE`);
  if((adPath.milestones??[]).length!==9)errors.push(`AD path milestone count ${(adPath.milestones??[]).length} != 9`);
  if((adPath.assessment_ids??[]).length!==14)errors.push(`AD path assessment count ${(adPath.assessment_ids??[]).length} != 14`);
  if((adPath.interview_ids??[]).length!==10)errors.push(`AD path interview count ${(adPath.interview_ids??[]).length} != 10`);
}
const winPath=paths.find(p=>p.path_id==='OSB-PATH-WIN-SPECIALIST');
if(!winPath)errors.push('missing Windows specialist learning path');
else{
  if(winPath.status!=='CORE_CONTENT_COMPLETE')errors.push(`Windows path status ${winPath.status} != CORE_CONTENT_COMPLETE`);
  if((winPath.milestones??[]).length!==6)errors.push(`Windows path milestone count ${(winPath.milestones??[]).length} != 6`);
  if((winPath.assessment_ids??[]).length!==5)errors.push(`Windows path assessment count ${(winPath.assessment_ids??[]).length} != 5`);
  if((winPath.interview_ids??[]).length!==5)errors.push(`Windows path interview count ${(winPath.interview_ids??[]).length} != 5`);
  if(winPath.capstone_id!=='OSB-WIN-CAPSTONE-0001')errors.push(`Windows path capstone ${winPath.capstone_id} != OSB-WIN-CAPSTONE-0001`);
}
for(const [trackId,label] of [
  ['OSB-TRACK-WIN','Windows Server / Wintel'],['OSB-TRACK-HYPERV','Hyper-V'],['OSB-TRACK-HGS','HGS / Shielded VMs'],
  ['OSB-TRACK-SCVMM','SCVMM'],['OSB-TRACK-PS','PowerShell'],['OSB-TRACK-AZ','Microsoft Azure'],['OSB-TRACK-DEVOPS','DevOps / AZ-400']
]) if(!populatedTrackIds.includes(trackId))errors.push(`${label} track is not physically populated`);

const result={
  gate:errors.length===0?'PASS':'FAIL',learnerRecords:records.length,typeBreakdown,trackTaxonomy:tracks.length,topicTaxonomy:topics.length,
  populatedTracks:populatedTrackIds.length,populatedTrackIds,learningPaths:paths.length,adPathStatus:adPath?.status??null,
  adPathMilestones:adPath?.milestones?.length??0,winPathStatus:winPath?.status??null,winPathMilestones:winPath?.milestones?.length??0,
  sources:sources.length,relationships:relationships.length,relationshipTypeBreakdown,duplicateIds:records.length-recordIds.size,
  duplicateRelationshipIds:relationships.length-relationshipIds.size,
  brokenReferences:errors.filter(e=>e.includes('references missing')||e.includes('unknown ')||e.includes('broken endpoint')).length,
  safetyBreakdown,seedRelationshipSourceSha256:provenance.source_relationship_file_sha256,seedZipSha256:provenance.source_zip_sha256,
  expansionBatch:'BATCH-020R10-DEVOPS-AZ400',errors
};
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exit(1);
