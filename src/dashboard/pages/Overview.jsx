import React from 'react';
import { useMockData } from '../hooks/useMockData';
import LineChart from '../components/LineChart';
import ActivityFeed from '../components/ActivityFeed';

/**
 * Overview — The main landing page for the dashboard.
 */
export default function Overview() {
  const data = useMockData();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Welcome back, Jane</h1>
          <p className="text-sm text-main/50">Here's what's happening with your automations today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-glass/[0.04] text-sm font-medium text-main hover:bg-glass/[0.08] transition-colors border border-glass/[0.08]">
            Export Report
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-600 text-sm font-medium text-main hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/25 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Automation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI Cards Placeholder */}
        {[
          { label: 'Active Workflows', value: data.activeWorkflows.toString(), change: '+12%', positive: true },
          { label: 'Tasks Automated', value: data.tasksAutomated.toLocaleString(), change: '+28%', positive: true },
          { label: 'Time Saved (hrs)', value: data.timeSaved.toLocaleString(), change: '+8%', positive: true },
          { label: 'Error Rate', value: `${data.errorRate}%`, change: '-0.05%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-5 border border-glass/[0.06] hover:bg-glass/[0.02] transition-colors">
            <p className="text-sm text-main/50 font-medium mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-display font-bold text-main transition-all duration-300">{stat.value}</h3>
              <span className={`text-sm font-medium ${stat.positive ? 'text-glow-emerald' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xl border border-glass/[0.06] p-6 min-h-[400px]">
          <h3 className="text-lg font-display font-bold text-main mb-4">Automation Performance</h3>
          <div className="w-full h-full pt-4">
            <LineChart data={data.revenue} color="rgb(var(--color-primary-500))" height={280} />
          </div>
        </div>

        <div className="glass rounded-xl border border-glass/[0.06] p-6 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-main">Live Activity</h3>
            <span className="flex items-center gap-1.5 text-xs text-glow-emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-glow-emerald animate-pulse" />
              Live
            </span>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
            <ActivityFeed activities={data.activityFeed} />
          </div>
        </div>
      </div>
    </div>
  );
}
