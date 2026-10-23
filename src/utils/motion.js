import { useState, useEffect, useRef } from 'react';

/**
 * Hook to detect if user has requested reduced motion.
 * Automatically updates if the user changes system preferences.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for restrained one-time scroll reveal.
 * Marks the ref element with 'is-revealed' class once it enters viewport.
 * Unobserves immediately to ensure zero ongoing CPU overhead.
 */
export function useScrollReveal(options = {}) {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (prefersReduced) {
      setIsRevealed(true);
      el.classList.add('is-revealed');
      return;
    }

    const {
      threshold = 0.12,
      rootMargin = '0px 0px -40px 0px'
    } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, options.threshold, options.rootMargin]);

  return { ref: elementRef, isRevealed };
}
