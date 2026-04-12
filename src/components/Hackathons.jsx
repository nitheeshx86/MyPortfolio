import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Google Font injection ─────────────────────────────────────────────── */
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';

/* ─── palette ────────────────────────────────────────────────────────────── */
const Y    = '#FFD601';
const YD   = '#C9A800';
const YL   = '#FFF9C4';
const BG   = '#0a0800';
const BODY = '#1c1a10';      // GBA body
const BODY2= '#2a2614';      // GBA body lighter ridge
const SCR  = '#0d1500';      // screen bg (classic GBA green-black)
const SCRG = '#1a2e00';      // screen lighter
const GRN  = '#39FF14';
const RED  = '#FF4444';
const PX   = "'Press Start 2P', monospace";

/* ─── hackathon data ─────────────────────────────────────────────────────── */
const HACKS = [
  {
    id: 'STG-01',
    name: 'IBM QISKIT\nFALL FEST',
    shortName: 'QISKIT FALL FEST',
    year: '2022',
    award: '1ST PLACE',
    awardColor: Y,
    stars: 3,
    domain: 'QUANTUM COMPUTING',
    sprite: '⚡',
    hp: 100,
    // image: 'https://example.com/qiskit.jpg', // optional — add a URL here to show a screenshot
    description:
      'Built a quantum-classical hybrid drug screening pipeline. Placed 1st nationally — this opened the door to $120K in AWS Braket credits and the MEDxAI internship arc.',
    project: 'A Qiskit variational quantum eigensolver pipeline screened 10,000+ SMILES strings in parallel on AWS Braket, narrowing viable drug candidates by 60% vs classical baseline.',
    tags: ['QISKIT', 'PYTHON', 'AWS BRAKET', 'VQE'],
  },
  {
    id: 'STG-02',
    name: 'SMART INDIA\nHACKATHON',
    shortName: 'SIH 2023',
    year: '2023',
    award: 'FINALIST',
    awardColor: GRN,
    stars: 3,
    domain: 'HEALTH TECH',
    sprite: '🏥',
    hp: 82,
    // image: 'https://example.com/sih.jpg',
    description:
      'AI-assisted diagnostic tool for rural settings, cutting misdiagnosis by surfacing lightweight vision-model alerts on edge devices.',
    project: 'MobileNet-V3 fine-tuned on annotated X-ray dataset; served via FastAPI on a Raspberry Pi 4. Sub-200ms inference. React dashboard for field health workers.',
    tags: ['PYTORCH', 'FASTAPI', 'MOBILENET', 'REACT'],
  },
  {
    id: 'STG-03',
    name: 'HACK VIT\n2023',
    shortName: 'HACKVIT 2023',
    year: '2023',
    award: '2ND PLACE',
    awardColor: '#C0C0C0',
    stars: 2,
    domain: 'DEV TOOLS',
    sprite: '🔬',
    hp: 74,
    // image: 'https://example.com/hackvit.jpg',
    description:
      'Real-time collaborative 3-D protein annotation — remote teams could mark residues simultaneously over WebSockets.',
    project: 'NGL Viewer embedded in React, with a Node/Socket.io relay broadcasting residue selection events. Supports up to 12 concurrent annotators on a single PDB structure.',
    tags: ['THREE.JS', 'SOCKET.IO', 'NGL VIEWER', 'REACT'],
  },
  {
    id: 'STG-04',
    name: 'HACK THIS\nFALL 2024',
    shortName: 'HACK THIS FALL',
    year: '2024',
    award: 'TOP 10',
    awardColor: '#FF9800',
    stars: 2,
    domain: 'OPEN SCIENCE',
    sprite: '🧬',
    hp: 61,
    // image: 'https://example.com/hackthisfall.jpg',
    description:
      'Open-source GROMACS MD run analyser that auto-flags convergence failures, cutting manual review time by ~70%.',
    project: 'Python CLI that parses GROMACS .xvg energy files, runs rolling-window drift analysis, and emits coloured terminal reports + JSON for CI integration.',
    tags: ['GROMACS', 'PYTHON', 'PANDAS', 'MATPLOTLIB'],
  },
];

/* ─── tiny helpers ───────────────────────────────────────────────────────── */
const px = (v) => ({ fontFamily: PX, ...v });

const Stars = ({ count, max = 3 }) => (
  <span style={{ letterSpacing: 4 }}>
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} style={{
        color: i < count ? Y : '#333',
        textShadow: i < count ? `0 0 6px ${Y}` : 'none',
        fontSize: 13,
      }}>★</span>
    ))}
  </span>
);

