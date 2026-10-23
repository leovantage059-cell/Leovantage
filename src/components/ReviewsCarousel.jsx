import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { useScrollReveal, usePrefersReducedMotion } from '../utils/motion';

export default function ReviewsCarousel({ navigate }) {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const { ref: sectionRef, isRevealed } = useScrollReveal();

  // Duplicate reviews array to create seamless infinite right-to-left marquee loop
  const displayReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className={`section-reviews ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="sub-title">TESTIMONIALS</div>
            <h2 className="headline-section">CLIENT EXPERIENCES.</h2>
          </div>
          <a
            href="#/reviews"
            className="btn-pill-dark"
            onClick={(e) => {
              e.preventDefault();
              navigate('reviews');
            }}
          >
            <span>ALL REVIEWS (4.9/5)</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
      </div>

      {/* Infinite Seamless Right-to-Left Continuous Loop Marquee */}
      <div
        className="reviews-marquee-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        role="region"
        aria-label="Client Testimonials Continuous Feed"
        tabIndex={0}
      >
        <div
          className={`reviews-marquee-track ${isPaused ? 'is-paused' : ''}`}
          style={{
            animationPlayState: prefersReduced ? 'paused' : (isPaused ? 'paused' : 'running')
          }}
        >
          {displayReviews.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="review-card"
              tabIndex={0}
            >
              <div>
                {rev.project && (
                  <div className="project-pill">
                    {rev.project}
                  </div>
                )}
                <div className="review-stars" aria-label={`${rev.stars} out of 5 stars`}>
                  {'★'.repeat(rev.stars)}
                </div>
                <blockquote className="review-quote">{rev.quote}</blockquote>
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
    </section>
  );
}
