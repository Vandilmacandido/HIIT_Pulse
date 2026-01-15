import React, { useState } from 'react';
import { Bike, Footprints, Info } from 'lucide-react';
import { Equipment } from '../types';
import { HealthWarning } from './HealthWarning';

interface Props {
  onSelect: (eq: Equipment) => void;
}

export const ScreenEquipment: React.FC<Props> = ({ onSelect }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<Equipment | null>(null);

  const handleInitialClick = (eq: Equipment) => {
    setSelectedTemp(eq);
    setShowWarning(true);
  };

  const handleConfirm = () => {
    if (selectedTemp) {
      onSelect(selectedTemp);
    }
    setShowWarning(false);
  };

  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">
          HIIT <span className="text-fitness-primary">Pulse</span>
        </h1>
        <p className="text-gray-400 mt-2">Escolha seu equipamento de combate.</p>
      </header>

      <div className="flex-1 space-y-6 flex flex-col justify-center">
        {/* Treadmill Card */}
        <button
          onClick={() => handleInitialClick(Equipment.TREADMILL)}
          className="group relative w-full bg-fitness-card hover:bg-slate-700 border-2 border-transparent hover:border-fitness-primary rounded-3xl p-6 transition-all duration-300 shadow-xl"
        >
          <div className="absolute top-4 right-4 bg-fitness-dark p-2 rounded-full">
            <Footprints className="text-fitness-primary w-6 h-6" />
          </div>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Esteira</h3>
            <p className="text-sm text-gray-400">
              Corridas intervaladas para máxima queima calórica e resistência.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded">Cardio</span>
              <span className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded">Pernas</span>
            </div>
          </div>
        </button>

        {/* Bike Card */}
        <button
          onClick={() => handleInitialClick(Equipment.BIKE)}
          className="group relative w-full bg-fitness-card hover:bg-slate-700 border-2 border-transparent hover:border-fitness-accent rounded-3xl p-6 transition-all duration-300 shadow-xl"
        >
          <div className="absolute top-4 right-4 bg-fitness-dark p-2 rounded-full">
            <Bike className="text-fitness-accent w-6 h-6" />
          </div>
          <div className="flex flex-col items-start text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Bicicleta</h3>
            <p className="text-sm text-gray-400">
              RPM e resistência para força explosiva com menor impacto articular.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded">Força</span>
              <span className="text-xs bg-slate-800 text-gray-300 px-2 py-1 rounded">Baixo Impacto</span>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-auto pt-6 text-center">
        <button 
          onClick={() => setShowWarning(true)}
          className="text-gray-500 text-sm flex items-center justify-center gap-2 hover:text-white transition-colors"
        >
          <Info size={16} /> Ler Aviso de Saúde
        </button>
      </div>

      <HealthWarning 
        isOpen={showWarning} 
        onClose={() => setShowWarning(false)} 
        onConfirm={handleConfirm} 
      />
    </div>
  );
};