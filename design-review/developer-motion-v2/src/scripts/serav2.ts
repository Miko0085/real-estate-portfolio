import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Chapter={number:string;name:string;subtitle:string;eyebrow:string};
type GalleryItem={src:string;caption:string;label:string};
const getJSON=<T>(id:string):T[]=>{try{return JSON.parse(document.getElementById(id)?.textContent||'[]') as T[]}catch{return []}};
const chapters=getJSON<Chapter>('chapters-data');
const gallery=getJSON<GalleryItem>('gallery-data');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo=document.querySelector<HTMLVideoElement>('[data-hero-video]');
const video=document.querySelector<HTMLVideoElement>('[data-scroll-video]');
const btn=document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const btnLabel=document.querySelector<HTMLElement>('[data-motion-label]');
const header=document.querySelector<HTMLElement>('[data-header]');
const cinema=document.querySelector<HTMLElement>('[data-cinema]');
const stage=document.querySelector<HTMLElement>('[data-cinema-stage]');
const progress=document.querySelector<HTMLElement>('[data-cinema-progress]');
const title=document.querySelector<HTMLElement>('[data-chapter-title]');
const number=document.querySelector<HTMLElement>('[data-chapter-number]');
const subtitle=document.querySelector<HTMLElement>('[data-chapter-subtitle]');
const eyebrow=document.querySelector<HTMLElement>('[data-chapter-eyebrow]');
const galleryDialog=document.querySelector<HTMLDialogElement>('[data-gallery-dialog]');
const galleryImage=document.querySelector<HTMLImageElement>('[data-gallery-image]');
const galleryCaption=document.querySelector<HTMLElement>('[data-gallery-caption]');
const galleryCount=document.querySelector<HTMLElement>('[data-gallery-count]');

let motion=!reduce.matches;
let currentChapter=-1;
let filmDuration=0;
let filmProgress=0;
let pendingSeek=0;
let visualProgress=0;
let galleryIndex=0;
let seekRaf=0;
let timeline:ScrollTrigger|null=null;
const headerSync=()=>{header?.classList.toggle('is-scrolled',scrollY>30)};
addEventListener('scroll',headerSync,{passive:true});headerSync();

function setChapter(progressValue:number){
 const clamped=Math.max(0,Math.min(1,progressValue));
 filmProgress=clamped;
 if(progress)progress.style.width=`${Math.round(clamped*1000)/10}%`;
 const i=clamped<.36?0:clamped<.70?1:2;
 if(i===currentChapter)return;
 currentChapter=i;
 const c=chapters[i];if(!c)return;
 if(title) title.textContent=c.name;
 if(number) number.textContent=`${c.number} — 03`;
 if(subtitle)subtitle.textContent=c.subtitle;
 if(eyebrow)eyebrow.textContent=c.eyebrow;
 // avoid 200ms gaps in captions when scrolling quickly; the video remains uninterrupted.
 if(title && motion)gsap.fromTo(title,{opacity:.25,y:8},{opacity:1,y:0,duration:.45,ease:'power2.out',overwrite:true});
}

function doSeek(t:number){
 if(!video||!motion||reduce.matches||!Number.isFinite(video.duration)||video.duration<=0)return;
 pendingSeek=Math.max(0,Math.min(video.duration-.08,t));
 if(Math.abs(video.currentTime-pendingSeek)>.08&&!video.seeking){
  try{video.currentTime=pendingSeek}catch{/* Poster and chapter text remain available */}
 }
}
function queueSeek(t:number){
 pendingSeek=t;
 if(seekRaf)return;
 seekRaf=requestAnimationFrame(()=>{seekRaf=0;doSeek(pendingSeek)});
}
video?.addEventListener('seeked',()=>{if(video&&motion&&!video.seeking&&Math.abs(video.currentTime-pendingSeek)>.17)queueSeek(pendingSeek)});

function onScroll(value:number){
 visualProgress=value;
 setChapter(value);
 if(filmDuration>0&&motion)queueSeek(value*Math.max(.1,filmDuration-.08));
}
function prepareFilm(){
 if(!video)return;
 if(!Number.isFinite(video.duration)||video.duration<1)return;
 filmDuration=video.duration;
 video.pause();
 video.classList.add('is-ready');
 queueSeek(filmProgress*filmDuration);
}
video?.addEventListener('loadedmetadata',prepareFilm,{once:true});
if(video&&video.readyState>=1)prepareFilm();
video?.addEventListener('error',()=>video.classList.remove('is-ready'));
function startHero(){
 if(!heroVideo||!motion)return;
 heroVideo.play().catch(()=>{/* Poster remains; autoplay permission varies across browsers. */});
}
heroVideo?.addEventListener('loadeddata',()=>heroVideo.classList.add('is-ready'));
heroVideo?.addEventListener('error',()=>heroVideo.classList.remove('is-ready'));
if(heroVideo && heroVideo.readyState>=2)heroVideo.classList.add('is-ready');

