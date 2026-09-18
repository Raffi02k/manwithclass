/** Portable, reproducible fallback: no platform-specific bundler binaries. */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const project=process.cwd();
const src=path.join(project,'src');
const environment={VITE_SITE_URL:'https://www.manwithclass.se',VITE_ENABLE_INDEXING:'false',VITE_CONTENT_APPROVED:'false'};
for(const filename of ['.env','.env.local']) {
 if(fs.existsSync(filename)) for(const line of fs.readFileSync(filename,'utf8').split(/\r?\n/)) {
  const match=line.match(/^\s*(VITE_[A-Z_]+)\s*=\s*(.*?)\s*$/);
  if(match) environment[match[1]]=match[2].replace(/^['"]|['"]$/g,'');
 }
}
for(const key of Object.keys(environment)) if(process.env[key]!==undefined) environment[key]=process.env[key];
function bundle(entry,ssr) {
 const ids=new Map(),modules=[];
 function add(filename) {
  filename=path.resolve(filename);
  if(ids.has(filename)) return ids.get(filename);
  const id=modules.length; ids.set(filename,id); modules.push(null);
  if(filename.endsWith('.json')) {modules[id]='module.exports='+fs.readFileSync(filename,'utf8')+';';return id;}
  let input=fs.readFileSync(filename,'utf8').replace(/import\.meta\.env/g,JSON.stringify(environment));
  input=input.replace(/import\s+['"][^'"]+\.css['"];?/g,'');
  const result=ts.transpileModule(input,{fileName:filename,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,allowJs:true}});
  const errors=(result.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error);
  if(errors.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(errors,{getCanonicalFileName:x=>x,getCurrentDirectory:()=>project,getNewLine:()=> '\n'}));
  modules[id]=result.outputText.replace(/require\(["']([^"']+)["']\)/g,(_,name)=> {
   if(!name.startsWith('.')) return `__external(${JSON.stringify(name)})`;
   const absolute=path.resolve(path.dirname(filename),name);
   if(!fs.existsSync(absolute)) throw new Error('Missing import: '+absolute);
   return `__require(${add(absolute)})`;
  });
  return id;
 }
 const entryId=add(entry);
 const externals=ssr?'const __external = require;':`const __jsx=(type,props,key)=>window.React.createElement(type,key===undefined?props:{...props,key});
const __runtime={jsx:__jsx,jsxs:__jsx,Fragment:window.React.Fragment};
const __externals={'react':window.React,'react-dom/client':window.ReactDOM,'react-router-dom':window.ReactRouterDOM,'react/jsx-runtime':__runtime,'gsap/dist/gsap.js':{gsap:window.gsap},'gsap/dist/ScrollTrigger.js':{ScrollTrigger:window.ScrollTrigger}};
const __external=name=>{if(!__externals[name])throw new Error('Unknown external '+name);return __externals[name];};`;
 const result=externals+`\nconst __modules=[${modules.map(m=>'function(module,exports,__require,__external){\n'+m+'\n}').join(',\n')}];
const __cache={};function __require(id){if(__cache[id])return __cache[id].exports;const m=__cache[id]={exports:{}};__modules[id](m,m.exports,__require,__external);return m.exports;}
`+(ssr?`module.exports=__require(${entryId});`:`__require(${entryId});`);
 return ssr?result:';(function(){\n'+result+'\n})();';
}
fs.rmSync('dist',{recursive:true,force:true});
fs.mkdirSync('dist/assets',{recursive:true});
fs.mkdirSync('.ssr',{recursive:true});
fs.cpSync('public','dist',{recursive:true});
const vendor=['scripts/vendor/react-router-runtime.js','node_modules/gsap/dist/gsap.min.js','node_modules/gsap/dist/ScrollTrigger.min.js'].map(filename=>fs.readFileSync(filename,'utf8')).join('\n;\n');
fs.writeFileSync('dist/assets/app.js',vendor+'\n'+bundle(path.join(src,'main.jsx'),false));
fs.copyFileSync('src/styles/global.css','dist/assets/style.css');
const html=fs.readFileSync('index.html','utf8').replace('<script type="module" src="/src/main.jsx"></script>','<script defer src="/assets/app.js"></script>').replace('</head>','<link rel="stylesheet" href="/assets/style.css"></head>');
fs.writeFileSync('dist/index.html',html);
fs.writeFileSync('.ssr/entry-server.cjs',bundle(path.join(src,'entry-server.jsx'),true));
console.log('Portable client + server bundles built.');
