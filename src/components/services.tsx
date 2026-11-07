'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Plus, Minus } from 'lucide-react';
import { services, projects } from '@/data/site';
import { ContactLink } from './ui';

type ServiceAnimation = {
  size: Animation;
  fade: Animation;
  body: HTMLElement;
  open: boolean;
};

export function Services() {
  const animations = useRef(new Map<HTMLDetailsElement, ServiceAnimation>());

  useEffect(() => {
    const active = animations.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const settle = () => {
      active.forEach((animation, details) => {
        details.open = animation.open;
        animation.size.cancel();
        animation.fade.cancel();
        animation.body.inert = false;
        details.style.removeProperty('overflow');
      });
      active.clear();
    };
    const preferenceChanged = () => {
      if (reducedMotion.matches) settle();
    };
    reducedMotion.addEventListener('change', preferenceChanged);
    window.addEventListener('resize', settle);
    return () => {
      reducedMotion.removeEventListener('change', preferenceChanged);
      window.removeEventListener('resize', settle);
      settle();
    };
  }, []);

  function toggleService(event: MouseEvent<HTMLElement>) {
    const details = event.currentTarget.parentElement as HTMLDetailsElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !details.animate) return;

    event.preventDefault();
    const body = details.querySelector<HTMLElement>('.service-body')!;
    const previous = animations.current.get(details);
    const open = previous ? !previous.open : !details.open;
    const startHeight = details.getBoundingClientRect().height;
    const startOpacity = previous ? Number(getComputedStyle(body).opacity) : open ? 0 : 1;
    previous?.size.cancel();
    previous?.fade.cancel();

    // Keep native details/summary semantics and measure the intrinsic open height.
    details.open = true;
    const expandedHeight = details.getBoundingClientRect().height;
    const borders = getComputedStyle(details);
    const collapsedHeight = event.currentTarget.getBoundingClientRect().height
      + parseFloat(borders.borderTopWidth) + parseFloat(borders.borderBottomWidth);
    details.style.overflow = 'hidden';
    body.inert = !open;

    const size = details.animate([
      { height: `${startHeight}px` },
      { height: `${open ? expandedHeight : collapsedHeight}px` },
    ], { duration: 360, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both' });
    const fade = body.animate([
      { opacity: startOpacity }, { opacity: open ? 1 : 0 },
    ], { duration: open ? 260 : 180, easing: 'ease-out', fill: 'both' });

    animations.current.set(details, { size, fade, body, open });
    size.onfinish = () => {
      if (animations.current.get(details)?.size !== size) return;
      details.open = open;
      size.cancel();
      fade.cancel();
      body.inert = false;
      details.style.removeProperty('overflow');
      animations.current.delete(details);
    };
  }

  return (
    <section className="services section" id="servicos" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading" data-reveal>
          <h2 id="services-title">Soluções completas<br />para sua presença digital<span className="accent">.</span></h2>
          <p>Da primeira ideia ao próximo passo.<br />O que faz sentido para o seu momento.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => {
            const preview = projects[index].image;
            return (
              <details
                className="service"
                key={service.name}
                onMouseEnter={event => event.currentTarget.classList.add('is-hovered')}
                onMouseLeave={event => event.currentTarget.classList.remove('is-hovered')}
              >
                <summary onClick={toggleService}>
                  <span className="item-number">0{index + 1}</span>
                  <h3>{service.name}</h3>
                  <span className="service-short">{service.description}</span>
                  <span className="service-arrow">
                    <ArrowUpRight className="arrow-rest" size={25} aria-hidden="true" />
                    <Plus className="arrow-mobile" size={22} aria-hidden="true" />
                    <Minus className="arrow-expanded" size={22} aria-hidden="true" />
                  </span>
                </summary>
                <div className="service-body">
                  <div>
                    <p>{service.detail}</p>
                    <ul>
                      {service.deliverables.map(item => (
                        <li key={item}><ArrowDownRight size={15} aria-hidden="true" />{item}</li>
                      ))}
                    </ul>
                    <ContactLink subject={`Olá, Ludovik! ${service.subject}`}>Conversar sobre este serviço</ContactLink>
                  </div>
                  {preview ? (
                    <Image src={preview} alt={`Prévia selecionada para ${service.name}`} width={560} height={350} sizes="(max-width: 767px) 90vw, 40vw" className="service-preview" />
                  ) : (
                    <div className="service-note">
                      <span>Design + tecnologia</span>
                      <p>{service.description}</p>
                      <ArrowUpRight size={40} strokeWidth={1} aria-hidden="true" />
                    </div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
        <p className="service-scope">As entregas são definidas na proposta, conforme o escopo contratado.</p>
      </div>
    </section>
  );
}
