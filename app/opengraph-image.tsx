import { ImageResponse } from "next/og";
import { business } from "@/config/business";

export const alt = `${business.name}: Snow Removal & Ice Management`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a1220 0%, #16283f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, color: "#ea580c", fontWeight: 700, display: "flex" }}>
          {business.name}
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 24, lineHeight: 1.1, display: "flex" }}>
          Snow Removal & Ice Management
        </div>
        <div style={{ fontSize: 28, color: "#cbd5e1", marginTop: 24, display: "flex" }}>
          Residential & commercial plowing with 24/7 storm dispatch
        </div>
      </div>
    ),
    { ...size },
  );
}
