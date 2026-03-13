import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import {
  getTypedText,
  formatDollars,
  getCursorPosition,
  getCursorOpacity,
} from "./helpers";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const { fontFamily: geistFont } = loadGeist("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const { fontFamily: serifFont } = loadInstrumentSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  sidebar: "#0f0f0f",
  bg: "#faf8f5",
  card: "#ffffff",
  accent: "#d97706",
  accentLight: "#fef3c7",
  accentGlow: "rgba(217,119,6,0.15)",
  dark: "#0f0f0f",
  gray: "#6b7280",
  muted: "#9ca3af",
  border: "#e5e7eb",
  white: "#ffffff",
  green: "#16a34a",
  greenLight: "#dcfce7",
};

// Spring configs
const SMOOTH = { damping: 200 };
const SNAPPY = { damping: 20, stiffness: 200 };
const BOUNCY = { damping: 12 };

// ─── SFX paths ───────────────────────────────────────────────────────────────
const SFX = {
  keyClick: staticFile("sfx/key-click.mp3"),
  pop: staticFile("sfx/pop.mp3"),
  whoosh: staticFile("sfx/whoosh.mp3"),
  ding: staticFile("sfx/ding.mp3"),
  success: staticFile("sfx/success.mp3"),
  ambient: staticFile("sfx/remotion_bg.mp3"),
};

// ─── Shared UI Primitives ────────────────────────────────────────────────────

/** Subtle dot grid pattern for backgrounds */
const DotGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.04 }) => {
  const dots: React.ReactNode[] = [];
  for (let x = 0; x < 30; x++) {
    for (let y = 0; y < 20; y++) {
      dots.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: 40 + x * 60,
            top: 40 + y * 60,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: C.dark,
            opacity,
          }}
        />,
      );
    }
  }
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {dots}
    </div>
  );
};

/** Progress bar at bottom of video */
const ProgressBar: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const progress = (frame / totalFrames) * 100;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "rgba(0,0,0,0.1)",
        zIndex: 200,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${C.accent}, #f59e0b)`,
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
};

const Cursor: React.FC<{ x: number; y: number; clicking?: boolean }> = ({
  x,
  y,
  clicking,
}) => {
  const size = clicking ? 12 : 16;
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: C.dark,
        border: "2px solid " + C.white,
        boxShadow: clicking
          ? `0 2px 8px rgba(0,0,0,0.3), 0 0 20px ${C.accentGlow}`
          : "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
};

const Sidebar: React.FC<{ activeItem?: string }> = ({
  activeItem = "Dashboard",
}) => {
  const navItems = ["Dashboard", "Projects", "Reports", "Settings"];
  return (
    <div
      style={{
        width: 240,
        height: "100%",
        background: `linear-gradient(180deg, #111111 0%, ${C.sidebar} 100%)`,
        display: "flex",
        flexDirection: "column",
        padding: "28px 18px",
        fontFamily: geistFont,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 44,
          paddingLeft: 8,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${C.accent}, #f59e0b)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.white,
            fontWeight: 700,
            fontSize: 16,
            boxShadow: `0 4px 12px ${C.accentGlow}`,
          }}
        >
          O
        </div>
        <span
          style={{
            color: C.white,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Overage
        </span>
      </div>
      {navItems.map((item) => (
        <div
          key={item}
          style={{
            padding: "11px 14px",
            borderRadius: 10,
            color: item === activeItem ? C.white : C.muted,
            background:
              item === activeItem ? "rgba(255,255,255,0.08)" : "transparent",
            fontSize: 14,
            fontWeight: item === activeItem ? 500 : 400,
            marginBottom: 4,
            borderLeft:
              item === activeItem
                ? `3px solid ${C.accent}`
                : "3px solid transparent",
            boxShadow:
              item === activeItem
                ? `inset 0 0 20px rgba(217,119,6,0.05)`
                : "none",
          }}
        >
          {item}
        </div>
      ))}

      {/* Pro badge at bottom */}
      <div style={{ marginTop: "auto", padding: "12px 14px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, rgba(217,119,6,0.15), rgba(217,119,6,0.05))`,
            border: `1px solid rgba(217,119,6,0.2)`,
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              background: C.accent,
              color: C.white,
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 6px",
              borderRadius: 4,
              letterSpacing: "0.05em",
            }}
          >
            PRO
          </div>
          <span style={{ color: C.muted, fontSize: 12 }}>michael@work.io</span>
        </div>
      </div>
    </div>
  );
};

/** Scene caption overlay at bottom */
const Caption: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SMOOTH,
    durationInFrames: 20,
  });
  const y = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(15,15,15,0.88)",
          color: C.white,
          fontSize: 16,
          fontWeight: 500,
          fontFamily: geistFont,
          padding: "10px 28px",
          borderRadius: 100,
          letterSpacing: "-0.01em",
          opacity: progress,
          transform: `translateY(${y}px)`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/** Floating success checkmark */
