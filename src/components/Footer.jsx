import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer style={{
      width: '100%',
      height: '400px', // Fixed height for reveal effect
      backgroundColor: '#FFD601',
      color: '#000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '60px 40px 40px 40px',
      boxSizing: 'border-box',
      position: 'sticky',
      bottom: 0,
      zIndex: -1
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <img src={logo} alt="Logo" style={{ height: '50px', marginBottom: '20px' }} />
          <p style={{
            fontFamily: "'Inter', sans-serif",
            maxWidth: '300px',
            fontSize: '14px',
            lineHeight: 1.6,
            fontWeight: 500,
            opacity: 0.8
          }}>
            Building digital experiences through a blend of electronics, design, and code.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4 }}>Navigation</span>
            {['Home', 'Projects', 'Hackathons', 'Awards'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>{link}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4 }}>Socials</span>
            {['LinkedIn', 'GitHub', 'Twitter', 'Bento'].map(link => (
              <a key={link} href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '40px',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: '1.2rem',
          fontStyle: 'italic',
          fontWeight: 600
        }}>
          Nitheesh K. 
        </div>
        <div style={{ 
          fontFamily: "'Inter', sans-serif", 
          fontSize: '10px', 
          fontWeight: 900, 
          letterSpacing: '0.1em', 
          opacity: 0.6 
        }}>
          © 2026 NITHEESH PORTFOLIO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
