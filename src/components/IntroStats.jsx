import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../utils/motion';

export default function IntroStats() {
  const targets = {
    projects: 85,
    satisfaction: 99,
    years: 6,
    countries: 14
  };

  const [counts, setCounts] = useState(targets);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);
  const animatedRef = useRef(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          setIsRevealed(true);
          if (!prefersReduced) {
            animateNumbers();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReduced]);

  const animateNumbers = () => {
    const duration = 1000;
    const steps = 24;
    const intervalTime = duration / steps;
    let step = 0;

    // Reset to 0 and animate up once
    setCounts({ projects: 0, satisfaction: 0, years: 0, countries: 0 });

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Soft ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        projects: Math.round(targets.projects * eased),
        satisfaction: Math.round(targets.satisfaction * eased),
        years: Math.round(targets.years * eased),
        countries: Math.round(targets.countries * eased)
      });

      if (progress >= 1) clearInterval(timer);
    }, intervalTime);
  };

  return (
    <section className={`section-intro ${isRevealed ? 'is-revealed' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="intro-grid">
          <div>
            <div className="sub-title">WHO WE ARE</div>
            <h2 className="intro-statement">
              We build websites and apps that help businesses <span className="highlight-word">serve their customers better</span>.
            </h2>
          </div>
          <div className="intro-details-col">
            <p className="intro-body-copy">
              LeoVantage Web Studio helps businesses plan, design, and build websites and apps. We focus on clear design,
              reliable performance, and an easy experience for the people who use them.
            </p>
            {/* Animated Counters */}
            <div className="stats-counters-grid">
              <div
                className="stat-counter-card"
                role="group"
                aria-label={`${targets.projects}+ Projects Completed`}
              >
                <div className="stat-number" aria-hidden="true">{counts.projects}+</div>
                <div className="stat-label">Projects Completed</div>
                <span className="sr-only">{targets.projects}+ Projects Completed</span>
              </div>
              <div
                className="stat-counter-card"
                role="group"
                aria-label={`${targets.satisfaction}% Client Satisfaction`}
              >
                <div className="stat-number" aria-hidden="true">{counts.satisfaction}%</div>
                <div className="stat-label">Client Satisfaction</div>
                <span className="sr-only">{targets.satisfaction}% Client Satisfaction</span>
              </div>
              <div
                className="stat-counter-card"
                role="group"
                aria-label={`${targets.years}+ Years of Experience`}
              >
                <div className="stat-number" aria-hidden="true">{counts.years}+</div>
                <div className="stat-label">Years of Experience</div>
                <span className="sr-only">{targets.years}+ Years of Experience</span>
              </div>
              <div
                className="stat-counter-card"
                role="group"
                aria-label={`${targets.countries}+ Countries Served`}
              >
                <div className="stat-number" aria-hidden="true">{counts.countries}+</div>
                <div className="stat-label">Countries Served</div>
                <span className="sr-only">{targets.countries}+ Countries Served</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
