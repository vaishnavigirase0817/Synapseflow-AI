import React, { useMemo } from 'react';

/**
 * LineChart — A pure SVG, accessible, and animated line chart built from scratch.
 * 
 * @param {Object} props
 * @param {Array<number>} props.data - Array of data points
 * @param {string} props.color - Hex or rgb color string
 * @param {number} props.height - Chart height in px
 */
export default function LineChart({ data, color = '#6366f1', height = 250 }) {
  const points = useMemo(() => {
    if (!data || data.length === 0) return '';
    const max = Math.max(...data) * 1.2; // Add 20% headroom
    const min = Math.min(...data) * 0.8;
    const range = max - min || 1;
    
    // Width is normalized to 1000 viewBox units
    const step = 1000 / (data.length - 1 || 1);
    
    return data.map((val, i) => {
      const x = i * step;
      // Invert Y axis for SVG (0 is top)
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
  }, [data, height]);

  if (!data || data.length === 0) return null;

  // Create an area polygon under the line
  const areaPoints = `${points} 1000,${height} 0,${height}`;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: `${height}px` }}>
      <svg
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        aria-label="Line Chart"
        role="img"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <polygon
          points={areaPoints}
          fill={`url(#gradient-${color})`}
          className="transition-all duration-1000 ease-in-out"
        />

        {/* SVG Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000 ease-in-out"
          style={{ 
            filter: `drop-shadow(0px 8px 12px ${color}40)`,
            animation: 'dash 2s ease-out forwards'
          }}
        />

        {/* Data Points */}
        {data.map((val, i) => {
          const max = Math.max(...data) * 1.2;
          const min = Math.min(...data) * 0.8;
          const range = max - min || 1;
          const step = 1000 / (data.length - 1 || 1);
          const x = i * step;
          const y = height - ((val - min) / range) * height;
          
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="6"
              fill="#111827"
              stroke={color}
              strokeWidth="3"
              className="transition-all duration-1000 ease-in-out hover:r-8 cursor-pointer"
            >
              <title>{val.toLocaleString()}</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
