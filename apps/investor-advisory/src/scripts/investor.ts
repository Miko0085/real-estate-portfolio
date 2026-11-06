import { calculateIllustrativeYield } from '@estate/utils/investment';
import { track } from '@estate/analytics';

type Market = 'dubai'|'lisbon'|'london';
type Delivery = 'ready'|'offplan';
type Goal = 'income'|'growth'|'diversify'|'personal';
type ConceptHome = {
  market: Market;
  stage: Delivery;
  priceUSD: number;
  title: string;
  kind: string;
  objectives: Goal[];
  question: string;
  image: string;
};

/** Fictional example planning envelopes, not sale listings or market observations. */
const concepts: ConceptHome[] = [
  {market:'dubai',stage:'ready',priceUSD:260000,title:'Compact urban apartment',kind:'Apartment concept',objectives:['income','diversify'],question:'Ask about service charges, vacancy and local ownership fees.',image:'market-dubai.webp'},
  {market:'dubai',stage:'ready',priceUSD:480000,title:'Two-bedroom city residence',kind:'Residential concept',objectives:['income','personal'],question:'Compare gross rent with management and maintenance obligations.',image:'market-dubai.webp'},
  {market:'dubai',stage:'offplan',priceUSD:730000,title:'Coastal new-build residence',kind:'Development concept',objectives:['growth','diversify'],question:'Check developer registration, escrow arrangements and delivery risk.',image:'market-dubai.webp'},
  {market:'dubai',stage:'ready',priceUSD:1250000,title:'Large waterfront residence',kind:'Lifestyle concept',objectives:['personal','diversify'],question:'Factor in ongoing charges, financing and resale liquidity.',image:'market-dubai.webp'},
  {market:'lisbon',stage:'ready',priceUSD:260000,title:'Neighbourhood apartment',kind:'Apartment concept',objectives:['income','personal'],question:'Review building condition, transaction fees and local rental rules.',image:'market-lisbon.webp'},
  {market:'lisbon',stage:'ready',priceUSD:450000,title:'Garden-view city home',kind:'Residential concept',objectives:['personal','diversify'],question:'Model repair costs and long-term maintenance reserves.',image:'market-lisbon.webp'},
  {market:'lisbon',stage:'offplan',priceUSD:760000,title:'Contemporary new-build home',kind:'Development concept',objectives:['growth','diversify'],question:'Verify approvals, expected delivery and all buyer protections.',image:'market-lisbon.webp'},
  {market:'lisbon',stage:'ready',priceUSD:1320000,title:'Restored character residence',kind:'Lifestyle concept',objectives:['personal','diversify'],question:'Review renovation standards, upkeep and exit considerations.',image:'market-lisbon.webp'},
  {market:'london',stage:'ready',priceUSD:490000,title:'Compact metropolitan flat',kind:'Urban apartment concept',objectives:['income','diversify'],question:'Include stamp duty, ground-rent and service-charge considerations.',image:'market-london.webp'},
  {market:'london',stage:'ready',priceUSD:890000,title:'Central two-bedroom apartment',kind:'Residential concept',objectives:['income','personal'],question:'Check the lease, ongoing charges, taxes and financing terms.',image:'market-london.webp'},
  {market:'london',stage:'ready',priceUSD:1510000,title:'London townhouse study',kind:'Lifestyle concept',objectives:['personal','diversify'],question:'Review acquisition costs, property condition and liquidity.',image:'market-london.webp'},
  {market:'london',stage:'offplan',priceUSD:1700000,title:'New-build city residence',kind:'Development concept',objectives:['growth','diversify'],question:'Verify the actual developer, completion terms and warranty arrangements.',image:'market-london.webp'}
];

