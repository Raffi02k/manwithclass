import fs from 'node:fs';
import assert from 'node:assert/strict';
import { publishedPeople } from '../.ssr/entry-server.js';
const { routes,indexable }=JSON.parse(fs.readFileSync('dist/route-manifest.json','utf8'));
const titles=new Set();
for(const route of routes) {
 const name=route==='/'?'dist/index.html':`dist${route}.html`;
 const html=fs.readFileSync(name,'utf8');
 assert.match(html,/<h1[ >]/,`${route}: missing H1`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route}: more than one H1`);
 assert.match(html,/<title>[^<]+<\/title>/,`${route}: missing title`);
 const title=html.match(/<title>([^<]+)<\/title>/)[1];assert(!titles.has(title),`${route}: duplicate title`);titles.add(title);
 assert.match(html,/<meta name="description" content="[^\"]+"/);
 assert.match(html,/hreflang="sv"/);assert.match(html,/hreflang="en"/);
 assert.match(html,new RegExp(`<html lang="${route.startsWith('/en')?'en':'sv'}"`));
 if(!indexable) assert.match(html,/noindex,follow/);
 const schema=JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema['@context'],'https://schema.org');
 for(const [,asset] of html.matchAll(/(?:src|href)="(\/(?:images|assets)\/[^\"]+)"/g)) {
  const path=asset.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi,entity=>{
   const named={'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'};
   return named[entity] ?? String.fromCodePoint(entity.startsWith('&#x') ? parseInt(entity.slice(3,-1),16) : parseInt(entity.slice(2,-1),10));
  });
  assert(fs.existsSync('dist'+decodeURIComponent(path)),`${route}: missing ${path}`);
 }
}
assert.equal(routes.length, 54 + publishedPeople.length * 2 + 14);assert(fs.existsSync('dist/404.html'));
for(const person of publishedPeople) {
 for(const prefix of ['/barberare/', '/en/barbers/']) {
  const route=prefix+person.slug;
  assert(routes.includes(route),`Missing profile route ${route}`);
  const html=fs.readFileSync(`dist${route}.html`,'utf8');
  assert(html.includes(person.portrait || 'person-portrait-placeholder'),`${route}: missing portrait or placeholder`);
  assert(html.includes('person-timeline'),`${route}: missing timeline`);
  if(person.galleryIds.length) assert(!html.includes('person-gallery-empty'),`${route}: missing gallery images`);
 }
}
console.log(`PASS: ${routes.length} pages: HTML, H1, titles, language links, JSON-LD, images, indexing.`);
