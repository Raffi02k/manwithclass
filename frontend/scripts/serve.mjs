/** Serve the included static preview. No third-party dependencies required. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT||4173);
if(!fs.existsSync(path.join(root,'index.html'))) throw new Error('Missing dist. Run npm run build:portable first.');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req,res)=> {
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const requested=path.resolve(root,'.'+pathname);
  if(requested!==root&&!requested.startsWith(root+path.sep)) {res.writeHead(403);res.end('Forbidden');return;}
  const choices=[requested,requested+'.html',path.join(requested,'index.html')];
  const file=choices.find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
  const target=file||path.join(root,'404.html');
  res.writeHead(file?200:404,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  if(req.method==='HEAD') res.end(); else fs.createReadStream(target).pipe(res);
 } catch {res.writeHead(400);res.end('Bad request');}
}).listen(port,'127.0.0.1',()=>console.log(`Man With Class preview: http://127.0.0.1:${port}`)).on('error',err=>{console.error(err.message);process.exit(1);});
