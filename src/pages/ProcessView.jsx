import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../utils/motion';

export default function ProcessView({ navigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const userInteractedRef = useRef(false);
  const { ref: containerRef, isRevealed } = useScrollReveal();

  const fullSteps = [
    {
      num: '01.',
      title: 'Discovery & Technical Architecture',
      desc: 'We conduct deep interviews to align on business metrics, map user journeys, define database schemas, and identify technical constraints.',
      timeline: 'Week 1',
      deliverables: 'System requirements document, database ERD, timeline gantt chart.'
    },
    {
      num: '02.',
      title: 'UI/UX Prototyping & Design Systems',
      desc: 'We translate user stories into low-fidelity wireframes and click-through Figma prototypes. Once the layout is validated, we craft the full visual language and token hierarchy.',
      timeline: 'Weeks 2–3',
      deliverables: 'Interactive Figma prototype, WCAG AA accessibility audit, design tokens.'
    },
    {
      num: '03.',
      title: 'Sprint-Driven Frontend & Backend Engineering',
      desc: 'We build with clean, type-safe architecture. You receive access to a staging environment with weekly sprint demos to watch your product take shape in real time.',
      timeline: 'Weeks 4–7',
      deliverables: 'Staging deployment previews, clean GitHub PRs, secure REST/GraphQL endpoints.'
    },
    {
      num: '04.',
      title: 'Automated Testing & Security Hardening',
      desc: 'We conduct rigorous unit tests, cross-browser validation across Safari, Chrome, iOS & Android devices, and run penetration audits to ensure zero vulnerabilities.',
      timeline: 'Week 8',
      deliverables: 'QA pass reports, 100/100 Lighthouse performance certifications.'
    },
    {
      num: '05.',
      title: 'Production Deployment & Go-Live',
      desc: 'Zero-downtime DNS propagation, automated SSL certificates, CDN edge-caching configurations, and mobile app store releases.',
      timeline: 'Launch Day',
      deliverables: 'Live URL, App Store & Google Play links, handover documentation.'
    },
    {
      num: '06.',
      title: 'Continuous Growth & 30-Day SLA',
      desc: 'We stand firmly behind our work. Every release includes 30 days of complimentary engineering warranty, monitoring, and team training sessions.',
      timeline: 'Ongoing',
      deliverables: 'Health monitoring dashboards, analytics reports, staff training sessions.'
    }
  ];

  useEffect(() => {
    let ticking = false;

    const updateActiveStep = () => {
      if (userInteractedRef.current) {
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
        if (dist < minDistance && rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveStep((prev) => (prev === closestIdx ? prev : closestIdx));
      ticking = false;
    };

    const handleScroll = () => {
      if (userInteractedRef.current) return;
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveStep);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleManualSelect = (idx) => {
    userInteractedRef.current = true;
    setActiveStep(idx);
    setTimeout(() => {
      userInteractedRef.current = false;
    }, 1200);
  };

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">DELIVERY ROADMAP</div>
          <h1 className="headline-mega dark">HOW WE SHIP.</h1>
          <p className="hero-subcopy">
            A transparent, agile workflow designed to eliminate scope creep and deliver award-winning products on time.
          </p>
        </div>
      </div>

      <div
        className={`container ${isRevealed ? 'is-revealed' : ''}`}
        ref={containerRef}
        style={{ padding: '90px 24px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '960px', margin: '0 auto' }}>
          {fullSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                ref={(el) => (stepRefs.current[idx] = el)}
                className={`process-page-card ${isActive ? 'active' : ''}`}
                tabIndex={0}
                onMouseEnter={() => handleManualSelect(idx)}
                onFocus={() => handleManualSelect(idx)}
                onClick={() => handleManualSelect(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleManualSelect(idx);
                  }
                }}
                style={{
                  background: 'var(--surface-white)',
                  border: isActive ? '1px solid var(--brand-navy)' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '38px 34px',
                  boxShadow: isActive ? 'var(--shadow-card-hover)' : 'var(--shadow-subtle)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Subtle active indicator bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '4px',
                    background: isActive ? 'var(--brand-lime)' : 'transparent',
                    transition: 'background 0.3s ease'
                  }}
                  aria-hidden="true"
                />

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '2.2rem',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: isActive ? 'var(--brand-navy)' : 'var(--text-dark-secondary)',
                    marginBottom: '12px',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '1.35rem',
                    color: 'var(--text-dark)',
                    marginBottom: '10px'
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: 'var(--text-dark-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '16px'
                  }}
                >
                  {step.desc}
                </p>
                <div
                  style={{
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-light-subtle)',
                    fontSize: '0.88rem',
                    color: 'var(--text-dark-secondary)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <span>
                    <strong style={{ color: 'var(--brand-navy)' }}>TIMELINE: </strong>
                    {step.timeline}
                  </span>
                  <span>•</span>
                  <span>
                    <strong style={{ color: 'var(--brand-navy)' }}>DELIVERABLES: </strong>
                    {step.deliverables}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div style={{ textAlign: 'center', marginTop: '70px' }}>
          <a
            href="#/contact"
            className="btn-pill-dark"
            onClick={(e) => {
              e.preventDefault();
              navigate('contact');
            }}
          >
            <span>DISCUSS YOUR PROJECT ROADMAP</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
