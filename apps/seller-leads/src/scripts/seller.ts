import {track} from '@estate/analytics';
const form=document.querySelector<HTMLFormElement>('[data-seller-wizard]');
if(form){
 const steps=[...form.querySelectorAll<HTMLFieldSetElement>('[data-seller-step]')];
 const next=form.querySelector<HTMLButtonElement>('[data-wizard-next]')!;
 const prev=form.querySelector<HTMLButtonElement>('[data-wizard-back]')!;
 const submit=form.querySelector<HTMLButtonElement>('[data-wizard-submit]')!;
 const progress=form.querySelector<HTMLElement>('[data-wizard-progress]')!;
 const number=form.querySelector<HTMLElement>('[data-step-text]')!;
 const error=form.querySelector<HTMLElement>('[data-wizard-error]')!;
 let active=0;
 const render=()=>{steps.forEach((node,i)=>node.hidden=i!==active);prev.hidden=active===0;next.hidden=active===steps.length-1;submit.hidden=active!==steps.length-1;progress.style.width=`${(active+1)/steps.length*100}%`;number.textContent=`0${active+1} / 0${steps.length}`;error.textContent='';};
 next.addEventListener('click',()=>{
   const fields=[...steps[active].querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>('input,select,textarea')].filter(e=>e.type!=='hidden');
   const invalid=fields.find(field=>!field.checkValidity());
   if(invalid){error.textContent='Complete the required fields to continue.';invalid.reportValidity();track('form_error',{form_id:form.id,step:active+1});return;}
   if(active<steps.length-1){active++;render();steps[active].querySelector<HTMLElement>('legend')?.setAttribute('tabindex','-1');steps[active].querySelector<HTMLElement>('legend')?.focus();}
 });
 prev.addEventListener('click',()=>{active=Math.max(0,active-1);render();});
 render();
}
