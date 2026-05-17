import React from 'react';
import { Calculator, Terminal, Code2, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onNavigate: (mode: 'standard' | 'custom' | 'algorithm') => void;
}

export function WelcomePage({ onNavigate }: WelcomePageProps) {
  const cards = [
    {
      id: 'standard',
      title: 'Arithmetic & Harmonic Series (Nested Loops)',
      icon: Calculator,
      sections: [
        {
          heading: 'What is it?',
          text: 'An Arithmetic Series adds a constant step every time (1 + 2 + 3...). A Harmonic Series adds shrinking fractions (1 + 1/2 + 1/3...).'
        },
        {
          heading: 'The Code Link',
          text: 'Arithmetic series map exactly to dependent nested loops, solving to n(n+1)/2 or O(n²) time complexity. Harmonic series define the average data scaling laws of optimized search profiles like QuickSort.'
        }
      ]
    },
    {
      id: 'custom',
      title: 'Geometric Series (Recursive & Tree Scaling)',
      icon: Terminal,
      sections: [
        {
          heading: 'What is it?',
          text: 'A Geometric Series multiplies each step by a fixed number (1 + 2 + 4 + 8...). If multiplying by a fraction less than 1, the total accumulation hits a hard ceiling and stabilizes, demonstrating Infinite Convergence.'
        },
        {
          heading: 'The Code Link',
          text: 'This models Divide-and-Conquer algorithms. When code splits datasets perfectly in half recursively (like Binary Search or Merge Sort), the processing tracks a geometric hierarchy resulting in clean O(log n) efficiency.'
        }
      ]
    },
    {
      id: 'algorithm',
      title: 'General Summations (Closed-Forms & Approximations)',
      icon: Code2,
      sections: [
        {
          heading: 'What is it?',
          text: 'A Closed-Form is an exact algebraic formula that lets you skip running a slow programming loop entirely to find a sum instantly. An Asymptotic Approximation uses smooth math curves to calculate massive series where exact shortcuts don\'t exist.'
        },
        {
          heading: 'The Code Link',
          text: 'Crucial for big data analytics. Instead of letting brute-force computation loops crash the hardware over billions of data rows, we execute symbolic algebra shortcuts to return analytics instantly without wasting CPU cycles.'
        }
      ]
    }
  ] as const;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-12 pt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-quantum-text drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
          Algorithmic Analytics & Discrete Math Engine
        </h1>
        <p className="text-lg text-quantum-muted max-w-2xl mx-auto">
          A powerful interactive environment for modeling infinite series, evaluating custom summations, and analyzing algorithmic time complexity visually.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              className="bento-card group flex flex-col p-8 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] bg-quantum-card border border-quantum-glow/20 rounded-xl"
            >
              <div className="w-16 h-16 bg-quantum-glow/10 border border-quantum-glow/30 text-quantum-glow rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                <Icon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-quantum-text mb-6 group-hover:text-quantum-glow transition-colors">
                {card.title}
              </h2>
              
              <div className="flex flex-col gap-5 mb-10 flex-grow">
                {card.sections.map((section, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h3 className="text-sm font-bold text-quantum-glow uppercase tracking-wider">
                      {section.heading}
                    </h3>
                    <p className="text-quantum-muted text-sm leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => onNavigate(card.id as any)}
                className="mt-auto flex items-center justify-between w-full py-3 px-6 bg-quantum-glow/10 hover:bg-quantum-glow/20 border border-quantum-glow/50 text-quantum-glow rounded-lg font-semibold transition-all group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                <span>Launch Interactive Calculator</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