const SuccessCheck: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: frame - delay,
    fps,
    config: BOUNCY,
    durationInFrames: 25,
  });
  const scale = interpolate(p, [0, 1], [0, 1]);
  const fadeOut = interpolate(frame - delay, [30, 50], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: fadeOut,
        zIndex: 150,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.green}, #22c55e)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(22,163,106,0.4)",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
};

/** Browser chrome frame — static wrapper, no animations */
const BrowserChrome: React.FC<{
  children: React.ReactNode;
  url?: string;
}> = ({ children, url = "overage.app" }) => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          width: 1760,
          height: 960,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser toolbar */}
        <div
          style={{
            height: 44,
            background: "linear-gradient(180deg, #2d2d2d, #252525)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 10,
            flexShrink: 0,
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <div style={{ display: "flex", gap: 7 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: 500,
              margin: "0 auto",
              background: "#1a1a1a",
              borderRadius: 8,
              padding: "6px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span
              style={{
                color: "#999",
                fontSize: 13,
                fontFamily: geistFont,
                fontWeight: 400,
              }}
            >
              {url}
            </span>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Animated callout circle that draws attention to a UI element */
const Callout: React.FC<{
  x: number;
  y: number;
  delay: number;
  size?: number;
  label?: string;
}> = ({ x, y, delay, size = 60, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: frame - delay,
    fps,
    config: BOUNCY,
    durationInFrames: 22,
  });
  const fadeOut = interpolate(frame - delay, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < delay || frame > delay + 65) return null;

  const ringScale = interpolate(p, [0, 1], [0.5, 1]);
  const pulseScale =
    1 +
    interpolate((frame - delay) % 20, [0, 10, 20], [0, 0.08, 0], {
      extrapolateRight: "clamp",
    });

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2.5px solid ${C.accent}`,
        opacity: fadeOut * p,
        transform: `scale(${ringScale * pulseScale})`,
        zIndex: 120,
        pointerEvents: "none",
        boxShadow: `0 0 20px ${C.accentGlow}, inset 0 0 20px ${C.accentGlow}`,
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            top: -28,
            left: "50%",
            transform: "translateX(-50%)",
            background: C.accent,
            color: C.white,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: geistFont,
            padding: "3px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ─── Scene 0: Hook ───────────────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = "You did the extra work.";
  const line2 = "You never billed for it.";

  const typed1 = getTypedText(line1, frame, 15, 2);
  const typed2 = getTypedText(line2, frame, 15 + line1.length * 2 + 20, 2);

  const cursor1Active = frame >= 15 && frame < 15 + line1.length * 2 + 20;
  const cursor2Active =
    frame >= 15 + line1.length * 2 + 20 &&
    frame < 15 + line1.length * 2 + 20 + line2.length * 2 + 10;
  const cursorOpacity = getCursorOpacity(frame);

  // Highlight wipe on full quote
  const highlightStart = 15 + line1.length * 2 + 20 + line2.length * 2 + 8;
  const highlightProgress = spring({
    frame: frame - highlightStart,
    fps,
    config: SMOOTH,
    durationInFrames: 18,
  });
  const highlightActive = frame >= highlightStart;

  // Logo reveal
  const logoDelay = highlightStart + 30;
  const logoP = spring({
    frame: frame - logoDelay,
    fps,
    config: BOUNCY,
    durationInFrames: 25,
  });
  const logoScale = interpolate(logoP, [0, 1], [0.8, 1]);

  const tagP = spring({
    frame: frame - logoDelay - 12,
    fps,
    config: SMOOTH,
    durationInFrames: 20,
  });
  const tagY = interpolate(tagP, [0, 1], [15, 0]);

  // Background $ counter — ticking up unbilled amount
  const counterStart = 0;
  const counterEnd = logoDelay;
  const counterValue = interpolate(frame, [counterStart, counterEnd], [0, 4562], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterOpacity = interpolate(frame, [0, 8, logoDelay - 5, logoDelay + 5], [0, 0.07, 0.07, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating ambient shapes
  const shape1Y = interpolate(frame, [0, 150], [0, -30], {
    extrapolateRight: "clamp",
  });
  const shape2Y = interpolate(frame, [0, 150], [0, 20], {
    extrapolateRight: "clamp",
  });

  // Key click sounds every 2 frames during typing
  const typing1Start = 15;
  const typing1End = 15 + line1.length * 2;
  const typing2Start = 15 + line1.length * 2 + 20;
  const typing2End = typing2Start + line2.length * 2;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #1a1a1a, ${C.sidebar})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: geistFont,
      }}
    >
      {/* Background $ counter */}
      <div
        style={{
          position: "absolute",
          fontSize: 180,
          fontWeight: 800,
          color: C.white,
          opacity: counterOpacity,
          letterSpacing: "-0.04em",
          fontFamily: geistFont,
          userSelect: "none",
        }}
      >
        {formatDollars(Math.floor(counterValue), 0)}
      </div>

      {/* Floating ambient shapes */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 180,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.accentGlow}, transparent)`,
          transform: `translateY(${shape1Y}px)`,
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 200,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.06), transparent)",
          transform: `translateY(${shape2Y}px)`,
          opacity: 0.5,
        }}
      />

      {/* Typing sounds */}
      {Array.from(
        { length: Math.floor((typing1End - typing1Start) / 6) },
        (_, i) => (
          <Sequence
            key={`k1-${i}`}
            from={typing1Start + i * 6}
            durationInFrames={4}
            layout="none"
          >
            <Audio src={SFX.keyClick} volume={0.15} />
          </Sequence>
        ),
      )}
      {Array.from(
        { length: Math.floor((typing2End - typing2Start) / 6) },
        (_, i) => (
          <Sequence
            key={`k2-${i}`}
            from={typing2Start + i * 6}
            durationInFrames={4}
            layout="none"
          >
            <Audio src={SFX.keyClick} volume={0.15} />
          </Sequence>
        ),
      )}

      {/* Highlight ding */}
      {highlightActive && (
        <Sequence from={highlightStart} durationInFrames={30} layout="none">
          <Audio src={SFX.ding} volume={0.25} />
        </Sequence>
      )}

      {/* Logo whoosh */}
      <Sequence from={logoDelay} durationInFrames={30} layout="none">
        <Audio src={SFX.whoosh} volume={0.3} />
      </Sequence>

      {/* Typing text — fades out for logo */}
      <div
        style={{
          opacity:
            frame >= logoDelay
              ? interpolate(frame, [logoDelay, logoDelay + 10], [1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "-0.02em",
          }}
        >
          {typed1}
          {cursor1Active && (
            <span style={{ opacity: cursorOpacity, color: C.accent }}>
              {"\u258C"}
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: C.white,
            letterSpacing: "-0.02em",
            position: "relative",
            display: "inline-block",
          }}
        >
          {highlightActive && (
            <span
              style={{
                position: "absolute",
                left: -6,
                right: -6,
                top: "50%",
                height: "1.15em",
                transform: `translateY(-50%) scaleX(${Math.min(1, highlightProgress)})`,
                transformOrigin: "left center",
                background: `linear-gradient(90deg, rgba(217,119,6,0.35), rgba(245,158,11,0.25))`,
                borderRadius: "0.15em",
                zIndex: 0,
              }}
            />
          )}
          <span style={{ position: "relative", zIndex: 1 }}>{typed2}</span>
          {cursor2Active && (
            <span style={{ opacity: cursorOpacity, color: C.accent }}>
              {"\u258C"}
            </span>
          )}
        </div>
      </div>

      {/* Logo reveal */}
      {frame >= logoDelay && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: logoP,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                color: C.white,
                fontSize: 58,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                fontFamily: geistFont,
              }}
            >
              Overage
            </span>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: C.accent,
                display: "inline-block",
                boxShadow: `0 0 16px rgba(217,119,6,0.5)`,
                marginTop: 8,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 19,
              color: C.muted,
              fontWeight: 400,
              opacity: tagP,
              transform: `translateY(${tagY}px)`,
            }}
          >
            Track scope creep. Get paid for every addition.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─── Scene 1: Dashboard ──────────────────────────────────────────────────────

