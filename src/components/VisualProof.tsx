import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

type ProofType = 'arithmetic' | 'geometric' | 'harmonic';

export function VisualProof() {
  const [proofType, setProofType] = useState<ProofType>('arithmetic');

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            Visual Proofs
          </h2>
          <p className="text-quantum-muted max-w-2xl">
            {proofType === 'arithmetic' && "A geometric illustration of Gauss's trick for the Arithmetic series. See how two identical triangular shapes form a perfect rectangle."}
            {proofType === 'geometric' && "A geometric square packing visualizing the infinite sum of a geometric series. Notice how each successive term exactly fills half the remaining void space."}
            {proofType === 'harmonic' && "Oresme's proof of divergence for the Harmonic series. Grouping terms into clusters shows that each group's sum exceeds 1/2, meaning the total area grows to infinity."}
          </p>
        </div>
        
        <select 
          value={proofType} 
          onChange={(e) => setProofType(e.target.value as ProofType)}
          className="bg-quantum-card border-2 border-[#00E5FF]/40 text-white rounded-lg px-4 py-3 text-sm font-bold outline-none focus:border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)] appearance-none cursor-pointer min-w-[280px]"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2300E5FF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
        >
          <option value="arithmetic">Arithmetic Proof (Gauss's Trick)</option>
          <option value="geometric">Geometric Proof (Convergence)</option>
          <option value="harmonic">Harmonic Proof (Divergence)</option>
        </select>
      </div>

      <div className="bento-card flex flex-col">
        {proofType === 'arithmetic' && <ArithmeticProof />}
        {proofType === 'geometric' && <GeometricProof />}
        {proofType === 'harmonic' && <HarmonicProof />}
      </div>
    </div>
  );
}

