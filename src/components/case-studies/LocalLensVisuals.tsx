import React, { useState } from 'react';
import { MessageSquareText, BarChart2, ShieldCheck, Split } from 'lucide-react';

export const LocalLensVisuals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'distribution' | 'evaluation'>('explorer');

  // Pre-configured review examples
  const sampleReviews = [
    {
      id: 1,
      text: "The pasta and garlic bread were exquisite, but our waiter was completely inattentive and the wait time was over 45 minutes.",
      clauses: [
        { text: "The pasta and garlic bread were exquisite", sentiment: "positive", aspect: "Food", score: "+0.85" },
        { text: "our waiter was completely inattentive", sentiment: "negative", aspect: "Service", score: "-0.76" },
        { text: "the wait time was over 45 minutes", sentiment: "negative", aspect: "Wait Time", score: "-0.68" }
      ],
      aspects: {
        Food: { status: 'positive', score: '+0.85', snippet: 'pasta & garlic bread exquisite' },
        Service: { status: 'negative', score: '-0.76', snippet: 'waiter completely inattentive' },
        Price: { status: 'neutral', score: 'N/A', snippet: 'Not mentioned' },
        Cleanliness: { status: 'neutral', score: 'N/A', snippet: 'Not mentioned' },
        'Wait Time': { status: 'negative', score: '-0.68', snippet: 'over 45 minutes' }
      }
    },
    {
      id: 2,
      text: "Incredible value for money with huge portions and spotlessly clean tables, though the dessert was somewhat bland.",
      clauses: [
        { text: "Incredible value for money with huge portions", sentiment: "positive", aspect: "Price", score: "+0.88" },
        { text: "spotlessly clean tables", sentiment: "positive", aspect: "Cleanliness", score: "+0.79" },
        { text: "the dessert was somewhat bland", sentiment: "negative", aspect: "Food", score: "-0.45" }
      ],
      aspects: {
        Food: { status: 'negative', score: '-0.45', snippet: 'dessert somewhat bland' },
        Service: { status: 'neutral', score: 'N/A', snippet: 'Not mentioned' },
        Price: { status: 'positive', score: '+0.88', snippet: 'incredible value for money' },
        Cleanliness: { status: 'positive', score: '+0.79', snippet: 'spotlessly clean tables' },
        'Wait Time': { status: 'neutral', score: 'N/A', snippet: 'Not mentioned' }
      }
    }
  ];

  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number>(0);
  const currentReview = sampleReviews[selectedReviewIdx];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold block mb-1">
            NATURAL LANGUAGE PROCESSING // ASPECT ANALYZER
          </span>
          <h4 className="text-lg font-bold text-fdf3f2">LocalLens Review Intelligence Preview</h4>
        </div>

        {/* Aspects Covered Tag */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono text-[11px] text-muted-grey">
          <span className="w-2 h-2 rounded-full bg-primary-red" />
          <span>5 Analyzed Dimensions</span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 font-mono text-xs">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'explorer'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <Split className="w-3.5 h-3.5 text-primary-red" />
          <span>Clause Splitting & Aspect Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('distribution')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'distribution'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-primary-red" />
          <span>Aspect Sentiment Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'evaluation'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span>Benchmark Evaluation (UCI Yelp)</span>
        </button>
      </div>

      {/* TAB 1: CLAUSE SPLITTING & ASPECT EXPLORER */}
      {activeTab === 'explorer' && (
        <div className="flex flex-col gap-6">
          {/* Sample Selector */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-grey uppercase tracking-wider">Select Sample Review:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedReviewIdx(0)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border transition-all ${
                  selectedReviewIdx === 0
                    ? 'border-primary-red bg-primary-red/10 text-fdf3f2 font-bold'
                    : 'border-white/10 bg-white/5 text-muted-grey'
                }`}
              >
                Sample 1 (Food vs. Service/Wait)
              </button>
              <button
                onClick={() => setSelectedReviewIdx(1)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer border transition-all ${
                  selectedReviewIdx === 1
                    ? 'border-primary-red bg-primary-red/10 text-fdf3f2 font-bold'
                    : 'border-white/10 bg-white/5 text-muted-grey'
                }`}
              >
                Sample 2 (Price/Cleanliness vs. Food)
              </button>
            </div>
          </div>

          {/* Raw Text Box */}
          <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-grey flex items-center gap-1.5">
                <MessageSquareText className="w-3.5 h-3.5" />
                CUSTOMER REVIEW INPUT (MIXED SENTIMENT)
              </span>
              <span className="font-mono text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                Compound Sentence
              </span>
            </div>
            <p className="font-sans text-sm md:text-base text-fdf3f2 leading-relaxed italic bg-black/60 p-4 rounded-xl border border-white/5">
              "{currentReview.text}"
            </p>
          </div>

          {/* Clause Splitting Deconstruction */}
          <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-fdf3f2 font-bold flex items-center gap-2">
                <Split className="w-4 h-4 text-primary-red" />
                Regex Clause-Level Boundary Decomposition
              </span>
              <span className="font-mono text-[10px] text-muted-grey">{currentReview.clauses.length} Contrastive Clauses Isolated</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentReview.clauses.map((clause, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    clause.sentiment === 'positive'
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-mono text-[10px]">
                      <span className="font-bold text-fdf3f2 uppercase">{clause.aspect}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded ${
                          clause.sentiment === 'positive' ? 'text-green-400 bg-green-500/10' : 'text-primary-red bg-primary-red/10'
                        }`}
                      >
                        {clause.score} ({clause.sentiment.toUpperCase()})
                      </span>
                    </div>
                    <p className="text-xs text-muted-grey leading-relaxed">
                      "{clause.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Aspect Scorecards Grid */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-wider text-muted-grey/60 font-bold mb-3">
              5-Aspect Opinion Aggregation
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.entries(currentReview.aspects).map(([aspectName, data]) => {
                const isPos = data.status === 'positive';
                const isNeg = data.status === 'negative';
                return (
                  <div
                    key={aspectName}
                    className="bg-[#0b0b0b] border border-white/10 p-4 rounded-xl flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-grey block mb-1">
                        {aspectName}
                      </span>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isPos ? 'bg-green-400' : isNeg ? 'bg-primary-red' : 'bg-white/20'
                          }`}
                        />
                        <span
                          className={`font-mono text-xs font-bold uppercase ${
                            isPos ? 'text-green-400' : isNeg ? 'text-primary-red' : 'text-muted-grey/60'
                          }`}
                        >
                          {data.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-grey italic line-clamp-2">
                        {data.snippet}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 font-mono text-[10px] text-muted-grey/60 flex justify-between">
                      <span>VADER:</span>
                      <span className="text-fdf3f2 font-bold">{data.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ASPECT SENTIMENT DASHBOARD */}
      {activeTab === 'distribution' && (
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h5 className="font-mono text-sm uppercase tracking-wider text-fdf3f2 font-bold mb-1">
              Aspect Sentiment Ratio Breakdown (Aggregated Batch)
            </h5>
            <p className="text-xs text-muted-grey">
              Streamlit dashboard visualization powered by Altair displaying positive vs. negative sentiment balance across the 5 domains.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Food */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">Food Quality & Taste</span>
                <span className="text-muted-grey">78% Pos / 22% Neg</span>
              </div>
              <div className="w-full bg-red-500/20 h-3 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '78%' }} />
                <div className="bg-primary-red h-full" style={{ width: '22%' }} />
              </div>
            </div>

            {/* Service */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">Staff & Customer Service</span>
                <span className="text-muted-grey">52% Pos / 48% Neg</span>
              </div>
              <div className="w-full bg-red-500/20 h-3 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '52%' }} />
                <div className="bg-primary-red h-full" style={{ width: '48%' }} />
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">Price & Value Perception</span>
                <span className="text-muted-grey">64% Pos / 36% Neg</span>
              </div>
              <div className="w-full bg-red-500/20 h-3 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '64%' }} />
                <div className="bg-primary-red h-full" style={{ width: '36%' }} />
              </div>
            </div>

            {/* Cleanliness */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">Ambience & Cleanliness</span>
                <span className="text-muted-grey">82% Pos / 18% Neg</span>
              </div>
              <div className="w-full bg-red-500/20 h-3 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '82%' }} />
                <div className="bg-primary-red h-full" style={{ width: '18%' }} />
              </div>
            </div>

            {/* Wait Time */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">Pacing & Wait Time</span>
                <span className="text-muted-grey">34% Pos / 66% Neg</span>
              </div>
              <div className="w-full bg-red-500/20 h-3 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '34%' }} />
                <div className="bg-primary-red h-full" style={{ width: '66%' }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-muted-grey">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded" />
              <span>Positive Opinion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary-red rounded" />
              <span>Negative Opinion</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BENCHMARK EVALUATION */}
      {activeTab === 'evaluation' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0b0b0b] border border-white/10 p-5 rounded-xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold">ACCURACY</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">74.5%</div>
              <p className="text-xs text-muted-grey mt-1">Overall sentence sentiment classification.</p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/10 p-5 rounded-xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-green-400 font-bold">POSITIVE RECALL</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">96.8%</div>
              <p className="text-xs text-muted-grey mt-1">High sensitivity in detecting positive reviews.</p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/10 p-5 rounded-xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-grey font-bold">PRECISION</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">66.94%</div>
              <p className="text-xs text-muted-grey mt-1">Binary sentiment precision on test set.</p>
            </div>

            <div className="bg-[#0b0b0b] border border-white/10 p-5 rounded-xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-yellow-400 font-bold">F1 SCORE</span>
              <div className="text-3xl font-bold font-mono text-fdf3f2 mt-2">79.15%</div>
              <p className="text-xs text-muted-grey mt-1">Harmonic mean on 1,000 Yelp sentences.</p>
            </div>
          </div>

          {/* Strict Accuracy Clarification Card */}
          <div className="bg-primary-red/5 border border-primary-red/20 p-5 rounded-xl font-mono text-xs text-muted-grey leading-relaxed">
            <span className="text-primary-red font-bold uppercase block mb-1">
              [BENCHMARK SPECIFICATION & METHODOLOGY DISCLOSURE]
            </span>
            Reported performance metrics (74.5% Accuracy, 96.8% Recall, 66.94% Precision, 79.15% F1) represent overall sentence-level binary polarity classification on the 1,000 UCI Yelp review subset (500 positive, 500 negative sentences). They do NOT represent aspect-level extraction accuracy. The 30 multi-aspect reviews are synthetic demonstration reviews crafted specifically to test and illustrate clause splitting on compound sentences.
          </div>
        </div>
      )}

      {/* Labeling Banner */}
      <div className="border border-white/5 bg-white/2 p-4 rounded-xl flex items-center justify-between text-[11px] font-mono text-muted-grey">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
          Technical Preview: Interactive review aspect analyzer simulating Streamlit NLP execution.
        </span>
        <span className="text-fdf3f2/60 hidden sm:inline">VADER • Python • Streamlit</span>
      </div>
    </div>
  );
};
