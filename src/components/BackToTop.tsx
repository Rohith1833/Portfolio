import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-40 w-11 h-11 flex items-center justify-center rounded-full
            glass-card border border-white/[0.06] cursor-pointer
            hover:border-primary-red group transition-colors duration-200"
        >
          {/* Tiny web strand above chevron */}
          <span className="absolute top-[7px] w-px h-[6px] bg-muted-grey/40 group-hover:bg-primary-red/60 transition-colors duration-200" />
          <ChevronUp
            size={18}
            strokeWidth={2}
            className="text-muted-grey group-hover:text-primary-red transition-colors duration-200 mt-1"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
