import React, { useState } from 'react';
import { FOUNDERS } from '../data/team';
import { useScrollReveal } from '../utils/motion';
import FounderDetailModal from './FounderDetailModal';

export default function TeamSection({ navigate }) {
  const { ref: sectionRef, isRevealed } = useScrollReveal();
  const [selectedFounder, setSelectedFounder] = useState(null);

  return (
    <section className={`section-team ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="sub-title">LEADERSHIP</div>
            <h2 className="headline-section">THE MINDS BEHIND.</h2>
          </div>
          <a
            href="#/team"
            className="btn-pill-dark"
            onClick={(e) => {
              e.preventDefault();
              navigate('team');
            }}
          >
            <span>MEET FULL TEAM</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>

        {/* SVG Definition for Reference Image 2 Scallop 3-Arch Silhouette */}
        <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }}>
          <defs>
            <clipPath id="arch-trio-clip" clipPathUnits="objectBoundingBox">
              <rect x="0.01" y="0.06" width="0.36" height="0.90" rx="0.18" ry="0.14" />
              <rect x="0.31" y="0.01" width="0.38" height="0.96" rx="0.19" ry="0.14" />
              <rect x="0.63" y="0.06" width="0.36" height="0.90" rx="0.18" ry="0.14" />
            </clipPath>
          </defs>
        </svg>

        {/* Reference Image Inspired Clean Founder Cards */}
        <div className="team-grid founder-editorial-grid">
          {FOUNDERS.map((founder, idx) => (
            <div
              key={founder.id}
              className="founder-card-editorial"
              style={{ '--card-idx': idx }}
              onClick={() => setSelectedFounder(founder)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedFounder(founder);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View profile and bio of ${founder.name}, ${founder.role}`}
            >
              {/* Sculptural Arched Photo Canvas */}
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

              {/* Minimal Clean Card Footer: Name, Role & Arrow Action */}
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
      </div>

      {/* Blurred Backdrop Detail Modal */}
      <FounderDetailModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
      />
    </section>
  );
}
