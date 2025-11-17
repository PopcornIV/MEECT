import React, { useEffect, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import { FullScreenLoader, InlineLoader } from "../components/MEECTLoader";
import { FaArrowUp } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    api
      .get("projects/")
      .then((res) => {
        console.log("✅ API Response:", res.data);
        setProjects(res.data);
      })
      .catch((err) => console.error("❌ Error loading projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // Show "Back to Top" button on scroll
  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) return <FullScreenLoader visible={true} message="Loading Projects…" />;

  return (
    <div style={{ padding: "40px", position: "relative" }}>
      <h1 style={{ color: "#2a7a3d", textAlign: "center" }}>Our Projects</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        {projects.length === 0 ? (
          <p>No projects available yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
                overflow: "hidden",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.08)";
              }}
            >
              {project.image && (
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                    position: "relative",
                  }}
                >
                  {!imageLoaded[project.id] && <InlineLoader />}
                  <img
                    src={project.image}
                    alt={project.title}
                    onLoad={() =>
                      setImageLoaded((prev) => ({ ...prev, [project.id]: true }))
                    }
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: imageLoaded[project.id] ? "block" : "none",
                      borderBottom: "3px solid #2a7a3d",
                    }}
                  />
                </div>
              )}

              <div style={{ padding: "16px" }}>
                <h3
                  style={{
                    color: "#2a7a3d",
                    marginBottom: "8px",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                  }}
                >
                  {project.title}
                </h3>

                <p style={{ color: "#444", lineHeight: "1.6" }}>
                  {project.summary && project.summary.trim() !== ""
                    ? project.summary.length > 160
                      ? `${project.summary.slice(0, 160)}...`
                      : project.summary
                    : "No summary available."}
                </p>

                <Link
                  to={`/projects/${project.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    padding: "8px 14px",
                    backgroundColor: "#2a7a3d",
                    color: "#fff",
                    borderRadius: "6px",
                    textDecoration: "none",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e5c2e")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2a7a3d")}
                >
                  Read More →
                </Link>
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
    </div>
  );
}
