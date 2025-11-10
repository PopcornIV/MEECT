import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  return (
    <section style={{ padding: "2rem" }}>
      <h1 style={{ color: "#2a7a3d" }}>Get Involved / Contact Us</h1>
      <p style={{ color: "#555" }}>
        Join us in conserving the Mount Elgon ecosystem. You can volunteer, partner with us, or support our initiatives through donations.
      </p>

      <h3 style={{ marginTop: 20, color: "#2a7a3d" }}>Ways to Get Involved</h3>
      <ul style={{ color: "#444" }}>
        <li>Volunteer with MEECT in restoration and community programs.</li>
        <li>Partner with us for conservation or awareness initiatives.</li>
        <li>Donate to support sustainable community projects.</li>
      </ul>

      <h3 style={{ marginTop: 30, color: "#2a7a3d" }}>Contact Form</h3>
      <form style={{ maxWidth: 500, marginTop: 10 }}>
        <label>Name</label>
        <input type="text" placeholder="Your name" style={{ width: "100%", padding: 8, margin: "6px 0" }} />
        <label>Email</label>
        <input type="email" placeholder="Your email" style={{ width: "100%", padding: 8, margin: "6px 0" }} />
        <label>Message</label>
        <textarea placeholder="Your message..." rows="4" style={{ width: "100%", padding: 8, margin: "6px 0" }}></textarea>
        <button
          type="submit"
          style={{
            background: "#044112ff",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            border: "none",
            borderRadius: 6,
            marginTop: 10,
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
