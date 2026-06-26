import { useEffect, useRef } from 'react';
import RippleButton from '../common/RippleButton';

/**
 * MobileMenu — Full-screen overlay mobile navigation with glass backdrop,
 * slide-in animation, focus trap, and Escape key close.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the menu is visible
 * @param {Function} props.onClose - Callback to close the menu
 * @param {Array<{label: string, href: string}>} props.links - Navigation links
 */
export default function MobileMenu({ isOpen, onClose, links }) {
  const menuRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap: focus first link when menu opens
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <div
      id="mobile-menu"
      className={`
        fixed inset-0 z-40 lg:hidden
        transition-all duration-500 ease-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-surface-500/90 backdrop-blur-2xl"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu content */}
      <nav
        ref={menuRef}
        className={`
          relative flex flex-col items-center justify-center h-full gap-2
          transition-all duration-500 ease-out
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}
        `}
      >
        {links.map((link, i) => (
          <a
            key={link.label}
            ref={i === 0 ? firstFocusableRef : undefined}
            href={link.href}
            onClick={onClose}
            className="
              px-6 py-4 rounded-xl
              text-2xl font-display font-medium text-white/70
              hover:text-white hover:bg-white/[0.05]
              transition-all duration-300
              w-64 text-center
            "
            style={{ transitionDelay: isOpen ? `${i * 75}ms` : '0ms' }}
          >
            {link.label}
          </a>
        ))}

        <div className="mt-6" style={{ transitionDelay: isOpen ? `${links.length * 75}ms` : '0ms' }}>
          <RippleButton variant="primary" ariaLabel="Start free trial" onClick={onClose}>
            Start Free Trial
          </RippleButton>
        </div>
      </nav>
    </div>
  );
}
