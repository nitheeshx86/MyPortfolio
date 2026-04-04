import React from 'react';

const PersonalProjects = () => {
  return (
    <div style={{
      width: "100vw",
      height: "100%",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      boxSizing: "border-box",
      padding: "clamp(40px, 12vw, 140px)",
      position: "relative"
    }}>
      <div style={{ maxWidth: "1000px" }}>
        <h2 style={{
          fontSize: "clamp(2rem, 9vw, 8rem)",
          margin: "0",
          fontWeight: 900,
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "-0.04em",
          color: "#FFF",
          lineHeight: 0.9,
          marginBottom: "3rem"
        }}>
          PROJECTS.
        </h2>

        <span style={{
          fontSize: "11px",
          opacity: 0.4,
          textTransform: "uppercase",
          letterSpacing: "0.5em",
          marginBottom: "2rem",
          display: "block"
        }}>
          // Personal Projects /////////////
        </span>

        <p style={{
          fontSize: "clamp(1.2rem, 2.5vw, 2.8rem)",
          lineHeight: "1.2",
          fontWeight: 400,
          fontFamily: "'Times New Roman', serif",
          color: "#FFF",
          letterSpacing: "-0.01em",
          marginBottom: "2.5rem"
        }}>
          I build because something in me cannot look at an incomplete thing and walk away. <span style={{ opacity: 0.4 }}>Not because someone asked me to. Not for a grade or a certificate.</span> Just because the gap between what exists and what should exist is too obvious to ignore.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginTop: "2rem" }}>
          <p style={{
            fontSize: "16px",
            lineHeight: "1.5",
            opacity: 0.7,
            fontFamily: "'Inter', sans-serif"
          }}>
            The philosophy underneath all of it is simple: technology is the most powerful tool humans have ever made for improving the quality of other people's lives. And most of that potential is still untapped — not because the technology does not exist, but because not enough people are pointing it at the right problems.
          </p>
          <p style={{
            fontSize: "16px",
            lineHeight: "1.5",
            opacity: 0.7,
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic"
          }}>
            "If the work ends up being impressive, that is a consequence. Not the motivation."
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalProjects;
