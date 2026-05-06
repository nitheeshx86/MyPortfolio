import React from 'react';
import bgVideo from '../assets/MEDxAI/BgVideo.mp4';

const Projects = () => {
  return (
    <div style={{ 
      width: "100vw", 
      flexShrink: 0, 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      boxSizing: "border-box", 
      height: "100%",
      position: "relative" // For absolute positioning of video
    }}>
      {/* Background Video Decoration (Smaller & Darker) */}
      <div style={{
        position: "absolute",
        right: "5vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "35vw",
        height: "60vh",
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.4, // Reduced for a darker, more subtle feel
      }}>
        <video 
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Deep, Seamless Vignette & Blend Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, transparent 0%, rgba(0,0,0,1) 85%)",
          zIndex: 1
        }} />
      </div>

      {/* Video Caption (Humane & Visible) */}
      <div style={{
        position: "absolute",
        right: "160px", // Pushed further left
        top: "calc(50% + 30vh + 20px)",
        width: "30vw",
        maxWidth: "450px",
        textAlign: "right",
        fontSize: "15px",
        fontFamily: "'Times New Roman', serif",
        fontStyle: "italic",
        color: "#FFF",
        opacity: 0.6,
        lineHeight: "1.6",
        letterSpacing: "0.02em",
        pointerEvents: "none"
      }}>
        In the seeming chaos of molecules colliding, chemistry reveals a quiet order—an unseen choreography where randomness becomes structure, and disorder gives rise to the elegance of life.
      </div>

      {/* Label above heading */}
      <span style={{ fontSize: "12px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem" }}> [ Featured Experience ] </span>

      {/* Main Internship Heading */}
      <h2 id="projects" style={{
        fontSize: "clamp(3rem, 12vw, 8rem)",
        margin: "0",
        fontWeight: 400,
        fontFamily: "'Times New Roman', serif",
        textTransform: "capitalize",
        letterSpacing: "-0.02em",
        color: "rgb(255, 214, 1)",
        lineHeight: 1
      }}>
        Research Intern
      </h2>
      <h3 style={{
        fontSize: "clamp(1.5rem, 6vw, 4rem)",
        margin: "0.5rem 0 2rem",
        fontWeight: 400,
        fontFamily: "'Times New Roman', serif",
        fontStyle: 'italic',
        color: "#FFF",
        opacity: 1
      }}>
        @ MEDxAI
      </h3>

      {/* Date & Location */}
      <div style={{ display: "flex", gap: "2rem", marginBottom: "4rem" }}>
        <div style={{ borderLeft: "1px solid rgba(255, 214, 1, 0.4)", paddingLeft: "1.5rem" }}>
          <span style={{ fontSize: "12px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>Duration</span>
          <h3 style={{ fontSize: "1.2rem", margin: "0.5rem 0", fontWeight: 500 }}>Oct 2024 — Feb 2026</h3>
        </div>
      </div>

      {/* Description / Accomplishments */}
      <div style={{ maxWidth: "55vw" }}>
        <p style={{
          fontSize: "13px",
          lineHeight: "2",
          textAlign: "justify",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: 0.8,
          whiteSpace: "normal",
          wordBreak: "break-word"
        }}>
          I had the pleasure of working as a Research Intern with stipend at MEDxAI for 1.5 years. Built five internal drug discovery tools including Drug Explorer — converts SMILES data into binding affinity and drug synergy insights, now used by major pharmaceutical companies. Contributed to a drug candidate targeting menopausal hot flashes that has cleared wet-lab validation and is progressing toward clinical trials. Ran GROMACS molecular dynamics simulations on a Linux HPC system in raw C, no GUI, for a critical client query. Delivered dashboards and reports to 20+ multinational pharmaceutical clients.
        </p>
      </div>
    </div>
  );
};

export default Projects;