const quiz=document.querySelector<HTMLElement>('[data-quiz]');
if(quiz){
  const steps=[...quiz.querySelectorAll<HTMLFieldSetElement>('[data-quiz-step]')];
  const next=quiz.querySelector<HTMLButtonElement>('[data-next]');
  const back=quiz.querySelector<HTMLButtonElement>('[data-back]');
  const error=quiz.querySelector<HTMLElement>('[data-quiz-error]');
  const result=quiz.querySelector<HTMLElement>('[data-quiz-results]');
  const pct=quiz.querySelector<HTMLElement>('[data-percent]');
  const progress=quiz.querySelector<HTMLElement>('[data-progress-bar]');
  const progressTrack=quiz.querySelector<HTMLElement>('[data-progress-track]');
  const label=quiz.querySelector<HTMLElement>('[data-progress-label]');
  const summary=quiz.querySelector<HTMLElement>('[data-brief-summary]');
  const examples=quiz.querySelector<HTMLElement>('[data-example-options]');
  const noMatches=quiz.querySelector<HTMLElement>('[data-no-matches]');
  const imagesBase=quiz.dataset.assets || '';
  const form=quiz.querySelector<HTMLFormElement>('form');
  let step=0;
  let showingResults=false;
  let completed=false;

  const values=()=>Object.fromEntries([...new FormData(form || undefined).entries()].map(([k,v])=>[k,String(v)]));
  const value=(name:string)=>form?.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value || '';
  const marketNames:Record<string,string>={dubai:'Dubai',lisbon:'Lisbon',london:'London',open:'several markets'};
  const goalNames:Record<string,string>={income:'rental income',growth:'long-term growth',diversify:'diversification',personal:'personal use'};
  const budgetNames:Record<string,string>={'under-300k':'under $300,000','300-600k':'$300,000–$600,000','600k-1m':'$600,000–$1 million','over-1m':'above $1 million'};
  const acceptedBudget=(budget:string,price:number)=>{
    if(budget==='under-300k')return price<300000;
    if(budget==='300-600k')return price>=300000 && price<=600000;
    if(budget==='600k-1m')return price>600000 && price<=1000000;
    if(budget==='over-1m')return price>1000000;
    return false;
  };
  const selectRadio=(name:string,val:string)=>{
    const chosen=[...form?.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`) || []].find(el=>el.value===val);
    if(chosen)chosen.checked=true;
  };
  document.querySelectorAll<HTMLAnchorElement>('[data-prefill-market]').forEach(el=>el.addEventListener('click',()=>{
    selectRadio('market',el.dataset.prefillMarket||'open');
  }));
  const update=()=>{
    steps.forEach((panel,i)=>panel.hidden=i!==step);
    showingResults=false;
    if(result)result.hidden=true;
    if(next){next.hidden=false;next.innerHTML=step===6?'View sample directions <span aria-hidden="true">↗</span>':'Continue <span aria-hidden="true">→</span>';}
    if(back)back.hidden=step===0;
    const percent=Math.round((step+1)/steps.length*100);
    if(pct)pct.textContent=`${percent}%`;
    if(progress)progress.style.width=`${percent}%`;
    if(progressTrack)progressTrack.setAttribute('aria-valuenow',String(percent));
    if(label)label.textContent=`${String(step+1).padStart(2,'0')} / 07`;
    if(error)error.textContent='';
  };
  const makeElement=(name:string,text:string,className?:string)=>{
    const el=document.createElement(name);el.textContent=text;
    if(className)el.className=className;
    return el;
  };
  const renderResults=()=>{
    if(!result || !examples || !summary || !noMatches)return;
    const answers=values();
    const market=answers.market || 'open';
    const goal=answers.objective || 'personal';
    const stage=answers.status || 'both';
    const budget=answers.budget || '';
    const timeline=answers.timeline || 'research';
    const financing=answers.financing || 'unknown';
    const matches=concepts.filter(h=>
      acceptedBudget(budget,h.priceUSD) &&
      (market==='open' || h.market===market) &&
      (stage==='both' || h.stage===stage)
    ).sort((a,b)=>{
      const score=(h:ConceptHome)=> (h.objectives.includes(goal as Goal)?6:0) +
        (timeline==='now' && h.stage==='ready'?2:0)+
        (timeline==='later' && h.stage==='offplan'?1:0)+
        (market==='open' && h.market==='dubai'?1:0);
      return score(b)-score(a) || a.priceUSD-b.priceUSD;
    });
    // In open-market mode, avoid filling the examples with only one location.
    const selected:ConceptHome[]=[];
    for(const m of matches){
      if(market==='open' && selected.some(other=>other.market===m.market))continue;
      selected.push(m);
      if(selected.length===3)break;
    }
    if(market!=='open')selected.splice(3);
    if(market==='open' && selected.length<3){for(const m of matches){if(selected.includes(m))continue;selected.push(m);if(selected.length===3)break;}}
    summary.textContent=`Planning budget ${budgetNames[budget]||'not specified'}, focusing on ${goalNames[goal]||'your priorities'} in ${marketNames[market]||'your selected market'}. These fictional examples are filtered by your budget and preferred property stage; no investment suitability is certified.`;
    examples.replaceChildren();
    noMatches.hidden=selected.length!==0;
    if(!selected.length)noMatches.textContent='No fictional example in this demonstration matches all three constraints (market, budget and ready/off-plan). Please go Back to revise your budget, market or delivery preference. We will not invent a matching property.';
    const fmt=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
    for(const entry of selected){
      const article=document.createElement('article');article.className='nl-result-card';
      const picture=document.createElement('img');picture.src=imagesBase+entry.image;picture.loading='lazy';picture.width=836;picture.height=470;picture.alt=`Fictional editorial image for ${marketNames[entry.market]}; not an available property`;
      const body=document.createElement('div');body.className='nl-result-copy';
      body.append(
        makeElement('span',`${marketNames[entry.market]} / ${entry.stage==='ready'?'Ready / resale':'New-build / off-plan'}`,'nl-result-overline'),
        makeElement('h4',entry.title),
        makeElement('p',`${entry.kind} · ${fmt.format(entry.priceUSD)} sample planning envelope`,'nl-result-price'),
        makeElement('p',entry.question,'nl-result-rationale')
      );
      article.append(picture,body);examples.append(article);
    }
    const caveat=financing==='loan'||financing==='mixed'?' Actual financing eligibility, interest rates and lender rules must be checked independently.':'';
    if(caveat)summary.textContent+=caveat;
    result.hidden=false;
    showingResults=true;
    if(next)next.hidden=true;
    if(back)back.hidden=false;
    if(!completed){track('quiz_complete',{quiz_id:'investor_brief',market,objective:goal,budget,results:selected.length});completed=true;}
    result.focus({preventScroll:true});
    result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
  };
  next?.addEventListener('click',()=>{
    if(step<6){
      const chosen=steps[step]?.querySelector<HTMLInputElement>('input[type="radio"]:checked');
      if(!chosen){
        if(error)error.textContent='Select an answer to continue.';
        steps[step]?.querySelector<HTMLInputElement>('input[type="radio"]')?.focus();
        track('form_error',{form_id:'investor_brief',step:step+1});
        return;
      }
      step++;update();steps[step]?.querySelector<HTMLElement>('legend')?.focus();
      return;
    }
    renderResults();
  });
  back?.addEventListener('click',()=>{
    if(showingResults){showingResults=false;update();steps[6]?.querySelector<HTMLElement>('legend')?.focus();return;}
    step=Math.max(0,step-1);update();steps[step]?.querySelector<HTMLElement>('legend')?.focus();
  });
  update();
}

const calcFields=[...document.querySelectorAll<HTMLInputElement>('[data-calc]')];
if(calcFields.length){
  const get=(name:string)=>{
    const raw=Number(document.querySelector<HTMLInputElement>(`[data-calc="${name}"]`)?.value ?? 0);
    return Number.isFinite(raw)?Math.max(0,raw):0;
  };
  const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  const calculate=()=>{
    const price=get('price'),rent=get('rent'),service=get('service'),management=get('management');
    const occupancy=Math.min(100,get('occupancy'));
    const result=calculateIllustrativeYield({price,rent,service,management,occupancy});
    const set=(id:string,text:string)=>{const el=document.getElementById(id);if(el)el.textContent=text;};
    set('occupancy-value',`${occupancy}%`);
    set('gross-yield',result.grossYield===null?'—':`${result.grossYield.toFixed(2)}%`);
    set('net-yield',result.netYield===null?'—':`${result.netYield.toFixed(2)}%`);
    set('net-income',money.format(result.netIncome));
  };
  calcFields.forEach(el=>el.addEventListener('input',calculate));
  calculate();
}