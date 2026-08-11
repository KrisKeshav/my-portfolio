import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "edge";
export const alt = `${site.name} — Student & Developer Portfolio`;
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
          alignItems: "center",
          backgroundColor: "#0A0C10",
          padding: "60px",
          fontFamily: "monospace",
        }}
      >
        {/* Terminal card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "1000px",
            borderRadius: "20px",
            border: "1px solid #22262E",
            overflow: "hidden",
            backgroundColor: "#111419",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 24px",
              backgroundColor: "#161A21",
              borderBottom: "1px solid #22262E",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FF6058" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#28C93F" }} />
            <span style={{ marginLeft: 12, color: "#4A5261", fontSize: 14 }}>
              visitor@iitr:~$
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "40px 36px",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", color: "#4DD8D3", fontSize: 20 }}>$ whoami</div>
            <div style={{ display: "flex", color: "#E6E8EB", fontSize: 36, fontWeight: 700, lineHeight: 1.2 }}>
              {site.name}
            </div>
            <div style={{ display: "flex", color: "#B98CFF", fontSize: 18 }}>
              Student @ IIT Roorkee | Developer
            </div>
            <div
              style={{
                display: "flex",
                color: "#8A93A0",
                fontSize: 16,
                marginTop: 8,
                lineHeight: 1.5,
                maxWidth: "800px",
              }}
            >
              {site.tagline}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
              <div style={{ display: "flex", color: "#4A5261", fontSize: 14 }}>
                root@portfolio
              </div>
              <div
                style={{
                  width: 10,
                  height: 18,
                  backgroundColor: "#F0A84E",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
