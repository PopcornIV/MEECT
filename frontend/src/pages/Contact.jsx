import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart, Handshake, Leaf, ArrowUp } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [showScroll, setShowScroll] = useState(false);

  // Show "Back to Top" button when scrolled
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-clear status message after 4 seconds
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send. Please try again.");
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ color: "#2a7a3d", textAlign: "center" }}>Get Involved & Contact Us</h1>
      <p style={{ color: "#555", textAlign: "center", maxWidth: 700, margin: "1rem auto" }}>
        Join us in conserving the Mount Elgon ecosystem through volunteering, partnerships, and support.
      </p>

      {/* Involvement Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", marginTop: "2rem" }}>
        {[
          { icon: <Heart size={36} color="#2a7a3d" />, title: "Volunteer", text: "Join us in tree planting, awareness, and restoration efforts." },
          { icon: <Handshake size={36} color="#2a7a3d" />, title: "Partner", text: "Collaborate with MEECT on sustainable conservation projects." },
          { icon: <Leaf size={36} color="#2a7a3d" />, title: "Donate", text: "Support our community-led conservation programs." },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{ flex: "1 1 280px", background: "#fff", borderRadius: 10, padding: "1.5rem", textAlign: "center", boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}
          >
            <div>{card.icon}</div>
            <h3 style={{ color: "#145a2b", marginTop: 10 }}>{card.title}</h3>
            <p style={{ color: "#555" }}>{card.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: 10, padding: "2rem", marginTop: "3rem", maxWidth: 500, marginInline: "auto" }}
      >
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: 8, margin: "6px 0 10px", borderRadius: 5, border: "1px solid #ccc" }} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: 8, margin: "6px 0 10px", borderRadius: 5, border: "1px solid #ccc" }} />

        <label>Subject</label>
        <input name="subject" value={formData.subject} onChange={handleChange} required style={{ width: "100%", padding: 8, margin: "6px 0 10px", borderRadius: 5, border: "1px solid #ccc" }} />

        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required style={{ width: "100%", padding: 8, margin: "6px 0 10px", borderRadius: 5, border: "1px solid #ccc" }} />

        <button
          type="submit"
          style={{ background: "#044112ff", color: "#fff", padding: "0.6rem 1.2rem", border: "none", borderRadius: 6, cursor: "pointer", width: "100%", transition: "background 0.3s ease" }}
          onMouseEnter={(e) => (e.target.style.background = "#2a7a3d")}
          onMouseLeave={(e) => (e.target.style.background = "#044112ff")}
        >
          Send Message
        </button>

        {status && <p style={{ marginTop: 10, color: status.startsWith("✅") ? "green" : "red", textAlign: "center" }}>{status}</p>}
      </motion.form>

      {/* 🡅 Back to Top Button */}
      {showScroll && (
        <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", bottom: 30, right: 30, background: "#2a7a3d", color: "#fff", border: "none", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
          <ArrowUp size={24} />
        </motion.button>
      )}
    </section>
  );
}
