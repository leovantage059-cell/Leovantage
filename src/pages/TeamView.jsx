import React, { useState } from 'react';
import { FOUNDERS, CORE_TEAM, VALUES } from '../data/team';
import { useScrollReveal } from '../utils/motion';
import FounderDetailModal from '../components/FounderDetailModal';

export default function TeamView({ navigate }) {
  const { ref: foundersRef, isRevealed: foundersRevealed } = useScrollReveal();
  const { ref: specialistsRef, isRevealed: specialistsRevealed } = useScrollReveal();
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">THE COLLECTIVE</div>
          <h1 className="headline-mega dark">PEOPLE FIRST.</h1>
          <p className="hero-subcopy">
            A small, elite squad of developers, designers, and strategists obsessed with perfection.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '90px 24px' }}>
        {/* Founders Block */}
        <div style={{ marginBottom: '30px' }}>
          <div className="sub-title">CO-FOUNDERS</div>
          <h2 className="headline-section">FOUNDING TEAM.</h2>
        </div>

        {/* SVG Definition for Reference Image 2 Scallop 3-Arch Silhouette */}
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }}>
          <defs>
            <clipPath id="arch-trio-clip-teamview" clipPathUnits="objectBoundingBox">
              <rect x="0.01" y="0.06" width="0.36" height="0.90" rx="0.18" ry="0.14" />
              <rect x="0.31" y="0.01" width="0.38" height="0.96" rx="0.19" ry="0.14" />
              <rect x="0.63" y="0.06" width="0.36" height="0.90" rx="0.18" ry="0.14" />
            </clipPath>
          </defs>
        </svg>

        <div
          ref={foundersRef}
          className={`team-grid founder-editorial-grid ${foundersRevealed ? 'is-revealed' : ''}`}
          style={{ marginBottom: '80px' }}
        >
          {FOUNDERS.map((founder, idx) => (
            <div
              key={founder.id}
              className="founder-card-editorial"
              style={{ '--card-idx': idx }}
              onClick={() => setSelectedMember(founder)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMember(founder);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View profile and bio of ${founder.name}, ${founder.role}`}
            >
              <div className="founder-card-stage">
                <div className="founder-photo-clip-wrap">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="founder-card-photo"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="founder-card-footer">
                <div className="founder-card-titles">
                  <h3 className="founder-card-name">{founder.name}</h3>
                  <div className="founder-card-role">{founder.role}</div>
                </div>
                <div className="founder-card-arrow-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.4" fill="none">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Team Members */}
        <div style={{ marginBottom: '30px' }}>
          <div className="sub-title">CORE SPECIALISTS</div>
          <h2 className="headline-section">ENGINEERING &amp; DESIGN SQUAD.</h2>
        </div>

        <div
          ref={specialistsRef}
          className={`team-grid ${specialistsRevealed ? 'is-revealed' : ''}`}
          style={{ marginBottom: '80px' }}
        >
          {CORE_TEAM.map((member, idx) => (
            <div
              key={member.id}
              className="team-card"
              style={{ '--card-idx': idx }}
              tabIndex={0}
            >
              <div className="team-avatar-box">
                {member.initials}
              </div>
              <h3 className="team-name">{member.name}</h3>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
              <div className="team-skills-row">
                {member.skills.map((s) => (
                  <span key={s} className="team-skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Values / Culture Block (Deliberate Navy Moment - Typographic and Clean) */}
        <div
          style={{
            background: 'var(--brand-navy)',
            borderRadius: 'var(--radius-xl)',
            padding: '60px 50px',
            color: 'var(--text-light)',
            marginBottom: '70px',
            border: '1px solid rgba(245, 247, 242, 0.1)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <div className="sub-title light">OUR DNA</div>
            <h2 className="headline-section light">WHAT WE STAND FOR.</h2>
          </div>
          <div className="pricing-table-grid" style={{ marginTop: 0 }}>
            {VALUES.map((val) => (
              <div key={val.title}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--brand-lime)', marginBottom: '10px' }}>
                  {val.title}
                </h3>
                <p style={{ color: 'var(--text-light-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Careers Teaser (Light Neutral Panel) */}
        <div
          style={{
            textAlign: 'center',
            padding: '50px 30px',
            background: 'var(--surface-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '10px' }}>
            Want to build the future of the web with us?
          </h3>
          <p style={{ color: 'var(--text-dark-secondary)', fontSize: '0.95rem', marginBottom: '24px' }}>
            We're always looking for senior frontend engineers and meticulous UI designers.
          </p>
          <a
            href="mailto:careers@leovantage.com"
            className="btn-pill-dark"
          >
            <span>JOIN THE STUDIO SQUAD</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>

      <FounderDetailModal
        founder={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
