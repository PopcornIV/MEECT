import React, { useEffect, useState } from "react";
import { FullScreenLoader } from "../components/MEECTLoader";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ""; // fallback to empty string

export default function About() {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 250);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const team = [
    { name: "Mrs. Sarah Musundi", role: "Chairperson", image: "/team/chairperson.jpg" },
    { name: "Mr. Enoch Kanyanya", role: "Chief Executive Officer", image: "/team/ceo.jpg" },
    { name: "Mr. Aggrey Chemonges", role: "Finance", image: "/team/finance.jpg" },
    { name: "Mrs. Janephrice Talian", role: "Secretary", image: "/team/secretary.jpg" },
    { name: "Mr. Renson Makheti", role: "Audit Committee", image: "/team/audit_commitee.jpg" },
  ];

  const partners = [
    { src: "/partners/usfs.jpg", alt: "US Forest Service" },
    { src: "/partners/foundation.png", alt: "Forest Service International Foundation" },
    { src: "/partners/kfs.jpg", alt: "Kenya Forest Service" },
    { src: "/partners/kws.jpg", alt: "Kenya Wildlife Service" },
  ];

  if (loading) return <FullScreenLoader visible={true} message="Loading About Page…" />;

  return (
    <div style={{ padding: "40px", position: "relative" }}>
      {/* 🏛️ About Section */}
      <section style={{ marginBottom: "50px" }}>
        <h1 style={{ color: "#2a7a3d", textAlign: "center" }}>
          About Mt. Elgon Ecosystem Conservation Trust (MEECT)
        </h1>
        <p
          style={{
            color: "#333",
            lineHeight: "1.8",
            maxWidth: "900px",
            margin: "20px auto",
            textAlign: "justify",
          }}
        >
          Mt. Elgon Ecosystem Conservation Trust (MEECT) was registered in November 2022 to restore
          the Mt. Elgon Forest Ecosystem. Headquartered in Kitale, MEECT comprises nine Trustees and
          a Secretariat. With financial and technical support from USFS, MEECT addresses the lack of
          credible local representation and advocacy for CFAs in the Mt. Elgon ecosystem and
          provides capacity-building support. Our mission is to empower CFAs as agents of forest
          stewardship, economic development, and community-based natural resource governance.
        </p>
      </section>

      {/* 🌍 Mission and Vision */}
      <section
        style={{
          backgroundColor: "#a6eea6ff",
          borderRadius: "10px",
          padding: "30px",
          marginBottom: "50px",
        }}
      >
        <h2 style={{ color: "#2a7a3d", textAlign: "center" }}>Our Mission & Vision</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <h3 style={{ color: "#1e5c2e" }}>Mission</h3>
            <p style={{ color: "#333", lineHeight: "1.7" }}>
              To restore, conserve, and sustainably manage the Mt. Elgon ecosystem through community
              empowerment, partnerships, and climate action.
            </p>
          </div>
          <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
            <h3 style={{ color: "#1e5c2e" }}>Vision</h3>
            <p style={{ color: "#333", lineHeight: "1.7" }}>
              A thriving ecosystem and prosperous communities.
            </p>
          </div>
        </div>
      </section>

      {/* 🎯 Goals */}
      <section style={{ marginBottom: "50px" }}>
        <h2 style={{ color: "#2a7a3d", textAlign: "center" }}>Our Goals</h2>
        <ol
          style={{
            maxWidth: "900px",
            margin: "20px auto",
            color: "#333",
            lineHeight: "1.8",
          }}
        >
          <li>
            Strengthen the capacity of Community Forest Associations (CFAs) for sustainable
            management of the Mt. Elgon Ecosystem.
          </li>
          <li>
            Secure resources for community-led development initiatives focused on forest
            conservation and livelihoods.
          </li>
          <li>
            Provide and coordinate technical support to CFAs, facilitating collaborative forums.
          </li>
          <li>
            Promote collaboration at national, transboundary, regional, and global levels for the
            conservation of the Mt. Elgon ecosystem.
          </li>
        </ol>
      </section>

      <hr style={{ border: "none", borderTop: "2px solid #e0e0e0", width: "80%", margin: "40px auto" }} />

      {/* 👥 Team / Trustees */}
      <section style={{ marginBottom: "50px" }}>
        <h2 style={{ color: "#2a7a3d", textAlign: "center" }}>Our Trustees & Secretariat</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginTop: "30px",
          }}
        >
          {team.map((member, index) => (
            <div
              key={index}
              style={{
                background: "#a6eea6ff",
                borderRadius: "10px",
                textAlign: "center",
                padding: "20px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.08)";
              }}
            >
              <img
                src={`${BACKEND_URL}${member.image}`}
                alt={member.name}
                loading="lazy"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              />
              <h4 style={{ color: "#2a7a3d", marginBottom: "4px" }}>{member.name}</h4>
              <p style={{ color: "#555", margin: 0 }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌍 Partners Section */}
      <section
        style={{
          padding: "30px 0 10px",
          textAlign: "center",
          backgroundColor: "#fff",
          borderTop: "1px solid #e0e0e0",
          marginTop: "40px",
        }}
      >
        <h2 style={{ color: "#2a7a3d", marginBottom: "20px" }}>Our Partners</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            alignItems: "center",
            justifyItems: "center",
            gap: "24px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {partners.map((partner, i) => (
            <img
              key={i}
              src={`${BACKEND_URL}${partner.src}`}
              alt={partner.alt}
              loading="lazy"
              style={{
                width: "130px",
                objectFit: "contain",
                opacity: 0.85,
                transition: "transform 0.25s ease, opacity 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = 0.85;
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          ))}
        </div>
      </section>

      {/* 🔝 Back to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          backgroundColor: "#2a7a3d",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          opacity: showButton ? 1 : 0,
          pointerEvents: showButton ? "auto" : "none",
          transition: "opacity 0.4s ease, transform 0.3s ease",
          zIndex: 1000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1e5c2e";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#2a7a3d";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        ↑
      </button>
    </div>
  );
}
