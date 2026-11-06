import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,existsSync } from 'node:fs';
import { join } from 'node:path';
import { calculateIllustrativeYield } from '../packages/utils/src/investment.ts';
const root=new URL('..',import.meta.url).pathname;
const read=p=>readFileSync(join(root,p),'utf8');
test('investor illustration gross and net math and occupancy',()=>{
  const sample=calculateIllustrativeYield({price:450000,rent:31500,service:3600,management:2400,occupancy:90});
  assert.ok(Math.abs(sample.grossYield-7)<1e-9);
  assert.ok(Math.abs(sample.netYield-4.966666666666667)<.00001);
  assert.equal(sample.netIncome,22350);
  assert.equal(calculateIllustrativeYield({price:0,rent:1,service:0,management:0,occupancy:100}).netYield,null);
  assert.equal(calculateIllustrativeYield({price:100,rent:100,service:0,management:0,occupancy:250}).grossYield,100);
});
test('all four upgraded applications have real UI and privacy pages',()=>{
  for(const site of ['investor-advisory','luxury-brokerage','seller-leads','developer-project']){
    const path=`apps/${site}/src/pages/`;
    const html=read(path+'index.astro');
    assert.ok(!html.includes('NOT LAUNCHED') && !html.includes('IMPLEMENTATION PENDING'));
    assert.ok(existsSync(join(root,path+'privacy/index.astro')));
    assert.ok(existsSync(join(root,`apps/${site}/public/favicon.svg`)));
    if(site==='investor-advisory') for(const market of ['dubai','lisbon','london']) assert.ok(existsSync(join(root,`apps/${site}/public/assets/market-${market}.webp`)));
  }
});
test('investor brief and rental model have inputs and conditional options',()=>{
  const html=read('apps/investor-advisory/src/pages/index.astro');
  for(const field of ['budget','objective','market','status','timeline','financing','consent'])assert.ok(html.includes(`name="${field}"`));
  for(const target of ['gross-yield','net-yield','net-income'])assert.ok(html.includes(target));
});
test('brokerage supports full routes, filters and original example properties',()=>{
  const p='apps/luxury-brokerage/src/pages/';
  for(const name of ['properties/index.astro','properties/[slug].astro','developments/[slug].astro','areas/[slug].astro','buy/index.astro','sell/index.astro','about/index.astro','insights/index.astro','contact/index.astro'])assert.ok(existsSync(join(root,p+name)),name);
  const catalogue=read(p+'properties/index.astro');
  for(const name of ['area','type','beds','price','status'])assert.ok(catalogue.includes(`name="${name}"`));
  assert.ok((read('apps/luxury-brokerage/src/data/inventory.ts').match(/slug:'/g)||[]).length>=11);
});
test('seller wizard includes property facts, occupancy, timeframe and consent',()=>{
  const html=read('apps/seller-leads/src/pages/index.astro');
  for(const name of ['property_type','area_building','bedrooms','size_sqft','occupancy','estimated_value','timeline','name','email','consent'])assert.ok(html.includes(`name="${name}"`));
  assert.equal((html.match(/data-seller-step/g)||[]).length,3);
});
test('developer plan/brochure are local, fictional and downloadable',()=>{
  const base='apps/developer-project/public';
  assert.ok(existsSync(join(root,`${base}/brochure/sera-concept-brochure.pdf`)));
  for(const f of ['horizon-plan.svg','sanctuary-plan.svg'])assert.ok(existsSync(join(root,`${base}/floorplans/${f}`)));
  const html=read('apps/developer-project/src/pages/index.astro');
  for(const id of ['vision','residences','masterplan','amenities','location','payment','enquire'])assert.ok(html.includes(`id="${id}"`));
});

test('photography and concept film assets exist in every application',()=>{
 const required={
  'dubai-offplan':['project-waterfront.webp','residence-interior.webp','pool-terrace.webp'],
  'investor-advisory':['advisory-residence.webp','market-dubai.webp','market-lisbon.webp','market-london.webp','opportunity-coast.webp'],
  'luxury-brokerage':['shoreline.webp','courtyard.webp','marina.webp','horizon.webp','garden.webp','quayside.webp'],
  'seller-leads':['fieldnote-residence.webp','marketing-study.webp'],
  'developer-project':['sera-hero.webp','sera-architecture.webp','residence-a.webp','residence-b.webp','sera-pool.webp']
 };
 for(const [site,names] of Object.entries(required))for(const name of names)assert.ok(existsSync(join(root,'apps',site,'public','assets',name)),site+' / '+name);
 const film=join(root,'apps/developer-project/public/media/sera-concept-motion.mp4');
 assert.ok(existsSync(film),'Playable concept film');
 const html=read('apps/developer-project/src/pages/index.astro');
 assert.ok(html.includes('<video')&&html.includes('controls')&&html.includes('preload="none"')&&html.includes('ANIMATED STILLS'));
});

test('design v3 hero media and developer video have real local files',()=>{
 for (const [site, filename] of [
   ['dubai-offplan','dubai-daylight.webp'],
   ['luxury-brokerage','brokerage-noir.webp'],
   ['seller-leads','seller-daylight.webp'],
   ['developer-project','developer-desert.webp']
 ]) {
   assert.ok(existsSync(join(root,'apps',site,'public/assets',filename)),site+' '+filename);
 }
 assert.ok(existsSync(join(root,'apps/developer-project/public/media/developer-concept-motion.mp4')));
});
