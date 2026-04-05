import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, useTransform } from 'framer-motion';

const RotatingAward = ({ scrollProgress }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Base auto-rotation + scroll-driven rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5 + scrollProgress * Math.PI * 4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Cup */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[1.5, 1, 2, 32]} />
          <meshStandardMaterial color="#FFD601" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handles */}
        <mesh position={[-1.6, 1.8, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.6, 0.15, 16, 32]} />
          <meshStandardMaterial color="#FFB800" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.6, 1.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.6, 0.15, 16, 32]} />
          <meshStandardMaterial color="#FFB800" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
          <meshStandardMaterial color="#FFD601" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1.2, 1.5, 0.5, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

const AwardCard = ({ title, organization, year }) => (
  <div style={{
    width: '350px',
    flexShrink: 0,
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }}>
    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#FFD601', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
      {year}
    </span>
    <h3 style={{ fontFamily: "serif", fontSize: '2.5rem', color: '#fff', margin: 0, lineHeight: 1.1 }}>
      {title}
    </h3>
    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {organization}
    </p>
  </div>
);

const Awards = ({ horizontalProgress = 0 }) => {
  // Since we are receiving a number from state, we calculate the x offset manually.
  // motion.div will still handle the animation smoothly.
  const xOffset = (horizontalProgress < 0.1) ? 0 : (horizontalProgress > 0.9) ? -2000 : ((horizontalProgress - 0.1) / 0.8) * -2000;

  const awards = [
    { title: "National Finalist", organization: "Smart India Hackathon", year: "2023" },
    { title: "First Place", organization: "IBM Qiskit Fall Fest", year: "2022" },
    { title: "Second Place", organization: "HACKVIT 2023", year: "2023" },
    { title: "Top 10 Team", organization: "Hack This Fall", year: "2024" },
    { title: "Best Domain Award", organization: "Devfest 23", year: "2023" }
  ];

  return (
    <section style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#000',
      overflow: 'hidden'
    }}>
      {/* 3D Background Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FFD601" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <RotatingAward scrollProgress={horizontalProgress} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '15vw' 
      }}>
        <div style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
          
          {/* Section Title */}
          <div style={{ marginRight: '100px' }}>
             <h2 style={{
               fontFamily: "'Inter', sans-serif",
               fontWeight: 900,
               fontSize: '12vw',
               color: '#fff',
               opacity: 0.05,
               position: 'absolute',
               top: '10%',
               left: '5vw',
               lineHeight: 1,
               margin: 0,
               pointerEvents: 'none'
             }}>
               AWARDS
             </h2>
             <div style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '11px', 
                color: '#FFD601', 
                letterSpacing: '0.5em', 
                textTransform: 'uppercase',
                transform: 'rotate(-90deg)',
                transformOrigin: 'left bottom',
                marginBottom: '100px'
             }}>
                Visions & Victories
             </div>
          </div>

          {/* Awards Horizontal List */}
          <motion.div 
            style={{ 
               display: 'flex', 
               gap: '60px',
               paddingRight: '20vw',
                x: xOffset
            }}
          >
             {awards.map((award, i) => (
                <AwardCard key={i} {...award} />
             ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Awards;
