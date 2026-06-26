import { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import RippleButton from '../common/RippleButton';
import { scrollToSection } from '../../hooks/useActiveSection';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', id: 'features' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Integrations', id: 'features' },
    { label: 'API Docs', id: 'dashboard' },
  ],
  Company: [
    { label: 'About', id: 'features' },
    { label: 'Blog', id: 'hero' },
    { label: 'Careers', id: 'hero' },
    { label: 'Press', id: 'hero' },
    { label: 'Contact', id: 'contact' },
  ],
  Resources: [
    { label: 'Documentation', id: 'hero' },
    { label: 'Tutorials', id: 'hero' },
    { label: 'Community', id: 'hero' },
    { label: 'Status', id: 'hero' },
    { label: 'Changelog', id: 'hero' },
  ],
  Legal: [
    { label: 'Privacy Policy', id: 'hero' },
    { label: 'Terms of Service', id: 'hero' },
    { label: 'Cookie Policy', id: 'hero' },
    { label: 'GDPR', id: 'hero' },
    { label: 'Security', id: 'hero' },
  ],
};

/**
 * Footer — Full-width footer with link columns, newsletter signup, social links, and copyright.
 */
export default function Footer() {
  const [newsletterState, setNewsletterState] = useState('idle'); // idle, loading, success
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterState('loading');
    setTimeout(() => {
      setNewsletterState('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="relative pt-20 pb-8 border-t border-white/[0.06]" role="contentinfo" id="footer">
      <div className="section-container">
        {/* CTA Banner */}
        <ScrollReveal>
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden glass-strong p-8 sm:p-12 text-center mb-16">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-glow-cyan/10 pointer-events-none" />

            <div className="relative">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
                Ready to accelerate your business?
              </h2>
              <p className="text-base text-white/50 max-w-lg mx-auto mb-8">
                Join 2,400+ teams already transforming their workflows with SynapseFlow AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <RippleButton variant="primary" ariaLabel="Start free trial" onClick={(e) => scrollToSection(e, 'pricing')}>
                  Start Free Trial
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </RippleButton>
                <RippleButton variant="outline" ariaLabel="Schedule a demo" onClick={(e) => scrollToSection(e, 'contact')}>
                  Schedule Demo
                </RippleButton>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <a href="/" onClick={(e) => scrollToSection(e, 'hero')} className="flex items-center gap-2.5 mb-4" aria-label="SynapseFlow AI Home">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500 to-accent-600 opacity-80" />
                <div className="absolute inset-[2px] rounded-[6px] bg-surface-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Synapse<span className="text-primary-400">Flow</span>
              </span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Transform scattered business data into intelligent automated workflows powered by AI.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {['X', 'Li', 'Gh', 'Yt'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/10 transition-all duration-300"
                  aria-label={`Follow us on ${social}`}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm text-white/70 mb-4">{title}</h4>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="text-sm text-white/35 hover:text-white/70 transition-colors duration-300 relative group inline-block"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary-400/50 group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & Bottom bar */}
        <div className="pt-12 border-t border-white/[0.06] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          
          {/* Newsletter */}
          <div className="w-full max-w-md text-center lg:text-left">
            <h4 className="font-display font-semibold text-sm text-white mb-2">Subscribe to our newsletter</h4>
            <p className="text-xs text-white/40 mb-4">Get the latest AI automation tips and product updates.</p>
            {newsletterState === 'success' ? (
              <div className="flex items-center gap-2 text-sm text-glow-emerald bg-glow-emerald/10 px-4 py-2.5 rounded-xl border border-glow-emerald/20 animate-fade-in">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Thanks for subscribing!
              </div>
            ) : (
              <form className="relative flex items-center" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={newsletterState === 'loading'}
                  className="w-full pl-4 pr-32 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400/50 transition-all disabled:opacity-50"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={newsletterState === 'loading'}
                  className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg text-xs font-medium text-white transition-colors flex items-center justify-center ${
                    newsletterState === 'loading' ? 'bg-primary-500/50 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-500'
                  }`}
                >
                  {newsletterState === 'loading' ? (
                    <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-white/25">
                <span className="w-1.5 h-1.5 rounded-full bg-glow-emerald animate-pulse" />
                All systems operational
              </span>
            </div>
            <p className="text-xs text-white/25">
              © {new Date().getFullYear()} SynapseFlow AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
