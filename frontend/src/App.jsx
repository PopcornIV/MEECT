import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Publications from "./pages/Publications";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
