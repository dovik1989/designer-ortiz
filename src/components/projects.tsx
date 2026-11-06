'use client';
import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent, KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { projects } from '@/data/site';
import { ProjectArtwork } from './project-artwork';

export function Projects(){
 const [index,setIndex]=useState(0);
 const [dragging,setDragging]=useState(false);
 const viewport=useRef<HTMLDivElement>(null);
 const pointer=useRef<{id:number;x:number;y:number}|null>(null);
 const change=(next:number)=>setIndex((next+projects.length)%projects.length);
 function down(e:PointerEvent<HTMLDivElement>){if(e.button!==0)return;pointer.current={id:e.pointerId,x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);}
 function move(e:PointerEvent<HTMLDivElement>){if(!pointer.current||pointer.current.id!==e.pointerId)return;const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){setDragging(true);e.currentTarget.style.setProperty('--drag',`${Math.max(-90,Math.min(90,dx*.22))}px`);}}
 function up(e:PointerEvent<HTMLDivElement>){if(!pointer.current)return;const dx=e.clientX-pointer.current.x,dy=e.clientY-pointer.current.y;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy))change(index+(dx<0?1:-1));reset();}
 function reset(){pointer.current=null;setDragging(false);viewport.current?.style.setProperty('--drag','0px');}
 function keyboard(e:KeyboardEvent<HTMLDivElement>){if(e.key==='ArrowRight'){e.preventDefault();change(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();change(index-1);}if(e.key==='Home'){e.preventDefault();change(0);}if(e.key==='End'){e.preventDefault();change(projects.length-1);}}
 const selected=projects[index];
 return <section id="projetos" className="projects section" aria-labelledby="projects-title" aria-roledescription="carrossel"><div className="container section-heading" data-reveal><h2 id="projects-title">Projetos<br/><em>em destaque</em></h2><p>Um olhar sobre o que podemos construir.<br/>Design que encontra o seu propósito.</p></div>
 <div className={`carousel-viewport ${dragging?'is-dragging':''}`} ref={viewport} tabIndex={0} role="group" aria-label="Projetos em destaque. Use as setas do teclado ou arraste para navegar." onKeyDown={keyboard} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={reset} onLostPointerCapture={reset}>
 {projects.map((project,i)=>{let offset=(i-index+projects.length)%projects.length;if(offset>2)offset-=projects.length;return <article key={project.slug} className={`carousel-slide ${offset===0?'is-active':''}`} style={{'--offset':offset,'--distance':Math.abs(offset)} as CSSProperties} aria-hidden={offset!==0} aria-label={`${i+1} de ${projects.length}: ${project.name}`} role="group" aria-roledescription="slide"><ProjectArtwork project={project} priority={i===0}/></article>;})}
 </div>
 <div className="container"><div className="carousel-caption"><div className="project-selection" aria-live="polite" aria-atomic="true"><span className="carousel-counter"><span>{String(index+1).padStart(2,'0')}</span><span className="counter-divider">/</span>05</span><div><h3>{selected.name}</h3><p>{selected.category}</p></div></div><Link className="text-link project-link" href={`/projetos/${selected.slug}`}>Ver projeto <ArrowUpRight size={18} aria-hidden="true"/></Link><div className="carousel-controls"><button className="icon-button" aria-label="Projeto anterior" onClick={()=>change(index-1)}><ArrowLeft size={21} aria-hidden="true"/></button><button className="icon-button" aria-label="Próximo projeto" onClick={()=>change(index+1)}><ArrowRight size={21} aria-hidden="true"/></button></div></div><p className="drag-hint"><MoveHorizontal size={16} aria-hidden="true"/> Arraste para explorar</p>
 <noscript><div className="nojs-projects"><p>Explore os projetos:</p>{projects.map(project=><Link key={project.slug} href={`/projetos/${project.slug}`}>{project.name}<ArrowUpRight size={16} aria-hidden="true"/></Link>)}</div></noscript>
 </div></section>;
}