const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cursorPos = getCursorPosition(
    frame,
    110,
    150,
    { x: 700, y: 200 },
    { x: 500, y: 430 },
  );
  const clicking = frame >= 155 && frame <= 160;

  // Animated counter
  const counterP = spring({
    frame: frame - 5,
    fps,
    config: SMOOTH,
    durationInFrames: 45,
  });
  const counterValue = interpolate(counterP, [0, 1], [0, 4562], {
    extrapolateRight: "clamp",
  });

  const heroP = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const statP = interpolate(frame, [8, 23], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const projectP = interpolate(frame, [16, 31], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const projects = [
    {
      name: "Greenfield Labs Website Redesign",
      client: "Greenfield Labs",
      additions: "$4,562.50",
      status: "Active",
    },
    {
      name: "Bloom Studio Brand Identity",
      client: "Bloom Studio",
      additions: "$0.00",
      status: "Active",
    },
    {
      name: "Northstar Analytics Dashboard",
      client: "Northstar Inc",
      additions: "$1,200.00",
      status: "Active",
    },
  ];

  return (
    <BrowserChrome url="overage.app/dashboard">
      <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar activeItem="Dashboard" />
        <div
          style={{
            flex: 1,
            background: C.bg,
            padding: "36px 48px",
            fontFamily: geistFont,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <DotGrid />

          {/* Pop sound on counter finish */}
          <Sequence from={40} durationInFrames={20} layout="none">
            <Audio src={SFX.pop} volume={0.2} />
          </Sequence>

          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: C.dark,
              margin: 0,
              marginBottom: 28,
              position: "relative",
              zIndex: 1,
            }}
          >
            Dashboard
          </h1>

          {/* Hero stat card */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.card} 0%, #fffbf0 100%)`,
              borderRadius: 16,
              padding: "28px 32px",
              marginBottom: 18,
              border: `1px solid ${C.border}`,
              boxShadow: `0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(217,119,6,0.05)`,
              opacity: heroP,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: `4px solid ${C.accent}`,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: C.gray,
                  marginBottom: 8,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Total Scope Additions
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: C.accent,
                  fontFamily: serifFont,
                }}
              >
                {formatDollars(counterValue, 0)}
              </div>
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${C.accentLight}, #fff7ed)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: C.accent,
                fontWeight: 700,
                boxShadow: `0 4px 12px ${C.accentGlow}`,
              }}
            >
              $
            </div>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "flex",
              gap: 18,
              marginBottom: 32,
              opacity: statP,
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              { label: "Active Projects", value: "3", icon: "◆" },
              { label: "Total Quoted", value: "$26,500", icon: "▸" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: C.card,
                  borderRadius: 14,
                  padding: "22px 26px",
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: C.gray,
                    marginBottom: 6,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.dark }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Project cards */}
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: C.dark,
              marginBottom: 14,
              position: "relative",
              zIndex: 1,
            }}
          >
            Recent Projects
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              opacity: projectP,
              position: "relative",
              zIndex: 1,
            }}
          >
            {projects.map((p, i) => {
              const cardP = spring({
                frame: frame - 20 - i * 5,
                fps,
                config: SNAPPY,
                durationInFrames: 20,
              });
              const isHighlighted = i === 0 && frame > 150;
              return (
                <div
                  key={i}
                  style={{
                    background: C.card,
                    borderRadius: 12,
                    padding: "18px 22px",
                    border: `1px solid ${isHighlighted ? C.accent : C.border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: isHighlighted
                      ? `0 0 0 2px ${C.accent}, 0 4px 16px ${C.accentGlow}`
                      : "0 1px 3px rgba(0,0,0,0.03)",
                    opacity: cardP,
                    transform: `translateX(${interpolate(cardP, [0, 1], [20, 0])}px)`,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: C.dark,
                        marginBottom: 3,
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: 13, color: C.gray }}>
                      {p.client}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{ fontSize: 15, fontWeight: 600, color: C.accent }}
                    >
                      {p.additions}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: C.green,
                        background: C.greenLight,
                        padding: "3px 10px",
                        borderRadius: 10,
                        display: "inline-block",
                        marginTop: 3,
                        fontWeight: 500,
                      }}
                    >
                      {p.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Cursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
      </AbsoluteFill>
      <Caption text="See every dollar of scope creep at a glance" delay={25} />
    </BrowserChrome>
  );
};

// ─── Scene 2: Project Detail ─────────────────────────────────────────────────

const ProjectDetailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cursorPos = getCursorPosition(
    frame,
    70,
    115,
    { x: 600, y: 250 },
    { x: 1640, y: 55 },
  );
  const clicking = frame >= 120 && frame <= 125;

  const headerP = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const additions = [
    {
      desc: "Additional homepage animation effects",
      hours: "8",
      rate: "$125",
      value: "$1,000.00",
      date: "Feb 12",
    },
    {
      desc: "Custom CMS integration (not in scope)",
      hours: "14",
      rate: "$125",
      value: "$1,750.00",
      date: "Feb 18",
    },
    {
      desc: "Mobile-first redesign of contact page",
      hours: "6.5",
      rate: "$125",
      value: "$812.50",
      date: "Feb 24",
    },
    {
      desc: "SEO audit and meta tag updates",
      hours: "8",
      rate: "$125",
      value: "$1,000.00",
      date: "Mar 2",
    },
  ];

  return (
    <BrowserChrome url="overage.app/projects/greenfield-labs">
      <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar activeItem="Projects" />
        <div
          style={{
            flex: 1,
            background: C.bg,
            fontFamily: geistFont,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <DotGrid opacity={0.02} />

          {/* Click sound */}
          {clicking && (
            <Sequence from={120} durationInFrames={10} layout="none">
              <Audio src={SFX.pop} volume={0.25} />
            </Sequence>
          )}

          {/* Project header */}
          <div
            style={{
              background: `linear-gradient(135deg, #111 0%, ${C.sidebar} 100%)`,
              padding: "28px 48px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: headerP,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 5 }}>
                Greenfield Labs
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: C.white }}>
                Website Redesign
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 3 }}>
                  Scope Additions
                </div>
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: C.accent,
                    fontFamily: serifFont,
                  }}
                >
                  $4,562.50
                </div>
              </div>
              <div
                style={{
                  background: `linear-gradient(135deg, ${C.accent}, #f59e0b)`,
                  color: C.white,
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: clicking
                    ? `0 0 0 3px rgba(217,119,6,0.4), 0 4px 16px ${C.accentGlow}`
                    : `0 4px 12px ${C.accentGlow}`,
                  transform: clicking ? "scale(0.95)" : "scale(1)",
                }}
              >
                + Log Addition
              </div>
            </div>
          </div>

          {/* Table */}
          <div
            style={{ padding: "32px 48px", position: "relative", zIndex: 1 }}
          >
            <div
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: C.dark,
                marginBottom: 18,
              }}
            >
              Scope Additions
            </div>
            <div
              style={{
                background: C.card,
                borderRadius: 14,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "14px 24px",
                  borderBottom: `1px solid ${C.border}`,
                  background: "#f9fafb",
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.gray,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <div style={{ flex: 3 }}>Description</div>
                <div style={{ flex: 1, textAlign: "center" }}>Hours</div>
                <div style={{ flex: 1, textAlign: "center" }}>Rate</div>
                <div style={{ flex: 1, textAlign: "right" }}>Value</div>
                <div style={{ flex: 1, textAlign: "right" }}>Date</div>
              </div>
              {additions.map((a, i) => {
                const rowP = spring({
                  frame: frame - 12 - i * 4,
                  fps,
                  config: SMOOTH,
                  durationInFrames: 18,
                });
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      padding: "16px 24px",
                      borderBottom:
                        i < additions.length - 1
                          ? `1px solid ${C.border}`
                          : "none",
                      fontSize: 14,
                      color: C.dark,
                      alignItems: "center",
                      opacity: rowP,
                      transform: `translateY(${interpolate(rowP, [0, 1], [10, 0])}px)`,
                    }}
                  >
                    <div style={{ flex: 3, fontWeight: 500 }}>{a.desc}</div>
                    <div
                      style={{ flex: 1, textAlign: "center", color: C.gray }}
                    >
                      {a.hours}
                    </div>
                    <div
                      style={{ flex: 1, textAlign: "center", color: C.gray }}
                    >
                      {a.rate}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "right",
                        fontWeight: 600,
                        color: C.accent,
                      }}
                    >
                      {a.value}
                    </div>
                    <div style={{ flex: 1, textAlign: "right", color: C.gray }}>
                      {a.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Cursor x={cursorPos.x} y={cursorPos.y} clicking={clicking} />
      </AbsoluteFill>
      <Caption
        text="Track every addition with hours, rates, and dates"
        delay={18}
      />
    </BrowserChrome>
  );
};

