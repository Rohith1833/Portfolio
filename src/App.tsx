import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Terminal,
  Split,
  Sliders
} from 'lucide-react';
import { PORTFOLIO_CONFIG, getProjectSlug } from './portfolioConfig';
import { Navbar } from './components/Navbar';
import { SpiderwebMotif } from './components/SpiderwebMotif';
import { GitHubActivity } from './components/GitHubActivity';
import { ScrollSectionWrapper } from './components/ScrollSectionWrapper';
import { WebCorner } from './components/WebCorner';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Magnetic } from './components/Magnetic';
import { TiltCard } from './components/TiltCard';

const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage'));

// Custom SVG Icons with uniform stroke weights
const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const PhoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Framer Motion shared animations
const transitionEntrance = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const springHover = { type: 'spring' as const, stiffness: 300, damping: 30 };

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitionEntrance }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const MotionLink = motion(Link);

function MainPortfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const [activeSectionIndex, setActiveSectionIndex] = useState(1);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<'All' | 'AI & NLP' | 'Machine Learning' | 'Full-Stack'>('All');

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ['about', 'projects', 'skills', 'certifications', 'education', 'github-contributions', 'resume-download', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 350;
      let currentIdx = 1;

      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentIdx = i + 1;
            break;
          }
        }
      }
      setActiveSectionIndex(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Overall scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Hero parallax progress
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroTextY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const smoothHeroY = useSpring(heroTextY, { stiffness: 90, damping: 22 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 90, damping: 22 });

  const handlePlaceholderClick = (field?: string) => {
    const term = field ? field.toLowerCase() : '';
    if (term.includes('linkedin')) {
      alert('The LinkedIn profile is currently offline. Please reach out directly to rohithmohith78@gmail.com!');
    } else if (term.includes('certification') || term.includes('credential')) {
      alert('Credentials verification is currently offline. Please reach out directly to rohithmohith78@gmail.com!');
    } else {
      alert('The requested document is currently offline. Please reach out directly to rohithmohith78@gmail.com for a copy!');
    }
  };

  // Flagship Project: HumanIntent
  const flagshipProject = PORTFOLIO_CONFIG.featuredProjects.find(p => p.isFlagship) || PORTFOLIO_CONFIG.featuredProjects[0];
  
  // Non-flagship featured projects (Food Delivery Predictor, LocalLens, Health Tracker PWA, IntelliSlide AI)
  const otherProjects = PORTFOLIO_CONFIG.featuredProjects.filter(p => !p.isFlagship);
  
  // Filtered projects
  const filteredProjects = otherProjects.filter(p => {
    if (projectCategoryFilter === 'All') return true;
    if (projectCategoryFilter === 'AI & NLP') {
      return p.category?.toLowerCase().includes('nlp') || p.category?.toLowerCase().includes('ai');
    }
    if (projectCategoryFilter === 'Machine Learning') {
      return p.category?.toLowerCase().includes('machine learning') || p.category?.toLowerCase().includes('regression');
    }
    if (projectCategoryFilter === 'Full-Stack') {
      return p.category?.toLowerCase().includes('full-stack') || p.category?.toLowerCase().includes('pwa') || p.category?.toLowerCase().includes('database');
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitionEntrance}
      className="bg-[#080808] text-fdf3f2 min-h-screen relative font-sans selection:bg-primary-red selection:text-near-black overflow-x-hidden"
    >
      {/* 2. Cursor Spotlight */}
      <CursorSpotlight />

      {/* Minimal Scroll Progress Indicator */}
      <div className="fixed bottom-6 left-6 z-[60] font-mono text-[10px] uppercase tracking-widest text-muted-grey bg-[#080808]/80 border border-white/5 backdrop-blur-md px-4 py-2 rounded-full select-none flex items-center gap-2 shadow-2xl">
        <span className="text-primary-red font-bold">0{activeSectionIndex}</span>
        <span className="opacity-30">—</span>
        <span>08</span>
      </div>

      {/* Ambient background noise overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Background Ambient Lighting (Blurred Gradient Orbs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[8%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-primary-red/4 blur-[140px] ambient-glow-pulse" />
        <div className="absolute top-[38%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-primary-red/3 blur-[160px] ambient-glow-pulse" style={{ animationDelay: '-3s' }} />
        <div className="absolute bottom-[20%] left-[-20%] w-[55vw] h-[55vw] rounded-full bg-primary-red/4 blur-[140px] ambient-glow-pulse" style={{ animationDelay: '-6s' }} />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 w-full h-[3px] bg-primary-red z-[60] pointer-events-none"
      />

      {/* Global Navbar */}
      <Navbar />

      {/* 1. HERO SECTION (Asymmetric, Cinematic Layout) */}
      <div ref={heroRef} id="hero-header" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        {/* Subtle gridlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <WebCorner position="top-left" />

        <div className="max-w-6xl mx-auto px-6 w-full relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            style={shouldReduceMotion ? {} : { y: smoothHeroY, opacity: smoothHeroOpacity, willChange: 'transform, opacity' }}
          >
            {/* Left Column: Bold Asymmetric Headline Statement */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Availability Label */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md w-fit">
                <span className="w-2 h-2 bg-primary-red rounded-full animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary-red font-bold">
                  PORTFOLIO V2.0 • AI & FULL-STACK SYSTEMS DEVELOPER
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-fdf3f2 leading-[0.95] max-w-4xl"
              >
                Building practical <span className="text-primary-red select-all">applied AI</span>, machine learning pipelines & full-stack web applications.
              </motion.h1>
            </div>

            {/* Right Column: Mini Subtitle, Links stack, and Positioning */}
            <div className="lg:col-span-4 lg:mt-8 flex flex-col gap-8">
              <motion.p
                variants={fadeInUp}
                className="text-base text-muted-grey leading-relaxed"
              >
                {PORTFOLIO_CONFIG.positioning} Creator of <strong>HumanIntent</strong>, an intent-preserving prompt optimizer powered by local LLM inference and deterministic verification.
              </motion.p>

              {/* CTAs list */}
              <motion.div variants={fadeInUp} className="flex flex-col gap-3.5 font-mono text-xs uppercase tracking-wider">
                <Magnetic maxMovement={6}>
                  <motion.a
                    href="#/#projects"
                    whileHover={{ y: -2 }}
                    transition={springHover}
                    className="bg-primary-red text-near-black px-6 py-4 rounded-full font-bold transition-all flex items-center justify-between cursor-pointer outline-none select-none shadow-[0_4px_20px_rgba(235,74,66,0.25)] hover:shadow-[0_6px_25px_rgba(235,74,66,0.35)] w-full"
                  >
                    <span>Explore Flagship Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.a>
                </Magnetic>

                <Magnetic maxMovement={4}>
                  <motion.a
                    href={PORTFOLIO_CONFIG.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    transition={springHover}
                    className="glass-card glass-card-hover px-6 py-4 rounded-full text-fdf3f2 flex items-center justify-between cursor-pointer outline-none select-none w-full"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon className="text-primary-red" />
                      GitHub Codebases
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-grey" />
                  </motion.a>
                </Magnetic>

                {PORTFOLIO_CONFIG.linkedinUrl && (
                  <Magnetic maxMovement={4}>
                    <motion.a
                      href={PORTFOLIO_CONFIG.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      transition={springHover}
                      className="glass-card glass-card-hover px-6 py-4 rounded-full text-fdf3f2 flex items-center justify-between cursor-pointer outline-none select-none w-full"
                    >
                      <span className="flex items-center gap-2">
                        <LinkedinIcon className="text-primary-red" />
                        LinkedIn Profile
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted-grey" />
                    </motion.a>
                  </Magnetic>
                )}

                <Magnetic maxMovement={4}>
                  <motion.button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ y: -2 }}
                    transition={springHover}
                    className="glass-card glass-card-hover px-6 py-4 rounded-full text-fdf3f2 flex items-center justify-between cursor-pointer outline-none select-none w-full text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-red" />
                      Contact Me
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-grey" />
                  </motion.button>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. ABOUT / INTRODUCTION */}
      <ScrollSectionWrapper id="about" className="py-24 px-6 relative overflow-hidden border-t border-b border-white/5">
        <WebCorner position="top-right" variant="dark" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column: Number, Title, Profile Frame */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red/50 block mb-1">SYSTEM://ABOUT_ME</span>
              <div className="font-mono text-8xl md:text-9xl text-white/5 font-extrabold leading-none select-none -ml-4">01</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                PROFILE
              </h2>
            </div>

            {/* Developer Identity Card */}
            <div className="glass-card p-6 rounded-2xl relative mt-4 max-w-xs w-full shadow-2xl overflow-hidden hover:border-primary-red/30 transition-all duration-300">
              <div className="h-52 w-full flex flex-col justify-between select-none relative z-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                <div className="relative z-10 flex flex-col">
                  <h4 className="font-sans text-xl font-bold tracking-tight text-fdf3f2 leading-none uppercase">
                    ROHITH GOWDA S.
                  </h4>
                  <span className="font-mono text-[10px] text-primary-red uppercase tracking-wider font-bold mt-1.5 block">
                    AI & SOFTWARE DEVELOPER
                  </span>
                  <p className="text-xs text-muted-grey leading-relaxed mt-4 max-w-[220px]">
                    Engineering local LLM tools, ML regression models, and full-stack web applications.
                  </p>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-4 flex flex-col gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-grey">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary-red rounded-full animate-pulse" />
                    <span>BANGALORE, INDIA</span>
                  </div>
                  <div className="font-bold text-fdf3f2">
                    OPEN TO WORK • FREELANCE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Domain Tags */}
          <div className="lg:col-span-8 lg:mt-12 flex flex-col gap-8">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-grey">
              <span className="w-2 h-2 rounded-full bg-primary-red animate-pulse" />
              <span>Currently building: <span className="font-sans normal-case font-medium text-fdf3f2/90">{PORTFOLIO_CONFIG.currentlyBuilding}</span></span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-fdf3f2 leading-tight max-w-2xl">
              I’m a developer who bridges algorithmic machine learning, prompt engineering pipelines, and production web interfaces.
            </h3>
            <p className="text-base text-muted-grey leading-relaxed">
              {PORTFOLIO_CONFIG.careerObjective} My philosophy is centered on building end-to-end reproducible projects—from data cleaning and feature engineering to deterministic verification and low-latency local inference.
            </p>

            <div className="border-t border-white/10 pt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-grey/60 font-bold mb-4">Interests & Core Domains</h4>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_CONFIG.interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono text-xs text-fdf3f2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-primary-red/50 hover:bg-primary-red/10 transition-all duration-300"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 3. FEATURED PROJECTS SECTION (V2.0 REDESIGN) */}
      <ScrollSectionWrapper id="projects" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="bottom-left" variant="dark" />

        <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-20 my-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red/70 font-bold block mb-1">
                REGISTRY://ENGINEERING_PORTFOLIO_V2
              </span>
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">02</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                PROJECTS
              </h2>
              <p className="text-base text-muted-grey leading-relaxed max-w-2xl mt-4">
                Practical <strong className="text-fdf3f2">applied AI systems</strong>, <strong className="text-fdf3f2">machine learning pipelines</strong>, and <strong className="text-fdf3f2">full-stack web applications</strong>. Click any project to inspect its architecture and case study.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-full font-mono text-xs flex-wrap">
              {(['All', 'AI & NLP', 'Machine Learning', 'Full-Stack'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCategoryFilter(cat)}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    projectCategoryFilter === cat
                      ? 'bg-primary-red text-near-black font-bold shadow-md'
                      : 'text-muted-grey hover:text-fdf3f2'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PRIMARY FEATURED FLAGSHIP SPOTLIGHT: HUMANINTENT */}
          {/* ========================================================================= */}
          {(projectCategoryFilter === 'All' || projectCategoryFilter === 'AI & NLP') && (
            <div className="w-full">
              <TiltCard className="w-full">
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary-red/40 hover:border-primary-red/80 transition-all duration-300 relative overflow-hidden shadow-[0_8px_40px_rgba(235,74,66,0.12)] group">
                  {/* Glowing background ambient spot */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(235,74,66,0.15)_0%,transparent_70%)] pointer-events-none" />

                  <div className="relative z-10 flex flex-col gap-6">
                    {/* Top Row: Badges & Flagship Marker */}
                    <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-primary-red/60 text-fdf3f2 bg-primary-red font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(235,74,66,0.3)]">
                          <Sparkles className="w-3.5 h-3.5 text-near-black fill-near-black" />
                          PRIMARY FEATURED PROJECT
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-green-500/30 text-green-400 bg-green-500/10 font-bold">
                          ACCEPTED V1.0 FAST-PATH
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-muted-grey bg-white/5">
                          LOCAL OLLAMA INFERENCE (RTX 3050)
                        </span>
                      </div>

                      <span className="font-mono text-xs text-primary-red/80 font-bold uppercase tracking-wider">
                        AI Engineering / LLM Systems
                      </span>
                    </div>

                    {/* Middle: Title, Subtitle & Narrative */}
                    <div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fdf3f2 group-hover:text-primary-red transition-colors tracking-tight">
                        {flagshipProject.title}
                      </h3>
                      <p className="text-base md:text-lg text-primary-red/90 font-medium mt-1">
                        {flagshipProject.subtitle}
                      </p>
                      <p className="text-sm md:text-base text-muted-grey leading-relaxed mt-4 max-w-4xl">
                        {flagshipProject.description}
                      </p>
                    </div>

                    {/* Empirical Benchmark Highlights Banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/60 border border-white/5 p-4 rounded-2xl font-mono">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-grey/60 block">Automated Tests</span>
                        <span className="text-lg md:text-xl font-bold text-green-400">442 / 442</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-grey/60 block">Blind Probes</span>
                        <span className="text-lg md:text-xl font-bold text-green-400">10 / 10</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-grey/60 block">P50 Latency (Local)</span>
                        <span className="text-lg md:text-xl font-bold text-fdf3f2">15.62s</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-grey/60 block">Cloud API Egress</span>
                        <span className="text-lg md:text-xl font-bold text-primary-red">0 Bytes</span>
                      </div>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {flagshipProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-fdf3f2/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-grey">
                        <Terminal className="w-4 h-4 text-primary-red" />
                        <span>Deterministic Preprocessing → Single LLM Call → Post Verification</span>
                      </div>

                      <MotionLink
                        to={`/projects/${getProjectSlug(flagshipProject.title)}`}
                        whileHover={{ scale: 1.02 }}
                        className="bg-primary-red text-near-black px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(235,74,66,0.3)] hover:bg-primary-red/90"
                      >
                        <span>EXPLORE IN-DEPTH CASE STUDY & PIPELINE</span>
                        <ChevronRight className="w-4 h-4" />
                      </MotionLink>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CORE PROJECTS GRID (FOOD DELIVERY, LOCALLENS, AND FULL-STACK SYSTEMS) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => {
              const slug = getProjectSlug(project.title);
              const isFood = slug === 'food-delivery-time-predictor';
              const isLens = slug === 'locallens';

              return (
                <TiltCard key={index} className="w-full h-full">
                  <MotionLink
                    to={`/projects/${slug}`}
                    whileHover={{ y: -4 }}
                    transition={springHover}
                    className="glass-card glass-card-hover p-7 rounded-3xl group/card flex flex-col justify-between gap-6 cursor-pointer text-left outline-none h-full border border-white/10"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold">
                          {project.category}
                        </span>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                            project.badge === 'Live'
                              ? 'border-green-500/30 text-green-400 bg-green-500/5'
                              : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'
                          }`}
                        >
                          {project.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h4 className="text-2xl font-bold text-fdf3f2 group-hover/card:text-primary-red transition-colors">
                        {project.title}
                      </h4>
                      {project.subtitle && (
                        <p className="text-xs text-primary-red/80 font-mono mt-1">
                          {project.subtitle}
                        </p>
                      )}

                      <p className="text-sm text-muted-grey leading-relaxed mt-3 group-hover/card:text-fdf3f2 transition-colors">
                        {project.description}
                      </p>

                      {/* Custom Feature Snapshot */}
                      {isFood && (
                        <div className="mt-4 bg-black/40 border border-white/5 p-3 rounded-xl font-mono text-[11px] text-muted-grey flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-fdf3f2">
                            <Sliders className="w-3.5 h-3.5 text-primary-red" />
                            Haversine Distance Pipeline
                          </span>
                          <span className="text-green-400">~45k Records</span>
                        </div>
                      )}

                      {isLens && (
                        <div className="mt-4 bg-black/40 border border-white/5 p-3 rounded-xl font-mono text-[11px] text-muted-grey flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-fdf3f2">
                            <Split className="w-3.5 h-3.5 text-primary-red" />
                            5-Aspect Clause Splitting
                          </span>
                          <span className="text-green-400">74.5% Accuracy</span>
                        </div>
                      )}

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.techStack.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] text-fdf3f2/70 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 6 && (
                          <span className="font-mono text-[10px] text-muted-grey px-2 py-0.5">
                            +{project.techStack.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-grey group-hover/card:text-primary-red transition-colors">
                      <span className="flex items-center gap-1 font-bold">
                        VIEW CASE STUDY
                      </span>
                      <div className="flex items-center gap-2">
                        {project.demoUrl && (
                          <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Live App
                          </span>
                        )}
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-grey group-hover/card:bg-primary-red group-hover/card:border-primary-red group-hover/card:text-near-black transition-all">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </MotionLink>
                </TiltCard>
              );
            })}
          </div>

          {/* Academic Projects Subsection */}
          {PORTFOLIO_CONFIG.academicProjects.length > 0 && (
            <div className="mt-8 border-t border-white/5 pt-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-grey/60 font-bold block mb-4">
                Academic & Core Engineering Systems
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PORTFOLIO_CONFIG.academicProjects.map((acad, idx) => (
                  <Link
                    key={idx}
                    to={`/projects/${getProjectSlug(acad.title)}`}
                    className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                          {acad.badge || 'Academic'}
                        </span>
                        <span className="font-mono text-[10px] text-muted-grey">{acad.category}</span>
                      </div>
                      <h5 className="text-lg font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-2">
                        {acad.title}
                      </h5>
                      <p className="text-xs text-muted-grey mt-1 leading-relaxed">
                        {acad.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono text-[10px] uppercase text-muted-grey">
                      <span>{acad.techStack.join(' • ')}</span>
                      <span className="text-primary-red flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Schema <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollSectionWrapper>

      {/* 4. TECHNICAL SKILLS SECTION (V2.0 UPDATED CATEGORIES) */}
      <ScrollSectionWrapper id="skills" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="top-right" variant="dark" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red/50 block mb-1">CAPABILITIES://TECH_STACK</span>
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">03</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                CAPABILITIES
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Empirical technologies grounded in my actual project engineering across AI, machine learning pipelines, and full-stack software.
            </p>

            {/* Growth Roadmap */}
            <div className="mt-4 border border-dashed border-primary-red/30 bg-primary-red/5 p-5 rounded-2xl backdrop-blur-md flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
              <p className="text-xs text-muted-grey leading-relaxed">
                <strong className="text-fdf3f2 block mb-1">Engineering Focus</strong>
                Building local-first AI prompt optimizers, Scikit-learn regression models, and scalable full-stack applications with reproducible testing standards.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Skill Categories Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PORTFOLIO_CONFIG.skills.map((skillGroup, index) => (
              <div key={index} className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>{skillGroup.category}</span>
                    <span className="text-[10px] text-muted-grey/60">{skillGroup.items.length} Techs</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-sans text-xs text-fdf3f2/90 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full hover:border-primary-red/40 hover:bg-primary-red/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 5. CERTIFICATIONS */}
      <ScrollSectionWrapper id="certifications" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="top-left" variant="dark" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red/50 block mb-1">CREDENTIALS://PLATFORMS</span>
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">04</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                CREDENTIALS
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Completed certifications across AI foundations, workflows, Python, and cloud services from recognized providers.
            </p>

            <div className="flex flex-col gap-2 border-t border-white/10 pt-5 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-grey/60">Total</span>
                <span className="font-mono text-xs font-bold text-fdf3f2">{PORTFOLIO_CONFIG.certifications.length} Certifications</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-grey/60">Issuers</span>
                <span className="font-mono text-xs font-bold text-fdf3f2">
                  {[...new Set(PORTFOLIO_CONFIG.certifications.map(c => c.issuer))].join(', ')}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_CONFIG.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="group glass-card glass-card-hover rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red/70 font-bold">
                      {cert.category}
                    </span>
                    <h4 className="text-sm font-bold text-fdf3f2 leading-snug">
                      {cert.title}
                    </h4>
                    <span className="font-mono text-[10px] text-muted-grey/70 uppercase tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>

                  <a
                    href={cert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-primary-red hover:text-primary-red/70 transition-colors select-none w-fit group/btn"
                  >
                    <span>VIEW VERIFIED CERTIFICATE</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 6. EDUCATION */}
      <ScrollSectionWrapper id="education" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="bottom-right" variant="dark" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">05</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                BACKGROUND
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Formal academic foundation and computer applications coursework.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-white/10 pt-8 flex items-start gap-4">
            <GraduationCap className="w-5 h-5 text-primary-red shrink-0 mt-1" />
            <div className="flex-1">
              <span className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold">Degree Program</span>
              <h4 className="text-xl font-bold text-fdf3f2 mt-1">
                {PORTFOLIO_CONFIG.education.degree}
              </h4>

              <p className="text-sm text-muted-grey mt-4 leading-relaxed max-w-2xl">
                Coursework at <strong className="text-fdf3f2">{PORTFOLIO_CONFIG.education.institution}</strong> in {PORTFOLIO_CONFIG.education.location}.
              </p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="font-mono text-xs text-muted-grey/60 uppercase tracking-widest font-bold block mb-3">Coursework Focus</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Data Structures", "DBMS", "Operating Systems", "Java", "Python Programming", "Relational Algebra", "SQL", "Web Applications"].map((course) => (
                    <span
                      key={course}
                      className="font-sans text-xs text-fdf3f2/80 bg-white/5 border border-white/5 px-3 py-1 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 7. OPEN SOURCE & GITHUB ACTIVITIES */}
      <ScrollSectionWrapper id="github-contributions" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="bottom-left" variant="dark" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">06</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                OPEN SOURCE
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Public repositories, commit history, and code tracking loaded live via GitHub API.
            </p>
          </div>

          <div className="lg:col-span-8">
            <GitHubActivity />
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 8. RESUME & ENGINEERING IMPACT SECTION */}
      <ScrollSectionWrapper id="resume-download" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="top-right" variant="dark" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold block mb-1">
              CURRICULUM VITAE // VERIFIED IMPACT
            </span>
            <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -mb-6">07</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
              TECHNICAL EXPERIENCE
            </h2>
            <p className="text-sm text-muted-grey leading-relaxed mt-4">
              Key engineering highlights from my project portfolio, ready for recruitment and technical appraisal.
            </p>
          </div>

          {/* 3 Project Bullet Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_CONFIG.resumeProjects.map((rp, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <h4 className="text-lg font-bold text-fdf3f2">{rp.title}</h4>
                    <span className="font-mono text-[9px] text-primary-red uppercase font-bold">PROJECT {idx + 1}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-grey/70 uppercase tracking-wider block mb-4">
                    {rp.category}
                  </span>
                  <ul className="space-y-3 text-xs text-muted-grey leading-relaxed">
                    {rp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-primary-red font-bold font-mono">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <Link
                    to={`/projects/${getProjectSlug(rp.title)}`}
                    className="font-mono text-[10px] uppercase text-primary-red hover:underline flex items-center gap-1 font-bold"
                  >
                    View Project Case Study <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Download Resume Action Box */}
          <div className="glass-card p-8 md:p-10 rounded-3xl text-center flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto w-full shadow-2xl border border-white/10 mt-4">
            <FileText className="w-8 h-8 text-primary-red" />
            <div>
              <h4 className="text-lg font-bold text-fdf3f2">Download Full Developer Resume</h4>
              <p className="text-xs text-muted-grey mt-1">PDF formatted resume containing technical skills, projects, and educational credentials.</p>
            </div>
            {PORTFOLIO_CONFIG.resumePath ? (
              <Magnetic maxMovement={5}>
                <a
                  href={PORTFOLIO_CONFIG.resumePath}
                  download="Rohith_Gowda_Resume.pdf"
                  className="bg-primary-red hover:bg-primary-red/90 text-near-black font-mono text-xs uppercase tracking-wider px-8 py-3.5 rounded-full font-bold transition-all select-none shadow-[0_4px_20px_rgba(235,74,66,0.25)] hover:scale-[1.02] duration-300 block"
                >
                  DOWNLOAD RESUME (PDF) →
                </a>
              </Magnetic>
            ) : (
              <Magnetic maxMovement={5}>
                <button
                  onClick={() => handlePlaceholderClick()}
                  className="bg-primary-red hover:bg-primary-red/90 text-near-black font-mono text-xs uppercase tracking-wider px-8 py-3.5 rounded-full font-bold transition-all select-none cursor-pointer outline-none shadow-[0_4px_20px_rgba(235,74,66,0.25)] hover:scale-[1.02] duration-300"
                >
                  DOWNLOAD RESUME (PDF) →
                </button>
              </Magnetic>
            )}
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 9. CONTACT / CONNECTION SECTION */}
      <ScrollSectionWrapper id="contact" className="py-24 px-6 relative overflow-hidden border-b border-white/5">
        <WebCorner position="bottom-right" variant="dark" />
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <div className="relative text-center mb-12">
            <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10">08</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
              CONNECTION
            </h2>
            <p className="text-sm text-muted-grey leading-relaxed mt-4 max-w-md mx-auto">
              Interested in software engineering roles, AI system integrations, or collaborative opportunities? Let's connect.
            </p>
          </div>

          <div className="w-full max-w-2xl flex flex-col gap-4 select-none">
            {/* Email Card */}
            <Magnetic maxMovement={4} className="w-full">
              <a
                href={`mailto:${PORTFOLIO_CONFIG.contactEmail}`}
                className="group glass-card glass-card-hover p-5 rounded-2xl flex items-center justify-between outline-none transition-all duration-300 w-full block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:border-primary-red/30">
                    <Mail className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">EMAIL</span>
                    <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5 select-all">
                      {PORTFOLIO_CONFIG.contactEmail}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Magnetic>

            {/* Phone Card */}
            <Magnetic maxMovement={4} className="w-full">
              <a
                href={`tel:${PORTFOLIO_CONFIG.contactPhone.replace(/\s+/g, '')}`}
                className="group glass-card glass-card-hover p-5 rounded-2xl flex items-center justify-between outline-none transition-all duration-300 w-full block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:border-primary-red/30">
                    <PhoneIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">PHONE</span>
                    <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                      {PORTFOLIO_CONFIG.contactPhone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Magnetic>

            {/* LinkedIn Card */}
            <Magnetic maxMovement={4} className="w-full">
              <a
                href={PORTFOLIO_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card glass-card-hover p-5 rounded-2xl flex items-center justify-between outline-none transition-all duration-300 w-full block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:border-primary-red/30">
                    <LinkedinIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">LINKEDIN</span>
                    <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                      LinkedIn Profile
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Magnetic>

            {/* GitHub Card */}
            <Magnetic maxMovement={4} className="w-full">
              <a
                href={PORTFOLIO_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card glass-card-hover p-5 rounded-2xl flex items-center justify-between outline-none transition-all duration-300 w-full block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:border-primary-red/30">
                    <GithubIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">GITHUB</span>
                    <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                      GitHub / Rohith1833
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Magnetic>

            {/* Instagram Card */}
            <Magnetic maxMovement={4} className="w-full">
              <a
                href={PORTFOLIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card glass-card-hover p-5 rounded-2xl flex items-center justify-between outline-none transition-all duration-300 w-full block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 group-hover:border-primary-red/30">
                    <InstagramIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">INSTAGRAM</span>
                    <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                      Instagram Profile
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Magnetic>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-transparent py-8 px-6 text-center select-none text-muted-grey text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. Spidey Portfolio V2.0.</p>
          <div className="flex items-center gap-6">
            <a href={PORTFOLIO_CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-red transition-colors">
              GitHub
            </a>
            {PORTFOLIO_CONFIG.linkedinUrl && (
              <a href={PORTFOLIO_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary-red transition-colors">
                LinkedIn
              </a>
            )}
            <a href={`mailto:${PORTFOLIO_CONFIG.contactEmail}`} className="hover:text-primary-red transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

// Routes wrapper with standard transition curves
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPortfolio />} />
        <Route
          path="/projects/:id"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center font-mono text-xs text-primary-red gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-red animate-pulse" />
                  <span>INITIALIZING CASE STUDY...</span>
                </div>
              }
            >
              <ProjectDetailPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <SpiderwebMotif />
      <AnimatedRoutes />
    </HashRouter>
  );
}

export default App;
