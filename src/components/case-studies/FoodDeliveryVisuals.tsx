import React, { useState, useMemo } from 'react';
import { Navigation, Gauge, BarChart3, Sliders, CheckCircle2 } from 'lucide-react';

export const FoodDeliveryVisuals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'importance' | 'comparison'>('simulator');

  // Simulator State
  const [distance, setDistance] = useState<number>(6.5);
  const [traffic, setTraffic] = useState<'Low' | 'Medium' | 'High' | 'Jam'>('Medium');
  const [weather, setWeather] = useState<'Sunny' | 'Cloudy' | 'Fog' | 'Windy' | 'Stormy'>('Sunny');
  const [riderRating, setRiderRating] = useState<number>(4.7);

  // Dynamic ETA estimation calculation (heuristic mirror of regression weights)
  const predictedEta = useMemo(() => {
    let baseTime = 16.0;
    // Haversine distance multiplier
    const distanceTerm = distance * 1.45;
    
    // Traffic penalty
    const trafficMap: Record<string, number> = {
      Low: 0,
      Medium: 5.5,
      High: 11.2,
      Jam: 19.8
    };

    // Weather penalty
    const weatherMap: Record<string, number> = {
      Sunny: 0,
      Cloudy: 2.2,
      Windy: 4.1,
      Fog: 6.8,
      Stormy: 12.4
    };

    // Rider experience factor
    const ratingAdjustment = (5.0 - riderRating) * 4.0;

    const total = baseTime + distanceTerm + (trafficMap[traffic] || 0) + (weatherMap[weather] || 0) + ratingAdjustment;
    return Math.round(total);
  }, [distance, traffic, weather, riderRating]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Simulator Mode */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary-red font-bold block mb-1">
            MACHINE LEARNING // INFERENCE LAB
          </span>
          <h4 className="text-lg font-bold text-fdf3f2">Food Delivery ETA Predictor Interactive Preview</h4>
        </div>

        {/* Dataset Pill */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono text-[11px] text-muted-grey">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span>Kaggle Dataset: ~45,000 Records</span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 font-mono text-xs overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'simulator'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-primary-red" />
          <span>Streamlit Inference Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('importance')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'importance'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-primary-red" />
          <span>Feature Importance Diagnostic</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'comparison'
              ? 'bg-white/10 text-fdf3f2 font-bold border border-white/10'
              : 'text-muted-grey hover:text-fdf3f2'
          }`}
        >
          <Gauge className="w-3.5 h-3.5 text-primary-red" />
          <span>Model Architecture Comparison</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE STREAMLIT PREDICTION INTERFACE */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-fdf3f2 font-bold flex items-center gap-2">
                <Navigation className="w-4 h-4 text-primary-red" />
                Pipeline Feature Inputs
              </span>
              <span className="font-mono text-[10px] text-muted-grey">ColumnTransformer Ready</span>
            </div>

            {/* Distance Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-muted-grey">Haversine Calculated Distance</span>
                <span className="text-primary-red font-bold text-sm">{distance.toFixed(1)} km</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className="w-full accent-primary-red bg-white/10 rounded-lg cursor-pointer h-2"
              />
              <span className="text-[10px] font-mono text-muted-grey/60 mt-1 block">
                Derived via spherical trigonometry from restaurant & customer coordinate pairs
              </span>
            </div>

            {/* Traffic Condition */}
            <div>
              <label className="text-xs font-mono text-muted-grey mb-2 block">Road Traffic Density</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Low', 'Medium', 'High', 'Jam'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setTraffic(lvl)}
                    className={`py-2 px-3 rounded-xl font-mono text-xs transition-all cursor-pointer border ${
                      traffic === lvl
                        ? 'border-primary-red bg-primary-red/10 text-fdf3f2 font-bold'
                        : 'border-white/5 bg-white/5 text-muted-grey hover:text-fdf3f2'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Condition */}
            <div>
              <label className="text-xs font-mono text-muted-grey mb-2 block">Atmospheric Weather</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Sunny', 'Cloudy', 'Windy', 'Fog', 'Stormy'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeather(w)}
                    className={`py-2 px-2 rounded-xl font-mono text-xs transition-all cursor-pointer border truncate ${
                      weather === w
                        ? 'border-primary-red bg-primary-red/10 text-fdf3f2 font-bold'
                        : 'border-white/5 bg-white/5 text-muted-grey hover:text-fdf3f2'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Rider Rating */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-muted-grey">Delivery Partner Rating</span>
                <span className="text-yellow-400 font-bold text-sm">★ {riderRating.toFixed(1)} / 5.0</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="5.0"
                step="0.1"
                value={riderRating}
                onChange={(e) => setRiderRating(parseFloat(e.target.value))}
                className="w-full accent-yellow-400 bg-white/10 rounded-lg cursor-pointer h-2"
              />
            </div>
          </div>

          {/* Inference Output Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#0b0b0b] border border-primary-red/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(235,74,66,0.06)]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-red font-bold block mb-1">
                PREDICTED DELIVERY ETA
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-6xl font-bold font-mono text-fdf3f2 tracking-tight">
                  {predictedEta}
                </span>
                <span className="text-xl font-mono text-primary-red font-bold">MINUTES</span>
              </div>
              <p className="text-xs text-muted-grey mt-2">
                Estimated 90% confidence interval: <strong className="text-fdf3f2 font-mono">[{Math.max(12, predictedEta - 4)} – {predictedEta + 5} mins]</strong>
              </p>

              {/* Pipeline Diagnostic Step */}
              <div className="mt-6 border-t border-white/5 pt-4 flex flex-col gap-2.5 font-mono text-xs">
                <span className="text-[10px] uppercase tracking-wider text-muted-grey/60 font-bold">Active Pipeline Trace</span>
                <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-lg border border-white/5">
                  <span className="text-muted-grey">Distance Contribution:</span>
                  <span className="text-fdf3f2 font-bold">+{(distance * 1.45).toFixed(1)} mins</span>
                </div>
                <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-lg border border-white/5">
                  <span className="text-muted-grey">Traffic Penalty ({traffic}):</span>
                  <span className="text-fdf3f2 font-bold">+{traffic === 'Low' ? 0 : traffic === 'Medium' ? 5.5 : traffic === 'High' ? 11.2 : 19.8} mins</span>
                </div>
                <div className="flex items-center justify-between bg-black/50 p-2.5 rounded-lg border border-white/5">
                  <span className="text-muted-grey">Weather Factor ({weather}):</span>
                  <span className="text-fdf3f2 font-bold">+{weather === 'Sunny' ? 0 : weather === 'Cloudy' ? 2.2 : weather === 'Windy' ? 4.1 : weather === 'Fog' ? 6.8 : 12.4} mins</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-muted-grey">
              <span className="text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline: ColumnTransformer + Joblib
              </span>
              <span>Latency: &lt;12ms</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FEATURE IMPORTANCE DIAGNOSTIC */}
      {activeTab === 'importance' && (
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6">
          <div className="mb-6">
            <h5 className="font-mono text-sm uppercase tracking-wider text-fdf3f2 font-bold mb-1">
              Relative Feature Importance (Tree-Based Regressors)
            </h5>
            <p className="text-xs text-muted-grey">
              Derived from model splits showing normalized contribution of each engineered feature in explaining delivery variance.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">1. Haversine Geographic Distance (km)</span>
                <span className="text-primary-red font-bold">38.4%</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-primary-red h-full rounded-full transition-all duration-500" style={{ width: '38.4%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">2. Road Traffic Density (Jam & High Tiers)</span>
                <span className="text-primary-red font-bold">26.8%</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-primary-red/80 h-full rounded-full transition-all duration-500" style={{ width: '26.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">3. Delivery Partner Rating & Age</span>
                <span className="text-primary-red font-bold">16.2%</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-primary-red/60 h-full rounded-full transition-all duration-500" style={{ width: '16.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">4. Weather Severity Conditions (Stormy, Fog)</span>
                <span className="text-primary-red font-bold">11.9%</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-primary-red/40 h-full rounded-full transition-all duration-500" style={{ width: '11.9%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-fdf3f2 font-bold">5. Vehicle Type & Order Category</span>
                <span className="text-primary-red font-bold">6.7%</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-primary-red/30 h-full rounded-full transition-all duration-500" style={{ width: '6.7%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODEL COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6 overflow-x-auto">
          <div className="mb-4">
            <h5 className="font-mono text-sm uppercase tracking-wider text-fdf3f2 font-bold mb-1">
              Algorithmic Benchmark Evaluation Matrix
            </h5>
            <p className="text-xs text-muted-grey">
              Systematic comparison of linear baseline against non-linear ensemble algorithms on standard cross-validation splits.
            </p>
          </div>

          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-muted-grey text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Algorithm</th>
                <th className="py-3 px-4">Model Type</th>
                <th className="py-3 px-4">Non-Linear Handling</th>
                <th className="py-3 px-4">Inference Latency</th>
                <th className="py-3 px-4">Pipeline Integration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/2 transition-colors">
                <td className="py-3 px-4 font-bold text-fdf3f2">Linear Regression</td>
                <td className="py-3 px-4 text-muted-grey">Parametric Baseline</td>
                <td className="py-3 px-4 text-yellow-400/80">Requires polynomial features</td>
                <td className="py-3 px-4 text-green-400">&lt;2ms (ultra-fast)</td>
                <td className="py-3 px-4 text-muted-grey">Scikit-learn Pipeline</td>
              </tr>
              <tr className="hover:bg-white/2 transition-colors">
                <td className="py-3 px-4 font-bold text-fdf3f2">Random Forest Regressor</td>
                <td className="py-3 px-4 text-muted-grey">Bagging Ensemble</td>
                <td className="py-3 px-4 text-green-400">Excellent on feature interactions</td>
                <td className="py-3 px-4 text-muted-grey">~15ms</td>
                <td className="py-3 px-4 text-muted-grey">Joblib artifact export</td>
              </tr>
              <tr className="hover:bg-white/2 transition-colors bg-primary-red/5 border-l-2 border-primary-red">
                <td className="py-3 px-4 font-bold text-primary-red">Gradient Boosting Regressor</td>
                <td className="py-3 px-4 text-muted-grey">Boosting Ensemble</td>
                <td className="py-3 px-4 text-green-400">Captures compound traffic/weather splits</td>
                <td className="py-3 px-4 text-green-400">~8ms (optimal for Streamlit)</td>
                <td className="py-3 px-4 text-fdf3f2">Selected for Interactive Serving</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Labeling Banner */}
      <div className="border border-white/5 bg-white/2 p-4 rounded-xl flex items-center justify-between text-[11px] font-mono text-muted-grey">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
          Technical Preview: Interactive simulation representing the Streamlit ML prediction application.
        </span>
        <span className="text-fdf3f2/60 hidden sm:inline">Scikit-learn • Haversine • Pandas</span>
      </div>
    </div>
  );
};
