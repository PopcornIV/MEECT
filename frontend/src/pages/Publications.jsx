import React, { useEffect, useState } from "react";
import api from "../api/client";

export default function Publications() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    api
      .get("publications/")
      .then((res) => setPublications(res.data))
      .catch((err) => console.error("❌ Error loading publications:", err));
  }, []);

  return (
    <section style={{ padding: "2rem" }}>
      <h1 style={{ color: "#2a7a3d" }}>Publications</h1>
      <p style={{ color: "#555" }}>
        Download reports, newsletters, and strategic documents from MEECT’s conservation work.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        {publications.length === 0 ? (
          <p>No publications available yet.</p>
        ) : (
          publications.map((pub) => (
            <div
              key={pub.id}
              style={{
                background: "#fff",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
              }}
            >
              {/* 🧾 PDF Preview */}
             {pub.preview_image ? (
  <img
    src={pub.preview_image}
    alt={pub.title}
    style={{ width: "100%", height: "220px", objectFit: "cover" }}
  />
) : (
  <div
    style={{
      background: "#f5f5f5",
      height: "220px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#777",
      fontSize: "0.9rem",
      fontStyle: "italic",
    }}
  >
    📄 Preview not available
  </div>
)}

              {/* 🧠 Info Section */}
              <div style={{ padding: "16px" }}>
                <h3 style={{ color: "#2a7a3d" }}>{pub.title}</h3>
                <p style={{ color: "#555", lineHeight: "1.6" }}>
                  {pub.description?.slice(0, 500) || "No description available."}
                </p>
                {pub.file && (
                  <a
                    href={pub.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      backgroundColor: "#2a7a3d",
                      color: "#fff",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#1e5c2e")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#2a7a3d")}
                  >
                    View
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
