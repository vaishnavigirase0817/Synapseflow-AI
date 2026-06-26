import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp — Animates a number from 0 to target value.
 * @param {number} target - Target number
 * @param {number} [duration=2000] - Duration in ms
 * @param {boolean} [start=false] - Whether to start counting
 * @param {string} [suffix=''] - Suffix to append
 * @param {string} [prefix=''] - Prefix to prepend
 */
export function useCountUp(target, duration = 2000, start = false, suffix = '', prefix = '') {
  const [value, setValue] = useState(0);
  const startTime = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }

    startTime.current = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * ease));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration, start]);

  const formatted = `${prefix}${value.toLocaleString()}${suffix}`;
  return formatted;
}