const HPBar = ({ value }) => (
  <div style={{ margin: '6px 0' }}>
    <div style={px({ fontSize: 7, color: YD, marginBottom: 3 })}>HP {value}/100</div>
    <div style={{ height: 7, background: '#111', border: `2px solid ${YD}`, position: 'relative', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '100%',
          background: value > 70 ? GRN : value > 40 ? Y : RED,
          boxShadow: `0 0 6px ${value > 70 ? GRN : value > 40 ? Y : RED}`,
        }}
      />
    </div>
  </div>
);

/* ─── GBA screen content ─────────────────────────────────────────────────── */
const ScreenIdle = ({ hack, idx, total }) => {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 16px', boxSizing: 'border-box', gap: 8, position: 'relative', overflow: 'hidden' }}>
      {/* scanlines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={px({ fontSize: 10, color: YD })}>{hack.id}</span>
        <span style={px({ fontSize: 10, color: hack.awardColor, textShadow: `0 0 8px ${hack.awardColor}` })}>{hack.award}</span>
      </div>

      {/* sprite + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
        <span style={{ fontSize: 32, lineHeight: 1, filter: `drop-shadow(0 0 8px ${Y})`, marginTop: 4 }}>{hack.sprite}</span>
        <div style={{ flex: 1 }}>
          <div style={px({ fontSize: 'clamp(12px, 1.8vw, 16px)', color: Y, lineHeight: 1.8, textShadow: `0 0 10px ${Y}66`, whiteSpace: 'pre-line' })}>
            {hack.name}
          </div>
          <div style={px({ fontSize: 10, color: '#5a6', marginTop: 4 })}>{hack.domain} · {hack.year}</div>
          <div style={{ marginTop: 8 }}>
            <Stars count={hack.stars} />
          </div>
          <HPBar value={hack.hp} />
        </div>
        {/* Optional screenshot / image */}
        {hack.image && (
          <img
            src={hack.image}
            alt={hack.shortName}
            style={{
              width: 80,
              height: 60,
              objectFit: 'cover',
              border: `1px solid ${YD}44`,
              flexShrink: 0,
              imageRendering: 'pixelated',
              opacity: 0.85,
            }}
          />
        )}
      </div>

      {/* description preview */}
      <div style={px({ fontSize: 10, color: '#8a9', lineHeight: 1.8, borderTop: '1px solid #2a3a00', paddingTop: 8 })}>
        {hack.description.slice(0, 90)}…
      </div>

      {/* pagination + hint */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={px({ fontSize: 9, color: '#3a4a00' })}>{String(idx + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
        <span style={px({ fontSize: 9, color: blink ? YD : 'transparent' })}>▶ PRESS A/B</span>
      </div>
    </div>
  );
};

const ScreenModal = ({ hack, mode, onClose }) => {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  const isA = mode === 'A';
  const title = isA ? '// HACKATHON INFO' : '// PROJECT DETAILS';
  const body  = isA ? hack.description : hack.project;

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '12px 14px', boxSizing: 'border-box', gap: 8, position: 'relative', overflow: 'hidden', backgroundColor: SCR }}
    >
      {/* scanlines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* header bar */}
      <div style={{ background: isA ? YD : GRN, padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={px({ fontSize: 10, color: '#000' })}>{title}</span>
        <span style={px({ fontSize: 10, color: '#000' })}>{hack.year}</span>
      </div>

      {/* name + optional image */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={px({ fontSize: 'clamp(10px, 1.6vw, 14px)', color: Y, textShadow: `0 0 8px ${Y}88`, lineHeight: 1.8, whiteSpace: 'pre-line', flex: 1 })}>
          {hack.name}
        </div>
        {hack.image && (
          <img
            src={hack.image}
            alt={hack.shortName}
            style={{
              width: 90,
              height: 65,
              objectFit: 'cover',
              border: `1px solid ${isA ? YD : GRN}55`,
              flexShrink: 0,
              opacity: 0.9,
            }}
          />
        )}
      </div>

      {/* body text */}
      <div style={px({ fontSize: 10, color: '#8ab890', lineHeight: 2, flex: 1, overflowY: 'auto' })}>
        {body}
        <span style={{ opacity: blink ? 1 : 0, color: GRN }}>█</span>
      </div>

      {/* tags */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {hack.tags.map(t => (
          <span key={t} style={px({ fontSize: 9, background: isA ? YD : '#1a3d00', color: isA ? '#000' : GRN, padding: '3px 8px' })}>{t}</span>
        ))}
      </div>

      {/* close hint */}
      <div style={px({ fontSize: 9, color: '#3a4a00', textAlign: 'right' })}>
        {isA ? '[A]' : '[B]'} CLOSE
      </div>
    </motion.div>
  );
};

/* ─── GBA Sound Engine (Web Audio API) ──────────────────────────────────── */
let _audioCtx = null;
const getCtx = () => {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
};

const gbaSound = (type = 'dpad') => {
  try {
    const ctx = getCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (type === 'dpad') {
      // Short percussive click — two detuned square waves, quick decay
      [220, 180].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.07);
        g.gain.setValueAtTime(0.6 - i * 0.2, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.09);
      });
    } else if (type === 'A') {
      // Clean single-note chime — sine wave with a soft attack and gentle tail
      const osc  = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const g    = ctx.createGain();
      osc.type  = 'sine';
      osc2.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc2.frequency.setValueAtTime(1320, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.12);
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(g);
      osc2.connect(g);
      g.connect(masterGain);
      osc.start(ctx.currentTime);  osc.stop(ctx.currentTime + 0.23);
      osc2.start(ctx.currentTime); osc2.stop(ctx.currentTime + 0.23);
    } else if (type === 'B') {
      // Lower confirm tone — descending square + triangle blend
      const freqs = [330, 220];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.type = i === 0 ? 'square' : 'triangle';
        const t0 = ctx.currentTime + i * 0.055;
        osc.frequency.setValueAtTime(freq, t0);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t0 + 0.1);
        g.gain.setValueAtTime(0.45, t0);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.13);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(t0);
        osc.stop(t0 + 0.14);
      });
    }
  } catch (e) { /* silently ignore if audio unavailable */ }
};

