import React from 'react';
import { useScrollReveal } from '../utils/motion';

export default function AboutView() {
  const { ref: milestonesRef, isRevealed } = useScrollReveal();

  const milestones = [
    {
      year: '2023',
      title: 'Studio Inception',
      desc: 'Founded as a boutique engineering laboratory for custom web applications.'
    },
    {
      year: '2024',
      title: 'Mobile Expansion',
      desc: 'Expanded to React Native and Expo engineering, releasing our first institutional apps.'
    },
    {
      year: '2025',
      title: 'ERP & Enterprise Products',
      desc: 'Launched PID Education and Hisaab, reaching over 50,000 active monthly users.'
    },
    {
      year: '2026',
      title: 'Global Digital Footprint',
      desc: 'Serving clients across 14 countries with award-level UI/UX and bespoke product engines.'
    }
  ];

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">STUDIO ORIGIN</div>
          <h1 className="headline-mega dark">OUR STORY.</h1>
          <p className="hero-subcopy">
            Born from a desire to rid the internet of sluggish, generic templates.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '90px 24px' }}>
        <div className="intro-grid" style={{ marginBottom: '90px' }}>
          <div>
            <div className="sub-title">MISSION &amp; VISION</div>
            <h2 className="headline-section">CRAFTING DIGITAL ADVANTAGE.</h2>
            <p style={{ color: 'var(--text-dark-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '18px' }}>
              Founded by Rahul, Gulesh Patel, and Nitin Sinha, LeoVantage Web Studio was established with a singular
              ethos: every business deserves an uncompromising digital footprint.
            </p>
            <p style={{ color: 'var(--text-dark-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '14px' }}>
              We don't view websites as passive brochures. We construct them as high-conversion revenue engines,
              engineered with sub-second response times, bespoke visual identities, and future-proof architectures.
            </p>
          </div>
          <div
            ref={milestonesRef}
            className={`milestones-card ${isRevealed ? 'is-revealed' : ''}`}
            style={{
              background: 'var(--surface-white)',
              borderRadius: 'var(--radius-xl)',
              padding: '44px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-subtle)',
              position: 'relative'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '26px' }}>
              Studio Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
              {/* Subtle connecting vertical timeline line */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  bottom: '12px',
                  left: '65px',
                  width: '2px',
                  background: 'rgba(18, 26, 46, 0.08)'
                }}
                aria-hidden="true"
              />

              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  style={{
                    display: 'flex',
                    gap: '22px',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 1
                  }}
                  tabIndex={0}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      color: 'var(--brand-navy)',
                      fontSize: '1.25rem',
                      lineHeight: 1,
                      minWidth: '55px'
                    }}
                  >
                    {m.year}
                  </div>
                  {/* Subtle timeline dot indicator */}
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: idx === milestones.length - 1 ? 'var(--brand-lime)' : 'var(--brand-navy)',
                      border: '2px solid #FFF',
                      boxShadow: '0 0 0 2px rgba(18, 26, 46, 0.1)',
                      marginTop: '4px',
                      flexShrink: 0
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-dark)', marginBottom: '3px' }}>
                      {m.title}
                    </strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-dark-secondary)', lineHeight: 1.5 }}>
                      {m.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
