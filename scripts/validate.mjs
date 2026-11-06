import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const origin=process.env.TEST_URL||'http://localhost:3001';
await fs.mkdir('artifacts/validation',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={date:'2026-11-05',origin,viewports:[],interactions:[],routes:[],errors:[]};
const errors=[];
try {
 for(const viewport of [{width:1440,height:900},{width:1920,height:1080},{width:390,height:844},{width:768,height:1024},{width:320,height:800}]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'}); const page=await context.newPage();
  page.on('pageerror',error=>errors.push({width:viewport.width,message:error.message}));
  const response=await page.goto(origin,{waitUntil:'networkidle'}); assert.equal(response.status(),200);
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>({
   viewport:{width:innerWidth,height:innerHeight},scrollWidth:document.documentElement.scrollWidth,
   font:getComputedStyle(document.body).fontFamily,
   h1:(()=>{const e=document.querySelector('h1'),b=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:b.x,y:b.y,width:b.width,height:b.height,fontSize:s.fontSize,lineHeight:s.lineHeight,text:e.textContent};})(),
   sections:[...document.querySelectorAll('main>section, .technology-strip, footer')].map(e=>{const b=e.getBoundingClientRect(),s=getComputedStyle(e);return {id:e.id||e.className,y:Math.round(b.y+scrollY),width:Math.round(b.width),height:Math.round(b.height),padding:s.padding};}),
   fontsLoaded:document.fonts.status==='loaded',
   images:[...document.images].map(e=>({src:e.currentSrc,loaded:e.complete&&e.naturalWidth>0})),
   lenis:document.documentElement.classList.contains('lenis'),
   anchors:[...document.querySelectorAll('a[href^="#"]')].every(a=>document.getElementById(a.getAttribute('href').slice(1))),
  }));
  assert(metrics.scrollWidth<=viewport.width,`Horizontal overflow at ${viewport.width}`);
  assert(metrics.fontsLoaded,'Fonts not loaded');assert(metrics.images.every(i=>i.loaded),'An image failed to load');assert(metrics.anchors,'Missing anchor target');assert.equal(metrics.lenis,false,'Reduced motion must disable Lenis');
  await page.getByRole('button',{name:'Próximo projeto',exact:true}).click();
  await page.locator('.carousel-counter').filter({hasText:'02'}).waitFor();
  assert.match(await page.locator('.project-selection h3').textContent(),/Fortis/);
  await page.getByRole('button',{name:'Projeto anterior',exact:true}).click();
  await page.getByRole('button',{name:'Projeto anterior',exact:true}).click();
  assert.match(await page.locator('.project-selection h3').textContent(),/Próximo projeto/);
  await page.locator('.carousel-viewport').focus();await page.keyboard.press('Home');
  await page.keyboard.press('ArrowRight');assert.match(await page.locator('.project-selection h3').textContent(),/Fortis/);
  await page.keyboard.press('End');assert.match(await page.locator('.project-selection h3').textContent(),/Próximo projeto/);
  await page.keyboard.press('Home');
  const services=page.locator('.service');
  for(let i=0;i<5;i++){await services.nth(i).locator('summary').click();assert.equal(await services.nth(i).getAttribute('open'),'');await services.nth(i).locator('.service-body .button').waitFor({state:'visible'});await services.nth(i).locator('summary').click();}
  if(viewport.width<768){await page.locator('.mobile-menu summary').click();assert.equal(await page.locator('.mobile-menu').getAttribute('open'),'');await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-menu').getAttribute('open'),null);await page.locator('.mobile-menu summary').click();await page.getByRole('navigation',{name:'Navegação mobile',exact:true}).getByRole('link',{name:'Projetos',exact:true}).click();assert.equal(await page.locator('.mobile-menu').getAttribute('open'),null);}
  await page.locator('.carousel-viewport').scrollIntoViewIfNeeded();
  const box=await page.locator('.carousel-viewport').boundingBox();
  await page.mouse.move(box.x+box.width*.65,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.35,box.y+box.height*.5,{steps:8});await page.mouse.up();
  assert.match(await page.locator('.project-selection h3').textContent(),/Fortis/);
  await page.locator('.carousel-viewport').focus();await page.keyboard.press('Home');
  for(const a of await page.locator('a[href*="wa.me"]').all())assert.match(await a.getAttribute('href'),/^https:\/\/wa.me\/5519994623541\?text=/);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  await fs.writeFile(`artifacts/validation/axe-${viewport.width}.json`,JSON.stringify(axe.violations,null,2));
  report.viewports.push({...metrics,axeViolations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});await page.waitForTimeout(120);
  if([1440,1920,390].includes(viewport.width)){
   await page.screenshot({path:`artifacts/validation/${viewport.width}-hero.png`});
   await page.screenshot({path:`artifacts/validation/${viewport.width}-full.png`,fullPage:true});
   for(const id of ['manifesto','servicos','projetos','contato']){await page.evaluate(id=>{const section=document.getElementById(id),header=document.querySelector('.site-header');scrollTo(0,section.getBoundingClientRect().top+scrollY-header.offsetHeight-16);},id);await page.waitForTimeout(100);await page.screenshot({path:`artifacts/validation/${viewport.width}-${id}.png`});}
  }
  report.interactions.push({width:viewport.width,checks:['setas e ciclo circular','teclado Home/End/ArrowRight','arraste com mouse','cinco serviços expansíveis','links de WhatsApp','âncoras internas',...(viewport.width<768?['menu mobile abre e fecha','Escape retorna foco','link mobile fecha menu']:[])]});
  console.log('Viewport',viewport.width,'OK; axe:',axe.violations.length);
  await page.close();
 }

 const touchContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
 const touchPage=await touchContext.newPage();await touchPage.goto(origin,{waitUntil:'networkidle'});await touchPage.locator('.carousel-viewport').scrollIntoViewIfNeeded();
 const touchBox=await touchPage.locator('.carousel-viewport').boundingBox();const cdp=await touchContext.newCDPSession(touchPage);const tx=touchBox.x+touchBox.width*.75,ty=touchBox.y+touchBox.height*.5;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:tx,y:ty}]});
 for(let n=1;n<=8;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tx-n*22,y:ty}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});assert.match(await touchPage.locator('.project-selection h3').textContent(),/Fortis/);
 report.interactions.push({touch:true,checks:['swipe real com eventos de toque no Chrome mobile']});await touchContext.close();

 for(const path of ['/projetos/mimos-e-caprichos','/projetos/fortis','/projetos/w11-brindes','/projetos/sensedia','/projetos/proximo-projeto','/privacidade','/robots.txt','/sitemap.xml','/pagina-inexistente']){
  const page=await browser.newPage();const response=await page.goto(origin+path,{waitUntil:'domcontentloaded'});const status=response.status();assert.equal(status,path==='/pagina-inexistente'?404:200);report.routes.push({path,status});await page.close();
 }
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const page=await browser.newPage({viewport,javaScriptEnabled:false});await page.goto(origin,{waitUntil:'networkidle'});assert(await page.locator('h1').isVisible());await page.locator('.service summary').first().click();assert.equal(await page.locator('.service').first().getAttribute('open'),'');assert(await page.locator('.nojs-projects').isVisible());report.interactions.push({width:viewport.width,javascript:false,checks:['conteúdo principal visível','serviços nativos operáveis','lista alternativa dos cinco projetos']});await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});page.on('pageerror',error=>errors.push({motion:true,message:error.message}));await page.goto(origin,{waitUntil:'networkidle'});await page.waitForTimeout(1800);assert(await page.locator('h1').isVisible());await page.locator('#projetos').scrollIntoViewIfNeeded();await page.waitForTimeout(1800);assert.equal(await page.locator('#projects-title').evaluate(e=>getComputedStyle(e.parentElement).opacity),'1');const lenis=await page.locator('html').evaluate(e=>e.classList.contains('lenis'));await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(300);assert.equal(await page.locator('html').evaluate(e=>e.classList.contains('lenis')),false);report.interactions.push({motion:true,lenisInitially:lenis,checks:['animações preservam conteúdo','revelação durante scroll','alterar movimento reduzido remove Lenis']});await page.close();
 report.errors=errors;assert.equal(errors.length,0,'Browser JS errors');assert.equal(report.viewports.reduce((sum,v)=>sum+v.axeViolations.length,0),0,'Accessibility violations remain');const html=await (await fetch(origin)).text();report.performance={htmlBytes:Buffer.byteLength(html),inlinePolygons:(html.match(/<polygon/g)||[]).length};
} catch(error){report.errors.push({failure:error.stack});console.error(error);process.exitCode=1;} finally {await fs.writeFile('artifacts/validation/results.json',JSON.stringify(report,null,2));await browser.close();}
