import React, { useState } from 'react';
import { submitContactInquiry } from '../services/publicContentService';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: 'Immediately (Within 3 weeks)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitContactInquiry(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        timeline: 'Immediately (Within 3 weeks)',
        message: ''
      });
    } catch (err) {
      console.error('[LeoVantage Contact Form Error]:', err);
      setErrorMessage(err.message || 'Unable to send your inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">GET IN TOUCH</div>
          <h1 className="headline-mega">CONTACT US.</h1>
          <p className="hero-subcopy">
            Tell us about your project goals, timeline, and requirements. We reply within 24 hours.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout-grid">
          {/* Left: Project Brief Form */}
          <div className="contact-form-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '24px', color: 'var(--text-dark)' }}>
              Start a Project
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="e.g. Anand Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="anand@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Needed *</label>
                  <select
                    id="service"
                    className="form-control"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service...</option>
                    <option value="Custom Web Development">Custom Web Development</option>
                    <option value="UI/UX & Design Systems">UI/UX &amp; Design Systems</option>
                    <option value="Mobile App (React Native)">Mobile App (React Native)</option>
                    <option value="Education / School Platform">Education / School Platform</option>
                    <option value="E-Commerce & Storefront">E-Commerce &amp; Storefront</option>
                    <option value="SEO & Speed Audit">SEO &amp; Speed Audit</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget Range *</label>
                  <select
                    id="budget"
                    className="form-control"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Budget Range...</option>
                    <option value="₹40,000 - ₹75,000">₹40,000 – ₹75,000 (Starter)</option>
                    <option value="₹75,000 - ₹1,50,000">₹75,000 – ₹1,50,000 (Growth)</option>
                    <option value="₹1,50,000 - ₹3,00,000">₹1,50,000 – ₹3,00,000 (Custom App)</option>
                    <option value="₹3,00,000+">₹3,00,000+ (Enterprise ERP)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Desired Timeline</label>
                  <select
                    id="timeline"
                    className="form-control"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="Immediately (Within 3 weeks)">Immediately (Within 3 weeks)</option>
                    <option value="1 to 2 Months">1 to 2 Months</option>
                    <option value="3+ Months">3+ Months</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="4"
                  placeholder="Tell us what you want to build, key features you need, and any reference websites..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-pill-mint"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'wait' : 'pointer'
                }}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}</span>
                <span className="btn-arrow">↗</span>
              </button>

              {errorMessage && (
                <div
                  className="form-error-banner"
                  role="alert"
                  aria-live="polite"
                  style={{
                    display: 'block',
                    marginTop: '16px',
                    padding: '14px 18px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(244, 63, 94, 0.12)',
                    border: '1px solid #F43F5E',
                    color: '#F43F5E',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    animation: 'fadeIn 0.3s ease-out'
                  }}
                >
                  ⚠️ {errorMessage}
                </div>
              )}

              {submitted && (
                <div
                  className="form-success-banner"
                  role="alert"
                  aria-live="polite"
                  style={{ display: 'block', animation: 'fadeIn 0.3s ease-out' }}
                >
                  🎉 Thank you! Your message has been received. We will get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>

          {/* Right: Direct Contact & Location Map */}
          <div className="contact-info-col">
            <div className="contact-card-item">
              <div className="contact-icon-bubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dark-secondary)' }}>
                  Direct Email
                </strong>
                {/* PLACEHOLDER: replace with verified studio email */}
                <a href="mailto:hello@leovantage.com" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-navy)' }}>
                  hello@leovantage.com
                </a>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-bubble">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dark-secondary)' }}>
                  Call &amp; WhatsApp
                </strong>
                {/* PLACEHOLDER: replace with verified phone number */}
                <a href="tel:+919876543210" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-navy)' }}>
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Stylized CSS Map Card */}
            <div className="styled-map-container" title="LeoVantage Web Studio Headquarters">
              <div className="map-grid-mesh" />
              <div className="map-pin-pulse">
                <div className="map-pin-bubble">LEOVANTAGE WEB STUDIO</div>
                {/* PLACEHOLDER: replace with real city/address */}
                <span style={{ fontSize: '0.76rem', color: 'var(--brand-lime)', fontWeight: 600 }}>
                  Bengaluru, Karnataka, India
                </span>
              </div>
            </div>

            {/* Schedule Call Callout */}
            <div
              style={{
                background: 'var(--brand-navy)',
                padding: '30px',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--text-light)',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', marginBottom: '8px', color: 'var(--text-light)' }}>
                Prefer a direct conversation?
              </h4>
              <p style={{ color: 'var(--text-light-secondary)', fontSize: '0.85rem', marginBottom: '18px' }}>
                Book a 20-minute video call to discuss your project requirements with our founders.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-mint"
                style={{ justifyContent: 'center', width: '100%' }}
              >
                <span>SCHEDULE A 20-MIN CALL</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
