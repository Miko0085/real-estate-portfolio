import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const projects = ['dubai-offplan', 'investor-advisory', 'luxury-brokerage', 'seller-leads', 'developer-project'];
const out = join(process.cwd(), 'pages-dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const slug of projects) {
  const dist = join('apps', slug, 'dist');
  if (!existsSync(join(dist, 'index.html'))) throw new Error(`Missing Astro build: ${slug}`);
  cpSync(dist, join(out, slug), { recursive: true });
  const home = readFileSync(join(out, slug, 'index.html'), 'utf8');
  if (!home.includes('real-estate-portfolio/' + slug)) throw new Error(`Incorrect base URL in build: ${slug}`);
}

const review = join('design-review','v4');
if (!existsSync(join(review,'index.html'))) throw new Error('Missing visual review proposals');
cpSync(review, join(out,'design-review','v4'), { recursive: true });
const northlineReview = join('design-review', 'northline-v5');
if (!existsSync(join(northlineReview, 'index.html')) || !existsSync(join(northlineReview, 'brief.html'))) throw new Error('Missing NORTHLINE V5 design-review pages');
cpSync(northlineReview, join(out, 'design-review', 'northline-v5'), { recursive: true });

const motionReview=join('design-review','developer-motion-v1','dist');
if(!existsSync(join(motionReview,'index.html'))) throw new Error('Missing Astro motion review dist');
const motionHtml=readFileSync(join(motionReview,'index.html'),'utf8');
if(!motionHtml.includes('real-estate-portfolio/design-review/developer-motion-v1/')) throw new Error('Motion review base path incorrect');
cpSync(motionReview, join(out,'design-review','developer-motion-v1'), { recursive:true });
for(const file of ['assets/sera-hero.webp','assets/sera-architecture.webp','media/sera-concept-motion.mp4','media/developer-concept-motion.mp4'])
  if(!existsSync(join(out,'design-review','developer-motion-v1',file))) throw new Error('Missing motion review asset: '+file);


for (const asset of ['index.html','styles.css','favicon.svg','og-cover.svg']) {
  cpSync(join('portfolio', asset), join(out, asset));
}
writeFileSync(join(out, '.nojekyll'), '');
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
writeFileSync(join(out, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><main style="font-family:system-ui;max-width:680px;margin:8vw auto;padding:24px"><h1>Page not found</h1><a href="/real-estate-portfolio/">Return to the portfolio</a></main></html>');

const portfolio = readFileSync(join(out, 'index.html'), 'utf8');
for (const slug of projects) {
  if (!portfolio.includes(`href="./${slug}/"`)) throw new Error(`Missing navigation link: ${slug}`);
}
if (!portfolio.includes('styles.css')) throw new Error('Portfolio stylesheet not linked');
const expectedMedia = [
 ['dubai-offplan','assets/project-waterfront.webp'],
 ['dubai-offplan','assets/residence-interior.webp'],
 ['investor-advisory','assets/market-dubai.webp'],
 ['investor-advisory','assets/market-lisbon.webp'],
 ['investor-advisory','assets/market-london.webp'],
 ['luxury-brokerage','assets/shoreline.webp'],
 ['luxury-brokerage','assets/courtyard.webp'],
 ['seller-leads','assets/fieldnote-residence.webp'],
 ['developer-project','assets/sera-hero.webp'],
 ['developer-project','assets/sera-pool.webp'],
 ['developer-project','media/sera-concept-motion.mp4']
];
for (const [site,media] of expectedMedia) {
 if (!existsSync(join(out,site,media))) throw new Error('Required media missing: '+site+'/'+media);
}
for(const [site,asset] of [
 ['dubai-offplan','assets/dubai-daylight.webp'],
 ['luxury-brokerage','assets/brokerage-noir.webp'],
 ['seller-leads','assets/seller-daylight.webp'],
 ['developer-project','assets/developer-desert.webp'],
 ['developer-project','media/developer-concept-motion.mp4']
]) if(!existsSync(join(out,site,asset))) throw new Error('Missing distinct design asset: '+site+'/'+asset);
const dubaiRoot = readFileSync(join(out,'dubai-offplan','index.html'),'utf8');
const dubaiPrivacy = readFileSync(join(out,'dubai-offplan','privacy','index.html'),'utf8');
for (const [page,expected] of [[dubaiRoot,'/real-estate-portfolio/dubai-offplan/'],[dubaiPrivacy,'/real-estate-portfolio/dubai-offplan/privacy/']]) {
 if (!page.includes('rel="canonical"') || !page.includes(expected)) throw new Error('Dubai canonical URL missing expected GitHub Pages base '+expected);
}
console.log('GitHub Pages build: real-estate website portfolio plus five real-estate applications.');