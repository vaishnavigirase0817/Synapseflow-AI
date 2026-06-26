import { useState, useRef, useEffect } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';

const FAQ_ITEMS = [
  {
    question: 'How does SynapseFlow AI handle my data?',
    answer: 'Your data is encrypted end-to-end with AES-256 encryption. We are SOC2 Type II, GDPR, and HIPAA compliant. Data never leaves your preferred region, and you maintain full ownership and control at all times.',
  },
  {
    question: 'Can I integrate with my existing tools?',
    answer: 'Absolutely. SynapseFlow connects with 500+ platforms including Salesforce, HubSpot, Slack, Jira, Snowflake, BigQuery, and more. We also offer a REST API and webhook support for custom integrations.',
  },
  {
    question: 'Do I need a technical team to set up?',
    answer: 'Not at all. Our visual workflow builder requires zero code. Most teams are up and running within a day. For complex setups, our onboarding team provides hands-on support at no extra cost.',
  },
  {
    question: 'What happens when I exceed my plan limits?',
    answer: 'We\'ll notify you when you\'re approaching limits. You can upgrade anytime with prorated billing. We never cut service without warning — your workflows continue running while you decide.',
  },
  {
    question: 'How accurate are the AI predictions?',
    answer: 'Our models achieve an average of 98.7% accuracy across use cases. Each model is continuously learning from your data, improving over time. You can monitor accuracy in real-time through the dashboard.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Every plan includes a 14-day free trial with full access to all features. No credit card required to start. You can also schedule a personalized demo with our team.',
  },
  {
    question: 'What support is available?',
    answer: 'Starter plans include email support (24h response). Pro plans include priority support with 4h response times and live chat. Enterprise plans get dedicated account managers and 24/7 phone support.',
  },
];

function FAQItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'glass-strong ring-1 ring-primary-400/10' : 'glass hover:bg-white/[0.03]'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-400"
        aria-expanded={isOpen}
        aria-controls={`faq-${index}`}
        id={`faq-btn-${index}`}
      >
        <span className="font-display font-medium text-base sm:text-lg text-white/80">{item.question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary-500/20 rotate-45' : ''}`}>
          <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      <div
        id={`faq-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          <p className="text-sm sm:text-base text-white/45 leading-relaxed border-t border-white/[0.06] pt-4">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ — Accordion-style frequently asked questions section.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-20 lg:py-28" aria-label="Frequently asked questions" id="faq">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            badge="FAQ"
            title="Frequently asked questions"
            subtitle="Everything you need to know about SynapseFlow AI. Can't find what you're looking for? Contact our team."
          />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
