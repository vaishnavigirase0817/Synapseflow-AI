import GlowCard from '../common/GlowCard';

const CARDS = [
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    label: 'Analytics',
    color: 'cyan',
    position: 'top-[8%] left-[5%] sm:top-[10%] sm:left-[8%]',
    animDelay: '0s',
    floatClass: 'animate-float',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    label: 'AI Insights',
    color: 'violet',
    position: 'top-[5%] right-[5%] sm:top-[8%] sm:right-[10%]',
    animDelay: '1s',
    floatClass: 'animate-float-slow',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m-.766 17.85l-.26-1.478m-2.606-14.772L9.74 3.635" />
      </svg>
    ),
    label: 'Workflows',
    color: 'blue',
    position: 'bottom-[15%] left-[3%] sm:bottom-[18%] sm:left-[6%]',
    animDelay: '2s',
    floatClass: 'animate-float-reverse',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    label: 'Predictions',
    color: 'emerald',
    position: 'bottom-[12%] right-[3%] sm:bottom-[15%] sm:right-[8%]',
    animDelay: '3s',
    floatClass: 'animate-float-slower',
  },
  {
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    label: 'Security',
    color: 'pink',
    position: 'top-[40%] right-[0%] sm:top-[35%] sm:right-[2%]',
    animDelay: '1.5s',
    floatClass: 'animate-float',
  },
];

/**
 * HolographicCards — Floating feature cards positioned around the central
 * dashboard with holographic shimmer, glow effects, and staggered float animations.
 */
export default function HolographicCards() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className={`absolute ${card.position} ${card.floatClass} pointer-events-auto`}
          style={{ animationDelay: card.animDelay }}
        >
          <GlowCard glowColor={card.color} className="p-2.5 sm:p-3">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className={`text-glow-${card.color}`}>
                {card.icon}
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-white/80 whitespace-nowrap">
                {card.label}
              </span>
            </div>
          </GlowCard>
        </div>
      ))}
    </div>
  );
}
