import React, { useState, useEffect } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState('entering'); // 'entering', 'visible', 'exiting', 'done'
  const NUM_BARS = 11;

  useEffect(() => {
    // Sequence timing
    const enterTimer = setTimeout(() => setPhase('visible'), 1500); // Wait for enter animation
    const exitTimer = setTimeout(() => setPhase('exiting'), 2500);  // Start exit
    const doneTimer = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 4000); // Complete

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  // Blue shades from top (lighter) to bottom (darker) matching the image
  const colors = [
    '#2544e9',
    '#223de0',
    '#1f36d7',
    '#1c2fce',
    '#1828c5',
    '#1521bc',
    '#121ab3',
    '#0f13aa',
    '#0c0ca1',
    '#090598',
    '#06008f'
  ];

  return (
    <div className={`loader-container ${phase}`}>
      {Array.from({ length: NUM_BARS }).map((_, i) => (
        <div 
          key={i} 
          className="loader-bar"
          style={{
            backgroundColor: colors[i % colors.length],
            // Stagger animations based on index
            animationDelay: `${i * 0.08}s`
          }}
        />
      ))}
    </div>
  );
}
