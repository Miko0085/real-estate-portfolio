import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
const root = resolve('design-review/v4');
const slugs=['dubai-offplan','investor-advisory','luxury-brokerage','seller-leads','developer-project'];
let tested=0;
for(const slug of slugs){
  const dir=join(root,slug);
  if(!existsSync(join(dir,'style.css')))throw Error('Missing style: '+slug);
  const css=readFileSync(join(dir,'style.css'),'utf8');
  if(css.length<1500)throw Error('Missing distinct design system: '+slug);
  for(const pageName of ['index.html','detail.html']){
    const html=readFileSync(join(dir,pageName),'utf8');
    if(!html.includes('FICTIONAL REAL ESTATE')||!html.includes('noindex,nofollow'))throw Error('Missing prototype disclosure: '+slug+'/'+pageName);
    if((html.match(/<h1\b/g)||[]).length!==1)throw Error('Invalid h1 count: '+slug+'/'+pageName);
    for(const m of html.matchAll(/src="\.\.\/media\/([^"]+)"/g)){
      if(!existsSync(join(root,'media',m[1])))throw Error('Missing media '+m[1]);
    }
    tested++;
  }
}
const used=new Map();
const media=['dubai-hero','investor-hero','broker-hero','seller-hero','developer-hero'];
for(const file of media){
 const path=join(root,'media',file+'.webp');
 if(!existsSync(path)||statSync(path).size<20000)throw Error('Missing or undersized hero media: '+file);
}
if(!existsSync(join(root,'index.html')))throw Error('Missing review index');
console.log(`Design v4 prototype assets/structure: ${tested} pages, 5 distinct hero assets verified.`);
