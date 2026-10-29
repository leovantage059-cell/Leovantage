import React, { useEffect } from 'react';

export default function FounderDetailModal({ founder, onClose }) {
  useEffect(() => {
    if (!founder) return;

    // Lock background page scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Close on Escape key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [founder, onClose]);

  if (!founder) return null;

  return (
    <div
      className="founder-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="founderModalName"
    >
      <div
        className="founder-modal-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Floating Close Button */}
        <button
          type="button"
          className="founder-modal-close"
          onClick={onClose}
          aria-label="Close detail modal"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="founder-modal-grid">
          {/* Left Column: Portrait & Quick Meta */}
          <div className="founder-modal-left">
            <div className="founder-modal-photo-wrap">
              <img
                src={founder.image}
                alt={founder.name}
                className="founder-modal-img"
              />
              <div className="founder-photo-pill-badge">
                <span className="live-dot" />
                <span>LEADERSHIP</span>
              </div>
            </div>

            <div className="founder-quick-metrics">
              <div className="quick-metric-item">
                <span className="metric-label">EXPERIENCE</span>
                <span className="metric-val">{founder.experience || '8+ Years'}</span>
              </div>
              <div className="quick-metric-item">
                <span className="metric-label">LOCATION</span>
                <span className="metric-val">{founder.location || 'Bengaluru, India'}</span>
              </div>
            </div>

            {/* Social / Direct Connect Buttons */}
            <div className="founder-connect-row">
              <a
                href={founder.social?.linkedin || '#'}
                target="_blank"
                rel="noreferrer"
                className="founder-social-btn"
                title="LinkedIn Profile"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${founder.social?.email || 'hello@leovantage.com'}`}
                className="founder-social-btn primary"
                title="Send Email"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                <span>Direct Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Story, Milestones & Skills */}
          <div className="founder-modal-right">
            <div className="sub-title">LEADERSHIP</div>
            <h2 id="founderModalName" className="founder-modal-name">
              {founder.name}
            </h2>
            <div className="founder-modal-role">{founder.role}</div>

            {founder.quote && (
              <blockquote className="founder-modal-quote">
                "{founder.quote}"
              </blockquote>
            )}

            <div className="founder-modal-bio-block">
              <h4 className="founder-block-title">BACKGROUND &amp; ROLE</h4>
              <p className="founder-modal-bio-text">
                {founder.extendedBio || founder.bio}
              </p>
            </div>

            {founder.highlights && founder.highlights.length > 0 && (
              <div className="founder-highlights-block">
                <h4 className="founder-block-title">KEY EXPERIENCE</h4>
                <ul className="founder-highlights-list">
                  {founder.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="founder-skills-block">
              <h4 className="founder-block-title">CORE SKILLS &amp; EXPERTISE</h4>
              <div className="founder-skills-pills">
                {founder.skills.map((skill) => (
                  <span key={skill} className="founder-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="founder-modal-cta-row">
              <a
                href={`mailto:${founder.social?.email || 'hello@leovantage.com'}?subject=Inquiry%20via%20LeoVantage%20Website`}
                className="btn-pill-dark"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>GET IN TOUCH WITH {founder.name.toUpperCase()}</span>
                <span className="btn-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
