import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ScrollReveal from '../common/ScrollReveal';
import SectionHeading from '../common/SectionHeading';
import GlowCard from '../common/GlowCard';

/**
 * DashboardPreview — Premium AI dashboard with animated charts, analytics cards,
 * activity timeline, notifications, AI recommendations, and workflow builder.
 */
export default function DashboardPreview() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-label="Dashboard preview" id="dashboard">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative">
        <ScrollReveal>
          <SectionHeading
            badge="Dashboard"
            title="Your AI command center"
            subtitle="Monitor, analyze, and optimize every aspect of your business from one intelligent dashboard."
          />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden glass-strong p-1 min-h-[600px]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-glass/[0.06] bg-glass/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-glass/[0.04] text-xs text-main/40 font-mono">
                  app.synapseflow.ai/dashboard
                </div>
              </div>
            </div>

            {!isLoaded ? (
              <DashboardSkeleton />
            ) : (
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in">

              {/* Top row — Analytics cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <AnalyticsCard label="Total Revenue" value="$847,290" change="+12.5%" positive icon="💰" />
                <AnalyticsCard label="Active Users" value="24,583" change="+8.2%" positive icon="👥" />
                <AnalyticsCard label="Automations" value="1,247" change="+23.1%" positive icon="⚡" />
                <AnalyticsCard label="Avg Response" value="1.2s" change="-15.3%" positive icon="⏱️" />
              </div>

              {/* Middle row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue chart — takes 2 cols */}
                <div className="lg:col-span-2 rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-main/70">Revenue Overview</h3>
                      <p className="text-xs text-main/30 mt-0.5">Last 12 months</p>
                    </div>
                    <div className="flex gap-2">
                      {['1M', '3M', '6M', '1Y'].map((period, i) => (
                        <button
                          key={period}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-200 ${
                            i === 3 ? 'bg-primary-500/20 text-primary-300' : 'text-main/30 hover:text-main/50 hover:bg-glass/[0.04]'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                  <RevenueChart />
                </div>

                {/* AI Recommendations */}
                <div className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5">
                  <h3 className="text-sm font-medium text-main/70 mb-4">AI Recommendations</h3>
                  <div className="space-y-3">
                    <RecommendationItem
                      icon="🎯"
                      title="Optimize Pipeline"
                      desc="3 workflows can be merged for 40% efficiency gain"
                      priority="high"
                    />
                    <RecommendationItem
                      icon="📈"
                      title="Scaling Alert"
                      desc="Traffic predicted to increase 2x next week"
                      priority="medium"
                    />
                    <RecommendationItem
                      icon="🔄"
                      title="Auto-Sync"
                      desc="Enable CRM sync for 15% more data coverage"
                      priority="low"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Recent Automations */}
                <div className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5">
                  <h3 className="text-sm font-medium text-main/70 mb-4">Recent Automations</h3>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Email Campaign Trigger', status: 'active', time: '2m ago' },
                      { name: 'Data Cleanup Pipeline', status: 'completed', time: '15m ago' },
                      { name: 'Report Generator', status: 'active', time: '1h ago' },
                      { name: 'Lead Scoring Model', status: 'paused', time: '3h ago' },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-3 py-2 border-b border-glass/[0.04] last:border-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          item.status === 'active' ? 'bg-glow-emerald' :
                          item.status === 'completed' ? 'bg-glow-blue' : 'bg-yellow-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-main/70 truncate">{item.name}</p>
                          <p className="text-[10px] text-main/30">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5">
                  <h3 className="text-sm font-medium text-main/70 mb-4">Activity Timeline</h3>
                  <div className="space-y-4">
                    {[
                      { time: '09:42', text: 'New prediction model deployed', dot: 'bg-glow-cyan' },
                      { time: '09:38', text: 'Dashboard report generated', dot: 'bg-glow-emerald' },
                      { time: '09:30', text: 'Anomaly detected in sales data', dot: 'bg-yellow-400' },
                      { time: '09:15', text: 'CRM data synchronized', dot: 'bg-glow-blue' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 relative">
                        {i < 3 && <div className="absolute left-[5px] top-4 w-px h-full bg-glass/[0.06]" />}
                        <div className={`w-2.5 h-2.5 rounded-full ${item.dot} mt-1 flex-shrink-0`} />
                        <div>
                          <p className="text-xs text-main/60">{item.text}</p>
                          <p className="text-[10px] text-main/25 font-mono">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow Builder Preview */}
                <div className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5">
                  <h3 className="text-sm font-medium text-main/70 mb-4">Workflow Builder</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Trigger', sub: 'New lead created', color: 'border-glow-cyan/30 bg-glow-cyan/5' },
                      { label: 'Process', sub: 'AI scoring & enrichment', color: 'border-primary-400/30 bg-primary-400/5' },
                      { label: 'Action', sub: 'Assign to sales rep', color: 'border-accent-400/30 bg-accent-400/5' },
                      { label: 'Notify', sub: 'Send Slack alert', color: 'border-glow-emerald/30 bg-glow-emerald/5' },
                    ].map((step, i) => (
                      <div key={i}>
                        <div className={`rounded-lg border ${step.color} p-2.5 flex items-center gap-2.5`}>
                          <div className="w-6 h-6 rounded-md bg-glass/[0.06] flex items-center justify-center text-[10px] font-bold text-main/50">
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-main/70">{step.label}</p>
                            <p className="text-[10px] text-main/30">{step.sub}</p>
                          </div>
                        </div>
                        {i < 3 && (
                          <div className="flex justify-center py-1">
                            <svg className="w-4 h-4 text-main/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications bar */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500/5 border border-primary-400/10">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-sm">🔔</div>
                <p className="text-xs text-main/60 flex-1">
                  <span className="text-primary-300 font-medium">3 new notifications:</span> Model accuracy improved to 99.1% • Weekly report ready • New team member joined
                </p>
              </div>
            </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Top row skeletons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-3 sm:p-4 h-24">
            <div className="w-8 h-8 rounded-lg bg-glass/5 animate-pulse mb-3" />
            <div className="w-24 h-6 rounded bg-glass/5 animate-pulse mb-2" />
            <div className="w-16 h-3 rounded bg-glass/5 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Middle row skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5 h-48 flex flex-col justify-between">
          <div className="w-32 h-4 rounded bg-glass/5 animate-pulse" />
          <div className="w-full h-24 rounded bg-glass/5 animate-pulse mt-4" />
        </div>
        <div className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-4 sm:p-5 h-48 space-y-4">
          <div className="w-40 h-4 rounded bg-glass/5 animate-pulse mb-6" />
          <div className="w-full h-8 rounded bg-glass/5 animate-pulse" />
          <div className="w-full h-8 rounded bg-glass/5 animate-pulse" />
          <div className="w-full h-8 rounded bg-glass/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard({ label, value, change, positive, icon }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className="rounded-xl bg-glass/[0.02] border border-glass/[0.05] p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg">{icon}</span>
        <span className={`text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-md ${
          positive ? 'text-glow-emerald bg-glow-emerald/10' : 'text-red-400 bg-red-400/10'
        }`}>
          {change}
        </span>
      </div>
      <p className="font-display font-bold text-lg sm:text-xl text-main metric-counter">{value}</p>
      <p className="text-[10px] sm:text-xs text-main/40 mt-0.5">{label}</p>
    </div>
  );
}

function RevenueChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const values = [45, 52, 48, 61, 55, 68, 72, 65, 78, 82, 88, 95];
  const maxVal = Math.max(...values);
  const width = 500;
  const height = 120;

  const points = values.map((v, i) => ({
    x: (i / (values.length - 1)) * width,
    y: height - (v / maxVal) * height * 0.85 - 10,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full h-32 sm:h-40">
        <defs>
          <linearGradient id="dash-chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dash-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="50%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <line
            key={pct}
            x1="0" y1={height * pct}
            x2={width} y2={height * pct}
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#dash-chart-gradient)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="url(#dash-line-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#818CF8" opacity="0.8">
            <animate attributeName="r" values="2;3.5;2" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Month labels */}
        {months.map((m, i) => (
          <text
            key={m}
            x={(i / (months.length - 1)) * width}
            y={height + 16}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize="8"
            fontFamily="Inter, sans-serif"
          >
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}

function RecommendationItem({ icon, title, desc, priority }) {
  const priorityColors = {
    high: 'border-l-red-400/50',
    medium: 'border-l-yellow-400/50',
    low: 'border-l-glow-emerald/50',
  };

  return (
    <div className={`pl-3 border-l-2 ${priorityColors[priority]} py-1`}>
      <div className="flex items-center gap-2 mb-0.5">
        <span className="text-sm">{icon}</span>
        <p className="text-xs font-medium text-main/70">{title}</p>
      </div>
      <p className="text-[10px] text-main/35 leading-relaxed">{desc}</p>
    </div>
  );
}
