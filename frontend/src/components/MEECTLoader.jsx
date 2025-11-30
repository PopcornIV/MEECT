import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------
   SHARED STYLES (Improved Responsiveness)
------------------------------------------------------- */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(233,242,235,0.92)",
  zIndex: 9999,
  padding: "1.4rem",
};

const cardStyle = {
  background: "#ffffff",
  borderRadius: 16,
  padding: "1.5rem",
  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  maxWidth: "480px",
  width: "100%",
  textAlign: "center",
};

/* -------------------------------------------------------
   SVG (Optimized for Responsiveness)
------------------------------------------------------- */
const MeadowSVG = React.memo(function MeadowSVG({ width = "100%", maxWidth = 360 }) {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        viewBox="0 0 900 300"
        width="100%"
        style={{ maxWidth }}
        preserveAspectRatio="xMidYMid meet"
      >
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

        {/* Sky */}
        <rect width="900" height="300" fill="url(#sky)" />

        {/* Clouds */}
        <motion.g
          animate={{ x: [-25, 25, -25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="180" cy="50" rx="70" ry="26" fill="#fff" opacity="0.9" />
          <ellipse cx="360" cy="40" rx="90" ry="30" fill="#fff" opacity="0.95" />
        </motion.g>

        {/* Mountains */}
        <g transform="translate(0,45)">
          <path d="M40 260 L240 60 L460 260 Z" fill="url(#mount)" />
          <path d="M260 260 L460 80 L680 260 Z" fill="#b0d6a8" />
          <path d="M520 260 L740 100 L900 260 Z" fill="#9fcf90" />
        </g>

        {/* Sun */}
        <motion.circle
          cx="780"
          cy="60"
          r="28"
          fill="#ffe08a"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Hills */}
        <g transform="translate(0,140)">
          <path
            d="M0 120 Q180 10 360 110 T720 110 T900 110 L900 200 L0 200 Z"
            fill="#dff3dd"
          />
        </g>

        {/* Grass */}
        <rect x="0" y="230" width="900" height="70" fill="url(#grass)" />

        {/* Trees */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          {[140, 220, 640].map((x, i) => (
            <g key={i}>
              <rect x={x} y={190} width="10" height="28" rx="2" fill="#6b4f2b" />
              <circle cx={x + 5} cy={176} r="18" fill="#2a7a3d" />
            </g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
});

/* -------------------------------------------------------
   FULL SCREEN LOADER
------------------------------------------------------- */
export function FullScreenLoader({ visible = false, message = "Loading…" }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={overlayStyle}
        >
          <div style={cardStyle}>
            <MeadowSVG maxWidth={360} />

            <motion.h3
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ marginTop: 12, color: "#145a2b", fontWeight: 700 }}
            >
              {message}
            </motion.h3>

            <p style={{ color: "#556", fontSize: 13, marginTop: 6 }}>
              Please wait a moment…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------
   INLINE LOADER (card loader)
------------------------------------------------------- */
export function InlineLoader({ visible = false, message = "Processing…" }) {
  if (!visible) return null;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 12,
        padding: "1rem",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ width: 80 }}>
        <MeadowSVG maxWidth={120} />
      </div>

      <div style={{ flex: 1 }}>
        <strong style={{ color: "#2a7a3d" }}>{message}</strong>
        <motion.div
          style={{
            height: 8,
            background: "#eef6ee",
            borderRadius: 6,
            marginTop: 8,
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ x: ["0%", "90%", "0%"] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{
              height: "100%",
              width: "25%",
              background: "#2a7a3d",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   BUTTON LOADER
------------------------------------------------------- */
export function ButtonLoader() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.6)",
        borderTopColor: "#fff",
      }}
    />
  );
}

/* -------------------------------------------------------
   IMAGE LOADER (for cards & previews)
------------------------------------------------------- */
export function ImageLoader() {
  return (
    <motion.div
      style={{
        width: "100%",
        height: "180px",
        borderRadius: 12,
        background: "#d7eede",
      }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    />
  );
}
