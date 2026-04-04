import React from 'react';

const Contact = () => {
  return (
    <footer id="contact" style={{ 
      padding: "clamp(60px, 15vw, 200px)", 
      backgroundColor: "#000",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "40vh"
    }}>
      <div style={{ display: "flex", gap: "1rem", fontSize: "2.5rem", marginBottom: "2rem" }}>
        🚧 🏗️ 🚧
      </div>

      <h2 style={{
        fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
        fontWeight: 900,
        fontFamily: "'Inter', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "-0.03em",
        color: "#FFF",
        textAlign: "center",
        marginBottom: "1rem"
      }}>
        Site Under Construction
      </h2>

      <p style={{
        fontSize: "14px",
        opacity: 0.3,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }}>
        More coming soon
      </p>

      <div style={{ marginTop: "6rem", fontSize: "10px", opacity: 0.15, color: "#FFF" }}>
        © 2026 NITHEESH K
      </div>
    </footer>
  );
};

export default Contact;
