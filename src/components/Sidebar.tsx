import React from 'react';
import { Calculator, Terminal, Code2, Home, Activity, LayoutGrid, Gamepad2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { AppMode } from '../App';

interface SidebarProps {
  activeMode: AppMode;
  setActiveMode: (mode: AppMode) => void;
}

export function Sidebar({ activeMode, setActiveMode }: SidebarProps) {
  const modes = [
    { id: 'home', label: 'Core Theory', icon: Home },
    { id: 'standard', label: 'Standard Series', icon: Calculator },
    { id: 'custom', label: 'Custom Symbol Summation', icon: Terminal },
    { id: 'algorithm', label: 'Algorithm Loop Analyzer', icon: Code2 },
    { id: 'visual', label: 'Visual Proof', icon: LayoutGrid },
    { id: 'arena', label: 'Big-O Scaling Simulator', icon: Gamepad2 },
  ] as const;

  return (
    <div className="w-64 bg-quantum-card border-r border-quantum-glow/20 p-4 flex flex-col gap-6 shrink-0 h-full">
      <div className="flex items-center gap-2 mt-4 mb-2 px-2">
        <Activity className="w-6 h-6 text-quantum-glow" />
        <h1 className="font-semibold text-lg tracking-tight">
          <span className="text-quantum-glow drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">Analysis</span> <span className="text-white">Engine</span>
        </h1>
      </div>
      <nav className="flex flex-col gap-1">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all text-left",
                isActive 
                  ? "bg-quantum-glow/10 text-quantum-glow shadow-[0_0_8px_rgba(0,229,255,0.2)] border border-quantum-glow/50" 
                  : "text-quantum-muted hover:bg-quantum-glow/5 hover:text-quantum-text hover:border hover:border-quantum-glow/30 border border-transparent"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-quantum-glow" : "text-quantum-muted")} />
              {mode.label}
            </button>
          );
        })}
      </nav>
      

    </div>
  );
}
