import {existsSync,readFileSync,statSync} from 'node:fs';
import {join} from 'node:path';

const root=join(process.cwd(),'design-review','developer-motion-v1');
const requireFile=(file)=>{const path=join(root,file);if(!existsSync(path))throw Error('Missing motion review file '+file);return readFileSync(path,'utf8');};
const html=requireFile('src/pages/index.astro');
const ts=requireFile('src/scripts/motion.ts');
const css=requireFile('src/styles/motion.css');
const pkg=JSON.parse(requireFile('package.json'));
const cfg=requireFile('astro.config.mjs');
let tested=0;
const check=(ok,name)=>{if(!ok)throw Error('Motion review QA: '+name);tested++};
check(pkg.name==='@estate/developer-motion-review','must have dedicated Astro workspace');
check(Boolean(pkg.dependencies?.gsap),'GSAP must be bundled from npm');
check(cfg.includes('/real-estate-portfolio/design-review/developer-motion-v1/'),'correct GitHub Pages base path');
check(html.includes('noindex,nofollow'),'explicit demo noindex');
check(html.includes('Fictional architecture') && html.includes('No real development'),'truthful demo label');
check(html.includes('data-hero-video')&&html.includes('autoplay muted loop playsinline'),'real autoplay muted looping hero video');
check(html.includes('data-scrub-video')&&html.includes('developer-concept-motion.mp4'),'actual video element for scroll scene');
check(ts.includes("import gsap from 'gsap'") && ts.includes("import { ScrollTrigger } from 'gsap/ScrollTrigger'"),'bundled GSAP ScrollTrigger');
check(ts.includes('pin:stage')&&ts.includes('scrub:.55')&&ts.includes('seekScrub(videoState.time)'),'pinned video-scroll scrub');
check(ts.includes("scrubVideo.currentTime=target"),'real video seeking rather than fake progress');
check(ts.includes('shadow-light-group') && ts.includes('shadow-branch') && ts.includes('repeat:-1') && ts.includes('yoyo:true'),'independently animated shadows');
check(ts.includes('prefers-reduced-motion: reduce')&&ts.includes('scrubTrigger?.kill()'),'reduced motion removes pin and autoplay');
check(html.includes('data-motion-toggle')&&html.includes('data-shadow-toggle'),'working motion pause controls');
check(css.includes('@media(max-width:380px)')&&css.includes('@media(max-width:760px)')&&css.includes('@media(prefers-reduced-motion:reduce)'),'mobile and reduced-motion CSS');
check(html.includes('SERA / COAST'),'fictional branding present');
for(const file of ['assets/sera-hero.webp','assets/sera-architecture.webp','assets/developer-desert.webp','assets/sera-pool.webp','assets/residence-a.webp','assets/residence-b.webp','media/sera-concept-motion.mp4','media/developer-concept-motion.mp4']){
 const path=join(root,'public',file);check(existsSync(path) && statSync(path).size>25000,`actual media asset ${file}`);
}
console.log(`Developer motion design-review: ${tested} source/asset checks passed.`);