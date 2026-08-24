/**
 * Zero-dependency procedural sound engine built on the native Web Audio API.
 * Every effect is synthesized at runtime — no audio files are shipped.
 *
 * All methods are safe to call from SSR contexts (they no-op without `window`)
 * and tolerate suspended/blocked AudioContexts (autoplay policies).
 */

type AudioContextCtor = typeof AudioContext;

type ExtendedWindow = {
  AudioContext?: AudioContextCtor;
  webkitAudioContext?: AudioContextCtor;
};

const MASTER_GAIN = 0.55;
const EPSILON = 0.0001;

class ProceduralSoundFX {
  /** Master mute flag. When true, every play* method becomes a no-op. */
  public isMuted = false;

  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  /**
   * Lazily create/resume the shared AudioContext.
   * Returns null on the server, in unsupported browsers, or if construction throws.
   */
  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      const w = window as unknown as ExtendedWindow;
      const Ctor = w.AudioContext ?? w.webkitAudioContext;
      if (!Ctor) return null;

      if (!this.ctx) {
        this.ctx = new Ctor();
        this.master = this.ctx.createGain();
        this.master.gain.value = MASTER_GAIN;
        this.master.connect(this.ctx.destination);
      }

      if (this.ctx.state === "suspended") {
        void this.ctx.resume().catch(() => undefined);
      }
      // Blocked by an autoplay policy — stay silent this tick rather than throw.
      if (this.ctx.state !== "running") return null;

