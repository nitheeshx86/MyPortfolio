import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emails = [
  { label: 'Academic / Preferred', email: 'nitheesh.k2024@vitstudent.ac.in' },
  { label: 'Personal / Direct', email: 'knitheesh0360@gmail.com' },
];

export default function ContactPopup({ isOpen, onClose }) {
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
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(15px)',
            padding: '20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40, rotateX: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40, rotateX: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            style={{
              backgroundColor: '#111',
              color: '#FFF',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '40px',
              padding: '60px 40px',
              position: 'relative',
              boxShadow: '0 0 100px rgba(255, 214, 1, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              perspective: '1000px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFF',
                fontSize: '18px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '10px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.5em',
                color: 'rgb(255, 214, 1)',
                marginBottom: '16px',
              }}>
                [ Initiation Channel ]
              </h2>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '28px',
                fontWeight: 800,
                marginBottom: '40px',
                letterSpacing: '-0.03em',
              }}>
                Let's talk about <br/> the future.
              </h3>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {emails.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}
                >
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'rgba(255, 255, 255, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                  }}>
                    {item.label}
                  </span>
                  <a
                    href={`mailto:${item.email}`}
                    style={{
                      fontSize: 'clamp(14px, 4vw, 20px)',
                      fontFamily: "'Times New Roman', serif",
                      fontStyle: 'italic',
                      color: '#FFF',
                      textDecoration: 'none',
                      position: 'relative',
                      paddingBottom: '4px',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'rgb(255, 214, 1)')}
                    onMouseLeave={(e) => (e.target.style.color = '#FFF')}
                  >
                    {item.email}
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'rgb(255, 214, 1)',
                        transformOrigin: 'left',
                      }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: '50px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.4)',
                fontFamily: "'Inter', sans-serif",
                fontStyle: 'italic',
              }}
            >
              Response time: Usually within 24 hours.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
