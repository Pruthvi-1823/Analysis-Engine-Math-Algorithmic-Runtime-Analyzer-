import React, { useState, useMemo } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { ChartSeries, SeriesChart } from './SeriesChart';
import { mathEngine } from '../lib/math';
import { Layers } from 'lucide-react';

export function AlgorithmAnalyzer() {
  const [depth, setDepth] = useState(2);
  const [n, setN] = useState(10);
  const [logarithmic, setLogarithmic] = useState(false);

  const result = useMemo(() => {
    return mathEngine.algorithmAnalyzer(depth, n, logarithmic);
  }, [depth, n, logarithmic]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-quantum-text mb-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">Algorithm Loop Analyzer</h2>
        <p className="text-quantum-muted">Analyze the mathematical progression of dependent nested loops.</p>
      </div>

      <div className="bento-card p-6 grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-6">
           <div className="space-y-3">
             <label className="text-sm font-medium text-quantum-muted flex items-center justify-between">
               Loop Depth (Nested Dimensions)
               <span className="bg-quantum-glow/20 border border-quantum-glow/50 text-quantum-glow inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold font-mono shadow-[0_0_5px_rgba(0,229,255,0.3)]">{depth}</span>
             </label>
             <input 
               type="range" 
               min="1" 
               max="3" 
               step="1" 
               value={depth} 
               onChange={e => setDepth(Number(e.target.value))} 
               className="w-full accent-quantum-glow"
             />
             <div className="flex justify-between px-1 text-xs text-quantum-muted font-medium font-mono">
                <span>1</span>
                <span>2</span>
                <span>3</span>
             </div>
           </div>
           
           <div className="flex items-center gap-3">
             <div className="relative flex items-start">
               <div className="flex h-6 items-center">
                 <input type="checkbox" id="logToggle" checked={logarithmic} onChange={e => setLogarithmic(e.target.checked)} className="h-4 w-4 rounded border-quantum-glow/50 bg-quantum-bg text-quantum-glow focus:ring-quantum-glow focus:ring-2 focus:ring-offset-2 focus:ring-offset-quantum-bg transition-colors cursor-pointer" />
               </div>
               <div className="ml-3 text-sm leading-6">
                 <label htmlFor="logToggle" className="font-medium text-quantum-text cursor-pointer">Logarithmic Stepping (Divide & Conquer)</label>
               </div>
             </div>
           </div>

           <div className="bg-quantum-bg p-4 rounded-lg border border-quantum-glow/20 font-mono text-sm overflow-x-auto text-quantum-text shadow-inner">
             {depth >= 1 && <div className="text-quantum-glow">for (let i = 1; i &lt;= n; {depth === 1 && logarithmic ? 'i *= 2' : 'i++'}) {'{'}</div>}
             {depth >= 2 && <div className="pl-4 text-[#bf7af0]">for (let j = 1; j &lt;= {logarithmic ? 'n' : 'i'}; {depth === 2 && logarithmic ? 'j *= 2' : 'j++'}) {'{'}</div>}
             {depth >= 3 && <div className="pl-8 text-[#00ffcc]">for (let k = 1; k &lt;= {logarithmic ? 'n' : 'j'}; {depth === 3 && logarithmic ? 'k *= 2' : 'k++'}) {'{'}</div>}
             <div className="text-quantum-text" style={{ paddingLeft: `${(depth * 1) + 1}rem` }}>
                <span className="opacity-50">// Operation O(1)</span><br />
                count++;
             </div>
             {depth >= 3 && <div className="pl-8 text-[#00ffcc]">{'}'}</div>}
             {depth >= 2 && <div className="pl-4 text-[#bf7af0]">{'}'}</div>}
             {depth >= 1 && <div className="text-quantum-glow">{'}'}</div>}
           </div>

           
           <div className="space-y-1.5">
             <label className="text-sm font-medium text-quantum-muted">Value of n</label>
             <input type="number" min="1" step="1" value={n} onChange={e => setN(parseInt(e.target.value) || 1)} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
           </div>
        </div>

        <div className="bg-quantum-bg/50 rounded-lg p-6 flex flex-col justify-center min-h-[220px] text-center border border-quantum-glow/20 items-center shadow-inner">
           <div className="w-16 h-16 bg-quantum-glow/10 border border-quantum-glow/30 text-quantum-glow rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
             <Layers className="w-8 h-8" />
           </div>
           <div className="flex flex-col gap-2 w-full">
               <div className="flex justify-center items-baseline gap-2 mb-2">
                 <span className="text-sm text-quantum-muted uppercase tracking-widest font-semibold">Big-O Complexity</span>
               </div>
               <div className="text-4xl font-bold font-mono tracking-tight text-quantum-glow drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] border-b border-quantum-glow/20 pb-6 mb-4">
                 {result.bigO}
               </div>

               <div className="w-full overflow-x-auto text-quantum-text text-lg">
                 <BlockMath math={result.formula} />
               </div>

               <div className="mt-4 pt-4 border-t border-quantum-glow/20">
                  <div className="text-sm text-quantum-muted mb-1">Exact Operations for n = {n}</div>
                  <div className="text-xl font-mono text-quantum-glow font-semibold drop-shadow-[0_0_5px_rgba(0,229,255,0.3)]">{result.exactOps.toLocaleString()} ops</div>
               </div>
           </div>
        </div>
      </div>

      {result.data && result.data.length > 0 && (
         <SeriesChart 
           data={result.data} 
           title={`Growth of ${result.bigO}`} 
           xLabel="n" 
           yLabel="Operations" 
         />
      )}
    </div>
  );
}
