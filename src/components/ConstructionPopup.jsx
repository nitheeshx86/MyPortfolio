import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConstructionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after a small delay to let landing fade in
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483647,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(12px)',
            padding: '20px',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 120,
              mass: 1
            }}
            style={{
              backgroundColor: '#FFD601',
              color: '#000',
              width: '100%',
              maxWidth: '480px',
              borderRadius: '32px',
              boxShadow: '0 24px 48px -12px rgba(0,0,0,0.25)',
              padding: '60px 40px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Background Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
            }} />

            {/* Friendly Icon (Smiling face) */}
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                marginBottom: '16px',
                fontSize: '48px'
              }}
            >
              👋
            </motion.div>

            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(20px, 4vw, 26px)',
              fontWeight: 800,
              marginBottom: '12px',
              letterSpacing: '-0.01em',
            }}>
              Hey there!
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              lineHeight: 1.6,
              color: 'rgba(0, 0, 0, 0.7)',
              marginBottom: '32px',
              maxWidth: '320px',
            }}>
              Just a quick heads up: the site is still <b>under construction</b> and is <b>definitely not</b> made for mobile phones yet. <br/><br/>
              For the best experience, grab a laptop! 💻
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDismiss}
              style={{
                backgroundColor: '#000',
                color: '#FFF',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
              }}
            >
              Got it, let's go!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
