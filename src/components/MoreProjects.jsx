import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectIndex = [
  { id: '01', name: 'Drug Explorer', year: '2023', tech: 'React, GROMACS', description: 'Internal drug discovery tool for MEDxAI.' },
  { id: '02', name: 'Synergy Map', year: '2024', tech: 'Python, D3.js', description: 'Visualizing drug-to-drug interactions at scale.' },
  { id: '03', name: 'Pikachu AI', year: '2022', tech: 'PyTorch, OpenCV', description: 'Real-time emotion detection and interactive companion.' },
  { id: '04', name: 'HPC Scheduler', year: '2023', tech: 'C, Linux', description: 'Custom priority-based job queue for Linux clusters.' },
  { id: '05', name: 'Binding Suite', year: '2023', tech: 'ChimeraX, Python', description: 'Automating molecular docking for high-throughput screening.' },
  { id: '06', name: 'Portfolio 2026', year: '2026', tech: 'Three.js, Framer Motion', description: 'The site you are currently navigating.' }
];

const MoreProjects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section style={{
        padding: "clamp(60px, 15vw, 120px) var(--site-margin)",
        backgroundColor: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px" }}>
          <span style={{ 
            fontSize: "11px", 
            letterSpacing: "0.4em", 
            opacity: 0.4, 
            textTransform: "uppercase",
            marginBottom: "2.5rem",
            display: "block"
          }}>
            INDUSTRIAL INTEGRITY
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            marginBottom: "3rem",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            color: "#FFF"
          }}>
            Every build is <span style={{ fontStyle: 'italic', fontWeight: 400, fontFamily: "'Times New Roman', serif", textTransform: 'lowercase' }}>for reality.</span>
          </h2>
          <p style={{
            fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
            lineHeight: 1.6,
            opacity: 0.6,
            marginBottom: "4.5rem",
            fontFamily: "'Times New Roman', serif",
            color: "#FFF"
          }}>
            My work is not academic exercise. Every project showcased here has been built under industrial guidance, addressing real-world needs from multinational pharmaceutical clients to high-performance computing constraints. Performance, reliability, and utility are the only metrics that matter.
          </p>

          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              padding: "1.2rem 3rem",
              backgroundColor: "transparent",
              border: "1px solid #FFF",
              color: "#FFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              cursor: "pointer",
              borderRadius: "2px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#FFF";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#FFF";
            }}
          >
            Explore Full Inventory [ → ]
          </button>
        </div>
      </section>

      {/* FULL INVENTORY MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200000, // Above the landing but below construction warning if needed
              backgroundColor: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: "#FFF",
                color: "#000",
                width: "100%",
                maxWidth: "1100px",
                maxHeight: "85vh",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 50px 100px -20px rgba(0,0,0,0.5)"
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: "2rem 3rem",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                zIndex: 2
              }}>
                <div>
                  <h3 style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontWeight: 900, 
                    fontSize: "1.2rem", 
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    margin: 0
                  }}>
                    Project Inventory // 2022—2026
                  </h3>
                  <p style={{ fontSize: "10px", opacity: 0.4, margin: "0.2rem 0 0", textTransform: "uppercase" }}>
                    Chronological audit of technical builds
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid #000",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.color = "#FFF"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#000"; }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Scroll Content */}
              <div style={{ 
                flex: 1, 
                overflowY: "auto", 
                padding: "2rem 3rem 4rem",
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}>
                <table style={{ 
                  width: "100%", 
                  borderCollapse: "collapse",
                  fontFamily: "'Inter', sans-serif"
                }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #000", textAlign: "left" }}>
                      <th style={{ padding: "1.5rem 0", fontSize: "11px", textTransform: "uppercase", opacity: 0.4 }}>ID</th>
                      <th style={{ padding: "1.5rem 0", fontSize: "11px", textTransform: "uppercase", opacity: 0.4 }}>PROJECT NAME</th>
                      <th style={{ padding: "1.5rem 0", fontSize: "11px", textTransform: "uppercase", opacity: 0.4 }}>TECH STACK</th>
                      <th style={{ padding: "1.5rem 0", fontSize: "11px", textTransform: "uppercase", opacity: 0.4 }}>PURPOSE</th>
                      <th style={{ padding: "1.5rem 0", fontSize: "11px", textTransform: "uppercase", opacity: 0.4, textAlign: "right" }}>YEAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectIndex.map((proj) => (
                      <tr key={proj.id} style={{ 
                        borderBottom: "1px solid rgba(0,0,0,0.05)", 
                        transition: "background 0.2s ease",
                        cursor: "default"
                      }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <td style={{ padding: "1.8rem 0", fontSize: "12px", opacity: 0.3 }}>{proj.id}</td>
                        <td style={{ padding: "1.8rem 0", fontSize: "14px", fontWeight: 700 }}>{proj.name}</td>
                        <td style={{ padding: "1.8rem 0", fontSize: "12px" }}>
                          <span style={{ backgroundColor: "#000", color: "#FFF", padding: "2px 6px", borderRadius: "2px", fontSize: "10px" }}>
                            {proj.tech}
                          </span>
                        </td>
                        <td style={{ padding: "1.8rem 0", fontSize: "14px", fontFamily: "'Times New Roman', serif" }}>{proj.description}</td>
                        <td style={{ padding: "1.8rem 0", fontSize: "12px", textAlign: "right", opacity: 0.5 }}>{proj.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MoreProjects;
