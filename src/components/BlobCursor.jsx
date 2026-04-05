import React, { useEffect, useRef } from "react";

const NUM_POINTS = 12;
const BASE_R = 110;

function buildBlobPath(points) {
  const n = points.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    if (i === 0) d += `M ${p1.x},${p1.y} `;
    d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
  }
  return d + "Z";
}

function getPoints(t, vx = 0, vy = 0) {
  const speed = Math.sqrt(vx * vx + vy * vy);
  // Cap the stretch limit so it doesn't break entirely on fast mouse jerks
  const stretch = Math.min(speed * 0.4, 60); 
  const moveAngle = speed > 0.1 ? Math.atan2(vy, vx) : 0;

  return Array.from({ length: NUM_POINTS }, (_, i) => {
    const angle = (i / NUM_POINTS) * Math.PI * 2;
    const r =
      BASE_R
      + 28 * Math.sin(t * 0.7  + i * 1.3)
      + 18 * Math.cos(t * 1.1  + i * 2.1)
      + 12 * Math.sin(t * 1.9  + i * 0.8)
      +  8 * Math.cos(t * 2.7  + i * 3.4)
      +  5 * Math.sin(t * 3.5  + i * 1.7);
    
    let x = Math.cos(angle) * r;
    let y = Math.sin(angle) * r;

    // Apply directional warp if interacting
    if (speed > 0.1) {
      const angleDiff = angle - moveAngle;
      const align = Math.cos(angleDiff);
      
      // Pull points forward and backward along movement vector
      x += Math.cos(moveAngle) * stretch * align;
      y += Math.sin(moveAngle) * stretch * align;
      
      // Squish perpendicular sides inward to preserve volume appearance
      const sideShrink = Math.abs(Math.sin(angleDiff));
      x -= Math.cos(angle) * (stretch * 0.5) * sideShrink;
      y -= Math.sin(angle) * (stretch * 0.5) * sideShrink;
    }

    return { x, y };
  });
}

export default function BlobCursor() {
  const blobRef = useRef(null);
  const pathRef = useRef(null);
  const posRef = useRef({ x: -300, y: -300 });
  const lerpRef = useRef({ x: -300, y: -300 });
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(1);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      
      // Determine if we are hovering a clickable element or a section that should hide the blob
      if (e.target.closest('.hide-blob-cursor')) {
        targetScaleRef.current = 0;
      } else if (e.target.closest('a, button, [role="button"], .clickable-gba')) {
        targetScaleRef.current = 0.04;
      } else {
        targetScaleRef.current = 1;
      }
    };
    
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    let raf;
    let t = 0;

    const tick = () => {
      t += 0.018;

      // Calculate velocity vector distance
      const vx = posRef.current.x - lerpRef.current.x;
      const vy = posRef.current.y - lerpRef.current.y;

      // Smooth follow
      lerpRef.current.x += vx * 0.1;
      lerpRef.current.y += vy * 0.1;
      
      // Smooth scale
      currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.15;

      if (blobRef.current) {
        // Offset by 150px because the SVG is 300x300 and we want the mouse perfectly in the center.
        blobRef.current.style.transform =
          `translate(${lerpRef.current.x - 150}px, ${lerpRef.current.y - 150}px) scale(${currentScaleRef.current})`;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildBlobPath(getPoints(t, vx, vy)));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={blobRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        pointerEvents: "none",
        mixBlendMode: "difference",
        zIndex: 50000000,
        willChange: "transform",
        transformOrigin: "center center",
        transform: "translate(-300px, -300px)",
      }}
    >
      <svg
        width="300" height="300"
        viewBox="-150 -150 300 300"
        style={{ overflow: "visible" }}
      >
        <path ref={pathRef} fill="white" />
      </svg>
    </div>
  );
}
