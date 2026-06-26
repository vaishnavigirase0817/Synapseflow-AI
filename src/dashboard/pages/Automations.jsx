import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Automations() {
  const navigate = useNavigate();
  const automations = [
    { name: 'Customer Onboarding', status: 'Active', triggers: 1245, lastRun: '2 mins ago' },
    { name: 'Invoice Processing', status: 'Active', triggers: 856, lastRun: '1 hour ago' },
    { name: 'Lead Routing', status: 'Paused', triggers: 0, lastRun: '2 days ago' },
    { name: 'Database Backup', status: 'Active', triggers: 120, lastRun: '12 hours ago' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Automations</h1>
          <p className="text-sm text-main/50">Manage your active workflow automations.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/workflow-builder')}
          className="px-4 py-2 rounded-lg bg-primary-600 text-sm font-medium text-main hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/25 flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((auto, i) => (
          <div key={i} className="glass rounded-xl border border-glass/[0.06] p-6 hover:-translate-y-1 transition-transform group cursor-pointer" onClick={() => navigate('/dashboard/workflow-builder')}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${auto.status === 'Active' ? 'text-glow-emerald bg-glow-emerald/10 border-glow-emerald/20' : 'text-main/40 bg-glass/5 border-glass/10'}`}>
                {auto.status}
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-main mb-1 group-hover:text-primary-300 transition-colors">{auto.name}</h3>
            <p className="text-xs text-main/40 mb-4">Last run: {auto.lastRun}</p>
            <div className="flex items-center justify-between pt-4 border-t border-glass/[0.06]">
              <span className="text-sm font-medium text-main">{auto.triggers.toLocaleString()}</span>
              <span className="text-xs text-main/40">Runs this week</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
