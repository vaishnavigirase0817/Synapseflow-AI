import React, { useState } from 'react';

const NODES = [
  { id: 'trigger', type: 'trigger', title: 'New Customer Signed Up', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'action-1', type: 'action', title: 'Add to CRM Database', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4' },
  { id: 'condition-1', type: 'condition', title: 'If Plan == "Enterprise"', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { id: 'action-2', type: 'action', title: 'Send Welcome Email (CEO)', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export default function WorkflowBuilder() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const handleTest = () => {
    setIsPlaying(true);
    let current = 0;
    
    const runNode = () => {
      if (current >= NODES.length) {
        setIsPlaying(false);
        setActiveNode(null);
        return;
      }
      setActiveNode(NODES[current].id);
      current++;
      setTimeout(runNode, 1000);
    };

    runNode();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Workflow Builder</h1>
          <p className="text-sm text-main/50">Visually construct AI-driven automations.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleTest}
            disabled={isPlaying}
            className="px-4 py-2 rounded-lg bg-glow-emerald/20 text-sm font-medium text-glow-emerald hover:bg-glow-emerald/30 transition-colors border border-glow-emerald/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPlaying ? (
              <span className="w-4 h-4 rounded-full border-2 border-glow-emerald border-t-transparent animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {isPlaying ? 'Testing...' : 'Test Run'}
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-600 text-sm font-medium text-main hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/25">
            Publish Workflow
          </button>
        </div>
      </div>

      <div className="flex-1 glass rounded-xl border border-glass/[0.06] overflow-hidden flex relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent">
        {/* Graph Area */}
        <div className="flex-1 p-8 overflow-y-auto flex flex-col items-center">
          {NODES.map((node, i) => {
            const isActive = activeNode === node.id;
            return (
              <React.Fragment key={node.id}>
                {/* Node */}
                <div 
                  className={`
                    w-64 p-4 rounded-xl border transition-all duration-300 relative group cursor-pointer
                    ${isActive 
                      ? 'bg-primary-500/20 border-primary-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105' 
                      : 'bg-glass/[0.03] border-glass/[0.08] hover:border-glass/20 hover:bg-glass/[0.05]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${node.type === 'trigger' ? 'bg-purple-500/20 text-purple-400' :
                        node.type === 'condition' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-primary-500/20 text-primary-400'
                      }
                    `}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={node.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-main/40 font-medium uppercase tracking-wider">{node.type}</p>
                      <p className="text-sm font-bold text-main mt-0.5">{node.title}</p>
                    </div>
                  </div>

                  {/* Execution Indicator */}
                  {isActive && (
                    <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-primary-400 animate-ping" />
                  )}
                </div>

                {/* Connection Line */}
                {i !== NODES.length - 1 && (
                  <div className="w-px h-12 bg-glass/[0.1] relative">
                    {/* Animated flow particle during test */}
                    {isPlaying && activeNode === node.id && (
                      <div className="absolute -left-[3px] top-0 w-2 h-2 rounded-full bg-primary-400 animate-[slide-down_1s_linear_forwards]" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          
          {/* Add Node Button */}
          <button className="mt-8 w-12 h-12 rounded-full bg-glass/[0.03] border border-glass/[0.08] border-dashed flex items-center justify-center text-main/40 hover:text-main hover:bg-glass/[0.08] transition-colors group">
            <svg className="w-5 h-5 transition-transform group-hover:scale-110 group-active:scale-95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Sidebar Properties Panel (Mock) */}
        <div className="w-80 border-l border-glass/[0.06] bg-black/20 p-6 hidden lg:block">
          <h3 className="text-sm font-display font-bold text-main mb-6 uppercase tracking-wider text-main/50">Node Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-main/50 mb-1.5">Node Name</label>
              <input type="text" defaultValue="Send Welcome Email (CEO)" className="w-full px-3 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-lg text-sm text-main" />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-main/50 mb-1.5">Action Type</label>
              <select className="w-full px-3 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-lg text-sm text-main/80 appearance-none">
                <option>Email Notification</option>
                <option>Slack Message</option>
                <option>Webhook Call</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-main/50 mb-1.5">Configuration JSON</label>
              <textarea 
                rows="6"
                className="w-full px-3 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-lg text-sm text-main/80 font-mono"
                defaultValue={'{\n  "to": "{{customer.email}}",\n  "template": "ceo-welcome",\n  "delay": "1h"\n}'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
