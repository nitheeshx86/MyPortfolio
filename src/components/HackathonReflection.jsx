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
        
        {/* The Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            flex: 1,
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
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
            Hackathons are demanding. The 48-hour sprints test your endurance and require sustained focus to meet strict deadlines.
          </p>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: '#555',
            lineHeight: 1.8,
            marginBottom: '3rem',
            fontWeight: 400,
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            However, these constraints are excellent for rapid execution. They force you to communicate clearly, prioritize ruthlessly, and ship working code alongside capable teammates. You learn how to scope realistically and troubleshoot under pressure.
          </p>

          <p style={{
            fontFamily: "serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
            color: '#999',
            lineHeight: 1.4,
            fontWeight: 400
          }}>
            Taking first place is a great reward, but the lasting value is the ability to <span style={{ color: '#FFD601', fontStyle: 'normal', opacity: 0.7 }}>build and deliver</span> as a team when the clock is ticking.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default HackathonReflection;
