import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaSeedling, FaArrowUp } from "react-icons/fa";
import api from "../api/client";
import heroImage from "../assets/hero.jpg"; // hero image
import { FullScreenLoader, InlineLoader } from "../components/MEECTLoader";

const Home = () => {
  const [featured, setFeatured] = useState({
    publication: null,
    gallery: null,
    project: null,
  });
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pubRes, galRes, projRes] = await Promise.all([
          api.get("publications/"),
          api.get("gallery/"),
          api.get("projects/"),
        ]);

        const publication =
          pubRes.data.find((p) => p.is_featured) || pubRes.data[0] || null;
        const gallery =
          galRes.data.find((g) => g.is_featured) || galRes.data[0] || null;
        const project =
          projRes.data.find((p) => p.is_featured) || projRes.data[0] || null;

        setFeatured({ publication, gallery, project });
      } catch (error) {
        console.error("❌ Error fetching featured content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div>
      {/* 🌿 HERO SECTION */}
      <section
        style={{
          background: `url(${heroImage}) center/cover no-repeat`,
          color: "#fff",
          textAlign: "center",
          padding: "6rem 2rem",
          position: "relative",
        }}
      >
        <div style={{ background: "rgba(0,0,0,0.45)", padding: "3rem", borderRadius: "12px" }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: "2.4rem", marginBottom: "1rem", fontWeight: "700" }}
          >
            Protecting the Mount Elgon Ecosystem — Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{ maxWidth: 700, margin: "0 auto", color: "#f1f1f1" }}
          >
            MEECT supports community-driven conservation, capacity building, and sustainable
            livelihoods across the Mount Elgon landscape.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
              to="/contact"
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                padding: "0.8rem 1.6rem",
                background: "#2a7a3d",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Get Involved
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🌱 MISSION & VISION */}
      <section style={{ padding: "3rem 2rem", background: "#f9fdf9" }}>
        <h2 style={{ color: "#145a2b", textAlign: "center", marginBottom: "2rem" }}>
          Our Vision & Mission
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {[ 
            { icon: <FaLeaf />, title: "Vision", text: "A thriving Mount Elgon ecosystem supporting communities and nature." },
            { icon: <FaUsers />, title: "Mission", text: "Empowering CFAs and communities to lead sustainable forest conservation." },
            { icon: <FaSeedling />, title: "Goal", text: "Promote restoration, livelihood resilience, and ecosystem balance." },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "2rem", color: "#2a7a3d", marginBottom: "1rem" }}>
                {card.icon}
              </div>
              <h3 style={{ color: "#145a2b" }}>{card.title}</h3>
              <p style={{ color: "#555", fontSize: "0.95rem" }}>{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

     {/* 📘 FEATURED CONTENT */}
{loading && (
  <FullScreenLoader visible={true} message="Fetching featured content…" />
)}

<section style={{ padding: "3rem 2rem" }}>
  <h2 style={{ color: "#2a7a3d", textAlign: "center" }}>Featured Highlights</h2>
  <p style={{ color: "#555", textAlign: "center", marginBottom: "2rem" }}>
    Explore MEECT’s latest publications, galleries, and projects.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    }}
  >
    {/* ---- FEATURED PUBLICATION ---- */}
    {featured.publication && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "1rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {/* FIXED LOGIC */}
        {featured.publication.preview_image ? (
          <img
            src={featured.publication.preview_image}
            alt={featured.publication.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        ) : (
          <InlineLoader visible={true} message="Loading preview…" />
        )}

        <h3 style={{ color: "#145a2b" }}>{featured.publication.title}</h3>
        <p style={{ color: "#555" }}>
          {featured.publication.description?.slice(0, 80) ||
            "No description available"}
          ...
        </p>
        <Link
          to="/publications"
          style={{ color: "#2a7a3d", fontWeight: 600 }}
        >
          Read More →
        </Link>
      </motion.div>
    )}

    {/* ---- FEATURED GALLERY ---- */}
    {featured.gallery && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "1rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {featured.gallery.images?.length > 0 ? (
          <img
            src={featured.gallery.images[0].image}
            alt={featured.gallery.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        ) : (
          <InlineLoader visible={true} message="Loading images…" />
        )}

        <h3 style={{ color: "#145a2b" }}>{featured.gallery.name}</h3>
        <p style={{ color: "#555" }}>
          A glimpse into our recent conservation efforts.
        </p>
        <Link to="/gallery" style={{ color: "#2a7a3d", fontWeight: 600 }}>
          View Gallery →
        </Link>
      </motion.div>
    )}

    {/* ---- FEATURED PROJECT ---- */}
    {featured.project && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "1rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        {featured.project.image ? (
          <img
            src={featured.project.image}
            alt={featured.project.title}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        ) : (
          <InlineLoader visible={true} message="Loading project…" />
        )}

        <h3 style={{ color: "#145a2b" }}>{featured.project.title}</h3>
        <p style={{ color: "#555" }}>
          {featured.project.summary?.slice(0, 80) ||
            "No description available"}
          ...
        </p>
        <Link to="/projects" style={{ color: "#2a7a3d", fontWeight: 600 }}>
          Explore →
        </Link>
      </motion.div>
    )}
  </div>
</section>

      {/* ⬆️ Back to Top Button */}
      {showTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
          }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </div>
  );
};

export default Home;
