import {spawnSync} from 'node:child_process';
const run=(now)=>spawnSync(process.execPath,['scripts/validate-funding-freshness.mjs'],{cwd:process.cwd(),env:{...process.env,OSB_FUNDING_NOW:now},encoding:'utf8'});
const output=(r)=>(r.stdout||'')+(r.stderr||'');
for(const t of ['2026-11-12T08:00:00Z','2026-12-01T08:00:00Z']){
  const r=run(t);
  if(r.status!==0)throw new Error('expected PASS at '+t+'\n'+output(r));
}
const mustFail=(when,phrase,label)=>{
  const r=run(when);
  if(r.status===0||!output(r).includes(phrase))throw new Error(label+' regression did not fail correctly at '+when+'\n'+output(r));
};
mustFail('2026-10-18T12:00:00Z','status=open is premature because opensAt is in the future','KTP pre-opening');
mustFail('2027-01-05T00:00:00Z','status=upcoming is stale because opensAt has arrived','Ufi opening transition');
mustFail('2027-01-27T11:00:01Z','status=open is stale because closesAt has passed','KTP closing transition');
mustFail('2026-12-13T12:00:00Z','official-source review is stale','review staleness');
console.log('OSB_FUNDING_FRESHNESS_REGRESSION_PASS');
