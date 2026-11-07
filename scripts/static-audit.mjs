import {readFileSync, existsSync} from 'node:fs';
import {join} from 'node:path';
const root=process.cwd();let failures=[];let successes=[];
const apps=['dubai-offplan','investor-advisory','luxury-brokerage','seller-leads','developer-project'];
const docs=['references','information-architecture','cro-decisions','seo','analytics','accessibility','performance','README'];
function verify(cond,msg){if(!cond)failures.push(msg);else successes.push(msg)}
for(const a of apps){const base=join(root,'apps',a);verify(existsSync(join(base,'astro.config.mjs')),`${a}: astro config`);verify(existsSync(join(base,'src/pages/index.astro')),`${a}: index`);for(const name of docs)verify(existsSync(join(base,'docs',name+'.md')),`${a}: ${name} doc`);const refs=readFileSync(join(base,'docs','references.md'),'utf8');verify((refs.match(/https:\/\//g)||[]).length>=6,`${a}: >=6 linked design/IA references`);verify(existsSync(join(base,'public','_headers')),`${a}: Cloudflare headers`);}
for(const pkg of ['ui','typography','design-tokens','forms','analytics','seo','structured-data','utils'])verify(existsSync(join(root,'packages',pkg,'src','index.ts')),`package ${pkg}`);
const source=readFileSync(join(root,'apps/dubai-offplan/src/pages/index.astro'),'utf8');
for(const section of ['overview','residences','payment','floorplans','amenities','location','developer','gallery','investment','faq','enquire'])verify(source.includes(`id="${section}"`),`offplan section ${section}`);
for(const f of ['budget','property_type','purpose','timeline','financing','name','phone','email','consent'])verify(source.includes(`name="${f}"`),`lead field ${f}`);
for(const a of ['coastal-residence.svg','interior-concept.svg','pool-concept.svg','location-diagram.svg'])verify(existsSync(join(root,'apps/dubai-offplan/public/assets',a)),`illustration ${a}`);
verify(existsSync(join(root,'apps/dubai-offplan/public/brochure/maris-sample-brochure.pdf')),'sample brochure');
verify(existsSync(join(root,'apps/dubai-offplan/src/styles/global.css')),'offplan responsive stylesheet');
verify(existsSync(join(root,'apps/dubai-offplan/src/scripts/lead-form.ts')),'form enhancement');
verify(source.includes('method="post"') && source.includes('https://example.invalid/not-connected'), 'safe POST fallback if client JS is unavailable');

const implemented = ['investor-advisory','luxury-brokerage','seller-leads','developer-project'];
for(const slug of implemented){
 const base=join(root,'apps',slug), main=readFileSync(join(base,'src/pages/index.astro'),'utf8');
 verify(!main.includes('NOT LAUNCHED')&&!main.includes('IMPLEMENTATION PENDING'),`${slug}: implemented homepage`);
 verify(existsSync(join(base,'src/pages/privacy/index.astro')),`${slug}: privacy notice`);
 verify(existsSync(join(base,'public/favicon.svg')),`${slug}: favicon`);
 verify(existsSync(join(base,'public/og-cover.svg')),`${slug}: social image`);
 const customShell=join(base,'src/layouts/NorthlineShell.astro');
 const shell=slug==='investor-advisory' && existsSync(customShell)?readFileSync(customShell,'utf8'):'';
 verify(main.includes('@estate/ui/PortfolioLayout.astro') || (
   slug==='investor-advisory' && main.includes('NorthlineShell.astro') &&
   shell.includes('@estate/seo/Seo.astro') &&
   shell.includes('@estate/forms/portfolio') &&
   shell.includes('@estate/analytics')
 ),`${slug}: shared SEO, forms and analytics infrastructure`);
 verify(existsSync(join(base,'src/pages/sitemap.xml.ts')),`${slug}: sitemap`);
}
for(const path of ['packages/ui/src/PortfolioLayout.astro','packages/ui/src/portfolio-base.css','packages/forms/src/portfolio.ts','packages/utils/src/investment.ts'])verify(existsSync(join(root,path)),`shared ${path}`);
console.log(`Static source audit: ${successes.length} passed, ${failures.length} failed.`);for(const issue of failures)console.error('FAIL',issue);process.exitCode=failures.length?1:0;
