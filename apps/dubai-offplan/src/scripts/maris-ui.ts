import { track } from '@estate/analytics';
const tabs = [...document.querySelectorAll<HTMLButtonElement>('[data-plan-tab]')];
const panels = [...document.querySelectorAll<HTMLElement>('[data-plan-panel]')];
function selectPlan(id: string, focus = false) {
  const chosen = tabs.find(tab => tab.dataset.planTab === id);
  if (!chosen) return;
  for(const tab of tabs) {
    const active = tab === chosen;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  }
  for(const panel of panels) panel.hidden = panel.dataset.planPanel !== id;
  if (focus) chosen.focus();
  track('view_floor_plan', { development: 'maris-demo', bedrooms: id });
}
tabs.forEach((tab,i) => {
  tab.addEventListener('click',() => selectPlan(tab.dataset.planTab || '1',false));
  tab.addEventListener('keydown',e => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
    e.preventDefault();
    let index = i;
    if(e.key==='ArrowLeft') index=(i-1+tabs.length)%tabs.length;
    if(e.key==='ArrowRight') index=(i+1)%tabs.length;
    if(e.key==='Home') index=0;
    if(e.key==='End') index=tabs.length-1;
    selectPlan(tabs[index]?.dataset.planTab || '1',true);
  });
});
document.querySelectorAll<HTMLElement>('[data-select-plan]').forEach(el => el.addEventListener('click', () => {
  const id=el.dataset.selectPlan || '1';
  selectPlan(id);
}));
document.querySelectorAll<HTMLElement>('[data-select-unit]').forEach(el=>el.addEventListener('click',()=>{
  const select=document.querySelector<HTMLSelectElement>('#property_type');
  if(select) select.value = `${el.dataset.selectUnit}-bedroom`;
}));
const galleryButtons=[...document.querySelectorAll<HTMLButtonElement>('[data-gallery-item]')];
const filters=[...document.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]')];
filters.forEach(filter=>filter.addEventListener('click',()=>{
  const cat=filter.dataset.galleryFilter || 'all';
  filters.forEach(f=>f.setAttribute('aria-pressed',String(f===filter)));
  galleryButtons.forEach(item => {
    item.hidden = cat !== 'all' && item.dataset.category !== cat;
    item.classList.remove('m-gallery-lead');
  });
  const firstVisible = galleryButtons.find(item => !item.hidden);
  firstVisible?.classList.add('m-gallery-lead');
  document.querySelector('.m-gallery-grid')?.classList.toggle('is-filtered',cat !== 'all');
}));
const dialog=document.querySelector<HTMLDialogElement>('#maris-lightbox');
const photo=dialog?.querySelector<HTMLImageElement>('[data-lightbox-image]');
const title=dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
const counter=dialog?.querySelector<HTMLElement>('[data-lightbox-count]');
let active=0;
let trigger: HTMLButtonElement | null=null;
function visibleGallery(){return galleryButtons.filter(btn=>!btn.hidden);}
function show(index:number){
  if(!dialog || !photo) return;
  const visible=visibleGallery();
  if(!visible.length)return;
  active=(index+visible.length)%visible.length;
  const button=visible[active];
  const image=button?.querySelector('img');
  if(!button || !image)return;
  photo.src=image.currentSrc || image.src;
  photo.alt=image.alt;
  if(title)title.textContent=button.querySelector('span')?.textContent?.replace('↗','').trim()||'MARIS visual';
  if(counter)counter.textContent=`${String(active+1).padStart(2,'0')} / ${String(visible.length).padStart(2,'0')}`;
}
galleryButtons.forEach(btn=>btn.addEventListener('click',()=>{
  if(!dialog)return;
  trigger=btn;
  show(visibleGallery().indexOf(btn));
  dialog.showModal();
  dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]')?.focus();
}));
dialog?.querySelector('[data-lightbox-previous]')?.addEventListener('click',()=>show(active-1));
dialog?.querySelector('[data-lightbox-next]')?.addEventListener('click',()=>show(active+1));
dialog?.querySelector('[data-lightbox-close]')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',ev=>{if(ev.target===dialog) dialog.close();});
dialog?.addEventListener('close',()=>trigger?.focus());
dialog?.addEventListener('keydown',ev=>{
  if(ev.key==='ArrowLeft'){ev.preventDefault();show(active-1);}
  if(ev.key==='ArrowRight'){ev.preventDefault();show(active+1);}
});
