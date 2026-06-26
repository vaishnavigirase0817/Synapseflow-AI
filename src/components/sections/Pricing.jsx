import { useState, useMemo, useCallback } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';
import RippleButton from '../common/RippleButton';

/**
 * PRICING CONFIGURATION — Single source of truth.
 * All prices are monthly base prices in USD.
 * Changing this object updates every plan/currency/billing combination.
 */
const PRICING_CONFIG = {
  currencies: {
    USD: { symbol: '$', code: 'USD', rate: 1 },
    INR: { symbol: '₹', code: 'INR', rate: 83 },
    EUR: { symbol: '€', code: 'EUR', rate: 0.92 },
  },
  annualDiscount: 0.20, // 20% discount
  plans: {
    starter: {
      name: 'Starter',
      monthlyPriceUSD: 29,
      description: 'Perfect for small teams getting started with AI automation.',
      features: [
        { text: 'Up to 5 team members', included: true },
        { text: '10 AI workflows', included: true },
        { text: '5,000 data points/mo', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Email support', included: true },
        { text: 'API access', included: false },
        { text: 'Custom models', included: false },
        { text: 'SSO / SAML', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    pro: {
      name: 'Pro',
      monthlyPriceUSD: 79,
      description: 'For growing teams that need advanced AI capabilities.',
      features: [
        { text: 'Up to 25 team members', included: true },
        { text: 'Unlimited workflows', included: true },
        { text: '100,000 data points/mo', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority support', included: true },
        { text: 'Full API access', included: true },
        { text: '5 custom models', included: true },
        { text: 'SSO / SAML', included: false },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    enterprise: {
      name: 'Enterprise',
      monthlyPriceUSD: 199,
      description: 'For organizations that need enterprise-grade AI infrastructure.',
      features: [
        { text: 'Unlimited team members', included: true },
        { text: 'Unlimited workflows', included: true },
        { text: 'Unlimited data points', included: true },
        { text: 'Custom dashboards', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Full API access', included: true },
        { text: 'Unlimited custom models', included: true },
        { text: 'SSO / SAML / SCIM', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  },
};

/**
 * calculatePrice — Computes the display price from the config object.
 */
function calculatePrice(planKey, currencyCode, isAnnual, config) {
  const plan = config.plans[planKey];
  const currency = config.currencies[currencyCode];
  let price = plan.monthlyPriceUSD * currency.rate;

  if (isAnnual) {
    price = price * (1 - config.annualDiscount);
  }

  // Round based on magnitude
  if (price >= 100) {
    price = Math.round(price);
  } else {
    price = Math.round(price * 100) / 100;
  }

  return price;
}

function formatPrice(price, symbol) {
  if (price >= 1000) {
    return `${symbol}${price.toLocaleString()}`;
  }
  return `${symbol}${price}`;
}

/**
 * PricingCard — Individual plan card, memoized to prevent unnecessary re-renders.
 */
function PricingCard({ planKey, plan, price, symbol, isAnnual, index }) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden transition-all duration-500
        ${plan.popular
          ? 'glass-strong ring-1 ring-primary-400/30 scale-[1.02] lg:scale-105 shadow-xl shadow-primary-500/10 z-10'
          : 'glass hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/5'
        }
      `}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-glow-cyan" />
      )}

      <div className="p-6 sm:p-7">
        {plan.popular && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary-500/20 text-primary-300 border border-primary-400/20 mb-4">
            Most Popular
          </span>
        )}

        <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-white/40 mb-5">{plan.description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-display font-bold text-4xl sm:text-5xl text-white transition-all duration-300">
            {formatPrice(price, symbol)}
          </span>
          <span className="text-sm text-white/40">/mo</span>
        </div>
        {isAnnual && (
          <p className="text-xs text-glow-emerald mb-5">Billed annually · Save 20%</p>
        )}
        {!isAnnual && <div className="mb-5" />}

        {/* CTA */}
        <RippleButton
          variant={plan.popular ? 'primary' : 'outline'}
          className="w-full justify-center mb-6"
          ariaLabel={`${plan.cta} for ${plan.name} plan`}
        >
          {plan.cta}
        </RippleButton>

        {/* Features */}
        <ul className="space-y-2.5" role="list">
          {plan.features.map((feature) => (
            <li key={feature.text} className="flex items-center gap-2.5">
              {feature.included ? (
                <svg className="w-4 h-4 text-glow-emerald flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white/15 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              <span className={`text-sm ${feature.included ? 'text-white/60' : 'text-white/25'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Pricing — Complete pricing section with currency switcher and billing toggle.
 * Only pricing values update — no global re-render.
 */
export default function Pricing() {
  const [currency, setCurrency] = useState('USD');
  const [isAnnual, setIsAnnual] = useState(true);

  // Memoize calculated prices so only affected cards re-render
  const prices = useMemo(() => {
    const result = {};
    Object.keys(PRICING_CONFIG.plans).forEach((key) => {
      result[key] = calculatePrice(key, currency, isAnnual, PRICING_CONFIG);
    });
    return result;
  }, [currency, isAnnual]);

  const currencySymbol = PRICING_CONFIG.currencies[currency].symbol;

  const handleCurrency = useCallback((code) => setCurrency(code), []);
  const handleBilling = useCallback((annual) => setIsAnnual(annual), []);

  return (
    <section className="relative py-20 lg:py-28" aria-label="Pricing" id="pricing">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeading
            badge="Pricing"
            title="Simple, transparent pricing"
            subtitle="Start free and scale as you grow. No hidden fees, no surprises."
          />
        </ScrollReveal>

        {/* Controls */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {/* Currency switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl glass" role="radiogroup" aria-label="Currency selection">
              {Object.entries(PRICING_CONFIG.currencies).map(([code, curr]) => (
                <button
                  key={code}
                  onClick={() => handleCurrency(code)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                    ${currency === code
                      ? 'bg-primary-500/20 text-primary-300'
                      : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
                    }
                  `}
                  role="radio"
                  aria-checked={currency === code}
                  aria-label={`${curr.symbol} ${code}`}
                >
                  {curr.symbol} {code}
                </button>
              ))}
            </div>

            {/* Billing toggle */}
            <div className="flex items-center gap-3" role="radiogroup" aria-label="Billing period">
              <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
              <button
                onClick={() => handleBilling(!isAnnual)}
                className="relative w-12 h-6 rounded-full bg-white/10 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
                role="switch"
                aria-checked={isAnnual}
                aria-label="Toggle annual billing"
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                  isAnnual ? 'left-7 bg-primary-400' : 'left-1 bg-white/50'
                }`} />
              </button>
              <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-white/40'}`}>
                Annual
                <span className="ml-1 text-xs text-glow-emerald">-20%</span>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-4 max-w-5xl mx-auto items-start">
          {Object.entries(PRICING_CONFIG.plans).map(([key, plan], i) => (
            <ScrollReveal key={key} delay={i * 100}>
              <PricingCard
                planKey={key}
                plan={plan}
                price={prices[key]}
                symbol={currencySymbol}
                isAnnual={isAnnual}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
