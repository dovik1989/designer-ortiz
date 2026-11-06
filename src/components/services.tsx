'use client';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { services, projects } from '@/data/site';
import { ContactLink } from './ui';

export function Services(){return <section className="services section" id="servicos" aria-labelledby="services-title"><div className="container"><div className="section-heading" data-reveal><h2 id="services-title">Soluções completas<br/>para sua presença digital<span className="accent">.</span></h2><p>Da primeira ideia ao próximo passo.<br/>O que faz sentido para o seu momento.</p></div><div className="service-list">{services.map((service,i)=>{
 const preview=projects[i].image;
 return <details className="service" key={service.name} onMouseEnter={e=>e.currentTarget.classList.add('is-hovered')} onMouseLeave={e=>e.currentTarget.classList.remove('is-hovered')}><summary><span className="item-number">0{i+1}</span><h3>{service.name}</h3><span className="service-short">{service.description}</span><span className="service-arrow"><ArrowUpRight className="arrow-rest" size={25} aria-hidden="true"/><Plus className="arrow-mobile" size={22} aria-hidden="true"/><Minus className="arrow-expanded" size={22} aria-hidden="true"/></span></summary><div className="service-body"><div><p>{service.detail}</p><ul>{service.deliverables.map(item=><li key={item}><ArrowDownRight size={15} aria-hidden="true"/>{item}</li>)}</ul><ContactLink subject={`Olá, Ludovik! ${service.subject}`}>Conversar sobre este serviço</ContactLink></div>{preview?<Image src={preview} alt={`Prévia selecionada para ${service.name}`} width={560} height={350} sizes="(max-width: 767px) 90vw, 40vw" className="service-preview"/>:<div className="service-note"><span>Design + tecnologia</span><p>{service.description}</p><ArrowUpRight size={40} strokeWidth={1} aria-hidden="true"/></div>}</div></details>;
 })}</div></div></section>;}
