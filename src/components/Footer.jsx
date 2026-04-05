import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      minHeight: '500px',
      backgroundColor: '#FBFF00', // Bright Yellow
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16' viewBox='0 0 20 16'%3E%3Cg fill='%23000000' fill-opacity='0.08'%3E%3Cpath fill-rule='evenodd' d='M0 .04C2.6.22 4.99 1.1 7 2.5A13.94 13.94 0 0 1 15 0h4c.34 0 .67.01 1 .04v2A12 12 0 0 0 7.17 12h5.12A7 7 0 0 1 20 7.07V14a5 5 0 0 0-3-4.58A5 5 0 0 0 14 14H0V7.07c.86.12 1.67.4 2.4.81.75-1.52 1.76-2.9 2.98-4.05C3.79 2.83 1.96 2.2 0 2.04v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '100px clamp(20px, 8vw, 150px) 60px',
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
            {['Home', 'Projects', 'Hackathons', 'Awards'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)' }}>Social</span>
            {['LinkedIn', 'GitHub', 'Twitter', 'Bento'].map(link => (
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
    </footer>
  );
};

export default Footer;
