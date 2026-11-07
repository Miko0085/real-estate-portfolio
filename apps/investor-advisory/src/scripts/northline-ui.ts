/* NORTHLINE V5.3 — visual interaction layer only; matching/calculator/forms stay in production modules. */
const header=document.querySelector<HTMLElement>('.header');
window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>45),{passive:true});
const menu=document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobile=document.querySelector<HTMLElement>('.mobile-nav');
const setMenu=(open:boolean)=>{if(!menu||!mobile)return;mobile.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');};
menu?.addEventListener('click',()=>setMenu(Boolean(mobile?.hidden)));
mobile?.querySelectorAll<HTMLAnchorElement>('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
document.addEventListener('click',e=>{if(header&&!header.contains(e.target as Node))setMenu(false)});
const regionButtons=[...document.querySelectorAll<HTMLButtonElement>('.market-picker [data-market]')];
function toggleMarket(market:string){regionButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.market===market)));document.querySelectorAll<HTMLElement>('.region-card').forEach(el=>{el.hidden=market!=='open'&&el.dataset.region!==market;});const grid=document.querySelector<HTMLElement>('.region-grid');if(grid)grid.style.gridTemplateColumns=market==='open'?'':'minmax(0,1fr)';}
regionButtons.forEach(b=>b.addEventListener('click',()=>toggleMarket(b.dataset.market||'open')));
if(regionButtons.length)toggleMarket('open');
const developments=document.getElementById('dev-scroll');
document.getElementById('dev-next')?.addEventListener('click',()=>developments?.scrollBy({left:Math.max(260,(developments?.clientWidth||600)*.58),behavior:'smooth'}));
document.getElementById('dev-prev')?.addEventListener('click',()=>developments?.scrollBy({left:-Math.max(260,(developments?.clientWidth||600)*.58),behavior:'smooth'}));
const search=document.querySelector<HTMLFormElement>('#quick-search');
search?.addEventListener('submit',event=>{
 event.preventDefault();
 const brief=document.querySelector<HTMLElement>('[data-quiz]');
 const form=brief?.querySelector<HTMLFormElement>('form');
 if(!form){location.href=search.action;return;}
 for(const id of ['market','budget','objective']){
  const value=search.querySelector<HTMLSelectElement>(`[name="${id}"]`)?.value;
  if(!value)continue;
  const radio=[...form.querySelectorAll<HTMLInputElement>(`input[name="${id}"]`)].find(x=>x.value===value);
  if(radio)radio.checked=true;
 }
 document.querySelector('#investor-brief')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
});
// The production quiz owns result/back state; delegate the visible V5 reset control to it.
document.querySelector('#quiz-reset')?.addEventListener('click',()=>{
 document.querySelector<HTMLButtonElement>('[data-quiz] [data-back]')?.click();
});