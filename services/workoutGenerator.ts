import { Equipment, Duration, Level, WorkoutPlan, PhaseType, WorkoutPhase } from '../types';

const createPhase = (
  type: PhaseType,
  minutes: number, // allow decimal for seconds
  description: string,
  intensityZone: number,
  speedOrResistance: string
): WorkoutPhase => ({
  type,
  duration: Math.round(minutes * 60),
  description,
  intensityZone,
  speedOrResistance,
});

export const generateWorkout = (
  equipment: Equipment,
  duration: Duration,
  level: Level
): WorkoutPlan => {
  const phases: WorkoutPhase[] = [];
  let calories = 0;

  // --- TREADMILL LOGIC ---
  if (equipment === Equipment.TREADMILL) {
    if (duration === Duration.MIN_10) {
      calories = 80;
      if (level === Level.BEGINNER) {
        phases.push(createPhase(PhaseType.WARMUP, 2, "Caminhada Leve", 1, "4-5 km/h"));
        for (let i = 0; i < 4; i++) {
          phases.push(createPhase(PhaseType.WORK, 0.5, "Trote Leve", 3, "7 km/h"));
          phases.push(createPhase(PhaseType.REST, 1, "Caminhada", 2, "4 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 2, "Caminhada Lenta", 1, "3-4 km/h"));
      } else if (level === Level.EASY) {
        phases.push(createPhase(PhaseType.WARMUP, 2, "Caminhada Rápida", 2, "5-6 km/h"));
        for (let i = 0; i < 4; i++) {
          phases.push(createPhase(PhaseType.WORK, 0.5, "Corrida", 4, "9 km/h"));
          phases.push(createPhase(PhaseType.REST, 1, "Trote", 3, "6 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 2, "Caminhada", 1, "4 km/h"));
      } else if (level === Level.MODERATE) {
        calories = 100;
        phases.push(createPhase(PhaseType.WARMUP, 1.5, "Trote", 2, "6-7 km/h"));
        for (let i = 0; i < 5; i++) {
          phases.push(createPhase(PhaseType.WORK, 40/60, "Corrida Forte", 4, "10-11 km/h"));
          phases.push(createPhase(PhaseType.REST, 50/60, "Trote", 3, "6-7 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 1.5, "Caminhada", 1, "4 km/h"));
      } else { // HARD
        calories = 120;
        phases.push(createPhase(PhaseType.WARMUP, 1.5, "Trote", 3, "7-8 km/h"));
        for (let i = 0; i < 6; i++) {
          phases.push(createPhase(PhaseType.WORK, 45/60, "SPRINT MÁXIMO", 5, "12-14 km/h"));
          phases.push(createPhase(PhaseType.REST, 45/60, "Trote", 3, "7 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 1.5, "Caminhada Leve", 1, "Livre"));
      }
    } else if (duration === Duration.MIN_15) {
      calories = 140;
      if (level === Level.BEGINNER) {
        phases.push(createPhase(PhaseType.WARMUP, 3, "Caminhada Leve", 1, "4-5 km/h"));
        for (let i = 0; i < 6; i++) {
          phases.push(createPhase(PhaseType.WORK, 0.5, "Trote", 3, "7 km/h"));
          phases.push(createPhase(PhaseType.REST, 1, "Caminhada", 2, "4-5 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 3, "Caminhada Lenta", 1, "3-4 km/h"));
      } else if (level === Level.EASY) {
        phases.push(createPhase(PhaseType.WARMUP, 2, "Caminhada Rápida", 2, "5-6 km/h"));
        for (let i = 0; i < 6; i++) {
          phases.push(createPhase(PhaseType.WORK, 45/60, "Corrida", 4, "9 km/h"));
          phases.push(createPhase(PhaseType.REST, 60/60, "Trote", 3, "6 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 2, "Caminhada", 1, "4 km/h"));
      } else if (level === Level.MODERATE) {
        phases.push(createPhase(PhaseType.WARMUP, 2, "Trote", 2, "6-7 km/h"));
        for (let i = 0; i < 7; i++) {
          phases.push(createPhase(PhaseType.WORK, 45/60, "Corrida Forte", 4, "10-12 km/h"));
          phases.push(createPhase(PhaseType.REST, 45/60, "Trote", 3, "6-7 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 2, "Caminhada", 1, "4 km/h"));
      } else { // HARD
        calories = 180;
        phases.push(createPhase(PhaseType.WARMUP, 2, "Trote", 3, "7-8 km/h"));
        for (let i = 0; i < 8; i++) {
          phases.push(createPhase(PhaseType.WORK, 50/60, "SPRINT", 5, "13-15 km/h"));
          phases.push(createPhase(PhaseType.REST, 40/60, "Trote", 3, "7 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 2, "Caminhada Leve", 1, "Livre"));
      }
    } else { // 25 MIN
      calories = 250;
      if (level === Level.BEGINNER) {
        phases.push(createPhase(PhaseType.WARMUP, 4, "Caminhada Leve", 1, "4-5 km/h"));
        for (let i = 0; i < 10; i++) {
          phases.push(createPhase(PhaseType.WORK, 0.5, "Trote", 3, "7 km/h"));
          phases.push(createPhase(PhaseType.REST, 1.5, "Caminhada", 2, "4-5 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 4, "Caminhada Lenta", 1, "3-4 km/h"));
      } else if (level === Level.EASY) {
        phases.push(createPhase(PhaseType.WARMUP, 3, "Caminhada Rápida", 2, "5-6 km/h"));
        for (let i = 0; i < 10; i++) {
          phases.push(createPhase(PhaseType.WORK, 45/60, "Corrida", 4, "9-10 km/h"));
          phases.push(createPhase(PhaseType.REST, 75/60, "Trote", 3, "6 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 3, "Caminhada", 1, "4 km/h"));
      } else if (level === Level.MODERATE) {
        phases.push(createPhase(PhaseType.WARMUP, 3, "Trote", 2, "6-7 km/h"));
        for (let i = 0; i < 12; i++) {
          phases.push(createPhase(PhaseType.WORK, 50/60, "Corrida Forte", 4, "11-13 km/h"));
          phases.push(createPhase(PhaseType.REST, 1, "Trote", 3, "7 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 3, "Caminhada", 1, "4 km/h"));
      } else { // HARD
        calories = 350;
        phases.push(createPhase(PhaseType.WARMUP, 2.5, "Trote", 3, "7-8 km/h"));
        for (let i = 0; i < 14; i++) {
          phases.push(createPhase(PhaseType.WORK, 1, "SPRINT", 5, "13-16 km/h"));
          phases.push(createPhase(PhaseType.REST, 50/60, "Trote", 3, "7-8 km/h"));
        }
        phases.push(createPhase(PhaseType.COOLDOWN, 2.5, "Caminhada Leve", 1, "Livre"));
      }
    }
  } 
  
  // --- BIKE LOGIC ---
  else {
    // Logic for Bike follows specific patterns described in prompt
    const is10 = duration === Duration.MIN_10;
    const is15 = duration === Duration.MIN_15;
    const is25 = duration === Duration.MIN_25;

    let reps = is10 ? 4 : is15 ? 6 : 10;
    let warmupTime = is10 ? 2 : is15 ? 3 : 4;
    let cooldownTime = is10 ? 2 : is15 ? 3 : 4;

    if (level === Level.BEGINNER) {
      calories = is10 ? 60 : is15 ? 100 : 180;
      phases.push(createPhase(PhaseType.WARMUP, warmupTime, "Giro Leve", 1, "Res 3, 60-70 RPM"));
      for (let i = 0; i < reps; i++) {
        phases.push(createPhase(PhaseType.WORK, 0.5, "Acelera", 3, "Res 5, 80 RPM"));
        phases.push(createPhase(PhaseType.REST, is25 ? 1.5 : 1, "Recupera", 2, "Res 3, 60 RPM"));
      }
      phases.push(createPhase(PhaseType.COOLDOWN, cooldownTime, "Giro Solto", 1, "Res 2, 50-60 RPM"));
    } else if (level === Level.EASY) {
      reps = is10 ? 4 : is15 ? 6 : 10;
      warmupTime = is10 ? 2 : is15 ? 2 : 3;
      cooldownTime = is10 ? 2 : is15 ? 2 : 3;
      calories = is10 ? 80 : is15 ? 120 : 200;

      phases.push(createPhase(PhaseType.WARMUP, warmupTime, "Giro Médio", 2, "Res 4, 70 RPM"));
      for (let i = 0; i < reps; i++) {
        phases.push(createPhase(PhaseType.WORK, is10 ? 0.5 : 0.75, "Força", 4, "Res 6-7, 90 RPM"));
        phases.push(createPhase(PhaseType.REST, 1, "Giro", 3, "Res 4, 70 RPM")); // Note: 25min uses 75s rest in easy treadmill, simplifying to 1m or adapting logic
      }
      phases.push(createPhase(PhaseType.COOLDOWN, cooldownTime, "Giro Solto", 1, "Res 2, 60 RPM"));
    } else if (level === Level.MODERATE) {
      reps = is10 ? 5 : is15 ? 7 : 12;
      warmupTime = is10 ? 1.5 : is15 ? 2 : 3;
      cooldownTime = is10 ? 1.5 : is15 ? 2 : 3;
      calories = is10 ? 110 : is15 ? 160 : 280;

      phases.push(createPhase(PhaseType.WARMUP, warmupTime, "Aquecimento", 2, "Res 5, 75 RPM"));
      for (let i = 0; i < reps; i++) {
        phases.push(createPhase(PhaseType.WORK, 40/60, "Intenso", 4, "Res 7-8, 95 RPM"));
        phases.push(createPhase(PhaseType.REST, 50/60, "Recupera", 3, "Res 5, 75 RPM"));
      }
      phases.push(createPhase(PhaseType.COOLDOWN, cooldownTime, "Giro Leve", 1, "Res 3, 60 RPM"));
    } else { // HARD
      reps = is10 ? 6 : is15 ? 8 : 14;
      warmupTime = is10 ? 1.5 : is15 ? 2 : 2.5;
      cooldownTime = is10 ? 1.5 : is15 ? 2 : 2.5;
      calories = is10 ? 150 : is15 ? 220 : 380;

      phases.push(createPhase(PhaseType.WARMUP, warmupTime, "Aquecimento Firme", 3, "Res 6, 80 RPM"));
      for (let i = 0; i < reps; i++) {
        phases.push(createPhase(PhaseType.WORK, 45/60, "SPRINT TOTAL", 5, "Res 9-10, 100+ RPM"));
        phases.push(createPhase(PhaseType.REST, 45/60, "Recupera", 3, "Res 6, 80 RPM"));
      }
      phases.push(createPhase(PhaseType.COOLDOWN, cooldownTime, "Giro Leve", 1, "Res 3, 60 RPM"));
    }
  }

  return {
    id: `${equipment}-${duration}-${level}`,
    equipment,
    durationTotal: duration,
    level,
    estimatedCalories: calories,
    phases
  };
};