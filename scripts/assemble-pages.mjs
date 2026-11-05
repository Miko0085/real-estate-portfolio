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
if (!existsSync(join(out, 'dubai-offplan', 'assets', 'coastal-residence.svg'))) throw new Error('Dubai Off-Plan preview image is missing');
console.log('GitHub Pages build: real-estate website portfolio plus five real-estate applications.');