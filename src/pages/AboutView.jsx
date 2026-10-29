import React from 'react';
import { useScrollReveal } from '../utils/motion';

export default function AboutView() {
  const { ref: milestonesRef, isRevealed } = useScrollReveal();

  const milestones = [
    {
      year: '2023',
      title: 'Studio Founded',
      desc: 'Started as a focused web studio building custom websites and web applications.'
    },
    {
      year: '2024',
      title: 'Mobile App Development',
      desc: 'Expanded into cross-platform mobile development using React Native and Expo.'
    },
    {
      year: '2025',
      title: 'Management & Finance Platforms',
      desc: 'Launched major web platforms, including PID Education and Hisaab, serving active monthly users.'
    },
    {
      year: '2026',
      title: 'Expanding Client Reach',
      desc: 'Delivering custom websites and apps for growing businesses across multiple industries.'
    }
  ];

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">ABOUT US</div>
          <h1 className="headline-mega dark">OUR STORY.</h1>
          <p className="hero-subcopy">
            We help businesses build clean, fast, and reliable digital products that deliver real results.
          </p>
        </div>
      </div>

      <div className="container page-content-container">
        <div className="intro-grid" style={{ marginBottom: '90px' }}>
          <div>
            <div className="sub-title">OUR MISSION</div>
            <h2 className="headline-section">HELPING BUSINESSES GROW ONLINE.</h2>
            <p style={{ color: 'var(--text-dark-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '18px' }}>
              Founded by Rahul, Gulesh Patel, and Nitin Sinha, LeoVantage Web Studio was established with a simple goal:
              to help businesses create websites and apps that are easy to use and support real business growth.
            </p>
            <p style={{ color: 'var(--text-dark-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '14px' }}>
              We believe a website should be more than an online brochure. It should be fast, clear, and focused on
              helping your visitors find what they need and take action.
            </p>
          </div>
          <div
            ref={milestonesRef}
            className={`milestones-card ${isRevealed ? 'is-revealed' : ''}`}
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
