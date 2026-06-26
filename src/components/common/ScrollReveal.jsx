import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ScrollReveal — Wrapper component that animates children into view on scroll.
 * @param {Object} props
 * @param {string} [props.animation='slide-up'] - Animation type
 * @param {number} [props.delay=0] - Delay in ms
 * @param {string} [props.className] - Additional classes
 */
export default function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  className = '',
  threshold = 0.1,
}) {
  const [ref, isVisible] = useScrollReveal({ threshold });

  const animations = {
    'slide-up': 'translate-y-8 opacity-0',
    'slide-left': '-translate-x-8 opacity-0',
    'slide-right': 'translate-x-8 opacity-0',
    'fade': 'opacity-0',
    'scale': 'scale-95 opacity-0',
    'slide-up-far': 'translate-y-16 opacity-0',
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 translate-x-0 opacity-100 scale-100' : animations[animation] || animations['slide-up']}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
