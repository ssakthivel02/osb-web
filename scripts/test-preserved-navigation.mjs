import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const baseline=JSON.parse(readFileSync(new URL('../release/OSB_NAVIGATION_BASELINE.json',import.meta.url),'utf8'));
const header=readFileSync(new URL('../components/site-header.tsx',import.meta.url),'utf8');
const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
assert.equal(baseline.schema,'osb.navigation-baseline.v1');
assert.equal(baseline.baseCommit,'f093af5a8f29cb5015b05ea6e25301a4cb727fcd');
assert.equal(baseline.navigation.length,54);
assert.equal(new Set(baseline.navigation.map(z=>z.href)).size,baseline.navigation.length);
const links=[...header.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(z=>z[1]);
for(const item of baseline.navigation){
  assert.equal(links.filter(href=>href===item.href).length,1,'Original site link missing/duplicated: '+item.href);
}
assert.ok(header.includes('<details className="navArchiveMenu">'));
assert.ok(header.includes('<summary>All sections</summary>'));
assert.ok(header.includes('href="/murugan-library/"'),'New on-site Tamil reader must be discoverable');
assert.ok(css.includes('.navArchiveGrid a{display:block'),'Desktop menu must expose links');
assert.ok(css.includes('.siteNav .navArchiveGrid a{display:block'),'Mobile menu must override hidden top navigation');
console.log('OSB_NAVIGATION_PRESERVED: 54 exact legacy hrefs and one new on-site Tamil library route');