/* ─── D-pad button ───────────────────────────────────────────────────────── */
const DKey = ({ label, icon, onClick, style = {} }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className="clickable-gba"
      onMouseDown={() => { setPressed(true); gbaSound('dpad'); onClick(); }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        width: 42, height: 42,
        background: pressed ? '#444' : '#222',
        border: '2px solid #111',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', userSelect: 'none',
        boxShadow: pressed ? 'none' : '0 3px 0 #111',
        transform: pressed ? 'translateY(2px)' : 'none',
        transition: 'all 0.06s',
        ...style,
      }}
    >
      <span style={{ color: '#888', fontSize: 14, lineHeight: 1 }}>{icon}</span>
    </div>
  );
};

/* ─── action button (A / B) ──────────────────────────────────────────────── */
const ActionBtn = ({ label, color, onClick, subLabel }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div
        className="clickable-gba"
        onMouseDown={() => { setPressed(true); gbaSound(label); onClick(); }}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: pressed ? color + 'aa' : color,
          border: `3px solid ${color === Y ? YD : '#005500'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', userSelect: 'none',
          boxShadow: pressed ? 'none' : `0 4px 0 ${color === Y ? '#7a6000' : '#003300'}, 0 0 16px ${color}55`,
          transform: pressed ? 'translateY(3px)' : 'none',
          transition: 'all 0.06s',
        }}
      >
        <span style={px({ fontSize: 11, color: '#000' })}>{label}</span>
      </div>
      <span style={px({ fontSize: 6, color: '#555' })}>{subLabel}</span>
    </div>
  );
};

/* ─── speaker grille dots ────────────────────────────────────────────────── */
const Speaker = ({ side = 'right' }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 6px)',
    gap: 4,
    opacity: 0.35,
    transform: side === 'left' ? 'scaleX(-1)' : 'none',
  }}>
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#555' }} />
    ))}
  </div>
);

/* ─── MAIN GBA COMPONENT ─────────────────────────────────────────────────── */
const Hackathons = () => {
  const [idx, setIdx]     = useState(0);
  const [mode, setMode]   = useState(null); // null | 'A' | 'B'
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = React.useRef(null);
  const total = HACKS.length;

  // Memoized random layout for the PCB (Higher density)
  const pcbLayout = React.useMemo(() => ({
    baseHue: Math.floor(Math.random() * 20) - 10,
    chips: Array.from({ length: 12 }).map((_, i) => ({
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      w: 20 + Math.random() * 45,
      h: 20 + Math.random() * 45,
      rot: Math.random() * 4 > 2 ? 0 : 90,
      id: `chip-${i}`,
      label: ['AGB-BUS', 'RAM', 'BIOS', 'SRAM', 'VRAM', 'RTC'][i % 6]
    })),
    vias: Array.from({ length: 100 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      silver: Math.random() > 0.8
    })),
    smds: Array.from({ length: 60 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      w: 4 + Math.random() * 6,
      h: 2 + Math.random() * 3,
      color: ['#c0c0c0', '#444', '#a52a2a', '#4169e1'][i % 4]
    }))
  }), []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const navigate = useCallback((dir) => {
    setMode(null);
    setIdx(prev => (prev + dir + total) % total);
  }, [total]);

  // keyboard support
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'w') navigate(-1);
      if (e.key === 's') navigate(1);
      if (e.key === 'a') navigate(-1);
      if (e.key === 'd') navigate(1);
      if (e.key === 'z') setMode(m => m === 'A' ? null : 'A');
      if (e.key === 'x') setMode(m => m === 'B' ? null : 'B');
      if (e.key === 'Escape')   setMode(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const hack = HACKS[idx];

  return (
    <section
      id="hackathons"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BG,
        padding: 'clamp(24px, 4vw, 60px)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <style>{`
        @import url('${FONT_URL}');
        #hackathons::-webkit-scrollbar { width: 6px; background: ${BG}; }
        #hackathons::-webkit-scrollbar-thumb { background: ${YD}; }
      `}</style>

      {/* ── HEADING ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(1rem, 3vw, 2.5rem)', position: 'relative', zIndex: 2 }}>
        <h2 style={px({
          fontSize: 'clamp(1rem, 3.5vw, 2.6rem)',
          color: Y,
          margin: 0,
          lineHeight: 1.35,
          textShadow: `0 0 30px ${Y}66, 0 0 60px ${Y}33`,
        })}>
          HACKATHONS
        </h2>
      </div>

      {/* ── GBA CONSOLE BODY ── */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hide-blob-cursor"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: 'clamp(540px, 85vw, 920px)',
          background: `
            repeating-linear-gradient(to bottom, transparent 0px, transparent 12px, rgba(0,0,0,0.06) 12px, rgba(0,0,0,0.06) 13px, transparent 13px),
            linear-gradient(160deg, ${BODY2} 0%, ${BODY} 60%)
          `,
          borderRadius: '24px 24px 40px 40px',
          padding: '32px 40px 44px',
          boxSizing: 'border-box',
          boxShadow: `0 0 0 3px #0a0900, 0 0 0 5px #333, 0 12px 50px rgba(0,0,0,0.8), 0 0 60px ${Y}18`,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          zIndex: 2,
          overflow: 'hidden'
        }}
      >
        {/* ── SHELL SIDE GRIPS (Realistic Grooves) ── */}
        <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 10, background: 'repeating-linear-gradient(to bottom, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)', zIndex: 1, opacity: 0.5 }} />
        <div style={{ position: 'absolute', right: 0, top: '20%', bottom: '20%', width: 10, background: 'repeating-linear-gradient(to bottom, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)', zIndex: 1, opacity: 0.5 }} />

        {/* ── ELECTRONICS REVEAL LAYER (X-RAY) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `hsl(${120 + pcbLayout.baseHue}, 45%, 15%)`, // Randomized PCB Green
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0),
            linear-gradient(90deg, hsla(${120 + pcbLayout.baseHue}, 45%, 25%, 0.4) 1px, transparent 0),
            linear-gradient(0deg, hsla(${120 + pcbLayout.baseHue}, 45%, 25%, 0.4) 1px, transparent 0)
          `,
          backgroundSize: '15px 15px, 30px 30px, 30px 30px',
          WebkitMaskImage: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}>
          {/* Advanced PCB Trace Pattern (SVG) */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}>
            <defs>
              <pattern id="circuit-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Denser horizontal/vertical trace clusters */}
                <path d="M0 10 H120 M0 12 H120 M0 14 H120 M0 60 H120 M0 62 H120" stroke="#b8860b" strokeWidth="0.4" fill="none" opacity="0.6" />
                <path d="M40 0 V120 M42 0 V120 M44 0 V120 M100 0 V120" stroke="#b8860b" strokeWidth="0.4" fill="none" opacity="0.6" />
                {/* Complex junctions */}
                <path d="M10 10 L30 30 M90 10 L110 30 M10 70 L30 90 M90 70 L110 90" stroke="#d4af37" strokeWidth="0.7" fill="none" />
                <path d="M30 30 H90 V90 H30 Z" stroke="#d4af37" strokeWidth="0.3" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-grid)" />
            {/* Custom high-density BUS traces across entire board */}
            {Array.from({ length: 8 }).map((_, i) => (
              <React.Fragment key={i}>
                <path d={`M${i * 100} 0 V1200`} stroke="#d4af37" strokeWidth="0.2" fill="none" opacity="0.3" />
                <path d={`M0 ${i * 120} H1200`} stroke="#d4af37" strokeWidth="0.2" fill="none" opacity="0.3" />
              </React.Fragment>
            ))}
          </svg>

          {/* CPU / Processor Chip */}
          <div style={{
            position: 'absolute', top: '40%', left: '45%',
            width: 100, height: 100,
            background: '#1a1a1a',
            border: '2px solid #333',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ fontSize: '8px', color: '#666', fontFamily: 'monospace', textAlign: 'center' }}>
              AGB-CPU<br />ARM7TDMI
            </div>
            {/* Chip Pins */}
            <div style={{ position: 'absolute', top: -4, left: 5, right: 5, height: 4, display: 'flex', justifyContent: 'space-around' }}>
              {Array.from({ length: 15 }).map((_, i) => <div key={i} style={{ width: 1, height: '100%', background: '#c0c0c0' }} />)}
            </div>
            <div style={{ position: 'absolute', bottom: -4, left: 5, right: 5, height: 4, display: 'flex', justifyContent: 'space-around' }}>
              {Array.from({ length: 15 }).map((_, i) => <div key={i} style={{ width: 1, height: '100%', background: '#c0c0c0' }} />)}
            </div>
          </div>

          {/* Randomized Memory/Logic Chips */}
          {pcbLayout.chips.map(chip => (
            <div key={chip.id} style={{
              position: 'absolute', top: `${chip.y}%`, left: `${chip.x}%`,
              width: chip.w, height: chip.h,
              background: '#1a1a1a', border: '1px solid #333',
              transform: `rotate(${chip.rot}deg)`,
              boxShadow: '0 0 5px rgba(0,0,0,0.8)',
              zIndex: 1, opacity: 0.95
            }}>
              <div style={{ fontSize: '5px', color: '#555', fontFamily: 'monospace', padding: 2, pointerEvents: 'none' }}>{chip.label}</div>
              <div style={{ position: 'absolute', left: -2, top: 2, bottom: 2, width: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                {Array.from({ length: 10 }).map((_, i) => <div key={i} style={{ height: 1, width: '100%', background: '#999' }} />)}
              </div>
              <div style={{ position: 'absolute', right: -2, top: 2, bottom: 2, width: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                {Array.from({ length: 10 }).map((_, i) => <div key={i} style={{ height: 1, width: '100%', background: '#999' }} />)}
              </div>
            </div>
          ))}

          {/* Surface Mount Components (SMDs) */}
          {pcbLayout.smds.map((smd, i) => (
            <div key={`smd-${i}`} style={{
              position: 'absolute', top: `${smd.y}%`, left: `${smd.x}%`,
              width: smd.w, height: smd.h, background: smd.color,
              border: '0.1px solid rgba(255,255,255,0.2)',
              opacity: 0.8
            }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: '#c0c0c0' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: '#c0c0c0' }} />
            </div>
          ))}

          {/* Randomized Vias & Solder Dots */}
          {pcbLayout.vias.map((via, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${via.y}%`,
              left: `${via.x}%`,
              width: 2.5, height: 2.5,
              borderRadius: '50%',
              background: via.silver ? '#c0c0c0' : '#b8860b',
              border: '0.3px solid #fff',
              opacity: 0.7, zIndex: 0
            }} />
          ))}
        </div>
        {/* power LED */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', top: 18, left: 28,
            width: 8, height: 8, borderRadius: '50%',
            background: GRN,
            boxShadow: `0 0 8px ${GRN}`,
          }}
        />
        <span style={px({ position: 'absolute', top: 14, left: 42, fontSize: 6, color: GRN, opacity: 0.6 })}>PWR</span>

        {/* GBA logo area */}
        <span style={px({ position: 'absolute', top: 16, right: 28, fontSize: 7, color: '#444', letterSpacing: '0.15em' })}>
          GAME BOY<span style={{ color: Y }}> A</span>
        </span>

        {/* ── TOP ROW: D-pad | SCREEN | Action buttons ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 28px)', position: 'relative', zIndex: 3 }}>

          {/* ── D-PAD ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
            {/* Up */}
            <DKey label="W" icon="▲" onClick={() => navigate(-1)} />
            {/* Middle row */}
            <div style={{ display: 'flex', gap: 0 }}>
              <DKey label="A" icon="◀" onClick={() => navigate(-1)} />
              {/* center nub */}
              <div style={{ width: 42, height: 42, background: '#1a1a1a', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#2a2a2a', border: '2px solid #111' }} />
              </div>
              <DKey label="D" icon="▶" onClick={() => navigate(1)} />
            </div>
            {/* Down */}
            <DKey label="S" icon="▼" onClick={() => navigate(1)} />
            <span style={px({ fontSize: 6, color: '#444', marginTop: 6, letterSpacing: '0.15em' })}>W A S D</span>
          </div>

          {/* ── SCREEN ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {/* outer bezel */}
            <div style={{
              width: '100%',
              background: '#0a0a08',
              borderRadius: 10,
              padding: 10,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), 0 2px 0 #3a3820',
            }}>
              {/* screen frame */}
              <div style={{
                width: '100%',
                aspectRatio: '3/2.4',
                background: SCR,
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: `inset 0 0 30px rgba(0,0,0,0.6), 0 0 20px ${Y}22`,
                border: `1px solid ${SCRG}`,
              }}>
                {/* screen gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
                  borderRadius: 4,
                }} />

                <AnimatePresence mode="wait">
                  {mode ? (
                    <ScreenModal key={`${idx}-${mode}`} hack={hack} mode={mode} onClose={() => setMode(null)} />
                  ) : (
                    <motion.div
                      key={`idle-${idx}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <ScreenIdle hack={hack} idx={idx} total={total} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* screen label */}
            <span style={px({ fontSize: 6, color: '#333', letterSpacing: '0.35em' })}>
              ── TFT COLOUR ──
            </span>
          </div>

          {/* ── ACTION BUTTONS — true GBA diagonal: B lower-left, A upper-right ── */}
          <div style={{ position: 'relative', width: 130, height: 100, flexShrink: 0 }}>
            {/* B — lower-left */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <ActionBtn
                label="B"
                color={GRN}
                subLabel="PROJECT"
                onClick={() => setMode(m => m === 'B' ? null : 'B')}
              />
            </div>
            {/* A — upper-right */}
            <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <ActionBtn
                label="A"
                color={Y}
                subLabel="INFO"
                onClick={() => setMode(m => m === 'A' ? null : 'A')}
              />
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW: speaker | START/SELECT | speaker ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
          {/* left speaker */}
          <Speaker side="left" />

          {/* SELECT + START */}
          {/* SELECT + START removed */}
          <div style={{ flex: 1 }} />

          {/* right speaker */}
          <Speaker side="right" />
        </div>

        {/* ── bottom grip notches ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 24px', pointerEvents: 'none' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 24, height: 8, background: '#0a0900', borderRadius: '0 0 4px 4px', opacity: 0.5 }} />
          ))}
        </div>
      </motion.div>

      {/* ── keyboard hint below ── */}
      <div style={{ marginTop: 'clamp(12px, 2vw, 20px)', display: 'flex', gap: 20, alignItems: 'center', zIndex: 2 }}>
        {[
          { keys: 'W / S / A / D', label: 'NAVIGATE' },
          { keys: 'Z', label: 'HACK INFO' },
          { keys: 'X', label: 'PROJECT' },
          { keys: 'ESC', label: 'BACK' },
        ].map(({ keys, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={px({ fontSize: 6, background: '#1e1c10', border: `1px solid ${YD}`, color: Y, padding: '3px 7px' })}>{keys}</span>
            <span style={px({ fontSize: 6, color: '#444' })}>{label}</span>
          </div>
        ))}
      </div>

      {/* floating pixel particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [-6, 6, -6], opacity: [0.04, 0.09, 0.04] }}
            transition={{ repeat: Infinity, duration: 3 + (i % 4), delay: i * 0.25, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: `${(i * 43 + 7) % 100}%`,
              top: `${(i * 61 + 13) % 100}%`,
              width: [4, 6, 8][i % 3],
              height: [4, 6, 8][i % 3],
              background: Y,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hackathons;
