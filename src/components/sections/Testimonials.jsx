import { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechNova',
    quote: 'SynapseFlow AI transformed our data pipeline completely. What used to take our team weeks now happens in hours with higher accuracy.',
    avatar: 'SC',
    color: 'from-primary-400 to-accent-500',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'VP of Operations, DataStream',
    quote: 'The AI-powered workflows have reduced our operational costs by 40%. The predictive models are incredibly accurate.',
    avatar: 'MR',
    color: 'from-accent-400 to-glow-pink',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Analytics, CloudSync',
    quote: 'We evaluated 12 platforms before choosing SynapseFlow. The combination of ease-of-use and powerful AI is unmatched.',
    avatar: 'PS',
    color: 'from-glow-cyan to-primary-500',
    rating: 5,
  },
  {
    name: 'James O\'Brien',
    role: 'CEO, NeuralNet Solutions',
    quote: 'Enterprise-grade security with startup-level agility. SynapseFlow AI is the perfect balance for our compliance needs.',
    avatar: 'JO',
    color: 'from-glow-emerald to-glow-cyan',
    rating: 5,
  },
  {
    name: 'Lisa Park',
    role: 'Director of Engineering, QuantumAI',
    quote: 'The API is beautifully designed. We integrated SynapseFlow into our existing stack in less than a day.',
    avatar: 'LP',
    color: 'from-glow-pink to-accent-400',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Product Manager, CyberEdge',
    quote: 'Customer support is phenomenal. Every time we have a question, the team responds within minutes with thoughtful solutions.',
    avatar: 'DK',
    color: 'from-primary-500 to-glow-blue',
    rating: 5,
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <div className="glass rounded-2xl p-6 hover:bg-glass/[0.04] transition-all duration-500 hover:-translate-y-1 group flex flex-col">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm sm:text-base text-main/60 leading-relaxed mb-6 flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-xs font-bold text-main`}>
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-medium text-main/80">{testimonial.name}</p>
          <p className="text-xs text-main/40">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonials — Grid of customer testimonial cards with ratings and avatars.
 */
export default function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28" aria-label="Customer testimonials" id="testimonials">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            badge="Testimonials"
            title="Loved by teams worldwide"
            subtitle="See what our customers have to say about their experience with SynapseFlow AI."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80}>
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
