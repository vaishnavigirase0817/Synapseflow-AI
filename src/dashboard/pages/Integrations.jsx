import React from 'react';

export default function Integrations() {
  const integrations = [
    { name: 'Slack', category: 'Communication', status: 'Connected', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Salesforce', category: 'CRM', status: 'Connected', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Zendesk', category: 'Support', status: 'Available', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Stripe', category: 'Payments', status: 'Available', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { name: 'GitHub', category: 'Development', status: 'Connected', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { name: 'HubSpot', category: 'Marketing', status: 'Available', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Integrations</h1>
          <p className="text-sm text-main/50">Connect SynapseFlow with your favorite tools.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-main/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search integrations..."
            className="w-full pl-9 pr-4 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-xl text-sm text-main placeholder-main/30 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, i) => (
          <div key={i} className="glass rounded-xl border border-glass/[0.06] p-6 flex flex-col hover:border-glass/20 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-glass/5 flex items-center justify-center text-main/80 group-hover:text-main transition-colors border border-glass/10">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={integration.icon} />
                </svg>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${integration.status === 'Connected' ? 'text-glow-emerald bg-glow-emerald/10 border-glow-emerald/20' : 'text-main/40 bg-glass/5 border-glass/10'}`}>
                {integration.status}
              </span>
            </div>
            
            <h3 className="text-lg font-display font-bold text-main mb-1">{integration.name}</h3>
            <p className="text-xs text-main/40 mb-6">{integration.category}</p>
            
            <div className="mt-auto">
              <button className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                integration.status === 'Connected'
                  ? 'bg-glass/[0.04] text-main hover:bg-glass/[0.08] border border-glass/[0.08]'
                  : 'bg-primary-600 text-main hover:bg-primary-500 shadow-lg shadow-primary-500/25'
              }`}>
                {integration.status === 'Connected' ? 'Configure' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
