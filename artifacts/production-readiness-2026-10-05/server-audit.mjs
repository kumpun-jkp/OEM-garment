import fs from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { validateEnquiry } from '../../src/lib/enquiries.ts';

// Never replay the synthetic POST cases against a configured receiver.
const require = createRequire(import.meta.url);
require('@next/env').loadEnvConfig(fileURLToPath(new URL('../../', import.meta.url)), false, {info(){}, error(){}});
if (process.env.ENQUIRY_WEBHOOK_URL) throw new Error('Refusing synthetic submissions: enquiry delivery is configured. Use the read-only checks instead.');

const base = 'http://127.0.0.1:3002';
const output = new URL('./server-results.json', import.meta.url);
const paths = ['', '/about', '/our-work', '/oem-products', '/oem-journey', '/technical-insights', '/start-your-project', '/contact'];
const routes = ['th', 'en'].flatMap(locale => paths.map(path => `/${locale}${path}`));
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
const hrefs = new Map();
const imagePaths = new Set();
const scriptPaths = new Set();
const pages = [];
for (const route of routes) {
  const started = performance.now();
  const response = await fetch(base + route);
  const html = await response.text();
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => decode(match[1]));
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  const anchors = [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(match => decode(match[1]));
  for (const href of anchors) {
    if (!hrefs.has(href)) hrefs.set(href, []);
    hrefs.get(href).push(route);
  }
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) imagePaths.add(decode(match[1]));
  for (const match of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)) scriptPaths.add(decode(match[1]));
  pages.push({
    route, status: response.status, responseMilliseconds: Math.round(performance.now() - started),
    htmlBytes: Buffer.byteLength(html), title: decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''),
    language: html.match(/<html[^>]*\blang="([^"]+)"/)?.[1],
    robots: html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/)?.[1],
    canonical: html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1] ?? null,
    alternateLanguages: [...html.matchAll(/<link[^>]*hreflang="([^"]+)"/gi)].map(match => match[1]),
    openGraphTags: [...html.matchAll(/<meta[^>]*property="(og:[^"]+)"/g)].map(match => match[1]),
    h1Count: [...html.matchAll(/<h1(?:\s|>)/g)].length, duplicateIds: duplicates,
    formTags: [...html.matchAll(/<form\b[^>]*>/g)].map(match => match[0]),
    noscriptFallback: html.includes('<noscript'),
    emptyLinks: anchors.filter(href => !href || href === '#'),
    imageCount: [...html.matchAll(/<img\b/g)].length,
    imagesWithoutAlt: [...html.matchAll(/<img\b[^>]*>/g)].filter(match => !/\balt="/.test(match[0])).length,
    renderedProductCards: [...html.matchAll(/data-product-id="/g)].length,
    insightArticleCount: [...html.matchAll(/class="article-card"/g)].length,
    staleInsightCountLabel: html.includes('All planning excerpts (9)') || html.includes('ทั้งหมด (9)'),
    securityHeaders: Object.fromEntries(['content-security-policy','x-frame-options','x-content-type-options','referrer-policy','permissions-policy','strict-transport-security','x-powered-by'].map(key => [key,response.headers.get(key)])),
  });
}

