import React, { useState } from 'react';
import { ScreenEquipment } from './components/ScreenEquipment';
import { ScreenDuration } from './components/ScreenDuration';
import { ScreenLevel } from './components/ScreenLevel';
import { ScreenWorkout } from './components/ScreenWorkout';
import { Equipment, Duration, Level, WorkoutPlan } from './types';
import { generateWorkout } from './services/workoutGenerator';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);

  const handleEquipmentSelect = (eq: Equipment) => {
    setEquipment(eq);
    setStep(2);
  };

  const handleDurationSelect = (dur: Duration) => {
    setDuration(dur);
    setStep(3);
  };

  const handleLevelSelect = (lvl: Level) => {
    setLevel(lvl);
    if (equipment && duration) {
      const plan = generateWorkout(equipment, duration, lvl);
      setActivePlan(plan);
      setStep(4);
    }
  };

  const handleExitWorkout = () => {
    setStep(1);
    setEquipment(null);
    setDuration(null);
    setLevel(null);
    setActivePlan(null);
  };

  return (
    <div className="bg-fitness-dark min-h-screen text-white font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-slate-800">
      <main className="h-[100dvh]">
        {step === 1 && (
          <ScreenEquipment onSelect={handleEquipmentSelect} />
        )}
        
        {step === 2 && (
          <ScreenDuration 
            onSelect={handleDurationSelect} 
            onBack={() => setStep(1)} 
          />
        )}
        
        {step === 3 && (
          <ScreenLevel 
            onSelect={handleLevelSelect} 
            onBack={() => setStep(2)} 
          />
        )}
        
        {step === 4 && activePlan && (
          <ScreenWorkout 
            plan={activePlan} 
            age={30} // Could be parametrized in a settings screen
            onExit={handleExitWorkout} 
          />
        )}
      </main>
    </div>
  );
};

export default App;