import React, { useState, useEffect, useRef } from 'react';
import BlobCursor from './components/BlobCursor';
import Loader from './components/Loader';
import ThreeLandingText from './components/ThreeLandingText';
import Lightning from './components/Lightning';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DeepDive from './components/DeepDive';
import Photography from './components/Photography';
import Contact from './components/Contact';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './index.css';
import pokemonMusic from './assets/pokemon.mp3';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const audioRef = useRef(null);
  const deepDiveRef = useRef(null);

  // Smooth Progress Logic via Framer Motion
  const { scrollY } = useScroll();
  const [deepDiveEnd, setDeepDiveEnd] = useState(0);

  useEffect(() => {
    const updateEnd = () => {
      if (deepDiveRef.current) {
        setDeepDiveEnd(deepDiveRef.current.offsetTop + deepDiveRef.current.offsetHeight);
      }
    };
    updateEnd();
    window.addEventListener('resize', updateEnd);
    return () => window.removeEventListener('resize', updateEnd);
  }, []);

  const rawInternshipProgress = useTransform(
    scrollY,
    [2300, deepDiveEnd || 10000], 
    [0, 1]
  );
  
  const smoothInternshipProgress = useSpring(rawInternshipProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const barOpacity = useTransform(scrollY, [2100, 2300, deepDiveEnd || 10000, (deepDiveEnd || 10000) + 200], [0, 1, 1, 0]);

  const startPortfolio = () => {
    setIsMuted(false);
    setHasStarted(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(err => console.log('Autoplay prevented:', err));
      }
    }
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Landing Progress (0 - 800px)
      const p = Math.min(window.scrollY / 800, 1);
      setScrollProgress(p);

      // 2. Horizontal Progress (800px - 5000px)
      const hp = Math.max(0, Math.min((window.scrollY - 800) / 3000, 1));
      setHorizontalProgress(hp);
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
      {hasStarted && <Loader />}
      <BlobCursor />
      <audio 
        ref={audioRef} 
        src={pokemonMusic} 
        loop 
        muted={isMuted} 
        style={{ display: 'none' }}
      />

      {/* Sharp Viewport Border */}
      <div style={{
        position: 'fixed',
        inset: 0,
        border: '16px solid #FFF',
        pointerEvents: 'none',
        zIndex: 1000,
      }} />

      {/* N. Logo and Nav (Fixed over everything) */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        pointerEvents: "none"
      }}>
        <h1 
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          style={{
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
            pointerEvents: "auto",
            cursor: "pointer",
            display: "flex",
            alignItems: "baseline",
          }}
        >
          N
          <div style={{ 
            display: "flex", 
            overflow: "hidden", 
            maxWidth: isLogoHovered ? "400px" : "0", 
            transition: "max-width 1.2s cubic-bezier(0.16, 1, 0.3, 1)", 
          }}>
            {"ITHEESH K".split("").map((letter, i) => (
              <span 
                key={i} 
                style={{ 
                  opacity: isLogoHovered ? 1 : 0,
                  transform: isLogoHovered ? "translateX(0)" : "translateX(-15px)",
                  transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${i * 0.05}s`,
                  display: "inline-block",
                  whiteSpace: "pre", 
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <span>.</span>
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
          <a href="#github" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>Github//</a>
          <a href="#linkedin" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>Linkedin//</a>
          <a href="#projects" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>[Research]</a>
          <a href="#details" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>[Details]</a>
          <a href="#photography" style={{ color: scrollProgress < 0.9 ? "#000" : "#FFF", textDecoration: "none" }}>[Photography]</a>
        </nav>
      </div>

      {/* Internship Vertical Progress Bar */}
      <motion.div style={{
          position: "fixed",
          left: "64px",
          top: "120px",
          bottom: "120px",
          width: "2px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          zIndex: 50,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: barOpacity
      }}>
        {/* Label */}
        <div style={{
          position: "absolute",
          top: "-20px",
          left: "10px",
          whiteSpace: "nowrap",
          fontFamily: "'Arial', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.5,
          transform: "rotate(90deg)",
          transformOrigin: "left bottom",
        }}>
          Internship // MEDxAI
        </div>

        {/* Active Fill */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgb(255, 214, 1)",
            height: useTransform(smoothInternshipProgress, v => `${v * 100}%`),
          }}
        />
      </motion.div>

      {/* Main Container */}
      <div style={{ width: "100%", position: "relative", cursor: "none", backgroundColor: "#000" }}>
        
        {/* STICKY ORCHESTRATION SEGMENT (Landing -> Horizontal Transition) */}
        <div style={{ height: "5000px", position: "relative", zIndex: 10 }}>
          
          {/* STICKY VIEWPORT WRAPPER */}
          <div style={{ position: "sticky", top: 0, left: 0, width: "100%", height: "100vh", overflow: "hidden" }}>
            
            {/* LANDING SECTION (STICKY Child) */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              zIndex: 11,
              transform: `translateY(-${scrollProgress * 120}vh)`,
              overflow: "visible"
            }}>
              {/* Yellow Background Wrapper */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgb(255, 214, 1)",
              }} />

              {/* Morphing Curve Bottom divider */}
              <svg
                viewBox="0 0 100 500"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  bottom: "-70vh",
                  left: 0,
                  width: "100%",
                  height: "80vh",
                  fill: "rgb(255, 214, 1)",
                  zIndex: 12,
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
                zIndex: 13
              }}>
                <ThreeLandingText 
                  isMuted={isMuted} 
                  setIsMuted={setIsMuted} 
                  hasStarted={hasStarted}
                  startPortfolio={startPortfolio} 
                />
                <Lightning isAudioOn={!isMuted && hasStarted} />

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
                  width: "clamp(120px, 30vw, 400px)",
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "rgba(0, 0, 0, 0.4)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  pointerEvents: "none"
                }}>
                  <div className="marquee-text" style={{ paddingRight: "40px" }}>
                    Scroll for professional section — Scroll for professional section —
                  </div>
                </div>

                {/* Portfolio indicator at bottom right - Pikachu is the trigger */}
                <div style={{
                  position: "absolute",
                  bottom: "32px",
                  right: "32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "8px",
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#000",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  pointerEvents: "none"
                }}>
                  <img
                    src="https://play.pokemonshowdown.com/sprites/gen5ani/pikachu-starter.gif"
                    alt="Pikachu"
                    onClick={() => {
                      if (!hasStarted) {
                        startPortfolio();
                      } else {
                        setIsMuted(!isMuted);
                      }
                    }}
                    style={{ 
                      height: "80px", 
                      objectFit: "contain", 
                      imageRendering: "pixelated",
                      cursor: "pointer",
                      pointerEvents: "auto"
                    }}
                  />
                  <div style={{ textAlign: "right" }}>
                    Portfolio 2026
                  </div>
                </div>
              </div>
            </div>

            {/* HORIZONTAL SECTION (Under Landing) */}
            <div style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              overflow: "hidden", 
              backgroundColor: "#000",
              color: "#FFF",
            }}>
              {/* Horizontal Slider Content */}
              <div style={{
                display: "flex",
                height: "100%",
                width: "200vw",
                transform: `translateX(-${horizontalProgress * 100}vw)`, 
                transition: "transform 0.05s ease-out", 
                padding: "clamp(40px, 12vw, 140px)",
                boxSizing: "border-box",
              }}>
                <Experience />
                <Projects />
              </div>
            </div>

          </div>
        </div>

        <div ref={deepDiveRef}>
          <DeepDive />
        </div>
        <Photography />
        <Contact />

      </div>
    </div>
  );
}
