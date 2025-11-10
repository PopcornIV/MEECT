import React, { useEffect, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading projects...</p>;

  return (
    <div style={{ padding: "40px" }}>
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
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
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

                {/* Read More Button */}
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
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#1e5c2e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2a7a3d")
                  }
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
