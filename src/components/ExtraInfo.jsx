import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, bgText }) => (
  <div style={{ position: 'relative', marginBottom: '8rem', overflow: 'hidden' }}>
    <h2 style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
      fontWeight: 900,
      color: '#fff',
      letterSpacing: '-0.04em',
      margin: 0,
      lineHeight: 0.95,
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
      fontSize: '9vw',
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

export const Learning = () => (
  <div style={{ 
    width: '100vw', 
    height: '100vh', 
    flexShrink: 0, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    padding: '0 clamp(20px, 8vw, 150px)',
    backgroundColor: '#000',
    position: 'relative'
  }}>
    <SectionTitle title="Learning" bgText="Academy" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', maxWidth: '1200px' }}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', gap: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px', flexWrap: 'wrap' }}
      >
        <div style={{ minWidth: '150px', fontSize: '14px', color: '#FFD601', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>2021 — PRESENT</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: '#fff', margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Vellore Institute of Technology</h3>
          <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '1rem', color: '#888', fontStyle: 'italic', margin: 0, maxWidth: '600px' }}>
            Pursuing a Bachelor of Technology in Electronics and Communication Engineering. Exploring the intersection of hardware architecture and high-performance computing.
          </p>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: '40px', paddingBottom: '40px', flexWrap: 'wrap' }}
      >
        <div style={{ minWidth: '150px', fontSize: '14px', color: '#555', fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>SECONDARY</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', color: '#fff', margin: '0 0 15px 0', fontWeight: 900, textTransform: 'uppercase' }}>SBOA School and Junior College</h3>
          <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '1rem', color: '#666', fontStyle: 'italic', margin: 0 }}>Laying the foundations of logic and curiosity.</p>
        </div>
      </motion.div>
    </div>
  </div>
);


export const Vouch = () => {
  const references = [
    {
      name: "Dr. Reena Monica P.",
      email: "reenamonica@vit.ac.in",
      phone: "+91 98408 37624",
      designation: "Former Dean & Asst. Director, International Affairs, VIT",
      quote: "Collaborated on international research initiatives and academic development programs."
    },
    {
      name: "Dr. Sheena Christabel Praveen",
      email: "sheenachristabel.p@vit.ac.in",
      phone: "+91 98405 06176",
      designation: "Asst. Director, IIC, VIT & CEO, MEDxAI",
      quote: "Key contributor to innovation-driven projects and healthcare technology development at MEDxAI."
    }
  ];

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      flexShrink: 0, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: '0 clamp(20px, 8vw, 150px)',
      backgroundColor: '#000',
      position: 'relative'
    }}>
      <SectionTitle title="Vouch" bgText="Trust" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', maxWidth: '1200px' }}>
        {references.map((ref, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ padding: '40px', border: '1px solid #111', backgroundColor: 'rgba(255,255,255,0.01)', position: 'relative' }}
          >
            <div style={{ position: 'absolute', top: '20px', right: '30px', fontFamily: "'Times New Roman', serif", fontSize: '4rem', color: 'rgba(255, 214, 1, 0.1)', fontStyle: 'italic', lineHeight: 0.8 }}>“</div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', color: '#fff', margin: '0 0 8px 0', fontWeight: 900, letterSpacing: '-0.02em' }}>{ref.name}</h4>
            <div style={{ color: '#FFD601', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px' }}>{ref.designation}</div>
            <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '0.95rem', color: '#999', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '40px' }}>
              "{ref.quote}"
            </p>
            <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', gap: '30px' }}>
              <div>
                <div style={{ fontSize: '9px', color: '#444', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '13px', color: '#fff', fontFamily: "'Inter', sans-serif" }}>{ref.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#444', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</div>
                <div style={{ fontSize: '13px', color: '#fff', fontFamily: "'Inter', sans-serif" }}>{ref.phone}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ExtraInfo = () => null;
export default ExtraInfo;
