/**
 * ConnectionLines — SVG animated connection lines that radiate from
 * the central dashboard to the surrounding holographic cards.
 * Uses stroke-dasharray animation for flowing data effect.
 */
export default function ConnectionLines() {
  const lines = [
    // Top-left
    { x1: 250, y1: 200, x2: 80, y2: 60, delay: 0 },
    // Top-right
    { x1: 250, y1: 200, x2: 420, y2: 80, delay: 0.5 },
    // Left
    { x1: 200, y1: 250, x2: 40, y2: 280, delay: 1 },
    // Right
    { x1: 300, y1: 250, x2: 460, y2: 260, delay: 1.5 },
    // Bottom-left
    { x1: 220, y1: 300, x2: 70, y2: 420, delay: 2 },
    // Bottom-right
    { x1: 280, y1: 300, x2: 430, y2: 400, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center" aria-hidden="true">
      <svg
        className="w-[480px] h-[480px] lg:w-[560px] lg:h-[560px] 4k:w-[750px] 4k:h-[750px]"
        viewBox="0 0 500 500"
        fill="none"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {lines.map((line, i) => {
          // Create curved paths using quadratic bezier
          const midX = (line.x1 + line.x2) / 2;
          const midY = (line.y1 + line.y2) / 2;
          const ctrlX = midX + (Math.random() > 0.5 ? 30 : -30);
          const ctrlY = midY + (Math.random() > 0.5 ? 30 : -30);

          return (
            <g key={i}>
              {/* Glow line */}
              <path
                d={`M ${line.x1} ${line.y1} Q ${ctrlX} ${ctrlY} ${line.x2} ${line.y2}`}
                stroke="url(#line-gradient)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="8 4"
                filter="url(#line-glow)"
                opacity="0.5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-24"
                  dur="2s"
                  begin={`${line.delay}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Endpoint dot */}
              <circle
                cx={line.x2}
                cy={line.y2}
                r="2.5"
                fill="#22D3EE"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="3s"
                  begin={`${line.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values="2;3.5;2"
                  dur="3s"
                  begin={`${line.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
