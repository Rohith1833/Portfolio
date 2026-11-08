import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValue } from 'framer-motion';

export const SpiderwebMotif: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const location = useLocation();
  
  const [totalHeight, setTotalHeight] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(1200);

  // 1. Scroll height measuring
  const { scrollY, scrollYProgress } = useScroll();
  
  // Track scroll position for translating the spine vertically
  const spineY = useTransform(scrollY, (latest) => -latest);
  // Secondary background parallax layer (moves at 45% speed for spatial depth)
  const secondarySpineY = useTransform(scrollY, (latest) => -latest * 0.45);

  // 2. Mouse interactive coordinate motion values (for edge pulling)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const edgeOpacity = useMotionValue(0);
  const [edgeSide, setEdgeSide] = useState<'left' | 'right' | 'none'>('none');

  // Snappy spring configuration for responsive hover states
  const springConfig = { stiffness: 280, damping: 28 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothEdgeOpacity = useSpring(edgeOpacity, { stiffness: 280, damping: 28 });

  // Bezier paths pulling towards mouse cursor
  const leftPath1 = useTransform([smoothMouseX, smoothMouseY], (vals: any) => {
    const x = vals[0] as number;
    const y = vals[1] as number;
    return `M 0 ${y - 80} Q ${x * 0.4} ${y - 40} ${x} ${y}`;
  });

  const leftPath2 = useTransform([smoothMouseX, smoothMouseY], (vals: any) => {
    const x = vals[0] as number;
    const y = vals[1] as number;
    return `M 0 ${y + 80} Q ${x * 0.4} ${y + 40} ${x} ${y}`;
  });

  const rightPath1 = useTransform([smoothMouseX, smoothMouseY], (vals: any) => {
    const x = vals[0] as number;
    const y = vals[1] as number;
    return `M ${windowWidth} ${y - 80} Q ${windowWidth - (windowWidth - x) * 0.4} ${y - 40} ${x} ${y}`;
  });

  const rightPath2 = useTransform([smoothMouseX, smoothMouseY], (vals: any) => {
    const x = vals[0] as number;
    const y = vals[1] as number;
    return `M ${windowWidth} ${y + 80} Q ${windowWidth - (windowWidth - x) * 0.4} ${y + 40} ${x} ${y}`;
  });

  const handleMeasure = () => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setTotalHeight(document.documentElement.scrollHeight);
    }
  };

  useEffect(() => {
    handleMeasure();
    window.addEventListener('resize', handleMeasure);
    window.addEventListener('scroll', handleMeasure);
    return () => {
      window.removeEventListener('resize', handleMeasure);
      window.removeEventListener('scroll', handleMeasure);
    };
  }, []);

  useEffect(() => {
    handleMeasure();
    const timers = [100, 400, 1000].map(delay => setTimeout(handleMeasure, delay));
    return () => timers.forEach(clearTimeout);
  }, [location.pathname]);

  // Pointer move edge pull listener setup with strict requestAnimationFrame throttling
  useEffect(() => {
    const isTouchDevice = typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice || shouldReduceMotion) return;

    let activeFrame: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (activeFrame) cancelAnimationFrame(activeFrame);

      activeFrame = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        const w = window.innerWidth;
        const limit = w * 0.15; // 15% edge hot zone

        let side: 'left' | 'right' | 'none' = 'none';
        let intensity = 0;

        if (x < limit) {
          side = 'left';
          intensity = 1 - (x / limit);
        } else if (x > w - limit) {
          side = 'right';
          intensity = 1 - ((w - x) / limit);
        }

        mouseX.set(x);
        mouseY.set(y);
        edgeOpacity.set(intensity);

        if (side !== edgeSide) {
          setEdgeSide(side);
        }
      });
    };

    const handlePointerLeave = () => {
      edgeOpacity.set(0);
      setEdgeSide('none');
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (activeFrame) cancelAnimationFrame(activeFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [windowWidth, edgeSide, shouldReduceMotion, mouseX, mouseY, edgeOpacity]);

  // Compute spine paths: foreground primary spine (right) and background parallax strand (left)
  const [spinePathData, setSpinePathData] = useState("");
  const [secondaryPathData, setSecondaryPathData] = useState("");

  useEffect(() => {
    // Generate foreground sin-wave spine running vertically along 93% width
    const rightX = windowWidth * 0.93;
    let d = `M ${rightX} 0`;
    
    // Create 8 wave segments down the page height
    const segments = 8;
    const step = totalHeight / segments;
    for (let i = 1; i <= segments; i++) {
      const yPos = i * step;
      // alternate slight wave deviations (20px offset)
      const xOffset = i % 2 === 0 ? 20 : -20;
      d += ` Q ${rightX + xOffset} ${yPos - step/2} ${rightX} ${yPos}`;
    }
    setSpinePathData(d);

    // Generate deeper secondary strand along 7% width with gentler curves
    const leftX = windowWidth * 0.07;
    let dSec = `M ${leftX} 0`;
    const secSegments = 6;
    const secStep = totalHeight / secSegments;
    for (let j = 1; j <= secSegments; j++) {
      const ySec = j * secStep;
      const xDev = j % 2 === 0 ? -15 : 15;
      dSec += ` Q ${leftX + xDev} ${ySec - secStep/2} ${leftX} ${ySec}`;
    }
    setSecondaryPathData(dSec);
  }, [totalHeight, windowWidth]);

  // Standardize duration: land in 400-600ms range for entrance
  const smoothSpineLength = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-30 overflow-hidden select-none">
      {/* Scrollable Group: Layered Spines with Parallax Depth */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Depth Strand (slower parallax) */}
        <motion.g style={{ y: secondarySpineY }}>
          {shouldReduceMotion ? (
            <path
              d={secondaryPathData}
              stroke="#eb4a42"
              strokeWidth="0.8"
              fill="none"
              opacity="0.12"
            />
          ) : (
            <motion.path
              d={secondaryPathData}
              stroke="#eb4a42"
              strokeWidth="0.9"
              fill="none"
              style={{
                pathLength: smoothSpineLength,
                opacity: 0.14,
                willChange: 'transform, opacity'
              }}
            />
          )}
        </motion.g>

        {/* Foreground Primary Spine */}
        <motion.g style={{ y: spineY }}>
          {shouldReduceMotion ? (
            <path
              d={spinePathData}
              stroke="#eb4a42"
              strokeWidth="1.2"
              fill="none"
              opacity="0.25"
            />
          ) : (
            <motion.path
              d={spinePathData}
              stroke="#eb4a42"
              strokeWidth="1.4"
              fill="none"
              style={{ 
                pathLength: smoothSpineLength,
                opacity: 0.3,
                willChange: 'transform, opacity'
              }}
            />
          )}
        </motion.g>

        {/* Fixed Overlay Group: Mouse-Driven Edge Pull Reveals */}
        {!shouldReduceMotion && edgeSide !== 'none' && (
          <g>
            {edgeSide === 'left' && (
              <g>
                <motion.path
                  d={leftPath1}
                  stroke="#eb4a42"
                  strokeWidth="1.2"
                  fill="none"
                  style={{ opacity: smoothEdgeOpacity }}
                />
                <motion.path
                  d={leftPath2}
                  stroke="#eb4a42"
                  strokeWidth="1.2"
                  fill="none"
                  style={{ opacity: smoothEdgeOpacity }}
                />
              </g>
            )}

            {edgeSide === 'right' && (
              <g>
                <motion.path
                  d={rightPath1}
                  stroke="#eb4a42"
                  strokeWidth="1.2"
                  fill="none"
                  style={{ opacity: smoothEdgeOpacity }}
                />
                <motion.path
                  d={rightPath2}
                  stroke="#eb4a42"
                  strokeWidth="1.2"
                  fill="none"
                  style={{ opacity: smoothEdgeOpacity }}
                />
              </g>
            )}

            {/* Glowing Anchor tracker dot */}
            <motion.circle
              cx={smoothMouseX}
              cy={smoothMouseY}
              r="3.5"
              fill="#eb4a42"
              style={{ opacity: smoothEdgeOpacity }}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
export default SpiderwebMotif;
