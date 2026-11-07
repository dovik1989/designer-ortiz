'use client';

import { useEffect, useRef } from 'react';
import { processSteps } from '@/data/site';

export function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function start() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed || !root.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const section = root.current;
      const media = gsap.matchMedia();
      cleanup = () => media.revert();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const list = section.querySelector<HTMLOListElement>('.process-list')!;
        const steps = [...list.querySelectorAll<HTMLElement>('.process-step')];
        const fills = [...list.querySelectorAll<HTMLElement>('.process-fill')];
        const firstDot = list.querySelector<HTMLElement>('.process-dot')!;
        const playhead = { distance: 0 };
        const focusDistance = 72;
        let offsets: number[] = [];

        const measure = () => {
          offsets = steps.map(step => step.offsetTop - steps[0].offsetTop);
        };
        const clamp = (value: number) => Math.max(0, Math.min(1, value));
        const render = () => {
          steps.forEach((step, index) => {
            const reached = clamp((playhead.distance - offsets[index]) / focusDistance);
            const next = offsets[index + 1];
            const focus = reached * (next === undefined ? 1 : 1 - clamp((playhead.distance - next) / focusDistance));
            step.style.setProperty('--process-reached', String(reached));
            step.style.setProperty('--process-focus', String(focus));
            if (fills[index]) {
              const progress = clamp((playhead.distance - offsets[index]) / (next - offsets[index]));
              fills[index].style.transform = `scaleY(${progress})`;
            }
          });
        };

        measure();
        // One scrubbed playhead drives both the continuous line and all four states.
        // Distances come from the rendered rows so wrapping and resizing stay aligned.
        const animation = gsap.fromTo(playhead, { distance: 0 }, {
          distance: () => offsets[offsets.length - 1] + focusDistance,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            id: 'ludovik-process',
            trigger: list,
            start: () => {
              const dot = firstDot.getBoundingClientRect();
              const markerY = dot.top + dot.height / 2 - list.getBoundingClientRect().top;
              return `top+=${markerY} 65%`;
            },
            end: () => `+=${offsets[offsets.length - 1] + focusDistance}`,
            scrub: 0.35,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
            onRefresh: render,
          },
        });
        render();

        // Refresh this trigger after responsive reflow, including content above it.
        let refreshFrame = 0;
        const resize = new ResizeObserver(() => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => animation.scrollTrigger?.refresh());
        });
        resize.observe(list);
        if (section.parentElement) resize.observe(section.parentElement);

        return () => {
          resize.disconnect();
          cancelAnimationFrame(refreshFrame);
          steps.forEach(step => {
            step.style.removeProperty('--process-reached');
            step.style.removeProperty('--process-focus');
          });
          fills.forEach(fill => fill.style.removeProperty('transform'));
        };
      });

      void document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    }

    void start();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section ref={root} id="processo" className="process section" aria-labelledby="process-title">
      <div className="container process-grid">
        <div className="process-intro">
          <h2 id="process-title">Boas ideias merecem<br />um caminho claro<span className="accent">.</span></h2>
          <p>Você participa. A gente constrói.<br />Cada etapa, uma decisão com propósito.</p>
        </div>
        <ol className="process-list">
          {processSteps.map((step, index) => (
            <li key={step.title} className="process-step">
              {index < processSteps.length - 1 && (
                <span className="process-rail" aria-hidden="true">
                  <span className="process-fill" />
                </span>
              )}
              <span className="process-dot" aria-hidden="true" />
              <span className="process-number" aria-hidden="true">0{index + 1}</span>
              <div className="process-copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
