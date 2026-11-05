/** Progressive enhancement for fictional demonstration enquiry forms. */
import { readAttribution, track } from '@estate/analytics';
import { submitLead } from './index';

export function initializePortfolioForms(): void {
  if (typeof document === 'undefined') return;
  readAttribution();
  track('page_view', { path: location.pathname });
  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const item = target.closest<HTMLElement>('[data-track]');
    const name = item?.dataset.track;
    const allowed=['view_property','view_development','view_floor_plan','download_brochure','click_whatsapp','click_phone','start_form'] as const;
    if (name && allowed.some(x=>x===name)) track(name as typeof allowed[number],{page:location.pathname});
  });
  document.querySelectorAll<HTMLFormElement>('form[data-capture-form]').forEach(form => {
    const feedback=form.querySelector<HTMLElement>('[data-feedback]');
    const button=form.querySelector<HTMLButtonElement>('[type="submit"]');
    const endpoint=form.dataset.endpoint?.trim() ?? '';
    if(!feedback||!button) return;
    let busy=false, started=false;
    form.addEventListener('focusin',event=>{
      const t=event.target;
      if(!started && t instanceof HTMLElement && t.getAttribute('name')!=='website'){
        started=true;
        track('start_form',{form_id:form.id || 'enquiry'});
      }
    });
    form.addEventListener('submit', async event=>{
      event.preventDefault();
      if(busy) return;
      feedback.textContent='';
      feedback.dataset.state='';
      if(!form.reportValidity()){
        feedback.textContent='Please check the highlighted fields.';
        feedback.dataset.state='error';
        track('form_error',{form_id:form.id||'enquiry'});
        return;
      }
      const data=new FormData(form);
      if(data.get('website')){ feedback.textContent='Unable to process this request.'; feedback.dataset.state='error'; return; }
      if(data.get('consent')!=='on'){
        feedback.textContent='Please review and accept the privacy notice.';
        feedback.dataset.state='error';
        return;
      }
      if(!endpoint){
        feedback.textContent='Demo validated. No details were transmitted or stored.';
        feedback.dataset.state='info';
        return;
      }
      busy=true;button.disabled=true;
      const previous=button.textContent;
      button.textContent='Sending…';
      feedback.textContent='Sending your enquiry…';
      const controller=new AbortController();
      const timeout=window.setTimeout(()=>controller.abort(),12000);
      try{
        const fields=Object.fromEntries([...data.entries()].filter(([key])=>key!=='website').map(([key,value])=>[key,String(value)]));
        const response=await submitLead({...fields,attribution:readAttribution(),form_id:form.id,submitted_at:new Date().toISOString()},endpoint,controller.signal);
        feedback.textContent=response.message;
        feedback.dataset.state=response.ok?'success':'error';
        if(response.ok){track('generate_lead',{form_id:form.id||'enquiry'});form.reset();}
      }catch{feedback.textContent='A connection problem occurred. Please try again.';feedback.dataset.state='error';}
      finally{window.clearTimeout(timeout);button.disabled=false;button.textContent=previous;busy=false;}
    });
  });
}
initializePortfolioForms();
