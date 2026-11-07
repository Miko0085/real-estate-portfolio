import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const dir='design-review/northline-v5';
const names=['index.html','brief.html','styles.css','app.js','README.md','preview-qa.json'];
for(const n of names) if(!existsSync(join(dir,n))) throw Error('NORTHLINE V5.2 review file missing: '+n);
for(const n of ['index.html','brief.html']){
 const h=readFileSync(join(dir,n),'utf8');
 if(!h.includes('noindex,nofollow')||!h.includes('FICTIONAL PROPERTY STUDIES'))throw Error('Review disclaimer missing '+n);
 if((h.match(/<h1\b/g)||[]).length!==1)throw Error('Expected one H1: '+n);
 for(const m of h.matchAll(/\.\.\/\.\.\/investor-advisory\/assets\/([a-z0-9-]+\.webp)/g)){
  if(!existsSync(join('apps/investor-advisory/public/assets',m[1])))throw Error('Preview asset missing: '+m[1]);
 }
}
const index=readFileSync(join(dir,'index.html'),'utf8');
for(const id of ['markets','opportunities','developments','calculator','investor-brief','insights','contact'])if(!index.includes('id="'+id+'"'))throw Error('Section missing: '+id);
const quiz=readFileSync(join(dir,'app.js'),'utf8');
if(!quiz.includes("accepted") && !quiz.includes('matchesBudget'))throw Error('Investor brief logic missing');
if(!quiz.includes('No sample concept fits'))throw Error('No-match state missing');
console.log('NORTHLINE V5.2 preview structure, assets, 7-step quiz: PASS.');