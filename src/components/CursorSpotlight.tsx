import React, { useRef, useEffect } from 'react';

export const CursorSpotlight: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable spotlight on touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) {
      if (spotlightRef.current) {
        spotlightRef.current.style.display = 'none';
      }
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.setProperty('--x', `${e.clientX}px`);
      spotlightRef.current.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_300px_at_var(--x,-1000px)_var(--y,-1000px),rgba(235,74,66,0.035),transparent_80%)] mix-blend-screen transition-opacity duration-300"
      style={{ willChange: 'background' }}
    />
  );
};

export default CursorSpotlight;
