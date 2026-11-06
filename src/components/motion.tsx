'use client';
import { useEffect, useRef } from 'react';

export function Motion({children}:{children:React.ReactNode}) {
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let disposed=false;
  let cleanup:undefined|(()=>void);
  async function start(){
   const [{gsap},{ScrollTrigger}]=await Promise.all([import('gsap'),import('gsap/ScrollTrigger')]);
   if(disposed||!root.current)return;
   gsap.registerPlugin(ScrollTrigger);
   const mm=gsap.matchMedia();
   mm.add('(prefers-reduced-motion: no-preference)',()=>{
    const scope=root.current!;
    if(window.scrollY<80){
     gsap.fromTo(scope.querySelectorAll('.hero-line > span'),{yPercent:105,opacity:.3},{yPercent:0,opacity:1,duration:1.15,stagger:.1,ease:'power4.out',clearProps:'all'});
     gsap.fromTo(scope.querySelectorAll('.hero-description, .hero-actions'),{y:18,opacity:0},{y:0,opacity:1,duration:.8,stagger:.12,delay:.4,ease:'power3.out',clearProps:'all'});
     gsap.fromTo(scope.querySelector('.hero-art'),{scale:.93,opacity:0},{scale:1,opacity:1,duration:1.4,ease:'power3.out',clearProps:'all'});
    }
    scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el=>{
     gsap.fromTo(el,{y:28,opacity:0},{y:0,opacity:1,duration:.85,ease:'power3.out',clearProps:'all',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
    });
    gsap.to(scope.querySelector('.hero-art-inner'),{y:90,rotation:5,ease:'none',scrollTrigger:{trigger:scope.querySelector('.hero'),start:'top top',end:'bottom top',scrub:1}});
    gsap.fromTo(scope.querySelector('.manifesto-rule'),{scaleX:0},{scaleX:1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'.manifesto',start:'top 75%',once:true}});
   });
   let disposeLenis=()=>{};
   const desktop=window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
   const enableScroll=async()=>{
    disposeLenis();disposeLenis=()=>{};
    if(!desktop.matches||disposed)return;
    const {default:Lenis}=await import('lenis');
    if(disposed||!desktop.matches)return;
    const lenis=new Lenis({duration:1.05,smoothWheel:true,anchors:{offset:-96},syncTouch:false});
    const update=()=>ScrollTrigger.update();
    const tick=(time:number)=>lenis.raf(time*1000);
    lenis.on('scroll',update);gsap.ticker.add(tick);
    disposeLenis=()=>{gsap.ticker.remove(tick);lenis.off('scroll',update);lenis.destroy();};
   };
   void enableScroll();desktop.addEventListener('change',enableScroll);
   cleanup=()=>{desktop.removeEventListener('change',enableScroll);disposeLenis();mm.revert();};
   document.fonts.ready.then(()=>{if(!disposed)ScrollTrigger.refresh();});
  }
  void start();
  return()=>{disposed=true;cleanup?.();};
 },[]);
 return <div ref={root}>{children}</div>;
}
