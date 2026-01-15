// Simple audio service for workout cues

class SoundService {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  public async resume() {
    try {
      const ctx = this.getContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch (error) {
      console.error("Failed to resume audio context:", error);
    }
  }

  public playBeep(frequency: number = 440, duration: number = 0.1, type: OscillatorType = 'sine') {
    try {
      const ctx = this.getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio play failed", e);
    }
  }

  public playPhaseChange() {
    // High pitched double beep - distinct for phase change
    this.playBeep(880, 0.1, 'square');
    setTimeout(() => this.playBeep(880, 0.3, 'square'), 150);
  }

  public playCountdown() {
    // Sharp short beep for countdown (3... 2... 1...)
    this.playBeep(660, 0.15, 'sawtooth');
  }

  public playComplete() {
    // Victory sound sequence
    this.playBeep(523.25, 0.1, 'triangle'); // C5
    setTimeout(() => this.playBeep(659.25, 0.1, 'triangle'), 150); // E5
    setTimeout(() => this.playBeep(783.99, 0.4, 'triangle'), 300); // G5
  }
}

export const soundService = new SoundService();