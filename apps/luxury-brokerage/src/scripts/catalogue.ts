const form=document.querySelector<HTMLFormElement>('[data-filters]');
if(form){
 const cards=[...document.querySelectorAll<HTMLElement>('[data-property]')];
 const count=document.querySelector<HTMLElement>('[data-result-count]');
 const empty=document.querySelector<HTMLElement>('[data-no-results]');
 const params=new URLSearchParams(location.search);
 for(const control of [...form.elements]){
   if(control instanceof HTMLSelectElement && params.has(control.name)){
     const value=params.get(control.name)||'';
     if([...control.options].some(option=>option.value===value)) control.value=value;
   }
 }
 const apply=()=>{
   const d=new FormData(form);
   const filters={area:String(d.get('area')||''),type:String(d.get('type')||''),beds:Number(d.get('beds')||0),price:Number(d.get('price')||0),status:String(d.get('status')||'')};
   let visible=0;
   for(const card of cards){
     const show=(!filters.area||card.dataset.area===filters.area) && (!filters.type||card.dataset.type===filters.type) && (!filters.beds||Number(card.dataset.beds)>=filters.beds) && (!filters.price||Number(card.dataset.price)<=filters.price) && (!filters.status||card.dataset.status===filters.status);
     card.hidden=!show;if(show)visible++;
   }
   if(count)count.textContent=`${visible} ${visible===1?'property':'properties'}`;
   if(empty)empty.hidden=visible>0;
   const query=new URLSearchParams();
   for(const [key,value] of Object.entries(filters)) if(value)query.set(key,String(value));
   history.replaceState(null,'',location.pathname+(query.size?'?'+query.toString():''));
 };
 form.addEventListener('change',apply);
 form.addEventListener('reset',()=>window.setTimeout(apply,0));
 document.querySelector('[data-reset-filters]')?.addEventListener('click',()=>form.reset());
 apply();
}
