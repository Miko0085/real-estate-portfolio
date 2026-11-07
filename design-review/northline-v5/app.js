/* NORTHLINE V5.2: standalone visual prototype interactions; no network, no CRM and no analytics claims. */
(() => {
  'use strict';
  const baseAsset = '../../investor-advisory/assets/';
  const concepts = [
    ['dubai','ready',260000,'Compact city apartment','market-dubai.webp',['income','diversify']],
    ['dubai','ready',480000,'Waterfront residence study','opportunity-coast.webp',['income','personal']],
    ['dubai','offplan',730000,'Coastal new-build concept','opportunity-city.webp',['growth','diversify']],
    ['dubai','ready',1250000,'Large waterfront concept','market-dubai.webp',['personal','diversify']],
    ['lisbon','ready',260000,'Neighbourhood apartment','market-lisbon.webp',['income','personal']],
    ['lisbon','ready',450000,'Garden house study','opportunity-garden.webp',['personal','diversify']],
    ['lisbon','offplan',760000,'Lisbon contemporary concept','market-lisbon.webp',['growth','diversify']],
    ['lisbon','ready',1320000,'Restored character concept','opportunity-garden.webp',['personal','diversify']],
    ['london','ready',490000,'Metropolitan flat study','market-london.webp',['income','diversify']],
    ['london','ready',890000,'Urban residence concept','market-london.webp',['income','personal']],
    ['london','ready',1510000,'London townhouse study','market-london.webp',['personal','diversify']],
    ['london','offplan',1700000,'New-build city residence','market-london.webp',['growth','diversify']]
  ];
  const matchesBudget=(budget,price)=>budget==='under-300k'?price<300000:budget==='300-600k'?price>=300000&&price<=600000:budget==='600k-1m'?price>600000&&price<=1e6:budget==='over-1m'?price>1e6:false;
  const toCurrency=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);
  const header=document.querySelector('.header');
  window.addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',window.scrollY>45),{passive:true});
  const menu=document.querySelector('.menu-toggle');
  const mobile=document.querySelector('.mobile-nav');
  function setMenu(open){if(!mobile||!menu)return;mobile.hidden=!open;menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');}
  menu?.addEventListener('click',()=>setMenu(mobile?.hidden));
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  document.addEventListener('click',e=>{if(!header?.contains(e.target))setMenu(false)});
  const marketButtons=[...document.querySelectorAll('.market-picker [data-market]')];
  function toggleMarket(market){
    marketButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.market===market)));
    document.querySelectorAll('.region-card').forEach(el=>{el.hidden=market!=='open' && el.dataset.region!==market;});
    const grid=document.querySelector('.region-grid');
    if(grid)grid.style.gridTemplateColumns=market==='open'?'':'minmax(0, 1fr)';
  }
  marketButtons.forEach(b=>b.addEventListener('click',()=>toggleMarket(b.dataset.market)));
  toggleMarket('open');
  const scroller=document.querySelector('#dev-scroll');
  document.querySelector('#dev-next')?.addEventListener('click',()=>scroller?.scrollBy({left:Math.max(300,(scroller.clientWidth||600)*.58),behavior:'smooth'}));
  document.querySelector('#dev-prev')?.addEventListener('click',()=>scroller?.scrollBy({left:-Math.max(300,(scroller.clientWidth||600)*.58),behavior:'smooth'}));
  const calcNodes=[...document.querySelectorAll('[data-calc]')];
  const value=n=>{const input=document.querySelector(`[data-calc="${n}"]`);return input?Math.max(0,Number(input.value)||0):0};
  const setText=(id,text)=>{const el=document.getElementById(id);if(el)el.textContent=text};
  function calc(){
    if(!calcNodes.length)return;
    const price=value('price'),rent=value('rent'),service=value('service'),management=value('management'),occupancy=Math.min(100,value('occupancy'))/100;
    const gross=price>0?rent/price*100:0;
    const income=rent*occupancy-service-management;
    const net=price>0?income/price*100:0;
    setText('device-gross',gross.toFixed(2)+'%');setText('device-net',net.toFixed(2));setText('device-income',toCurrency(income));setText('occupancy-output',Math.round(occupancy*100)+'%');
  }
  calcNodes.forEach(x=>x.addEventListener('input',calc));calc();
  const quiz=document.querySelector('[data-quiz]');
  if(quiz){
    const steps=[...quiz.querySelectorAll('[data-quiz-step]')],next=quiz.querySelector('#quiz-next'),back=quiz.querySelector('#quiz-back'),results=quiz.querySelector('#quiz-results'),error=quiz.querySelector('#quiz-error'),stepLabel=quiz.querySelector('#quiz-step-label'),progress=quiz.querySelector('#quiz-progress');
    const form=quiz.querySelector('#brief-form');let step=0;
    const selected=n=>form?.querySelector(`input[name="${n}"]:checked`)?.value||'';
    const assign=(n,v)=>{const radio=[...form?.querySelectorAll(`input[name="${n}"]`)||[]].find(x=>x.value===v);if(radio)radio.checked=true};
    const refresh=()=>{
      steps.forEach((s,i)=>s.hidden=i!==step);
      if(results)results.hidden=true;
      if(next){next.hidden=false;next.innerHTML=step===6?'View sample directions <span>↗</span>':'Continue <span>↗</span>'}
      if(back)back.hidden=step===0;
      if(stepLabel)stepLabel.textContent=String(step+1).padStart(2,'0')+' / 07';
      if(progress)progress.style.width=Math.round((step+1)/7*100)+'%';
      if(error)error.textContent='';
    };
    function showResults(){
      const budget=selected('budget'),market=selected('market')||'open',stage=selected('status')||'both',goal=selected('objective')||'personal',timeline=selected('timeline')||'research';
      const matches=concepts.filter(c=>matchesBudget(budget,c[2])&&(market==='open'||c[0]===market)&&(stage==='both'||c[1]===stage));
      const ranked=matches.sort((a,b)=>{
        const score=c=>(c[5].includes(goal)?5:0)+(timeline==='now'&&c[1]==='ready'?3:0)+(timeline==='later'&&c[1]==='offplan'?2:0);
        return score(b)-score(a)||a[2]-b[2];
      });
      const chosen=[];
      for(const item of ranked){if(market==='open'&&chosen.some(v=>v[0]===item[0]))continue;chosen.push(item);if(chosen.length===3)break;}
      if(market!=='open')chosen.splice(3);
      steps.forEach(x=>x.hidden=true);if(next)next.hidden=true;if(back)back.hidden=true;if(results)results.hidden=false;
      const summary=quiz.querySelector('#quiz-results-summary');
      if(summary)summary.textContent=`Your ${market==='open'?'multi-market':market} brief and ${goal.replaceAll('-',' ')} objective produced ${chosen.length} fictional planning example${chosen.length===1?'':'s'}. No real properties are being offered.`;
      const container=quiz.querySelector('#quiz-matches');
      if(container){container.replaceChildren();if(!chosen.length){const p=document.createElement('p');p.textContent='No sample concept fits all selected constraints. Try another budget, destination or property stage.';container.append(p);}
        chosen.forEach(c=>{
          const row=document.createElement('article');row.className='match-card';
          const im=document.createElement('img');im.src=baseAsset+c[4];im.alt='Fictional sample property image';im.loading='lazy';
          const details=document.createElement('div');const title=document.createElement('strong');title.textContent=c[3];const sub=document.createElement('span');sub.textContent=`${c[0].toUpperCase()} · ${c[1].toUpperCase()} · ${toCurrency(c[2])} example`;const dis=document.createElement('small');dis.textContent='Illustrative concept, not available for purchase.';
          details.append(title,sub,dis);row.append(im,details);container.append(row);
        });
      }
      results?.focus({preventScroll:true});results?.scrollIntoView({block:'nearest',behavior:'smooth'});
    }
    next?.addEventListener('click',()=>{
      if(step<6&&!steps[step].querySelector('input:checked')){if(error)error.textContent='Choose an option to continue.';return;}
      if(step<6){step++;refresh();steps[step].querySelector('legend')?.focus?.();}
      else showResults();
    });
    back?.addEventListener('click',()=>{step=Math.max(0,step-1);refresh()});
    quiz.querySelector('#quiz-reset')?.addEventListener('click',()=>{step=0;refresh();quiz.querySelector('#quiz-progress')?.scrollIntoView({block:'center',behavior:'smooth'})});
    document.querySelector('#quick-search')?.addEventListener('submit',event=>{
      event.preventDefault();const f=event.currentTarget;assign('market',f.elements.market.value||'open');if(f.elements.budget.value)assign('budget',f.elements.budget.value);if(f.elements.objective.value)assign('objective',f.elements.objective.value);step=0;refresh();quiz.scrollIntoView({behavior:'smooth',block:'center'});
    });
    document.querySelectorAll('[data-prefill-market]').forEach(link=>link.addEventListener('click',()=>{assign('market',link.dataset.prefillMarket||'open');refresh();}));
    refresh();
  }
  const form=document.querySelector('#contact-demo');
  form?.addEventListener('submit',e=>{
    e.preventDefault();const feedback=document.querySelector('#contact-feedback');
    if(!form.checkValidity()){form.reportValidity();if(feedback)feedback.textContent='Complete the required fields and consent checkbox to review the demo.';return;}
    if(feedback)feedback.textContent='Visual demonstration only — your enquiry was NOT transmitted, stored or emailed. No endpoint is connected.';
  });
})();