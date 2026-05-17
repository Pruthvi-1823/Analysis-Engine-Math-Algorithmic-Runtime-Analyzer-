import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Point } from '../lib/math';

export interface ChartSeries {
  id: string;
  name: string;
  data: Point[];
  color: string;
  dashed?: boolean;
}

interface SeriesChartProps {
  data?: Point[];
  multiSeries?: ChartSeries[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  activeLineName?: string;
  hideActiveLegend?: boolean;
}

export function SeriesChart({ data, multiSeries, title = "Partial Sums Progression", xLabel = "n", yLabel = "Sum", activeLineName, hideActiveLegend }: SeriesChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});

  const isMulti = multiSeries && multiSeries.length > 0;
  
  // If neither data nor multiSeries exists/has items, don't render
  if ((!data || data.length === 0) && !isMulti) return null;

  const activeName = activeLineName || "Current Sum";

  const handleLegendClick = (e: any) => {
    if (e && e.value) {
      setHiddenSeries(prev => ({
        ...prev,
        [e.value]: !prev[e.value]
      }));
    }
  };

  // Determine the true min and max value of `n` (or `i`) across all existing series so XAxis doesn't clip
  let globalMinI = Infinity;
  let globalMaxI = -Infinity;

  if (data && data.length > 0) {
    globalMinI = Math.min(globalMinI, data[0].i);
    globalMaxI = Math.max(globalMaxI, data[data.length - 1].i);
  }
  if (isMulti) {
    multiSeries!.forEach(s => {
      if (s.data && s.data.length > 0) {
        globalMinI = Math.min(globalMinI, s.data[0].i);
        globalMaxI = Math.max(globalMaxI, s.data[s.data.length - 1].i);
      }
    });
  }

  // Fallback defaults if calculations fail (e.g. empty arrays)
  if (globalMinI === Infinity) globalMinI = 1;
  if (globalMaxI === -Infinity) globalMaxI = 10;

  return (
    <div className="w-full bento-card p-6 mt-6 shrink-0">
      <h3 className="text-sm font-medium text-quantum-text mb-4">{title}</h3>
      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00E5FF" strokeOpacity={0.15} />
            <XAxis 
              dataKey="i" 
              type="number"
              domain={[globalMinI, globalMaxI]}
              allowDuplicatedCategory={false}
              label={{ value: xLabel, position: 'insideBottom', offset: -10, fill: '#E0F7FA' }} 
              tick={{ fontSize: 12, fill: '#6e9aab' }} 
              stroke="#00E5FF"
              strokeOpacity={0.3}
            />
            <YAxis 
              label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#E0F7FA' }} 
              tick={{ fontSize: 12, fill: '#6e9aab' }} 
              stroke="#00E5FF"
              strokeOpacity={0.3}
              tickFormatter={(value) => value > 1000 ? `${(value/1000).toFixed(0)}k` : value}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#07222F', borderRadius: '8px', border: '1px solid #00E5FF', boxShadow: '0 0 15px rgba(0,229,255,0.2)' }}
              itemStyle={{ color: '#00E5FF' }}
              labelStyle={{ color: '#E0F7FA', marginBottom: '4px' }}
            />
            {isMulti && (
              <Legend 
                wrapperStyle={{ paddingTop: '20px', cursor: 'pointer' }} 
                onClick={handleLegendClick} 
              />
            )}
            {(isMulti ? multiSeries! : []).map((series) => (
              <Line 
                key={series.id}
                data={series.data}
                name={series.name}
                hide={!!hiddenSeries[series.name]}
                type="monotone" 
                dataKey="sum" 
                stroke={series.color} 
                strokeWidth={series.dashed ? 2 : 3} 
                strokeDasharray={series.dashed ? "5 5" : undefined}
                dot={false}
                activeDot={{ r: 5, fill: '#03151E', stroke: series.color, strokeWidth: 2 }}
                isAnimationActive={false}
              />
            ))}
            {data && data.length > 0 && (
              <Line 
                isAnimationActive={false}
                data={data}
                name={activeName}
                hide={!!hiddenSeries[activeName]}
                legendType={hideActiveLegend ? "none" : "line"}
                type="monotone" 
                dataKey="sum" 
                stroke="#FFFFFF" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 5, fill: '#03151E', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
