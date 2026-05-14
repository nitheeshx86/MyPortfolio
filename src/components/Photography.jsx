import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import stanleyLogo from '../assets/Projects/Stanley.png';
import lithoMapLogo from '../assets/Projects/image.png';
import samsungLogo from '../assets/samsung.svg';
import nyuLogo from '../assets/Projects/NYU.png';
import semicircleImg from '../assets/Projects/semicircle.png';
import zerodhaLogo from '../assets/Projects/Zerodha.png';
import varsityLogo from '../assets/Projects/Varsity.png';
import isroLogo from '../assets/isro.png';

const projects = [
  {
    name: "LithoMap: Renal Calculi Spatial Mapping",
    tag: "Govt. Stanley Medical College",
    description: "Equipping Public Health Infrastructure with Technology",
    detail: "Developed in collaboration with the Tamil Nadu Government Department of Health and Family Welfare, LithoMap is a specialized spatial analysis tool built for the Department of Biochemistry at Govt. Stanley Medical College.",
    logo: stanleyLogo,
    secondaryLogo: lithoMapLogo,
    overview: [
      "Led the engineering team as Lead Architect, overseeing the end-to-end system design and spearheading the development lifecycle.",
      "Collaborated directly with the Dean of Biochemistry and clinical researchers to translate complex clinical requirements into high-fidelity technical features.",
      "Providing ongoing technical consultation and post-deployment support to facilitate scalability and research integration.",
      "Engineered an advanced spatial mapping engine for 3D visualization and mineral composition analysis of renal calculi."
    ],
    note: "P.S. I declined monetary compensation for this. Consider it a late payment for the time Stanley's doctors had to treat me after I thought lighting three Diwali flower pots at once was a brilliant idea. Just my small way of giving back to a selfless ecosystem that has served India for 350 years.",
    longDescription: "Detailed case study for LithoMap coming soon."
  },
  {
    name: "Large-Scale AI System Optimization",
    tag: "Samsung Research",
    description: "Efficient Inference & Compute-Aware Deployment",
    detail: "Worked on confidential research initiatives related to large-scale AI system optimization, efficient inference workflows, and compute-aware deployment strategies for next-generation intelligent systems.",
    logo: samsungLogo,
    logoHeight: "30px",
    overview: [
      "Worked on performance optimization workflows for large AI systems.",
      "Contributed to scalable multi-core compute and acceleration strategies.",
      "Assisted in experimentation, benchmarking, and efficiency-focused research pipelines.",
      "Collaborated on internal tooling and deployment-oriented optimization efforts.",
      "Participated in research targeting efficient on-device and resource-aware AI execution."
    ],
    note: "Due to the proprietary nature of the work, specific architectures, methodologies, and implementation details cannot be publicly disclosed.",
    longDescription: "Focused on improving the scalability and practicality of advanced AI systems under real-world hardware constraints."
  },
  {
    name: "Financial Fraud Detection using QFL",
    tag: "NYU Abu Dhabi // Qinnovision '25",
    description: "Securing Financial Ecosystems with Quantum Federated Learning",
    detail: "Built for the Qinnovision 2025 Challenge by CQTS at NYU Abu Dhabi, exploring the synergy of Quantum Computing and Federated Learning.",
    logo: nyuLogo,
    logoHeight: "50px",
    overview: [
      "Architected a secure Quantum Federated Learning (QFL) framework for private, decentralized fraud detection.",
      "Implemented hybrid Quantum-Classical ML models to enhance pattern recognition in financial transaction data.",
      "Analyzed quantum circuit scalability within federated architectures to ensure robust distributed performance."
    ],
    note: "P.S. Didn't take home the trophy, but walked away with enough quantum knowledge to make legacy security protocols look like paper locks.",
    longDescription: "Detailed research and project documentation for the Qinnovision 2025 QFL Challenge coming soon."
  },
  {
    name: "Lead Student Coordinator – Chennai",
    tag: "Zerodha Varsity // Oct '25 - Feb '26",
    description: "Orchestrating City-Wide Financial Competitions",
    detail: "A major leadership and management role spearheading the Zerodha Varsity Chennai Edition. Led a 3-month event planning cycle to deliver a seamless experience for a large-scale competition.",
    logo: varsityLogo,
    secondaryLogo: zerodhaLogo,
    logoHeight: "50px",
    secondaryLogoHeight: "25px",
    overview: [
      "Managed cross-functional teams handling logistics, food, emceeing, and overall participant experience.",
      "Successfully executed a city-wide competition hosting 500+ participants with an INR 3.5L+ prize pool.",
      "Maintained professional stakeholder communication and ensured strict accountability across all execution teams.",
      "Re-invited by the Varsity team for two subsequent external engagements based on strong prior execution."
    ],
    note: "P.S. Not a coding project, but definitely one of the builds I'm most proud of! Engineering isn't just about code; it's about leading people and executing complex systems under pressure.",
    longDescription: "More details on the logistical execution of the Varsity event coming soon."
  },
  {
    name: "LISS-IV Cloud & Shadow Masking",
    tag: "NRSC // ISRO Bhoonidhi Challenge",
    description: "Pixel-level cloud intelligence for India's LISS-IV satellite sensor.",
    detail: "Developed a robust ML pipeline for the ISRO Bhoonidhi Challenge to detect clouds, cloud shadows, and surface features in imagery from Resourcesat-2 and Resourcesat-2A — sensors that lack a SWIR band, making cloud separation non-trivial.",
    logo: isroLogo,
    logoHeight: "55px",
    overview: [
      "Preprocessed 20 LISS-IV scenes: DN → TOA reflectance → sun-angle correction → normalisation using Dask for parallel processing.",
      "Semi-automatically labelled ground-truth masks (Cloud=1, Shadow=2, Background=0) in QGIS using reflectance thresholding and manual polygon annotation.",
      "Trained a U-Net + ResNet-34 encoder for pixel-wise semantic segmentation with class-weighted CrossEntropyLoss (weights 1:5:5).",
      "Achieved 95.6% accuracy and 0.977 F1-score on validation set; full-scene inference outperformed tile-based approach by eliminating edge artefacts.",
      "Deployed as a Streamlit app with GeoTIFF / Shapefile export for seamless integration into GIS workflows."
    ],
    note: "We sincerely thank NRSC and the Bhoonidhi portal for organising this challenge and providing high-quality satellite data. This was our team's first end-to-end remote sensing ML project — and it flew.",
    longDescription: "A full end-to-end ML pipeline built for the ISRO NRSC Bhoonidhi Challenge. The system converts raw LISS-IV satellite imagery to Top-of-Atmosphere reflectance, generates labelled cloud/shadow masks via semi-automatic QGIS workflows, trains a U-Net + ResNet-34 segmentation model, and exposes inference through a Streamlit UI with GeoTIFF and Shapefile export."
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

const NavBubble = ({ direction, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "250px",
        height: "500px",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.2s ease",
        opacity: hovered ? 0.9 : 1,
        zIndex: 2000,
      }}
    >
      <img 
        src={semicircleImg} 
        alt={direction === "left" ? "Previous" : "Next"} 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          filter: hovered ? "drop-shadow(0 0 15px rgba(255, 214, 1, 0.6))" : "none",
          transform: `scale(${hovered ? 1.05 : 1}) ${direction === "right" ? "scaleX(-1)" : ""}`,
          transition: "transform 0.2s ease, filter 0.2s ease"
        }} 
      />
      <span style={{
        position: "absolute",
        marginTop: "-10px",
        left: direction === "left" ? "8px" : "auto",
        right: direction === "right" ? "8px" : "auto",
        color: "#FFF",
        fontFamily: "'Courier New', monospace",
        fontSize: "28px",
        fontWeight: "bold",
        pointerEvents: "none",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.2s ease, transform 0.2s ease",
        transform: hovered 
          ? `translateX(${direction === "left" ? "-4px" : "4px"})` 
          : "translateX(0)"
      }}>
        {direction === "left" ? "<" : ">"}
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
      height: "min(680px, 76vh)",
      display: "flex",
      flexDirection: "column",
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
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left — Text */}
        <div style={{
          flex: 1,
          padding: "clamp(1.4rem, 2vw, 2rem) clamp(1.4rem, 2vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRight: "1px solid rgba(0,0,0,0.06)"
        }}>
          <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(0.6rem, 1vh, 1rem)" }}>
            {project.logo && (
              <img src={project.logo} alt="Primary Logo" style={{ height: project.logoHeight || "48px", objectFit: "contain", maxHeight: "48px" }} />
            )}
            {project.secondaryLogo && (
              <img src={project.secondaryLogo} alt="Secondary Logo" style={{ height: project.secondaryLogoHeight || project.logoHeight || "48px", objectFit: "contain", maxHeight: "48px" }} />
            )}
          </div>
            <p style={{
              fontSize: "clamp(1.2rem, 1.6vw, 1.65rem)",
              fontFamily: "'Times New Roman', serif",
              fontWeight: 400,
              color: "#000",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              marginBottom: "clamp(0.5rem, 0.8vh, 0.75rem)"
            }}>
              {project.description}
            </p>
            <p style={{
              fontSize: "clamp(11px, 0.85vw, 13px)",
              fontFamily: "'Inter', sans-serif",
              color: "#000",
              opacity: 0.5,
              lineHeight: "1.6",
              marginBottom: "clamp(0.6rem, 1vh, 1rem)"
            }}>
              {project.detail}
            </p>
            {project.overview && (
              <div>
                <strong style={{ fontSize: "clamp(9px, 0.7vw, 11px)", fontFamily: "'Inter', sans-serif", display: "block", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.07em", opacity: 1, color: "#000" }}>Project Roles & Overview</strong>
                <ul style={{ fontSize: "clamp(10px, 0.75vw, 12px)", fontFamily: "'Inter', sans-serif", color: "#000", opacity: 0.7, lineHeight: "1.55", paddingLeft: "1.1rem", margin: 0, marginBottom: project.note ? "clamp(0.6rem, 1vh, 1rem)" : "0" }}>
                  {project.overview.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "0.2rem" }}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.note && (
              <div style={{ 
                fontSize: "clamp(9px, 0.65vw, 10.5px)", 
                fontFamily: "'Inter', sans-serif", 
                color: "#000", 
                opacity: 0.5, 
                fontStyle: "italic", 
                lineHeight: "1.5", 
                borderLeft: "2px solid rgba(0,0,0,0.12)", 
                paddingLeft: "0.75rem" 
              }}>
                {project.note}
              </div>
            )}
          </div>
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

const SLIDE_DURATION = 6000; // ms per card

const Photography = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [modalProject, setModalProject] = useState(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);
  const progressRef = useRef(0); // mirror of progress for rAF closure
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % projects.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c === 0 ? projects.length - 1 : c - 1));
  }, []);

  const goTo = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  // rAF loop — updates progress and fires goNext when full
  const startLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startTimeRef.current = performance.now();
    progressRef.current = 0;
    setProgress(0);

    const tick = (now) => {
      if (pausedRef.current) {
        // Freeze start time so elapsed doesn't grow while paused
        startTimeRef.current = now - (progressRef.current * SLIDE_DURATION);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      progressRef.current = p;
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        goNext();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [goNext]);

  // Restart loop whenever the current card changes
  useEffect(() => {
    startLoop();
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, startLoop]);

  // Pause loop while modal is open OR user manually paused OR not in view
  useEffect(() => {
    pausedRef.current = !!modalProject || isPaused || !isInView;
  }, [modalProject, isPaused, isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePause = () => setIsPaused(p => !p);

  return (
    <div 
      id="projects-showcase" 
      ref={containerRef}
      style={{
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
      <div style={{ position: "relative", overflow: "visible", minHeight: "min(680px, 76vh)" }}>
        {/* Left Bubble — flat edge flush against left site border */}
        <div style={{
          position: "absolute",
          left: "calc(-1 * clamp(60px, 12vw, 160px) + 16px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2000
        }}>
          <NavBubble direction="left" onClick={goPrev} />
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
          zIndex: 2000
        }}>
          <NavBubble direction="right" onClick={goNext} />
        </div>
      </div>

      {/* Dot / Pill Indicator + Pause button */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "2rem",
      }}>
        {projects.map((_, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              style={{
                position: "relative",
                width: isActive ? "48px" : "8px",
                height: "8px",
                borderRadius: "100px",
                backgroundColor: isActive ? "transparent" : "rgba(255,255,255,0.25)",
                border: isActive ? "1px solid rgba(255,255,255,0.35)" : "none",
                padding: 0,
                cursor: "pointer",
                overflow: "hidden",
                transition: "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), background-color 0.2s ease",
                flexShrink: 0,
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "100px",
                    backgroundColor: "#FFF",
                    transformOrigin: "left center",
                    transform: `scaleX(${progress})`,
                    transition: "none",
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Spacer */}
        <div style={{ width: "12px" }} />

        {/* Pause / Resume button */}
        <button
          onClick={togglePause}
          title={isPaused ? "Resume" : "Pause"}
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            flexShrink: 0,
            transition: "border-color 0.2s ease, background-color 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {isPaused ? (
            /* Play triangle */
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 4.5L1 8V1Z" fill="white" />
            </svg>
          ) : (
            /* Pause bars */
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="2" height="7" rx="0.5" fill="white" />
              <rect x="5" y="1" width="2" height="7" rx="0.5" fill="white" />
            </svg>
          )}
        </button>
      </div>

      {/* Project Modal */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
};

export default Photography;
