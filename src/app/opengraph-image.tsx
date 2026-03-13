import { ImageResponse } from "next/og";

export const alt = "Overage — Stop doing free work for your clients";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          backgroundColor: "#faf8f5",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#d97706",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.1,
              margin: 0,
              fontFamily: "Georgia, serif",
            }}
          >
            Stop doing free work
            <br />
            for your clients.
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#6b6b6b",
              margin: 0,
              lineHeight: 1.4,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Track scope additions. Calculate unbilled work. Get paid.
          </p>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#d97706",
              borderRadius: "3px",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#d97706",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            overage.app
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
