import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const ScrollSectionWrapper: React.FC<ScrollSectionWrapperProps> = ({
  children,
  id,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};
export default ScrollSectionWrapper;
