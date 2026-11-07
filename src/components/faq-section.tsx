'use client';

import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faqItems, type FAQItem } from '@/data/faq';
import styles from './faq-section.module.css';

type FAQSectionProps = {
  id?: string;
  items?: readonly FAQItem[];
};

export function FAQSection({ id = 'faq', items = faqItems }: FAQSectionProps) {
  const instanceId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(items.length ? 0 : null);
  const titleId = `${instanceId}-faq-title`;

  return (
    <section id={id} className={`section ${styles.section}`} aria-labelledby={titleId}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className={styles.label}>Dúvidas frequentes</p>
          <h2 id={titleId} className={styles.heading}>
            Perguntas que
            <em>fazem a diferença.</em>
          </h2>
          <p className={styles.description}>
            Tudo o que você precisa saber antes de transformar sua ideia em um projeto digital.
          </p>
        </div>

        <ol className={styles.list} role="list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${instanceId}-faq-question-${index}`;
            const panelId = `${instanceId}-faq-answer-${index}`;

            return (
              <li key={item.question} className={styles.item}>
                <h3 className={styles.questionHeading}>
                  <button
                    id={triggerId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(current => current === index ? null : index)}
                  >
                    <span className={styles.number} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.question}>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <Plus className={styles.plus} size={22} strokeWidth={1.5} />
                      <Minus className={styles.minus} size={22} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={styles.panel}
                  data-open={isOpen}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <noscript>
          <style>{`.${styles.list} { display: none; }`}</style>
          <ol className={styles.readingList} role="list">
            {items.map((item, index) => (
              <li key={item.question} className={styles.item}>
                <h3 className={styles.readingHeading}>
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.question}</span>
                </h3>
                <p className={styles.answer}>{item.answer}</p>
              </li>
            ))}
          </ol>
        </noscript>

      </div>
    </section>
  );
}
