import React from 'react';
import { motion } from 'framer-motion';

const AwardCard = ({ title, organization, year, description }) => (
  <div style={{
    width: '450px',
    flexShrink: 0,
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#FFD601', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        {year}
      </span>
    </div>
    <h3 style={{ fontFamily: "serif", fontSize: '2rem', color: '#fff', margin: 0, lineHeight: 1.1 }}>
      {title}
    </h3>
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
      {organization}
    </p>
    {description && (
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', margin: '10px 0 0' }}>
        {description}
      </p>
    )}
  </div>
);

const Awards = ({ horizontalProgress = 0 }) => {
  // Increased scroll range for wider cards
  const xOffset =
    horizontalProgress < 0.1 ? 0
    : horizontalProgress > 0.9 ? -2800
    : ((horizontalProgress - 0.1) / 0.8) * -2800;

  const awards = [
    { 
      title: "United Nations Millennium Fellow", 
      organization: "Millennium Campus Network", 
      year: "2025",
      description: "Selected among the top 4% from over 60,000 applicants for global academic and social impact made through technology on basis of project history."
    },
    { 
      title: "Best Startup Idea Award", 
      organization: "Presented by Dr. Soumya Swaminathan, WHO", 
      year: "2025",
      description: "1st Place – Awarded for innovative healthcare technology solutions by the former Chief Scientist of the World Health Organization."
    },
    { 
      title: "Nokia Campus Connect Program", 
      organization: "Nokia & VIT Chennai", 
      year: "2024",
      description: "Selected as 1 of 5 students from VIT Chennai for rigorous hands-on training in communication systems, machine learning, and computer science."
    },
    { 
      title: "Vice President’s Feather-in-the-Cap Award", 
      organization: "VIT University", 
      year: "2024",
      description: "Awarded for developing an ML-based Seat Locator System successfully deployed in the VIT Library."
    },
    { 
      title: "Top 3 Non-Startup Projects", 
      organization: "IIT Madras, iInventiv", 
      year: "2024",
      description: "Recognized at VIT Chennai 2024 for developing an AI-driven Pothole Detection System."
    },
  ];

  return (
    <section style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center',
      position: 'relative',
      backgroundColor: '#000',
      overflow: 'hidden',
    }}>

      {/* Foreground */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center',
        paddingLeft: '15vw',
      }}>
        <div style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>

          {/* Section label */}
          <div style={{ marginRight: '100px' }}>
            <h2 id="recognitions" style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontSize: '12vw',
              color: '#fff',
              opacity: 0.05,
              position: 'absolute',
              top: '10%', left: '5vw',
              lineHeight: 1, margin: 0,
              pointerEvents: 'none',
            }}>
              RECOGNITIONS
            </h2>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px', color: '#FFD601',
              letterSpacing: '0.5em', textTransform: 'uppercase',
              transform: 'rotate(-90deg)',
              transformOrigin: 'left bottom',
              marginBottom: '100px',
            }}>
              Visions &amp; Victories
            </div>
          </div>

          {/* Scrolling award cards */}
          <motion.div style={{ display: 'flex', gap: '60px', paddingRight: '20vw', x: xOffset }}>
            {awards.map((award, i) => <AwardCard key={i} {...award} />)}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Awards;
