export enum Equipment {
  TREADMILL = 'TREADMILL',
  BIKE = 'BIKE',
}

export enum Duration {
  MIN_10 = 10,
  MIN_15 = 15,
  MIN_25 = 25,
}

export enum Level {
  BEGINNER = 'BEGINNER',
  EASY = 'EASY',
  MODERATE = 'MODERATE',
  HARD = 'HARD',
}

export enum PhaseType {
  WARMUP = 'WARMUP',
  WORK = 'WORK',
  REST = 'REST',
  COOLDOWN = 'COOLDOWN',
}

export interface WorkoutPhase {
  type: PhaseType;
  duration: number; // in seconds
  description: string;
  intensityZone: number; // 1-5
  speedOrResistance: string; // Display text for speed/resistance
}

export interface WorkoutPlan {
  id: string;
  equipment: Equipment;
  durationTotal: number;
  level: Level;
  estimatedCalories: number;
  phases: WorkoutPhase[];
}

export interface UserSettings {
  age: number;
}