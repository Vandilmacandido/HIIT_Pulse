import React from 'react';
import { Clock, ChevronLeft, Flame } from 'lucide-react';
import { Duration } from '../types';

interface Props {
  onSelect: (dur: Duration) => void;
  onBack: () => void;
}

export const ScreenDuration: React.FC<Props> = ({ onSelect, onBack }) => {
  const options = [
    { val: Duration.MIN_10, label: '10 Minutos', sub: 'Iniciante / Expresso', cal: '~100 kcal' },
    { val: Duration.MIN_15, label: '15 Minutos', sub: 'Intermediário', cal: '~150 kcal' },
    { val: Duration.MIN_25, label: '25 Minutos', sub: 'Avançado / Endurance', cal: '~250 kcal' },
  ];

  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <header className="mb-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
          <ChevronLeft className="text-white" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Tempo Total</h2>
          <p className="text-sm text-gray-400">Quanto tempo você tem hoje?</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-4 justify-center">
        {options.map((opt) => (
          <button
            key={opt.val}
            onClick={() => onSelect(opt.val)}
            className="w-full bg-fitness-card hover:bg-slate-700 active:scale-98 border border-slate-700 hover:border-fitness-secondary rounded-2xl p-6 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-fitness-dark p-3 rounded-full group-hover:bg-fitness-secondary/20 transition-colors">
                <Clock className="w-6 h-6 text-fitness-secondary" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">{opt.label}</h3>
                <p className="text-sm text-gray-400">{opt.sub}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-fitness-primary text-xs font-bold bg-fitness-primary/10 px-2 py-1 rounded-full">
                <Flame size={12} /> {opt.cal}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};