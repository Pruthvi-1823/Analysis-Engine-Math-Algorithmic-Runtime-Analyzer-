import { evaluate } from 'mathjs';

const EULER_MASCHERONI = 0.57721566490153286060;

export interface Point {
  i: number;
  val: number;
  sum: number;
}

export const mathEngine = {
  arithmeticSeries(a1: number, d: number, n: number): { exact: number; formula: string; data: Point[] } {
    const exact = (n / 2) * (2 * a1 + (n - 1) * d);
    const formula = `S_n = \\frac{n(2a_1 + (n-1)d)}{2}`;
    
    // Generate up to 100 points for chart
    const data: Point[] = [];
    const limit = Math.min(n, 100);
    const step = Math.max(1, Math.floor(n / 100));
    
    let currentSum = 0;
    for (let i = 1; i <= limit; i++) {
      const idxStr = i * step;
      if (idxStr > n) break;
      const term = a1 + (idxStr - 1) * d;
      // calculating exact sum up to this idxStr
      const partialSum = (idxStr / 2) * (2 * a1 + (idxStr - 1) * d);
      data.push({ i: idxStr, val: term, sum: partialSum });
    }
    
    return { exact, formula, data };
  },

  geometricSeries(a1: number, r: number, n: number): { exact: number; isConvergingText: string | null; formula: string; data: Point[] } {
    let exact = 0;
    let isConvergingText = null;
    let formula = `S_n = a_1 \\frac{1-r^n}{1-r}`;
    
    if (r === 1) {
      exact = a1 * n;
      formula = `S_n = a_1 \\cdot n`;
    } else {
      exact = a1 * (1 - Math.pow(r, n)) / (1 - r);
    }
    
    if (Math.abs(r) < 1) {
      const sInf = a1 / (1 - r);
      isConvergingText = `Converging to ${sInf.toFixed(4)} as n \\to \\infty`;
      formula += `, \\quad S_\\infty = \\frac{a_1}{1-r}`;
    }

    const data: Point[] = [];
    const limit = Math.min(n, 100);
    const step = Math.max(1, Math.floor(n / 100));
    for (let i = 1; i <= limit; i++) {
        const idxStr = i * step;
        if (idxStr > n) break;
        const term = a1 * Math.pow(r, idxStr - 1);
        const partialSum = r === 1 ? a1 * idxStr : a1 * (1 - Math.pow(r, idxStr)) / (1 - r);
        data.push({ i: idxStr, val: term, sum: partialSum });
    }

    return { exact, isConvergingText, formula, data };
  },

  harmonicSeries(n: number): { exact: number; formula: string; methodText: string; data: Point[] } {
    let exact = 0;
    let methodText = "";
    if (n < 10000) {
      for (let i = 1; i <= n; i++) {
        exact += 1 / i;
      }
      methodText = `Direct evaluation used.`;
    } else {
      exact = Math.log(n) + EULER_MASCHERONI + (1 / (2 * n)) - (1 / (12 * n * n));
      methodText = `Asymptotic approximation used: \\ln(n) + \\gamma`;
    }
    const formula = `S_n = \\sum_{i=1}^n \\frac{1}{i}`;

    const data: Point[] = [];
    const limit = Math.min(n, 100);
    const step = Math.max(1, Math.floor(n / 100));
    for (let i = 1; i <= limit; i++) {
      const idxStr = i * step;
      if (idxStr > n) break;
      let partialSum = 0;
      if (idxStr < 10000) {
        for(let j=1; j<=idxStr; j++) partialSum += 1/j;
      } else {
        partialSum = Math.log(idxStr) + EULER_MASCHERONI + (1 / (2 * idxStr)) - (1 / (12 * idxStr * idxStr));
      }
      data.push({ i: idxStr, val: 1/idxStr, sum: partialSum });
    }

    return { exact, formula, methodText, data };
  },

  customSummation(expr: string, lower: number, upper: number): { exact: number; data: Point[]; error?: string } {
    let exact = 0;
    const data: Point[] = [];
    
    if (upper - lower > 50000) {
      return { exact: 0, data: [], error: "Bounds exceed max loop threshold (50000) for custom expression." };
    }

    try {
      const pointsLimit = 100;
      const range = upper - lower + 1;
      const step = Math.max(1, Math.floor(range / pointsLimit));

      for (let i = lower; i <= upper; i++) {
        const val = evaluate(expr, { i });
        if (typeof val !== 'number') {
            throw new Error(`Expression evaluated to non-number at i=${i}`);
        }
        exact += val;
        
        if ((i - lower) % step === 0 || i === upper) {
            data.push({ i, val, sum: exact });
        }
      }
      return { exact, data };
    } catch (err: any) {
      return { exact: 0, data: [], error: err.message };
    }
  },

  algorithmAnalyzer(depth: number, n: number, logarithmic: boolean = false): { formula: string; exactOps: number; bigO: string; data: Point[] } {
    let exactOps = 0;
    let bigO = "";
    let formula = "";
    const data: Point[] = [];

    const limit = Math.min(n, 100);
    const step = Math.max(1, Math.floor(n / 100));

    if (logarithmic) {
      if (depth === 1) {
        exactOps = n < 1 ? 0 : Math.floor(Math.log2(n)) + 1;
        bigO = "O(\\log n)";
        formula = `\\text{Ops}(n) = \\lfloor \\log_2 n \\rfloor + 1`;
        for(let i = 1; i <= limit; i++){
            const idx = i * step;
            if (idx > n) break;
            const y = Math.floor(Math.log2(idx)) + 1;
            data.push({i: idx, val: y, sum: y});
        }
      } else if (depth === 2) {
        exactOps = n * (n < 1 ? 0 : Math.floor(Math.log2(n)) + 1);
        bigO = "O(n \\log n)";
        formula = `\\text{Ops}(n) = n (\\lfloor \\log_2 n \\rfloor + 1)`;
        for(let i = 1; i <= limit; i++){
            const idx = i * step;
            if (idx > n) break;
            const y = idx * (Math.floor(Math.log2(idx)) + 1);
            data.push({i: idx, val: y, sum: y});
        }
      } else if (depth === 3) {
        exactOps = n * n * (n < 1 ? 0 : Math.floor(Math.log2(n)) + 1);
        bigO = "O(n^2 \\log n)";
        formula = `\\text{Ops}(n) = n^2 (\\lfloor \\log_2 n \\rfloor + 1)`;
        for(let i = 1; i <= limit; i++){
            const idx = i * step;
            if (idx > n) break;
            const y = idx * idx * (Math.floor(Math.log2(idx)) + 1);
            data.push({i: idx, val: y, sum: y});
        }
      }
    } else {
      if (depth === 1) {
        exactOps = n;
        bigO = "O(n)";
        formula = `\\text{Ops}(n) = n`;
        for(let i=1; i<=limit; i++){
            const idx = i*step;
            if (idx > n) break;
            data.push({i: idx, val: 1, sum: idx});
        }
      } else if (depth === 2) {
        exactOps = (n * (n + 1)) / 2;
        bigO = "O(n^2)";
        formula = `\\text{Ops}(n) = \\frac{n(n+1)}{2}`;
        for(let i=1; i<=limit; i++){
            const idx = i*step;
            if (idx > n) break;
            data.push({i: idx, val: idx, sum: (idx*(idx+1))/2});
        }
      } else if (depth === 3) {
        exactOps = (n * (n + 1) * (n + 2)) / 6;
        bigO = "O(n^3)";
        formula = `\\text{Ops}(n) = \\frac{n(n+1)(n+2)}{6}`;
        for(let i=1; i<=limit; i++){
            const idx = i*step;
            if (idx > n) break;
            data.push({i: idx, val: (idx*(idx+1))/2, sum: (idx*(idx+1)*(idx+2))/6});
        }
      }
    }

    return { formula, exactOps, bigO, data };
  }
};
