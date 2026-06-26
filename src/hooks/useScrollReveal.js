import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 * @param {Object} options
 * @param {number} [options.threshold=0.1] - Visibility threshold
 * @param {string} [options.rootMargin='0px 0px -50px 0px'] - Root margin
 * @param {boolean} [options.once=true] - Only trigger once
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '0px 0px -50px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}
