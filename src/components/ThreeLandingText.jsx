import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const cedarvilleUrl = "https://fonts.gstatic.com/s/cedarvillecursive/v18/yYL00g_a2veiudhUmxjo5VKkoqA-B_neJQ.ttf";
const interBlackUrl = "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf";

function TraversingSpaceText({ text, speed = 50 }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % text.length);
    }, speed);
    return () => clearInterval(interval);
  }, [text.length, speed]);

  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i} style={{ opacity: i === idx ? 0 : 1 }}>
          {char}
        </span>
      ))}
    </>
  );
}

function TextGroup() {
  const groupRef = useRef();
  const titleRef = useRef();
  const subTopRef = useRef();
  const subBottomRef = useRef();
  const { viewport } = useThree();

  // Smoothing states for velocity
  const smoothedVelocity = useRef(new THREE.Vector2(0, 0));
  const previousMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // Current mouse pos
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Calculate instantaneous velocity
    const vx = (mouseX - previousMouse.current.x) / delta;
    const vy = (mouseY - previousMouse.current.y) / delta;

    previousMouse.current.set(mouseX, mouseY);

    // Smooth the velocity so the spring is organic
    smoothedVelocity.current.lerp(new THREE.Vector2(vx, vy), 0.1);

    // Make the effect subtle and refined
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    // Very subtle rotation based on velocity
    const targetRotX = clamp(smoothedVelocity.current.y * 0.2, -0.15, 0.15);
    const targetRotY = clamp(smoothedVelocity.current.x * 0.2, -0.15, 0.15);

    // Apply Lerped effects to Group
    if (groupRef.current) {
      // Subtle positional parallax tracking instead of flying across the screen
      groupRef.current.position.lerp(new THREE.Vector3(mouseX * 0.15, mouseY * 0.15, 0), 0.05);

      // Update rotations for wind-like sway
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotX, 0.1);
    }

    // Scale texts slightly if moving fast (like a stretched blur)
    const stretchX = clamp(1 + Math.abs(smoothedVelocity.current.x) * 0.05, 1, 1.2);
    const stretchY = clamp(1 - Math.abs(smoothedVelocity.current.x) * 0.02, 0.8, 1);

    if (titleRef.current) {
      titleRef.current.scale.lerp(new THREE.Vector3(stretchX, stretchY, 1), 0.1);
    }
  });

  // Calculate proportional font sizing based on viewport to match original CSS
  // Reduced sizes as per user request
  const titleSize = Math.min(viewport.width * 0.1, 1.8);
  const subSizeTop = Math.min(viewport.width * 0.028, 0.35);
  const subSizeBottom = Math.min(viewport.width * 0.02, 0.28);

  return (
    <>
      <group ref={groupRef}>
        <Text
          ref={subTopRef}
          font={cedarvilleUrl}
          fontSize={subSizeTop}
          position={[0, titleSize * 0.8, 0]}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          You have arrived at the portfolio of
        </Text>

        <Text
          ref={titleRef}
          font={interBlackUrl}
          fontSize={titleSize}
          position={[0, 0, 0]}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          NITHEESH
        </Text>

        <Text
          ref={subBottomRef}
          font={cedarvilleUrl}
          fontSize={subSizeBottom}
          position={[0, -titleSize * 0.65, 0]}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          maxWidth={viewport.width * 0.8}
          textAlign="center"
        >
          feel free to explore what I do and a few about myself
        </Text>
      </group>

      {/* Button fixed dynamically to the center bottom. Outside groupRef so it's static. */}
      {/* We position it beneath the last descriptive text line */}
      <Html position={[0, -titleSize * 1.6, 0]} center transform scale={0.32}>
        <a href="#resume" className="resume-pill">Resume</a>
      </Html>

      {/* Static Paragraph Passage - Pushed further to the left edge and slightly higher */}
      {/* -viewport.width / 2 is the exact left screen bound. We use a smaller offset to get closer to the border. */}
      <Html position={[(-viewport.width / 2) + 0.25, -titleSize * 0.1, 0]}>
        <div className="static-passage">
          <TraversingSpaceText
            text="Every minute is a gift you did not ask for // and cannot return. [◇] I am chasing a life that feels as good on a quiet Tuesday — as it does on the day something ships. + Work that would pull me in even if it paid nothing. △ People who make the ordinary moments worth showing up for. ×"
            speed={80}
          />
        </div>
      </Html>

      {/* Static Paragraph Passage - Pushed to the right edge and top */}
      {/* viewport.width / 2 is the exact right screen bound. We use translateX(-100%) to align its right edge. */}
      <Html position={[(viewport.width / 2) - 0.25, titleSize * 0.8, 0]}>
        <div className="static-passage" style={{ transform: 'translateX(-100%)' }}>
          <TraversingSpaceText
            text="A 19 year old [ builder // researcher ] & certified quantum yapper from Chennai. + Just trying to make things that matter. ◇"
            speed={80}
          />
        </div>
      </Html>
    </>
  );
}

export default function ThreeLandingText() {
  return (
    <>
      <style>{`
        .resume-pill {
          background-color: transparent;
          border: 1px solid #FFF;
          color: #FFF;
          padding: 6px 16px;
          border-radius: 9999px;
          font-family: 'Arial', sans-serif;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          pointer-events: auto;
        }
        .resume-pill:hover {
          background-color: #000;
          border-color: #000;
          color: #FFF;
        }
        .static-passage {
          width: 150px;
          font-family: 'Arial', sans-serif;
          font-size: 8px; /* Slightly smaller for more lines */
          font-weight: 500;
          line-height: 2.1;
          color: rgba(0, 0, 0, 0.75);
          text-align: justify;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          pointer-events: none;
          hyphens: auto;
          word-spacing: -0.05em;
        }
      `}</style>
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 12 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
          eventSource={typeof window !== 'undefined' ? document.body : undefined}
        >
          <ambientLight intensity={1} />
          <TextGroup />
        </Canvas>
      </div>
    </>
  );
}