const internalLinks = [];
const externalLinks = [];
const specialLinks = [];
for (const [href, sources] of hrefs) {
  if (/^(tel:|mailto:)/.test(href)) { specialLinks.push({href, sources}); continue; }
  if (/^https?:/.test(href)) { externalLinks.push({href, sources}); continue; }
  if (!href || href === '#') continue;
  const url = new URL(href, base + sources[0]);
  const response = await fetch(url, {redirect:'manual'});
  let anchorExists = null;
  if (url.hash && response.status === 200) {
    const html = await response.text();
    anchorExists = html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`);
  }
  internalLinks.push({href,status:response.status,location:response.headers.get('location'),anchorExists,sources});
}

const routeEdges = [];
for (const path of ['/','/about','/en/nonexistent','/th/nonexistent','/fr','/en/../fr','/en/oem-products?audience=unknown&category=invalid&subcategory=none','/en/oem-products?audience=children&category=shirts','/en/oem-products?category=shirts&subcategory=shorts','/en/contact?inquiry=invalid&subject=%3Cscript%3Ealert(1)%3C%2Fscript%3E','/en/start-your-project?category=INVALID&stage=unknown','/robots.txt','/sitemap.xml','/favicon.ico']) {
  const response = await fetch(base + path,{redirect:'manual'});
  const html = await response.text();
  routeEdges.push({path,status:response.status,location:response.headers.get('location'),scriptTextEscaped: path.includes('subject=') ? html.includes('&lt;script&gt;alert(1)&lt;/script&gt;') : null});
}

const validContact = {kind:'contact',name:'QA Fixture',company:'Local QA Only',email:'qa@example.com',phone:'+66 81 123 4567',inquiry:'general',message:'Local production audit; no external delivery configured.',consent:'on'};
const validProject = {kind:'project',name:'QA Fixture',company:'Local QA Only',email:'qa@example.com',phone:'+66 81 123 4567',country:'Thailand',stage:'reference',category:'Other',message:'Local production audit; no external delivery configured.',volume:'unsure',consent:'on'};
const makeForm = fields => {const data=new FormData();for(const [key,value] of Object.entries(fields))data.set(key,value);return data;};
const apiCases = [];
async function api(name,body,headers={},expected) {
  const response=await fetch(base+'/api/enquiries',{method:'POST',body,headers});
  const json=await response.json();
  apiCases.push({name,status:response.status,expected,pass:response.status===expected,...json});
}
await api('Valid contact: explicit unavailable delivery',makeForm(validContact),{Origin:base},503);
await api('Valid project: explicit unavailable delivery',makeForm(validProject),{Origin:base},503);
await api('Cross-origin',makeForm(validContact),{Origin:'https://unrelated.example'},403);
await api('JSON content type',JSON.stringify(validContact),{'Content-Type':'application/json'},415);
await api('Empty multipart',new FormData(),{Origin:base},422);
await api('Invalid email',makeForm({...validContact,email:'broken'}),{Origin:base},422);
await api('Missing consent',makeForm({...validContact,consent:''}),{Origin:base},422);
await api('Honeypot',makeForm({...validContact,website:'robot'}),{Origin:base},400);
await api('Unsupported attachment',(()=>{const f=makeForm(validProject);f.append('files',new Blob(['test'],{type:'text/plain'}),'fixture.exe');return f;})(),{Origin:base},422);
await api('Six attachments',(()=>{const f=makeForm(validProject);for(let i=0;i<6;i++)f.append('files',new Blob(['test'],{type:'image/png'}),`fixture-${i}.png`);return f;})(),{Origin:base},422);
await api('Malformed multipart body','broken',{'Content-Type':'multipart/form-data; boundary=absent',Origin:base},400);
await api('Overlong message',makeForm({...validContact,message:'x'.repeat(8001)}),{Origin:base},422);

const validationEdges=[];
for(const phone of ['------','......','++++++','123456','+66 81 123 4567']) {
  const result=validateEnquiry(makeForm({...validContact,phone}));
  validationEdges.push({phone,accepted:!result.errors.phone,errors:result.errors});
}

const assets=[];
for(const src of [...scriptPaths]) {
  const response=await fetch(new URL(src,base));
  const body=await response.arrayBuffer();
  assets.push({src,status:response.status,uncompressedBytes:body.byteLength,cacheControl:response.headers.get('cache-control')});
}
const result={date:'2026-10-05',timeZone:'Asia/Bangkok',base,mode:'next start production build',browserStatus:'Chrome connection pending; HTTP/source evidence only',pages,internalLinks,externalLinks,specialLinks,routeEdges,apiCases,validationEdges,scriptAssets:assets,summary:{routes:pages.length,uniqueInternalLinks:internalLinks.length,brokenInternalLinks:internalLinks.filter(link=>link.status>=400||link.anchorExists===false),externalLinks:externalLinks.length,scriptAssets:assets.length,uniqueScriptBytes:assets.reduce((sum,item)=>sum+item.uncompressedBytes,0),allApiCasesPass:apiCases.every(item=>item.pass)}};
await fs.writeFile(output,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result.summary,null,2));
console.log('External destinations:',JSON.stringify(externalLinks.map(link=>link.href)));
console.log('Phone validation:',JSON.stringify(validationEdges));
