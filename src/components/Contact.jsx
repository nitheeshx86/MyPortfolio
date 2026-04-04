import React from 'react';

const Contact = () => {
  return (
    <footer id="contact" style={{ 
      borderTop: "1px solid rgba(255,255,255,0.1)", 
      paddingTop: "10rem", 
      paddingBottom: "4rem", 
      paddingLeft: "clamp(40px, 12vw, 140px)",
      paddingRight: "clamp(40px, 12vw, 140px)",
      backgroundColor: "#000",
      color: "#FFF"
    }}>
      <h2 style={{ fontSize: "clamp(2rem, 10vw, 6rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", color: "rgb(255, 214, 1)" }}>Get In Touch</h2>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="mailto:hello@nitheesh.me" style={{ fontSize: "2rem", color: "#FFF", textDecoration: "none", borderBottom: "2px solid #FFF" }}>hello@nitheesh.me</a>
          <p style={{ opacity: 0.5, textTransform: "uppercase", fontSize: "12px" }}>Available for core systems research & building.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "12px", opacity: 0.5 }}>© 2026 NITHEESH K.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
