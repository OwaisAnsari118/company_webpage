/**
 * UART Controller IP — top-level block diagram (pure SVG).
 * Edit box positions/labels here; arrows are plain paths with a shared marker.
 */
type Box = { x: number; y: number; w: number; h: number; title: string; sub?: string; accent?: boolean };

const boxes: Box[] = [
  { x: 30, y: 40, w: 130, h: 230, title: "Bus Interface", sub: "APB / AHB / AXI4-Lite", accent: true },
  { x: 200, y: 40, w: 140, h: 230, title: "Register Block", sub: "CTRL · STATUS · DIV · IER" },
  { x: 390, y: 40, w: 130, h: 60, title: "TX FIFO", sub: "depth N" },
  { x: 390, y: 210, w: 130, h: 60, title: "RX FIFO", sub: "depth N" },
  { x: 570, y: 40, w: 130, h: 60, title: "Transmitter", sub: "shift + framing" },
  { x: 570, y: 125, w: 130, h: 60, title: "Baud Rate Gen", sub: "fractional divider", accent: true },
  { x: 570, y: 210, w: 130, h: 60, title: "Receiver", sub: "16× oversampling" },
  { x: 200, y: 300, w: 140, h: 55, title: "Interrupt Ctrl", sub: "mask · status" },
];

// [path, label?, labelX?, labelY?]
const arrows: { d: string; label?: string; lx?: number; ly?: number; both?: boolean; dashed?: boolean }[] = [
  { d: "M2 155 H28", both: true },
  { d: "M162 155 H198", both: true },
  { d: "M342 70 H388" },
  { d: "M388 240 H342" },
  { d: "M522 70 H568" },
  { d: "M568 240 H522" },
  { d: "M342 155 H568", label: "baud divisor", lx: 455, ly: 148 },
  { d: "M635 125 V102" },
  { d: "M635 185 V208" },
  { d: "M702 62 H770", label: "TXD", lx: 774, ly: 66 },
  { d: "M702 85 H770", label: "RTS", lx: 774, ly: 89, dashed: true },
  { d: "M770 225 H702", label: "RXD", lx: 774, ly: 229 },
  { d: "M770 255 H702", label: "CTS", lx: 774, ly: 259, dashed: true },
  { d: "M198 327 H6", label: "IRQ", lx: 40, ly: 320 },
  { d: "M455 272 V380 H270 V357", label: "status / error flags", lx: 362, ly: 373 },
  { d: "M635 272 V380 H455" },
];

export function UartBlockDiagram() {
  return (
    <svg
      viewBox="0 0 820 400"
      role="img"
      aria-labelledby="uart-diagram-title uart-diagram-desc"
      className="h-auto w-full"
    >
      <title id="uart-diagram-title">UART Controller IP block diagram</title>
      <desc id="uart-diagram-desc">
        The system bus connects to a bus interface (APB, AHB or AXI4-Lite), which connects to the
        register block. The register block writes to the TX FIFO, which feeds the transmitter
        driving TXD and RTS. The receiver samples RXD and CTS and writes into the RX FIFO, which is
        read by the register block. A baud rate generator, configured by the register block, clocks
        both the transmitter and the receiver. FIFO and receiver status feed an interrupt
        controller that drives the IRQ output.
      </desc>
      <defs>
        <marker id="uart-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#F3D432" />
        </marker>
      </defs>

      {/* IP boundary */}
      <rect x="20" y="20" width="700" height="370" rx="10" fill="none" stroke="#2B2B2B" strokeDasharray="6 6" />
      <text x="710" y="34" textAnchor="end" fontSize="10" fill="#888888" letterSpacing="2">
        PNX UART IP
      </text>

      <g fill="none" stroke="#F3D432" strokeWidth="1.5">
        {arrows.map((a) => (
          <path
            key={a.d}
            d={a.d}
            markerEnd="url(#uart-arrow)"
            markerStart={a.both ? "url(#uart-arrow)" : undefined}
            strokeDasharray={a.dashed ? "4 4" : undefined}
            strokeOpacity={0.8}
          />
        ))}
      </g>
      <g fontSize="11" fill="#FAFAFA" fontFamily="var(--font-sans), sans-serif">
        {arrows.filter((a) => a.label).map((a) => (
          <text key={a.label} x={a.lx} y={a.ly} textAnchor={a.label === "baud divisor" || a.label?.startsWith("status") ? "middle" : "start"} fill={a.label?.length === 3 ? "#F3D432" : "#888888"} fontWeight={a.label?.length === 3 ? 600 : 400}>
            {a.label}
          </text>
        ))}
      </g>

      {boxes.map((b) => (
        <g key={b.title}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="6"
            fill={b.accent ? "#F3D432" : "#1A1A1A"}
            stroke={b.accent ? "#F3D432" : "#2B2B2B"}
          />
          <text
            x={b.x + b.w / 2}
            y={b.y + b.h / 2 - (b.sub ? 3 : -4)}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fontFamily="var(--font-display), sans-serif"
            fill={b.accent ? "#000" : "#FAFAFA"}
          >
            {b.title}
          </text>
          {b.sub && (
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + 14}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-sans), sans-serif"
              fill={b.accent ? "#1A1A1A" : "#888888"}
            >
              {b.sub}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
