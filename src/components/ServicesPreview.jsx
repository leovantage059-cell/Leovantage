import React from 'react';
import { SERVICES } from '../data/services';
import { useScrollReveal } from '../utils/motion';

export default function ServicesPreview({ navigate }) {
  const previewServices = SERVICES.slice(0, 6);
  const { ref: sectionRef, isRevealed } = useScrollReveal();

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
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        );
    }
  };

  return (
    <section className={`section-services ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="sub-title">OUR SERVICES</div>
            <h2 className="headline-section">SERVICES WE PROVIDE</h2>
          </div>
          <a
            href="#/services"
            className="btn-pill-dark"
            onClick={(e) => {
              e.preventDefault();
              navigate('services');
            }}
          >
            <span>VIEW ALL SERVICES</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>

        <div className="services-grid-home">
          {previewServices.map((service, idx) => (
            <div
              key={service.id}
              className="service-card"
              style={{ '--card-idx': idx }}
            >
              <div className="service-icon-box">{getIcon(service.id)}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <ul className="service-bullets">
                {service.deliverables.slice(0, 3).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="service-card-footer">
                <span className="service-timeline-tag">{service.timeline}</span>
                <a
                  href="#/services"
                  className="service-arrow-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('services');
                  }}
                  aria-label={`View ${service.title} details`}
                >
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
