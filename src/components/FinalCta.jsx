import React from 'react';
import { useScrollReveal } from '../utils/motion';

export default function FinalCta({ navigate }) {
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  return (
    <section className={`section-final-cta ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="final-cta-content">
          <div className="sub-title light">START YOUR JOURNEY</div>
          <h2 className="final-cta-headline">LET'S BUILD SOMETHING GREAT.</h2>
          <p className="final-cta-desc">
            Have an idea, platform, or brand in mind? Let's discuss your timeline, tech requirements, and budget
            over a quick strategy call.
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
              <span>START A PROJECT BRIEF</span>
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
              EXPLORE OUR WORK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
