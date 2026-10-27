import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const intake = JSON.parse(readFileSync(new URL('../release/OSB_MURUGAN_SOURCE_INTAKE.json', import.meta.url),'utf8'));
const library = JSON.parse(readFileSync(new URL('../lib/murugan-library.json', import.meta.url),'utf8'));
assert.equal(intake.schema,'osb.murugan-source-intake.v1');
assert.equal(intake.scope,'editorial-metadata-only');
assert.equal(intake.productionImportApproved,false);
assert.equal(intake.coordinatorPermission,'not-received');
assert.equal(intake.pendingWorks.length,library.queuedWorks.length);
assert.equal(intake.modernSongs.catalogueTitles,library.modernSongs.length);
assert.equal(intake.modernSongs.lyricsImported,0);
assert.equal(intake.modernSongs.recordingsImported,0);
assert.equal(intake.tiruppugazhCollection.additionalVersesApprovedForImport,0);
assert.equal(intake.tiruppugazhCollection.numberingVerified,false);
const unique = new Set(intake.sources.map(s=>s.id));
assert.equal(unique.size,intake.sources.length,'source IDs must be unique');
for (const source of intake.sources) {
  assert.match(source.url,/^https:\/\/projectmadurai\.org\/pm_etexts\/utf8\/pmuni[0-9_]+\.html$/);
  assert.equal(source.redistributionPermission,'pending-written-confirmation');
  assert.equal(source.creditsVerified,false);
  assert.equal(source.editionHashSha256,null);
  assert.ok(!('text' in source)&&!('audio' in source)&&!('html' in source));
}
for (const work of intake.pendingWorks) {
  assert.ok(library.queuedWorks.some(w=>w.titleEn===work.titleEn && w.titleTa===work.titleTa),'catalogue and release intake out of sync: '+work.titleEn);
  assert.equal(work.permission,'not-cleared');
  assert.equal(work.editorialReview,'not-started');
  assert.equal(work.approvedCompleteEdition,false);
  assert.ok(work.sourceIds.every(id=>unique.has(id)));
  assert.equal(work.sourceSha256,null);
  assert.ok(!('text' in work)&&!('audio' in work)&&!('html' in work)&&!('body' in work),'no unlicensed content in intake');
}
assert.equal(new Set(intake.pendingWorks.map(w=>w.titleEn)).size,intake.pendingWorks.length);
console.log('OSB_MURUGAN_SOURCE_INTAKE_PASS: '+intake.pendingWorks.length+' works, '+intake.sources.length+' candidate editions, 0 unapproved imports');
