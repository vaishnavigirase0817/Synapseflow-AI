import { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';

/**
 * Contact — Contact form section with glass styling and input validation.
 */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl
    bg-white/[0.03] border border-white/[0.08]
    text-white text-sm placeholder-white/25
    focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/30
    hover:border-white/15
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <section className="relative py-20 lg:py-28" aria-label="Contact us" id="contact">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative">
        <ScrollReveal>
          <SectionHeading
            badge="Contact"
            title="Get in touch"
            subtitle="Have a question or want a personalized demo? We'd love to hear from you."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <ScrollReveal delay={100}>
            <div className="glass rounded-2xl p-6 sm:p-8 min-h-[480px] flex flex-col justify-center">
              {status === 'success' ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-glow-emerald/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-glow-emerald" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-white/50">We'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', company: '', message: '' }); }}
                    className="mt-6 px-4 py-2 text-xs font-medium text-white/50 hover:text-white transition-colors border border-white/10 hover:bg-white/[0.05] rounded-lg"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-white/50 mb-1.5">Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        minLength="2"
                        maxLength="100"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                        autoComplete="name"
                        aria-required="true"
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses}
                        autoComplete="email"
                        aria-required="true"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium text-white/50 mb-1.5">Company</label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      maxLength="100"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses}
                      autoComplete="organization"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-white/50 mb-1.5">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      minLength="10"
                      maxLength="1000"
                      placeholder="Tell us about your needs..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClasses} resize-none`}
                      aria-required="true"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full relative overflow-hidden rounded-xl font-medium transition-all duration-300 shadow-lg px-6 py-3 flex items-center justify-center gap-2 ${
                      status === 'loading' ? 'bg-primary-500/50 text-white/70 shadow-none cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-500 shadow-primary-500/25'
                    }`}
                    aria-label="Send message"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              {[
                {
                  icon: '📧',
                  title: 'Email Us',
                  detail: 'hello@synapseflow.ai',
                  sub: 'We reply within 24 hours',
                },
                {
                  icon: '💬',
                  title: 'Live Chat',
                  detail: 'Available 24/7',
                  sub: 'Talk to our support team',
                },
                {
                  icon: '📍',
                  title: 'Office',
                  detail: 'San Francisco, CA',
                  sub: '100 AI Boulevard, Suite 500',
                },
                {
                  icon: '📞',
                  title: 'Phone',
                  detail: '+1 (555) 123-4567',
                  sub: 'Mon-Fri, 9am-6pm PST',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl glass hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white/80">{item.title}</h4>
                    <p className="text-sm text-primary-300 font-medium">{item.detail}</p>
                    <p className="text-xs text-white/35 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
