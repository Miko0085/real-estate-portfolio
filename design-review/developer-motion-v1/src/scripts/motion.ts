/** Isolated design-review motion controller; uses GSAP for every timeline and ScrollTrigger pin. */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Chapter = {step:string;title:string;text:string};
const chapters = JSON.parse(document.getElementById('motion-chapters')?.textContent || '[]') as Chapter[];
const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.querySelector<HTMLVideoElement>('[data-hero-video]');
const scrubVideo = document.querySelector<HTMLVideoElement>('[data-scrub-video]');
const motionButton = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const motionLabel = document.querySelector<HTMLElement>('[data-motion-label]');
const shadowButton = document.querySelector<HTMLButtonElement>('[data-shadow-toggle]');
const shadowLabel = document.querySelector<HTMLElement>('[data-shadow-label]');
const progressFill = document.querySelector<HTMLElement>('[data-progress-fill]');
const progressLabel = document.querySelector<HTMLElement>('[data-progress-percent]');
const chapterTitle = document.querySelector<HTMLElement>('[data-chapter-title]');
const chapterText = document.querySelector<HTMLElement>('[data-chapter-description]');
const chapterIndex = document.querySelector<HTMLElement>('[data-chapter-index]');
const header = document.querySelector<HTMLElement>('[data-header]');

let motionOn = !reduceQuery.matches;
let shadowsOn = !reduceQuery.matches;
let shadowTween:gsap.core.Tween | null = null;
let heroShadowTween:gsap.core.Tween | null = null;
let revealTriggers:ScrollTrigger[] = [];
let scrubTimeline:gsap.core.Timeline | null = null;
let scrubTrigger:ScrollTrigger | null = null;
let currentChapter = -1;
let filmProgress = 0;
let pendingSeek = 0;
const videoState = {time:0};

const updateHeader = () => { header?.classList.toggle('is-scrolled', window.scrollY > 40); };
window.addEventListener('scroll', updateHeader, {passive:true});updateHeader();

