import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const projects = [
  {
    name: "Drug Explorer",
    tag: "Computational Chemistry // MEDxAI",
    description: "Converts SMILES data into binding affinity and drug synergy insights.",
    detail: "Built internally at MEDxAI. Now used by major pharmaceutical companies as a key research interface for early-stage drug discovery workflows.",
    longDescription: "Drug Explorer is a computational chemistry interface built during the MEDxAI research residency. It processes SMILES (Simplified Molecular Input Line Entry System) strings and returns interpretable outputs including binding affinity scores, predicted drug synergy, and molecular interaction graphs. The tool was built to reduce the time between compound selection and wet-lab prioritisation. It is now deployed as a core tool within the internal workflows of multiple major pharmaceutical organisations."
  },
  {
    name: "Project 02",
    tag: "TBD",
    description: "Something important is being built here.",
    detail: "Details coming soon.",
    longDescription: "More detailed information about this project will be added soon."
  },
  {
    name: "Project 03",
    tag: "TBD",
    description: "Another thing worth building.",
    detail: "Details coming soon.",
    longDescription: "More detailed information about this project will be added soon."
  }
];

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 6vw, 80px)",
          backdropFilter: "blur(6px)"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor: "#FFF",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "960px",
            maxHeight: "85vh",
            overflowY: "auto",
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        >
          {/* Modal Top Bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 2rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            position: "sticky",
            top: 0,
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            zIndex: 1
          }}>
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontFamily: "'Inter', sans-serif", fontSize: "15px" }}>{project.name}</span>
              <span style={{ fontSize: "10px", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em" }}>{project.tag}</span>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "36px",
                height: "36px",
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: "50%",
                background: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.color = "#FFF"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#000"; }}
            >
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: "3rem 3rem 4rem" }}>
            <p style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2.4rem)",
              fontFamily: "'Times New Roman', serif",
              lineHeight: "1.25",
              letterSpacing: "-0.02em",
              color: "#000",
              marginBottom: "3rem"
            }}>
              {project.description}
            </p>
            <p style={{
              fontSize: "16px",
              fontFamily: "'Inter', sans-serif",
              lineHeight: "1.75",
              color: "#000",
              opacity: 0.65,
              maxWidth: "680px"
            }}>
              {project.longDescription}
            </p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const NavBubble = ({ direction, onClick, disabled }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "60px",
        height: "120px",
        borderRadius: direction === "left" ? "0 120px 120px 0" : "120px 0 0 120px",
        backgroundColor: disabled ? "#111" : hovered ? "#FFD700" : "#000",
        border: "2px solid #FFF",
        borderLeft: direction === "left" ? "none" : "2px solid #FFF",
        borderRight: direction === "right" ? "none" : "2px solid #FFF",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s steps(4)", // Snappy retro transition
        opacity: disabled ? 0.3 : 1,
        zIndex: 10,
        boxShadow: hovered && !disabled ? `0 0 20px rgba(255, 215, 0, 0.3)` : "none"
      }}
    >
      <span style={{
        color: hovered && !disabled ? "#000" : "#FFF",
        fontSize: "24px",
        fontWeight: 900,
        fontFamily: "'Courier New', monospace",
        transform: hovered && !disabled ? `translateX(${direction === "left" ? "-4px" : "4px"})` : "none",
        transition: "transform 0.1s steps(2)",
      }}>
        {direction === "left" ? "❮" : "❯"}
      </span>
    </button>
  );
};

const ProjectCard = ({ project, onKnowMore }) => {
  return (
    <div style={{
      backgroundColor: "#FFF",
      borderRadius: "4px",
      overflow: "hidden",
      width: "100%",
      backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}>
      {/* Top Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 2rem",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "rgba(255,255,255,0.9)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em", color: "#000" }}>
            {project.name}
          </span>
          <span style={{ fontSize: "10px", color: "#000", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {project.tag}
          </span>
        </div>
        <button style={{
          fontSize: "11px",
          fontFamily: "'Inter', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          padding: "0.5rem 1.4rem",
          border: "1px solid #000",
          backgroundColor: "transparent",
          color: "#000",
          cursor: "pointer",
          borderRadius: "2px",
          transition: "all 0.25s ease"
        }}
          onClick={onKnowMore}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.color = "#FFF"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#000"; }}
        >
          Know More ↗
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "flex", minHeight: "380px" }}>
        {/* Left — Text */}
        <div style={{
          flex: 1,
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(0,0,0,0.06)"
        }}>
          <div>
            <p style={{
              fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
              fontFamily: "'Times New Roman', serif",
              fontWeight: 400,
              color: "#000",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              marginBottom: "2rem"
            }}>
              {project.description}
            </p>
            <p style={{
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: "#000",
              opacity: 0.5,
              lineHeight: "1.7"
            }}>
              {project.detail}
            </p>
          </div>
          <span style={{ fontSize: "10px", opacity: 0.15, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            PLACEHOLDER — CONTENT TBD
          </span>
        </div>

        {/* Right — Image placeholder */}
        <div style={{
          width: "45%",
          flexShrink: 0,
          backgroundColor: "rgba(0,0,0,0.03)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem"
        }}>
          <div style={{
            width: "100%",
            aspectRatio: "4/3",
            border: "1px dashed rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "2px"
          }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.2em", opacity: 0.2, textTransform: "uppercase" }}>IMAGE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Photography = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [modalProject, setModalProject] = useState(null);

  const goNext = () => {
    if (current < projects.length - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  };

  const goPrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  };

  return (
    <div id="projects-showcase" style={{
      padding: "clamp(60px, 12vw, 160px)",
      backgroundColor: "#000",
      position: "relative",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem" }}>
        <span style={{ fontSize: "11px", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.5em", color: "#FFF" }}>
          SELECTED WORK
        </span>
        <span style={{ fontSize: "13px", opacity: 0.2, fontFamily: "'Times New Roman', serif", color: "#FFF", fontStyle: "italic" }}>
          {current + 1} / {projects.length}
        </span>
      </div>

      {/* Card Carousel with Nav Bubbles outside card, in margin */}
      <div style={{ position: "relative", overflow: "visible" }}>
        {/* Left Bubble — flat edge flush against left site border */}
        <div style={{
          position: "absolute",
          left: "calc(-1 * clamp(60px, 12vw, 160px) + 16px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10
        }}>
          <NavBubble direction="left" onClick={goPrev} disabled={current === 0} />
        </div>

        {/* Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ProjectCard 
              project={projects[current]} 
              onKnowMore={() => setModalProject(projects[current])} 
            />
          </motion.div>
        </AnimatePresence>

        {/* Right Bubble — flat edge flush against right site border */}
        <div style={{
          position: "absolute",
          right: "calc(-1 * clamp(60px, 12vw, 160px) + 16px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10
        }}>
          <NavBubble direction="right" onClick={goNext} disabled={current === projects.length - 1} />
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};

export default Photography;
