import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'framer-motion';
import backgroundImage from '../assets/SideQuests/Background.png';
import SideQuestsIntro from './SideQuestsIntro';
import CurvedLoop from './CurvedLoop';
import SideQuestsGallery from './SideQuestsGallery';

/* ═══════════════════════════════════════════════════════════════════════════
   PARALLAX MOUSE HOOK
   Very gentle spring — slow, heavy movement for the background layers.
   ═══════════════════════════════════════════════════════════════════════════ */
const SPRING = { stiffness: 30, damping: 25, mass: 1.2 };

function useParallaxMouse() {
  const mouseX = useSpring(0, SPRING);
  const mouseY = useSpring(0, SPRING);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDE QUESTS — MAIN COMPONENT
   Landing page with parallax background + white gallery section below.
   ═══════════════════════════════════════════════════════════════════════════ */
const SideQuests = () => {
  const { mouseX, mouseY } = useParallaxMouse();

  /* ─── Scroll Container ─── */
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  /* ─── Parallax offsets ─── */
  const bgX   = useTransform(mouseX, (v) => v * -12);
  const bgY   = useTransform(mouseY, (v) => v * -8);
  const warmX  = useTransform(mouseX, (v) => v * 18);
  const warmY  = useTransform(mouseY, (v) => v * 12);
  const coolX  = useTransform(mouseX, (v) => v * -22);
  const coolY  = useTransform(mouseY, (v) => v * -15);
  const grainX = useTransform(mouseX, (v) => v * 28);
  const grainY = useTransform(mouseY, (v) => v * 20);

  /* ─── Dynamic Glow (mouse-reactive) ─── */
  const glowOpacity = useTransform(mouseY, [-1, 0, 1], [0.4, 0.7, 0.4]);
  const glowScale   = useTransform(mouseY, [-1, 0, 1], [0.9, 1.2, 0.9]);
  const glowX       = useTransform(mouseX, (v) => v * 50);

  /* ─── White Section slide-up (driven by container scroll) ─── */
  const section2Y      = useTransform(scrollYProgress, [0, 0.35], ['100vh', '0vh']);
  const section2Scale  = useTransform(scrollYProgress, [0, 0.35], [0.98, 1]);
  const galleryOpacity = useTransform(scrollYProgress, [0.15, 0.40], [0, 1]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
      }}
    >
      {/* ── CINEMATIC INTRO ── */}
      <SideQuestsIntro />

      {/* ═════════════════════════════════════════════════════════════════════
          FIXED BACKGROUND LAYERS
          Parallax image + warm/cool glows + corner curved marquee
          ═════════════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
        {/* Photo Background */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-2%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            x: bgX,
            y: bgY,
          }}
        />

        {/* Warm Glow (top-left) */}
        <motion.div style={{
          position: 'absolute', inset: '-5%',
          background: 'radial-gradient(circle at 15% 15%, rgba(255, 200, 140, 0.15), transparent 70%)',
          filter: 'blur(60px)',
          x: warmX, y: warmY,
        }} />

        {/* Cool Glow (bottom-right) */}
        <motion.div style={{
          position: 'absolute', inset: '-5%',
          background: 'radial-gradient(circle at 85% 80%, rgba(140, 180, 230, 0.15), transparent 70%)',
          filter: 'blur(70px)',
          x: coolX, y: coolY,
        }} />

        {/* Corner Curved Marquee */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '35vw',
          height: '35vw',
          minWidth: '350px',
          minHeight: '350px',
          pointerEvents: 'auto',
          zIndex: 10,
        }}>
          <CurvedLoop
            marqueeText="Thoughts ✦ Photos ✦ Art ✦ Interests ✦ "
            speed={1.5}
          />
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          SCROLLABLE CONTENT
          ═════════════════════════════════════════════════════════════════════ */}

      {/* SECTION 1 — Hero Spacer (you see the background image here) */}
      <section style={{ height: '100vh', position: 'relative', zIndex: 6 }} />

      {/* SECTION 2 — White Paper Gallery (its own component now) */}
      <SideQuestsGallery
        section2Y={section2Y}
        section2Scale={section2Scale}
        galleryOpacity={galleryOpacity}
        glowX={glowX}
        glowOpacity={glowOpacity}
        glowScale={glowScale}
        containerRef={containerRef}
      />

      {/* Dynamic Grain Overlay */}
      <motion.div style={{
        position: 'fixed',
        inset: '-10%',
        zIndex: 20,
        pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundSize: '180px 180px',
        opacity: 0.05,
        mixBlendMode: 'overlay',
        x: grainX,
        y: grainY,
      }} />
    </motion.div>
  );
};

export default SideQuests;