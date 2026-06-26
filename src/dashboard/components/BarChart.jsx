import React from 'react';

/**
 * BarChart — A pure SVG animated bar chart built from scratch.
 */
export default function BarChart({ data, labels, color = '#3b82f6', height = 250 }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data) * 1.1; // 10% headroom

  return (
    <div className="relative w-full overflow-hidden" style={{ height: `${height + 30}px` }}>
      <div className="flex items-end justify-between w-full h-[250px] gap-2 lg:gap-4 px-2">
        {data.map((val, i) => {
          const heightPercent = max > 0 ? (val / max) * 100 : 0;
          return (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
              <div 
                className="w-full max-w-[48px] rounded-t-sm transition-all duration-1000 ease-in-out cursor-pointer relative"
                style={{ 
                  height: `${heightPercent}%`, 
                  backgroundColor: color,
                  opacity: 0.8
                }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-400 text-main text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 shadow-xl border border-glass/10">
                  {val.toLocaleString()}
                </div>
                {/* Hover effect highlight */}
                <div className="absolute inset-0 bg-glass/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm" />
              </div>
              <span className="text-[10px] sm:text-xs text-main/40 mt-3 font-medium tracking-wider uppercase">
                {labels?.[i] || `M${i+1}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
