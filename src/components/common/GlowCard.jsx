/**
 * GlowCard — Reusable glassmorphism card with configurable glow color
 * and animated border gradient on hover.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className] - Additional CSS classes
 * @param {'blue'|'violet'|'cyan'|'emerald'|'pink'} [props.glowColor] - Glow accent
 * @param {boolean} [props.hover] - Enable hover glow effect
 */
export default function GlowCard({
  children,
  className = '',
  glowColor = 'blue',
  hover = true,
  ...rest
}) {
  const glowColors = {
    blue: 'hover:shadow-glow-blue/20',
    violet: 'hover:shadow-glow-violet/20',
    cyan: 'hover:shadow-glow-cyan/20',
    emerald: 'hover:shadow-glow-emerald/20',
    pink: 'hover:shadow-glow-pink/20',
  };

  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        glass
        transition-all duration-500 ease-out
        ${hover ? `glow-border ${glowColors[glowColor]}` : ''}
        ${className}
      `}
      {...rest}
    >
      {/* Holographic shimmer overlay */}
      <div className="holographic-shimmer absolute inset-0 pointer-events-none z-[1]" />
      
      {/* Content */}
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
}
