import React, { useState, useEffect, useRef } from 'react';
import BlobCursor from './components/BlobCursor';
import Loader from './components/Loader';
import ThreeLandingText from './components/ThreeLandingText';
import Lightning from './components/Lightning';
import Experience from './components/Experience';
import Projects from './components/Projects';
import PersonalProjects from './components/PersonalProjects';
import DeepDive from './components/DeepDive';
import Photography from './components/Photography';
import MoreProjects from './components/MoreProjects';
import Hackathons from './components/Hackathons';
import HackathonReflection from './components/HackathonReflection';
import Awards from './components/Awards';
import { Learning, Dialect, Vouch } from './components/ExtraInfo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import './index.css';
import pokemonMusic from './assets/pokemon.mp3';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const [deepDiveHorizProgress, setDeepDiveHorizProgress] = useState(0);
  const [hackathonsHorizProgress, setHackathonsHorizProgress] = useState(0);
  const hackathonsAnchorRef = useRef(null);
  const [awardsHorizProgress, setAwardsHorizProgress] = useState(0);
  const awardsAnchorRef = useRef(null);
  const [extraHorizProgress, setExtraHorizProgress] = useState(0);
  const extraInfoAnchorRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const audioRef = useRef(null);
  const deepDiveRef = useRef(null);
  const deepDiveEndRef = useRef(0);

  // Dynamically track the bottom of the DeepDive section
  const updateDeepDiveEnd = () => {
    if (deepDiveRef.current) {
      const rect = deepDiveRef.current.getBoundingClientRect();
      deepDiveEndRef.current = rect.bottom + window.scrollY;
    }
  };

  // Smooth Progress Logic via Framer Motion
  const { scrollY } = useScroll();

  // Reactive internship progress: 0 at Research Intern panel entry → 1 at DeepDive end
  const [deepDiveEndPx, setDeepDiveEndPx] = useState(10000);

  // Update deepDiveEndPx on scroll so useTransform always has fresh bounds
  useEffect(() => {
    const unsub = scrollY.on("change", () => {
      if (deepDiveRef.current) {
        const bottom = deepDiveRef.current.offsetTop + deepDiveRef.current.offsetHeight;
        if (Math.abs(bottom - deepDiveEndPx) > 10) setDeepDiveEndPx(bottom);
      }
    });
    // Also run once on mount & resize
    updateDeepDiveEnd();
    if (deepDiveRef.current) {
      setDeepDiveEndPx(deepDiveRef.current.offsetTop + deepDiveRef.current.offsetHeight);
    }
    window.addEventListener('resize', () => {
      if (deepDiveRef.current) {
        setDeepDiveEndPx(deepDiveRef.current.offsetTop + deepDiveRef.current.offsetHeight);
      }
    });
    return () => unsub();
  }, []);

  const MEDxAI_START = 2300; // scrollY when Research Intern panel is centered

  const rawInternshipProgress = useTransform(
    scrollY,
    [MEDxAI_START, deepDiveEndPx],
    [0, 1],
    { clamp: true }
  );

  const smoothInternshipProgress = useSpring(rawInternshipProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const barOpacity = useTransform(
    scrollY,
    [MEDxAI_START - 200, MEDxAI_START, deepDiveEndPx, deepDiveEndPx + 300],
    [0, 1, 1, 0],
    { clamp: true }
  );

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

      // 2. Horizontal Progress (800px - 3800px)
      const hp = Math.max(0, Math.min((window.scrollY - 800) / 3000, 1));
      setHorizontalProgress(hp);

      // 3. Projects Horizontal — kicks in after DeepDive ends
      const dEnd = deepDiveRef.current
        ? deepDiveRef.current.offsetTop + deepDiveRef.current.offsetHeight
        : 0;
      const dhp = dEnd ? Math.max(0, Math.min((window.scrollY - dEnd) / 2400, 1)) : 0;
      setDeepDiveHorizProgress(dhp);

      // 4. Hackathons Horizontal — kicks in after hackathonsAnchorRef
      const hEnd = hackathonsAnchorRef.current
        ? hackathonsAnchorRef.current.offsetTop
        : 0;
      const hhp = hEnd ? Math.max(0, Math.min((window.scrollY - hEnd) / 2400, 1)) : 0;
      setHackathonsHorizProgress(hhp);

      // 5. Awards Horizontal 
      const aEnd = awardsAnchorRef.current ? awardsAnchorRef.current.offsetTop : 0;
      const ahp = aEnd ? Math.max(0, Math.min((window.scrollY - aEnd) / 3200, 1)) : 0;
      setAwardsHorizProgress(ahp);

      // 6. Extra Info Horizontal (Learning, Dialect, Vouch, Contact)
      const eStart = extraInfoAnchorRef.current ? extraInfoAnchorRef.current.offsetTop : 0;
      const ehp = eStart ? Math.max(0, Math.min((window.scrollY - eStart) / 4000, 1)) : 0;
      setExtraHorizProgress(ehp);
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
    <div style={{ color: '#FFF', position: 'relative' }}>
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
      <div style={{ 
        width: "100%", 
        position: "relative", 
        cursor: "none", 
        backgroundColor: "#000",
        marginBottom: '500px', // Match footer height for reveal
        zIndex: 10
      }}>

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

            {/* HORIZONTAL SECTION — slides up from below as landing flies off */}
            <div style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              overflow: "hidden",
              backgroundColor: "#000",
              color: "#FFF",
              transform: `translateY(${(1 - scrollProgress) * 100}vh)`,
              transition: "transform 0.05s linear"
            }}>
              {/* Horizontal Slider Content */}
              <div style={{
                display: "flex",
                height: "100%",
                width: "200vw",
                transform: `translateX(-${horizontalProgress * 100}vw)`,
                transition: "transform 0.08s ease-out",
                padding: "clamp(40px, 12vw, 140px)",
                boxSizing: "border-box",
              }}>
                <Experience />
                <Projects />
              </div>
            </div>

          </div>
        </div>

        {/* 2. Deep Dive — normal vertical section */}
        <div ref={deepDiveRef}>
          <DeepDive />
        </div>

        {/* 3. Projects — sticky horizontal scroll (slides in after DeepDive) */}
        <div style={{ height: "3200px", position: "relative" }}>
          <div style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#000",
          }}>
            <div style={{
              display: "flex",
              width: "200vw",
              height: "100%",
              transform: `translateX(-${deepDiveHorizProgress * 100}vw)`,
              transition: "transform 0.08s ease-out"
            }}>
              {/* Left placeholder — mirrors the end of DeepDive for continuity */}
              <div style={{
                width: "100vw",
                flexShrink: 0,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.15)",
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(2rem, 8vw, 6rem)",
                fontStyle: "italic",
                letterSpacing: "-0.02em"
              }}>
                Now, to my&nbsp;<em>Favourite Part.</em>
              </div>
              {/* Right panel — Personal Projects */}
              <div style={{ width: "100vw", flexShrink: 0, height: "100%", overflowY: "auto", display: "flex", alignItems: "center" }}>
                <PersonalProjects />
              </div>
            </div>
          </div>
        </div>

        <Photography />
        <MoreProjects />

        {/* "Now, the fun part" transition label */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(3rem, 8vw, 6rem) 0',
          backgroundColor: '#000',
        }}>
          <p style={{
            fontFamily: "'Times New Roman', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            color: 'rgba(255,255,255,0.3)',
            margin: 0,
            letterSpacing: '0.02em',
          }}>
            Now, the fun part
          </p>
        </div>

        {/* Hackathons horizontal scroll anchor */}
        <div ref={hackathonsAnchorRef} style={{ height: '3200px', position: 'relative' }}>
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#000',
          }}>
            <div style={{
              display: 'flex',
              width: '200vw',
              height: '100%',
              transform: `translateX(-${hackathonsHorizProgress * 100}vw)`,
              transition: 'transform 0.08s ease-out',
            }}>
              {/* Left placeholder — GBA boot screen */}
              <div style={{
                width: '100vw',
                flexShrink: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0a0800',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* scanlines */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
                  zIndex: 2,
                }} />
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(8px, 1.4vw, 14px)',
                  color: '#C9A800',
                  letterSpacing: '0.3em',
                  opacity: 0.5,
                  zIndex: 3,
                }}>
                  NOW LOADING
                </div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(1.2rem, 4vw, 3.5rem)',
                  color: '#FFD601',
                  textShadow: '0 0 40px #FFD60166, 0 0 80px #FFD60133',
                  lineHeight: 1.3,
                  textAlign: 'center',
                  zIndex: 3,
                }}>
                  NOW,<br />THE FUN<br />PART
                </div>
                <div style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(7px, 1vw, 10px)',
                  color: '#39FF14',
                  textShadow: '0 0 8px #39FF14',
                  zIndex: 3,
                }}>
                  ▶▶ SCROLL TO CONTINUE
                </div>
              </div>
              {/* Right panel — Hackathons */}
              <div style={{ width: '100vw', flexShrink: 0, height: '100%', overflowY: 'auto', display: 'flex', alignItems: 'center' }}>
                <Hackathons />
              </div>
            </div>
          </div>
        </div>

        <HackathonReflection />

        {/* ── AWARDS SECTION ── */}
        <div ref={awardsAnchorRef} style={{ height: '400vh', position: 'relative' }}>
          <div style={{
            position: 'sticky',
            top: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#000',
          }}>
            <Awards horizontalProgress={awardsHorizProgress} />
          </div>
        </div>

        <div ref={extraInfoAnchorRef} style={{ height: '5200px', position: 'relative' }}>
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#000',
          }}>
            <div style={{
              display: 'flex',
              width: '400vw',
              height: '100%',
              transform: `translateX(-${extraHorizProgress * 300}vw)`,
              transition: 'transform 0.08s ease-out'
            }}>
              <Learning />
              <Dialect />
              <Vouch />
              <Contact />
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
