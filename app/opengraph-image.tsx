import { ImageResponse } from "next/og";

// Default social-share image for every page (1200x630), generated at build time.
export const alt = "Pineapplix — Semiconductor Design IP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#000",
          backgroundImage:
            "linear-gradient(rgba(243,212,50,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(243,212,50,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#FAFAFA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#F3D432" }} />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
            Pineapp<span style={{ color: "#F3D432" }}>lix</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
            Silicon-Proven Design IP for Next-Gen SoCs
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#888888" }}>
            Configurable · Verified · Easy to integrate
          </div>
        </div>
      </div>
    ),
    size,
  );
}
