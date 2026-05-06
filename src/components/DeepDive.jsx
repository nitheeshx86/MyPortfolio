import React from 'react';
import FlowingMenu from './FlowingMenu';
import teamImg from '../assets/MEDxAI/team.jpeg';

const DeepDive = () => {
  const menuItems = [
    {
      link: "#",
      text: "Technical Skills",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      description: [
        "SMILES processing, binding affinity analysis, drug synergy modelling",
        "GROMACS molecular dynamics simulations",
        "Linux HPC environments",
        "PyRX, PyMOL, ChimeraX, AlphaFold"
      ]
    },
    {
      link: "#",
      text: "Soft Skills",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      description: [
        "Data dashboards and client-facing reports",
        "Agile sprint planning and iterative releases",
        "Cross-functional collaboration across full build cycles",
        "Managing ambiguity independently with minimal documentation",
        "Communicating technical findings clearly to non-technical audiences"
      ]
    },
    {
      link: "#",
      text: "Research Interests",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      description: [
        "Computational drug discovery",
        "Molecular dynamics simulation",
        "Quantum computing applications in pharma",
        "Intelligent narrowing of large chemical datasets",
        "Focused on making science faster without losing rigour"
      ]
    },
    {
      link: "#",
      text: "Measurable Outcomes",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: [
        "5 internal tools shipped (one now outsourced to pharma)",
        "1 drug candidate cleared wet-lab validation",
        "20+ multinational clients",
        "Independent resolution of critical GROMACS query"
      ]
    }
  ];

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
      gap: "8rem",
      overflow: "visible"
    }}>

      {/* 01: ORIGIN & TEAM IMAGE */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "4rem", flexWrap: "wrap", width: "100%" }}>
        <div style={{ maxWidth: "400px", position: "relative" }}>
          <h4 style={{ fontSize: "40px", fontFamily: "'Times New Roman', serif", fontStyle: "italic", opacity: 0.1, position: "absolute", top: "-25px", left: "-15px" }}>01</h4>
          <h3 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1rem" }}>How it started_</h3>
          <p style={{ opacity: 0.7, fontSize: "13px", lineHeight: "1.6", textAlign: "justify" }}>
            Honestly? I got lucky.
            I won the IBM Qiskit Fall Fest national hackathon in my first semester — still cannot fully believe that happened. One of the judges happened to have connections with MEDxAI, who were exploring quantum computing in drug discovery at the time. One conversation led to another, and before I had fully processed what was happening, I was sitting with $120,000 worth of AWS Braket credits in my first week of joining.
            I had absolutely no idea what I was doing. Which, looking back, was probably the best place to start.
          </p>
        </div>
        
        {/* Team Image */}
        <div style={{ 
          flex: "1", 
          maxWidth: "400px", 
          minWidth: "300px",
          borderRadius: "8px", 
          overflow: "hidden",
          opacity: 0.9,
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
        }}>
          <img src={teamImg} alt="MEDxAI Team" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
        </div>
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
            I helped major Pharmacuetical companies <span style={{ fontStyle: 'italic' }}>narrow down their search space</span> for the right set of chemicals by using specialised computational-chemistry workflows.
          </p>
        </div>
      </div>

      {/* INTERACTIVE FLOWING MENU (Skill Pillars) */}
      <div style={{ marginTop: "4rem", width: "100%", alignSelf: "flex-start" }}>
        <span style={{ fontSize: "11px", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.5em", marginBottom: "2.5rem", display: "block" }}>The Internship, Unpacked</span>
        <div style={{ maxWidth: "600px" }}>
          <FlowingMenu
            items={menuItems}
            textColor="rgba(255, 255, 255, 0.7)"
          />
        </div>
      </div>

    </section>
  );
};

export default DeepDive;
