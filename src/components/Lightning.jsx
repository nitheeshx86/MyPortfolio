import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Bolt({ boltKey }) {
  // Generate a random jagged path for the lightning bolt
  const generatePath = (isBranch = false) => {
    const startX = Math.random() * 80 + 10; // Between 10% and 90%
    let path = `M ${startX},0`;
    let currentX = startX;
    const segments = isBranch ? 4 : 8;
    for (let i = 1; i <= segments; i++) {
        currentX += (Math.random() - 0.5) * (isBranch ? 20 : 40); // More jagged movement for main
        path += ` L ${currentX},${(100 / segments) * i}`;
    }
    return path;
  };

  const [mainPath] = useState(generatePath(false));
  const [branchPath] = useState(generatePath(true));

  return (
    <motion.svg
      key={boltKey}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0.8, 1, 0],
      }}
      transition={{ 
        duration: 0.25,
        times: [0, 0.4, 0.6, 0.8, 1],
        ease: "easeOut"
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
        filter: "drop-shadow(0 0 15px #fff) drop-shadow(0 0 5px #000)"
      }}
    >
      <motion.path
        d={mainPath}
        fill="transparent"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.path
        d={branchPath}
        fill="transparent"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="1.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.15, delay: 0.05 }}
      />
    </motion.svg>
  );
}

export default function Lightning({ isAudioOn }) {
  const [bolts, setBolts] = useState([]);

  useEffect(() => {
    if (!isAudioOn) return;

    const interval = setInterval(() => {
      // 70% chance every 800ms
      if (Math.random() > 0.3) {
        const id = Date.now();
        setBolts(prev => [...prev, id]);
        
        // Remove after animation done
        setTimeout(() => {
          setBolts(prev => prev.filter(b => b !== id));
        }, 400);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isAudioOn]);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 10,
      pointerEvents: "none",
      overflow: "hidden"
    }}>
      <AnimatePresence>
        {bolts.map(id => (
          <Bolt key={id} boltKey={id} />
        ))}
      </AnimatePresence>
    </div>
  );
}
