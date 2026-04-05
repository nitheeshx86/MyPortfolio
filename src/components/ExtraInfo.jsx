import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, bgText }) => (
  <div style={{ position: 'relative', marginBottom: '8rem', overflow: 'hidden' }}>
    <h2 style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: 'clamp(3rem, 10vw, 8rem)',
      fontWeight: 900,
      color: '#fff',
      letterSpacing: '-0.06em',
      margin: 0,
      lineHeight: 0.9,
      textTransform: 'uppercase',
      position: 'relative',
      zIndex: 2
    }}>
      {title}
    </h2>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '0',
      transform: 'translateY(-50%)',
      fontFamily: "'Times New Roman', Times, serif",
      fontSize: '15vw',
      color: 'rgba(255, 214, 1, 0.03)',
      fontStyle: 'italic',
      zIndex: 1,
      whiteSpace: 'nowrap',
      pointerEvents: 'none'
    }}>
      {bgText || title}
    </div>
  </div>
);

const ExtraInfo = () => {
  return (
    <section style={{
      width: '100%',
      backgroundColor: '#000',
      padding: 'clamp(80px, 15vw, 200px) clamp(20px, 8vw, 150px)',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Education Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 200px auto' }}>
        <SectionTitle title="Learning" bgText="Academy" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ 
              display: 'flex', 
              gap: '40px', 
              borderBottom: '1px solid rgba(255,255,255,0.1)', 
              paddingBottom: '40px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ minWidth: '150px', fontSize: '14px', color: '#FFD601', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
              2021 — PRESENT
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', color: '#fff', margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                Vellore Institute of Technology
              </h3>
              <p style={{ 
                fontFamily: "'Times New Roman', Times, serif", 
                fontSize: '1.4rem', 
                color: '#888', 
                fontStyle: 'italic', 
                margin: 0,
                maxWidth: '600px'
              }}>
                Pursuing a Bachelor of Technology in Electronics and Communication Engineering. Exploring the intersection of hardware architecture and high-performance computing.
              </p>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             style={{ 
               display: 'flex', 
               gap: '40px', 
               paddingBottom: '40px',
               flexWrap: 'wrap'
             }}
          >
            <div style={{ minWidth: '150px', fontSize: '14px', color: '#555', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
              SECONDARY
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: '#fff', margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase' }}>
                SBOA School and Junior College
              </h3>
              <p style={{ 
                fontFamily: "'Times New Roman', Times, serif", 
                fontSize: '1.2rem', 
                color: '#666', 
                fontStyle: 'italic', 
                margin: 0 
              }}>
                Laying the foundations of logic and curiosity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Languages Known - Design Overhaul */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 200px auto' }}>
        <SectionTitle title="Dialect" bgText="Tongues" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '100px' }}>
          
          <div>
            <span style={{ color: '#FFD601', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', display: 'block', marginBottom: '30px' }}>
              Native / Fluent
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['English', 'Tamil', 'Hindi', 'French'].map((lang, i) => (
                <div key={lang} style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                  <span style={{ fontSize: '11px', color: '#333' }}>0{i+1}</span>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ 
                      fontFamily: "'Times New Roman', serif", 
                      fontSize: '3rem', 
                      color: '#fff', 
                      fontStyle: 'italic',
                      lineHeight: 1
                    }}
                  >
                    {lang}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span style={{ color: '#444', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', display: 'block', marginBottom: '30px' }}>
              Exploring in Leisure
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              {['Malayalam', 'Kannada', 'German'].map((lang, i) => (
                <motion.div 
                  key={lang}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ 
                    padding: '12px 24px', 
                    border: '1px solid #222', 
                    borderRadius: '50px',
                    color: '#888',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  {lang}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* References - Professional Typography */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionTitle title="Vouch" bgText="Trust" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          {[1, 2].map((ref, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                padding: '40px',
                border: '1px solid #111',
                backgroundColor: 'rgba(255,255,255,0.01)',
                position: 'relative'
              }}
            >
              <div style={{ 
                position: 'absolute', top: '20px', right: '30px', 
                fontFamily: "'Times New Roman', serif", fontSize: '4rem', 
                color: 'rgba(255, 214, 1, 0.1)', fontStyle: 'italic',
                lineHeight: 0.8
              }}>
                “
              </div>
              
              <h4 style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '1.8rem', 
                color: '#fff', 
                margin: '0 0 8px 0', 
                fontWeight: 900,
                letterSpacing: '-0.02em'
              }}>
                Reference Name
              </h4>
              <div style={{ color: '#FFD601', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>
                Designation // Company
              </div>

              <p style={{ 
                fontFamily: "'Times New Roman', Times, serif", 
                fontSize: '1.25rem', 
                color: '#999', 
                fontStyle: 'italic', 
                lineHeight: 1.6,
                marginBottom: '40px'
              }}>
                "This serves as a placeholder for a testimonial or a brief description of how we collaborated on high-impact initiatives."
              </p>

              <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', gap: '30px' }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#444', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                  <div style={{ fontSize: '13px', color: '#fff', fontFamily: "'Inter', sans-serif" }}>reference@email.com</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#444', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</div>
                  <div style={{ fontSize: '13px', color: '#fff', fontFamily: "'Inter', sans-serif" }}>+91 00000 00000</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ExtraInfo;
