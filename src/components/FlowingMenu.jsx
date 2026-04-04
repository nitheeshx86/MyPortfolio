import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

function FlowingMenu({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#000',
  marqueeBgColor = 'rgb(255, 214, 1)',
  marqueeTextColor = '#000',
  borderColor = 'rgba(255, 255, 255, 0.1)'
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div style={{ 
      width: "100%", 
      height: "55vh", 
      overflow: "visible", 
      backgroundColor: bgColor, 
      borderTop: `1px solid ${borderColor}`, 
      borderBottom: `1px solid ${borderColor}`,
      display: "flex",
      position: "relative"
    }}>
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", margin: 0, padding: 0 }}>
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
            onHoverStart={() => setHoveredIdx(idx)}
            onHoverEnd={() => setHoveredIdx(null)}
          />
        ))}
      </nav>

      {/* REVEAL BOX (Side Information) */}
      <div style={{ 
        position: "absolute", 
        left: "100%", 
        top: 0, 
        bottom: 0, 
        width: "50vw", 
        display: "flex", 
        alignItems: "stretch", // Ensure it stretches to full height
        paddingLeft: "8vw",
        zIndex: 100
      }}>
        <AnimatePresence mode="wait">
          {hoveredIdx !== null && (
            <motion.div
              key={hoveredIdx} // Key ensures fresh animation for each item
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundColor: "#FFF",
                color: "#000",
                padding: "clamp(2rem, 5vw, 6rem)",
                borderRadius: "0",
                boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxSizing: "border-box"
              }}
            >
              <p style={{ 
                fontSize: "clamp(1.2rem, 1.8vw, 2.4rem)", 
                lineHeight: "1.25", 
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.03em"
              }}>
                {items[hoveredIdx].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MenuItem({ 
  link, text, image, speed, textColor, 
  marqueeBgColor, marqueeTextColor, borderColor, 
  isFirst, onHoverStart, onHoverEnd 
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part');
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = ev => {
    onHoverStart();
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%', opacity: 1 }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    onHoverEnd();
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div
      ref={itemRef}
      style={{ 
        flex: 1, 
        position: "relative", 
        overflow: "hidden", 
        textAlign: "center", 
        borderTop: isFirst ? 'none' : `1px solid ${borderColor}` 
      }}
    >
      <a
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "100%",
          position: "relative",
          cursor: "pointer",
          textTransform: "uppercase",
          textDecoration: "none",
          fontWeight: 900,
          fontSize: "3.5vh",
          color: textColor,
          fontFamily: "'Inter', 'Arial', sans-serif",
          letterSpacing: "-0.01em",
          paddingLeft: "2rem"
        }}
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        ref={marqueeRef}
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          overflow: "hidden", 
          pointerEvents: "none", 
          transform: "translateY(101%)",
          backgroundColor: marqueeBgColor 
        }}
      >
        <div style={{ height: "100%", width: "max-content", display: "flex" }} ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part" key={idx} style={{ display: "flex", alignItems: "center", flexShrink: 0, color: marqueeTextColor }}>
              <span style={{ whiteSpace: "nowrap", textTransform: "uppercase", fontWeight: 900, fontSize: "4vh", lineHeight: 1, padding: "0 2vw" }}>{text}</span>
              <div
                style={{ 
                  width: "160px", 
                  height: "6vh", 
                  margin: "1vh 2vw", 
                  borderRadius: "40px", 
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(100%) brightness(0.8)"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
