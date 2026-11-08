import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const instant = useTransform(scrollYProgress, (v) => v);
  const scaleX = prefersReduced ? instant : springProgress;

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary-red z-[9999] pointer-events-none"
    />
  );
}
