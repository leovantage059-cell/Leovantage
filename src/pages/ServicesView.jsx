import React from 'react';
import { SERVICES, PRICING_PACKAGES } from '../data/services';
import { useScrollReveal } from '../utils/motion';

export default function ServicesView({ navigate }) {
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: pricingRef, isRevealed: pricingRevealed } = useScrollReveal();

  const getIcon = (id) => {
    switch (id) {
      case 'web-dev':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'ui-ux':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        );
      case 'mobile-app':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        );
      case 'education':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case 'ecommerce':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        );
      case 'seo-perf':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        );
      case 'branding':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        );
    }
  };

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">OUR CAPABILITIES</div>
          <h1 className="headline-mega dark">SERVICES &amp; PACKAGES.</h1>
          <p className="hero-subcopy">
            Engineered for high performance, intuitive human experiences, and continuous conversion.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '90px 24px' }}>
        {/* 8 Full Services Grid */}
        <div
          ref={servicesRef}
          className={`services-grid-home ${servicesRevealed ? 'is-revealed' : ''}`}
          style={{ marginBottom: '90px' }}
        >
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="service-card"
              style={{ '--card-idx': index % 4 }}
              tabIndex={0}
            >
              <div className="service-icon-box">{getIcon(service.id)}</div>
              <h3 className="service-title">{`${index + 1}. ${service.title}`}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-bullets">
                {service.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="service-card-footer">
                <span className="service-timeline-tag">{service.timeline}</span>
                <a
                  href="#/contact"
                  className="btn-pill-dark"
                  style={{ padding: '8px 18px', fontSize: '0.72rem' }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('contact');
                  }}
                  aria-label={`Get quote for ${service.title}`}
                >
                  QUOTE ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Packages Block */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="sub-title">TRANSPARENT PRICING</div>
          <h2 className="headline-section">INVESTMENT PLANS.</h2>
          <p style={{ color: 'var(--text-dark-secondary)', maxWidth: '600px', margin: '12px auto 0 auto' }}>
            Choose a tier that matches your business scale. Custom enterprise quotes available upon request.
          </p>
        </div>

        <div
          ref={pricingRef}
          className={`pricing-table-grid ${pricingRevealed ? 'is-revealed' : ''}`}
        >
          {PRICING_PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`pricing-card ${pkg.featured ? 'featured' : ''}`}>
              {pkg.badge && <div className="pricing-badge-popular">{pkg.badge}</div>}
              <div className="pricing-plan-name">{pkg.name}</div>
              <p
                style={{
                  color: pkg.featured ? 'var(--text-light-secondary)' : 'var(--text-dark-secondary)',
                  fontSize: '0.88rem',
                  marginBottom: '18px'
                }}
              >
                {pkg.subtitle}
              </p>
              <div className="pricing-price-tag">
                {pkg.price} <span>{pkg.unit}</span>
              </div>
              <ul className="pricing-features-list">
                {pkg.features.map((feat, idx) => (
                  <li key={idx}>✓ {feat}</li>
                ))}
              </ul>
              <a
                href="#/contact"
                className={pkg.btnClass}
                style={{ justifyContent: 'center' }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('contact');
                }}
              >
                {pkg.btnText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
