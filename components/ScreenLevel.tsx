import React from 'react';
import { ChevronLeft, Battery, BatteryLow, BatteryMedium, BatteryCharging } from 'lucide-react';
import { Level } from '../types';
import { soundService } from '../services/soundService';

interface Props {
  onSelect: (lvl: Level) => void;
  onBack: () => void;
}

export const ScreenLevel: React.FC<Props> = ({ onSelect, onBack }) => {
  const levels = [
    { id: Level.BEGINNER, label: 'Iniciante', desc: 'Começando agora ou retornando.', icon: BatteryLow, color: 'text-green-400', border: 'hover:border-green-400' },
    { id: Level.EASY, label: 'Fácil', desc: 'Alguma experiência com exercícios.', icon: Battery, color: 'text-blue-400', border: 'hover:border-blue-400' },
    { id: Level.MODERATE, label: 'Moderado', desc: 'Pratica regularmente.', icon: BatteryMedium, color: 'text-orange-400', border: 'hover:border-orange-400' },
    { id: Level.HARD, label: 'Difícil', desc: 'Atleta ou muito condicionado.', icon: BatteryCharging, color: 'text-red-500', border: 'hover:border-red-500' },
  ];

  const handleSelect = (lvl: Level) => {
    // Resume audio context here to ensure mobile browsers allow sound playback in the next screen
    soundService.resume();
    onSelect(lvl);
  };

  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <header className="mb-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
          <ChevronLeft className="text-white" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Intensidade</h2>
          <p className="text-sm text-gray-400">Escolha seu desafio.</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => handleSelect(lvl.id)}
            className={`w-full bg-fitness-card hover:bg-slate-800 active:scale-98 border-2 border-transparent ${lvl.border} rounded-2xl p-5 transition-all flex items-center justify-between text-left`}
          >
            <div>
              <h3 className={`text-lg font-bold ${lvl.color} mb-1`}>{lvl.label}</h3>
              <p className="text-gray-400 text-sm leading-tight">{lvl.desc}</p>
            </div>
            <lvl.icon className={`w-8 h-8 ${lvl.color} opacity-80`} />
          </button>
        ))}
      </div>
    </div>
  );
};