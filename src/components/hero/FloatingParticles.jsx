import { useMemo } from 'react';

/**
 * FloatingParticles — Generates ~30 animated glowing particles with
 * randomized positions, sizes, and animation timing.
 * All animation is CSS-only — no JS animation loop.
 */
export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const driftX = (Math.random() - 0.5) * 200;
      const driftY = -(Math.random() * 300 + 100);
      const duration = Math.random() * 15 + 15;
      const delay = Math.random() * 20;
      const opacity = Math.random() * 0.5 + 0.1;
      const hue = Math.random() > 0.5 ? '220' : Math.random() > 0.5 ? '270' : '180';

      return {
        id: i,
        style: {
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: `hsla(${hue}, 80%, 70%, ${opacity})`,
          boxShadow: `0 0 ${size * 3}px hsla(${hue}, 80%, 60%, ${opacity * 0.8})`,
          '--drift-x': `${driftX}px`,
          '--drift-y': `${driftY}px`,
          animation: `particle-drift ${duration}s linear ${delay}s infinite`,
          willChange: 'transform, opacity',
          pointerEvents: 'none',
        },
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span key={p.id} className="particle" style={p.style} />
      ))}
    </div>
  );
}
