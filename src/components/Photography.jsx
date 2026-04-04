import React from 'react';

const Photography = () => {
  return (
    <div id="photography" style={{ padding: "clamp(40px, 12vw, 140px)", backgroundColor: "#000" }}>
      <span style={{ fontSize: "12px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "2rem", display: "block", color: "#FFF" }}>[ VISUALS ]</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ aspectRatio: "4/5", background: "#111", border: "1px solid rgba(255,255,255,0.1)" }} />
        ))}
      </div>
    </div>
  );
};

export default Photography;
