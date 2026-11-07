import { ContactLink } from './ui';
import styles from './project-cta.module.css';

export function ProjectCTA() {
  return (
    <section id="project-cta" className={`section ${styles.section}`} aria-labelledby="project-cta-title">
      <div className="container" data-reveal>
        <h2 id="project-cta-title" className={styles.heading}>
          Gostou do que viu?<br />
          Seu negócio pode ser <em>o próximo.</em>
        </h2>
        <p className={styles.description}>
          Vamos conversar sobre um site pensado para apresentar sua empresa, valorizar sua marca e criar novas oportunidades.
        </p>
        <ContactLink subject="Olá, Ludovik! Conheci seus projetos pelo site e gostaria de solicitar um orçamento.">
          Quero solicitar um orçamento
        </ContactLink>
      </div>
    </section>
  );
}
