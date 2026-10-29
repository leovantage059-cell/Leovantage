import React from 'react';
import { REVIEWS, RATING_SUMMARY } from '../data/reviews';
import { useScrollReveal, usePrefersReducedMotion } from '../utils/motion';

export default function ReviewsView() {
  const { ref: summaryRef, isRevealed: summaryRevealed } = useScrollReveal({ threshold: 0.1 });
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ threshold: 0.05 });
  const prefersReduced = usePrefersReducedMotion();

  const getBarWidth = (pct) => {
    if (prefersReduced || summaryRevealed) return pct;
    return '0%';
  };

  return (
    <div className="page-view">
      <div className="page-hero-light">
        <div className="container">
          <div className="sub-title">CLIENT REVIEWS</div>
          <h1 className="headline-mega dark">WHAT CLIENTS SAY.</h1>
          <p className="hero-subcopy">
            Read feedback from founders, business owners, and product teams who work with LeoVantage.
          </p>
        </div>
      </div>

      <div className="container reviews-view-container">
        {/* Rating Summary Bar Breakdown */}
        <div
          ref={summaryRef}
          className={`rating-summary-card ${summaryRevealed ? 'is-revealed' : ''}`}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4.8rem',
                fontWeight: 900,
                lineHeight: 1,
                color: 'var(--brand-navy)'
              }}
            >
              {RATING_SUMMARY.score}
            </div>
            <div className="review-stars" style={{ fontSize: '1.4rem', margin: '8px 0', color: '#F59E0B' }}>
              ★★★★★
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dark-secondary)', fontWeight: 600 }}>
              Based on {RATING_SUMMARY.reviewsCount} client reviews
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-dark)' }}>
              <span style={{ width: '55px', fontWeight: 600 }}>5 Stars</span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(18, 26, 46, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: getBarWidth(RATING_SUMMARY.fiveStarPct),
                    height: '100%',
                    background: 'var(--brand-navy)',
                    borderRadius: '4px',
                    transition: prefersReduced ? 'none' : 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{RATING_SUMMARY.fiveStarPct}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-dark)' }}>
              <span style={{ width: '55px', fontWeight: 600 }}>4 Stars</span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(18, 26, 46, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: getBarWidth(RATING_SUMMARY.fourStarPct),
                    height: '100%',
                    background: 'var(--brand-navy)',
                    borderRadius: '4px',
                    transition: prefersReduced ? 'none' : 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                  }}
                />
              </div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{RATING_SUMMARY.fourStarPct}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-dark)' }}>
              <span style={{ width: '55px', fontWeight: 600 }}>3 Stars</span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(18, 26, 46, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: getBarWidth(RATING_SUMMARY.threeStarPct),
                    height: '100%',
                    background: 'var(--brand-navy)',
                    borderRadius: '4px',
                    transition: prefersReduced ? 'none' : 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                  }}
                />
              </div>
              <span style={{ fontWeight: 700, width: '40px', textAlign: 'right' }}>{RATING_SUMMARY.threeStarPct}</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          ref={gridRef}
          className={`reviews-page-grid ${gridRevealed ? 'is-revealed' : ''}`}
        >
          {REVIEWS.map((rev, idx) => (
            <div
              key={rev.id}
              className="review-card"
              style={{ minWidth: 0, maxWidth: 'none', '--card-idx': idx % 6 }}
              tabIndex={0}
            >
              <div>
                <div className="project-pill" style={{ width: 'fit-content', marginBottom: '12px' }}>
                  {rev.project}
                </div>
                <div className="review-stars" aria-label={`${rev.stars} stars`}>
                  {'★'.repeat(rev.stars)}
                </div>
                <p className="review-quote">{rev.quote}</p>
              </div>
              <div className="reviewer-meta">
                <div className="reviewer-avatar" aria-hidden="true">{rev.initials}</div>
                <div>
                  <div className="reviewer-name">{rev.name}</div>
                  <div className="reviewer-role">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
