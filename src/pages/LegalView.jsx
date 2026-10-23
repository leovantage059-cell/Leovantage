import React from 'react';

export function PrivacyView() {
  return (
    <div className="page-view" style={{ background: 'var(--surface-light)' }}>
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">LEGAL COMPLIANCE</div>
          <h1 className="headline-mega">PRIVACY POLICY.</h1>
          <p className="hero-subcopy">Last updated: October 2026 • LeoVantage Web Studio</p>
        </div>
      </div>
      <div className="container-narrow" style={{ padding: '80px 24px', lineHeight: 1.8, color: 'var(--text-dark-secondary)' }}>
        <div style={{ background: '#FFFFFF', padding: '48px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: '0 0 12px 0' }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '28px' }}>
            LeoVantage Web Studio collects personal information that you provide voluntarily when submitting project inquiries,
            subscribing to our email communications, or engaging our engineering services. This may include your name, email address,
            phone number, and project specifications.
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: '30px 0 12px 0' }}>
            2. How We Use Your Data
          </h2>
          <p style={{ marginBottom: '28px' }}>
            We use your information solely to deliver customized development proposals, fulfill contractual agreements,
            communicate project status updates, and continuously improve our website performance. We never sell or lease your
            information to third-party data brokers.
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: '30px 0 12px 0' }}>
            3. Data Security &amp; Storage
          </h2>
          <p>
            All sensitive client communication is stored within encrypted environments utilizing industry standard TLS/SSL certificates
            and secure cloud databases. Client intellectual property and source code remain completely confidential.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsView() {
  return (
    <div className="page-view" style={{ background: 'var(--surface-light)' }}>
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">TERMS &amp; CONDITIONS</div>
          <h1 className="headline-mega">TERMS OF SERVICE.</h1>
          <p className="hero-subcopy">Last updated: October 2026 • LeoVantage Web Studio</p>
        </div>
      </div>
      <div className="container-narrow" style={{ padding: '80px 24px', lineHeight: 1.8, color: 'var(--text-dark-secondary)' }}>
        <div style={{ background: '#FFFFFF', padding: '48px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: '0 0 12px 0' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ marginBottom: '28px' }}>
            By engaging LeoVantage Web Studio or accessing our online services, you agree to be bound by these Terms of Service,
            all applicable laws, and regulations governing digital software development.
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: '30px 0 12px 0' }}>
            2. Intellectual Property Rights
          </h2>
          <p style={{ marginBottom: '28px' }}>
            Upon final settlement of all agreed project invoices, 100% of the custom source code, design assets, and documentation
            created specifically for the client are assigned in full to the client.
          </p>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)', margin: '30px 0 12px 0' }}>
            3. Warranties &amp; SLA
          </h2>
          <p>
            We warrant that custom code developed by LeoVantage Web Studio will operate materially in accordance with agreed
            specifications for a period of 30 days post-launch. Extended warranty retainers are available.
          </p>
        </div>
      </div>
    </div>
  );
}
