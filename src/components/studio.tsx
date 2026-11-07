export { Process } from './process';
import { ArrowUpRight, Compass, Linkedin, Monitor, Palette } from 'lucide-react';
import { ContactLink } from './ui';
import { studio } from '@/data/site';
import { AboutOrbit } from './about-orbit';
import styles from './about.module.css';

const paragraphs = [
  'Sou designer gráfico, com uma trajetória construída entre design, comunicação, marketing e tecnologia.',
  'Ao longo da minha carreira, passei por empresas como Sensedia, Gaslive e Elettromec, desenvolvendo uma visão que vai além da estética: entender marcas, comunicar ideias e criar experiências que fazem sentido para as pessoas.',
  'Com formação em Publicidade e Propaganda e estudos em Marketing Digital e Empreendedorismo, hoje reúno esse conhecimento na criação de sites, landing pages e identidades visuais que combinam estratégia, criatividade e funcionalidade.',
  'Acredito que um bom design não precisa apenas impressionar. Precisa comunicar, conectar e gerar oportunidades.',
];

const highlights = [
  { title: 'Design & Branding', description: 'Identidade e comunicação visual.', Icon: Palette },
  { title: 'Experiências digitais', description: 'Sites e landing pages.', Icon: Monitor },
  { title: 'Visão estratégica', description: 'Marketing e negócios.', Icon: Compass },
];

export function About() {
  return (
    <section id="sobre" className="about section" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-monogram" aria-hidden="true" data-reveal>
          <span>L<span className="accent">.</span></span>
          <AboutOrbit />
          <div className="monogram-caption">
            O olhar de um designer.<br />A visão de um parceiro.
          </div>
        </div>
        <div className="about-copy">
          <h2 id="about-title" data-reveal>Prazer,<br />sou <em>Ludovik.</em></h2>
          {paragraphs.map(paragraph => <p key={paragraph} data-reveal>{paragraph}</p>)}
          <p className={`about-signoff ${styles.signoff}`} data-reveal>
            O olhar de um designer. A visão de quem entende negócios.
          </p>
          <ul className={styles.highlights} role="list">
            {highlights.map(({ title, description, Icon }, index) => (
              <li key={title} className={styles.highlight} data-reveal>
                <div className={styles.featureMeta} aria-hidden="true">
                  <span>0{index + 1}</span>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
          <div className={styles.actions} data-reveal>
            <ContactLink>Vamos conversar</ContactLink>
            <a
              className={styles.linkedin}
              href={studio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} aria-hidden="true" />
              <span>Conheça minha trajetória no LinkedIn</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
