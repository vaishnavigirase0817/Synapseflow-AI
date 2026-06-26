/**
 * RotatingRing — SVG concentric rings with dashed strokes that rotate
 * continuously behind the AI Dashboard. Includes glow filter.
 */
export default function RotatingRing() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] 4k:w-[750px] 4k:h-[750px]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <defs>
          <filter id="ring-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="ring-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="ring-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Outer ring — clockwise */}
        <g className="animate-rotate-ring" style={{ transformOrigin: '250px 250px' }}>
          <circle
            cx="250"
            cy="250"
            r="240"
            stroke="url(#ring-gradient-1)"
            strokeWidth="1"
            strokeDasharray="12 8 4 8"
            fill="none"
            filter="url(#ring-glow)"
          />
        </g>

        {/* Middle ring — counter-clockwise */}
        <g className="animate-rotate-ring-reverse" style={{ transformOrigin: '250px 250px' }}>
          <circle
            cx="250"
            cy="250"
            r="200"
            stroke="url(#ring-gradient-2)"
            strokeWidth="0.75"
            strokeDasharray="20 10 5 10"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Inner ring — clockwise slow */}
        <g className="animate-rotate-ring" style={{ transformOrigin: '250px 250px', animationDuration: '30s' }}>
          <circle
            cx="250"
            cy="250"
            r="160"
            stroke="url(#ring-gradient-1)"
            strokeWidth="0.5"
            strokeDasharray="6 12"
            fill="none"
            opacity="0.35"
          />
        </g>

        {/* Accent dots on outer ring */}
        <g className="animate-rotate-ring" style={{ transformOrigin: '250px 250px' }}>
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 250 + 240 * Math.cos(rad);
            const cy = 250 + 240 * Math.sin(rad);
            return (
              <circle
                key={angle}
                cx={cx}
                cy={cy}
                r="3"
                fill="#6366F1"
                opacity="0.8"
              >
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="3s"
                  begin={`${angle / 100}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
