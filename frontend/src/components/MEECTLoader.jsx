import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- shared styles ---------- */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  display: "grid",
  placeItems: "center",
  background: "linear-gradient(180deg, rgba(233,242,235,0.85), rgba(233,242,235,0.95))",
  zIndex: 9999,
  padding: 24,
};

const cardStyle = {
  background: "white",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 8px 30px rgba(12,20,12,0.08)",
  maxWidth: 520,
  width: "100%",
  textAlign: "center",
};

/* ---------- SVG loader (mountains + trees + grass) ---------- */
const MeadowSVG = React.memo(function MeadowSVG({ width = 360, height = null }) {
  const calcHeight = height || (width / 900) * 300;

  const treeVariants = {
    float: { y: [0, -6, 0], transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } },
  };

  const cloudVariants = {
    drift: (i = 1) => ({
      x: [-20 * i, 20 * i, -20 * i],
      transition: { duration: 10 + i * 3, repeat: Infinity, ease: "linear" },
    }),
  };

  return (
    <svg
      viewBox="0 0 900 300"
      width={width}
      height={calcHeight}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* sky */}
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e9f6ee" />
          <stop offset="1" stopColor="#f7fbf7" />
        </linearGradient>

        <linearGradient id="mount" x1="0" x2="1">
          <stop offset="0" stopColor="#d6e8d6" />
          <stop offset="1" stopColor="#a6d39a" />
        </linearGradient>

        <linearGradient id="grass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e6f2e6" />
          <stop offset="1" stopColor="#d9efd9" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="900" height="300" fill="url(#sky)" />

      {/* clouds (animated) */}
      <motion.g animate="drift">
        <motion.ellipse cx="180" cy="50" rx="70" ry="26" fill="#fff" opacity="0.9" variants={cloudVariants} custom={1} />
        <motion.ellipse cx="360" cy="40" rx="90" ry="30" fill="#fff" opacity="0.95" variants={cloudVariants} custom={1.4} />
      </motion.g>

      {/* mountains */}
      <g transform="translate(0,40)">
        <path d="M40 260 L240 60 L460 260 Z" fill="url(#mount)" />
        <path d="M260 260 L460 80 L680 260 Z" fill="#b0d6a8" opacity="0.95" />
        <path d="M520 260 L740 100 L900 260 Z" fill="#9fcf90" opacity="0.95" />
      </g>

      {/* sun */}
      <motion.circle
        cx="780"
        cy="60"
        r="28"
        fill="#ffe08a"
        initial={{ scale: 0.98 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        opacity="0.95"
      />

      {/* foreground hills */}
      <g transform="translate(0,140)">
        <path d="M0 120 Q180 10 360 110 T720 110 T900 110 L900 200 L0 200 Z" fill="#dff3dd" />
      </g>

      {/* grass strip */}
      <rect x="0" y="230" width="900" height="70" fill="url(#grass)" />

      {/* trees (animated gentle sway) */}
      <motion.g initial="float" animate="float">
        {[{ x: 140, y: 190 }, { x: 220, y: 188 }, { x: 640, y: 188 }].map((pos, i) => (
          <motion.g key={i} variants={treeVariants.float} style={{ transformOrigin: "center bottom" }}>
            <rect x={pos.x} y={pos.y} width="10" height="28" rx="2" fill="#6b4f2b" />
            <circle cx={pos.x + 5} cy={pos.y - 14} r="18" fill="#2a7a3d" />
          </motion.g>
        ))}
      </motion.g>
    </svg>
  );
});

/* ---------- FullScreenLoader ---------- */
export function FullScreenLoader({ visible = false, message = "Loading…" }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="fs-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlayStyle}
          aria-live="polite"
          role="status"
        >
          <div style={cardStyle}>
            <MeadowSVG width={420} />
            <motion.h3
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 }}
              style={{ margin: "12px 0 6px", color: "#145a2b" }}
            >
              {message}
            </motion.h3>
            <p style={{ color: "#556", fontSize: 13, marginTop: 8 }}>
              This may take a few moments — thank you for your patience.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- InlineLoader ---------- */
export function InlineLoader({ visible = false, message = "Processing", progress = null, compact = false }) {
  if (!visible) return null;

  const clampedProgress = Math.max(0, Math.min(100, progress ?? 0));

  const container = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    background: compact ? "transparent" : "#ffffff",
    padding: compact ? 8 : 12,
    borderRadius: 10,
    boxShadow: compact ? "none" : "0 6px 20px rgba(0,0,0,0.06)",
  };

  return (
    <div style={container} role="status" aria-live="polite">
      <div style={{ width: 80 }}>
        <MeadowSVG width={120} />
      </div>
      <div style={{ flex: 1, minWidth: 140 }}>
        <div style={{ fontWeight: 700, color: "#2a7a3d", fontSize: 14 }}>{message}</div>
        <div style={{ height: 8, marginTop: 8, background: "#eef6ee", borderRadius: 6, overflow: "hidden" }}>
          {progress == null ? (
            <motion.div
              style={{ height: "100%", background: "#2a7a3d", width: "30%" }}
              animate={{ x: [0, 120, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <motion.div
              style={{ height: "100%", background: "#2a7a3d", width: `${clampedProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${clampedProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
        {progress != null && (
          <div style={{ marginTop: 6, fontSize: 12, color: "#586" }}>{Math.round(clampedProgress)}%</div>
        )}
      </div>
    </div>
  );
}

/* ---------- ButtonLoader ---------- */
export function ButtonLoader({ visible = false, size = 18, color = "#2a7a3d" }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="btn-loader"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            display: "inline-grid",
            placeItems: "center",
          }}
          aria-hidden="true"
        >
          <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
            <motion.circle
              cx="12"
              cy="12"
              r="8"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="40"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
