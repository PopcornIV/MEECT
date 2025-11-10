import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2a7a3d",
        color: "#fff",
        padding: "20px 10px",
        textAlign: "center",
        borderTop: "3px solid #1e5c2e",
        fontSize: "0.9rem",
        lineHeight: "1.4",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          marginBottom: "10px",
        }}
      >
        {/* Contact Section */}
        <div>
          <p style={{ margin: "4px 0" }}>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:meectrust@gmail.com"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              meectrust@gmail.com
            </a>
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Office:</strong> +254 771 328 005
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Mobile:</strong> 0701 433 434
          </p>
        </div>

        {/* Address Section */}
        <div>
          <p style={{ margin: "4px 0" }}>
            SOET HOUSE, 2nd Floor, Room No. 6
          </p>
          <p style={{ margin: "4px 0" }}>Kitale-Eldoret Road</p>
          <p style={{ margin: "4px 0" }}>
            P.O. Box 4556-30200, Kitale, Kenya
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr
        style={{
          borderColor: "#1e5c2e",
          width: "70%",
          margin: "10px auto",
          opacity: 0.5,
        }}
      />

      {/* Bottom Text */}
      <p style={{ margin: 0, color: "#dce8dc", fontSize: "0.85rem" }}>
        © {new Date().getFullYear()} Mount Elgon Ecosystem Conservation Trust
        (MEECT). Built by <strong>Poplogic Creations</strong>.
      </p>
    </footer>
  );
}
