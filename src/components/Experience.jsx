import React from 'react';

const Experience = () => {
  return (
    <div style={{ width: "100vw", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h2 id="experience" style={{ fontSize: "clamp(3rem, 15vw, 10rem)", margin: "0 0 2rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.05em" }}>Professional</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
        <div style={{ maxWidth: "600px" }}>
          <span style={{ fontSize: "12px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.2em" }}> [ ◇ ]</span>
          <h3 style={{ fontSize: "2.6rem", margin: "1rem 0", fontFamily: "'Times New Roman', serif", textTransform: "none", fontWeight: 400 }}>
            Welcome to the <span style={{ fontStyle: 'italic' }}>professional</span> section of my portfolio.
          </h3>
          <p style={{ opacity: 0.8, lineHeight: "1.8", textAlign: "justify", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.05em" }}>
            This space showcases the systems I’ve built—spanning real-world tech products, research-driven work, and academic projects grounded in engineering depth.
            My work emphasizes end-to-end thinking: from problem definition and system design to implementation, optimization, and real-world deployment.          </p>
        </div>
        <div style={{ maxWidth: "600px", alignSelf: "flex-end", marginRight: "35vw" }}>
          <span style={{ fontSize: "12px", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.2em" }}>[ × ]</span>
          <h3 style={{ fontSize: "2.2rem", margin: "1rem 0", fontFamily: "'Times New Roman', serif", fontWeight: 400 }}>What kind of work?</h3>          <p style={{ opacity: 0.8, lineHeight: "1.8", textAlign: "justify", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.05em" }}>
            My work spans computational research, clinical software, quantum computing, and web systems. Different problems, different stacks — but the same instinct underneath: find the gap between what exists and what should, and close it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
