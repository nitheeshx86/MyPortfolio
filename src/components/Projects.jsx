import React from 'react';

const Projects = () => {
  return (
    <div style={{ width: "100vw", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" }}>
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
