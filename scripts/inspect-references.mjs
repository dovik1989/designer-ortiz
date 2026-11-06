import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const report = [];
try {
for (const [label,url] of [['evopixel','https://evopixel.com.br/'],['adr','https://adr.ia.br/']]) {
 for (const viewport of [{width:1440,height:900},{width:1920,height:1080},{width:390,height:844}]) {
  const page = await browser.newPage({viewport, deviceScaleFactor:1});
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  try {
   await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
   await page.waitForTimeout(6000);
   await page.screenshot({path:`artifacts/references/${label}-${viewport.width}-top.png`});
   const metrics=await page.evaluate(()=>{
    const rect=(e)=>{ const b=e.getBoundingClientRect(),s=getComputedStyle(e); return {tag:e.tagName,id:e.id,class:e.className?.toString().slice(0,150),text:e.textContent.trim().replace(/\s+/g,' ').slice(0,150),x:Math.round(b.x),y:Math.round(b.y+scrollY),width:Math.round(b.width),height:Math.round(b.height),font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,padding:s.padding,gap:s.gap,maxWidth:s.maxWidth,position:s.position}; };
    return {title:document.title,viewport:{width:innerWidth,height:innerHeight},scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,headers:[...document.querySelectorAll('header')].map(rect),sections:[...document.querySelectorAll('main>*,section,footer')].map(rect).filter(e=>e.height>30),headings:[...document.querySelectorAll('h1,h2,h3')].map(rect).filter(e=>e.width>0),buttons:[...document.querySelectorAll('button,a')].slice(0,16).map(rect),animations:[...document.getAnimations()].map(a=>({name:a.animationName,state:a.playState,timing:a.effect.getTiming()})).slice(0,10)};
   });
   for(let fold=1;fold<=4;fold++){ await page.evaluate(y=>scrollTo(0,y),fold*viewport.height); await page.waitForTimeout(800); await page.screenshot({path:`artifacts/references/${label}-${viewport.width}-fold-${fold+1}.png`}); }
   await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight)); await page.waitForTimeout(1200);
   await page.screenshot({path:`artifacts/references/${label}-${viewport.width}-footer.png`});
   report.push({label,url,metrics,errors}); console.log(label,viewport.width,'OK',metrics.scrollHeight);
  } catch(e){report.push({label,url,viewport,error:e.message});console.log(label,viewport.width,e.message);}
  await page.close();
 }
}
} finally {await fs.writeFile('artifacts/references/measurements.json',JSON.stringify(report,null,2));await browser.close();}
