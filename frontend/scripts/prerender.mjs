import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const mod=await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const api=mod.default||mod;
const { render,renderHead,getMetadata,routePaths,site }=api;
const template=fs.readFileSync('dist/index.html','utf8');
for(const route of [...routePaths,'/404']) {
 const meta=getMetadata(route);
 const html=template.replace('<html lang="sv">',`<html lang="${meta.lang}">`).replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/,renderHead(route)).replace('<!--app-html-->',render(route));
 const output=path.join('dist',route==='/'?'index.html':route.slice(1)+'.html');
 fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,html);
}
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routePaths.map(route=>`<url><loc>${escape(site.domain+(route==='/'?'/':route))}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync('dist/sitemap.xml',sitemap);
fs.writeFileSync('dist/robots.txt',site.indexable?`User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
fs.writeFileSync('dist/route-manifest.json',JSON.stringify({routes:routePaths,indexable:site.indexable},null,2));
console.log(`Prerendered ${routePaths.length} pages + 404. Indexing: ${site.indexable}`);
