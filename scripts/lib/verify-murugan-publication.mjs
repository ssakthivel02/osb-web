/**
 * Fail-closed editorial and cross-site publication authorization.
 * These booleans may only be set when signed human review evidence is retained
 * separately in the OSB controlled release register.
 */
export function assertMuruganPublicationReady(catalogue) {
  const fail = (why) => { throw new Error('OSB_MURUGAN_PUBLICATION_BLOCKED: ' + why); };
  if (catalogue?.schema !== 'osb.murugan-tamil-library.v1') fail('unexpected library schema');
  if (catalogue.productionContentApproval !== true) fail('productionContentApproval must be true after human editorial and rights approval');
  if (!Array.isArray(catalogue.texts) || catalogue.texts.length === 0) fail('no approved Tamil source texts');
  const seen = new Set();
  for (const item of catalogue.texts) {
    if (typeof item.slug !== 'string' || !/^[a-z0-9-]+$/.test(item.slug) || seen.has(item.slug)) fail('invalid or duplicated text identifier');
    seen.add(item.slug);
    if (item.humanPublicationApproval !== true) fail('human text/rights approval missing: ' + item.slug);
    if (!['source-linked-text', 'reviewed-opening-only'].includes(item.publicationStatus)) fail('invalid source status: ' + item.slug);
    if (typeof item.text !== 'string' || !/[\u0B80-\u0BFF]/.test(item.text) || item.text.length < 100) fail('missing genuine Tamil body: ' + item.slug);
    if (typeof item.sourceFile !== 'string' || !item.sourceFile.endsWith('.html')) fail('missing source file: ' + item.slug);
    if (/placeholder|Lorem ipsum|மூல.*சரிபார்த்த பிறகு/i.test(item.text)) fail('unverified placeholder text: ' + item.slug);
  }
  if (!Array.isArray(catalogue.queuedWorks) || !catalogue.queuedWorks.every(x => x.status === 'source-and-rights-review' && !Object.hasOwn(x, 'text'))) {
    fail('unreviewed classical works must remain metadata-only');
  }
  if (!Array.isArray(catalogue.modernSongs) || !catalogue.modernSongs.every(x => x.status === 'permission-required' && !Object.hasOwn(x, 'text') && !Object.hasOwn(x, 'audio'))) {
    fail('modern copyrighted lyrics/audio must remain withheld without permission');
  }
  return { approvedTexts: seen.size, queued: catalogue.queuedWorks.length, modernWithheld: catalogue.modernSongs.length };
}
