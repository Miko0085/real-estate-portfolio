import { calculateIllustrativeYield } from '@estate/utils/investment';
import { track } from '@estate/analytics';
const quiz=document.querySelector<HTMLElement>('[data-quiz]');
if(quiz){
  const steps=[...quiz.querySelectorAll<HTMLFieldSetElement>('[data-quiz-step]')];
  const next=quiz.querySelector<HTMLButtonElement>('[data-next]')!;
  const back=quiz.querySelector<HTMLButtonElement>('[data-back]')!;
  const error=quiz.querySelector<HTMLElement>('[data-quiz-error]')!;
  const result=quiz.querySelector<HTMLElement>('[data-quiz-results]')!;
  const pct=quiz.querySelector<HTMLElement>('[data-percent]')!;
  const progress=quiz.querySelector<HTMLElement>('[data-progress-bar]')!;
  const label=quiz.querySelector<HTMLElement>('[data-progress-label]')!;
  const data: Record<string,string>={};
  let step=0;
  const update=()=>{
    steps.forEach((panel,i)=>panel.hidden=i!==step);
    next.hidden=false;back.hidden=step===0;result.hidden=true;
    const n=Math.round((step+1)/steps.length*100);
    pct.textContent=`${n}%`;progress.style.width=`${n}%`;label.textContent=`${String(step+1).padStart(2,'0')} / 07`;
    error.textContent='';
  };
  next.addEventListener('click',()=>{
    const radio=steps[step].querySelector<HTMLInputElement>('input[type="radio"]:checked');
    if(step<6 && !radio){error.textContent='Select an option to continue.';return;}
    if(radio)data[radio.name]=radio.value;
    if(step<6){step++;update();steps[step].querySelector<HTMLElement>('legend')?.focus();return;}
    // Keep the contact and consent controls visible alongside results so native validation can focus them.\n    next.hidden=true;back.hidden=false;error.textContent='';result.hidden=false;
    const market=data.market==='open'?'several markets':({dubai:'Dubai',lisbon:'Lisbon',london:'London'}[data.market]||'selected market');
    const objective=({income:'income-focused',growth:'growth-oriented',diversify:'diversification',personal:'personal-use'}[data.objective]||'balanced');
    const summary=quiz.querySelector<HTMLElement>('[data-brief-summary]')!;
    summary.textContent=`Your ${objective} brief considers ${market}. Explore these fictional profiles and independently verify local rules and costs.`;
    const examples=quiz.querySelector<HTMLElement>('[data-example-options]')!;
    const profiles=[['Income-oriented apartment','Ready / illustrative','Consider net cash flow, vacancy and management costs'],['Long-horizon residence','New-build / illustrative','Consider delivery risk and payment timing'],['Flexible capital allocation','Multi-market / illustrative','Consider liquidity, taxes and currency exposure']];
    examples.replaceChildren(...profiles.map(([title,status,copy])=>{
      const article=document.createElement('article');article.className='option-card';
      const h=document.createElement('h4');h.textContent=title;
      const s=document.createElement('span');s.textContent=status;
      const p=document.createElement('p');p.textContent=copy;
      article.append(s,h,p);return article;
    }));
    track('quiz_complete',{quiz_id:'investor_brief',market:data.market||'open',objective:data.objective||'unknown'});
  });
  back.addEventListener('click',()=>{step=Math.max(0,step-1);update();});
  update();
}
const fields=[...document.querySelectorAll<HTMLInputElement>('[data-calc]')];
if(fields.length){
  const get=(name:string)=>{
    const raw=Number(document.querySelector<HTMLInputElement>(`[data-calc="${name}"]`)?.value??0);
    return Number.isFinite(raw)?Math.max(0,raw):0;
  };
  const format=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  const calc=()=>{
    const price=get('price'), rent=get('rent'), service=get('service'), management=get('management');
    const occupancy=Math.min(100,get('occupancy'));
    const result=calculateIllustrativeYield({price,rent,service,management,occupancy});
    document.querySelector<HTMLElement>('#occupancy-value')!.textContent=`${occupancy}%`;
    document.querySelector<HTMLElement>('#gross-yield')!.textContent=result.grossYield===null?'—':`${result.grossYield.toFixed(2)}%`;
    document.querySelector<HTMLElement>('#net-yield')!.textContent=result.netYield===null?'—':`${result.netYield.toFixed(2)}%`;
    document.querySelector<HTMLElement>('#net-income')!.textContent=format.format(result.netIncome);
  };
  fields.forEach(el=>el.addEventListener('input',calc));calc();
}
