import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { StandardSeries } from './components/StandardSeries';
import { CustomSummation } from './components/CustomSummation';
import { AlgorithmAnalyzer } from './components/AlgorithmAnalyzer';
import { WelcomePage } from './components/WelcomePage';
import { ChartSeries } from './components/SeriesChart';
import { VisualProof } from './components/VisualProof';
import { AlgoArena } from './components/AlgoArena';

export type AppMode = 'home' | 'standard' | 'custom' | 'algorithm' | 'visual' | 'arena';

export default function App() {
  const [activeMode, setActiveMode] = useState<AppMode>('home');
  const [comparisonDeck, setComparisonDeck] = useState<ChartSeries[]>([]);

  const colors = ['#00E5FF', '#FF00E5', '#00FF40', '#FFD700', '#FF3366'];

  const handleAddToComparison = (series: any) => {
    setComparisonDeck(prev => {
      const existingIdx = prev.findIndex(s => s.name === series.name);
      if (existingIdx !== -1) {
        const newDeck = [...prev];
        newDeck[existingIdx] = { ...newDeck[existingIdx], data: series.data, color: series.color || newDeck[existingIdx].color };
        return newDeck;
      }
      const color = series.color || colors[prev.length % colors.length];
      return [...prev, { ...series, id: `series-${Date.now()}`, color }];
    });
  };

  const handleClearComparison = () => {
    setComparisonDeck([]);
  };

  return (
    <div className="flex h-screen bg-quantum-bg text-quantum-text font-sans overflow-hidden hide-scroll">
      <Sidebar activeMode={activeMode} setActiveMode={setActiveMode} />
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        {activeMode === 'home' && <WelcomePage onNavigate={setActiveMode} />}
        {activeMode === 'standard' && <StandardSeries comparisonDeck={comparisonDeck} onAddToComparison={handleAddToComparison} onClearComparison={handleClearComparison} />}
        {activeMode === 'custom' && <CustomSummation />}
        {activeMode === 'algorithm' && <AlgorithmAnalyzer />}
        {activeMode === 'visual' && <VisualProof />}
        {activeMode === 'arena' && <AlgoArena />}
      </main>
    </div>
  );
}
