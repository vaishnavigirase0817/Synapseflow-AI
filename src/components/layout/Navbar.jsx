import { useState, useEffect, useCallback, useMemo } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useActiveSection, scrollToSection } from '../../hooks/useActiveSection';
import MobileMenu from './MobileMenu';
import RippleButton from '../common/RippleButton';

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

/**
 * Navbar — Sticky navigation with transparent-to-blur transition on scroll.
 * Includes responsive mobile hamburger menu.
 */
export default function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 20;
  
  const sectionIds = useMemo(() => NAV_LINKS.map(link => link.id), []);
  const activeSection = useActiveSection(sectionIds);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleNavClick = (e, id) => {
    scrollToSection(e, id);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${isScrolled
            ? 'bg-surface-500/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent'
          }
        `}
        role="banner"
      >
        <nav
          className="section-container flex items-center justify-between h-16 sm:h-18 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center gap-2.5 group"
            aria-label="SynapseFlow AI - Home"
          >
            {/* Logo icon placeholder — replace with SVG asset */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[2px] rounded-[6px] bg-surface-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
              Synapse<span className="text-primary-400">Flow</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`
                    px-4 py-2 rounded-lg relative group
                    text-sm font-medium transition-all duration-300
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/[0.05]'}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {/* Animated underline for active state */}
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary-400 rounded-full layout-animation" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <RippleButton variant="primary" onClick={(e) => scrollToSection(e, 'pricing')} ariaLabel="Start free trial">
              Start Free Trial
            </RippleButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-colors"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  mobileOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMobile}
        links={NAV_LINKS}
      />
    </>
  );
}
