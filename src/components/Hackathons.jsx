import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ibmLogo from '../assets/IBM.png';
import intelLogo from '../assets/intel.png';
import microsoftLogo from '../assets/microsoft.png';
import isroLogo from '../assets/isro.png';
import gsLogo from '../assets/GoldmanSachs1.png';

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

/* ─── Custom Backgrounds ─────────────────────────────────────────────────── */
const AbstractColorfulBg = ({ hueShift = 0 }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.85, filter: `hue-rotate(${hueShift}deg)` }}>
    <div style={{ position: 'absolute', inset: 0, background: '#02020a' }} />
    
    {/* Colorful Abstract Glows */}
    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)', filter: 'blur(30px)' }} />
    <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '70%', height: '70%', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', top: '30%', left: '30%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)', filter: 'blur(35px)' }} />

    {/* Tech/Computer Aesthetic - Colorful Cyberspace Grid */}
    <motion.div
      animate={{ backgroundPositionY: ['0px', '12px'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute', bottom: 0, left: '-50%', width: '200%', height: '60%',
        backgroundImage: `
          linear-gradient(to top, rgba(14, 165, 233, 0.5) 1px, transparent 1px),
          linear-gradient(to right, rgba(236, 72, 153, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: '100% 12px, 20px 100%',
        transform: 'perspective(150px) rotateX(60deg)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
      }}
    />

    {/* Abstract Light Streams / Vertical Data */}
    <motion.div animate={{ top: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', left: '20%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, #38bdf8, #ec4899, transparent)', opacity: 0.8, filter: 'drop-shadow(0 0 5px #38bdf8)' }} />
    <motion.div animate={{ top: ['-100%', '100%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }} style={{ position: 'absolute', right: '30%', width: '2px', height: '100%', background: 'linear-gradient(to bottom, transparent, #ec4899, #f59e0b, transparent)', opacity: 0.6, filter: 'drop-shadow(0 0 8px #ec4899)' }} />
    <motion.div animate={{ top: ['-100%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 2 }} style={{ position: 'absolute', left: '60%', width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, #8b5cf6, #38bdf8, transparent)', opacity: 0.5 }} />

    {/* Abstract Floating Tech Geometry (Neural/Data nodes) */}
    <motion.svg animate={{ y: [-3, 3, -3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
      {/* Data Node 2 - Pink */}
      <polygon points="80,40 85,45 85,52 80,57 75,52 75,45" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="0.5" />
      <circle cx="80" cy="48.5" r="1.5" fill="#ec4899" />
      
      {/* Data Node 3 - Yellow */}
      <polygon points="40,65 45,70 45,77 40,82 35,77 35,70" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="0.5" />
      <circle cx="40" cy="73.5" r="1.5" fill="#f59e0b" />
      
      {/* Interconnecting Abstract Lines */}
      <path d="M 40 73.5 L 75 48.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 1" />
      <path d="M 80 40 L 60 20" fill="none" stroke="rgba(236, 72, 153, 0.4)" strokeWidth="0.3" strokeDasharray="1 1" />
      
      {/* Floating Abstract Squares / Code Blocks */}
      <motion.rect animate={{ rotate: [45, 405] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} x="65" y="15" width="4" height="4" fill="none" stroke="#8b5cf6" strokeWidth="0.5" style={{ transformOrigin: '67px 17px' }} />
      <motion.rect animate={{ rotate: [20, -340] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} x="25" y="80" width="3" height="3" fill="none" stroke="#38bdf8" strokeWidth="0.5" style={{ transformOrigin: '26.5px 81.5px' }} />
      <motion.rect animate={{ rotate: [15, 375] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} x="85" y="85" width="5" height="5" fill="none" stroke="#f59e0b" strokeWidth="0.5" style={{ transformOrigin: '87.5px 87.5px' }} />
    </motion.svg>
  </div>
);

/* ─── hackathon data ─────────────────────────────────────────────────────── */
const HACKS = [
  {
    id: 'STG-01',
    name: 'IBM QISKIT\nFALL FEST 24',
    shortName: 'QISKIT 2024',
    year: '2024',
    award: '1ST PLACE',
    awardColor: Y,
    stars: 3,
    domain: 'QUANTUM COMPUTING',
    sprite: '⚡',
    hp: 100,
    image: ibmLogo,
    bgComponent: AbstractColorfulBg,
    description: '1st Place. National-Level. Sem 1, Year 1 at VIT.',
    hackathonLines: [
      '1ST PLACE — NATIONAL LEVEL',
      'IBM Qiskit Fall Fest 2024',
      '',
      'First hackathon I ever entered — and won.',
      'Competed in Semester 1, Year 1 at VIT.',
      '',
      'Quantum computing levels the playing field —',
      'experience matters less than curiosity.',
      'First-years competed equally with seniors.',
      '',
      'Marked the beginning of my deep-tech journey',
      'into research-oriented hackathons.',
    ],
    projectLines: [
      'PROJECT: QBMS',
      'Quantum Battery Management System',
      '',
      'Applied QAOA + VQE to optimize a patented',
      'battery management hardware architecture.',
      '',
      'Simulations showed improvements in:',
      '  · Static power reduction',
      '  · Energy optimization',
      '  · Battery management efficiency',
      '',
      'NDA applies — architecture details restricted.',
      'Presented to senior IBM Quantum India leadership.',
    ],
    tags: ['QISKIT', 'QAOA', 'VQE', 'QUANTUM'],
  },
  {
    id: 'STG-02',
    name: 'IBM QISKIT\nFALL FEST 25',
    shortName: 'QISKIT 2025',
    year: '2025',
    award: 'HOST & JUDGE',
    awardColor: GRN,
    stars: 3,
    domain: 'QUANTUM COMPUTING',
    sprite: '👨\u200d🏫',
    hp: 100,
    image: ibmLogo,
    bgComponent: AbstractColorfulBg,
    hueShift: 90,
    description: 'Host, Judge & Instructor. International — 10+ countries, 100+ participants.',
    hackathonLines: [
      'INTERNATIONAL HACKATHON',
      'IBM Qiskit Fall Fest 2025',
      '',
      'Role: Host · Judge · Teaching Instructor',
      '~1 week · 10+ countries · 100+ participants',
      '',
      'Multicultural environment — participants from',
      'diverse technical and cultural backgrounds.',
      '',
      'Introduced Indian culture to international',
      'participants. Built a global network within',
      'the quantum computing community.',
      '',
      'Major milestone: participant → contributor.',
    ],
    projectLines: [
      'CONTRIBUTIONS & WORK',
      '',
      'Taught:',
      '  · Quantum computing fundamentals',
      '  · Quantum programming concepts',
      '  · Qiskit framework usage',
      '  · Problem-solving for quantum applications',
      '',
      'Judged projects on:',
      '  · Technical implementation',
      '  · Innovation & quantum relevance',
      '  · Practical applicability',
      '',
      'Improved: public speaking, mentoring,',
      'leadership & international collaboration.',
    ],
    tags: ['TEACHING', 'QISKIT', 'JUDGING', 'MENTORING'],
  },
  {
    id: 'STG-03',
    name: 'SAS × MS × HEC\nDATA HACKATHON',
    shortName: 'SAS HACKATHON',
    year: '2025',
    award: 'WORLD RANK 19',
    awardColor: '#C0C0C0',
    stars: 3,
    domain: 'DATA ANALYTICS',
    sprite: '📊',
    hp: 85,
    logos: [intelLogo, microsoftLogo],
    bgComponent: AbstractColorfulBg,
    hueShift: 180,
    description: 'World Rank 19. SAS × Microsoft × HEC Montréal 2025.',
    hackathonLines: [
      'WORLD RANK 19',
      'SAS × Microsoft × HEC Montréal 2025',
      '',
      'Premier international data analytics competition.',
      'Real-world business optimization problems.',
      '',
      'Stood out for:',
      '  · Global participant pool',
      '  · Enterprise-grade analytics problems',
      '  · Real-world business simulations',
      '  · Advanced machine learning applications',
      '',
      'One of my proudest data science achievements.',
    ],
    projectLines: [
      'PROJECT: FUNDRAISING OPTIMIZATION',
      '',
      'Role: Fundraising Manager + Data Scientist',
      '      + Decision Strategist',
      '',
      'Goal: Minimize costs · Maximize revenue',
      '      using large enterprise datasets.',
      '',
      'Methods used:',
      '  · Random Forest algorithms',
      '  · Predictive analytics models',
      '  · Decision optimization techniques',
      '  · Data-driven forecasting',
      '',
      'Reward: SAS Workbench access + official merch.',
    ],
    tags: ['RANDOM FOREST', 'DATA SCIENCE', 'SAS', 'ANALYTICS'],
  },
  {
    id: 'STG-04',
    name: 'ANALOG CIRCUITS\nHACK TRIVANDRUM',
    shortName: 'ANALOG HACK',
    year: '2024',
    award: 'RANK 5',
    awardColor: '#FF9800',
    stars: 3,
    domain: 'HARDWARE',
    sprite: '🔬',
    hp: 80,
    image: isroLogo,
    bgComponent: AbstractColorfulBg,
    hueShift: 270,
    description: 'Rank 5. Trivandrum. My only hardware hackathon.',
    hackathonLines: [
      'RANK 5',
      'Analog Circuits Hackathon — Trivandrum',
      '',
      'My ONLY hardware-focused hackathon.',
      'Conducted on campus, emphasis on depth.',
      '',
      'Unlike software events, this required:',
      '  · Electronics & circuit theory',
      '  · Analog systems knowledge',
      '  · Mathematical analysis',
      '',
      'Memorable hands-on hardware engineering',
      'experience — different from all others.',
    ],
    projectLines: [
      'PROJECT: OP-AMP CIRCUIT DESIGN',
      '',
      'Designed operational amplifier systems',
      'and built analog electronic circuits.',
      '',
      'Work included:',
      '  · Inverting / non-inverting amplifiers',
      '  · Comparators & active filters',
      '  · Signal conditioning for sensor data',
      '  · Analog circuit analysis & debugging',
      '  · Practical electronics implementation',
      '',
      'Strong blend of mathematics + electrical',
      'engineering + hardware problem-solving.',
    ],
    tags: ['HARDWARE', 'ANALOG', 'OP-AMPS', 'CIRCUITS'],
  },
  {
    id: 'STG-05',
    name: 'GOLDMAN SACHS\nQUANT FINANCE',
    shortName: 'GS QUANT',
    year: '2024',
    award: 'AIR 163',
    awardColor: '#00bcd4',
    stars: 2,
    domain: 'QUANT FINANCE',
    sprite: '📈',
    hp: 70,
    image: gsLogo,
    bgComponent: AbstractColorfulBg,
    hueShift: 320,
    description: 'All India Rank 163. Goldman Sachs Quant Finance 2024.',
    hackathonLines: [
      'ALL INDIA RANK 163',
      'Goldman Sachs Quant Finance 2024',
      '',
      'Highly competitive & prestigious hackathon.',
      'Field: Quantitative Finance & Data Science.',
      '',
      'Rankings determined by effectiveness of',
      'alpha-generation models developed.',
      '',
      'Built interest in:',
      '  · Data science & financial analytics',
      '  · Big data systems',
      '  · Quantitative modeling',
      '',
      'Gateway into analytical problem-solving.',
    ],
    projectLines: [
      'PROJECT: ALPHA-GENERATION STRATEGIES',
      '',
      'Created quantitative strategies for strong',
      'financial performance metrics.',
      '',
      'Work involved:',
      '  · Data analysis & quantitative modeling',
      '  · Strategy optimization',
      '  · Financial prediction systems',
      '  · Market-oriented data analysis',
      '  · Performance-driven algorithm design',
      '',
      'Starting point of my data science journey,',
      'leading to the SAS × HEC Montréal Hackathon.',
    ],
    tags: ['QUANT FINANCE', 'ALPHA GEN', 'MODELLING'],
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

  const Bg = hack.bgComponent;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 16px', boxSizing: 'border-box', gap: 8, position: 'relative', overflow: 'hidden' }}>
      {Bg && <Bg hueShift={hack.hueShift || 0} />}
      {/* scanlines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <span style={px({ fontSize: 10, color: YD })}>{hack.id}</span>
        <span style={px({ fontSize: 10, color: YD })}>{hack.domain}</span>
      </div>

      {/* sprite + title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1, position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: 40, lineHeight: 1, filter: `drop-shadow(0 0 8px ${Y})`, marginTop: 4 }}>{hack.sprite}</span>
        <div style={{ flex: 1 }}>
          <div style={px({ fontSize: 'clamp(22px, 4vw, 32px)', color: Y, lineHeight: 1.4, textShadow: `0 0 10px ${Y}66`, whiteSpace: 'pre-line' })}>
            {hack.name}
          </div>
          <div style={px({ fontSize: 'clamp(14px, 2.5vw, 18px)', color: hack.awardColor, textShadow: `0 0 8px ${hack.awardColor}`, marginTop: 12, display: 'flex', alignItems: 'baseline' })}>
            {hack.award.split(/(\d+)/).map((part, i) => (
              /\d+/.test(part) ? <span key={i} style={{ fontSize: '1.8em', paddingRight: 2 }}>{part}</span> : part
            ))}
          </div>
          <div style={px({ fontSize: 10, color: '#5a6', marginTop: 12 })}>{hack.year}</div>
        </div>
        {/* Optional logo(s) */}
        {(hack.image || hack.logos) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0, alignItems: 'center' }}>
            {hack.image && (
              <img src={hack.image} alt={hack.shortName} style={{ width: 110, height: 80, objectFit: 'contain', opacity: 0.9 }} />
            )}
            {hack.logos && hack.logos.map((logo, i) => (
              <img key={i} src={logo} alt={`logo-${i}`} style={{ width: 110, height: 36, objectFit: 'contain', opacity: 0.9 }} />
            ))}
          </div>
        )}
      </div>

      {/* description preview */}
      <div style={px({ fontSize: 12, color: '#8a9', lineHeight: 1.8, borderTop: '1px solid #2a3a00', paddingTop: 8, position: 'relative', zIndex: 2 })}>
        {hack.description.slice(0, 90)}…
      </div>

      {/* pagination + hint */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
        <span style={px({ fontSize: 9, color: '#3a4a00' })}>{String(idx + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={px({ fontSize: 7, color: blink ? YD : 'transparent', textAlign: 'right' })}>CLICK [A] FOR HACKATHON INFO</span>
          <span style={px({ fontSize: 7, color: blink ? YD : 'transparent', textAlign: 'right' })}>CLICK [B] FOR PROJECT INFO</span>
        </div>
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
  // [A] shows hackathon info, [B] shows project details
  const lines = isA ? (hack.hackathonLines || []) : (hack.projectLines || []);
  const accentColor = isA ? YD : GRN;
  const Bg = hack.bgComponent;

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px 14px', boxSizing: 'border-box', gap: 5, position: 'relative', overflow: 'hidden' }}
    >
      {/* Background */}
      {Bg && <Bg hueShift={hack.hueShift || 0} />}
      {/* Dark readability overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 1, pointerEvents: 'none' }} />
      {/* Scanlines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)', pointerEvents: 'none', zIndex: 10 }} />

      {/* Header bar */}
      <div style={{ background: accentColor, padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <span style={px({ fontSize: 9, color: '#000' })}>{title}</span>
        <span style={px({ fontSize: 9, color: '#000' })}>{hack.shortName} · {hack.year}</span>
      </div>

      {/* Content lines */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
        {lines.map((line, i) => {
          const isEmpty = line === '';
          const isTitle = i === 0;
          const isSubtitle = i === 1 && !isEmpty;
          return (
            <div
              key={i}
              style={px({
                fontSize: isTitle ? 13 : isSubtitle ? 11 : 10,
                color: isTitle ? accentColor : isSubtitle ? '#ccc' : '#a8c8a8',
                lineHeight: 1.7,
                letterSpacing: isTitle ? '0.1em' : '0.04em',
                height: isEmpty ? 6 : 'auto',
                textShadow: isTitle ? `0 0 8px ${accentColor}99` : 'none',
                fontWeight: isTitle ? 'bold' : 'normal',
              })}
            >
              {isEmpty ? '\u00a0' : line}
            </div>
          );
        })}
        <span style={{ opacity: blink ? 1 : 0, color: GRN, fontFamily: PX, fontSize: 10 }}>█</span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', position: 'relative', zIndex: 2, flexShrink: 0 }}>
        {hack.tags.map(t => (
          <span key={t} style={px({ fontSize: 7, background: isA ? '#2a2000' : '#0a2000', color: accentColor, padding: '2px 7px', border: `1px solid ${accentColor}55` })}>{t}</span>
        ))}
      </div>

      {/* Close hint */}
      <div style={px({ fontSize: 7, color: '#3a4a00', textAlign: 'right', position: 'relative', zIndex: 2, flexShrink: 0 })}>
        PRESS {isA ? '[A]' : '[B]'} TO CLOSE
      </div>
    </motion.div>
  );
};


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
        width: 52, height: 52,
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
      <span style={{ color: '#888', fontSize: 18, lineHeight: 1 }}>{icon}</span>
    </div>
  );
};

/* ─── action button (A / B) ──────────────────────────────────────────────── */
const ActionBtn = ({ label, color, onClick, subLabel, labelOffset = 0 }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <div
        className="clickable-gba"
        onMouseDown={() => { setPressed(true); gbaSound(label); onClick(); }}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          width: 72, height: 72,
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
        <span style={px({ fontSize: 15, color: '#000' })}>{label}</span>
      </div>
      <span style={px({ 
        fontSize: 8, 
        color: '#444', 
        letterSpacing: '0.15em',
        position: 'absolute', 
        top: 72 + labelOffset,
        whiteSpace: 'nowrap'
      })}>{subLabel}</span>
    </div>
  );
};

/* ─── speaker internals ──────────────────────────────────────────────────── */
const SpeakerInternals = ({ x, y }) => (
  <div style={{
    position: 'absolute',
    top: -y, left: -x,
    width: 66, height: 66,
    borderRadius: '50%',
    background: 'radial-gradient(circle, #333 0%, #1a1a1a 40%, #0a0a0a 70%, #000 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'inset 0 0 12px #000'
  }}>
    {/* Ribbed Cone Details */}
    <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.6)' }} />
    <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.4)' }} />
    <div style={{ position: 'absolute', inset: 15, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.2)' }} />
    
    {/* Copper Voice Coil Wires */}
    <div style={{ position: 'absolute', width: 2.5, height: 22, background: 'linear-gradient(90deg, #c87b3e, #e8a365, #c87b3e)', left: 18, top: 28, transform: 'rotate(25deg)', borderRadius: 1.5 }} />
    <div style={{ position: 'absolute', width: 2.5, height: 22, background: 'linear-gradient(90deg, #c87b3e, #e8a365, #c87b3e)', right: 18, top: 28, transform: 'rotate(-25deg)', borderRadius: 1.5 }} />

    {/* Center Dust Cap */}
    <div style={{ 
      width: 18, height: 18, 
      borderRadius: '50%', 
      background: 'radial-gradient(circle at 30% 30%, #666 0%, #222 60%, #000 100%)',
      boxShadow: '0 2px 5px rgba(0,0,0,0.8)',
      zIndex: 2
    }} />
  </div>
);

/* ─── speaker grille dots ────────────────────────────────────────────────── */
const Speaker = ({ side = 'right' }) => (
  <motion.div 
    initial="rest"
    whileHover="hover"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 12px)',
      gap: 6,
      transform: side === 'left' ? 'scaleX(-1)' : 'none',
      cursor: 'crosshair',
    }}
  >
    {Array.from({ length: 16 }).map((_, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = col * 18; // 12px width + 6px gap
      const y = row * 18;
      
      return (
        <div key={i} style={{ 
          width: 12, height: 12, 
          borderRadius: '50%', 
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: 'inset 2px 3px 5px rgba(0,0,0,0.9), 0 1px 2px rgba(255,255,255,0.08)',
          background: '#050505'
        }}>
          <motion.div
            variants={{
              rest: { opacity: 0.1, scale: 0.95 },
              hover: { opacity: 1, scale: 1 }
            }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            <SpeakerInternals x={x} y={y} />
          </motion.div>
        </div>
      );
    })}
  </motion.div>
);

/* ─── MAIN GBA COMPONENT ─────────────────────────────────────────────────── */
const Hackathons = () => {
  const [idx, setIdx]     = useState(0);
  const [mode, setMode]   = useState(null); // null | 'A' | 'B'
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = React.useRef(null);
  const wrapperRef = React.useRef(null);
  const [scale, setScale] = useState(1);
  const [consoleHeight, setConsoleHeight] = useState(480);
  const total = HACKS.length;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setConsoleHeight(entry.contentRect.height);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      let currentScale = 1;
      const availableWidth = window.innerWidth;
      
      // 1. Width constraint (scale down on mobile)
      const minBaseWidth = 720;
      if (availableWidth < minBaseWidth) {
        currentScale = availableWidth / minBaseWidth;
      }
      
      // 2. Height constraint (scale down if too tall for viewport)
      // Reserve space for padding and heading
      const availableHeight = window.innerHeight - 150; 
      if (consoleHeight > 0) {
        const projectedHeight = consoleHeight * currentScale;
        if (projectedHeight > availableHeight) {
          currentScale = availableHeight / consoleHeight;
        }
      }
      
      setScale(currentScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [consoleHeight]);


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
        backgroundColor: '#000',
        padding: 'clamp(24px, 4vw, 60px)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <style>{`
        @import url('${FONT_URL}');
        #hackathons::-webkit-scrollbar { width: 6px; background: #000; }
        #hackathons::-webkit-scrollbar-thumb { background: ${YD}; }
      `}</style>

      {/* ── AMBIENT LIGHTING ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(600px, 70vw, 1200px)',
        height: 'clamp(600px, 70vh, 1000px)',
        background: `radial-gradient(circle, ${Y}33 0%, ${Y}11 40%, transparent 70%)`,
        filter: 'blur(80px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

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
      <div 
        ref={wrapperRef} 
        style={{ 
          width: '100%', 
          maxWidth: 1200, 
          height: consoleHeight * scale, 
          display: 'flex', 
          justifyContent: 'center', 
          position: 'relative',
          zIndex: 2 
        }}
      >
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hide-blob-cursor"
          initial={{ opacity: 0, scale: scale * 0.92 }}
          animate={{ opacity: 1, scale: scale }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            transformOrigin: 'top center',
            width: 'clamp(680px, 90vw, 1180px)',
            background: `
            repeating-linear-gradient(to bottom, transparent 0px, transparent 12px, rgba(0,0,0,0.06) 12px, rgba(0,0,0,0.06) 13px, transparent 13px),
            linear-gradient(160deg, ${BODY2} 0%, ${BODY} 60%)
          `,
          borderRadius: '28px 28px 32px 32px',
          padding: '24px 32px 32px',
          boxSizing: 'border-box',
          boxShadow: `0 0 0 3px #0a0900, 0 0 0 5px #333, 0 12px 50px rgba(0,0,0,0.8), 0 0 60px ${Y}18`,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
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
            position: 'absolute', top: 22, left: 32,
            width: 10, height: 10, borderRadius: '50%',
            background: GRN,
            boxShadow: `0 0 8px ${GRN}`,
          }}
        />
        <span style={px({ position: 'absolute', top: 18, left: 50, fontSize: 8, color: GRN, opacity: 0.6 })}>PWR</span>

        {/* GBA logo area */}
        <span style={px({ position: 'absolute', top: 20, right: 32, fontSize: 9, color: '#444', letterSpacing: '0.15em' })}>
          GAME BOY<span style={{ color: Y }}> A</span>
        </span>

        {/* ── TOP ROW: D-pad | SCREEN | Action buttons ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3.5vw, 36px)', position: 'relative', zIndex: 3 }}>

          {/* ── D-PAD ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {/* Plastic Indentation */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 180, height: 180,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.15)',
                boxShadow: 'inset 3px 6px 12px rgba(0,0,0,0.8), inset -2px -2px 6px rgba(255,255,255,0.03), 1px 2px 2px rgba(255,255,255,0.05)',
                zIndex: -1,
                pointerEvents: 'none',
              }} />
              
              {/* Up */}
              <DKey label="W" icon="▲" onClick={() => navigate(-1)} />
              {/* Middle row */}
              <div style={{ display: 'flex', gap: 0 }}>
                <DKey label="A" icon="◀" onClick={() => navigate(-1)} />
                {/* center nub */}
                <div style={{ width: 52, height: 52, background: '#1a1a1a', border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#2a2a2a', border: '2px solid #111' }} />
                </div>
                <DKey label="D" icon="▶" onClick={() => navigate(1)} />
              </div>
              {/* Down */}
              <DKey label="S" icon="▼" onClick={() => navigate(1)} />
            </div>
            <span style={px({ fontSize: 8, color: '#444', marginTop: 28, letterSpacing: '0.15em' })}>W A S D</span>
          </div>

          {/* ── SCREEN ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {/* outer bezel */}
            <div style={{
              width: '100%',
              background: '#0a0a08',
              borderRadius: 12,
              padding: 6,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.9), 0 2px 0 #3a3820',
            }}>
              {/* screen frame */}
              <div style={{
                width: '100%',
                aspectRatio: '3/2.5',
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {/* Plastic labels above the enclosure */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, width: '100%', paddingRight: 4, marginBottom: 32 }}>
              <span style={px({ fontSize: 7, color: '#555', letterSpacing: '0.12em', whiteSpace: 'nowrap' })}>
                PRESS <span style={{ color: Y, opacity: 0.8 }}>[A]</span> FOR HACKATHON INFO
              </span>
              <span style={px({ fontSize: 7, color: '#555', letterSpacing: '0.12em', whiteSpace: 'nowrap' })}>
                PRESS <span style={{ color: GRN, opacity: 0.8 }}>[B]</span> FOR PROJECT INFO
              </span>
            </div>
          <div style={{ position: 'relative', width: 160, height: 120, flexShrink: 0 }}>
            {/* Plastic Indentation Pill */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 204, height: 104,
              transform: 'translate(-50%, -50%) rotate(-29deg)',
              borderRadius: 52,
              background: 'rgba(0,0,0,0.15)',
              boxShadow: 'inset 3px 6px 12px rgba(0,0,0,0.8), inset -2px -2px 6px rgba(255,255,255,0.03), 1px 2px 2px rgba(255,255,255,0.05)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
            {/* B — lower-left */}
            <div style={{ position: 'absolute', top: 48, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              <ActionBtn
                label="B"
                color={GRN}
                subLabel="PROJECT"
                labelOffset={44}
                onClick={() => setMode(m => m === 'B' ? null : 'B')}
              />
            </div>
            {/* A — upper-right */}
            <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              <ActionBtn
                label="A"
                color={Y}
                subLabel="INFO"
                labelOffset={44}
                onClick={() => setMode(m => m === 'A' ? null : 'A')}
              />
            </div>
          </div>
          </div>
        </div>

        {/* ── BOTTOM ROW: speaker | START/SELECT | speaker ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4, paddingBottom: 8, paddingLeft: 48, paddingRight: 48 }}>
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
