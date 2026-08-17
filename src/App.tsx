import { useRef, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from './portfolioConfig';
import { Navbar } from './components/Navbar';
import { SpiderwebMotif } from './components/SpiderwebMotif';


import { GitHubActivity } from './components/GitHubActivity';


import { ScrollSectionWrapper } from './components/ScrollSectionWrapper';
import { ProjectDetailPage, getProjectSlug } from './components/ProjectDetailPage';
import { WebCorner } from './components/WebCorner';

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitionEntrance}
      className="bg-near-black text-fdf3f2 min-h-screen relative font-sans selection:bg-primary-red selection:text-near-black"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 w-full h-[3px] bg-primary-red z-[60] pointer-events-none"
      />

      {/* Global Navbar */}
      <Navbar />

      {/* 1. HERO SECTION (Asymmetric, Left-Heavy Layout) */}
      <div ref={heroRef} id="hero-header" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-near-black">
        {/* Subtle gridlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
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
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-red animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
                  AVAILABLE FOR FREELANCE & FULL-TIME OPPORTUNITIES
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-fdf3f2 leading-[0.95] max-w-4xl"
              >
                Building practical <span className="text-primary-red select-all">full-stack</span> and AI-powered web applications & automations.
              </motion.h1>
            </div>

            {/* Right Column: Mini Subtitle, Links stack, and Positioning */}
            <div className="lg:col-span-4 lg:mt-8 flex flex-col gap-8">
              <motion.p
                variants={fadeInUp}
                className="text-base text-muted-grey leading-relaxed"
              >
                {PORTFOLIO_CONFIG.positioning}I combine modern web technologies with AI and automation to turn ideas into practical, production-ready solutions.
              </motion.p>

              {/* CTAs list (minimalistic vertical list layout) */}
              <motion.div variants={fadeInUp} className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
                <motion.a
                  href="#/#projects"
                  whileHover={{ x: 6 }}
                  transition={springHover}
                  className="bg-primary-red text-near-black px-6 py-4 rounded-none font-bold transition-all flex items-center justify-between cursor-pointer outline-none select-none"
                >
                  <span>View Flagship Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  transition={springHover}
                  className="border border-border-strong hover:border-primary-red hover:bg-primary-red/5 text-fdf3f2 px-6 py-4 rounded-none transition-all flex items-center justify-between cursor-pointer outline-none select-none"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="text-primary-red" />
                    GitHub Codebases
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-grey" />
                </motion.a>

                {PORTFOLIO_CONFIG.linkedinUrl ? (
                  <motion.a
                    href={PORTFOLIO_CONFIG.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    transition={springHover}
                    className="border border-border-strong hover:border-primary-red hover:bg-primary-red/5 text-fdf3f2 px-6 py-4 rounded-none transition-all flex items-center justify-between cursor-pointer outline-none select-none"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="text-primary-red" />
                      LinkedIn Profile
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-grey" />
                  </motion.a>
                ) : (
                  <motion.button
                    onClick={() => handlePlaceholderClick('LinkedIn URL')}
                    whileHover={{ x: 6 }}
                    transition={springHover}
                    className="border border-border-strong hover:border-primary-red/30 hover:bg-primary-red/5 text-muted-grey px-6 py-4 rounded-none transition-all flex items-center justify-between cursor-pointer outline-none text-left select-none"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon className="opacity-45" />
                      LinkedIn [Add]
                    </span>
                    <span className="text-[10px] text-primary-red/50">[Configure]</span>
                  </motion.button>
                )}

                <motion.button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  whileHover={{ x: 6 }}
                  transition={springHover}
                  className="border border-border-strong hover:border-primary-red hover:bg-primary-red/5 text-fdf3f2 px-6 py-4 rounded-none transition-all flex items-center justify-between cursor-pointer outline-none select-none w-full text-left"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-red" />
                    Contact Me
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-grey" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. ABOUT / INTRODUCTION (Light Section, Asymmetric split) */}
      <ScrollSectionWrapper id="about" className="bg-off-white text-near-black py-24 px-6 relative overflow-hidden border-t border-b border-near-black/5">
        <WebCorner position="top-right" variant="light" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column: Number, Title, Profile Frame */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              {/* Bleeding outline number */}
              <div className="font-mono text-8xl md:text-9xl text-near-black/5 font-extrabold leading-none select-none -ml-4">01</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-near-black leading-none uppercase mt-2">
                PROFILE
              </h2>
            </div>

            {/* Visual Photo frame replaced with a clean developer identity card */}
            <div className="border border-near-black/10 p-2 bg-near-black/5 rounded-none relative mt-4 max-w-xs w-full">
              <div className="h-64 w-full bg-white border border-near-black/20 p-6 rounded-none flex flex-col justify-between select-none relative overflow-hidden">
                {/* Micro tech grid line background inside card */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,15,15,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,15,15,0.015)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                {/* Header detail */}
                <div className="relative z-10 flex flex-col">
                  <h4 className="font-sans text-xl font-bold tracking-tight text-near-black leading-none uppercase">
                    ROHITH GOWDA S.
                  </h4>
                  <span className="font-mono text-[10px] text-primary-red uppercase tracking-wider font-bold mt-1.5 block">
                    FULL-STACK DEVELOPER
                  </span>
                  <p className="text-xs text-muted-grey leading-relaxed mt-4 max-w-[200px]">
                    Building web apps, AI tools & automation systems.
                  </p>
                </div>

                {/* Footer details */}
                <div className="relative z-10 border-t border-near-black/10 pt-4 flex flex-col gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-grey">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary-red rounded-full animate-pulse" />
                    <span>BANGALORE, INDIA</span>
                  </div>
                  <div className="font-bold text-near-black">
                    OPEN TO WORK • FREELANCE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & flat tags */}
          <div className="lg:col-span-8 lg:mt-12 flex flex-col gap-8">
            {/* Currently Building Status Line */}
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-grey">
              <span className="w-2 h-2 rounded-full bg-primary-red animate-pulse" />
              <span>Currently building: <span className="font-sans normal-case font-medium text-near-black/80">{PORTFOLIO_CONFIG.currentlyBuilding}</span></span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-near-black leading-tight max-w-2xl">
              I’m a developer who enjoys turning ideas into things that actually work.
            </h3>
            <p className="text-base text-near-black/75 leading-relaxed">
              {PORTFOLIO_CONFIG.careerObjective} Most of my learning comes from building real projects, breaking and fixing things, and understanding how systems work end-to-end.
            </p>

            <div className="border-t border-near-black/10 pt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-near-black/50 font-bold mb-4">Interests & Core Domains</h4>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_CONFIG.interests.map((interest) => (
                  <span
                    key={interest}
                    className="font-mono text-xs text-near-black bg-near-black/5 border border-near-black/10 px-3 py-1.5 rounded-none hover:bg-near-black hover:text-off-white transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 3. FEATURED PROJECTS SECTION (Redesigned with Ripped Paper style and glowing silhouette) */}
      <ScrollSectionWrapper id="projects" className="py-24 px-6 bg-near-black relative overflow-hidden">
        <WebCorner position="bottom-left" />
        {/* Ripped paper top edge (off-white tearing revealing black projects section) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[-1px]">
          <svg className="w-full h-8 text-off-white fill-current" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,20 L1420,15 L1400,22 L1380,17 L1360,25 L1340,19 L1320,24 L1300,16 L1280,21 L1260,18 L1240,23 L1220,15 L1200,20 L1180,17 L1160,24 L1140,18 L1120,22 L1100,16 L1080,21 L1060,15 L1040,20 L1020,17 L1000,23 L980,19 L960,22 L940,16 L920,21 L900,18 L880,24 L860,15 L840,20 L820,17 L800,22 L780,16 L760,21 L740,18 L720,23 L700,15 L680,20 L660,17 L640,24 L620,18 L600,22 L580,16 L560,21 L540,15 L520,20 L500,17 L480,23 L460,19 L440,22 L420,16 L400,21 L380,18 L360,24 L340,15 L320,20 L300,17 L280,22 L260,16 L240,21 L220,18 L200,23 L180,15 L160,20 L140,17 L120,24 L100,18 L80,22 L60,16 L40,21 L20,15 L0,20 Z" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-20 my-4">
          {/* Left Column: Heading and projects list */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">02</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                PROJECTS
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Practical <strong className="text-fdf3f2">full-stack web apps</strong> and <strong className="text-fdf3f2">AI systems</strong> built to solve real-world problems. Click on a project to explore its architecture.
            </p>

            <div className="flex flex-col divide-y divide-border-subtle/50 mt-4">
              {PORTFOLIO_CONFIG.featuredProjects.map((project, index) => {
                const slug = getProjectSlug(project.title);
                return (
                  <MotionLink
                    key={index}
                    to={`/projects/${slug}`}
                    whileHover={{ x: 6 }}
                    transition={springHover}
                    className="group/row flex flex-col md:flex-row md:items-center justify-between py-6 first:pt-0 last:pb-0 gap-6 cursor-pointer text-left outline-none focus-visible:bg-white/5"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="text-xl font-bold text-fdf3f2 group-hover/row:text-primary-red transition-colors">
                          {project.title}
                        </h4>
                        <span
                          className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none border ${project.badge === 'Live'
                            ? 'border-green-500/30 text-green-400 bg-green-500/5'
                            : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'
                            }`}
                        >
                          {project.badge}
                        </span>
                      </div>

                      <p className="text-sm text-muted-grey leading-relaxed max-w-2xl group-hover/row:text-fdf3f2 transition-colors mb-4">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] text-fdf3f2/60 bg-dark-grey border border-border-subtle px-2 py-0.5 rounded-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Arrow Circle */}
                    <div className="w-9 h-9 rounded-none border border-border-strong flex items-center justify-center text-muted-grey bg-near-black group-hover/row:bg-primary-red group-hover/row:border-primary-red group-hover/row:text-near-black transition-all duration-200 shrink-0 self-start md:self-center">
                      <ArrowUpRight className="w-4 h-4 transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </div>
                  </MotionLink>
                );
              })}
            </div>
          </div>

          {/* Right Column: Glowing circular spotlight with dark silhouette graphic */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[350px] lg:min-h-[450px] mt-8 lg:mt-0 select-none">
            {/* Glowing red circular background spotlight with richer radial gradients */}
            <div className="absolute w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(235,74,66,0.25)_0%,transparent_70%)] pointer-events-none z-0" />
            <div className="absolute w-60 h-60 rounded-full bg-[radial-gradient(circle,rgba(235,74,66,0.4)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* Silhouette / Graphic Container */}
            <div className="relative z-10 w-full max-w-sm aspect-square flex items-center justify-center p-4">
              <img
                src="/project-silhouette.png"
                alt="Developer Silhouette"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(235,74,66,0.15)] opacity-90 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Ripped paper bottom edge (off-white tearing revealing background underneath) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="w-full h-8 text-off-white fill-current" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0,40 L1440,40 L1440,20 L1420,25 L1400,18 L1380,23 L1360,15 L1340,21 L1320,16 L1300,24 L1280,19 L1260,22 L1240,17 L1220,25 L1200,20 L1180,23 L1160,16 L1140,22 L1120,18 L1100,24 L1080,19 L1060,25 L1040,20 L1020,23 L1000,17 L980,21 L960,18 L940,24 L920,19 L900,22 L880,17 L860,25 L840,20 L820,23 L800,16 L780,22 L760,18 L740,24 L720,19 L700,25 L680,20 L660,23 L640,17 L620,21 L600,18 L580,24 L560,19 L540,22 L520,17 L500,25 L480,20 L460,23 L440,16 L420,22 L400,18 L380,24 L360,19 L340,25 L320,20 L300,23 L280,17 L260,21 L240,18 L220,24 L200,19 L180,22 L160,17 L140,25 L120,20 L100,23 L80,16 L60,22 L40,18 L20,24 L0,20 Z" />
          </svg>
        </div>
      </ScrollSectionWrapper>

      {/* 4. TECHNICAL SKILLS SECTION (Staggered layout) */}
      <ScrollSectionWrapper id="skills" className="py-24 px-6 bg-dark-grey/20 relative overflow-hidden border-t border-b border-border-subtle/50">
        <WebCorner position="top-right" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          {/* Left Column: Outline number, title, objective note */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">03</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                CAPABILITIES
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Technologies I use to build web applications, AI-powered tools, and automation workflows.
            </p>

            {/* Growth Roadmap */}
            <div className="mt-4 border border-dashed border-border-strong bg-primary-red/5 p-4 rounded-none flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
              <p className="text-xs text-muted-grey leading-relaxed">
                <strong className="text-fdf3f2 block mb-1">Development Focus</strong>
                Building and improving full-stack applications, AI-powered features, and automation workflows while growing stronger in backend architecture, deployment, security, and production-ready development.
              </p>
            </div>
          </div>

          {/* Right Column: Arsenal Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PORTFOLIO_CONFIG.skills.map((skillGroup, index) => (
              <div key={index} className="border border-border-subtle bg-near-black/30 p-6 rounded-none flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold mb-4 border-b border-border-subtle pb-2">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-sans text-xs text-fdf3f2/90 bg-near-black/50 border border-border-subtle px-2.5 py-1 rounded-none"
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

      {/* 5. CERTIFICATIONS (Card grid layout) */}
      <ScrollSectionWrapper id="certifications" className="py-24 px-6 bg-dark-grey/20 relative overflow-hidden border-t border-b border-border-subtle/50">
        <WebCorner position="top-left" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">04</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                CREDENTIALS
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Completed certifications across AI, automation, and programming from industry-recognized platforms.
            </p>

            {/* Summary counts */}
            <div className="flex flex-col gap-2 border-t border-border-subtle/50 pt-5 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-grey/60">Total</span>
                <span className="font-mono text-xs font-bold text-fdf3f2">{PORTFOLIO_CONFIG.certifications.length}</span>
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
                  className="group border border-border-subtle bg-near-black hover:border-primary-red/30 rounded-none p-5 flex flex-col justify-between gap-4 transition-colors duration-200 relative overflow-hidden"
                >
                  {/* Corner accent lines (visible on hover) */}
                  <div className="absolute top-0 left-0 w-5 h-[1px] bg-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute top-0 left-0 w-[1px] h-5 bg-primary-red opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  <div className="flex flex-col gap-2">
                    {/* Category tag */}
                    <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red/70 font-bold">
                      {cert.category}
                    </span>
                    {/* Title */}
                    <h4 className="text-sm font-bold text-fdf3f2 leading-snug">
                      {cert.title}
                    </h4>
                    {/* Issuer + optional year */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-grey/70 uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                      {cert.year && (
                        <>
                          <span className="text-border-strong text-xs">·</span>
                          <span className="font-mono text-[10px] text-muted-grey/50 uppercase tracking-wider">
                            {cert.year}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* VIEW CERTIFICATE button */}
                  <a
                    href={cert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-primary-red hover:text-primary-red/70 transition-colors select-none w-fit group/btn"
                  >
                    <span>VIEW CERTIFICATE</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 6. EDUCATION (Minimal layout, no card framing) */}
      <ScrollSectionWrapper id="education" className="py-24 px-6 bg-near-black relative overflow-hidden">
        <WebCorner position="bottom-right" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">05</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                BACKGROUND
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Formal academic coordinates and coursework focus.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-border-subtle pt-8 flex items-start gap-4">
            <GraduationCap className="w-5 h-5 text-primary-red shrink-0 mt-1" />
            <div className="flex-1">
              <span className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold">Active Academic Coordinates</span>
              <h4 className="text-xl font-bold text-fdf3f2 mt-1">
                {PORTFOLIO_CONFIG.education.degree}
              </h4>
              {PORTFOLIO_CONFIG.education.semester && (
                <p className="font-mono text-xs text-muted-grey mt-0.5">
                  {PORTFOLIO_CONFIG.education.semester}
                </p>
              )}

              <p className="text-sm text-muted-grey mt-4 leading-relaxed max-w-2xl">
                Currently pursuing coursework at <strong className="text-fdf3f2">{PORTFOLIO_CONFIG.education.institution}</strong> in {PORTFOLIO_CONFIG.education.location}.
              </p>

              <div className="mt-8 border-t border-border-subtle/50 pt-6">
                <span className="font-mono text-xs text-muted-grey/60 uppercase tracking-widest font-bold block mb-3">Core Coursework Anchor</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Data Structures", "DBMS", "Operating Systems", "Java", "C Programming", "Relational Algebra", "SQL", "Web Applications"].map((course) => (
                    <span
                      key={course}
                      className="font-sans text-xs text-muted-grey bg-dark-grey border border-border-subtle px-2.5 py-1 rounded-none"
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

      {/* 7. GITHUB ACTIVITIES */}
      <ScrollSectionWrapper id="github-contributions" className="py-24 px-6 bg-dark-grey/10 relative overflow-hidden border-t border-b border-border-subtle/50">
        <WebCorner position="bottom-left" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative">
              <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10 -ml-4">06</div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
                OPEN SOURCE
              </h2>
            </div>

            <p className="text-base text-muted-grey leading-relaxed">
              Open source commits and repository tracking loaded in real-time from GitHub API queries.
            </p>
          </div>

          <div className="lg:col-span-8">
            <GitHubActivity />
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 9. RESUME DOWNLOAD ACTION (Sharp Banner design) */}
      <ScrollSectionWrapper id="resume-download" className="py-24 px-6 bg-near-black relative overflow-hidden">
        <WebCorner position="top-right" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="border border-border-strong bg-dark-grey/25 p-8 rounded-none text-center flex flex-col items-center justify-center gap-6 max-w-3xl mx-auto">
            <FileText className="w-8 h-8 text-primary-red" />
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold text-fdf3f2">Download Resume</h4>
              <p className="text-sm text-muted-grey max-w-md mx-auto leading-relaxed">
                Get a quick overview of my skills, projects, experience, and technical background.
              </p>
            </div>
            {PORTFOLIO_CONFIG.resumePath ? (
              <a
                href={PORTFOLIO_CONFIG.resumePath}
                download="Rohith_Gowda_Resume.pdf"
                className="bg-primary-red hover:bg-primary-red/90 text-near-black font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-none font-bold transition-colors select-none"
              >
                DOWNLOAD RESUME →
              </a>
            ) : (
              <button
                onClick={() => handlePlaceholderClick()}
                className="bg-primary-red hover:bg-primary-red/90 text-near-black font-mono text-xs uppercase tracking-wider px-8 py-4 rounded-none font-bold transition-colors select-none cursor-pointer outline-none"
              >
                DOWNLOAD RESUME →
              </button>
            )}
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* 7. CONTACT / CONNECTION SECTION (Redesigned centered layout) */}
      <ScrollSectionWrapper id="contact" className="py-24 px-6 bg-dark-grey/20 relative overflow-hidden border-t border-border-subtle/50">
        <WebCorner position="bottom-right" />
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          {/* Heading with outline number 07 */}
          <div className="relative text-center mb-16">
            <div className="font-mono text-8xl md:text-9xl text-border-strong font-extrabold leading-none select-none opacity-10">07</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2 leading-none uppercase mt-2">
              CONNECTION
            </h2>
            <p className="text-sm text-muted-grey leading-relaxed mt-4 max-w-md mx-auto">
              Interested in software internships, software developer fresher roles, or collaborative projects? Let's connect.
            </p>
          </div>

          {/* Connection options as clean technical rows */}
          <div className="w-full max-w-2xl flex flex-col divide-y divide-border-subtle/50 border-t border-b border-border-subtle/50 select-none">
            {/* Email Row */}
            <a
              href={`mailto:${PORTFOLIO_CONFIG.contactEmail}`}
              className="group py-6 flex items-center justify-between outline-none transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle group-hover:border-primary-red/30 rounded-none flex items-center justify-center bg-near-black transition-colors">
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

            {/* Phone Row */}
            <a
              href={`tel:${PORTFOLIO_CONFIG.contactPhone.replace(/\s+/g, '')}`}
              className="group py-6 flex items-center justify-between outline-none transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle group-hover:border-primary-red/30 rounded-none flex items-center justify-center bg-near-black transition-colors">
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

            {/* LinkedIn Row */}
            <a
              href={PORTFOLIO_CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-6 flex items-center justify-between outline-none transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle group-hover:border-primary-red/30 rounded-none flex items-center justify-center bg-near-black transition-colors">
                  <LinkedinIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">LINKEDIN</span>
                  <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                    LinkedIn
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* GitHub Row */}
            <a
              href={PORTFOLIO_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-6 flex items-center justify-between outline-none transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle group-hover:border-primary-red/30 rounded-none flex items-center justify-center bg-near-black transition-colors">
                  <GithubIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">GITHUB</span>
                  <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                    GitHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Instagram Row */}
            <a
              href={PORTFOLIO_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-6 flex items-center justify-between outline-none transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle group-hover:border-primary-red/30 rounded-none flex items-center justify-center bg-near-black transition-colors">
                  <InstagramIcon className="w-4.5 h-4.5 text-muted-grey group-hover:text-primary-red transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey/50">INSTAGRAM</span>
                  <span className="font-sans text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors mt-0.5">
                    Instagram
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-grey group-hover:text-primary-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </ScrollSectionWrapper>

      {/* FOOTER */}
      <footer className="border-t border-border-subtle bg-near-black py-8 px-6 text-center select-none text-muted-grey text-xs font-mono">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {PORTFOLIO_CONFIG.name}. All rights reserved.</p>
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
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
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
