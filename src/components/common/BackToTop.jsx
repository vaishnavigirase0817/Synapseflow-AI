import { useState, useEffect } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

/**
 * BackToTop — Floating button that appears after scrolling and smoothly scrolls to top.
 */
export default function BackToTop() {
  const scrollY = useScrollPosition();
  const show = scrollY > 500;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-11 h-11 rounded-xl
        bg-primary-600/90 backdrop-blur-xl
        border border-white/10
        flex items-center justify-center
        text-white
        shadow-lg shadow-primary-500/20
        hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30
        hover:-translate-y-0.5
        active:scale-95
        transition-all duration-300
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