function updateButtons(){
  if(motionButton){motionButton.disabled=reduceQuery.matches;motionButton.setAttribute('aria-pressed',String(motionOn));motionButton.setAttribute('aria-label',reduceQuery.matches?'Reduced-motion preference is enabled':motionOn?'Pause moving film and shadows':'Resume moving film and shadows');}
  if(motionLabel) motionLabel.textContent = reduceQuery.matches?'Reduced motion enabled':motionOn?'Pause motion':'Resume motion';
  if(shadowButton){shadowButton.disabled=reduceQuery.matches;shadowButton.setAttribute('aria-pressed',String(shadowsOn));}
  if(shadowLabel) shadowLabel.textContent = reduceQuery.matches?'Reduced motion enabled':shadowsOn?'Pause shadow study':'Resume shadow study';
}
function chapterAt(progress:number){return progress<.34?0:progress<.67?1:2;}
function updateChapter(progress:number){
 const clamped=Math.max(0,Math.min(1,progress));
 filmProgress=clamped;
 if(progressFill)progressFill.style.width=`${(clamped*100).toFixed(1)}%`;
 if(progressLabel)progressLabel.textContent=`${Math.round(clamped*100)}%`;
 const index=chapterAt(clamped);
 if(index===currentChapter)return;
 currentChapter=index;const c=chapters[index];if(!c)return;
 if(chapterIndex)chapterIndex.textContent=`${c.step} / 03`;
 if(chapterTitle)chapterTitle.textContent=c.title;
 if(chapterText)chapterText.textContent=c.text;
}
function seekScrub(t:number){
 if(!scrubVideo||!motionOn||!Number.isFinite(scrubVideo.duration)||scrubVideo.duration<=0)return;
 const target=Math.max(0,Math.min(scrubVideo.duration-0.04,t));
 pendingSeek=target;
 // Respect decoder backpressure; seeked applies the newest target, even after a rapid jump.
 if(Math.abs(scrubVideo.currentTime-target)>.065 && !scrubVideo.seeking){try{scrubVideo.currentTime=target;}catch{}}
}
scrubVideo?.addEventListener('seeked',()=>{
 if(scrubVideo && !scrubVideo.seeking && Math.abs(scrubVideo.currentTime-pendingSeek)>.15) seekScrub(pendingSeek);
});
function playHero(){
 if(!heroVideo || !motionOn || reduceQuery.matches)return;
 const tryPlay=heroVideo.play();tryPlay?.catch(()=>{/* Poster remains the fallback. */});
}
function stopTweens(){
 shadowTween?.kill();shadowTween=null;heroShadowTween?.kill();heroShadowTween=null;
 gsap.set('.shadow-light-group',{clearProps:'x,y,rotation'});
 gsap.set('.shadow-branch',{clearProps:'x,y,rotation'});
}
function startShadows(){
 stopTweens();
 if(!motionOn || !shadowsOn || reduceQuery.matches)return;
 shadowTween=gsap.to('.shadow-light-group',{x:42,y:27,rotation:4,transformOrigin:'25% 0%',duration:8.7,repeat:-1,yoyo:true,ease:'sine.inOut'});
 heroShadowTween=gsap.to('.shadow-branch',{x:36,y:14,rotation:3,transformOrigin:'35% 0%',duration:10.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
}
function applyMotionState(){
 if(reduceQuery.matches)motionOn=false;
 if(motionOn){playHero();seekScrub(videoState.time);startShadows();}
 else{heroVideo?.pause();stopTweens();}
 updateButtons();
}
motionButton?.addEventListener('click',()=>{if(reduceQuery.matches)return;motionOn=!motionOn;shadowsOn=motionOn;applyMotionState();});
shadowButton?.addEventListener('click',()=>{if(reduceQuery.matches)return;shadowsOn=!shadowsOn;startShadows();updateButtons();});

heroVideo?.addEventListener('loadeddata',()=>heroVideo.classList.add('is-ready'));
heroVideo?.addEventListener('canplay',()=>heroVideo.classList.add('is-ready'));
heroVideo?.addEventListener('error',()=>heroVideo.classList.remove('is-ready'));
if(heroVideo && heroVideo.readyState>=2)heroVideo.classList.add('is-ready');

function setupReveals(){
 if(reduceQuery.matches)return;
 gsap.from('[data-title-line]',{yPercent:105,opacity:0,duration:1.3,stagger:.13,ease:'power3.out',delay:.16});
 gsap.from('[data-reveal-hero]',{y:22,opacity:0,duration:.95,stagger:.18,ease:'power2.out',delay:.7});
 document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el=>{
   const tween=gsap.fromTo(el,{opacity:0,y:40},{opacity:1,y:0,duration:1.15,ease:'power2.out',paused:true});
   const st=ScrollTrigger.create({trigger:el,start:'top 94%',once:true,onEnter:()=>tween.play(),onLeaveBack:()=>tween.progress(1)});
   revealTriggers.push(st);
 });
}

function setupFilm(){
 if(!scrubVideo)return;
 const duration=scrubVideo.duration;
 if(!Number.isFinite(duration)||duration<=0){
   document.querySelector<HTMLElement>('[data-film-fallback]')?.removeAttribute('hidden');
   return;
 }
 scrubVideo.pause();
 scrubVideo.classList.add('is-ready');
 if(reduceQuery.matches){updateChapter(.5);return;}
 const stage = document.querySelector<HTMLElement>('[data-film-pin]');
 const scene = document.querySelector<HTMLElement>('#film');
 if(!stage || !scene)return;
 scrubTimeline?.kill();scrubTrigger?.kill();
 videoState.time=0;
 scrubTimeline=gsap.timeline({paused:true});
 scrubTimeline.to(videoState,{time:Math.max(0,duration-.12),duration:1,ease:'none',onUpdate:()=>seekScrub(videoState.time)});
 scrubTrigger=ScrollTrigger.create({
   trigger:scene,
   start:'top top',
   end:()=>`+=${Math.max(900,Math.round(window.innerHeight*(window.innerWidth<760?1.5:2.25)))}`,
   pin:stage,
   pinSpacing:true,
   scrub:.55,
   invalidateOnRefresh:true,
   animation:scrubTimeline,
   onUpdate:self=>updateChapter(self.progress),
   onRefresh:self=>updateChapter(self.progress)
 });
 updateChapter(0);
}
scrubVideo?.addEventListener('loadedmetadata',setupFilm,{once:true});
scrubVideo?.addEventListener('error',()=>{document.querySelector<HTMLElement>('[data-film-fallback]')?.removeAttribute('hidden');scrubVideo.classList.remove('is-ready');});
if(scrubVideo && scrubVideo.readyState>=1)setupFilm();

function onReducedMotionChange(){
 if(reduceQuery.matches){
  motionOn=false;shadowsOn=false;
  heroVideo?.pause();scrubVideo?.pause();stopTweens();
  scrubTrigger?.kill();scrubTrigger=null;scrubTimeline?.kill();scrubTimeline=null;
  revealTriggers.forEach(st=>st.kill());revealTriggers=[];
  gsap.set('[data-reveal],[data-reveal-hero],[data-title-line]',{clearProps:'all'});
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el=>{el.style.opacity='1';el.style.transform='none';});
  updateChapter(.5);
 } else {
  motionOn=true;shadowsOn=true;
  setupReveals();if(scrubVideo?.readyState)setupFilm();playHero();startShadows();
 }
 updateButtons();
}
reduceQuery.addEventListener('change',onReducedMotionChange);

// The initial reduced-motion render needs no GSAP animation, autoplay or pin.
if(reduceQuery.matches){
 heroVideo?.pause();scrubVideo?.pause();updateChapter(.5);
} else {setupReveals();playHero();startShadows();}
updateButtons();

// Expose read-only diagnostics to real end-to-end tests; not a global app API.
(window as typeof window & {__motionReviewQA?:()=>object}).__motionReviewQA=()=>({
  gsapVersion:gsap.version,
  scrollTriggerCount:ScrollTrigger.getAll().length,
  filmPinned:Boolean(scrubTrigger),
  filmProgress:Math.round(filmProgress*100),
  currentChapter:currentChapter+1,
  heroPlaying:Boolean(heroVideo && !heroVideo.paused),
  shadowsAnimating:Boolean(shadowTween?.isActive()),
  reducedMotion:reduceQuery.matches,
  motionOn
});