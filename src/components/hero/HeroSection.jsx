import AuroraBg from './AuroraBg';
import FloatingParticles from './FloatingParticles';
import RotatingRing from './RotatingRing';
import ConnectionLines from './ConnectionLines';
import AIDashboard from './AIDashboard';
import HolographicCards from './HolographicCards';
import LiveActivityPanel from './LiveActivityPanel';
import RippleButton from '../common/RippleButton';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useActiveSection';

/**
 * HeroSection — Main orchestrator component for the "AI Control Room" hero.
 * Layers (back→front): Aurora → Particles → Ring → Connections → Dashboard → Cards → Text → Activity
 */
export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden contain-paint"
      aria-label="SynapseFlow AI Hero Section"
      id="hero"
    >
      {/* === Background Layers === */}
      <AuroraBg />
      <FloatingParticles />

      {/* === Central Control Room === */}
      <div className="relative w-full max-w-6xl 4k:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pt-24 sm:pt-28 lg:pt-20 pb-16">

          {/* Left Column — Text + CTAs */}
          <div className="relative z-20 flex-1 text-center lg:text-left max-w-xl lg:max-w-none">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-glow-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-glow-emerald" />
              </span>
              <span className="text-xs font-medium text-white/60">
                AI-Powered Business Automation
              </span>
            </div>

            {/* Headline */}
            <h1 className="opacity-0 animate-slide-up font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 4k:text-8xl leading-[1.1] tracking-tight mb-6">
              <span className="gradient-text">Automate.</span>
              <br />
              <span className="gradient-text" style={{ animationDelay: '0.5s' }}>Analyze.</span>
              <br />
              <span className="gradient-text" style={{ animationDelay: '1s' }}>Accelerate.</span>
            </h1>

            {/* Subheading */}
            <p className="opacity-0 animate-slide-up-delay-2 text-base sm:text-lg lg:text-xl text-white/50 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
              Transform scattered business data into intelligent automated workflows powered by AI.
            </p>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-slide-up-delay-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
              <RippleButton variant="primary" ariaLabel="Start your free trial" onClick={() => navigate('/dashboard')}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Free Trial
              </RippleButton>

              <RippleButton variant="outline" ariaLabel="Watch product demo video" onClick={(e) => scrollToSection(e, 'dashboard')}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Demo
              </RippleButton>
            </div>

            {/* Social proof */}
            <div className="opacity-0 animate-slide-up-delay-4 flex items-center gap-4 mt-8 justify-center lg:justify-start">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {[
                  'bg-gradient-to-br from-primary-400 to-accent-500',
                  'bg-gradient-to-br from-accent-400 to-pink-500',
                  'bg-gradient-to-br from-glow-cyan to-primary-500',
                  'bg-gradient-to-br from-glow-emerald to-glow-cyan',
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${bg} border-2 border-surface-500 flex items-center justify-center text-[10px] font-bold text-white`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-white/70">
                  Trusted by <span className="text-white">2,400+</span> teams
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-[11px] text-white/40 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — AI Dashboard + Visual Effects */}
          <div className="relative flex-1 flex items-center justify-center min-h-[350px] sm:min-h-[420px] lg:min-h-[500px]">
            {/* Rotating rings behind dashboard */}
            <RotatingRing />

            {/* Connection lines (desktop only) */}
            <ConnectionLines />

            {/* Central dashboard */}
            <AIDashboard />

            {/* Floating holographic cards */}
            <HolographicCards />
          </div>
        </div>

        {/* Live Activity Panel */}
        <LiveActivityPanel />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-500 to-transparent pointer-events-none z-30" />
    </section>
  );
}
