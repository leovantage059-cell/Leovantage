import React, { useState } from 'react';
import Logo from './Logo';

export default function Footer({ navigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleLink = (route, e) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col-brand">
            <a
              href="#/home"
              className="brand-logo-wrap"
              style={{ marginBottom: '20px', display: 'inline-block' }}
              onClick={(e) => handleLink('home', e)}
              aria-label="LeoVantage Web Studio Home"
            >
              <Logo variant="horizontal" theme="dark" height={48} />
            </a>
            <p className="footer-brand-desc">
              A premium software engineering and design collective dedicated to building high-converting web
              applications, mobile platforms, and digital brand identities.
            </p>
            <div className="footer-social-row">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="X / Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="footer-col-title">NAVIGATION</div>
            <ul className="footer-links-list">
              <li>
                <span className="footer-link" onClick={(e) => handleLink('home', e)}>
                  Home
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  Services &amp; Pricing
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('work', e)}>
                  Featured Work
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('process', e)}>
                  Our Process
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('team', e)}>
                  Team &amp; Culture
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('reviews', e)}>
                  Client Reviews
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <div className="footer-col-title">CAPABILITIES</div>
            <ul className="footer-links-list">
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  Custom Web Apps
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  React Native Mobile
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  Education ERPs
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  UI/UX Systems
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  D2C E-Commerce
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={(e) => handleLink('services', e)}>
                  Speed Optimization
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <div className="footer-col-title">THE STUDIO DISPATCH</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted-light)', marginBottom: '14px' }}>
              Receive monthly engineering essays and design insights. No spam ever.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-submit">
                JOIN
              </button>
            </form>
            {subscribed && (
              <div style={{ color: 'var(--brand-lime)', fontSize: '0.8rem', marginBottom: '12px' }}>
                ✓ Subscribed to LeoVantage Dispatch!
              </div>
            )}
            <div style={{ fontSize: '0.82rem', color: 'var(--muted-light)' }}>
              {/* PLACEHOLDER: replace with real contact information */}
              <span>📍 HQ: Bengaluru, Karnataka, India</span>
              <br />
              <span>✉️ contact: hello@leovantage.com</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-bar">
          <div>© 2026 LeoVantage Web Studio. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span className="footer-link" onClick={(e) => handleLink('privacy', e)}>
              Privacy Policy
            </span>
            <span className="footer-link" onClick={(e) => handleLink('terms', e)}>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
