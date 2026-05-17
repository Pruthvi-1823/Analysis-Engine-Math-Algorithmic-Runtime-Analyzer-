import React, { useState, useMemo, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { ChartSeries, SeriesChart } from './SeriesChart';
import { mathEngine } from '../lib/math';
import { AlertCircle } from 'lucide-react';

export function CustomSummation() {
  const [expr, setExpr] = useState('i^2 + 2*i');
  const [lower, setLower] = useState(1);
  const [upper, setUpper] = useState(10);
  const [debouncedExpr, setDebouncedExpr] = useState(expr);

  // Debounce expression input to avoid crashing while typing
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedExpr(expr), 300);
    return () => clearTimeout(timer);
  }, [expr]);

  const result = useMemo(() => {
    return mathEngine.customSummation(debouncedExpr, lower, upper);
  }, [debouncedExpr, lower, upper]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-quantum-text mb-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">Custom Symbolic Summation</h2>
        <p className="text-quantum-muted">Evaluate generic sums symbolically or numerically across bounds.</p>
      </div>

      <div className="bento-card p-6 grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-5">
           <div className="space-y-1.5 focus-within:text-quantum-glow transition-colors">
             <label className="text-sm font-medium text-quantum-muted">Mathematical Expression (in terms of i)</label>
             <input 
               type="text" 
               value={expr} 
               onChange={e => setExpr(e.target.value)} 
               className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 font-mono text-sm px-3 py-2 focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none shadow-sm transition-shadow"
               placeholder="e.g. i^2 + 2*i"
             />
             <p className="text-xs text-quantum-muted opacity-80">Supports standard math.js syntax.</p>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-quantum-muted">Lower Bound</label>
               <input type="number" step="1" value={lower} onChange={e => setLower(parseInt(e.target.value) || 0)} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
             </div>
             <div className="space-y-1.5">
               <label className="text-sm font-medium text-quantum-muted">Upper Bound</label>
               <input type="number" step="1" value={upper} onChange={e => setUpper(parseInt(e.target.value) || 0)} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
             </div>
           </div>
        </div>

        <div className="bg-quantum-bg/50 rounded-lg p-6 flex flex-col justify-center min-h-[220px] text-center border border-quantum-glow/20 relative overflow-hidden shadow-inner">
           {result.error ? (
              <div className="flex flex-col items-center justify-center gap-2 text-red-500">
                 <AlertCircle className="w-6 h-6" />
                 <p className="text-sm font-medium">{result.error}</p>
              </div>
           ) : (
             <>
               <div className="mb-4 text-quantum-text overflow-x-auto w-full">
                 <BlockMath math={`\\sum_{i=${lower}}^{${upper}} \\left( ${debouncedExpr.replace(/\*/g, '\\cdot ')} \\right)`} />
               </div>
               <div className="text-sm text-quantum-muted mb-1">Result</div>
               <div className="text-3xl font-mono tracking-tight font-bold text-quantum-glow drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                  {Number(result.exact.toFixed(4)).toLocaleString()}
               </div>
             </>
           )}
        </div>
      </div>

      {!result.error && result.data && result.data.length > 0 && (
         <SeriesChart 
           data={result.data} 
           title="Cumulative Sum Over Range" 
           xLabel="i" 
         />
      )}
    </div>
  );
}
