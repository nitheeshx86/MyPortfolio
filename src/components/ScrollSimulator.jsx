import React from 'react';
import { motion } from 'framer-motion';

const ScrollSimulator = ({ scrollY, sections }) => {
  // Determine current section
  const currentSectionIdx = sections.findIndex(s => scrollY >= s.start && scrollY < s.end);
  const currentSection = sections[currentSectionIdx];
  
  // Overall progress for professional block
  const blockStart = sections[0]?.start || 0;
  const blockEnd = sections[sections.length - 1]?.end || 10000;
  const totalProgress = Math.max(0, Math.min((scrollY - blockStart) / (blockEnd - blockStart), 1));

  // Determine if we are in the "Professional" block
  const isActive = scrollY >= blockStart && scrollY <= blockEnd;
  const isAdditional = scrollY > blockEnd;

  return (
    <motion.div
      animate={{ opacity: isActive || isAdditional ? 1 : 0 }}
      style={{
        position: 'fixed',
        left: '48px', // Positioned just inside the 16px border with some breathing room
        top: '180px',
        bottom: '180px',
        width: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1001,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Active Fill */}
      <motion.div
        animate={{ height: `${totalProgress * 100}%` }}
        style={{
          width: '2px', // Slightly thicker for active
          marginLeft: '-0.5px', // Center on the 1px line
          backgroundColor: isAdditional ? 'rgba(255,255,255,0.3)' : 'rgb(255, 214, 1)',
          transformOrigin: 'top',
          boxShadow: isAdditional ? 'none' : '0 0 10px rgba(255, 214, 1, 0.5)'
        }}
      />

      {/* Dynamic Label */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}>
        <motion.div
          animate={{ 
            y: `${totalProgress * 100}%`, 
            rotate: -90 
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            transformOrigin: 'left center', // Rotate around the start of the text
            position: 'absolute',
            left: '6px', // Tighter to the line
            marginTop: '-1px', // Fine-tune vertical alignment to center on the 100% point
            x: '-50%' // Shift so the center of the text block is at the progress point
          }}
        >
          <span style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: isAdditional ? 'rgba(255,255,255,0.4)' : 'rgb(255, 214, 1)',
            fontWeight: 900
          }}>
            {isAdditional ? '[ ADDITIONAL DETAILS ]' : (currentSection ? `[ ${currentSection.name} ]` : '')}
          </span>
          <span style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '8px',
            opacity: 0.4,
            color: '#FFF',
            fontWeight: 600
          }}>
            {Math.round(totalProgress * 100)}%
          </span>
        </motion.div>
      </div>

      {/* Section Markers */}
      {sections.map((s, i) => {
        const pos = ((s.start - blockStart) / (blockEnd - blockStart)) * 100;
        return (
          <div key={i} style={{
            position: 'absolute',
            top: `${pos}%`,
            left: '-4px',
            width: '9px',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.2)'
          }} />
        );
      })}
    </motion.div>
  );
};

export default ScrollSimulator;

