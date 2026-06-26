import { useRef, useCallback } from 'react';

/**
 * RippleButton — Premium CTA button with ripple effect, glow, hover lift,
 * and magnetic interaction. Pure CSS animations, no libraries.
 *
 * @param {Object} props
 * @param {'primary'|'outline'} props.variant - Button style variant
 * @param {string} props.children - Button content
 * @param {string} [props.href] - If provided, renders as <a> instead of <button>
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel] - Accessible label
 * @param {Function} [props.onClick] - Click handler
 */
export default function RippleButton({
  variant = 'primary',
  children,
  href,
  className = '',
  ariaLabel,
  onClick,
  ...rest
}) {
  const btnRef = useRef(null);

  const handleClick = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;

    // Create ripple
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
      transform: scale(0);
      animation: ripple 0.6s linear forwards;
      pointer-events: none;
      z-index: 10;
    `;

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.(e);
  }, [onClick]);

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    btn.style.transform = `translate(${deltaX}px, ${deltaY}px) translateY(-2px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (btn) {
      btn.style.transform = 'translate(0, 0) translateY(0)';
    }
  }, []);

  const baseClasses = `
    magnetic-btn relative overflow-hidden
    inline-flex items-center justify-center gap-2
    px-6 py-3 sm:px-8 sm:py-3.5
    rounded-xl font-display font-medium
    text-sm sm:text-base
    cursor-pointer select-none
    transition-all duration-300 ease-out
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-500 via-primary-600 to-accent-600
      text-main
      shadow-lg shadow-primary-500/25
      hover:shadow-xl hover:shadow-primary-500/40
      hover:brightness-110
      active:scale-[0.98]
    `,
    outline: `
      bg-glass/[0.03] backdrop-blur-xl
      border border-glass/10
      text-main
      hover:bg-glass/[0.08]
      hover:border-glass/20
      hover:shadow-lg hover:shadow-primary-500/10
      active:scale-[0.98]
    `,
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      {...(href ? {} : { type: 'button' })}
      {...rest}
    >
      {children}
    </Tag>
  );
}
