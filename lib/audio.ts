// Procedural Web Audio API sound generator for authentic mechanical automotive ambience.
// Completely offline, no external audio assets required. Safe, volume-capped, OFF by default.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private engineIdleGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('apex_sound_enabled');
      this.isMuted = saved !== 'true'; // Default is OFF as requested
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsEnabled(): boolean {
    return !this.isMuted;
  }

  public toggleSound(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex_sound_enabled', (!this.isMuted).toString());
    }

    if (!this.isMuted) {
      this.startEngineAmbience();
      this.playMechanicalClick();
    } else {
      this.stopEngineAmbience();
    }
    return !this.isMuted;
  }

  // Soft mechanical switch click (button hover/press)
  public playMechanicalClick(frequency: number = 720, duration: number = 0.04) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      filter.Q.setValueAtTime(4, this.ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency * 1.5, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio safety guard
    }
  }

  // Pneumatic air hiss / compressor sound (e.g. air suspension stance change or paint gun)
  public playAirSuspensionHiss() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // safe fallback
    }
  }

  // Ignition start sound for the loading screen / hero reveal
  public playIgnitionStart() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      // Starter motor pulse
      const starterOsc = this.ctx.createOscillator();
      const starterGain = this.ctx.createGain();
      starterOsc.type = 'sawtooth';
      starterOsc.frequency.setValueAtTime(45, this.ctx.currentTime);
      starterOsc.frequency.linearRampToValueAtTime(140, this.ctx.currentTime + 0.6);

      starterGain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      starterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      starterOsc.connect(starterGain);
      starterGain.connect(this.ctx.destination);
      starterOsc.start();
      starterOsc.stop(this.ctx.currentTime + 0.7);

      // Low bass roar on fire
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const roar = this.ctx.createOscillator();
        const roarGain = this.ctx.createGain();
        roar.type = 'triangle';
        roar.frequency.setValueAtTime(80, this.ctx.currentTime);
        roar.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 1.2);

        roarGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        roarGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

        roar.connect(roarGain);
        roarGain.connect(this.ctx.destination);
        roar.start();
        roar.stop(this.ctx.currentTime + 1.2);
      }, 650);
    } catch {
      // safe fallback
    }
  }

  // Continuous low V8 rumble ambience (very subtle, 30-40Hz)
  private startEngineAmbience() {
    if (this.engineOsc || !this.ctx) return;

    try {
      this.engineIdleGain = this.ctx.createGain();
      this.engineIdleGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.engineIdleGain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 2.0); // Extremely subtle

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(110, this.ctx.currentTime);

      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(28, this.ctx.currentTime); // 28 Hz low automotive thrum

      this.subOsc = this.ctx.createOscillator();
      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(42, this.ctx.currentTime);

      this.engineOsc.connect(lowpass);
      this.subOsc.connect(lowpass);
      lowpass.connect(this.engineIdleGain);
      this.engineIdleGain.connect(this.ctx.destination);

      this.engineOsc.start();
      this.subOsc.start();
    } catch {
      // safe
    }
  }

  private stopEngineAmbience() {
    if (this.engineIdleGain && this.ctx) {
      try {
        this.engineIdleGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          this.engineOsc?.stop();
          this.subOsc?.stop();
          this.engineOsc = null;
          this.subOsc = null;
          this.engineIdleGain = null;
        }, 350);
      } catch {
        this.engineOsc = null;
        this.subOsc = null;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
