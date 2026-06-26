import React from 'react';

/**
 * ActivityFeed — Renders a list of recent events with distinct styles based on event type.
 */
export default function ActivityFeed({ activities }) {
  if (!activities || activities.length === 0) {
    return <div className="text-main/40 text-sm">No recent activity.</div>;
  }

  const getIconAndColor = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
          color: 'text-glow-emerald bg-glow-emerald/10 border-glow-emerald/20'
        };
      case 'info':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
          color: 'text-primary-400 bg-primary-500/10 border-primary-500/20'
        };
      case 'warning':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        };
      case 'error':
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
          color: 'text-red-400 bg-red-500/10 border-red-500/20'
        };
      default:
        return {
          icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
          color: 'text-main/60 bg-glass/5 border-glass/10'
        };
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {activities.map((activity, i) => {
        const { icon, color } = getIconAndColor(activity.type);
        return (
          <div 
            key={activity.id} 
            className="flex gap-4 group animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${color}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {icon}
                </svg>
              </div>
              {i !== activities.length - 1 && (
                <div className="w-px h-full bg-glass/[0.06] mt-2 group-hover:bg-glass/20 transition-colors" />
              )}
            </div>
            
            <div className="pb-4 pt-1">
              <p className="text-sm font-medium text-main/90">{activity.message}</p>
              <p className="text-xs text-main/40 mt-1">{activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