      return this.ctx;
    } catch {
      return null;
    }
  }

  private getNoise(ctx: AudioContext): AudioBuffer {
    if (!this.noiseBuffer || this.noiseBuffer.sampleRate !== ctx.sampleRate) {
      const length = Math.floor(ctx.sampleRate * 0.5);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buffer;
    }
    return this.noiseBuffer;
  }

  private startNoise(ctx: AudioContext, when: number, stopAt: number): AudioBufferSourceNode {
    const src = ctx.createBufferSource();
    src.buffer = this.getNoise(ctx);
    src.loop = true;
    src.start(when);
    src.stop(stopAt);
    return src;
  }

  private tone(
    ctx: AudioContext,
    type: OscillatorType,
    when: number,
    stopAt: number,
    freqFrom: number,
    freqTo?: number,
  ): OscillatorNode {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freqFrom, when);
    if (freqTo !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(freqTo, stopAt);
    }
    osc.start(when);
    osc.stop(stopAt);
    return osc;
  }

  private envelope(ctx: AudioContext, when: number, peak: number, decayEnd: number): GainNode {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(EPSILON, when);
    gain.gain.linearRampToValueAtTime(peak, when + Math.min(0.008, (decayEnd - when) / 3));
    gain.gain.exponentialRampToValueAtTime(EPSILON, decayEnd);
    return gain;
  }

  /**
   * Create/resume the shared context synchronously inside a user gesture.
   * Browsers block audio until the first interaction — call from a
   * pointer/key/touch handler to arm the engine.
   */
  public unlock(): void {
    this.ensureContext();
  }

  /**
   * Suppressed gunshot: white-noise burst through a fast-closing low-pass,
   * a ~28 Hz recoil oscillation wobbling the body, and a low sub thump.
   */
  public playSilencedShot(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master || this.isMuted) return;
    const t = ctx.currentTime;

    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = "lowpass";
    bodyFilter.Q.value = 0.9;
    bodyFilter.frequency.setValueAtTime(2800, t);
    bodyFilter.frequency.exponentialRampToValueAtTime(240, t + 0.09);

    const bodyGain = this.envelope(ctx, t, 0.85, t + 0.14);
    this.startNoise(ctx, t, t + 0.15).connect(bodyFilter);
    bodyFilter.connect(bodyGain);

    // Mechanical recoil oscillation: tremolo on the shot body.
    const lfo = this.tone(ctx, "sine", t, t + 0.16, 28);
    const lfoDepth = ctx.createGain();
    lfoDepth.gain.setValueAtTime(0.32, t);
    lfoDepth.gain.setValueAtTime(0.32, t + 0.1);
    lfoDepth.gain.linearRampToValueAtTime(0, t + 0.16);
    lfo.connect(lfoDepth);
    lfoDepth.connect(bodyGain.gain);

    const thumpGain = this.envelope(ctx, t, 0.6, t + 0.12);
    this.tone(ctx, "sine", t, t + 0.12, 115, 42).connect(thumpGain);

    bodyGain.connect(this.master);
    thumpGain.connect(this.master);
  }

  /**
   * Walther PPK slide rack: stage one is a friction slide up in pitch,
   * stage two is the sharper metallic snap of a round chambering.
   */
  public playSlideRack(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master || this.isMuted) return;
    const t = ctx.currentTime;

    // Stage 1 — slide pulled back.
    const slideFilter = ctx.createBiquadFilter();
    slideFilter.type = "bandpass";
    slideFilter.Q.value = 1.4;
    slideFilter.frequency.setValueAtTime(850, t);
    slideFilter.frequency.exponentialRampToValueAtTime(2300, t + 0.07);
    const slideGain = this.envelope(ctx, t, 0.5, t + 0.09);
    this.startNoise(ctx, t, t + 0.1).connect(slideFilter);
    slideFilter.connect(slideGain);
    slideGain.connect(this.master);

    // Stage 2 — round chambers with a bright snap and short metallic ring.
    const t2 = t + 0.14;
    const lockFilter = ctx.createBiquadFilter();
    lockFilter.type = "highpass";
    lockFilter.frequency.value = 1700;
    const lockGain = this.envelope(ctx, t2, 0.65, t2 + 0.05);
    this.startNoise(ctx, t2, t2 + 0.06).connect(lockFilter);
    lockFilter.connect(lockGain);
    lockGain.connect(this.master);

    const pingGain = this.envelope(ctx, t2, 0.18, t2 + 0.13);
    this.tone(ctx, "triangle", t2, t2 + 0.14, 2150, 1680).connect(pingGain);
    pingGain.connect(this.master);
  }

  /** Skyfall biometric palm scan: smooth rising chirp with a soft terminal tick. */
  public playBiometricScan(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master || this.isMuted) return;
    const t = ctx.currentTime;
    const sweepEnd = t + 0.42;

    const sweepGain = ctx.createGain();
    sweepGain.gain.setValueAtTime(EPSILON, t);
    sweepGain.gain.linearRampToValueAtTime(0.22, t + 0.08);
    sweepGain.gain.setValueAtTime(0.22, sweepEnd - 0.06);
    sweepGain.gain.exponentialRampToValueAtTime(EPSILON, sweepEnd);

    const primary = ctx.createOscillator();
    primary.type = "sine";
    primary.frequency.setValueAtTime(330, t);
    primary.frequency.linearRampToValueAtTime(1340, sweepEnd);
    primary.start(t);
    primary.stop(sweepEnd);
    primary.connect(sweepGain);

    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(332, t);
    shimmer.frequency.linearRampToValueAtTime(1354, sweepEnd);
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.07;
    shimmer.start(t);
    shimmer.stop(sweepEnd);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(sweepGain);

    sweepGain.connect(this.master);

    const tickGain = this.envelope(ctx, sweepEnd, 0.12, sweepEnd + 0.05);
    this.tone(ctx, "sine", sweepEnd, sweepEnd + 0.05, 1900).connect(tickGain);
    tickGain.connect(this.master);
  }

  /** Golden Gun assembly lock: bright metallic multi-partial snap. */
  public playGoldenGunLock(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master || this.isMuted) return;
    const t = ctx.currentTime;

    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = "highpass";
    clickFilter.frequency.value = 3000;
    const clickGain = this.envelope(ctx, t, 0.7, t + 0.04);
    this.startNoise(ctx, t, t + 0.05).connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(this.master);

    const partials: Array<[number, number]> = [
      [2350, 0.22],
      [3520, 0.16],
      [4730, 0.11],
    ];
    for (const [freq, peak] of partials) {
      const gain = this.envelope(ctx, t + 0.01, peak, t + 0.19);
      const osc = this.tone(ctx, "triangle", t + 0.01, t + 0.2, freq, freq * 0.93);
      osc.connect(gain);
      gain.connect(this.master);
    }

    const thumpGain = this.envelope(ctx, t, 0.35, t + 0.09);
    this.tone(ctx, "sine", t, t + 0.09, 165, 70).connect(thumpGain);
    thumpGain.connect(this.master);
  }

  /** Beretta 418 dry-fire jam: two high-pitched mechanical ticks. */
  public playJamClick(): void {
    const ctx = this.ensureContext();
    if (!ctx || !this.master || this.isMuted) return;
    const t = ctx.currentTime;

    for (const offset of [0, 0.07]) {
      const tickStart = t + offset;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 2.2;
      filter.frequency.value = 4200;
      const gain = this.envelope(ctx, tickStart, 0.5, tickStart + 0.03);
      this.startNoise(ctx, tickStart, tickStart + 0.04).connect(filter);
      filter.connect(gain);
      gain.connect(this.master);

      const blipGain = this.envelope(ctx, tickStart, 0.15, tickStart + 0.02);
      this.tone(ctx, "square", tickStart, tickStart + 0.02, 2600).connect(blipGain);
      blipGain.connect(this.master);
    }
  }
}

/** Shared singleton — mutate `soundFX.isMuted` to arm/silence all effects. */
export const soundFX = new ProceduralSoundFX();

let unlockBound = false;

/**
 * Bind one-time global gesture listeners (pointer, touch, key) that unlock
 * the AudioContext on the very first interaction — required on iOS Safari
 * and Android Chrome before any synthesized sound will play.
 */
export function primeAudioUnlock(): void {
  if (typeof window === "undefined" || unlockBound) return;
  unlockBound = true;

  const events: Array<keyof WindowEventMap> = ["pointerdown", "touchstart", "touchend", "keydown"];
  const onGesture = () => {
    soundFX.unlock();
    for (const ev of events) {
      window.removeEventListener(ev, onGesture);
    }
  };
  for (const ev of events) {
    window.addEventListener(ev, onGesture, { passive: true });
  }
}

export type { ProceduralSoundFX as SoundFX };
