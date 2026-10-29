import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data/projects';
import { getProjectBySlug } from '../services/publicContentService';
import { useScrollReveal } from '../utils/motion';

export default function CaseStudyView({ slug, navigate }) {
  const [project, setProject] = useState(() => PROJECTS.find((p) => p.id === slug) || PROJECTS[0]);

  useEffect(() => {
    let isMounted = true;
    getProjectBySlug(slug).then((proj) => {
      if (isMounted && proj) {
        setProject(proj);
      }
    });
    return () => { isMounted = false; };
  }, [slug]);

  const { ref: contentRef, isRevealed } = useScrollReveal();

  return (
    <div className="page-view">
      <div className="case-study-hero" id="caseStudyHero">
        <div className="container">
          <a
            href="#/work"
            className="btn-link-subtle"
            style={{ marginBottom: '24px' }}
            onClick={(e) => {
              e.preventDefault();
              navigate('work');
            }}
          >
            ← BACK TO ALL PROJECTS
          </a>
          <div className="sub-title light">{project.categoryLabel}</div>
          <h1 className="headline-mega">{project.title.toUpperCase()}.</h1>
          <p className="hero-subcopy">{project.tagline}</p>
        </div>
      </div>

      <div className={`case-study-content ${isRevealed ? 'is-revealed' : ''}`} ref={contentRef}>
        <div className="container">
          {/* Meta Grid */}
          <div className="cs-meta-grid">
            <div className="cs-meta-item">
              <strong>CLIENT</strong>
              <span>{project.client}</span>
            </div>
            <div className="cs-meta-item">
              <strong>INDUSTRY</strong>
              <span>{project.industry}</span>
            </div>
            <div className="cs-meta-item">
              <strong>TIMELINE</strong>
              <span>{project.timeline}</span>
            </div>
            <div className="cs-meta-item">
              <strong>ROLE</strong>
              <span>{project.role}</span>
            </div>
          </div>

          {/* Problem vs Solution */}
          <div className="cs-split-story">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '14px' }}>
                The Challenge
              </h3>
              <p style={{ color: 'var(--text-dark-secondary)', lineHeight: 1.7 }}>{project.problem}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '14px' }}>
                Our Solution
              </h3>
              <p style={{ color: 'var(--text-dark-secondary)', lineHeight: 1.7 }}>{project.solution}</p>
            </div>
          </div>

          {/* Key Results Stats */}
          <div className="cs-stats-banner">
            {project.stats.map((stat, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    color: 'var(--brand-lime)'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Mockup Frame */}
          <div className="cs-mockup-panel">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--text-dark)', marginBottom: '22px' }}>
              INTERFACE &amp; SYSTEM PREVIEW
            </h3>
            <div className="cs-mockup-frame">
              <div
                style={{
                  height: '32px',
                  background: 'rgba(11, 16, 32, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 14px',
                  gap: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span className="mock-dot red" />
                <span className="mock-dot yellow" />
                <span className="mock-dot green" />
                <span style={{ marginLeft: '10px', fontSize: '0.66rem', color: 'rgba(245, 247, 242, 0.5)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
                  {project.categoryLabel}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(180deg, #121A2E 0%, #0B1020 100%)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'var(--brand-lime)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {project.mockTitle}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginTop: '10px', maxWidth: '520px' }}>
                  Fast performance, clean design, and reliable cross-platform functionality for {project.client}.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#FFFFFF'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="cs-quote-card">
            <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '14px', lineHeight: 1.6 }}>
              {project.quote}
            </p>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-navy)' }}>
              {project.author}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="cs-bottom-nav">
            <a
              href="#/work"
              className="btn-pill-dark"
              onClick={(e) => {
                e.preventDefault();
                navigate('work');
              }}
            >
              ← ALL PROJECTS
            </a>
            <a
              href="#/contact"
              className="btn-pill-mint"
              onClick={(e) => {
                e.preventDefault();
                navigate('contact');
              }}
            >
              START A SIMILAR PROJECT ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
