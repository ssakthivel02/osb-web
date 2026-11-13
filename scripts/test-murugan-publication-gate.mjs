import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assertMuruganPublicationReady } from './lib/verify-murugan-publication.mjs';

const original = JSON.parse(readFileSync(new URL('../lib/murugan-library.json', import.meta.url), 'utf8'));
const copy = (v) => JSON.parse(JSON.stringify(v));
const approved = copy(original);
approved.productionContentApproval = true;
for (const entry of approved.texts) entry.humanPublicationApproval = true;

assert.equal(assertMuruganPublicationReady(approved).approvedTexts, 13);
let rejected = 0;
function reject(label, edit) {
  const subject = copy(approved);
  edit(subject);
  assert.throws(() => assertMuruganPublicationReady(subject), /OSB_MURUGAN_PUBLICATION_BLOCKED/);
  rejected += 1;
  console.log('REJECTED ' + label);
}
reject('actual archive remains unapproved', c => c.productionContentApproval = false);
reject('missing review for single Tamil poem', c => c.texts[0].humanPublicationApproval = false);
reject('missing source attribution', c => c.texts[0].sourceFile = '');
reject('unverified placeholder', c => c.texts[0].text = 'Lorem ipsum');
reject('duplicate slug', c => c.texts[1].slug = c.texts[0].slug);
reject('queued book disguised as full edition', c => c.queuedWorks[0].text = 'unapproved');
reject('unlicensed modern song lyrics', c => c.modernSongs[0].text = 'unapproved');
reject('unlicensed modern audio', c => c.modernSongs[0].audio = 'unapproved');
reject('unrecognized content status', c => c.texts[0].publicationStatus = 'auto-generated');
console.log('OSB_MURUGAN_PUBLICATION_GATES_PASS: 1 positive and ' + rejected + ' negative cases');