// ─── Scene 3: Log Addition ───────────────────────────────────────────────────

const LogAdditionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const descText = "Add multi-language support (EN + ES)";
  const hoursText = "12";

  const typedDesc = getTypedText(descText, frame, 20, 2);
  const typedHours = getTypedText(hoursText, frame, 95, 4);

  const descCursorO = getCursorOpacity(frame);
  const hoursCursorO = getCursorOpacity(frame);

  const descTypingEnd = 20 + descText.length * 2;
  const hoursTypingEnd = 95 + hoursText.length * 4;

  const hasHours = frame >= hoursTypingEnd;
  const estValue = hasHours ? 1500 : 0;
  const valueP = spring({
    frame: hasHours ? frame - hoursTypingEnd : 0,
    fps,
    config: SNAPPY,
    durationInFrames: 15,
  });
  const valueOpacity = hasHours ? valueP : 0;
  const valueScale = hasHours ? interpolate(valueP, [0, 1], [0.93, 1]) : 1;

  const cursorX = interpolate(
    frame,
    [0, 20, 70, 87, 100, 125, 155],
    [450, 430, 430, 380, 380, 380, 430],
    { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );
  const cursorY = interpolate(
    frame,
    [0, 20, 70, 87, 100, 125, 155],
    [250, 225, 225, 295, 295, 295, 435],
    { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) },
  );
  const clicking = frame >= 157 && frame <= 162;

  const submitted = frame >= 165;
  const formOpacity = interpolate(frame, [163, 173], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const newRowP = submitted
    ? spring({ frame: frame - 175, fps, config: SNAPPY, durationInFrames: 20 })
    : 0;

  const totalValue = submitted
    ? interpolate(frame, [173, 205], [4562.5, 6062.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.quad),
      })
    : 4562.5;

  const totalScale = submitted
    ? spring({
        frame: frame - 195,
        fps,
        from: 1.12,
        to: 1,
        config: BOUNCY,
        durationInFrames: 22,
      })
    : 1;

  const formEntrance = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // After form fades out, slide table to center
  const tableSlide = interpolate(frame, [170, 195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  const existingAdditions = [
    {
      desc: "Additional homepage animation effects",
      hours: "8",
      value: "$1,000.00",
    },
    {
      desc: "Custom CMS integration (not in scope)",
      hours: "14",
      value: "$1,750.00",
    },
    {
      desc: "Mobile-first redesign of contact page",
      hours: "6.5",
      value: "$812.50",
    },
    { desc: "SEO audit and meta tag updates", hours: "8", value: "$1,000.00" },
  ];

  return (
    <BrowserChrome url="overage.app/projects/greenfield-labs">
      <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar activeItem="Projects" />
        <div
          style={{
            flex: 1,
            background: C.bg,
            fontFamily: geistFont,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <DotGrid opacity={0.02} />

          {/* Typing sounds */}
          {Array.from(
            { length: Math.floor((descTypingEnd - 20) / 6) },
            (_, i) => (
              <Sequence
                key={`dk-${i}`}
                from={20 + i * 6}
                durationInFrames={4}
                layout="none"
              >
                <Audio src={SFX.keyClick} volume={0.12} />
              </Sequence>
            ),
          )}
          {Array.from(
            { length: Math.floor((hoursTypingEnd - 95) / 8) },
            (_, i) => (
              <Sequence
                key={`hk-${i}`}
                from={95 + i * 8}
                durationInFrames={4}
                layout="none"
              >
                <Audio src={SFX.keyClick} volume={0.12} />
              </Sequence>
            ),
          )}

          {/* Value pop sound */}
          {hasHours && (
            <Sequence from={hoursTypingEnd} durationInFrames={20} layout="none">
              <Audio src={SFX.pop} volume={0.2} />
            </Sequence>
          )}

          {/* Submit click */}
          <Sequence from={157} durationInFrames={10} layout="none">
            <Audio src={SFX.pop} volume={0.25} />
          </Sequence>

          {/* Success sounds */}
          {submitted && (
            <>
              <Sequence from={165} durationInFrames={30} layout="none">
                <Audio src={SFX.success} volume={0.3} />
              </Sequence>
              <Sequence from={190} durationInFrames={30} layout="none">
                <Audio src={SFX.ding} volume={0.2} />
              </Sequence>
            </>
          )}

          {/* Success check animation */}
          <SuccessCheck delay={165} />

          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, #111 0%, ${C.sidebar} 100%)`,
              padding: "22px 48px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 3 }}>
                Greenfield Labs
              </div>
              <div style={{ fontSize: 19, fontWeight: 600, color: C.white }}>
                Website Redesign
              </div>
            </div>
            <div
              style={{
                textAlign: "right",
                transform: `scale(${totalScale})`,
                transformOrigin: "right center",
              }}
            >
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 3 }}>
                Scope Additions
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.accent,
                  fontFamily: serifFont,
                }}
              >
                {formatDollars(totalValue)}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "22px 48px",
              display: "flex",
              gap: interpolate(tableSlide, [0, 1], [28, 0]),
              flex: 1,
              position: "relative",
              zIndex: 1,
              justifyContent: "center",
            }}
          >
            {/* Form */}
            <div
              style={{
                width: interpolate(tableSlide, [0, 1], [400, 0]),
                minWidth: interpolate(tableSlide, [0, 1], [400, 0]),
                opacity: submitted ? formOpacity : formEntrance,
                display: submitted && frame > 195 ? "none" : "block",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  background: C.card,
                  borderRadius: 14,
                  border: `1px solid ${C.border}`,
                  padding: 26,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 600,
                    color: C.dark,
                    marginBottom: 22,
                  }}
                >
                  Log Scope Addition
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: C.gray,
                      display: "block",
                      marginBottom: 7,
                    }}
                  >
                    Description
                  </label>
                  <div
                    style={{
                      border: `1.5px solid ${frame >= 20 && frame < 75 ? C.accent : C.border}`,
                      borderRadius: 10,
                      padding: "11px 16px",
                      fontSize: 14,
                      color: C.dark,
                      minHeight: 22,
                      background: C.white,
                      boxShadow:
                        frame >= 20 && frame < 75
                          ? `0 0 0 3px ${C.accentGlow}`
                          : "none",
                    }}
                  >
                    {typedDesc}
                    {frame >= 20 && frame < 75 && (
                      <span style={{ opacity: descCursorO, color: C.accent }}>
                        {"\u258C"}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: C.gray,
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      Hours
                    </label>
                    <div
                      style={{
                        border: `1.5px solid ${frame >= 95 && frame < 105 ? C.accent : C.border}`,
                        borderRadius: 10,
                        padding: "11px 16px",
                        fontSize: 14,
                        color: C.dark,
                        background: C.white,
                        boxShadow:
                          frame >= 95 && frame < 105
                            ? `0 0 0 3px ${C.accentGlow}`
                            : "none",
                      }}
                    >
                      {typedHours}
                      {frame >= 95 && frame < 105 && (
                        <span
                          style={{ opacity: hoursCursorO, color: C.accent }}
                        >
                          {"\u258C"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: C.gray,
                        display: "block",
                        marginBottom: 7,
                      }}
                    >
                      Hourly Rate
                    </label>
                    <div
                      style={{
                        border: `1.5px solid ${C.border}`,
                        borderRadius: 10,
                        padding: "11px 16px",
                        fontSize: 14,
                        color: C.dark,
                        background: "#f9fafb",
                      }}
                    >
                      $125.00
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: `linear-gradient(135deg, ${C.accentLight}, #fff7ed)`,
                    borderRadius: 10,
                    padding: "14px 18px",
                    marginBottom: 22,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: valueOpacity,
                    transform: `scale(${valueScale})`,
                    border: `1px solid rgba(217,119,6,0.15)`,
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 500, color: C.gray }}
                  >
                    Estimated Value
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.accent,
                      fontFamily: serifFont,
                    }}
                  >
                    {formatDollars(estValue)}
                  </span>
                </div>

                <div
                  style={{
                    background: `linear-gradient(135deg, ${C.accent}, #f59e0b)`,
                    color: C.white,
                    padding: "13px 28px",
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 600,
                    textAlign: "center",
                    boxShadow: clicking
                      ? `0 0 0 3px rgba(217,119,6,0.4), 0 4px 16px ${C.accentGlow}`
                      : `0 4px 12px ${C.accentGlow}`,
                    transform: clicking ? "scale(0.97)" : "scale(1)",
                  }}
                >
                  Log Addition
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  background: C.card,
                  borderRadius: 14,
                  border: `1px solid ${C.border}`,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "14px 24px",
                    borderBottom: `1px solid ${C.border}`,
                    background: "#f9fafb",
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.gray,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  <div style={{ flex: 3 }}>Description</div>
                  <div style={{ flex: 1, textAlign: "center" }}>Hours</div>
                  <div style={{ flex: 1, textAlign: "right" }}>Value</div>
                </div>
                {existingAdditions.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      padding: "14px 24px",
                      borderBottom: `1px solid ${C.border}`,
                      fontSize: 13,
                      color: C.dark,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 3, fontWeight: 500 }}>{a.desc}</div>
                    <div
                      style={{ flex: 1, textAlign: "center", color: C.gray }}
                    >
                      {a.hours}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "right",
                        fontWeight: 600,
                        color: C.accent,
                      }}
                    >
                      {a.value}
                    </div>
                  </div>
                ))}
                {submitted && (
                  <div
                    style={{
                      display: "flex",
                      padding: "14px 24px",
                      fontSize: 13,
                      color: C.dark,
                      alignItems: "center",
                      background: `linear-gradient(135deg, ${C.accentLight}, #fff7ed)`,
                      opacity: newRowP,
                      transform: `translateX(${interpolate(newRowP, [0, 1], [-28, 0])}px)`,
                      borderLeft: `3px solid ${C.accent}`,
                    }}
                  >
                    <div style={{ flex: 3, fontWeight: 600 }}>
                      Add multi-language support (EN + ES)
                    </div>
                    <div
                      style={{ flex: 1, textAlign: "center", color: C.gray }}
                    >
                      12
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "right",
                        fontWeight: 700,
                        color: C.accent,
                      }}
                    >
                      $1,500.00
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {!submitted && <Cursor x={cursorX} y={cursorY} clicking={clicking} />}
      </AbsoluteFill>
      <Caption text="Log new scope additions in seconds" delay={12} />
    </BrowserChrome>
  );
};

