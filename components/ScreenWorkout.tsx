import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, XOctagon, Heart, Zap, FastForward, Volume2, AlertCircle } from 'lucide-react';
import { WorkoutPlan, PhaseType } from '../types';
import { soundService } from '../services/soundService';

interface Props {
  plan: WorkoutPlan;
  age?: number;
  onExit: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

// Calculate HR Zones based on age (default 30 if not provided)
const getHRZone = (age: number = 30, zoneIndex: number) => {
  const maxHR = 220 - age;
  // Zones: 1: 50-60%, 2: 60-70%, 3: 70-80%, 4: 80-90%, 5: 90-95%
  const zones = [
    [0.5, 0.6], [0.6, 0.7], [0.7, 0.8], [0.8, 0.9], [0.9, 0.95]
  ];
  const z = zones[zoneIndex - 1] || zones[0];
  return `${Math.round(maxHR * z[0])}-${Math.round(maxHR * z[1])}`;
};

export const ScreenWorkout: React.FC<Props> = ({ plan, age = 30, onExit }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeftInPhase, setTimeLeftInPhase] = useState(plan.phases[0].duration);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const currentPhase = plan.phases[phaseIndex];
  const nextPhase = plan.phases[phaseIndex + 1];
  const totalDuration = plan.phases.reduce((acc, p) => acc + p.duration, 0);
  const progress = (totalTimeElapsed / totalDuration) * 100;
  const isCountdown = timeLeftInPhase <= 5 && timeLeftInPhase > 0;

