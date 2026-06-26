import ScrollReveal from '../common/ScrollReveal';
import RippleButton from '../common/RippleButton';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Integrations', href: '#' },
    { label: 'API Docs', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Tutorials', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

/**
 * Footer — Full-width footer with link columns, newsletter signup, social links, and copyright.
 */
export default function Footer() {
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
                <RippleButton variant="primary" ariaLabel="Start free trial">
                  Start Free Trial
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </RippleButton>
                <RippleButton variant="outline" ariaLabel="Schedule a demo">
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
            <a href="/" className="flex items-center gap-2.5 mb-4" aria-label="SynapseFlow AI Home">
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
                  href="#"
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
                      href={link.href}
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
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@company.com"
                required
                className="w-full pl-4 pr-32 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary-400/50 transition-all"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 rounded-lg bg-primary-600 text-xs font-medium text-white hover:bg-primary-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-white/25">
                <span className="w-1.5 h-1.5 rounded-full bg-glow-emerald" />
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
