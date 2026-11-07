import {readFileSync,existsSync,statSync} from 'node:fs';
import {join} from 'node:path';
const dir=join(process.cwd(),'design-review','developer-motion-v2');
const page=readFileSync(join(dir,'src/pages/index.astro'),'utf8');
const css=readFileSync(join(dir,'src/styles/serav2.css'),'utf8');
const js=readFileSync(join(dir,'src/scripts/serav2.ts'),'utf8');
const config=readFileSync(join(dir,'astro.config.mjs'),'utf8');
const pkg=JSON.parse(readFileSync(join(dir,'package.json'),'utf8'));
const assert=(x,msg)=>{if(!x)throw Error('SERA V2: '+msg)};
assert(pkg.dependencies.gsap,'Local GSAP package required');
assert(config.includes('/real-estate-portfolio/design-review/developer-motion-v2/'),'Correct Pages base required');
assert(page.includes('noindex,nofollow'),'Demo noindex required');
assert((page.match(/<h1\b/g)||[]).length===1,'Exactly one H1');
for(const id of ['home','vision','sequence','architecture','residences','enquire'])assert(page.includes(`id="${id}"`),'Missing '+id);
for(const x of ['data-hero-video','data-scroll-video','data-motion-toggle','data-gallery-dialog','data-demo-form'])assert(page.includes(x),'Missing interactive '+x);
for(const x of ['gsap/ScrollTrigger','currentTime','requestAnimationFrame','prefers-reduced-motion','showModal()','reportValidity()'])assert(js.includes(x),'Missing functional '+x);
assert(js.includes('pin:'),'Actual pinned ScrollTrigger required');
assert(css.includes('@media(prefers-reduced-motion:reduce)'),'Reduced motion CSS required');
assert(css.length>15000,'Missing original CSS design');
for(const f of ['media/courtyard-light-loop.mp4','media/architecture-sequence.mp4','images/courtyard.webp','images/coastal-villa.webp','images/residence-interior.webp','images/architecture-detail.webp','images/pool-terrace.webp']) {
 const p=join(dir,'public',f);
 assert(existsSync(p),'Missing local media: '+f);
 assert(statSync(p).size>20000,'Undersized media: '+f);
}
console.log('SERA Motion V2 — source, GSAP, hero film, scrubbable video and media: OK');