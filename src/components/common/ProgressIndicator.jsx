import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useState, useEffect } from 'react';

/**
 * ProgressIndicator — Thin progress bar at top of viewport showing scroll progress.
 */
export default function ProgressIndicator() {
  const scrollY = useScrollPosition();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress(Math.min((scrollY / docHeight) * 100, 100));
    }
  }, [scrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-glow-cyan transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
