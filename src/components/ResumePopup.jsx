import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const resumes = [
  { label: 'General', file: 'Nitheesh_General.pdf' },
  { label: 'Consultancy', file: 'Nitheesh_Consultancy.pdf' },
  { label: 'Product Management', file: 'Nitheesh_PM_Intern_A4.pdf' },
  { label: 'Automotive', file: 'Nitheesh_Resume_Automotive.pdf' },
  { label: 'Social Impact / NGO / Service', file: 'Nitheesh_Resume_Social_Impact.pdf' },
];

export default function ResumePopup({ isOpen, onClose }) {
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '20px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              backgroundColor: '#FFF',
              color: '#000',
              width: '100%',
              maxWidth: '560px',
              borderRadius: '24px',
              padding: '40px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#000',
                opacity: 0.5,
                transition: 'opacity 0.2s',
                padding: '10px',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.5)}
            >
              ✕
            </button>

            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              marginBottom: '16px',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
            }}>
              A resume works best when it’s tailored to the role. 
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.6)',
              marginBottom: '32px',
            }}>
              Pick the version most relevant to what you’re looking for!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {resumes.map((resume, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    backgroundColor: '#F5F5F7',
                    transition: 'transform 0.2s, background-color 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFEFEF';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5F5F7';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#000',
                  }}>
                    {resume.label}
                  </span>
                  <a
                    href={`/Resume/${resume.file}`}
                    download={resume.file}
                    style={{
                      backgroundColor: '#000',
                      color: '#FFF',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#333')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#000')}
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
