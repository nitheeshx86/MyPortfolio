import React from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
   SIDE QUESTS GALLERY (High-Characteristic Colonial Theme)
   Pure white background, striking ink linework, ornate pillars, and 
   sweeping calligraphy.
   ═══════════════════════════════════════════════════════════════════════════ */

const THEME = {
  paper: '#FFFFFF', // Pure White
  ink: '#0A0A0A',   // Very dark ink for sharp contrast
  gold: '#B89A53',  // Rich antique gold
  fonts: {
    serif: "'Cormorant Garamond', 'Playfair Display', serif",
    script: "'Great Vibes', 'Pinyon Script', cursive",
    sans: "'Inter', sans-serif",
  }
};


/* ─── Main Component ─── */
const SideQuestsGallery = ({ 
  section2Y, 
  section2Scale, 
  glowX, 
  glowOpacity, 
  glowScale, 
  containerRef 
}) => {
  return (
    <motion.section
      style={{
        position: 'relative',
        zIndex: 7,
        backgroundColor: THEME.paper,
        minHeight: '100vh',
        y: section2Y,
        scale: section2Scale,
        boxShadow: '0 -15px 50px rgba(0,0,0,0.08)',
        marginTop: '-2px',
        color: THEME.ink,
      }}
    >
      {/* ─── Restored Atmospheric Mist Transition (Pure White Base) ─── */}
      <MistyJunction glowX={glowX} glowOpacity={glowOpacity} glowScale={glowScale} />


      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 10, padding: '150px 5vw 100px', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '40vh',
          textAlign: 'center' 
        }}>
          <h1 style={{ 
            fontFamily: THEME.fonts.serif, 
            fontSize: '3rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            opacity: 0.15,
            margin: 0
          }}>
            The Gallery
          </h1>
          <p style={{ 
            fontFamily: THEME.fonts.sans, 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.4em',
            opacity: 0.1,
            marginTop: '1rem'
          }}>
            [ Under Construction ]
          </p>
        </div>

      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MISTY JUNCTION — Adapted for Pure White Base
   ═══════════════════════════════════════════════════════════════════════════ */
const MistyJunction = ({ glowX, glowOpacity, glowScale }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '-65vh',
      left: 0,
      right: 0,
      height: '65vh',
      pointerEvents: 'none',
      zIndex: 8,
      overflow: 'visible',
      transform: 'skewY(-3.5deg)',
      transformOrigin: 'right bottom',
    }}>
      {/* Layer 1: Gradient fade into pure white */}
      <div style={{
        position: 'absolute',
        inset: '-20% -10%',
        background: `linear-gradient(to bottom, transparent 0%, rgba(255,255,255, 0.6) 30%, rgba(255,255,255, 0.95) 65%, ${THEME.paper} 100%)`,
      }} />

      {/* Layer 2: Dynamic Core Glow (Soft gold/white mist) */}
      <motion.div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '35%',
        width: '180%',
        height: '140%',
        background: `radial-gradient(ellipse at bottom, rgba(255,255,255, 0.9) 0%, transparent 70%)`,
        filter: 'blur(80px)',
        x: glowX,
        opacity: glowOpacity,
        scale: glowScale,
        translateX: '-50%',
        transform: 'skewY(3.5deg)',
      }} />
    </div>
  );
};



export default SideQuestsGallery;