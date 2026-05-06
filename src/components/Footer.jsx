import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      minHeight: '800px',
      background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '160px clamp(20px, 8vw, 150px) 100px',
      boxSizing: 'border-box',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 0,
      borderTop: '5px solid #000'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
        <div>
          <h2 style={{ 
            fontFamily: "'Space Grotesk', sans-serif", 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1, 
            margin: 0,
            letterSpacing: '-0.05em',
            color: '#000'
          }}>
            LET'S BUILD <br /> SOMETHING <br /> MAGICAL.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            maxWidth: '450px',
            fontSize: '18px',
            lineHeight: 1.6,
            fontWeight: 500,
            marginTop: '30px',
            color: 'rgba(0,0,0,0.7)'
          }}>
            Building digital experiences through a sophisticated blend of electronics, design, and code.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'clamp(40px, 8vw, 120px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)' }}>Explore</span>
            {['Home', 'Projects', 'Hackathons', 'Recognitions'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)' }}>Social</span>
            {['LinkedIn', 'GitHub'].map(link => (
              <a key={link} href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '60px',
        borderTop: '2px solid rgba(0,0,0,0.1)',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: '2rem',
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#000'
        }}>
          Nitheesh K. 
        </div>
        <div style={{ 
          fontFamily: "'Inter', sans-serif", 
          fontSize: '11px', 
          fontWeight: 900, 
          letterSpacing: '0.2em', 
          color: 'rgba(0,0,0,0.6)'
        }}>
          © 2026 NITHEESH PORTFOLIO. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* Background Quote */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Cedarville Cursive', cursive",
        fontSize: 'clamp(2rem, 8vw, 6rem)',
        color: 'rgba(0,0,0,0.04)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        zIndex: -1
      }}>
        When nothing seems right, go left.
      </div>
    </footer>
  );
};

export default Footer;
