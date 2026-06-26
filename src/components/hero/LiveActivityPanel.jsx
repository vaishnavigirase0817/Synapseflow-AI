import { useState, useEffect, useCallback } from 'react';

const ACTIVITIES = [
  { text: 'Data synchronized', icon: '✓', color: 'text-glow-emerald' },
  { text: 'AI report generated', icon: '✓', color: 'text-glow-cyan' },
  { text: 'Workflow completed', icon: '✓', color: 'text-glow-blue' },
  { text: 'Predictive model updated', icon: '✓', color: 'text-glow-violet' },
  { text: 'CRM synced', icon: '✓', color: 'text-glow-emerald' },
  { text: 'Dashboard refreshed', icon: '✓', color: 'text-glow-cyan' },
  { text: 'Anomaly detected & resolved', icon: '✓', color: 'text-glow-blue' },
  { text: 'Pipeline optimized', icon: '✓', color: 'text-glow-violet' },
];

/**
 * LiveActivityPanel — Continuously cycling activity feed that shows
 * real-time-like status updates with slide-in animations.
 */
export default function LiveActivityPanel() {
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addItem = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % ACTIVITIES.length;
      const activity = ACTIVITIES[nextIndex];

      setVisibleItems((items) => {
        const newItem = {
          ...activity,
          id: Date.now() + Math.random(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

        // Keep max 4 items visible
        const updated = [newItem, ...items].slice(0, 4);
        return updated;
      });

      return nextIndex;
    });
  }, []);

  useEffect(() => {
    // Add first item immediately
    addItem();

    const interval = setInterval(addItem, 3000);
    return () => clearInterval(interval);
  }, [addItem]);

  return (
    <div
      className="
        relative z-20
        w-full max-w-xs sm:max-w-sm
        mx-auto lg:mx-0 lg:absolute lg:right-4 xl:right-8 lg:top-1/2 lg:-translate-y-1/2
        mt-8 lg:mt-0
      "
      aria-label="Live activity feed"
      role="log"
      aria-live="polite"
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-glow-emerald opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-glow-emerald" />
        </span>
        <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
          Live Activity
        </span>
      </div>

      {/* Activity items */}
      <div className="space-y-2 overflow-hidden">
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className="
              activity-item
              glass rounded-xl px-3 py-2.5 sm:px-4 sm:py-3
              flex items-center gap-3
              transition-all duration-500
            "
            style={{
              opacity: index === 0 ? undefined : Math.max(0.3, 1 - index * 0.25),
              animationDelay: index === 0 ? '0s' : undefined,
            }}
          >
            {/* Checkmark icon */}
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-glow-emerald/10 ${item.color}`}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-white/80 font-medium truncate">
                {item.text}
              </p>
              <p className="text-[10px] text-white/30 font-mono mt-0.5">
                {item.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
