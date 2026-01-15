import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const HealthWarning: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-fitness-card w-full max-w-md rounded-2xl shadow-2xl border border-fitness-danger/30 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-fitness-danger p-4 flex items-center gap-3">
          <AlertTriangle className="text-white w-8 h-8" />
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Aviso Importante</h2>
        </div>
        
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="font-semibold text-white">Este sistema oferece treinos de alta intensidade.</p>
          
          <div className="space-y-2">
            <p className="text-gray-300 text-sm">NÃO realize se você:</p>
            <ul className="list-disc pl-5 text-gray-400 text-sm space-y-1">
              <li>Tem histórico de doença cardíaca</li>
              <li>Sente dores no peito durante exercícios</li>
              <li>Teve tontura ou desmaio recente</li>
              <li>Tem pressão alta não controlada</li>
              <li>Está grávida sem orientação médica</li>
              <li>Tem lesões articulares ou musculares</li>
            </ul>
          </div>

          <div className="bg-fitness-danger/10 p-3 rounded-lg border border-fitness-danger/20">
            <p className="text-fitness-danger font-bold text-sm">PARE IMEDIATAMENTE SE SENTIR:</p>
            <p className="text-gray-400 text-xs mt-1">Dor no peito, tontura, náusea ou falta de ar extrema.</p>
          </div>
        </div>

        <div className="p-4 bg-fitness-dark border-t border-gray-700 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-400 hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-fitness-primary text-white rounded-xl font-bold shadow-lg shadow-fitness-primary/20 hover:bg-orange-600 transition-all active:scale-95"
          >
            Estou Apto
          </button>
        </div>
      </div>
    </div>
  );
};