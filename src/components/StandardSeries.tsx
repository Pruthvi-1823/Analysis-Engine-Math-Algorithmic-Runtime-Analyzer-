import React, { useState, useMemo } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { ChartSeries, SeriesChart } from './SeriesChart';
import { mathEngine } from '../lib/math';

interface Props {
  comparisonDeck: ChartSeries[];
  onAddToComparison: (series: any) => void;
  onClearComparison: () => void;
}

export function StandardSeries({ comparisonDeck, onAddToComparison, onClearComparison }: Props) {
  const [seriesType, setSeriesType] = useState<'arithmetic' | 'geometric' | 'harmonic'>('arithmetic');
  
  // Arithmetic state
  const [a1, setA1] = useState(1);
  const [d, setD] = useState(1);
  const [nArith, setNArith] = useState(10);
  
  // Geometric State
  const [gA1, setGA1] = useState(1);
  const [gR, setGR] = useState(0.5);
  const [nGemo, setNGemo] = useState(10);
  const [infinite, setInfinite] = useState(false);

  // Harmonic state
  const [nHarm, setNHarm] = useState(10);

  const handleReset = () => {
    onClearComparison();
    setA1(1);
    setD(1);
    setNArith(10);
    setGA1(1);
    setGR(1);
    setNGemo(10);
    setInfinite(false);
    setNHarm(10);
  };

  const result: any = useMemo(() => {
    try {
      if (seriesType === 'arithmetic') {
        return mathEngine.arithmeticSeries(a1, d, nArith);
      } else if (seriesType === 'geometric') {
        return mathEngine.geometricSeries(gA1, gR, infinite ? Infinity : nGemo);
      } else if (seriesType === 'harmonic') {
        return mathEngine.harmonicSeries(nHarm);
      }
    } catch(err) {
      console.error(err);
      return null;
    }
    return null;
  }, [seriesType, a1, d, nArith, gA1, gR, nGemo, infinite, nHarm]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-quantum-text mb-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">Standard Series</h2>
        <p className="text-quantum-muted">Select a standard mathematical progression</p>
      </div>

      <div className="flex gap-2 p-1 bg-quantum-card border border-quantum-glow/20 rounded-lg w-max shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.05)]">
        {['arithmetic', 'geometric', 'harmonic'].map((type) => (
          <button
            key={type}
            onClick={() => setSeriesType(type as any)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              seriesType === type 
                ? 'bg-quantum-glow/20 text-quantum-glow shadow-[0_0_8px_rgba(0,229,255,0.3)] border border-quantum-glow/50' 
                : 'text-quantum-muted hover:text-quantum-text hover:bg-quantum-glow/5'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="bento-card p-6 grid sm:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-quantum-text border-b border-quantum-glow/20 pb-2">Parameters</h3>
          
          {seriesType === 'arithmetic' && (
            <>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-quantum-muted">Initial term (a₁)</label>
                 <input type="number" value={a1} onChange={e => setA1(Number(e.target.value))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-quantum-muted">Common difference (d)</label>
                 <input type="number" value={d} onChange={e => setD(Number(e.target.value))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-quantum-muted">Number of terms (n)</label>
                 <input type="number" min="1" step="1" value={nArith} onChange={e => setNArith(Math.max(1, parseInt(e.target.value) || 1))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
               </div>
            </>
          )}

          {seriesType === 'geometric' && (
            <>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-quantum-muted">Initial term (a₁)</label>
                 <input type="number" value={gA1} onChange={e => setGA1(Number(e.target.value))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
               </div>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-quantum-muted">Common ratio (r)</label>
                 <input type="number" step="0.1" value={gR} onChange={e => setGR(Number(e.target.value))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
               </div>
               <div className="flex items-center gap-3 pt-2">
                 <div className="relative flex items-start">
                   <div className="flex h-6 items-center">
                     <input type="checkbox" id="infToggle" checked={infinite} onChange={e => setInfinite(e.target.checked)} className="h-4 w-4 rounded border-quantum-glow/50 bg-quantum-bg text-quantum-glow focus:ring-quantum-glow focus:ring-2 focus:ring-offset-2 focus:ring-offset-quantum-bg transition-colors" />
                   </div>
                   <div className="ml-3 text-sm leading-6">
                     <label htmlFor="infToggle" className="font-medium text-quantum-text cursor-pointer">Infinite Series (n → ∞)</label>
                   </div>
                 </div>
               </div>
               {!infinite && (
                 <div className="space-y-1.5">
                   <label className="text-sm font-medium text-quantum-muted">Number of terms (n)</label>
                   <input type="number" min="1" step="1" value={nGemo} onChange={e => setNGemo(Math.max(1, parseInt(e.target.value) || 1))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
                 </div>
               )}
            </>
          )}

          {seriesType === 'harmonic' && (
            <>
               <div className="space-y-1.5">
                 <label className="text-sm font-medium text-quantum-muted">Number of terms (n)</label>
                 <input type="number" min="1" step="1" value={nHarm} onChange={e => setNHarm(Math.max(1, parseInt(e.target.value) || 1))} className="w-full rounded-md bg-quantum-bg text-quantum-text border border-quantum-glow/30 px-3 py-2 text-sm focus:border-quantum-glow focus:ring-1 focus:ring-quantum-glow focus:outline-none transition-shadow" />
               </div>
               {result?.methodText && <p className="text-xs text-quantum-glow mt-2 opacity-80"><InlineMath math={result.methodText} /></p>}
            </>
          )}
        </div>

        <div className="bg-quantum-bg/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[220px] text-center shrink-0 border border-quantum-glow/20 shadow-inner">
           {result?.formula && (
              <div className="mb-6 w-full overflow-x-auto text-lg text-quantum-text">
                 <BlockMath math={result.formula} />
              </div>
           )}
           <div className="text-sm text-quantum-muted mb-1">Total Sum Evaluation</div>
           <div className="text-3xl font-mono tracking-tight font-bold text-quantum-glow drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
              {result?.exact === Infinity ? '∞' : result?.exact !== undefined ? Number(result.exact.toFixed(4)).toLocaleString() : '---'}
           </div>
        </div>
      </div>

      {((result?.data && result.data.length > 0) || comparisonDeck.length > 0) ? (
        <div className="flex flex-col gap-4 w-full">
          {result?.data && result.data.length > 0 && (
            <div className="flex items-center gap-4 justify-end -mb-4 relative z-10 px-6 mt-4">
              <button
                onClick={handleReset}
                className="py-1.5 px-4 text-xs font-semibold text-quantum-muted hover:text-quantum-text border border-quantum-glow/30 hover:border-quantum-glow/50 rounded-md transition-colors"
              >
                🔄 Reset to Defaults
              </button>
              <button
                onClick={() => {
                  const themeColors: Record<string, string> = {
                    'arithmetic': '#00E5FF',
                    'geometric': '#FF00E5',
                    'harmonic': '#00FF40'
                  };
                  onAddToComparison({
                    name: `${seriesType.charAt(0).toUpperCase() + seriesType.slice(1)} Series Baseline`,
                    data: result.data!,
                    color: themeColors[seriesType]
                  });
                }}
                className="flex items-center gap-2 py-1.5 px-4 text-xs font-bold text-quantum-bg bg-quantum-glow hover:bg-quantum-glow/80 rounded-md transition-colors shadow-[0_0_10px_rgba(0,229,255,0.4)]"
              >
                ➕ Save Curve to Comparison
              </button>
            </div>
          )}
          <SeriesChart 
            data={result?.data} 
            multiSeries={comparisonDeck.map(s => {
              const isThisActive = s.name.toLowerCase().includes(seriesType);
              const baseName = s.name.replace('● [Active] ', '');
              return {
                ...s,
                name: isThisActive ? `● [Active] ${baseName}` : baseName,
                dashed: !isThisActive
              };
            })}
            title={comparisonDeck.length > 0 ? "Comparison of Standard Progressive Series" : undefined}
            activeLineName={`Active ${seriesType.charAt(0).toUpperCase() + seriesType.slice(1)} Input`}
            hideActiveLegend={true}
          />
        </div>
      ) : null}
    </div>
  );
}
