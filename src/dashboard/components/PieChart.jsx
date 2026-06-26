import React from 'react';

/**
 * PieChart — A pure SVG animated donut chart using stroke-dasharray math.
 */
export default function PieChart({ data, colors, labels, size = 250 }) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, val) => sum + val, 0);
  const radius = size / 2.5;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center gap-8">
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        className="-rotate-90"
        aria-label="Pie Chart"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="30"
        />
        
        {data.map((val, i) => {
          const percent = val / (total || 1);
          const dash = percent * circumference;
          const offset = currentOffset;
          currentOffset += dash;

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors[i] || '#3b82f6'}
              strokeWidth="30"
              strokeDasharray={`${dash} ${circumference}`}
              strokeDashoffset={-offset}
              className="transition-all duration-1000 ease-in-out hover:stroke-width-35 cursor-pointer"
              style={{
                strokeWidth: 30,
                animation: `dash-pie-${i} 1s ease-out forwards`
              }}
            >
              <title>{labels?.[i] || `Segment ${i+1}`}: {val}</title>
            </circle>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-3">
        {data.map((val, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: colors[i] || '#3b82f6' }} />
            <span className="text-sm text-main/70 min-w-[80px]">{labels?.[i] || `Data ${i+1}`}</span>
            <span className="text-sm font-display font-semibold text-main">
              {((val / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
