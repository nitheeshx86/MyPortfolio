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

    if (speed > 0.1) {
      const angleDiff = angle - moveAngle;
      const align = Math.cos(angleDiff);
      x += Math.cos(moveAngle) * stretch * align;
      y += Math.sin(moveAngle) * stretch * align;
      const sideShrink = Math.abs(Math.sin(angleDiff));
      x -= Math.cos(angle) * (stretch * 0.5) * sideShrink;
      y -= Math.sin(angle) * (stretch * 0.5) * sideShrink;
    }

    return { x, y };
  });
}

// ─── Proximity detection ──────────────────────────────────────────────────────
// The blob starts shrinking when the cursor is within PROXIMITY_RADIUS pixels
// of any clickable element — not just when hovering it exactly.
// This gives users a much wider "warning zone" before the blob fully contracts.
const PROXIMITY_RADIUS = 80;
const CLICKABLE_SELECTOR = 'a, button, [role="button"], input, label, select, textarea, .clickable-gba';

function nearClickable(cx, cy) {
  const els = document.querySelectorAll(CLICKABLE_SELECTOR);
  for (const el of els) {
    if (el.closest('.hide-blob-cursor')) continue;
    const rect = el.getBoundingClientRect();
    // Nearest point on the bounding rect to the cursor
    const nearX = Math.max(rect.left, Math.min(cx, rect.right));
    const nearY = Math.max(rect.top,  Math.min(cy, rect.bottom));
    if (Math.hypot(cx - nearX, cy - nearY) < PROXIMITY_RADIUS) return true;
  }
  return false;
}

export default function BlobCursor() {
  const blobRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef  = useRef(null);
  const posRef  = useRef({ x: -300, y: -300 });
  const lerpRef = useRef({ x: -300, y: -300 });
  const velRef  = useRef({ x: 0, y: 0 });
  const targetScaleRef  = useRef(1);
  const currentScaleRef = useRef(1);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (e.target.closest('.hide-blob-cursor')) {
        hiddenRef.current = true;
        targetScaleRef.current = 0;
      } else {
        hiddenRef.current = false;
        // Shrink to 30% when near a clickable — visible enough to still guide the
        // user, but small enough to clearly signal "you're close to something".
        targetScaleRef.current = nearClickable(e.clientX, e.clientY) ? 0.30 : 1;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let raf;
    let t = 0;

    const tick = () => {
      t += 0.018;

      const rawVx = posRef.current.x - lerpRef.current.x;
      const rawVy = posRef.current.y - lerpRef.current.y;

      velRef.current.x += (rawVx - velRef.current.x) * 0.12;
      velRef.current.y += (rawVy - velRef.current.y) * 0.12;

      lerpRef.current.x += rawVx * 0.11;
      lerpRef.current.y += rawVy * 0.11;

      currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.15;

      if (blobRef.current) {
        blobRef.current.style.transform =
          `translate(${lerpRef.current.x - 150}px, ${lerpRef.current.y - 150}px) scale(${currentScaleRef.current})`;
      }

      // Crosshair dot — always at the TRUE cursor position (no lag).
      // Only visible when the blob has shrunk, so users always see exactly
      // where the click will land.
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
        const showDot = currentScaleRef.current < 0.8 && !hiddenRef.current;
        dotRef.current.style.opacity = showDot ? '1' : '0';
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildBlobPath(getPoints(t, velRef.current.x, velRef.current.y)));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
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

      {/* Crosshair dot — snaps to true cursor; only shown when blob is shrunk */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "white",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 50000001,
          opacity: 0,
          transition: "opacity 0.15s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
