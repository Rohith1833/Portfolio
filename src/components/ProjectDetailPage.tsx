import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Cpu,
  Layers,
  Sparkles,
  Database,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { PORTFOLIO_CONFIG, getProjectSlug } from '../portfolioConfig';
import type { Project, ChallengeDetail } from '../portfolioConfig';
import { PlaceholderBox } from './PlaceholderBox';
import { WebCorner } from './WebCorner';
import { WorkflowDiagram } from './case-studies/WorkflowDiagram';
import { HumanIntentVisuals } from './case-studies/HumanIntentVisuals';
import { FoodDeliveryVisuals } from './case-studies/FoodDeliveryVisuals';
import { LocalLensVisuals } from './case-studies/LocalLensVisuals';

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



const transitionEntrance = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const springHover = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const shouldReduceMotion = useReducedMotion();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Search in both featuredProjects and academicProjects
  const allProjects: Project[] = [
    ...PORTFOLIO_CONFIG.featuredProjects,
    ...PORTFOLIO_CONFIG.academicProjects
  ];

  const project = allProjects.find(
    (p) => getProjectSlug(p.title) === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#080808] text-fdf3f2 flex flex-col items-center justify-center p-6 selection:bg-primary-red selection:text-near-black">
        <h2 className="text-xl font-bold text-primary-red mb-4 uppercase tracking-widest font-mono">Project Not Found</h2>
        <p className="text-sm text-muted-grey mb-6">The requested case study could not be located in the project registry.</p>
        <Link
          to="/#projects"
          className="border border-white/20 text-fdf3f2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider hover:border-primary-red hover:bg-primary-red/10 transition-all"
        >
          Return to Portfolio Projects
        </Link>
      </div>
    );
  }

  const slug = getProjectSlug(project.title);
  const isHumanIntent = slug === 'humanintent';
  const isFoodDelivery = slug === 'food-delivery-time-predictor';
  const isLocalLens = slug === 'locallens';

  const handleLinkNotice = (type: 'demo' | 'github') => {
    if (type === 'demo') {
      if (isHumanIntent) {
        setModalMessage("HumanIntent runs local inference on Ollama & Llama 3 via an NVIDIA RTX 3050 Laptop GPU. There is no commercial cloud URL, ensuring zero data egress.");
      } else if (isFoodDelivery) {
        setModalMessage("Food Delivery Predictor is designed as a local Streamlit application. Live deployment on a public host is pending containerized cloud deployment.");
      } else if (isLocalLens) {
        setModalMessage("LocalLens runs locally using Streamlit and SQLite for rapid review intelligence. Online hosting will be provided once deployed.");
      } else {
        setModalMessage("This project is currently running in local development mode.");
      }
    } else {
      setModalMessage(`The source repository for ${project.title} is hosted on GitHub under Rohith1833.`);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -24 }}
      transition={transitionEntrance}
      className="min-h-screen bg-[#080808] text-fdf3f2 py-20 px-4 sm:px-6 relative overflow-x-hidden font-sans selection:bg-primary-red selection:text-near-black"
    >
      {/* Ambient background noise overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-red/4 blur-[140px] ambient-glow-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-red/3 blur-[140px] ambient-glow-pulse" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Web Corner Motifs */}
      <WebCorner position="top-left" />
      <WebCorner position="bottom-right" />

      {/* Modal / Toast Notice */}
      {modalMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-2xl border border-white/20 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary-red font-mono text-xs uppercase tracking-wider font-bold">
              <Info className="w-4 h-4" />
              <span>Deployment & Repository Notice</span>
            </div>
            <p className="text-sm text-muted-grey leading-relaxed">
              {modalMessage}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setModalMessage(null)}
                className="bg-primary-red text-near-black font-mono text-xs uppercase px-5 py-2 rounded-full font-bold cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-20 flex flex-col gap-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-grey hover:text-primary-red transition-colors group select-none bg-white/5 border border-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
            Back to Projects Portfolio
          </Link>

          <span className="font-mono text-[10px] text-muted-grey uppercase tracking-widest hidden sm:inline">
            SYSTEM://CASE_STUDY_V2
          </span>
        </div>

        {/* 1. PROJECT HERO SECTION */}
        <header className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col gap-6">
            {/* Badges & Category */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-primary-red/40 text-primary-red bg-primary-red/10 font-bold">
                {project.category || "Engineering Project"}
              </span>

              {project.badge && (
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                    project.badge === 'Featured'
                      ? 'border-primary-red text-fdf3f2 bg-primary-red/20 font-bold'
                      : project.badge === 'Live'
                      ? 'border-green-500/40 text-green-400 bg-green-500/10'
                      : 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10'
                  }`}
                >
                  {project.badge}
                </span>
              )}

              {project.isFlagship && (
                <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-primary-red/50 text-fdf3f2 bg-primary-red font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(235,74,66,0.3)]">
                  <Sparkles className="w-3 h-3 text-near-black fill-near-black" />
                  Primary Featured Project
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-fdf3f2 leading-tight">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-base sm:text-xl text-primary-red/90 mt-2 font-medium">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Role & Context Meta */}
            {project.role && (
              <div className="font-mono text-xs text-muted-grey flex items-center gap-2 border-t border-white/5 pt-4">
                <span className="text-primary-red font-bold uppercase tracking-wider">Engineering Role:</span>
                <span className="text-fdf3f2">{project.role}</span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs uppercase tracking-wider">
              {project.demoUrl ? (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  transition={springHover}
                  className="bg-primary-red text-near-black px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(235,74,66,0.25)]"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              ) : (
                <motion.button
                  onClick={() => handleLinkNotice('demo')}
                  whileHover={{ y: -2 }}
                  transition={springHover}
                  className="bg-white/10 hover:bg-white/15 text-fdf3f2 px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
                >
                  <span>{isHumanIntent ? 'Local Ollama Runtime' : 'Streamlit Local Engine'}</span>
                  <Info className="w-3.5 h-3.5 text-primary-red" />
                </motion.button>
              )}

              {project.githubUrl ? (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  transition={springHover}
                  className="glass-card glass-card-hover px-6 py-3 rounded-full text-fdf3f2 flex items-center gap-2"
                >
                  <GithubIcon className="text-primary-red" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-grey" />
                </motion.a>
              ) : (
                <motion.button
                  onClick={() => handleLinkNotice('github')}
                  whileHover={{ y: -2 }}
                  transition={springHover}
                  className="glass-card glass-card-hover px-6 py-3 rounded-full text-fdf3f2 flex items-center gap-2 cursor-pointer"
                >
                  <GithubIcon className="text-primary-red" />
                  <span>GitHub: Rohith1833</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-grey" />
                </motion.button>
              )}
            </div>
          </div>
        </header>

        {/* 2. PROJECT OVERVIEW */}
        <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
            <span>01 / Project Overview</span>
          </div>
          <p className="text-base text-fdf3f2/90 leading-relaxed">
            {project.overview || project.description}
          </p>
          {project.datasetInfo && (
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-xs text-muted-grey flex items-start gap-2 mt-2">
              <Database className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
              <div>
                <strong className="text-fdf3f2 block">Benchmark Dataset:</strong>
                {project.datasetInfo}
              </div>
            </div>
          )}
        </section>

        {/* 3 & 4. PROBLEM STATEMENT & SOLUTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Statement */}
          <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold mb-3">
                <ShieldAlert className="w-4 h-4" />
                <span>02 / Problem Statement</span>
              </div>
              <p className="text-sm text-muted-grey leading-relaxed">
                {project.problemStatement || "Addressing critical operational bottlenecks, unstructured input fragility, and inconsistent outputs through deterministic software engineering."}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-primary-red/80">
              [IDENTIFIED FRICTION POINT]
            </div>
          </section>

          {/* Solution */}
          <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-green-400 font-bold mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>03 / Engineered Solution</span>
              </div>
              <p className="text-sm text-muted-grey leading-relaxed">
                {project.solutionStatement || "Developed a unified, reproducible system that blends deterministic logic with intelligent processing to guarantee reliability and zero data loss."}
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-green-400/80">
              [DELIVERED CAPABILITY]
            </div>
          </section>
        </div>

        {/* 5. KEY FEATURES */}
        <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
              <Sparkles className="w-4 h-4" />
              <span>04 / Core Features & Capabilities</span>
            </div>
            <span className="font-mono text-[10px] text-muted-grey">Production Specifications</span>
          </div>

          {/* Render live features or listFeatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(project.features?.live || project.listFeatures || []).map((feat, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-start gap-3 hover:border-primary-red/30 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary-red shrink-0 mt-0.5" />
                <span className="text-xs text-muted-grey leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {project.features?.inProgress && project.features.inProgress.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-yellow-400 font-bold block mb-3">
                In-Progress Roadmap Features
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.inProgress.map((item, idx) => (
                  <div key={idx} className="text-xs text-muted-grey flex items-center gap-2 bg-yellow-500/5 border border-yellow-500/10 p-3 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 6. TECHNOLOGY STACK */}
        <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
            <Cpu className="w-4 h-4" />
            <span>05 / Technology Stack & Components</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs text-fdf3f2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full hover:border-primary-red/50 hover:bg-primary-red/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 7. SYSTEM ARCHITECTURE OR WORKFLOW */}
        {project.workflow && project.workflow.length > 0 && (
          <section className="flex flex-col gap-4">
            <WorkflowDiagram
              steps={project.workflow}
              title={`06 / System Architecture & Execution Flow (${project.title})`}
            />
          </section>
        )}

        {/* 8. ENGINEERING HIGHLIGHTS & CHALLENGES */}
        {(project.engineeringHighlights || project.challenges) && (
          <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>07 / Engineering Challenges & Solutions</span>
              </div>
              <span className="font-mono text-[10px] text-muted-grey">Technical Problem Solving</span>
            </div>

            {/* Challenges list */}
            {project.challenges && (
              <div className="grid grid-cols-1 gap-4">
                {project.challenges.map((c, idx) => {
                  if (typeof c === 'string') {
                    return (
                      <div key={idx} className="bg-black/50 border border-white/5 p-4 rounded-xl flex items-start gap-3">
                        <span className="font-mono text-primary-red font-bold text-xs">{idx + 1}.</span>
                        <p className="text-xs text-muted-grey leading-relaxed">{c}</p>
                      </div>
                    );
                  }
                  const challengeObj = c as ChallengeDetail;
                  return (
                    <div key={idx} className="bg-black/50 border border-white/5 p-5 rounded-2xl flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-fdf3f2">
                        <span className="text-primary-red">HURDLE {idx + 1}:</span>
                        <span>{challengeObj.problem}</span>
                      </div>
                      <div className="border-t border-white/5 pt-2 text-xs text-muted-grey leading-relaxed flex items-start gap-2">
                        <span className="text-green-400 font-mono font-bold">SOLUTION:</span>
                        <span>{challengeObj.solution}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Engineering Highlights */}
            {project.engineeringHighlights && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-grey/60 font-bold block mb-4">
                  Engineering System Highlights
                </span>
                <ul className="space-y-2.5">
                  {project.engineeringHighlights.map((hl, idx) => (
                    <li key={idx} className="text-xs text-muted-grey flex items-start gap-2">
                      <span className="text-primary-red select-none font-mono">▸</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* 9. RESULTS & EVALUATION */}
        {project.resultsAndEvaluation && project.resultsAndEvaluation.length > 0 && (
          <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>08 / Results & Empirical Evaluation</span>
              </div>
              <span className="font-mono text-[10px] text-muted-grey">Reported Test Metrics</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {project.resultsAndEvaluation.map((item, idx) => (
                <div key={idx} className="bg-black/60 border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-grey">
                    {item.metric}
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-fdf3f2 my-2">
                    {item.value}
                  </div>
                  {item.note && (
                    <span className="text-[11px] text-muted-grey leading-tight">
                      {item.note}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {project.hardwareSpecs && (
              <div className="bg-white/2 border border-white/5 p-4 rounded-xl font-mono text-xs text-muted-grey flex items-center justify-between">
                <span>Hardware Environment:</span>
                <span className="text-fdf3f2 font-bold">{project.hardwareSpecs}</span>
              </div>
            )}

            {/* Evaluation & Accuracy Notes */}
            {project.evaluationNotes && (
              <div className="border border-white/10 bg-white/5 p-4 rounded-2xl flex flex-col gap-2 font-mono text-xs text-muted-grey">
                <span className="text-primary-red font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Accuracy & Verification Disclosures
                </span>
                <ul className="space-y-1">
                  {project.evaluationNotes.map((note, idx) => (
                    <li key={idx} className="text-[11px] leading-relaxed">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* 10. SCREENSHOTS & VISUAL DEMONSTRATIONS */}
        <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
              <Layers className="w-4 h-4" />
              <span>09 / Technical Visualizations & Interactive Previews</span>
            </div>
            <span className="font-mono text-[10px] text-muted-grey">System Simulation</span>
          </div>

          {/* Render custom interactive visuals depending on project */}
          {isHumanIntent && <HumanIntentVisuals />}
          {isFoodDelivery && <FoodDeliveryVisuals />}
          {isLocalLens && <LocalLensVisuals />}

          {/* Fallback for other projects */}
          {!isHumanIntent && !isFoodDelivery && !isLocalLens && (
            <div className="flex flex-col gap-4">
              <PlaceholderBox
                text={`Verified System Preview for ${project.title}`}
                className="h-64 rounded-2xl w-full"
              />
              <p className="text-xs text-muted-grey font-mono text-center">
                Visual placeholder configured for future asset drop. No fabricated screenshots applied.
              </p>
            </div>
          )}
        </section>

        {/* 11. LIMITATIONS & FUTURE IMPROVEMENTS */}
        {project.limitationsAndFuture && project.limitationsAndFuture.length > 0 && (
          <section className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary-red font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
              <span>10 / Limitations & Engineering Roadmap</span>
            </div>
            <p className="text-xs text-muted-grey">
              Honest technical appraisal of current system boundaries and targeted architectural improvements:
            </p>
            <div className="space-y-2 mt-2">
              {project.limitationsAndFuture.map((lim, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 p-4 rounded-xl text-xs text-muted-grey leading-relaxed flex items-start gap-2">
                  <span className="text-primary-red font-mono">→</span>
                  <span>{lim}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. GITHUB & DEMO LINKS FOOTER */}
        <footer className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-fdf3f2">Interested in the code or architecture?</h4>
            <p className="text-xs text-muted-grey mt-1">Explore repository structure or review documentation.</p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider flex-wrap">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-red text-near-black px-6 py-3 rounded-full font-bold transition-all flex items-center gap-1.5 shadow-[0_4px_15px_rgba(235,74,66,0.25)] hover:bg-primary-red/90"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover px-6 py-3 rounded-full text-fdf3f2 flex items-center gap-2"
              >
                <GithubIcon className="text-primary-red" />
                <span>Source Code</span>
              </a>
            ) : (
              <button
                onClick={() => handleLinkNotice('github')}
                className="glass-card glass-card-hover px-6 py-3 rounded-full text-fdf3f2 flex items-center gap-2 cursor-pointer"
              >
                <GithubIcon className="text-primary-red" />
                <span>Codebase Notice</span>
              </button>
            )}

            <Link
              to="/#projects"
              className="bg-primary-red text-near-black px-6 py-3 rounded-full font-bold hover:bg-primary-red/90 transition-all"
            >
              All Projects →
            </Link>
          </div>
        </footer>

      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;
