/**
 * Lightweight animated hero background: a faint grid plus a few circuit
 * traces whose dashes travel along the path. Pure SVG + CSS (no JS, no canvas).
 * Animation is disabled for prefers-reduced-motion (see globals.css).
 */
const traces = [
  "M0 120 H180 L220 160 H420 L460 120 H700",
  "M1200 80 H980 L940 120 H760 L720 160 H600",
  "M0 420 H120 L160 380 H360 L400 420 H520",
  "M1200 460 H1040 L1000 420 H860 L820 460 H700",
  "M300 600 V520 L340 480 H480",
  "M900 0 V60 L940 100 H1080",
  "M560 600 V540 L600 500 H760 L800 540 V600",
];

const nodes: [number, number][] = [
  [700, 120], [600, 160], [520, 420], [700, 460], [480, 480], [1080, 100], [180, 120], [1040, 460],
];

export function CircuitBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#F3D432" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>
          <radialGradient id="hero-fade" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        <rect width="1200" height="600" fill="url(#hero-grid)" />

        {/* static traces */}
        <g fill="none" stroke="#F3D432" strokeOpacity="0.12" strokeWidth="1.5">
          {traces.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {/* moving signal dashes */}
        <g fill="none" stroke="#F3D432" strokeOpacity="0.55" strokeWidth="1.5">
          {traces.map((d, i) => (
            <path
              key={d}
              d={d}
              className="circuit-trace animate-trace-flow"
              style={{ animationDelay: `${i * -0.9}s`, animationDuration: `${5 + (i % 3)}s` }}
            />
          ))}
        </g>
        {/* via nodes */}
        <g fill="#F3D432">
          {nodes.map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="3.5"
              className="circuit-node animate-pulse-dot"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>

        <rect width="1200" height="600" fill="url(#hero-fade)" />
      </svg>
    </div>
  );
}
