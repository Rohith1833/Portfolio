import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) or (max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for rotation values
  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  if (isMobile || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};
