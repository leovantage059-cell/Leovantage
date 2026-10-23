import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../utils/motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || !window.matchMedia('(pointer: fine)').matches) return;

    let rafId = null;
    let targetX = -100;
    let targetY = -100;
    let followerX = -100;
    let followerY = -100;

    let isRunning = false;

    const animateFollower = () => {
      const dx = targetX - followerX;
      const dy = targetY - followerY;
      followerX += dx * 0.18;
      followerY += dy * 0.18;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX.toFixed(1)}px, ${followerY.toFixed(1)}px, 0)`;
      }

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        isRunning = false;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(animateFollower);
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(animateFollower);
      }
    };

    const handleMouseOver = (e) => {
      const interactive = e.target.closest('a, button, input, select, textarea, .service-card, .team-card, .review-card, .project-card-large, .process-step-card, .tech-chip');
      const hasActive = !!interactive;
      if (cursorRef.current) {
        cursorRef.current.classList.toggle('is-hovering', hasActive);
      }
      if (followerRef.current) {
        followerRef.current.classList.toggle('is-hovering', hasActive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true" />
      <div className="custom-cursor-follower" ref={followerRef} aria-hidden="true" />
    </>
  );
}
