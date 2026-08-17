import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Calendar,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';
import { PlaceholderBox } from './PlaceholderBox';

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

export const getProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const transitionEntrance = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const springHover = { type: 'spring' as const, stiffness: 300, damping: 30 };

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const shouldReduceMotion = useReducedMotion();

  // Find the project based on the slug
  const project = PORTFOLIO_CONFIG.featuredProjects.find(
    (p) => getProjectSlug(p.title) === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-near-black text-fdf3f2 flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-primary-red mb-4 uppercase tracking-widest font-mono">Project Not Found</h2>
        <p className="text-sm text-muted-grey mb-6">The requested project details page could not be located.</p>
        <Link to="/" className="border border-border-strong text-fdf3f2 px-6 py-4 rounded-none font-mono text-xs uppercase tracking-wider hover:border-primary-red hover:bg-primary-red/5 transition-all">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const isPwa = project.title.includes('Health Tracker');

  const clipPathStyle = {
    clipPath: 'polygon(0% 50%, 3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%)',
    WebkitClipPath: 'polygon(0% 50%, 3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%)'
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? {} : { opacity: 0, y: -24 }}
      transition={transitionEntrance}
      className="min-h-screen bg-near-black text-fdf3f2 py-24 px-6 relative overflow-x-hidden font-sans selection:bg-primary-red selection:text-near-black"
    >
      {/* Background Subtle gridlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-40">

        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-grey hover:text-primary-red transition-colors group select-none"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>

        {/* Outer hexagon container wrapper */}
        <div
          className="bg-border-strong p-[1px]"
          style={clipPathStyle}
        >
          <div
            className="bg-near-black p-6 md:p-16 relative"
            style={clipPathStyle}
          >
            {/* Header section inside hexagon */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border-subtle pb-6 mb-8 mt-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-fdf3f2">
                    {project.title}
                  </h1>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-none border ${project.badge === 'Live'
                        ? 'border-green-500/30 text-green-400 bg-green-500/5'
                        : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'
                      }`}
                  >
                    {project.badge}
                  </span>
                </div>
                {project.role && (
                  <p className="font-mono text-xs uppercase tracking-wider text-primary-red mt-2 font-bold">
                    Role: {project.role}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.015 }}
                    transition={springHover}
                    className="bg-primary-red text-near-black px-5 py-3 rounded-none font-bold transition-colors flex items-center gap-1.5 outline-none select-none"
                  >
                    Live Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.015 }}
                    transition={springHover}
                    className="border border-border-strong hover:border-primary-red hover:bg-primary-red/5 text-fdf3f2 px-5 py-3 rounded-none transition-colors flex items-center gap-1.5 outline-none select-none"
                  >
                    <GithubIcon className="text-primary-red" />
                    Codebase
                  </motion.a>
                )}
              </div>
            </div>

            {/* Screenshots Placeholder */}
            <div className="mb-8 p-1 border border-border-subtle bg-dark-grey/10 max-w-4xl mx-auto">
              <PlaceholderBox
                text={`Add ${project.title} dashboard screenshot`}
                className="h-64 md:h-80 w-full rounded-none"
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold mb-3">Project Narrative</h3>
              <p className="text-base text-muted-grey leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Interactive Features List */}
            {isPwa && project.features && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-t border-border-subtle pt-8">
                {/* Live Features */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-green-400 font-bold">Live Features</span>
                  </div>
                  <ul className="space-y-2">
                    {project.features.live.map((feat, idx) => (
                      <li key={idx} className="text-xs text-muted-grey flex items-start gap-1">
                        <span className="text-green-500/70 select-none mr-1.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* In Progress Features */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <RefreshCw className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-yellow-400 font-bold">In Progress</span>
                  </div>
                  <ul className="space-y-2">
                    {project.features.inProgress.map((feat, idx) => (
                      <li key={idx} className="text-xs text-muted-grey flex items-start gap-1">
                        <span className="text-yellow-500/70 select-none mr-1.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Planned Features */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-primary-red/70" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary-red/70 font-bold">Planned Roadmap</span>
                  </div>
                  <ul className="space-y-2">
                    {project.features.planned.map((feat, idx) => (
                      <li key={idx} className="text-xs text-muted-grey/70 flex items-start gap-1">
                        <span className="text-primary-red/50 select-none mr-1.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* General listFeatures (non-PWA) */}
            {!isPwa && project.listFeatures && (
              <div className="mb-8 border-t border-border-subtle pt-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold mb-4">Key Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.listFeatures.map((feat, idx) => (
                    <div key={idx} className="text-xs text-muted-grey flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-red mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Hurdles Solved (Challenges) */}
            {project.challenges && (
              <div className="border-t border-border-subtle pt-8 mb-8">
                <div className="flex items-center gap-2 mb-4 text-primary-red">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Technical Hurdles Solved</h3>
                </div>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="text-xs text-muted-grey flex items-start gap-2">
                      <span className="font-mono text-primary-red font-bold select-none">{idx + 1}.</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div className="border-t border-border-subtle pt-6 mb-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold mb-3">Technologies Leveraged</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] text-fdf3f2/70 bg-dark-grey border border-border-subtle px-2.5 py-1 rounded-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Case Study Section (Rendered exclusively for Health Tracker PWA) */}
            {isPwa && (
              <div className="border-t border-border-subtle pt-8 mt-8 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold">03 / CASE STUDY</span>
                  <h3 className="text-xl font-bold text-fdf3f2 mt-2">Health Tracker PWA Architecture</h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-fdf3f2/60 font-bold mb-1">Problem</h4>
                    <p className="text-sm text-muted-grey leading-relaxed">
                      Tracking personal home-workouts effectively without having to rely on heavy, gym-centric mobile apps can be a challenge. Most available solutions are tailored heavily towards commercial gym machinery, requiring constant internet synchronization and bloated features. This application was built to fill that gap—creating a light, focused workout logging system optimized for offline-ready home exercises and routines.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-fdf3f2/60 font-bold mb-1">Approach</h4>
                    <p className="text-sm text-muted-grey leading-relaxed">
                      The core architecture utilizes PostgreSQL and Prisma ORM rather than raw SQL to ensure type-safe database queries, schema reliability, and quick development migrations. Supabase Auth paired with Google OAuth coordinates user login states, enabling secure, credential-free onboarding. Choosing a Progressive Web App (PWA) configuration allows the app to load instantly from home screens, cache exercise libraries locally, and offer a fast, offline-resilient experience akin to native apps.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-primary-red font-bold mb-1">A Hard Part</h4>
                    <div className="border border-dashed border-primary-red/30 bg-primary-red/5 p-4 rounded-none">
                      <p className="text-xs font-mono text-muted-grey">
                        Implementing reliable offline caching for the home exercise library while keeping Supabase Auth session state intact across PWA reloads required careful coordination between the service worker and React Router's protected route logic.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-fdf3f2/60 font-bold mb-2">Current State</h4>
                    <p className="text-sm text-muted-grey leading-relaxed mb-3">
                      Here is where the product development cycle stands right now:
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      <span className="border border-green-500/30 text-green-400 bg-green-500/5 px-2 py-1.5 rounded-none">
                        LIVE: Auth, Exercise Library, BMI, Intake Tracks
                      </span>
                      <span className="border border-yellow-500/30 text-yellow-400 bg-yellow-500/5 px-2 py-1.5 rounded-none">
                        IN PROGRESS: Weight Dashboard, Recharts Analytics
                      </span>
                      <span className="border border-primary-red/30 text-primary-red bg-primary-red/5 px-2 py-1.5 rounded-none">
                        PLANNED: Routine Planner, Workout Goal Profiles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </motion.div>
  );
};
export default ProjectDetailPage;
