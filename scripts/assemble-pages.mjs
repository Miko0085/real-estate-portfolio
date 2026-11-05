import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const apps = [
  ['dubai-offplan','MARIS Residences','Search-intent landing','Original fictional off-plan experience','01'],
  ['investor-advisory','NORTHLINE Advisory','Investor qualification','Interactive advisory concept — not launched','02'],
  ['luxury-brokerage','Luxury Brokerage','Property discovery','Catalogue and area content — not launched','03'],
  ['seller-leads','Seller Valuation','Seller lead generation','Valuation funnel — not launched','04'],
  ['developer-project','SERA / COAST','Developer storytelling','Premium microsite — not launched','05']
];
const out = join(process.cwd(), 'pages-dist');
rmSync(out, { recursive: true, force: true });
mkdirSync(out,{recursive:true});
for (const [slug] of apps) {
  const src=join('apps',slug,'dist');
  if(!existsSync(join(src,'index.html'))) throw new Error(`Missing Astro build for ${slug}`);
  cpSync(src,join(out,slug),{recursive:true});
}
writeFileSync(join(out,'.nojekyll'),'');
writeFileSync(join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
const root='https://miko0085.github.io/real-estate-portfolio/';
const titles=apps.map(([slug,name,category,desc,number])=>`<a class="project" href="./${slug}/" aria-label="Open ${name}"><div class="project-meta"><span>${number} / ${category}</span><span aria-hidden="true">↗</span></div><h2>${name}</h2><p>${desc}</p><span class="visit">Explore concept <span aria-hidden="true">↗</span></span></a>`).join('');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="Five independent fictional real estate website design concepts, built with Astro as an AI-assisted production portfolio."><meta name="theme-color" content="#112a2e"><link rel="canonical" href="${root}"><title>Real Estate Portfolio — Five Digital Experiences</title><style>
:root{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#213c3e;background:#f7f5ef;color-scheme:light}*{box-sizing:border-box}body{margin:0}a{color:inherit}a:focus-visible{outline:3px solid #bd7933;outline-offset:5px}header,main,footer{width:min(1230px,calc(100% - 36px));margin:0 auto}header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #bac8c1;padding:27px 0;gap:16px}header strong{font-size:15px;letter-spacing:.11em}header span,.eyebrow,.project-meta{font-size:11px;font-weight:650;letter-spacing:.12em;text-transform:uppercase}header span{color:#547570}main{padding:clamp(72px,10vw,150px) 0}.eyebrow{color:#4d716c}h1{font-family:Georgia,serif;font-size:clamp(53px,8.3vw,122px);letter-spacing:-.07em;line-height:.97;font-weight:400;max-width:1050px;margin:24px 0 32px}h1 em{font-weight:400}.intro{font-size:clamp(16px,2vw,21px);max-width:720px;color:#4f6764;line-height:1.7;margin:0 0 80px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.project{border:1px solid #b6c9c0;background:#eaf0e8;padding:clamp(26px,4vw,48px);text-decoration:none;display:flex;flex-direction:column;min-height:340px;transition:background .15s,border-color .15s}.project:nth-child(2){background:#f1e7de}.project:nth-child(3){background:#e9e9e4}.project:nth-child(4){background:#e9efe9}.project:nth-child(5){background:#e6e5df}.project:hover{border-color:#214c48;background:#dce8de}.project-meta{display:flex;justify-content:space-between;gap:12px;color:#406862}.project-meta span:first-child{max-width:230px}.project h2{font:400 clamp(32px,4vw,54px)/1.1 Georgia,serif;letter-spacing:-.035em;margin:63px 0 9px}.project p{margin:0 0 30px;color:#526d69;line-height:1.65}.visit{margin-top:auto;border-top:1px solid #acc1b7;padding-top:16px;font-size:13px;font-weight:700;display:flex;justify-content:space-between}footer{border-top:1px solid #bac8c1;padding:24px 0 50px;display:flex;justify-content:space-between;gap:20px;color:#59716d;font-size:12px}footer a{text-underline-offset:4px}@media(max-width:680px){header{align-items:flex-start}header span{text-align:right;max-width:150px}.grid{grid-template-columns:1fr}.project{min-height:295px}.project h2{margin-top:45px}footer{flex-direction:column}}@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style></head><body><header><strong>ESTATE / LAB</strong><span>Independent portfolio demonstration</span></header><main><p class="eyebrow">Real estate / digital experiences / 2026</p><h1>Five properties.<br><em>Five digital journeys.</em></h1><p class="intro">A portfolio exploring how modern, conversion-focused websites serve developers, brokerages, sellers, and international property investors. All brands and example inventory are fictional.</p><div class="grid">${titles}</div></main><footer><span>Portfolio demo · No real offers, agencies, transactions or commercial claims.</span><a href="https://github.com/Miko0085/real-estate-portfolio">View source on GitHub</a></footer></body></html>`;
writeFileSync(join(out,'index.html'),html);
writeFileSync(join(out,'404.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found</title><body style="font-family:system-ui;padding:6vw;max-width:680px;margin:auto;color:#183e3d"><h1>Page not found</h1><p>This portfolio page might have moved.</p><a href="${root}">Return to the portfolio</a></body></html>`);
for(const [slug] of apps){
 const body=readFileSync(join(out,slug,'index.html'),'utf8');
 if(body.includes('src="/assets/')||body.includes('href="/privacy/'))throw new Error(`Unprefixed asset/page URLs found in ${slug}`);
 if(!body.includes('real-estate-portfolio/'+slug))throw new Error(`Missing repository base path in ${slug}`);
}
console.log(`GitHub Pages artifact assembled: ${apps.length} Astro apps + portfolio index`);
