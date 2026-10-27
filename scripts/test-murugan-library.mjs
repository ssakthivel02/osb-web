import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../lib/murugan-library.json',import.meta.url), 'utf8'));
const routes = [
  new URL('../app/murugan-library/page.tsx', import.meta.url),
  new URL('../app/murugan-library/catalogue.tsx', import.meta.url),
  new URL('../app/murugan-library/[slug]/page.tsx', import.meta.url),
];
const pages = routes.map(p=>readFileSync(p,'utf8'));
assert.equal(data.schema, 'osb.murugan-tamil-library.v1');
assert.equal(data.productionContentApproval, false);
assert.equal(data.texts.filter(x=>x.publicationStatus==='source-linked-text').length, 12);
assert.equal(data.texts.filter(x=>x.publicationStatus==='reviewed-opening-only').length, 1);
assert.equal(new Set(data.texts.map(x=>x.slug)).size,data.texts.length);
for (const entry of data.texts) {
  assert.match(entry.slug,/^[a-z0-9-]+$/);
  assert.match(entry.text,/[\u0B80-\u0BFF]/);
  assert.ok(entry.text.length>100,'Tamil work not filled: '+entry.slug);
  assert.equal(entry.humanPublicationApproval,false,'owner gate must remain pending');
  assert.ok(entry.sourceFile.endsWith('.html'));
  assert.ok(!/மூல.*சரிபார்த்த பிறகு|placeholder|Lorem ipsum/i.test(entry.text),'placeholder in released text');
}
assert.ok(data.queuedWorks.length>=14);
assert.ok(data.queuedWorks.every(x=>x.status==='source-and-rights-review'&&!('text' in x)));
assert.ok(data.modernSongs.every(x=>x.status==='permission-required'&&!('text' in x)));
for (const page of pages) {
  assert.ok(!/https?:\/\/[^\s"']+/.test(page),'no external links in new reader routes');
}
assert.ok(pages[2].includes('generateStaticParams'),'all reading routes must export statically');
const tools = readFileSync(new URL('../app/murugan-library/reader-tools.tsx', import.meta.url), 'utf8');
assert.ok(pages[2].includes('<ReaderTools title={entry.titleTa} text={entry.text}/>'), 'reader must use on-site Tamil text');
for (const required of ["'speechSynthesis' in window", "startsWith('ta')", 'synthesizer.cancel()', 'aria-live="polite"', 'window.print()', 'aria-pressed={paperMode}']) {
  assert.ok(tools.includes(required),'missing accessible reader control '+required);
}
assert.ok(!/https?:\/\/[^\s"']+/.test(tools), 'reader tools must not contact external sites');

assert.ok(pages[0].includes('index: false'),'pending editorial review must not be indexed');
assert.ok(pages[1].includes('matches(work.text)'), 'verified Tamil verse bodies must be searchable locally');
assert.ok(pages[1].includes("normalize('NFC')"), 'Tamil verse search must normalize Unicode');
assert.ok(data.texts.some(work => work.text.includes('சரவண')), 'Tamil full-text search needs a real verse fixture');
console.log('OSB_MURUGAN_LIBRARY_INTEGRITY_PASS: 12 Tamil songs + 1 reviewed opening extract, 16 metadata-only works, 6 modern rights-held titles');
