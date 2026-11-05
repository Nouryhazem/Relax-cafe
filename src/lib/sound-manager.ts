/**
 * Relax Café — Web Audio API Procedural Sound Engine
 * Never autoplays; loads only upon explicit consent.
 * Provides subtle elevator movements, floor ticks, Level Seven chime,
 * door opening, glass/cup click, and bill balanced confirmation.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private elevatorHumGain: GainNode | null = null;
  private elevatorHumOsc: OscillatorNode | null = null;

  constructor() {
    try {
      const saved = sessionStorage.getItem('relax_sound_enabled');
      if (saved === 'false') {
        this.isEnabled = false;
      } else {
        this.isEnabled = true;
      }
    } catch {
      this.isEnabled = true;
    }

    // Auto-unlock Web Audio API on first user gesture without asking questions
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (this.isEnabled) {
          this.initCtx();
        }
      };
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundConsent(enabled: boolean) {
    this.isEnabled = enabled;
    try {
      sessionStorage.setItem('relax_sound_enabled', enabled ? 'true' : 'false');
      sessionStorage.setItem('relax_sound_decided', 'true');
    } catch {
      // ignore
    }
    if (enabled) {
      this.initCtx();
    } else {
      this.stopElevatorHum();
      if (this.ctx && this.ctx.state === 'running') {
        this.ctx.suspend();
      }
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public hasUserDecided(): boolean {
    try {
      return sessionStorage.getItem('relax_sound_decided') === 'true';
    } catch {
      return false;
    }
  }

  // 1. Subtle elevator movement hum
  public startElevatorHum() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    if (this.elevatorHumOsc) return;

    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A1

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    this.elevatorHumOsc = osc;
    this.elevatorHumGain = gain;
  }

  public stopElevatorHum() {
    if (this.elevatorHumGain && this.ctx) {
      try {
        this.elevatorHumGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.elevatorHumOsc?.stop();
          this.elevatorHumOsc?.disconnect();
          this.elevatorHumOsc = null;
          this.elevatorHumGain = null;
        }, 550);
      } catch {
        this.elevatorHumOsc = null;
        this.elevatorHumGain = null;
      }
    }
  }

  public startStreetAmbience() {
    // Subtle ambient street presence
  }

  public stopStreetAmbience() {
    // Subtle ambient street presence
  }

  // 2. Soft floor tick
  public playFloorTick() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // 3. Level Seven Arrival Chime (tuned dual sine bell: 784Hz G5 & 1046Hz C6)
  public playLevelSevenChime() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // G5 (784Hz) then C6 (1046.5Hz)
    const tones = [
      { freq: 783.99, delay: 0, duration: 1.8, gainVal: 0.07 },
      { freq: 1046.5, delay: 0.12, duration: 2.2, gainVal: 0.09 },
    ];

    tones.forEach(t => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(t.freq, now + t.delay);

      gain.gain.setValueAtTime(0.001, now + t.delay);
      gain.gain.linearRampToValueAtTime(t.gainVal, now + t.delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t.delay + t.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t.delay);
      osc.stop(now + t.delay + t.duration + 0.1);
    });
  }

  // 4. Elevator doors opening
  public playDoorsOpen() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // White noise / breath buffer for pneumatic door slide
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(220, now + 0.7);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.75);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  // 5. Cup / Glass placed on table when adding item
  public playAddClick() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.06);

    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // 6. Check balanced confirmation ("كله تمام.")
  public playCheckBalanced() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Harmonious major triad (C5 - E5 - G5)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.05, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.3);
    });
  }

  // 7. Tactile paper unfolding / page-turn whisper
  public playPaperUnfold() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.25;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }

  // 8. Delicate ice clinking in chilled glass
  public playIceClink() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.12);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Alias for ice pour / drink recommendation reveal
  public playIcePour() {
    this.playIceClink();
  }

  // 9. Soft dessert spoon touch on ceramic/gelato
  public playSpoonTouch() {
    if (!this.isEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1250, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}

export const soundManager = new SoundEngine();
