import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RippleButton from '../common/RippleButton';
import { scrollToSection } from '../../hooks/useActiveSection';

/**
 * MobileMenu — Full-screen overlay mobile navigation with glass backdrop,
 * slide-in animation, focus trap, and Escape key close.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the menu is visible
 * @param {Function} props.onClose - Callback to close the menu
 * @param {Array<{label: string, id: string}>} props.links - Navigation links
 */
export default function MobileMenu({ isOpen, onClose, links }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleLinkClick = (e, id) => {
    scrollToSection(e, id);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-surface-500/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`fixed top-16 right-4 left-4 z-40 p-4 rounded-2xl glass-strong border border-glass/[0.08] shadow-2xl shadow-black/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isOpen
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
            : '-translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col gap-2">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="px-4 py-3 rounded-xl text-base font-medium text-main hover:bg-glass/[0.06] transition-colors"
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}

          <div
            className="pt-4 pb-2 mt-2 border-t border-glass/[0.06]"
            style={{
              transitionDelay: isOpen ? `${links.length * 50}ms` : '0ms',
              transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              opacity: isOpen ? 1 : 0,
              transitionProperty: 'transform, opacity',
              transitionDuration: '500ms',
            }}
          >
            <RippleButton variant="primary" className="w-full justify-center" onClick={() => { onClose(); navigate('/dashboard'); }}>
              Start Free Trial
            </RippleButton>
          </div>
        </div>
      </div>
    </>
  );
}
