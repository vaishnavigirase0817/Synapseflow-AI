import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import ScrollReveal from '../common/ScrollReveal';

const STATS = [
  { value: 98.7, suffix: '%', label: 'Accuracy Rate', description: 'AI-powered predictions', icon: '⚡' },
  { value: 24000, suffix: '+', label: 'Data Points', description: 'Processed daily', icon: '📊' },
  { value: 500, suffix: '+', label: 'Enterprises', description: 'Trust SynapseFlow', icon: '🏢' },
  { value: 3, suffix: 'x', label: 'Faster Workflows', description: 'Compared to manual', icon: '🚀' },
];

function StatCard({ stat, index }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });
  const count = useCountUp(stat.value, 2500, isVisible, stat.suffix);

  return (
    <div
      ref={ref}
      className="relative group p-6 sm:p-8 rounded-2xl glass hover:bg-white/[0.04] transition-all duration-500"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <span className="text-2xl mb-3 block">{stat.icon}</span>
        <p className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-1 metric-counter">
          {count}
        </p>
        <p className="font-medium text-white/80 text-sm sm:text-base mb-1">{stat.label}</p>
        <p className="text-xs sm:text-sm text-white/40">{stat.description}</p>
      </div>
    </div>
  );
}

/**
 * Statistics — Animated counter statistics section with scroll-triggered counting.
 */
export default function Statistics() {
  return (
    <section className="relative py-20 lg:py-28" aria-label="Key statistics" id="stats">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm text-primary-400 uppercase tracking-widest font-medium mb-3">By the numbers</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
              Results that speak for themselves
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