function applyMotion(){
 if(reduce.matches)motion=false;
 if(motion){startHero();document.documentElement.classList.remove('is-paused');queueSeek(filmProgress*filmDuration)}
 else{heroVideo?.pause();video?.pause();document.documentElement.classList.add('is-paused')}
 if(btn){btn.setAttribute('aria-pressed',String(motion));btn.disabled=reduce.matches;btn.setAttribute('aria-label',reduce.matches?'Reduced motion preference is active':motion?'Pause ambient motion':'Resume ambient motion')}
 if(btnLabel)btnLabel.textContent=reduce.matches?'Reduced motion':motion?'Pause motion':'Play motion';
}
btn?.addEventListener('click',()=>{if(reduce.matches)return;motion=!motion;applyMotion()});

function setupAnimations(){
 if(reduce.matches){setChapter(0);return;}
 gsap.fromTo('[data-headline]',{opacity:0,yPercent:105},{opacity:1,yPercent:0,duration:1.55,stagger:.13,ease:'power3.out',delay:.18});
 gsap.fromTo('[data-intro]',{opacity:0,y:20},{opacity:1,y:0,duration:1.0,stagger:.18,ease:'power2.out',delay:.65});
 gsap.to('[data-hero] .hero-art',{scale:1.11,ease:'none',scrollTrigger:{trigger:'[data-hero]',start:'top top',end:'bottom top',scrub:1}});
 // This is an actual GSAP ScrollTrigger-pinned sequence (not CSS sticky or a fake bar animation).
 if(cinema&&stage){
  const desktop=matchMedia('(min-width: 701px)');
  timeline=ScrollTrigger.create({
    trigger:cinema,
    pin:desktop.matches?stage:false,
    start:desktop.matches?'top top':'top bottom',
    end:desktop.matches?'+=245%':'bottom top',
    scrub:.45,
    anticipatePin:1,
    invalidateOnRefresh:true,
    onUpdate:self=>onScroll(self.progress)
  });
 }
 const revealSelectors=['.statement h2','.statement-aside','.interlude-copy h2','.interlude-copy>p','.residence-heading','.residence-editorial','.epilogue-copy h2','.enquire-message h2'];
 for(const selector of revealSelectors){const el=document.querySelector(selector);if(el)gsap.fromTo(el,{opacity:0,y:50},{opacity:1,y:0,duration:1.1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}})}
 gsap.fromTo('.interlude-copy',{opacity:.6},{opacity:1,duration:1,ease:'none',scrollTrigger:{trigger:'.interlude',start:'top 80%',end:'top top',scrub:1}});
}
function resetMotion(){
 if(reduce.matches){timeline?.kill();timeline=null;gsap.killTweensOf('[data-hero] .hero-art');video?.pause();heroVideo?.pause();filmProgress=0;setChapter(0)}
 else if(!timeline)setupAnimations();
 applyMotion();
}
reduce.addEventListener('change',resetMotion);
setChapter(0);applyMotion();setupAnimations();

// The optional lightbox has genuine next/previous controls; all gallery media are concept art.
let returnFocus:HTMLElement|null=null;
function paintGallery(){
 const item=gallery[galleryIndex];if(!item)return;
 if(galleryImage){galleryImage.src=item.src;galleryImage.alt=`Original fictional architectural illustration: ${item.caption}`}
 if(galleryCaption)galleryCaption.textContent=item.caption;
 if(galleryCount)galleryCount.textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}`;
}
function showGallery(i:number,focus:HTMLElement){
 if(!galleryDialog||!gallery.length)return;
 returnFocus=focus;
 galleryIndex=Math.max(0,Math.min(gallery.length-1,i));
 paintGallery();galleryDialog.showModal();
 document.querySelector<HTMLButtonElement>('[data-gallery-close]')?.focus();
}
function stepGallery(dir:number){galleryIndex=(galleryIndex+dir+gallery.length)%gallery.length;paintGallery()}
document.querySelectorAll<HTMLElement>('[data-gallery-open]').forEach(el=>el.addEventListener('click',()=>showGallery(Number(el.dataset.galleryOpen||0),el)));
document.querySelector('[data-gallery-close]')?.addEventListener('click',()=>galleryDialog?.close());
document.querySelector('[data-gallery-prev]')?.addEventListener('click',()=>stepGallery(-1));
document.querySelector('[data-gallery-next]')?.addEventListener('click',()=>stepGallery(1));
galleryDialog?.addEventListener('close',()=>returnFocus?.focus());
galleryDialog?.addEventListener('click',ev=>{if(ev.target===galleryDialog)galleryDialog.close()});
galleryDialog?.addEventListener('keydown',ev=>{if(ev.key==='ArrowRight')stepGallery(1);if(ev.key==='ArrowLeft')stepGallery(-1)});

const form=document.querySelector<HTMLFormElement>('[data-demo-form]');
const status=document.querySelector<HTMLElement>('[data-form-status]');
form?.addEventListener('submit',ev=>{
 ev.preventDefault();
 if(!form.reportValidity())return;
 if(status)status.textContent='Demo validated. No information was sent or stored; this is not an enquiry to a real developer.';
});
for(const el of document.querySelectorAll<HTMLAnchorElement>('.mobile-navigation nav a'))el.addEventListener('click',()=>{const details=el.closest('details');if(details)details.open=false});