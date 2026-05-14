import React from 'react';

const CurvedLoop = ({ marqueeText, speed = 1.2, className = '' }) => {
  // Multiply the text to ensure a seamless infinite scroll along the path
  const fullText = `${marqueeText} ${marqueeText} ${marqueeText} ${marqueeText}`;

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <svg
        viewBox="0 0 500 500"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* The corner arc path:
            M -50 200: Starts off-screen on the Left edge.
            Q 200 450: Pulls the curve deep into the bottom-left corner.
            500 550: Exits off-screen on the Bottom edge.
          */}
          <path
            id="corner-curve"
            d="M -50 200 Q 200 450 500 550"
            fill="transparent"
          />
        </defs>

        <text
          fontSize="42"
          fontFamily="'Inter', sans-serif"
          fontWeight="900"
          fill="#fff"
          letterSpacing="0.05em"
        >
          <textPath href="#corner-curve" startOffset="0%">
            {fullText}
            {/* Native SVG animation for buttery smooth looping */}
            <animate
              attributeName="startOffset"
              from="0%"
              to="-100%"
              begin="0s"
              dur={`${30 / speed}s`}
              repeatCount="indefinite"
            />
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedLoop;