import {spawnSync} from 'node:child_process';
const run=(now)=>spawnSync(process.execPath,['scripts/validate-funding-freshness.mjs'],{cwd:process.cwd(),env:{...process.env,OSB_FUNDING_NOW:now},encoding:'utf8'});
const output=(r)=>(r.stdout||'')+(r.stderr||'');
for(const t of ['2026-10-08T08:00:00Z','2026-10-14T09:59:59Z']){const r=run(t);if(r.status!==0)throw new Error('expected PASS at '+t+'\n'+output(r));}
let r=run('2026-10-14T10:00:00Z');if(r.status===0||!output(r).includes('status=open is stale because closesAt has passed'))throw new Error('deadline regression did not fail correctly');
r=run('2026-11-08T12:00:00Z');if(r.status===0||!output(r).includes('official-source review is stale'))throw new Error('stale-review regression did not fail correctly');
console.log('OSB_FUNDING_FRESHNESS_REGRESSION_PASS');
