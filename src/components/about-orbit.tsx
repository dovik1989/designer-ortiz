'use client';

import { useEffect, useRef } from 'react';
import styles from './about.module.css';

export function AboutOrbit() {
  const orbit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = orbit.current;
    if (!element) return;

    let inView = false;
    const update = () => {
      element.dataset.active = String(inView && document.visibilityState === 'visible');
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <div ref={orbit} className={`monogram-orbit ${styles.orbit}`} />;
}
