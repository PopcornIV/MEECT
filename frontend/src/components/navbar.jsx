import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const linkBase = {
    marginLeft: "1rem",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.2s ease",
  };

  const getLinkStyle = (active) => ({
    ...linkBase,
    color: active ? "#ccf0d4ff" : "#333",
  });

  const NavLinks = () => (
    <>
      <Link style={getLinkStyle(pathname === "/")} to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
      <Link style={getLinkStyle(pathname === "/about")} to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
      <Link style={getLinkStyle(pathname === "/projects")} to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>

      {/* Resources Dropdown */}
      <div
        ref={dropdownRef}
        style={{
          position: "relative",
          display: "inline-block",
          marginLeft: "1rem",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: "#333",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
          }}
        >
          Resources <FaChevronDown size={12} style={{ marginLeft: 4 }} />
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: 0,
              background: "#2a7a3d",
              border: "1px solid #eee",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: 6,
              overflow: "hidden",
              minWidth: 150,
              zIndex: 100,
            }}
          >
            <Link
              to="/publications"
              style={{
                display: "block",
                padding: "8px 12px",
                textDecoration: "none",
                color: "#333",
              }}
              onClick={() => {
                setDropdownOpen(false);
                setMobileMenuOpen(false);
              }}
            >
              Publications
            </Link>
            <Link
              to="/gallery"
              style={{
                display: "block",
                padding: "8px 12px",
                textDecoration: "none",
                color: "#333",
              }}
              onClick={() => {
                setDropdownOpen(false);
                setMobileMenuOpen(false);
              }}
            >
              Gallery
            </Link>
          </div>
        )}
      </div>

      <Link
        style={getLinkStyle(pathname === "/contact")}
        to="/contact"
        onClick={() => setMobileMenuOpen(false)}
      >
        Contact Us
      </Link>
    </>
  );

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #e6e6e6",
        background: "#2a7a3d",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.jpg"
            alt="MEECT Logo"
            style={{
             height: "42px",
             width: "42px",
             objectFit: "contain",
             borderRadius: "6px",
             backgroundColor: "white",
             padding: "2px",
          }}
        />
        <h2 style={{ margin: 0, fontWeight: 600 }}>MEECT</h2>
      </div>
        <div style={{ marginLeft: 12, color: "#ccf0d4ff", fontSize: "0.9rem" }}>
          Mount Elgon Ecosystem Conservation Trust
        </div>
      </div>

      {/* Right side desktop menu */}
      <nav className="desktop-menu" style={{ display: "flex", alignItems: "center" }}>
        <div className="desktop-links" style={{ display: "flex", alignItems: "center" }}>
          <NavLinks />
        </div>
      </nav>

      {/* Mobile menu icon */}
      <div className="mobile-menu-icon" style={{ display: "none" }}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "absolute",
            top: "4rem",
            right: "2rem",
            background: "#2a7a3d",
            border: "1px solid #eee",
            borderRadius: 6,
            padding: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          <NavLinks />
        </div>
      )}

      {/* Responsive styling */}
      <style>
        {`
        @media (max-width: 900px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-menu-icon {
            display: block !important;
          }
        }

        a:hover, button:hover {
          color: #ccf0d4ff !important;
        }
        `}
      </style>
    </header>
  );
}
