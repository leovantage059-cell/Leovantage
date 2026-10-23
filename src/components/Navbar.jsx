import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';

export default function Navbar({ currentRoute, navigate }) {
  const isDarkHeroRoute = (route) =>
    route === 'home' || route === 'work' || (typeof route === 'string' && route.startsWith('work'));

  const [scrolled, setScrolled] = useState(false);
  const [inHero, setInHero] = useState(() => isDarkHeroRoute(currentRoute));
  const [themeChanging, setThemeChanging] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevInHeroRef = useRef(inHero);

  // Trigger micro-capsule transition animation whenever inHero switches
  useEffect(() => {
    if (prevInHeroRef.current !== inHero) {
      prevInHeroRef.current = inHero;
      setThemeChanging(true);
      const timer = setTimeout(() => {
        setThemeChanging(false);
      }, 360);
      return () => clearTimeout(timer);
    }
  }, [inHero]);

  useEffect(() => {
    let ticking = false;

    const updateHeaderState = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      if (isDarkHeroRoute(currentRoute)) {
        const heroEl =
          document.getElementById('heroSection') ||
          document.getElementById('projectHeroBanner') ||
          document.querySelector('.page-hero-banner') ||
          document.getElementById('caseStudyHero') ||
          document.querySelector('.case-study-hero');

        if (heroEl) {
          const heroHeight = heroEl.offsetHeight || (currentRoute === 'home' ? window.innerHeight : 420);
          // Exact boundary with 30px hysteresis to prevent any edge flicker
          setInHero((prev) => {
            if (prev) {
              return scrollY < (heroHeight - 45);
            } else {
              return scrollY < (heroHeight - 75);
            }
          });
        } else {
          const fallbackHeight = currentRoute === 'home' ? 650 : 380;
          setInHero(scrollY < fallbackHeight);
        }
      } else {
        setInHero(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    };

    updateHeaderState();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [currentRoute]);

  const navItems = [
    { label: 'HOME', route: 'home' },
    { label: 'SERVICES', route: 'services' },
    { label: 'PROJECTS', route: 'work' },
    { label: 'PROCESS', route: 'process' },
    { label: 'TEAM', route: 'team' },
    { label: 'REVIEWS', route: 'reviews' },
    { label: 'ABOUT', route: 'about' },
    { label: 'CONTACT', route: 'contact' }
  ];

  const handleNavClick = (route, e) => {
    e.preventDefault();
    navigate(route);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`site-header ${scrolled ? 'scrolled' : ''} ${inHero ? 'in-hero' : ''} ${themeChanging ? 'theme-changing' : ''}`}
        id="siteHeader"
      >
        <div className="container-wide">
          <div className="header-nav-wrap">
            {/* Brand Logo */}
            <a
              href="#/home"
              className="brand-logo-wrap"
              onClick={(e) => handleNavClick('home', e)}
              aria-label="LeoVantage Web Studio Home"
            >
              <Logo variant="horizontal" theme={inHero ? 'light' : 'dark'} height={42} />
            </a>

            {/* Desktop Navigation */}
            <nav aria-label="Main Navigation">
              <ul className="nav-menu">
                {navItems.map((item, idx) => {
                  const isActive = currentRoute === item.route || (item.route === 'work' && currentRoute.startsWith('work/'));
                  const isLast = idx === navItems.length - 1;
                  return (
                    <li key={item.route} className="nav-item">
                      <a
                        href={`#/${item.route}`}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                        onClick={(e) => handleNavClick(item.route, e)}
                      >
                        {item.label}
                      </a>
                      {!isLast && <span className="nav-dot-sep">•</span>}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Nav Actions */}
            <div className="nav-actions">
              <div className="lang-pill" title="Region selector">
                <span>IN</span> • <span>EN</span>
              </div>
              <a
                href="#/contact"
                className="btn-nav-cta"
                onClick={(e) => handleNavClick('contact', e)}
              >
                START PROJECT ↗
              </a>
              <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile navigation"
                aria-expanded={mobileOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div 
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-header">
          <Logo variant="horizontal" theme="dark" height={36} />
          <button
            className="mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile navigation"
          >
            &times;
          </button>
        </div>
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.route}>
              <a
                href={`#/${item.route}`}
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(item.route, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '30px', width: '100%', maxWidth: '280px' }}>
          <a
            href="#/contact"
            className="btn-nav-cta"
            style={{ display: 'block', textAlign: 'center', width: '100%' }}
            onClick={(e) => handleNavClick('contact', e)}
          >
            START PROJECT ↗
          </a>
        </div>
      </div>
    </>
  );
}
