/**
 * AuroraBg — Full-viewport animated aurora gradient background.
 * Multiple layered radial gradients with independent animation cycles.
 * Pure CSS animations, GPU-composited.
 */
export default function AuroraBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-600 via-surface-500 to-surface-400" />

      {/* Aurora layer 1 — Primary blue/indigo */}
      <div
        className="aurora-layer absolute -top-1/2 -left-1/4 w-[150%] h-[150%] animate-aurora opacity-50"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99, 102, 241, 0.3) 0%, rgba(79, 70, 229, 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Aurora layer 2 — Violet/purple */}
      <div
        className="aurora-layer absolute -top-1/4 -right-1/4 w-[120%] h-[120%] animate-aurora-2 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 60% 40%, rgba(139, 92, 246, 0.25) 0%, rgba(109, 40, 217, 0.1) 45%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Aurora layer 3 — Cyan accent */}
      <div
        className="aurora-layer absolute -bottom-1/4 -left-1/4 w-[100%] h-[100%] animate-aurora-3 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 40% 60%, rgba(34, 211, 238, 0.2) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-500 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-surface-500 to-transparent" />
    </div>
  );
}
