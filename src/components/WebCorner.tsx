import React from 'react';

type WebPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type WebVariant  = 'dark' | 'light';

interface WebCornerProps {
  /** Which corner of the parent section to attach to. Default: 'top-left' */
  position?: WebPosition;
  /** 'dark' for dark-background sections (cream stroke), 'light' for off-white sections (near-black stroke). */
  variant?: WebVariant;
  /** Override the default stroke opacity (0-1). */
  opacity?: number;
}

/**
 * WebCorner — SVG spider-web decorative element.
 *
 * The SVG is authored as a top-left corner web (origin 0,0).
 * Other positions are achieved with CSS scale transforms so the same
 * path data is reused without duplication.
 *
 * Parent section MUST have:
 *   position: relative  (so absolute positioning works)
 *   overflow: hidden    (so the web doesn't extend outside the section)
 *
 * The web always sits at z-index 0. Content containers should use
 * relative z-10 or higher to stay visually above.
 */
export const WebCorner: React.FC<WebCornerProps> = ({
  position = 'top-left',
  variant  = 'dark',
  opacity,
}) => {
  const strokeColor   = variant === 'dark' ? '#fdf3f2' : '#1a1a1a';
  const strokeOpacity = opacity ?? (variant === 'dark' ? 0.13 : 0.09);

  /* Mirror transform — origin is always the corner */
  const svgTransform = (() => {
    switch (position) {
      case 'top-right':    return 'scaleX(-1)';
      case 'bottom-left':  return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1,-1)';
      default:             return 'none';
    }
  })();

  /* Absolute positioning inside the section */
  const positionStyle: React.CSSProperties = (() => {
    switch (position) {
      case 'top-left':     return { top: 0, left: 0 };
      case 'top-right':    return { top: 0, right: 0 };
      case 'bottom-left':  return { bottom: 0, left: 0 };
      case 'bottom-right': return { bottom: 0, right: 0 };
    }
  })();

  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none w-24 h-24 sm:w-40 sm:h-40 lg:w-60 lg:h-60"
      style={{ ...positionStyle, zIndex: 0 }}
    >
      <svg
        viewBox="0 0 260 260"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-hidden="true"
        focusable="false"
        style={{ transform: svgTransform, display: 'block' }}
      >
        <g
          stroke={strokeColor}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={strokeOpacity}
        >
          {/*
            ── RADIAL SPOKES ─────────────────────────────────────────────
            Seven spokes from corner (0,0), fanning from ~4° to ~86°.
            Slightly irregular lengths give an organic, hand-drawn feel.
          */}
          <line x1="0" y1="0" x2="242" y2="18" />   {/* ~4°  */}
          <line x1="0" y1="0" x2="222" y2="72" />   {/* ~18° */}
          <line x1="0" y1="0" x2="196" y2="124" />  {/* ~32° */}
          <line x1="0" y1="0" x2="170" y2="170" />  {/* ~45° */}
          <line x1="0" y1="0" x2="124" y2="196" />  {/* ~58° */}
          <line x1="0" y1="0" x2="72"  y2="222" />  {/* ~72° */}
          <line x1="0" y1="0" x2="18"  y2="242" />  {/* ~86° */}

          {/*
            ── CONCENTRIC ARC RINGS ───────────────────────────────────────
            Four rings connecting adjacent spoke endpoints.
            Each segment is a quadratic bezier (Q) with control point
            pulled slightly inward to create a subtle inward curve,
            mimicking the natural sag of real spider-web silk.

            Ring 1  ≈ r 57
            Ring 2  ≈ r 107
            Ring 3  ≈ r 160
            Ring 4  ≈ r 212
          */}

          {/* Ring 1 */}
          <path d="
            M 56 4
            Q 45 9   54 19
            Q 42 21  48 33
            Q 36 31  40 42
            Q 29 38  31 50
            Q 20 43  18 55
            Q 9  46  4  57
          " />

          {/* Ring 2 */}
          <path d="
            M 107 8
            Q 86 17  103 33
            Q 80 37  92  58
            Q 69 55  76  76
            Q 55 69  58  92
            Q 37 80  33  103
            Q 17 86  8   107
          " />

          {/* Ring 3 */}
          <path d="
            M 159 14
            Q 128 26  152 49
            Q 118 55  136 85
            Q 102 81  113 113
            Q 81  102 85  136
            Q 55  118 49  152
            Q 26  128 14  159
          " />

          {/* Ring 4 */}
          <path d="
            M 211 18
            Q 169 34  202 65
            Q 157 73  180 112
            Q 135 107 150 150
            Q 107 135 112 180
            Q 73  157 65  202
            Q 34  169 18  211
          " />
        </g>
      </svg>
    </div>
  );
};

export default WebCorner;
