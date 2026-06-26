import React, { useState } from 'react';
import { useMockData } from '../hooks/useMockData';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';

const FILTERS = ['Today', 'Week', 'Month', 'Year'];

export default function Analytics() {
  const data = useMockData();
  const [activeFilter, setActiveFilter] = useState('Month');

  // Derive mock data based on filter selection to simulate real interactivity
  const multiplier = activeFilter === 'Today' ? 0.2 : activeFilter === 'Week' ? 0.5 : activeFilter === 'Year' ? 12 : 1;
  const barData = data.traffic.map(v => Math.round(v * multiplier));
  const lineData = data.revenue.map(v => Math.round(v * multiplier));
  const pieData = [
    Math.round(4500 * multiplier), 
    Math.round(3200 * multiplier), 
    Math.round(1800 * multiplier)
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Analytics</h1>
          <p className="text-sm text-main/50">Detailed insights into your automation performance.</p>
        </div>
        
        {/* Filter Toggle */}
        <div className="flex bg-glass/[0.04] p-1 rounded-xl border border-glass/[0.08]">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                ${activeFilter === filter 
                  ? 'bg-primary-500/20 text-primary-400 shadow-sm' 
                  : 'text-main/40 hover:text-main hover:bg-glass/[0.04]'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Bar Chart */}
        <div className="glass rounded-xl border border-glass/[0.06] p-6">
          <h3 className="text-lg font-display font-bold text-main mb-2">API Traffic Volume</h3>
          <p className="text-xs text-main/40 mb-6">Total requests processed by your workflows.</p>
          <BarChart 
            data={barData} 
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
            color="rgb(var(--color-glow-cyan))" 
          />
        </div>

        {/* Revenue Impact Line Chart */}
        <div className="glass rounded-xl border border-glass/[0.06] p-6">
          <h3 className="text-lg font-display font-bold text-main mb-2">Revenue Impact</h3>
          <p className="text-xs text-main/40 mb-6">Estimated cost savings from automated tasks.</p>
          <LineChart 
            data={lineData} 
            color="rgb(var(--color-glow-emerald))" 
            height={250} 
          />
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Distribution Pie Chart */}
        <div className="glass rounded-xl border border-glass/[0.06] p-6 lg:col-span-1 flex flex-col">
          <h3 className="text-lg font-display font-bold text-main mb-2">Workflow Triggers</h3>
          <p className="text-xs text-main/40 mb-6">Distribution of how automations are started.</p>
          <div className="flex-1 flex items-center justify-center">
            <PieChart 
              data={pieData}
              colors={["rgb(var(--color-primary-500))", "rgb(var(--color-glow-cyan))", "rgb(var(--color-glow-emerald))"]}
              labels={['Webhooks', 'Schedules', 'Manual']}
              size={200}
            />
          </div>
        </div>

        {/* Top Performing Workflows */}
        <div className="glass rounded-xl border border-glass/[0.06] p-6 lg:col-span-2">
          <h3 className="text-lg font-display font-bold text-main mb-6">Top Performing Workflows</h3>
          <div className="space-y-4">
            {[
              { name: 'Customer Onboarding', runs: 1245 * multiplier, rate: 99.8 },
              { name: 'Invoice Processing', runs: 856 * multiplier, rate: 98.5 },
              { name: 'Lead Routing', runs: 3450 * multiplier, rate: 99.9 },
              { name: 'Database Backup', runs: 120 * multiplier, rate: 100 },
            ].sort((a,b) => b.runs - a.runs).map((workflow, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-glass/[0.02] border border-glass/[0.04] hover:bg-glass/[0.04] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold">
                    #{i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-main">{workflow.name}</h4>
                    <p className="text-xs text-main/40 mt-0.5">{workflow.runs.toLocaleString()} runs</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-glow-emerald">{workflow.rate}%</p>
                  <p className="text-xs text-main/40 mt-0.5">Success Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
