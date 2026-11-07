import React from 'react';
import { ArrowRight, Database, Cpu, CheckCircle2, Terminal, Sparkles } from 'lucide-react';
import type { ArchitectureStep } from '../../portfolioConfig';

interface WorkflowDiagramProps {
  steps: ArchitectureStep[];
  title?: string;
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ steps, title = "System Architecture & Execution Pipeline" }) => {
  const getStepIcon = (type?: string) => {
    switch (type) {
      case 'input':
        return <Terminal className="w-4 h-4 text-primary-red" />;
      case 'ai':
        return <Cpu className="w-4 h-4 text-primary-red" />;
      case 'verify':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'output':
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      default:
        return <Database className="w-4 h-4 text-fdf3f2/70" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-xs uppercase tracking-widest text-primary-red font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary-red rounded-full animate-pulse" />
          {title}
        </h4>
        <span className="font-mono text-[10px] text-muted-grey/60 uppercase tracking-wider">
          {steps.length} Pipeline Stages
        </span>
      </div>

      {/* Responsive Horizontal / Vertical Node Chain */}
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
        {/* Subtle background circuit grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Node Box */}
                <div className="flex-1 min-w-0 bg-[#0d0d0d]/90 border border-white/10 hover:border-primary-red/50 transition-all duration-300 rounded-xl p-4 flex flex-col justify-between group shadow-lg">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold text-primary-red/80 px-2 py-0.5 rounded bg-primary-red/10 border border-primary-red/20">
                      {step.step}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center border border-white/5">
                      {getStepIcon(step.type)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-sans text-xs md:text-sm font-bold text-fdf3f2 group-hover:text-primary-red transition-colors leading-tight">
                      {step.label}
                    </h5>
                    {step.desc && (
                      <p className="font-sans text-[11px] text-muted-grey mt-1.5 leading-relaxed line-clamp-3">
                        {step.desc}
                      </p>
                    )}
                  </div>
                </div>

                {/* Arrow Connector */}
                {!isLast && (
                  <div className="flex items-center justify-center py-1 lg:py-0 text-primary-red/40 shrink-0">
                    <ArrowRight className="w-4 h-4 transform rotate-90 lg:rotate-0" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

