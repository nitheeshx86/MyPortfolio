import React, { useEffect, useState } from 'react';

export function SideQuestsIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while the intro is active
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setDone(true);
    }, 2200); // Matches the animation duration

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div 
      className="animate-intro-fade" 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100, // Top level
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}
    >
      {/* 1. The Black Backdrop (The Iris) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0d1526', // Fallback for oklch(0.1 0.04 260)
          clipPath: 'circle(150% at 50% 50%)',
          animation: 'intro-iris 2s cubic-bezier(0.7, 0, 0.3, 1) reverse both',
        }} 
      />

      {/* 2. The Glowing Orb (Expanding Light) */}
      <div 
        className="animate-intro-glow" 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          borderRadius: '50%',
          width: '30vmin',
          height: '30vmin',
          background: 'radial-gradient(circle, #fff9e6 0%, #fff2cc 25%, rgba(255, 230, 180, 0.6) 50%, transparent 75%)',
          filter: 'blur(2px)',
          mixBlendMode: 'screen',
          boxShadow: '0 0 200px 80px rgba(255, 249, 230, 0.8), 0 0 400px 120px rgba(255, 230, 180, 0.5)',
          transform: 'translate(-50%, -50%)',
        }} 
      />
    </div>
  );
}

export default SideQuestsIntro;
