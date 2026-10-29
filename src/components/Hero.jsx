import React, { useRef, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../utils/motion';
import { getSiteHero } from '../services/publicContentService';

export default function Hero({ navigate }) {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const mockupRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customHero, setCustomHero] = useState(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    setIsLoaded(true);
    let isMounted = true;
    getSiteHero().then((h) => {
      if (isMounted && h) setCustomHero(h);
    });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    const mockup = mockupRef.current;
    if (mockup) {
      if (isPlaying || prefersReduced) {
        mockup.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.02)';
      } else {
        mockup.style.transform = 'rotateX(16deg) rotateY(-8deg) rotateZ(3deg)';
      }
    }
  }, [isPlaying, prefersReduced]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReduced) return;

    let targetCursorX = window.innerWidth / 2;
    let targetCursorY = 320;
    let currentCursorX = targetCursorX;
    let currentCursorY = targetCursorY;
    let isHovering = false;
    let animId = null;

    let isHeroVisible = true;
    let scrollTicking = false;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible && !animId) {
          animId = requestAnimationFrame(updatePhysics);
        } else if (!isHeroVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { rootMargin: '100px 0px' }
    );
    heroObserver.observe(hero);

    const handleMouseMove = (e) => {
      if (!isHeroVisible) return;
      const rect = hero.getBoundingClientRect();
      targetCursorX = e.clientX - rect.left;
      targetCursorY = e.clientY - rect.top;
      isHovering = true;

      if (!animId) {
        animId = requestAnimationFrame(updatePhysics);
      }

      // Synchronize 3D laptop tilt if over/near mockup stage (only when not playing video)
      if (isPlayingRef.current) return;
      const stage = stageRef.current;
      const mockup = mockupRef.current;
      if (stage && mockup && window.innerWidth >= 768) {
        const stageRect = stage.getBoundingClientRect();
        const stageCenterX = stageRect.left + stageRect.width / 2;
        const stageCenterY = stageRect.top + stageRect.height / 2;
        const diffX = e.clientX - stageCenterX;
        const diffY = e.clientY - stageCenterY;

        const rotateX = -(diffY / stageRect.height) * 16 + 14;
        const rotateY = (diffX / stageRect.width) * 16 - 8;
        mockup.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(2deg)`;
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (isPlayingRef.current) return;
      const mockup = mockupRef.current;
      if (mockup) {
        mockup.style.transform = `rotateX(16deg) rotateY(-8deg) rotateZ(3deg)`;
      }
    };

    // Fluid physics loop that pauses when cursor is idle or hero is offscreen
    const updatePhysics = () => {
      if (!isHeroVisible) {
        animId = null;
        return;
      }

      const dx = targetCursorX - currentCursorX;
      const dy = targetCursorY - currentCursorY;
      currentCursorX += dx * 0.085;
      currentCursorY += dy * 0.085;

      hero.style.setProperty('--cursor-x', `${currentCursorX.toFixed(1)}px`);
      hero.style.setProperty('--cursor-y', `${currentCursorY.toFixed(1)}px`);
      hero.style.setProperty('--cursor-glow-opacity', isHovering ? '0.75' : '0.25');

      // If motion has settled and not hovering, pause rAF to save CPU/GPU
      if (!isHovering && Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    hero.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const updateScrollTilt = () => {
      if (isPlayingRef.current || !isHeroVisible || window.innerWidth < 768) {
        scrollTicking = false;
        return;
      }
      const scrollY = window.scrollY;
      const mockup = mockupRef.current;
      if (mockup && scrollY < 600) {
        const factor = Math.min(scrollY / 500, 1);
        const currentTiltX = 16 - 16 * factor;
        const currentTiltY = -8 + 8 * factor;
        const scale = 1 + 0.04 * factor;
        mockup.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) scale(${scale})`;
      }
      scrollTicking = false;
    };

    const handleResize = () => {
      if (window.innerWidth < 768 && mockupRef.current) {
        mockupRef.current.style.transform = '';
      }
    };

    const handleScroll = () => {
      if (!isHeroVisible || isPlayingRef.current) return;
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollTilt);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      heroObserver.disconnect();
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReduced]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <section className={`hero-section ${isLoaded ? 'hero-revealed' : ''}`} id="heroSection" ref={heroRef}>
      {/* Dynamic Purple-Lavender Mesh Gradient Aurora Blobs */}
      <div className="hero-mesh-backdrop" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
        <div className="mesh-orb mesh-orb-center" />
        <div className="mesh-silk-wave" />
        <div className="mesh-silk-ribbons" />
      </div>

      {/* Interactive Cursor Spotlight Follower (Toned down & balanced lighting) */}
      <div className="hero-cursor-follower" aria-hidden="true" />

      {/* Subtle organic film grain texture to eliminate banding and give silk tactile feel */}
      <div className="hero-noise-texture" aria-hidden="true" />

      {/* Background fluted lines texture */}
      <div className="hero-fluted-grid" />

      {/* Large faint background watermark typography */}
      <div className="hero-bg-text-top">SOFTWARE DEVELOPMENT</div>
      <div className="hero-bg-text-bottom">UI/UX DESIGN STUDIO</div>

      <div className="container hero-content">
        {/* Availability Pill */}
        <div className="status-pill">
          <span className="pulse-dot" />
          <span>
            {customHero?.badge && !customHero.badge.includes('Impactful Work')
              ? customHero.badge
              : 'Available for New Projects'}
          </span>
        </div>

        {/* Giant Headline */}
        <h1 className="headline-mega">
          {customHero?.headlinePart1 && !customHero.headlinePart1.includes('DESIGN. DEVELOP.') ? (
            <>
              {customHero.headlinePart1}<br />
              <span style={{ color: 'var(--brand-lime)' }}>
                {customHero.headlinePart2 && !customHero.headlinePart2.includes('DELIVER.') ? customHero.headlinePart2 : 'LAUNCH.'}
              </span>
            </>
          ) : (
            <>
              PLAN. BUILD.<br />
              <span style={{ color: 'var(--brand-lime)' }}>LAUNCH.</span>
            </>
          )}
        </h1>

        {/* Sub-copy */}
        <p className="hero-subcopy">
          {customHero?.subcopy && !customHero.subcopy.includes('Future-proof web solutions')
            ? customHero.subcopy
            : 'We design and build websites and apps that are easy to use and built around your business goals.'}
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <a
            href={`#/${customHero?.primaryCtaLink || 'services'}`}
            className="btn-pill-dark"
            onClick={(e) => {
              e.preventDefault();
              navigate(customHero?.primaryCtaLink || 'services');
            }}
          >
            <span>
              {customHero?.primaryCtaText && !customHero.primaryCtaText.includes('SEE MORE')
                ? customHero.primaryCtaText
                : 'EXPLORE SERVICES'}
            </span>
            <span className="btn-arrow">↗</span>
          </a>
          <a
            href={`#/${customHero?.secondaryCtaLink || 'work'}`}
            className="btn-pill-outline"
            onClick={(e) => {
              e.preventDefault();
              navigate(customHero?.secondaryCtaLink || 'work');
            }}
          >
            {customHero?.secondaryCtaText && !customHero.secondaryCtaText.includes('SEE PORTFOLIO')
              ? customHero.secondaryCtaText
              : 'VIEW OUR WORK'}
          </a>
        </div>
      </div>

      {/* 3D Tilted Perspective Mockup Stage */}
      <div className="hero-stage-container" ref={stageRef}>
        <div className={`mockup-3d-wrap ${isPlaying ? 'is-video-active' : ''}`} ref={mockupRef}>
          {/* Laptop Screen Chassis */}
          <div className="laptop-chassis">
            {/* Camera Notch */}
            <div className="laptop-notch">
              <div className="camera-lens" />
              <div className="sensor-dot" />
            </div>

            {/* Display Screen */}
            <div className="laptop-screen">
              {isPlaying ? (
                <div className="embedded-video-wrap">
                  <iframe
                    className="laptop-video-iframe"
                    src="https://www.youtube.com/embed/s2HYl12gmOY?autoplay=1&enablejsapi=1&rel=0&modestbranding=1"
                    title="LeoVantage Web Studio Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    className="btn-close-video"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(false);
                    }}
                    title="Close Video"
                    aria-label="Close video"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className="mock-topbar">
                    <div className="mock-dots">
                      <span className="mock-dot red" />
                      <span className="mock-dot yellow" />
                      <span className="mock-dot green" />
                    </div>
                    <div className="mock-nav-pills">
                      <span className="mock-nav-pill" />
                      <span className="mock-nav-pill" />
                      <span className="mock-nav-pill" />
                    </div>
                  </div>

                  <div className="mock-screen-hero">
                    <div className="mock-headline">LEOVANTAGE ENGINE</div>
                    <div className="mock-subtext" />
                    <div className="mock-btn" />
                  </div>

                  {/* Video Overlay Preview State */}
                  <div
                    className="mock-video-overlay"
                    onClick={() => setIsPlaying(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setIsPlaying(true);
                      }
                    }}
                    aria-label="Play video showreel"
                  >
                    <div className="play-btn-wrapper">
                      <div className="play-btn-glow-ring" />
                      <button
                        type="button"
                        className="mock-play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(true);
                        }}
                        title="Watch Video"
                        aria-label="Play video with sound"
                      >
                        <svg viewBox="0 0 24 24">
                          <polygon points="6,3 20,12 6,21" />
                        </svg>
                      </button>
                    </div>
                    <span className="play-btn-text">PLAY VIDEO</span>
                  </div>
                </>
              )}
            </div>

            {/* Bottom chassis hinge/edge illusion */}
            <div className="laptop-base-edge" />
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="hero-footer-bar">
        <a
          href="#/work"
          className="hero-portfolio-link"
          onClick={(e) => {
            e.preventDefault();
            navigate('work');
          }}
        >
          <span>VIEW OUR WORK</span>
          <span>→</span>
        </a>

        {/* Circular Scroll Down Button */}
        <button
          type="button"
          className="btn-scroll-down"
          onClick={handleScrollDown}
          aria-label="Scroll down to content"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
          </svg>
          <span>SCROLL</span>
        </button>
      </div>

      {/* Smooth fade to white gradient */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
