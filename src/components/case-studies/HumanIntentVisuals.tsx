import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Sparkles, Terminal, Cpu } from 'lucide-react';

export const HumanIntentVisuals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'decomposition' | 'benchmarks'>('comparison');
  const [activeMode, setActiveMode] = useState<'quick' | 'professional' | 'deep'>('professional');

  const modes = [
    { id: 'quick', name: 'Quick Mode', latency: '~8s', badge: 'Fast Polish' },
    { id: 'professional', name: 'Professional Mode', latency: '15.6s', badge: 'Accepted v1.0 Fast-Path' },
    { id: 'deep', name: 'Deep Mode', latency: '25.5s', badge: 'Exhaustive Constraints' }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Disclaimers */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold block mb-1">
            DEMONSTRATION // LOCAL PIPELINE RUNNER
          </span>
          <h4 className="text-lg font-bold text-fdf3f2">HumanIntent Interactive Transformation Preview</h4>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-full font-mono text-[10px]">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id as any)}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeMode === m.id
                  ? 'bg-primary-red text-near-black font-bold shadow-md'
                  : 'text-muted-grey hover:text-fdf3f2'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 font-mono text-xs">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'comparison'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary-red" />
          <span>Before / After Transformation</span>
        </button>

        <button
          onClick={() => setActiveTab('decomposition')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'decomposition'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-primary-red" />
          <span>Constraint & Ambiguity Decomposition</span>
        </button>

        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'benchmarks'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span>Verification & Acceptance Audit</span>
        </button>
      </div>

      {/* TAB 1: BEFORE / AFTER PROMPT COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before: Raw User Prompt */}
          <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-grey flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-muted-grey" />
                  RAW USER INPUT (UNSTRUCTURED)
                </span>
                <span className="font-mono text-[9px] text-yellow-400/80 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                  Ambiguity High • Constraints Vulnerable
                </span>
              </div>
              <div className="font-mono text-xs text-muted-grey bg-black/60 p-4 rounded-xl border border-white/5 leading-relaxed selection:bg-primary-red selection:text-near-black">
                "make me a react login component with email password validation and dark theme also don't use redux and remember it needs client-side rate limiting after 5 failed attempts and clean accessible error messages"
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-grey/60">Flaws in Raw Prompt:</span>
                <ul className="space-y-1.5 text-xs text-muted-grey">
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary-red font-bold">✕</span>
                    <span>Negative constraint ("don't use redux") easily overlooked by standard LLMs</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary-red font-bold">✕</span>
                    <span>Vague state lifecycle ("clean error messages" lacks ARIA accessibility schema)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-primary-red font-bold">✕</span>
                    <span>No TypeScript types or component interface contract declared</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-muted-grey">
              <span>Length: 26 words</span>
              <span>Deterministic Preprocess: 1.4ms</span>
            </div>
          </div>

          {/* After: Optimized Structured Prompt */}
          <div className="bg-[#0b0b0b] border border-primary-red/30 rounded-2xl p-5 flex flex-col justify-between shadow-[0_0_30px_rgba(235,74,66,0.06)]">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary-red font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  HUMANINTENT OPTIMIZED PROMPT ({activeMode.toUpperCase()})
                </span>
                <span className="font-mono text-[9px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Verified Zero-Loss
                </span>
              </div>

              <div className="font-mono text-xs text-fdf3f2 bg-black/80 p-4 rounded-xl border border-white/10 leading-relaxed overflow-x-auto max-h-72 selection:bg-primary-red selection:text-near-black">
                <p className="text-primary-red font-bold mb-2"># ROLE & CONTEXT</p>
                <p className="text-muted-grey mb-3">You are a Senior Frontend Engineer building accessible, production-grade React components in TypeScript.</p>

                <p className="text-primary-red font-bold mb-1"># TASK SPECIFICATION</p>
                <p className="text-muted-grey mb-3">Create a reusable, single-file Login component using React 19 and Tailwind CSS with native dark-mode styling.</p>

                <p className="text-primary-red font-bold mb-1"># STRICT CONSTRAINTS (DETERMINISTICALLY PRESERVED)</p>
                <ul className="text-fdf3f2/90 space-y-1 mb-3">
                  <li>• <strong className="text-yellow-400">[NEGATIVE CONSTRAINT]</strong> Do NOT install or import Redux or external state managers. Use local React state (`useState`/`useReducer`).</li>
                  <li>• <strong className="text-yellow-400">[SECURITY]</strong> Implement client-side lockout after 5 consecutive failed attempts (60-second cooldown with countdown timer).</li>
                  <li>• <strong className="text-yellow-400">[ACCESSIBILITY]</strong> Error banners must use ARIA live regions (`aria-live="polite"` and `aria-describedby`).</li>
                  <li>• <strong className="text-yellow-400">[VALIDATION]</strong> Validate RFC-5322 email formatting and password minimum complexity (8+ chars) before submission.</li>
                </ul>

                <p className="text-primary-red font-bold mb-1"># DELIVERABLE OUTPUT</p>
                <p className="text-muted-grey">Provide self-contained TypeScript code with full interface definitions for props and submission payload.</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-muted-grey">
              <span className="text-green-400 flex items-center gap-1">
                <Check className="w-3 h-3" /> Constraints: 4/4 Enforced
              </span>
              <span>Inference Time: {activeMode === 'quick' ? '8.2s' : activeMode === 'deep' ? '25.5s' : '15.62s'}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONSTRAINT & AMBIGUITY DECOMPOSITION */}
      {activeTab === 'decomposition' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-3 text-primary-red font-mono text-xs uppercase font-bold">
              <Zap className="w-4 h-4" />
              <span>Extracted Intent Vector</span>
            </div>
            <p className="text-xs text-muted-grey mb-3">
              Programmatic extraction of the primary goal, user persona, and delivery format before sending prompt tokens.
            </p>
            <div className="bg-black/60 p-3 rounded-lg border border-white/5 font-mono text-[11px] space-y-1 text-fdf3f2/80">
              <div><span className="text-primary-red">Goal:</span> Secure Auth Form</div>
              <div><span className="text-primary-red">Tech:</span> React / TS / Tailwind</div>
              <div><span className="text-primary-red">Audience:</span> Production Frontend</div>
              <div><span className="text-primary-red">Style:</span> Dark Cinematic UI</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-3 text-yellow-400 font-mono text-xs uppercase font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Negative & Hard Limits</span>
            </div>
            <p className="text-xs text-muted-grey mb-3">
              Negative conditions are tagged with critical priority weight in the system template to prevent model omission.
            </p>
            <div className="bg-black/60 p-3 rounded-lg border border-white/5 font-mono text-[11px] space-y-1 text-fdf3f2/80">
              <div className="text-yellow-400">• NO Redux dependency</div>
              <div className="text-yellow-400">• NO External OAuth bypass</div>
              <div className="text-yellow-400">• Max 5 attempts before lockout</div>
              <div className="text-yellow-400">• Native CSS dark variables</div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-3 text-primary-red font-mono text-xs uppercase font-bold">
              <Terminal className="w-4 h-4" />
              <span>Ambiguity Detection</span>
            </div>
            <p className="text-xs text-muted-grey mb-3">
              Detects underspecified engineering specs and attaches sensible defaults without silently guessing.
            </p>
            <div className="bg-black/60 p-3 rounded-lg border border-white/5 font-mono text-[11px] space-y-1 text-fdf3f2/80">
              <div><span className="text-primary-red">Auth API:</span> REST Mock (Flagged)</div>
              <div><span className="text-primary-red">Lockout:</span> 60-second default</div>
              <div><span className="text-primary-red">ARIA:</span> Injected live region</div>
              <div><span className="text-primary-red">State:</span> useReducer suggested</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VERIFICATION & ACCEPTANCE AUDIT */}
      {activeTab === 'benchmarks' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0b0b0b] border border-green-500/30 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-green-400 font-bold">AUTOMATED SUITE</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">442 / 442</div>
              <p className="text-xs text-muted-grey mt-1">100% test pass rate across unit, regression & constraint validation.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-green-400">
              Status: PASSED
            </div>
          </div>

          <div className="bg-[#0b0b0b] border border-green-500/30 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-green-400 font-bold">BLIND PROBES</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">10 / 10</div>
              <p className="text-xs text-muted-grey mt-1">Independent blind evaluation probes verified for intent retention.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-green-400">
              Fidelity: 100%
            </div>
          </div>

          <div className="bg-[#0b0b0b] border border-white/10 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold">P50 LATENCY</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">15.62s</div>
              <p className="text-xs text-muted-grey mt-1">NVIDIA RTX 3050 Laptop GPU running local Ollama (Llama 3 8B).</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-muted-grey">
              P95 Latency: 25.50s
            </div>
          </div>

          <div className="bg-[#0b0b0b] border border-white/10 p-5 rounded-xl flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey font-bold">PRIVACY & COST</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">$0.00</div>
              <p className="text-xs text-muted-grey mt-1">Zero cloud API token fees; zero external network egress.</p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[10px] text-muted-grey">
              Engine: Localhost:11434
            </div>
          </div>
        </div>
      )}

      {/* Transparent Labeling Banner */}
      <div className="border border-white/5 bg-white/2 p-4 rounded-xl flex items-center justify-between text-[11px] font-mono text-muted-grey">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
          Technical Preview: Illustrative interface preview representing HumanIntent accepted v1.0 local execution.
        </span>
        <span className="text-fdf3f2/60 hidden sm:inline">RTX 3050 • Ollama • Llama 3</span>
      </div>
    </div>
  );
};
