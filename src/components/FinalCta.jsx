import React from 'react';
import { useScrollReveal } from '../utils/motion';

export default function FinalCta({ navigate }) {
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  return (
    <section className={`section-final-cta ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="final-cta-content">
          <div className="sub-title light">READY TO BEGIN?</div>
          <h2 className="final-cta-headline">LET'S BUILD SOMETHING GREAT TOGETHER.</h2>
          <p className="final-cta-desc">
            Have a website or app in mind? Tell us about your goals, timeline, and requirements. We will review your project and get back to you with next steps.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#/contact"
              className="btn-pill-mint"
              onClick={(e) => {
                e.preventDefault();
                navigate('contact');
              }}
            >
              <span>START A PROJECT</span>
              <span className="btn-arrow">↗</span>
            </a>
            <a
              href="#/work"
              className="btn-pill-outline"
              onClick={(e) => {
                e.preventDefault();
                navigate('work');
              }}
            >
              VIEW OUR WORK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
