import Link from "next/link";

/**
 * Geometric pineapple / chip mark.
 * Crown = three leaf triangles; body = octagonal "die" with a diamond lattice
 * (the pineapple skin doubles as a routing grid); side ticks = package pins.
 *
 * `idSuffix` keeps the SVG clipPath id unique when the logo appears more
 * than once on a page (header + footer).
 */
export function LogoMark({
  className = "h-8 w-8",
  idSuffix = "a",
}: {
  className?: string;
  idSuffix?: string;
}) {
  const clipId = `pnx-body-${idSuffix}`;
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#000" />
      {/* crown */}
      <g fill="#F3D432">
        <polygon points="16,2.5 18.2,9.5 13.8,9.5" />
        <polygon points="10,4.5 15.2,10 11.6,11" />
        <polygon points="22,4.5 20.4,11 16.8,10" />
      </g>
      {/* body */}
      <clipPath id={clipId}>
        <polygon points="11.5,11.5 20.5,11.5 23.5,15 23.5,24.5 20,28.5 12,28.5 8.5,24.5 8.5,15" />
      </clipPath>
      <polygon
        points="11.5,11.5 20.5,11.5 23.5,15 23.5,24.5 20,28.5 12,28.5 8.5,24.5 8.5,15"
        fill="#F3D432"
      />
      <g clipPath={`url(#${clipId})`} stroke="#000" strokeWidth="1.1">
        <path d="M2 14 L18 30 M2 8 L24 30 M8 8 L30 30 M14 8 L30 24 M20 8 L30 18" />
        <path d="M30 14 L14 30 M30 8 L8 30 M24 8 L2 30 M18 8 L2 24 M12 8 L2 18" />
      </g>
      {/* pins */}
      <g fill="#F3D432">
        <rect x="5.5" y="16.5" width="2" height="1.2" rx="0.4" />
        <rect x="5.5" y="20" width="2" height="1.2" rx="0.4" />
        <rect x="5.5" y="23.5" width="2" height="1.2" rx="0.4" />
        <rect x="24.5" y="16.5" width="2" height="1.2" rx="0.4" />
        <rect x="24.5" y="20" width="2" height="1.2" rx="0.4" />
        <rect x="24.5" y="23.5" width="2" height="1.2" rx="0.4" />
      </g>
    </svg>
  );
}

export function Logo({ idSuffix }: { idSuffix?: string }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 text-white"
      aria-label="Pineapplix — home"
    >
      <LogoMark idSuffix={idSuffix} className="h-8 w-8 ring-1 ring-ink-800 rounded-[7px]" />
      <span className="font-display text-xl font-bold tracking-tight">
        Pineapp<span className="text-brand-yellow">lix</span>
      </span>
    </Link>
  );
}
