import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HighlightCard({ title, description, image, link, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {image && (
        <div style={{ height: 180, overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div style={{ padding: "1rem" }}>
        <h3 style={{ color: "#145a2b", marginBottom: 8 }}>{title}</h3>
        <p style={{ color: "#555", fontSize: 14, flex: 1 }}>
          {description?.slice(0, 100) || "No description available."}
        </p>
        <Link
          to={link}
          style={{
            display: "inline-block",
            marginTop: 10,
            background: "#2a7a3d",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          View {type}
        </Link>
      </div>
    </motion.div>
  );
}
