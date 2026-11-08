import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { WebCorner } from './WebCorner';

export const NotFoundPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
      className="min-h-screen bg-[#080808] text-fdf3f2 flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-primary-red selection:text-near-black"
    >
      {/* Background ambient noise & lighting */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-primary-red/4 blur-[140px] pointer-events-none" />

      {/* Decorative Web Corners */}
      <WebCorner position="top-left" />
      <WebCorner position="bottom-right" />

      <div className="max-w-md w-full glass-card p-8 md:p-12 rounded-3xl border border-white/10 text-center relative z-10 shadow-2xl flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-primary-red/10 border border-primary-red/30 flex items-center justify-center text-primary-red mb-2">
          <Compass className="w-7 h-7 animate-pulse" />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold block mb-1">
            ERROR 404 // ROUTE DISCONNECTED
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fdf3f2 mt-1">
            SECTOR NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-muted-grey leading-relaxed mt-3">
            The page you are looking for has disconnected or does not exist in this sector of the portfolio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full font-mono text-xs uppercase tracking-wider pt-2">
          <Link
            to="/"
            className="bg-primary-red text-near-black px-6 py-3.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(235,74,66,0.3)] hover:bg-primary-red/90 w-full"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <Link
            to="/#projects"
            className="glass-card glass-card-hover px-6 py-3.5 rounded-full text-fdf3f2 border border-white/10 flex items-center justify-center gap-2 w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Projects</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;