function ArithmeticProof() {
  const [n, setN] = useState(5);

  const totalBlocks = n * (n + 1);
  const sum = totalBlocks / 2;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-quantum-text mb-2 flex justify-between">
          <span>Grid Dimension (n)</span>
          <span className="text-[#00E5FF] font-bold text-lg">{n}</span>
        </label>
        <div className="relative">
          <input 
            type="range" 
            min="2" 
            max="8" 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
            list="tickmarks-arith"
          />
          <datalist id="tickmarks-arith">
            {[2, 3, 4, 5, 6, 7, 8].map(val => <option key={val} value={val} />)}
          </datalist>
          <div className="flex justify-between px-1.5 mt-2 text-[10px] text-slate-500 font-mono leading-none pointer-events-none">
            {[2, 3, 4, 5, 6, 7, 8].map(val => (
              <span key={val} className="flex justify-center w-2 text-center">
                {val % 2 === 0 ? val : '|'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
        <div className="flex justify-center items-center bg-[#020D14] p-8 rounded-xl border border-[#00E5FF]/20 relative min-h-[400px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
           <div className="flex gap-1 items-end transform transition-transform duration-500 hover:scale-105">
             {Array.from({ length: n }).map((_, colIndex) => {
               const col = colIndex + 1;
               const activeBlocks = col;
               const mutedBlocks = n + 1 - col;
               return (
                 <div key={`col-${colIndex}`} className="flex flex-col gap-1">
                   {Array.from({ length: mutedBlocks }).map((_, bIdx) => (
                     <div 
                       key={`muted-${colIndex}-${bIdx}`} 
                       className="w-8 h-8 rounded-sm bg-slate-700/30 border border-slate-600/50 transition-all duration-300"
                     />
                   ))}
                   {Array.from({ length: activeBlocks }).map((_, bIdx) => (
                     <div 
                       key={`active-${colIndex}-${bIdx}`} 
                       className="w-8 h-8 rounded-sm bg-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.4)] transition-all duration-300"
                     />
                   ))}
                 </div>
               );
             })}
           </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl flex flex-col justify-center border border-slate-700 h-full">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Mathematical Breakdown</h3>
          <div className="space-y-6 text-quantum-muted">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#00E5FF] text-lg">Width</span> 
              <span className="text-lg bg-black/40 px-3 py-1 rounded-md border border-[#00E5FF]/30 text-white"><InlineMath math={`n = ${n}`} /></span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#00E5FF] text-lg">Height</span> 
              <span className="text-lg bg-black/40 px-3 py-1 rounded-md border border-[#00E5FF]/30 text-white"><InlineMath math={ `n + 1 = ${n + 1}` } /></span>
            </div>
            <div className="pt-4 border-t border-slate-700">
              <span className="font-semibold text-white/80 block mb-3 text-lg">Total Rectangle Blocks</span>
              <div className="bg-black/40 p-4 rounded-lg flex justify-center border border-[#00E5FF]/20 shadow-[inset_0_0_15px_rgba(0,229,255,0.05)]">
                <div className="text-xl text-[#00E5FF]"><BlockMath math={`n(n + 1) = ${n} \\times ${n + 1} = ${totalBlocks}`} /></div>
              </div>
            </div>
            <div>
              <span className="font-semibold text-white block mb-3 text-lg">Therefore: Single Staircase Sum</span>
              <div className="bg-[#00E5FF]/10 p-4 rounded-lg flex justify-center border border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <div className="text-xl text-white font-bold"><BlockMath math={`\\frac{n(n + 1)}{2} = \\frac{${totalBlocks}}{2} = ${sum}`} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeometricProof() {
  const [n, setN] = useState(3);
  
  const blocks = [];
  let w = 100, h = 100, l = 0, t = 0;
  for(let i=1; i<=n; i++){
    if(i%2 !== 0){
      blocks.push({ i, val: 1/Math.pow(2,i), w: w/2, h: h, l: l, t: t });
      l += w/2;
      w /= 2;
    } else {
      blocks.push({ i, val: 1/Math.pow(2,i), w: w, h: h/2, l: l, t: t });
      t += h/2;
      h /= 2;
    }
  }

  const latexSumLHS = Array.from({length: n}).map((_, i) => `\\frac{1}{${Math.pow(2, i+1)}}`).join(' + ');
  const sumNumerator = Math.pow(2, n) - 1;
  const sumDenominator = Math.pow(2, n);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-quantum-text mb-2 flex justify-between">
          <span>Fractal Depth (n)</span>
          <span className="text-[#FF00FF] font-bold text-lg">{n}</span>
        </label>
        <div className="relative">
          <input 
            type="range" 
            min="1" 
            max="6" 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF00FF]"
            list="tickmarks-geom"
          />
          <datalist id="tickmarks-geom">
            {[1, 2, 3, 4, 5, 6].map(val => <option key={val} value={val} />)}
          </datalist>
          <div className="flex justify-between px-1.5 mt-2 text-[10px] text-slate-500 font-mono leading-none pointer-events-none">
            {[1, 2, 3, 4, 5, 6].map(val => (
              <span key={val} className="flex justify-center w-2 text-center">
                {val % 2 !== 0 ? val : '|'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
        <div className="flex justify-center items-center bg-[#020D14] p-8 rounded-xl border border-[#FF00FF]/20 min-h-[400px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <div className="w-full max-w-[320px] aspect-square border-2 border-[#FF00FF]/50 bg-[#16041a] relative overflow-hidden rounded-md shadow-[0_0_20px_rgba(255,0,255,0.15)] mx-auto transform transition-transform duration-500 hover:scale-105">
            {blocks.map(b => (
              <div key={b.i} className="absolute border border-black bg-[#FF00FF]/80 flex items-center justify-center transition-all duration-700 ease-in-out shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]" style={{
                width: `${b.w}%`, height: `${b.h}%`, top: `${b.t}%`, left: `${b.l}%`
              }}>
                {b.val >= 1/32 && <span className="text-white font-bold text-sm bg-black/40 px-1.5 py-0.5 rounded shadow-sm">1/{Math.pow(2, b.i)}</span>}
              </div>
            ))}
            {/* The remaining void */}
            <div className="absolute border-2 border-dashed border-[#FF00FF]/50 bg-[#FF00FF]/10 flex items-center justify-center transition-all duration-700" style={{
                width: `${w}%`, height: `${h}%`, top: `${t}%`, left: `${l}%`
              }}>
                {(w * h) > 100 && <span className="text-[#FF00FF] text-xs font-bold">Void</span>}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl flex flex-col justify-center border border-slate-700 h-full">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Fractal Convergence</h3>
          <div className="space-y-6 text-quantum-muted">
            <p className="text-white/80">
              Each term in the series represents an area exactly half the size of the remaining empty space in the square.
            </p>
            <div className="bg-black/40 p-4 rounded-lg flex flex-col items-center border border-[#FF00FF]/20 shadow-[inset_0_0_15px_rgba(255,0,255,0.05)] overflow-x-auto">
              <span className="font-semibold text-white/50 mb-2 text-sm self-start">Partial Sum (Current Depth)</span>
              <div className="text-[#FF00FF]"><BlockMath math={`${latexSumLHS} = \\frac{${sumNumerator}}{${sumDenominator}}`} /></div>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <span className="font-semibold text-white block mb-3 text-lg">Infinite Sum</span>
              <div className="bg-[#FF00FF]/10 p-4 rounded-lg flex justify-center border border-[#FF00FF] shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                <div className="text-xl text-white font-bold"><BlockMath math={`\\sum_{n=1}^\\infty \\frac{1}{2^n} = 1`} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HarmonicProof() {
  const [n, setN] = useState(10);

  // SVG Coordinates setup
  const width = 500;
  const height = 350;
  const margin = { top: 30, right: 30, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xDomainMax = Math.max(n + 1, 5); // ensure we always have some breadth
  const scaleX = (x: number) => margin.left + (x / xDomainMax) * innerWidth;
  const yDomainMax = 1.2; 
  const scaleY = (y: number) => margin.top + innerHeight - (y / yDomainMax) * innerHeight;

  // Generate smooth curve for y = 1/x
  const curvePoints = [];
  for (let x = 0.8; x <= xDomainMax; x += 0.1) {
    // start slightly before x=1 to show the curve cleanly
    curvePoints.push(`${scaleX(x)},${scaleY(1/x)}`);
  }
  const curvePath = "M " + curvePoints.join(" L ");

  // Integral Area calculation for the text (ln(n+1))
  const integralArea = Math.log(n + 1);
  const harmonicSum = Array.from({ length: n }).reduce<number>((acc, _, i) => acc + 1 / (i + 1), 0);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-quantum-text mb-2 flex justify-between">
          <span>Number of Terms (n)</span>
          <span className="text-[#FF00FF] font-bold text-lg">{n}</span>
        </label>
        <div className="relative">
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={n} 
            onChange={(e) => setN(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF00FF]"
            list="tickmarks-harm"
          />
          <datalist id="tickmarks-harm">
            {Array.from({ length: 50 }).map((_, i) => <option key={i+1} value={i+1} />)}
          </datalist>
          <div className="flex justify-between px-1.5 mt-2 text-[10px] text-slate-500 font-mono leading-none pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => {
              const val = i + 1;
              const isMajor = val === 1 || val % 10 === 0;
              const isMinor = val % 5 === 0 && !isMajor;
              return (
                <span key={val} className={`flex justify-center w-1 text-center text-[9px] ${isMajor ? 'text-slate-400 font-bold' : 'text-slate-600/50'}`}>
                  {isMajor ? val : isMinor ? '|' : (val % 2 === 0 ? '·' : '')}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-4">
        {/* Visualization Panel */}
        <div className="relative flex justify-center items-center bg-[#020D14] p-4 rounded-xl border border-slate-700 min-h-[400px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="drop-shadow-lg" preserveAspectRatio="xMidYMid meet">
            {/* Grid Lines */}
            {Array.from({ length: 6 }).map((_, i) => {
               const yVal = (i / 5) * 1.2;
               return (
                 <g key={`grid-y-${i}`}>
                   <line 
                     x1={margin.left} 
                     y1={scaleY(yVal)} 
                     x2={width - margin.right} 
                     y2={scaleY(yVal)} 
                     className="stroke-slate-700/50" 
                     strokeDasharray="4 4" 
                   />
                   <text 
                     x={margin.left - 10} 
                     y={scaleY(yVal) + 4} 
                     className="fill-slate-500 text-[10px] text-right font-mono" 
                     textAnchor="end"
                   >
                     {yVal.toFixed(1)}
                   </text>
                 </g>
               );
            })}

            {/* X-axis ticks (showing 1 to n+1 depending on width, let's just show key ticks) */}
            {Array.from({ length: xDomainMax + 1 }).map((_, x) => {
              // Only render some ticks if n is large to avoid clutter
              if (xDomainMax > 15 && x % Math.ceil(xDomainMax / 10) !== 0 && x !== xDomainMax && x !== 1) return null;
              
              return (
                <g key={`grid-x-${x}`}>
                  <line 
                     x1={scaleX(x)} 
                     y1={height - margin.bottom} 
                     x2={scaleX(x)} 
                     y2={height - margin.bottom + 5} 
                     className="stroke-slate-500" 
                   />
                   <text 
                     x={scaleX(x)} 
                     y={height - margin.bottom + 15} 
                     className="fill-slate-500 text-[10px] text-center font-mono" 
                     textAnchor="middle"
                   >
                     {x}
                   </text>
                </g>
              )
            })}

            {/* Axes */}
            <line x1={margin.left} y1={margin.top/2} x2={margin.left} y2={height - margin.bottom} className="stroke-slate-400 stroke-2" />
            <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} className="stroke-slate-400 stroke-2" />

            {/* Bar Rectangles (Magenta overlay) */}
            {Array.from({ length: n }).map((_, i) => {
               const k = i + 1;
               const blockWidth = scaleX(k + 1) - scaleX(k);
               const blockHeight = scaleY(0) - scaleY(1 / k);
               return (
                 <rect
                   key={k}
                   x={scaleX(k)}
                   y={scaleY(1 / k)}
                   width={blockWidth}
                   height={blockHeight}
                   className="fill-[#FF00FF]/30 stroke-[#FF00FF]/80 stroke-1 hover:fill-[#FF00FF]/50 transition-colors cursor-pointer"
                 >
                   <title>k={k}, Area={1/k}</title>
                 </rect>
               )
            })}

            {/* The Curve y = 1/x (Neon Cyan) */}
            <path 
              d={curvePath} 
              fill="none" 
              className="stroke-[#00E5FF] stroke-[3px]" 
              style={{ filter: "drop-shadow(0 0 6px rgba(0,229,255,0.8))" }}
            />
            
            {/* Labels */}
            <text x={scaleX(1.5)} y={scaleY(1.1)} className="fill-[#00E5FF] text-sm font-bold shadow-black drop-shadow-md">y = 1/x</text>
            <text x={width/2} y={height - 5} className="fill-slate-400 text-xs font-semibold" textAnchor="middle">x</text>
            <text x={15} y={height/2} className="fill-slate-400 text-xs font-semibold" transform={`rotate(-90 15 ${height/2})`} textAnchor="middle">y</text>

          </svg>
        </div>

        {/* Description Panel */}
        <div className="bg-slate-900/50 p-6 rounded-xl flex flex-col justify-center border border-slate-700 h-full">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Integral Area Comparison</h3>
          <div className="space-y-6 text-quantum-muted text-sm md:text-base">
            <p className="text-white/90 leading-relaxed">
              The Area Comparison Proof. Each bar represents a term in the Harmonic Series (Area = 1 * <InlineMath math="1/k" />). 
              Notice how the bars always <strong>overflow</strong> above the smooth curve <span className="text-[#00E5FF] font-semibold">y = 1/x</span>.
            </p>
            
            <p className="text-white/80 leading-relaxed text-sm bg-black/30 p-3 rounded-lg border border-slate-800">
              Because calculus proves the area under this infinite curve grows to infinity, the larger area of our combined blocks must also diverge to infinity!
            </p>
            
            <div className="bg-black/40 p-4 rounded-lg flex flex-col border border-[#FF00FF]/20 shadow-[inset_0_0_15px_rgba(255,0,255,0.05)] overflow-x-auto gap-4">
               <div className="flex justify-between items-center px-1 border-b border-[#FF00FF]/10 pb-2">
                 <span className="text-[#FF00FF] font-bold text-sm tracking-wide uppercase">Sum of Rectangles Area</span>
                 <span className="font-mono text-white text-lg font-bold">~ {harmonicSum.toFixed(4)}</span>
               </div>
               <div className="flex justify-between items-center px-1">
                 <span className="text-[#00E5FF] font-bold text-sm tracking-wide uppercase">Curve Area (Integral)</span>
                 <span className="font-mono text-white text-lg font-bold">~ {integralArea.toFixed(4)}</span>
               </div>
            </div>
            
            <div className="pt-4 border-t border-slate-700">
              <div className="bg-[#FF00FF]/10 p-4 rounded-lg flex flex-col items-center border border-[#FF00FF]/50 shadow-[0_0_15px_rgba(255,0,255,0.15)] overflow-x-auto gap-3">
                <span className="font-semibold text-white block">Calculus Limit</span>
                <div className="text-xl text-white font-bold"><BlockMath math={`\\int_{1}^{\\infty} \\frac{1}{x} dx = \\infty`} /></div>
                <div className="text-[#FF00FF] font-black uppercase tracking-widest text-sm bg-[#FF00FF]/20 px-4 py-1 rounded-full border border-[#FF00FF]/50 shadow-[0_0_10px_rgba(255,0,255,0.3)]">Diverges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

