import { useScrollReveal } from '../../hooks/useScrollReveal';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';

const STEPS = [
  {
    step: '01',
    title: 'Connect Your Data',
    description: 'Integrate with your existing tools and databases. Our AI automatically maps and validates your data sources.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: 'glow-cyan',
  },
  {
    step: '02',
    title: 'Configure AI Models',
    description: 'Choose from pre-trained models or customize your own. Our platform handles training, validation, and deployment.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'primary-400',
  },
  {
    step: '03',
    title: 'Build Workflows',
    description: 'Design automation flows with our visual builder. Set triggers, conditions, and actions — no code needed.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    color: 'accent-400',
  },
  {
    step: '04',
    title: 'Deploy & Monitor',
    description: 'Go live in one click. Monitor performance in real-time with comprehensive dashboards and alerts.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    color: 'glow-emerald',
  },
];

function TimelineStep({ step, index, total }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className="relative flex gap-6 lg:gap-8">
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className={`
          relative w-12 h-12 rounded-xl flex items-center justify-center
          bg-${step.color}/10 text-${step.color}
          border border-${step.color}/20
          transition-all duration-700
          ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
        `}>
          {step.icon}
          {/* Pulse ring */}
          <div className={`absolute inset-0 rounded-xl border border-${step.color}/20 animate-ping-slow`} />
        </div>

        {/* Line */}
        {index < total - 1 && (
          <div className="w-px flex-1 min-h-[60px] relative overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-b from-${step.color}/40 to-transparent transition-all duration-1000 ease-out`}
              style={{
                transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                transitionDelay: '300ms',
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 lg:pb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
        style={{ transitionDelay: '200ms' }}
      >
        <span className={`text-xs font-mono text-${step.color}/60 uppercase tracking-wider`}>
          Step {step.step}
        </span>
        <h3 className="font-display font-semibold text-xl sm:text-2xl text-main mt-1 mb-2">
          {step.title}
        </h3>
        <p className="text-sm sm:text-base text-main/50 leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </div>
  );
}

/**
 * WorkflowTimeline — Vertical timeline showing the 4-step workflow process
 * with animated connecting lines and scroll-triggered reveals.
 */
export default function WorkflowTimeline() {
  return (
    <section className="relative py-20 lg:py-28" aria-label="How it works" id="workflow">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            badge="How It Works"
            title="Get started in 4 simple steps"
            subtitle="From data connection to real-time insights in minutes, not months."
          />
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {STEPS.map((step, i) => (
            <TimelineStep key={step.step} step={step} index={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
