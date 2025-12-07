import React, { useEffect, useState } from "react";
import axios from "axios";
import { FullScreenLoader, InlineLoader } from "../components/MEECTLoader";

export default function Gallery() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/gallery/`)
      .then((res) => {
        console.log("📸 Gallery API response:", res.data);

        // SAFETY: Make sure backend response is ALWAYS an array
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else if (res.data?.results && Array.isArray(res.data.results)) {
          setEvents(res.data.results);
        } else {
          console.warn("⚠️ Gallery API returned non-array:", res.data);
          setEvents([]); // Prevent crash
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Gallery load error:", err);
        setEvents([]); // Prevent crash
        setLoading(false);
      });
  }, [BACKEND_URL]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setCurrentIndex(0);
  };

  const closeModal = () => setSelectedEvent(null);

  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === selectedEvent.images.length - 1 ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? selectedEvent.images.length - 1 : prev - 1
    );

  if (loading)
    return <FullScreenLoader visible={true} message="Loading Gallery…" />;

  return (
    <section style={{ padding: "2rem", background: "#fff", color: "#333" }}>
      <h1 style={{ color: "#2a7a3d" }}>Gallery</h1>
      <p style={{ color: "#555" }}>
        A collection of our restoration and conservation moments.
      </p>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {events.length === 0 ? (
          <p>No images available yet.</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => openModal(event)}
            >
              {!imageLoaded[event.id] && <InlineLoader />}

              <img
                src={
                  event.images?.length > 0
                    ? `${BACKEND_URL}${event.images[0].image}`
                    : "https://placehold.co/600x400?text=No+Image"
                }
                alt={event.name}
                onLoad={() =>
                  setImageLoaded((prev) => ({ ...prev, [event.id]: true }))
                }
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  display: imageLoaded[event.id] ? "block" : "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  padding: "8px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {event.name}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>

          {!imageLoaded[`modal-${currentIndex}`] && <InlineLoader />}

          <img
            src={`${BACKEND_URL}${selectedEvent.images[currentIndex].image}`}
            alt={selectedEvent.name}
            onLoad={() =>
              setImageLoaded((prev) => ({
                ...prev,
                [`modal-${currentIndex}`]: true,
              }))
            }
            style={{
              maxHeight: "80vh",
              maxWidth: "90%",
              borderRadius: "8px",
              objectFit: "contain",
              display: imageLoaded[`modal-${currentIndex}`] ? "block" : "none",
            }}
          />

          <div
            style={{
              marginTop: "10px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <button
              onClick={prevImage}
              style={{
                background: "#2a7a3d",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ← Prev
            </button>
            <span>
              {currentIndex + 1} / {selectedEvent.images.length}
            </span>
            <button
              onClick={nextImage}
              style={{
                background: "#2a7a3d",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
