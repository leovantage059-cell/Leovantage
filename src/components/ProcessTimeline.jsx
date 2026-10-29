import React, { useState, useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '../data/faq';
import { useScrollReveal } from '../utils/motion';

export default function ProcessTimeline({ navigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const userInteractedRef = useRef(false);
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  useEffect(() => {
    let ticking = false;
    let isVisible = false;

    // Only observe scroll when the process section is in or near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '200px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const updateActiveStep = () => {
      if (userInteractedRef.current || !isVisible) {
        ticking = false;
        return;
      }

      const readingLine = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - readingLine);
        if (dist < minDistance && rect.bottom > 100 && rect.top < window.innerHeight - 100) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveStep((prev) => (prev === closestIdx ? prev : closestIdx));
      ticking = false;
    };

    const handleScroll = () => {
      if (!isVisible || userInteractedRef.current) return;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveStep);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleManualSelect = (idx) => {
    userInteractedRef.current = true;
    setActiveStep(idx);
    // Release manual override after brief delay so scrolling can resume tracking
    setTimeout(() => {
      userInteractedRef.current = false;
    }, 1200);
  };

  const progressPercent = ((activeStep) / (PROCESS_STEPS.length - 1)) * 100;

  return (
    <section className={`section-process ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="process-grid">
          <div className="process-sticky-left">
            <div className="sub-title light">OUR WORKFLOW</div>
            <h2 className="headline-section light">HOW WE WORK.</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: '20px 0 32px 0', maxWidth: '440px' }}>
              Every project follows a clear, step-by-step plan from discovery to launch. You always know what is being built, what comes next, and when it will be ready.
            </p>
            <a
              href="#/process"
              className="btn-pill-mint"
              onClick={(e) => {
                e.preventDefault();
                navigate('process');
              }}
            >
              <span>VIEW FULL PROCESS</span>
              <span>↗</span>
            </a>
          </div>

          <div className="process-timeline-wrap">
            {/* Visual subtle progress rail */}
            <div className="process-progress-rail" aria-hidden="true">
              <div
                className="process-rail-track"
                style={{
                  height: `${progressPercent}%`
                }}
              />
              <div
                className="process-rail-marker"
                style={{
                  top: `${progressPercent}%`
                }}
              />
            </div>

            <div className="process-timeline-list" role="list">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.number}
                    ref={(el) => (stepRefs.current[idx] = el)}
                    className={`process-step-card ${isActive ? 'active' : ''}`}
                    tabIndex={0}
                    role="listitem"
                    aria-current={isActive ? 'step' : undefined}
                    onMouseEnter={() => handleManualSelect(idx)}
                    onFocus={() => handleManualSelect(idx)}
                    onClick={() => handleManualSelect(idx)}
                    onTouchStart={() => handleManualSelect(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleManualSelect(idx);
                      }
                    }}
                  >
                    <div className="process-num">{step.number}</div>
                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-desc">{step.desc}</p>
                    <div className="process-deliverables-pill-group">
                      {step.pills.map((pill) => (
                        <span key={pill} className="process-pill">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
