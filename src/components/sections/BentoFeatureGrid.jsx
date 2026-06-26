import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';

const FEATURES = [
  {
    id: 'ai-analytics',
    title: 'AI-Powered Analytics',
    description: 'Deep learning models analyze your business data in real-time, uncovering hidden patterns and actionable insights that drive growth.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: 'from-glow-cyan/20 to-primary-500/20',
    iconBg: 'bg-glow-cyan/10 text-glow-cyan',
    span: 'lg:col-span-2 lg:row-span-2',
    detail: 'Process millions of data points with sub-second latency. Our proprietary ML pipeline continuously learns from your business patterns.',
  },
  {
    id: 'smart-workflows',
    title: 'Smart Workflows',
    description: 'Design and deploy intelligent automation workflows with our visual builder. No code required.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3" />
      </svg>
    ),
    color: 'from-accent-500/20 to-primary-500/20',
    iconBg: 'bg-accent-500/10 text-accent-400',
    span: 'lg:col-span-1',
    detail: 'Drag-and-drop builder with 200+ pre-built templates. Connect any API in minutes.',
  },
  {
    id: 'predictive',
    title: 'Predictive Intelligence',
    description: 'Stay ahead with AI-driven forecasting that predicts trends before they happen.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-glow-emerald/20 to-glow-cyan/20',
    iconBg: 'bg-glow-emerald/10 text-glow-emerald',
    span: 'lg:col-span-1',
    detail: 'Machine learning models with 98.7% accuracy. Forecast revenue, churn, and demand with confidence.',
  },
  {
    id: 'integrations',
    title: 'Seamless Integrations',
    description: 'Connect with 500+ tools and platforms you already use. CRM, ERP, databases, and more.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: 'from-glow-blue/20 to-accent-500/20',
    iconBg: 'bg-glow-blue/10 text-glow-blue',
    span: 'lg:col-span-1',
    detail: 'Pre-built connectors for Salesforce, HubSpot, Slack, Jira, and hundreds more. Custom webhooks available.',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description: 'SOC2 Type II certified. End-to-end encryption, SSO, and role-based access control.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'from-glow-pink/20 to-accent-500/20',
    iconBg: 'bg-glow-pink/10 text-glow-pink',
    span: 'lg:col-span-1',
    detail: 'GDPR, HIPAA, and SOC2 compliant. 99.99% uptime SLA with dedicated infrastructure options.',
  },
  {
    id: 'realtime',
    title: 'Real-time Collaboration',
    description: 'Work together in real-time with your team. Share dashboards, reports, and insights instantly.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    color: 'from-primary-500/20 to-glow-violet/20',
    iconBg: 'bg-primary-500/10 text-primary-400',
    span: 'lg:col-span-2',
    detail: 'Live cursors, comments, and shared workspaces. Set granular permissions for every team member.',
  },
];

/**
 * BentoCard — Desktop grid card with hover glow and lift.
 */
function BentoCard({ feature, isActive, onClick, index }) {
  return (
    <button
      onClick={() => onClick(feature.id)}
      className={`
        ${feature.span}
        relative group text-left rounded-2xl overflow-hidden
        transition-all duration-500 ease-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400
        ${isActive
          ? 'glass-strong ring-1 ring-primary-400/30 scale-[1.02] shadow-xl shadow-primary-500/10'
          : 'glass hover:bg-glass/[0.04] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/5'
        }
      `}
      aria-expanded={isActive}
      aria-label={`${feature.title} feature`}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative p-5 sm:p-6 lg:p-7">
        {/* Icon */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
          {feature.icon}
        </div>

        <h3 className="font-display font-semibold text-lg sm:text-xl text-main mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-main/50 leading-relaxed mb-3">
          {feature.description}
        </p>

        {/* Expanded detail */}
        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className="pt-3 border-t border-glass/[0.06]">
            <p className="text-sm text-main/40 leading-relaxed">{feature.detail}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

/**
 * AccordionItem — Mobile accordion with smooth expansion.
 */
function AccordionItem({ feature, isActive, onClick, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isActive ? contentRef.current.scrollHeight : 0);
    }
  }, [isActive]);

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isActive ? 'glass-strong ring-1 ring-primary-400/20' : 'glass'}`}>
      <button
        onClick={() => onClick(feature.id)}
        className="w-full flex items-center gap-4 p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-400"
        aria-expanded={isActive}
        aria-controls={`accordion-${feature.id}`}
        id={`accordion-btn-${feature.id}`}
      >
        <div className={`w-10 h-10 rounded-xl ${feature.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
          {feature.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-base text-main">{feature.title}</h3>
          <p className="text-xs text-main/40 truncate">{feature.description}</p>
        </div>
        <svg
          className={`w-5 h-5 text-main/40 flex-shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        id={`accordion-${feature.id}`}
        role="region"
        aria-labelledby={`accordion-btn-${feature.id}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="px-4 pb-4">
          <div className="pt-2 border-t border-glass/[0.06]">
            <p className="text-sm text-main/50 leading-relaxed mb-2">{feature.description}</p>
            <p className="text-sm text-main/40 leading-relaxed">{feature.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * BentoFeatureGrid — Desktop: Bento grid. Mobile: Accordion.
 * Active state is preserved across breakpoint changes.
 */
export default function BentoFeatureGrid() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activeId, setActiveId] = useState(null);

  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-20 lg:py-28" aria-label="Features" id="features">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            badge="Features"
            title="Everything you need to scale"
            subtitle="A comprehensive suite of AI-powered tools designed to transform how your team works."
          />
        </ScrollReveal>

        {/* Desktop: Bento Grid */}
        {isDesktop ? (
          <div className="grid grid-cols-3 gap-4 lg:gap-5">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.id} delay={i * 80}>
                <BentoCard
                  feature={feature}
                  isActive={activeId === feature.id}
                  onClick={handleToggle}
                  index={i}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Mobile: Accordion */
          <div className="space-y-3">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.id} delay={i * 60}>
                <AccordionItem
                  feature={feature}
                  isActive={activeId === feature.id}
                  onClick={handleToggle}
                  index={i}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
