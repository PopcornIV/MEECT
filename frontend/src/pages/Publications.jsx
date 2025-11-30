import React, { useEffect, useState } from "react";
import api from "../api/client";
import { FaArrowUp } from "react-icons/fa";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    api
      .get("publications/")
      .then((res) => setPublications(res.data))
      .catch((err) => console.error("❌ Error loading publications:", err))
      .finally(() => setLoading(false));
  }, []);

  // Show "Back to Top" button on scroll
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0", color: "#2a7a3d" }}>
        <p>Loading publications...</p>
      </div>
    );
  }

  return (
    <section style={{ padding: "2rem", position: "relative" }}>
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
              {/* PDF Preview */}
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

              {/* Info Section */}
              <div style={{ padding: "16px" }}>
                <h3 style={{ color: "#2a7a3d" }}>{pub.title}</h3>
                <p style={{ color: "#555", lineHeight: "1.6" }}>
                  {pub.description?.slice(0, 500) || "No description available."}
                </p>
                {pub.file && (
                  <a
                    href={pub.file ? `http://127.0.0.1:8000/publications/view/${pub.id}/` : "#"}
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

      {/* ⬆️ Back to Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#2a7a3d",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease, background 0.3s ease",
            zIndex: 1000,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1e5c2e";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#2a7a3d";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <FaArrowUp />
        </button>
      )}
    </section>
  );
}
