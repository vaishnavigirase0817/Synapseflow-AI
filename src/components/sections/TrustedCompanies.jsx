import ScrollReveal from '../common/ScrollReveal';

const COMPANIES = [
  { name: 'TechNova', width: 'w-24' },
  { name: 'DataStream', width: 'w-28' },
  { name: 'CloudSync', width: 'w-24' },
  { name: 'NeuralNet', width: 'w-26' },
  { name: 'QuantumAI', width: 'w-24' },
  { name: 'CyberEdge', width: 'w-28' },
  { name: 'InfiniCore', width: 'w-24' },
  { name: 'FlowStack', width: 'w-26' },
];

function CompanyLogo({ name }) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 opacity-40 hover:opacity-70 transition-opacity duration-500 select-none">
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-xs font-bold text-white/60">{name[0]}</span>
      </div>
      <span className="text-sm font-display font-medium text-white/60 whitespace-nowrap">{name}</span>
    </div>
  );
}

/**
 * TrustedCompanies — Infinite scrolling logo carousel of trusted company logos.
 */
export default function TrustedCompanies() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden" aria-label="Trusted by leading companies">
      <ScrollReveal>
        <p className="text-center text-sm text-white/30 uppercase tracking-widest font-medium mb-8">
          Trusted by innovative teams worldwide
        </p>
      </ScrollReveal>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-500 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-500 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          <div className="flex items-center">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <CompanyLogo key={`${company.name}-${i}`} name={company.name} />
            ))}
          </div>
          <div className="flex items-center" aria-hidden="true">
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <CompanyLogo key={`dup-${company.name}-${i}`} name={company.name} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="section-container mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
