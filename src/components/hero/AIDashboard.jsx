import { useState, useEffect } from 'react';

/**
 * AIDashboard — Central glass card displaying a mock AI dashboard with
 * animated metrics, mini chart, and status indicators.
 */
export default function AIDashboard() {
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    processed: 0,
    workflows: 0,
  });

  // Animate counters on mount
  useEffect(() => {
    const targets = { accuracy: 98.7, processed: 24853, workflows: 1247 };
    const duration = 2000;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setMetrics({
        accuracy: +(targets.accuracy * ease).toFixed(1),
        processed: Math.round(targets.processed * ease),
        workflows: Math.round(targets.workflows * ease),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="relative animate-float z-10">
      <div
        className="
          relative mx-auto
          w-72 sm:w-80 md:w-[420px] lg:w-[500px] 4k:w-[650px]
          rounded-2xl sm:rounded-3xl overflow-hidden
          glass-strong
          animate-pulse-glow-slow
        "
        role="img"
        aria-label="AI Dashboard preview showing real-time analytics"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-0.5 rounded-md bg-white/[0.04] text-[10px] sm:text-xs text-white/40 font-mono">
              synapseflow.ai/dashboard
            </div>
          </div>
          <div className="w-12" />
        </div>

        {/* Dashboard body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <MetricCard
              label="Accuracy"
              value={`${metrics.accuracy}%`}
              trend="+2.3%"
              color="text-glow-cyan"
            />
            <MetricCard
              label="Processed"
              value={metrics.processed.toLocaleString()}
              trend="+1.2K"
              color="text-glow-blue"
            />
            <MetricCard
              label="Workflows"
              value={metrics.workflows.toLocaleString()}
              trend="+89"
              color="text-glow-violet"
            />
          </div>

          {/* Mini chart */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] sm:text-xs text-white/50 font-medium">AI Performance</span>
              <span className="text-[10px] sm:text-xs text-glow-emerald font-mono">Live</span>
            </div>
            <MiniChart />
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-3 flex-wrap">
            <StatusPill label="Models Active" status="active" count={12} />
            <StatusPill label="Queue" status="processing" count={34} />
            <StatusPill label="Errors" status="error" count={0} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, color }) {
  return (
    <div className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-2 sm:p-3">
      <p className="text-[9px] sm:text-[10px] text-white/40 font-medium mb-1">{label}</p>
      <p className={`text-sm sm:text-lg font-display font-bold metric-counter ${color}`}>
        {value}
      </p>
      <p className="text-[9px] sm:text-[10px] text-glow-emerald/80 mt-0.5">
        {trend}
      </p>
    </div>
  );
}

function MiniChart() {
  const points = [20, 35, 28, 45, 38, 52, 48, 60, 55, 72, 68, 80, 75, 85, 82, 90];
  const width = 300;
  const height = 60;
  const maxVal = Math.max(...points);

  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / maxVal) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12 sm:h-16">
      <defs>
        <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chart-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#chart-gradient)" />
      <path
        d={pathData}
        fill="none"
        stroke="url(#chart-line-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Animated endpoint dot */}
      <circle
        cx={width}
        cy={height - (points[points.length - 1] / maxVal) * height}
        r="3"
        fill="#818CF8"
      >
        <animate
          attributeName="r"
          values="3;5;3"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

function StatusPill({ label, status, count }) {
  const colors = {
    active: 'bg-glow-emerald/10 text-glow-emerald border-glow-emerald/20',
    processing: 'bg-glow-blue/10 text-glow-blue border-glow-blue/20',
    error: 'bg-red-400/10 text-red-400 border-red-400/20',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${colors[status]}`}>
      <span className="relative flex h-1.5 w-1.5">
        {status === 'active' && (
          <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-glow-emerald opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
          status === 'active' ? 'bg-glow-emerald' :
          status === 'processing' ? 'bg-glow-blue' : 'bg-red-400'
        }`} />
      </span>
      {label}: {count}
    </div>
  );
}
