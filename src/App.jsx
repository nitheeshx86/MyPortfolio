import React, { useState, useEffect } from 'react';
import BlobCursor from './components/BlobCursor';
import Loader from './components/Loader';
import ThreeLandingText from './components/ThreeLandingText';
import './index.css';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      // The animation happens over the first 800px
      const p = Math.min(window.scrollY / 800, 1);
      setScrollProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const formatIST = (date) => {
    return date.toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Ultra-DRAMATIC Profound Curve Morphing:
  // Expanding viewBox and height for a massive, profound curve immersion effect
  // Initial (p=0): Path has a massive weighted curve.
  // Final (p=1): Path flattens completely.
  const curveControlY = 500 - (scrollProgress * 400); // from 500 down to 100
  const path = `M 0,0 L 100,0 L 100,100 Q 50,${curveControlY} 0,100 Z`;

  return (
    <div style={{ backgroundColor: '#000', color: '#FFF', position: 'relative' }}>
      <Loader />
      <BlobCursor />

      {/* Sharp Viewport Border */}
      <div style={{
        position: 'fixed',
        inset: 0,
        border: '16px solid #FFF',
        pointerEvents: 'none',
        zIndex: 1000,
      }} />
      
      {/* Scrollable Container */}
      <div style={{ width: "100%", position: "relative", cursor: "none" }}>
        
        {/* Landing Section Container */}
        <div style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 10,
          // Move the entire section up as we scroll
          transform: `translateY(-${scrollProgress * 100}vh)`,
          overflow: "visible"
        }}>
          {/* Yellow Background Wrapper */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgb(255, 214, 1)",
          }} />

          {/* Morphing Curve Bottom divider */}
          {/* Doubled the height (now 80vh) for maximum impact of the profound curve */}
          <svg 
            viewBox="0 0 100 500" 
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: "-70vh", // Deep enough for the profound curve immersion
              left: 0,
              width: "100%",
              height: "80vh", 
              fill: "rgb(255, 214, 1)",
              zIndex: 11,
              pointerEvents: "none"
            }}
          >
            <path d={path} />
          </svg>

          {/* Landing Content Container */}
          <div style={{
            position: "relative",
            height: "100%",
            width: "100%",
            zIndex: 12
          }}>
            
            {/* Interactive 3D Texts */}
            <ThreeLandingText />

            {/* Clock at bottom left */}
            <div style={{
              position: "absolute",
              bottom: "32px",
              left: "32px",
              fontFamily: "'Arial', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#000",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Chennai [Madras] {formatIST(currentTime)} IST
            </div>

            {/* Loop Scroll Hint between elements */}
            <div className="marquee-container" style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "clamp(120px, 30vw, 400px)", // Sits nicely between Chennai and Portfolio
              fontFamily: "'Arial', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.4)", // Subtler color
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              pointerEvents: "none"
            }}>
              <div className="marquee-text" style={{ paddingRight: "40px" }}>
                Scroll for professional section — Scroll for professional section — 
              </div>
              <div className="marquee-text" style={{ position: "absolute", left: "100%" }}>
                {/* This isn't needed if the first is long enough but duplication is better for CSS3 loops */}
              </div>
            </div>

            {/* Portfolio indicator at bottom right */}
            <div style={{
              position: "absolute",
              bottom: "32px",
              right: "32px",
              fontFamily: "'Arial', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              fontStyle: "italic",
              color: "#000",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Portfolio 2026
            </div>
          </div>
        </div>

        {/* N. Logo and Nav (Fixed over everything) */}
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          pointerEvents: "none"
        }}>
          <h1 style={{
            position: "absolute",
            top: "32px",
            left: "32px",
            margin: 0,
            fontWeight: 900,
            color: scrollProgress < 0.9 ? "#000" : "#FFF", 
            fontSize: "42px",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
            pointerEvents: "auto"
          }}>
            N.
          </h1>

          <nav style={{
            position: "absolute",
            top: "44px",
            right: "32px",
            display: "flex",
            gap: "clamp(1rem, 3vw, 3rem)",
            zIndex: 101,
            fontFamily: "'Arial', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: "12px",
            fontWeight: 600,
            pointerEvents: "auto",
          }}>
            <a href="#projects" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>Projects</a>
            <a href="#photography" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>Photography</a>
            <a href="#philosophy" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>Philosophy</a>
          </nav>
        </div>

        {/* Removed spacer so the next section begins immediately */}

        {/* Experience Section (Black) */}
        <div style={{ 
          minHeight: "100vh",
          padding: "clamp(40px, 12vw, 140px)", 
          backgroundColor: "#000", 
          color: "#FFF",
          position: "relative",
          zIndex: 5 
        }}>
          <h2 style={{ fontSize: "5rem", margin: "100px 0 20px" }}>Experience</h2>
          <p style={{ maxWidth: "800px", fontSize: "1.5rem", lineHeight: "1.6" }}>
            The profound curve of the yellow landing curtain has now completely exited above, smoothly and physically immersing you within this black experience.
          </p>
        </div>

      </div>
    </div>
  );
}
