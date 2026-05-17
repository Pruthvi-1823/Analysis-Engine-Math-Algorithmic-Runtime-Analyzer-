import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Server, Activity, Zap } from 'lucide-react';

export function AlgoArena() {
  const [n, setN] = useState<number>(5000);
  const [activeTrack, setActiveTrack] = useState<'quadratic' | 'linearithmic' | 'logarithmic'>('quadratic');

  // Pre-compute charting arrays
  const chartData = useMemo(() => {
    const data = [];
    const step = 200;
    for (let i = 1; i <= 10000; i += step) {
      data.push({
        n: i,
        quadratic: i * i,
        linearithmic: i * Math.log2(i === 1 ? 1 : i),
        logarithmic: Math.log2(i === 1 ? 1 : i),
      });
    }
    // ensure max is present
    data.push({
      n: 10000,
      quadratic: 100000000,
      linearithmic: 10000 * Math.log2(10000),
      logarithmic: Math.log2(10000),
    });
    return data;
  }, []);

  const currentStats = {
    quadratic: Math.round(n * n),
    linearithmic: Math.round(n * Math.log2(n === 1 ? 1 : n)),
    logarithmic: Math.round(Math.log2(n === 1 ? 1 : n)),
  };

  const formatNumber = (x: number) => {
    return Math.round(x).toLocaleString('en-US');
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-12 select-none">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
          <Activity className="w-8 h-8 text-[#00E5FF]" /> Algorithmic Complexity Sandbox
        </h2>
        <p className="text-quantum-muted">
          Evaluate algorithmic scaling efficiency in real-time. Drag the slider to simulate input size growth (N) and observe the dramatic divergence in operational overhead when evaluating Big O classes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Controls & Metrics */}
          <div className="bento-card p-6 flex flex-col gap-8">
            <div>
               <label className="block text-sm font-medium text-quantum-text mb-4 flex justify-between items-center">
                 <span className="uppercase tracking-widest text-slate-400">Input Size Selector (N)</span>
                 <input
                   type="number"
                   min="1"
                   max="10000"
                   value={n}
                   onChange={(e) => setN(Math.min(10000, Math.max(1, parseInt(e.target.value) || 1)))}
                   className="bg-black/50 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono w-28 text-center focus:outline-none focus:border-[#00E5FF] transition-colors"
                 />
               </label>
               
               <div className="relative">
                 <input 
                   type="range" 
                   min="1" 
                   max="10000"
                   step="1"
                   value={n} 
                   onChange={(e) => setN(parseInt(e.target.value))}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
                   list="tickmarks-n"
                 />
                 <datalist id="tickmarks-n">
                   {[1, 2500, 5000, 7500, 10000].map(val => <option key={val} value={val} />)}
                 </datalist>
                 <div className="flex justify-between px-1.5 mt-2 text-xs text-slate-500 font-mono leading-none pointer-events-none">
                   {[1, 2500, 5000, 7500, 10000].map((val, idx, arr) => (
                     <span 
                       key={val} 
                       className="flex items-center min-w-[20px]" 
                       style={idx === 0 ? { justifyContent: 'flex-start' } : idx === arr.length - 1 ? { justifyContent: 'flex-end' } : { justifyContent: 'center' }}
                     >
                       {val === 1 ? '| 1' : val === 10000 ? '10k |' : `| ${val/1000}k |`}
                     </span>
                   ))}
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => setActiveTrack('quadratic')} 
                className={`p-4 text-left rounded-xl border transition-all ${activeTrack === 'quadratic' ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-800 hover:border-slate-600 bg-black/40'}`}
              >
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${activeTrack === 'quadratic' ? 'text-red-500' : 'text-slate-400'}`}>Quadratic Scaling</h4>
                <div className="text-2xl font-bold font-mono text-white mb-2">O(N²)</div>
                <div className={`text-xs font-mono font-bold ${activeTrack === 'quadratic' ? 'text-red-400/80' : 'text-slate-500'}`}>Ops = N * N</div>
              </button>
              
              <button 
                onClick={() => setActiveTrack('linearithmic')} 
                className={`p-4 text-left rounded-xl border transition-all ${activeTrack === 'linearithmic' ? 'border-amber-400 bg-amber-400/10 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-slate-800 hover:border-slate-600 bg-black/40'}`}
              >
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${activeTrack === 'linearithmic' ? 'text-amber-400' : 'text-slate-400'}`}>Linearithmic</h4>
                <div className="text-2xl font-bold font-mono text-white mb-2">O(N log N)</div>
                <div className={`text-xs font-mono font-bold ${activeTrack === 'linearithmic' ? 'text-amber-400/80' : 'text-slate-500'}`}>Ops = N * log₂(N)</div>
              </button>

              <button 
                onClick={() => setActiveTrack('logarithmic')} 
                className={`p-4 text-left rounded-xl border transition-all ${activeTrack === 'logarithmic' ? 'border-[#00E5FF] bg-[#00E5FF]/10 shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'border-slate-800 hover:border-slate-600 bg-black/40'}`}
              >
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${activeTrack === 'logarithmic' ? 'text-[#00E5FF]' : 'text-slate-400'}`}>Logarithmic</h4>
                <div className="text-2xl font-bold font-mono text-white mb-2">O(log N)</div>
                <div className={`text-xs font-mono font-bold ${activeTrack === 'logarithmic' ? 'text-[#00E5FF]/80' : 'text-slate-500'}`}>Ops = log₂(N)</div>
              </button>
            </div>
          </div>
          
          {/* Chart Area */}
          <div className="bento-card p-6 min-h-[400px]">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm border-b border-slate-800 pb-2">Comparative Plot Canvas</h3>
            <div className="h-[350px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis 
                     dataKey="n" 
                     type="number" 
                     domain={[1, 10000]} 
                     stroke="#64748b" 
                     tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val}
                   />
                   <YAxis 
                     stroke="#64748b" 
                     tickFormatter={(val) => val >= 1000000 ? `${val/1000000}M` : val >= 1000 ? `${val/1000}k` : val}
                   />
                   {/* Custom Tooltip */}
                   <Tooltip 
                     contentStyle={{ backgroundColor: 'rgba(2, 13, 20, 0.9)', borderColor: '#334155', borderRadius: '12px', backdropFilter: 'blur(8px)' }}
                     itemStyle={{ fontWeight: 'bold', fontFamily: 'monospace' }}
                     formatter={(value: number) => formatNumber(value)}
                     labelFormatter={(label) => `Input Size (N): ${label}`}
                     labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
                   />
                   <Line 
                     type="monotone" 
                     dataKey="quadratic" 
                     name="O(N²) Operations"
                     stroke="#ef4444" 
                     strokeWidth={activeTrack === 'quadratic' ? 4 : 2} 
                     dot={false}
                     style={{ filter: activeTrack === 'quadratic' ? 'drop-shadow(0 0 6px rgba(239,68,68,0.8))' : 'none', opacity: activeTrack === 'quadratic' ? 1 : 0.4 }}
                   />
                   <Line 
                     type="monotone" 
                     dataKey="linearithmic" 
                     name="O(N log N) Operations"
                     stroke="#fbbf24" 
                     strokeWidth={activeTrack === 'linearithmic' ? 4 : 2} 
                     dot={false}
                     style={{ filter: activeTrack === 'linearithmic' ? 'drop-shadow(0 0 6px rgba(251,191,36,0.8))' : 'none', opacity: activeTrack === 'linearithmic' ? 1 : 0.4 }}
                   />
                   <Line 
                     type="monotone" 
                     dataKey="logarithmic" 
                     name="O(log N) Operations"
                     stroke="#00E5FF" 
                     strokeWidth={activeTrack === 'logarithmic' ? 4 : 2} 
                     dot={false}
                     style={{ filter: activeTrack === 'logarithmic' ? 'drop-shadow(0 0 6px rgba(0,229,255,0.8))' : 'none', opacity: activeTrack === 'logarithmic' ? 1 : 0.4 }}
                   />
                   <ReferenceLine 
                     x={n} 
                     stroke="#94a3b8" 
                     strokeDasharray="4 4" 
                     position="start"
                     label={{ 
                       position: 'top', 
                       value: `N = ${formatNumber(n)}`, 
                       fill: '#e2e8f0', 
                       fontSize: 12,
                       fontWeight: 'bold',
                       fontFamily: 'monospace',
                       backgroundColor: '#020D14',
                     }} 
                   />
                 </LineChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right column for telemetry */}
        <div className="bento-card p-0 flex flex-col border border-slate-700 bg-slate-900/40 overflow-hidden sticky top-6 self-start">
          <div className="bg-[#020D14] border-b border-slate-800 p-5 flex items-center gap-3">
            <Server className="w-5 h-5 text-[#00E5FF]" />
            <h3 className="font-bold text-white tracking-widest uppercase text-sm">System Telemetry Estimates</h3>
          </div>
          
          <div className="p-6 flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-6">
              {/* Quadratic Stat */}
              <div className="flex flex-col gap-2">
                <span className="text-red-500 font-bold text-xs tracking-widest uppercase">Quadratic Scaling (O(N²))</span>
                <div className={`bg-black/40 border p-4 rounded-xl transition-all ${activeTrack === 'quadratic' ? 'border-red-500/50 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]' : 'border-slate-800'}`}>
                   <div className="text-3xl font-mono text-white font-bold">{formatNumber(currentStats.quadratic)}</div>
                   <div className="text-xs text-slate-500 mt-2 uppercase font-semibold tracking-wider">Total Operations</div>
                </div>
              </div>

              {/* Linearithmic Stat */}
              <div className="flex flex-col gap-2">
                <span className="text-amber-400 font-bold text-xs tracking-widest uppercase">Linearithmic Sorting (O(N log N))</span>
                <div className={`bg-black/40 border p-4 rounded-xl transition-all ${activeTrack === 'linearithmic' ? 'border-amber-400/50 shadow-[inset_0_0_20px_rgba(251,191,36,0.1)]' : 'border-slate-800'}`}>
                   <div className="text-3xl font-mono text-white font-bold">{formatNumber(currentStats.linearithmic)}</div>
                   <div className="text-xs text-slate-500 mt-2 uppercase font-semibold tracking-wider">Total Operations</div>
                </div>
              </div>

              {/* Logarithmic Stat */}
              <div className="flex flex-col gap-2">
                <span className="text-[#00E5FF] font-bold text-xs tracking-widest uppercase">Logarithmic Optimization (O(log N))</span>
                <div className={`bg-black/40 border p-4 rounded-xl transition-all ${activeTrack === 'logarithmic' ? 'border-[#00E5FF]/50 shadow-[inset_0_0_20px_rgba(0,229,255,0.15)]' : 'border-slate-800'}`}>
                   <div className="text-3xl font-mono text-white font-bold">{formatNumber(currentStats.logarithmic)}</div>
                   <div className="text-xs text-slate-500 mt-2 uppercase font-semibold tracking-wider">Total Operations</div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="bg-[#020D14] border border-[#00E5FF]/20 p-5 rounded-xl flex gap-4 shadow-[0_0_15px_rgba(0,229,255,0.05)]">
                 <Zap className="w-6 h-6 flex-shrink-0 text-[#00E5FF]" />
                 <p className="text-[13px] text-quantum-muted leading-relaxed">
                   At scale <span className="text-white font-bold font-mono px-1">N = {formatNumber(n)}</span>, upgrading from an O(N²) loop structure to an O(log N) harmonic optimization pattern eliminates over <span className="text-[#00E5FF] font-bold">99.9%</span> of redundant CPU evaluation cycles, ensuring microsecond execution latencies.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


