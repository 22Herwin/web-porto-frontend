import React from 'react';

type EdgePosition = 'top' | 'bottom' | 'both';

type Props = {
  height?: number | string;
  fillColor?: string;
  shadowColor?: string;
  roughness?: number;
  position?: EdgePosition;
  className?: string;
  depth?: number; // how torn the edge appears
};

export default function RippedEdge({
  height = 120,
  fillColor = 'var(--paper-bg, #fff)',
  shadowColor = 'rgba(0, 0, 0, 0.08)',
  roughness = 8,
  position = 'bottom',
  depth = 1.4,
  className = '',
}: Props) {
  const d = `
    M0,${50 * depth}
    C100,${80 * depth} 200,${20 * depth} 300,${50 * depth}
    C400,${70 * depth} 500,${10 * depth} 600,${50 * depth}
    C700,${90 * depth} 800,${30 * depth} 900,${50 * depth}
    C1000,${70 * depth} 1100,${20 * depth} 1200,${50 * depth}
    L1200,100 L0,100 Z
  `;

  const isTop = position === 'top' || position === 'both';
  const isBottom = position === 'bottom' || position === 'both';

  return (
    <>
      {isTop && (
        <div
          className={`ripped-wrap ${className}`}
          style={{
            height: typeof height === 'number' ? `${height}px` : height,
            top: 0,
            bottom: 'auto',
            transform: 'rotate(180deg)',
          }}
        >
          <RippedSVG d={d} fillColor={fillColor} shadowColor={shadowColor} roughness={roughness} />
        </div>
      )}

      {isBottom && (
        <div
          className={`ripped-wrap ${className}`}
          style={{
            height: typeof height === 'number' ? `${height}px` : height,
            bottom: 0,
          }}
        >
          <RippedSVG d={d} fillColor={fillColor} shadowColor={shadowColor} roughness={roughness} />
        </div>
      )}
    </>
  );
}

function RippedSVG({
  d,
  fillColor,
  shadowColor,
  roughness,
}: {
  d: string;
  fillColor: string;
  shadowColor: string;
  roughness: number;
}) {
  return (
    <svg
      className="ripped-svg"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* texture */}
        <filter id="ripped-texture" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence baseFrequency="0.5" numOctaves="3" seed="8" result="turb" />
          <feDisplacementMap in="SourceGraphic" in2="turb" scale={roughness * 2} />
        </filter>

        {/* paper shadow */}
        <filter id="ripped-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feOffset dy="4" />
          <feBlend in="SourceGraphic" in2="blur" mode="normal" />
        </filter>
      </defs>

      {/* shadow */}
      <path d={d} fill={shadowColor} filter="url(#ripped-shadow)" transform="translate(0,3)" />

      {/* main paper */}
      <path d={d} fill={fillColor} filter="url(#ripped-texture)" />

      {/* highlight edge */}
      <path
        d={d.replace(/L1200,100 L0,100 Z/, '')}
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />
    </svg>
  );
}