  // Request Wake Lock
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        console.warn('Wake Lock error:', err);
      }
    };
    requestWakeLock();
    return () => {
      wakeLockRef.current?.release();
    };
  }, []);

  // Timer Logic
  useEffect(() => {
    if (isPaused || isFinished) return;

    const interval = setInterval(() => {
      setTotalTimeElapsed(prev => prev + 1);
      
      setTimeLeftInPhase(prev => {
        if (prev <= 1) {
          // Phase Complete
          if (phaseIndex < plan.phases.length - 1) {
            setPhaseIndex(idx => idx + 1);
            const nextDuration = plan.phases[phaseIndex + 1].duration;
            soundService.playPhaseChange();
            return nextDuration;
          } else {
            // Workout Complete
            setIsFinished(true);
            soundService.playComplete();
            return 0;
          }
        }
        
        // Audio Alerts logic
        // Beep at 3, 2, 1 seconds remaining
        if (prev <= 4 && prev > 1) {
            soundService.playCountdown();
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isFinished, phaseIndex, plan.phases]);

  const handleFinish = () => {
    onExit();
  };

  const getPhaseColor = (type: PhaseType) => {
    switch (type) {
      case PhaseType.WORK: return 'text-fitness-primary border-fitness-primary';
      case PhaseType.REST: return 'text-fitness-secondary border-fitness-secondary';
      case PhaseType.WARMUP: return 'text-fitness-accent border-fitness-accent';
      case PhaseType.COOLDOWN: return 'text-blue-300 border-blue-300';
      default: return 'text-white border-white';
    }
  };

  const getPhaseBg = (type: PhaseType) => {
    switch (type) {
      case PhaseType.WORK: return 'bg-orange-500/20';
      case PhaseType.REST: return 'bg-green-500/20';
      case PhaseType.WARMUP: return 'bg-blue-500/20';
      default: return 'bg-slate-700/50';
    }
  };

  if (isFinished) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-fitness-dark text-center animate-in zoom-in duration-500">
        <div className="bg-fitness-secondary/20 p-8 rounded-full mb-6">
          <Zap className="w-16 h-16 text-fitness-secondary" />
        </div>
        <h1 className="text-4xl font-black text-white mb-2 uppercase italic">Treino Concluído!</h1>
        <p className="text-gray-400 mb-8">Excelente trabalho. Descanse e hidrate-se.</p>
        <div className="bg-fitness-card p-6 rounded-2xl w-full max-w-sm mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Tempo Total</span>
            <span className="font-bold text-xl">{Math.floor(totalDuration / 60)} min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Calorias (est.)</span>
            <span className="font-bold text-xl text-fitness-primary">{plan.estimatedCalories} kcal</span>
          </div>
        </div>
        <button 
          onClick={handleFinish}
          className="w-full max-w-sm py-4 bg-fitness-primary text-white rounded-xl font-bold shadow-lg shadow-fitness-primary/30"
        >
          Finalizar
        </button>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col relative overflow-hidden transition-colors duration-500 ${currentPhase.type === PhaseType.WORK ? 'bg-orange-900/10' : 'bg-fitness-dark'}`}>
      
      {/* Alert Overlay for last 3 seconds */}
      {isCountdown && nextPhase && (
        <div className="absolute top-20 left-0 right-0 z-20 flex justify-center animate-bounce">
            <div className="bg-red-500/90 text-white px-6 py-2 rounded-full shadow-lg backdrop-blur flex items-center gap-2">
                <AlertCircle size={20} />
                <span className="font-bold uppercase tracking-wider text-sm">Próximo: {nextPhase.description}</span>
            </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="h-2 w-full bg-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-fitness-accent to-fitness-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Controls */}
      <div className="flex justify-between items-center p-4 z-10">
        <button onClick={() => onExit()} className="p-2 bg-slate-800/50 rounded-full text-gray-400 hover:text-white">
          <XOctagon size={24} />
        </button>
        <div className="text-xs font-mono text-gray-400 bg-black/30 px-3 py-1 rounded-full">
            Total: {formatTime(totalTimeElapsed)} / {formatTime(totalDuration)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        
        {/* Phase Name Badge */}
        <div className={`px-4 py-1.5 rounded-full border mb-6 uppercase tracking-widest text-sm font-bold animate-pulse ${getPhaseColor(currentPhase.type)} ${getPhaseBg(currentPhase.type)}`}>
          {currentPhase.type === PhaseType.WORK ? 'Alta Intensidade' : 
           currentPhase.type === PhaseType.REST ? 'Recuperação' : 
           currentPhase.description}
        </div>

        {/* Timer */}
        <div className="relative mb-8">
          <h1 className={`text-[7rem] leading-none font-black tabular-nums tracking-tighter transition-colors duration-300 ${isCountdown ? 'text-fitness-danger animate-pulse' : (currentPhase.type === PhaseType.WORK ? 'text-fitness-primary' : 'text-white')}`}>
            {formatTime(timeLeftInPhase)}
          </h1>
          {/* Pulse Effect for Work Phase */}
          {currentPhase.type === PhaseType.WORK && !isPaused && (
             <div className="absolute inset-0 bg-fitness-primary/5 blur-3xl rounded-full animate-pulse z-[-1]"></div>
          )}
        </div>

        {/* Instructions */}
        <div className="w-full bg-fitness-card/80 backdrop-blur-md rounded-3xl p-6 border border-slate-700/50 shadow-2xl transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="text-gray-400 text-xs uppercase font-bold block mb-1">Velocidade / Resistência</span>
                    <span className="text-3xl font-bold text-white">{currentPhase.speedOrResistance}</span>
                </div>
                <div className="text-right">
                    <span className="text-gray-400 text-xs uppercase font-bold block mb-1 flex items-center justify-end gap-1"><Heart size={12}/> Zona {currentPhase.intensityZone} FC</span>
                    <span className="text-xl font-bold text-fitness-secondary">{getHRZone(age, currentPhase.intensityZone)} BPM</span>
                </div>
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed border-t border-slate-700 pt-3">
              {currentPhase.type === PhaseType.WORK ? "Mantenha o foco! Respire fundo e mantenha o ritmo forte." : "Recupere o fôlego. Prepare-se para o próximo tiro."}
            </p>
        </div>

        {/* Next Up Preview */}
        {nextPhase && !isCountdown && (
            <div className="mt-6 flex items-center gap-3 text-gray-500 text-sm opacity-80">
                <FastForward size={16} />
                <span>Próximo: {nextPhase.description} ({formatTime(nextPhase.duration)})</span>
            </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 pb-8 flex items-center justify-center gap-6 z-10 bg-gradient-to-t from-fitness-dark to-transparent">
        <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-lg ${isPaused ? 'bg-fitness-secondary text-white' : 'bg-slate-700 text-white'}`}
        >
            {isPaused ? <Play fill="currentColor" size={32} /> : <Pause fill="currentColor" size={32} />}
        </button>

        <button 
            onClick={onExit}
            className="w-20 h-20 rounded-full bg-fitness-danger text-white flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 shadow-lg shadow-fitness-danger/30"
        >
            <span className="font-bold text-xs uppercase">Parar</span>
            <XOctagon size={24} />
        </button>
      </div>
    </div>
  );
};