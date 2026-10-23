import React, { useState } from 'react';
import { FAQS } from '../data/faq';
import { useScrollReveal } from '../utils/motion';

export default function FaqAccordion() {
  const [openId, setOpenId] = useState(1);
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`section-faq ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="sub-title">GOT QUESTIONS?</div>
          <h2 className="headline-section">FREQUENTLY ASKED.</h2>
        </div>

        <div className="faq-accordion-list" role="region" aria-label="Frequently Asked Questions">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const btnId = `faq-btn-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                <button
                  type="button"
                  id={btnId}
                  className="faq-question-btn"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon-cross ${isOpen ? 'open' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq-answer-panel"
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-content">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
