import React from 'react';

const DeepDive = () => {
  return (
    <section id="details" style={{
      position: "relative",
      zIndex: 20,
      backgroundColor: "#000",
      padding: "clamp(40px, 12vw, 140px)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      marginTop: "0",
      gap: "12rem"
    }}>

      {/* 01: ORIGIN (Shifted Left) */}
      <div style={{ maxWidth: "400px", alignSelf: "flex-start", position: "relative" }}>
        <h4 style={{ fontSize: "40px", fontFamily: "'Times New Roman', serif", fontStyle: "italic", opacity: 0.1, position: "absolute", top: "-25px", left: "-15px" }}>01</h4>
        <h3 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem" }}>How it started_</h3>
        <p style={{ opacity: 0.7, fontSize: "13px", lineHeight: "1.6", textAlign: "justify" }}>
          Honestly? I got lucky.
          I won the IBM Qiskit Fall Fest national hackathon in my first semester — still cannot fully believe that happened. One of the judges happened to have connections with MEDxAI, who were exploring quantum computing in drug discovery at the time. One conversation led to another, and before I had fully processed what was happening, I was sitting with $120,000 worth of AWS Braket credits in my first week of joining.
          I had absolutely no idea what I was doing. Which, looking back, was probably the best place to start.
        </p>
      </div>

      {/* 02 & 03: TECHNICAL & SOFT SKILLS (Interlocking) */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "6vw", alignItems: "flex-start" }}>
        {/* TECHNICAL (Impactful) */}
        <div style={{ maxWidth: "500px" }}>
          <h3 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem", textAlign: "right" }}>What I did?</h3>
          <p style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
            lineHeight: "1.3",
            textAlign: "right",
            letterSpacing: "-0.01em"
          }}>
            I helped major Pharmacuetical companies <span style={{ fontStyle: 'italic' }}>reduce their search space</span> for the right set of chemicals by using specialised computational-chemistry workflows.
          </p>
        </div>
        {/* SOFT SKILLS (Small vertical sidebar) */}
        <div style={{ width: "160px", borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "1.2rem" }}>
          <h4 style={{ fontSize: "9px", opacity: 0.4, textTransform: "uppercase", marginBottom: "0.8rem" }}>Professional Edge</h4>
          <p style={{ fontSize: "10px", lineHeight: "1.6", opacity: 0.6 }}>
            Distilling high-fidelity neural outputs for 20+ multinational clients. Collaborative engineering between wet-lab reality and digital vision.
          </p>
        </div>
      </div>

      {/* 04: KEY OUTCOMES (Centered, Bold Block) */}
      <div style={{ alignSelf: "center", maxWidth: "700px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)", padding: "4rem 3rem", position: "relative" }}>
        <span style={{ fontSize: "80px", fontFamily: "'Times New Roman', serif", opacity: 0.05, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>04</span>
        <h3 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1.5rem" }}>Tangible Outcomes_</h3>
        <p style={{ fontSize: "1.4rem", fontFamily: "'Times New Roman', serif", lineHeight: "1.4", fontStyle: "italic" }}>
          "Built <span style={{ color: 'rgb(255, 214, 1)', fontStyle: 'normal', fontWeight: 600 }}>Drug Explorer</span>—currently scaling in Global Pharma. Co-developed a drug candidate for menopausal hot flashes that cleared wet-lab validation."
        </p>
      </div>

      {/* 05: CLIENTS (Bottom Asymmetry) */}
      <div style={{ alignSelf: "flex-end", maxWidth: "350px", borderBottom: "1px solid rgba(255,214,1,0.2)", paddingBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.8rem", color: "rgb(255, 214, 1)" }}>Client Reach_</h4>
        <p style={{ opacity: 0.7, fontSize: "12px", lineHeight: "1.6" }}>
          20+ multinational pharmaceutical entities handled. Delivering dashboards, high-fidelity research reports, and interactive technical roadmaps.
        </p>
      </div>
    </section>
  );
};

export default DeepDive;