// ─── Scene 4: Report ─────────────────────────────────────────────────────────

const ReportScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageP = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footerP = spring({
    frame: frame - 65,
    fps,
    config: SMOOTH,
    durationInFrames: 20,
  });

  const reportEntries = [
    {
      desc: "Additional homepage animation effects",
      hours: "8",
      rate: "$125",
      value: "$1,000.00",
    },
    {
      desc: "Custom CMS integration (not in scope)",
      hours: "14",
      rate: "$125",
      value: "$1,750.00",
    },
    {
      desc: "Mobile-first redesign of contact page",
      hours: "6.5",
      rate: "$125",
      value: "$812.50",
    },
    {
      desc: "SEO audit and meta tag updates",
      hours: "8",
      rate: "$125",
      value: "$1,000.00",
    },
    {
      desc: "Add multi-language support (EN + ES)",
      hours: "12",
      rate: "$125",
      value: "$1,500.00",
    },
  ];

  const totalP = spring({
    frame: frame - 45,
    fps,
    config: BOUNCY,
    durationInFrames: 20,
  });
  const totalScale = interpolate(totalP, [0, 1], [0.88, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #e8e5e0 0%, #d4d0ca 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: geistFont,
      }}
    >
      {/* Whoosh on enter */}
      <Sequence from={0} durationInFrames={20} layout="none">
        <Audio src={SFX.whoosh} volume={0.2} />
      </Sequence>

      <div
        style={{
          width: 720,
          background: C.white,
          borderRadius: 12,
          boxShadow:
            "0 16px 48px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)",
          padding: "44px 52px",
          opacity: pageP,
        }}
      >
        <div
          style={{
            borderBottom: `2px solid ${C.dark}`,
            paddingBottom: 22,
            marginBottom: 26,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: C.dark,
              marginBottom: 6,
              fontFamily: serifFont,
            }}
          >
            Scope Change Report
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: C.gray,
            }}
          >
            <div>
              <div style={{ marginBottom: 3 }}>
                <strong>Client:</strong> Greenfield Labs
              </div>
              <div>
                <strong>Project:</strong> Website Redesign
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ marginBottom: 3 }}>
                <strong>Period:</strong> Feb 1 – Mar 13, 2026
              </div>
              <div>
                <strong>Prepared:</strong> March 13, 2026
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <div
            style={{
              display: "flex",
              padding: "12px 0",
              borderBottom: `1px solid ${C.border}`,
              fontSize: 11,
              fontWeight: 700,
              color: C.gray,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <div style={{ flex: 4 }}>Description</div>
            <div style={{ flex: 1, textAlign: "center" }}>Hours</div>
            <div style={{ flex: 1, textAlign: "center" }}>Rate</div>
            <div style={{ flex: 1, textAlign: "right" }}>Amount</div>
          </div>
          {reportEntries.map((e, i) => {
            const rowP = spring({
              frame: frame - 10 - i * 5,
              fps,
              config: SMOOTH,
              durationInFrames: 18,
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.border}`,
                  fontSize: 13,
                  color: C.dark,
                  opacity: rowP,
                }}
              >
                <div style={{ flex: 4 }}>{e.desc}</div>
                <div style={{ flex: 1, textAlign: "center", color: C.gray }}>
                  {e.hours}
                </div>
                <div style={{ flex: 1, textAlign: "center", color: C.gray }}>
                  {e.rate}
                </div>
                <div style={{ flex: 1, textAlign: "right", fontWeight: 600 }}>
                  {e.value}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "16px 0",
            borderTop: `2px solid ${C.dark}`,
            transform: `scale(${totalScale})`,
            transformOrigin: "right center",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 700, color: C.dark }}>
            Total Additional Value:{" "}
            <span
              style={{
                color: C.accent,
                fontSize: 24,
                fontFamily: serifFont,
              }}
            >
              $6,062.50
            </span>
          </div>
        </div>

        {/* Ding on total */}
        <Sequence from={45} durationInFrames={30} layout="none">
          <Audio src={SFX.ding} volume={0.2} />
        </Sequence>

        <div style={{ textAlign: "center", marginTop: 22, opacity: footerP }}>
          <div
            style={{
              fontSize: 12,
              color: C.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            Powered by{" "}
            <span style={{ fontWeight: 700, color: C.gray }}>Overage</span>
          </div>
        </div>
      </div>

      <Caption text="Generate professional scope change reports" delay={12} />
    </AbsoluteFill>
  );
};

// ─── Scene 5: End Card ───────────────────────────────────────────────────────

const EndCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoP = spring({ frame, fps, config: BOUNCY, durationInFrames: 25 });
  const logoScale = interpolate(logoP, [0, 1], [0.85, 1]);

  const tagP = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaP = spring({
    frame: frame - 28,
    fps,
    config: SNAPPY,
    durationInFrames: 20,
  });
  const ctaScale = interpolate(ctaP, [0, 1], [0.9, 1]);

  // CTA glow pulse
  const ctaGlow = interpolate(frame, [40, 60, 80, 100], [0.3, 0.6, 0.3, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlP = interpolate(frame, [38, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient glow — larger, warmer
  const glowPulse = interpolate(frame, [0, 45, 90], [0.3, 0.6, 0.3], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, #1c1510, ${C.sidebar})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: geistFont,
      }}
    >
      {/* Whoosh */}
      <Sequence from={0} durationInFrames={20} layout="none">
        <Audio src={SFX.whoosh} volume={0.25} />
      </Sequence>

      {/* Ambient glow — warm orange */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(217,119,6,${glowPulse * 0.12}), transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Logo + name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          opacity: logoP,
          transform: `scale(${logoScale})`,
        }}
      >
        <span
          style={{
            color: C.white,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            fontFamily: geistFont,
          }}
        >
          Overage
        </span>
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: C.accent,
            display: "inline-block",
            boxShadow: `0 0 20px rgba(217,119,6,0.6)`,
            marginTop: 10,
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 22,
          color: "rgba(255,255,255,0.6)",
          fontWeight: 400,
          opacity: tagP,
          letterSpacing: "-0.01em",
          marginBottom: 40,
          fontFamily: geistFont,
        }}
      >
        Track every addition. Bill with confidence.
      </div>

      {/* CTA button with glow */}
      <div style={{ opacity: ctaP, transform: `scale(${ctaScale})`, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 20,
            background: `rgba(217,119,6,${ctaGlow * 0.25})`,
            filter: "blur(16px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            background: `linear-gradient(135deg, ${C.accent}, #f59e0b)`,
            color: C.white,
            padding: "18px 56px",
            borderRadius: 14,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            boxShadow: `0 8px 32px rgba(217,119,6,0.35)`,
            position: "relative",
          }}
        >
          Try Free — overage.app
        </div>
      </div>

      {/* Subtext */}
      <div
        style={{
          marginTop: 32,
          fontSize: 15,
          color: "rgba(255,255,255,0.4)",
          opacity: urlP,
          letterSpacing: "0.02em",
          fontWeight: 400,
        }}
      >
        Free tier forever. No credit card required.
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────────────────────────

const HOOK = 160; // 5.3s
const DASH = 180; // 6s
const DETAIL = 150; // 5s
const LOG = 260; // 8.7s
const REPORT = 120; // 4s
const END = 100; // 3.3s
const T = 18; // transition

// Total = 160+180+150+260+120+100 - 5*18 = 880 frames = 29.3s
const TOTAL = HOOK + DASH + DETAIL + LOG + REPORT + END - 5 * T;

export const TOTAL_DURATION = TOTAL;

export const Demo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Background music — warm ambient, subtle */}
      <Audio
        src={SFX.ambient}
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 90], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(f, [TOTAL - 90, TOTAL], [0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return Math.min(fadeIn, fadeOut);
        }}
        loop
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={HOOK}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: T,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={DASH}>
          <DashboardScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={DETAIL}>
          <ProjectDetailScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={LOG}>
          <LogAdditionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={REPORT}>
          <ReportScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: T,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={END}>
          <EndCardScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <ProgressBar totalFrames={TOTAL} />
    </AbsoluteFill>
  );
};
