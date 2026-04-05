import React from 'react';
import { motion } from 'framer-motion';

const HackathonReflection = () => {
  return (
    <section style={{
      width: '100%',
      minHeight: '80vh',
      backgroundColor: '#000',
      padding: '100px clamp(20px, 5vw, 100px)',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        flexWrap: 'wrap' // Stack on small screens
      }}>
        
        {/* Left Side (40%) - The Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            flex: '0 0 40%',
            minWidth: '320px',
            textAlign: 'left'
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            color: '#333',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: '2rem'
          }}>
            A Personal Note
          </p>

          <p style={{
            fontFamily: "serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
            color: '#777',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            fontWeight: 300
          }}>
            They are tiring. They are exhausting. I have fell medically ill after hackathons, 
            the 48-hour sprints taking a physical toll I never expected.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: '#555',
            lineHeight: 1.8,
            marginBottom: '3rem',
            fontWeight: 400,
            maxWidth: '400px'
          }}>
            But beyond the caffeine and the pressure, they are where teams are forged. 
            Demonstrating resilience under fire and building something that matters 
            with your tribe—it’s a feeling unlike any other.
          </p>

          <p style={{
            fontFamily: "serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
            color: '#999',
            lineHeight: 1.4,
            fontWeight: 400
          }}>
            Winning with your <span style={{ color: '#FFD601', fontStyle: 'normal', opacity: 0.7 }}>tribe</span> <br />
            is the greatest feeling ever.
          </p>
        </motion.div>

        {/* Right Side (60%) - Logo Placeholder Area */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            flex: '1',
            minWidth: '400px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '24px',
            alignContent: 'center',
            padding: '20px',
            borderLeft: '1px solid #111'
          }}
        >
          {/* Logo Placeholders - Grey circles or rectangles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              style={{
                aspectRatio: '1/1',
                width: '120px',
                margin: '0 auto',
                backgroundColor: '#0a0a0a',
                border: '1px dashed #222',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '9px', 
                color: '#222', 
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Hackathon <br /> Logo {i + 1}
              </span>
              {/* Subtle hover effect for the placeholder */}
              <motion.div 
                whileHover={{ opacity: 0.1 }}
                initial={{ opacity: 0 }}
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: '#FFD601',
                  pointerEvents: 'none'
                }} 
              />
            </div>
          ))}
          
          <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '8px',
              color: '#222',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              // PLACE LOGOS OF YOUR HACKATHON VICTORIES HERE
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HackathonReflection;
