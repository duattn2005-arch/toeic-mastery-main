export type AmbientSoundId =
  | "whiteNoise"
  | "pinkNoise"
  | "brownNoise"
  | "chillRain"
  | "heavyRain"
  | "thunder"
  | "wind"
  | "ocean"
  | "bonfire"
  | "frog"
  | "chirp";

export interface PlayingAmbientSound {
  stop: () => void;
}

/** How long a sound fades in when toggled on / fades out when toggled off —
 * without this, connecting a fresh noise source straight to an already-open
 * gain produces an audible click/pop at the exact instant of the toggle. */
const FADE_SEC = 1.2;

/* ---------------------------------------------------------------------------
 * Everything is synthesized with the Web Audio API — no audio files to host,
 * license, or have go missing in production. Two things make it sound like
 * the real thing rather than "filtered hiss":
 *  - beds use the right noise colour (pink/brown, not white) in stereo, from
 *    long buffers whose loop point is crossfaded so there is no periodic tick;
 *  - the character of each sound comes from scheduled events (raindrops,
 *    wave swells, gusts, crackles, croaks, bird phrases) with randomized
 *    timing, pitch and stereo position, so nothing repeats audibly.
 * ------------------------------------------------------------------------- */

type NoiseColor = "white" | "pink" | "brown";

const bufferCache = new WeakMap<AudioContext, Map<string, AudioBuffer>>();

/** A stereo noise loop (independent channels for width). The tail is
 * crossfaded into the head and the loop starts after the fade, so the seam
 * is continuous. */
function noiseBuffer(ctx: AudioContext, color: NoiseColor, seconds = 12): AudioBuffer {
  const key = `${color}:${seconds}`;
  let cache = bufferCache.get(ctx);
  if (!cache) bufferCache.set(ctx, (cache = new Map()));
  const hit = cache.get(key);
  if (hit) return hit;

  const sr = ctx.sampleRate;
  const length = Math.floor(sr * seconds);
  const fade = Math.floor(sr * 0.25);
  const buffer = ctx.createBuffer(2, length, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buffer.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < length; i++) {
      const w = Math.random() * 2 - 1;
      if (color === "white") {
        d[i] = w * 0.5;
      } else if (color === "pink") {
        // Paul Kellet's refined pink filter: -3 dB/octave, the "balanced"
        // noise most often used for focus and sleep.
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856;
        b4 = 0.55 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
        b6 = w * 0.115926;
      } else {
        // Brown (red) noise: integrated white, leaky so it can't drift.
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      }
    }
    for (let i = 0; i < fade; i++) {
      const t = i / fade;
      d[length - fade + i] = d[length - fade + i] * (1 - t) + d[i] * t;
    }
  }
  cache.set(key, buffer);
  return buffer;
}

/** A short decaying burst of white noise — the raw material of raindrops
 * and fire crackles (filtered differently for each). */
function burstBuffer(ctx: AudioContext): AudioBuffer {
  const key = "burst";
  let cache = bufferCache.get(ctx);
  if (!cache) bufferCache.set(ctx, (cache = new Map()));
  const hit = cache.get(key);
  if (hit) return hit;
  const len = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  cache.set(key, buffer);
  return buffer;
}

type GraphNode = AudioNode & { stop?: (when?: number) => void };

/** Collects nodes and timers so a builder can tear everything down at once. */
class Graph {
  nodes: GraphNode[] = [];
  timers: number[] = [];
  stopped = false;
  constructor(public ctx: AudioContext, public out: AudioNode) {}

  add<T extends AudioNode>(n: T): T {
    this.nodes.push(n);
    return n;
  }
  gain(value: number) {
    const g = this.add(this.ctx.createGain());
    g.gain.value = value;
    return g;
  }
  filter(type: BiquadFilterType, freq: number, q = 0.7) {
    const f = this.add(this.ctx.createBiquadFilter());
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }
  noise(color: NoiseColor) {
    const src = this.add(this.ctx.createBufferSource());
    src.buffer = noiseBuffer(this.ctx, color);
    src.loop = true;
    src.loopStart = 0.25;
    src.loopEnd = src.buffer.duration;
    // Start at a random point so two beds from the same buffer don't phase.
    src.start(0, 0.25 + Math.random() * (src.buffer.duration - 0.5));
    return src;
  }
  /** Calls `tick` every `ms` — event schedulers look ahead from ctx time. */
  every(ms: number, tick: () => void) {
    if (this.stopped) return;
    this.timers.push(window.setInterval(() => !this.stopped && tick(), ms));
  }
  after(ms: number, fn: () => void) {
    if (this.stopped) return;
    this.timers.push(window.setTimeout(() => !this.stopped && fn(), ms));
  }
  /** Eases an AudioParam towards a new random target every few seconds —
   * the organic drift behind gusts, flicker and surf. */
  wander(param: AudioParam, min: number, max: number, everyMs: [number, number], smooth: number) {
    const step = () => {
      param.setTargetAtTime(min + Math.random() * (max - min), this.ctx.currentTime, smooth);
      this.after(everyMs[0] + Math.random() * (everyMs[1] - everyMs[0]), step);
    };
    step();
  }
  teardown() {
    this.stopped = true;
    this.timers.forEach((t) => {
      window.clearInterval(t);
      window.clearTimeout(t);
    });
    this.nodes.forEach((n) => {
      try {
        n.stop?.();
      } catch {}
      n.disconnect();
    });
  }
}

/** One-shot event voice: source -> filter -> gain envelope -> panner -> out.
 * Nodes are short-lived and garbage-collected after they end. */
function shot(
  g: Graph,
  when: number,
  opts: { buffer?: AudioBuffer; filter?: { type: BiquadFilterType; freq: number; q: number }; peak: number; attack: number; decay: number; pan: number; rate?: number }
) {
  const { ctx, out } = g;
  const src = ctx.createBufferSource();
  src.buffer = opts.buffer ?? burstBuffer(ctx);
  if (opts.rate) src.playbackRate.value = opts.rate;
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, when);
  env.gain.exponentialRampToValueAtTime(opts.peak, when + opts.attack);
  env.gain.exponentialRampToValueAtTime(0.0001, when + opts.attack + opts.decay);
  const pan = ctx.createStereoPanner();
  pan.pan.value = opts.pan;
  let head: AudioNode = src;
  if (opts.filter) {
    const f = ctx.createBiquadFilter();
    f.type = opts.filter.type;
    f.frequency.value = opts.filter.freq;
    f.Q.value = opts.filter.q;
    src.connect(f);
    head = f;
  }
  head.connect(env).connect(pan).connect(out);
  src.start(when);
  src.stop(when + opts.attack + opts.decay + 0.05);
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Schedules Poisson-ish events at `perSecond` using a lookahead window, so
 * timing is sample-accurate regardless of timer jitter. */
function scatter(g: Graph, perSecond: () => number, fire: (when: number) => void) {
  let next = g.ctx.currentTime + 0.1;
  g.every(80, () => {
    const horizon = g.ctx.currentTime + 0.25;
    while (next < horizon) {
      fire(Math.max(next, g.ctx.currentTime + 0.01));
      next += -Math.log(1 - Math.random()) / Math.max(0.01, perSecond());
    }
  });
}

/** Rain: a pink bed (the "sheet" of rain), droplet ticks on top. */
function rain(g: Graph, heavy: boolean) {
  const bed = g.noise("pink");
  const hp = g.filter("highpass", heavy ? 250 : 500);
  const lp = g.filter("lowpass", heavy ? 7500 : 5200);
  const bedGain = g.gain(heavy ? 0.55 : 0.5);
  bed.connect(hp).connect(lp).connect(bedGain).connect(g.out);
  g.wander(lp.frequency, heavy ? 6500 : 4200, heavy ? 8500 : 6000, [3000, 6000], 2);

  if (heavy) {
    // The low "roar" of a downpour on roofs and ground.
    const body = g.noise("brown");
    const bodyLp = g.filter("lowpass", 450);
    const bodyGain = g.gain(0.4);
    body.connect(bodyLp).connect(bodyGain).connect(g.out);
    g.wander(bodyGain.gain, 0.3, 0.5, [2000, 5000], 1.5);
  }

  scatter(
    g,
    () => (heavy ? 55 : 14),
    (when) =>
      shot(g, when, {
        filter: { type: "bandpass", freq: rand(1800, heavy ? 5000 : 7000), q: rand(1.5, 6) },
        peak: rand(0.04, heavy ? 0.1 : 0.2),
        attack: 0.001,
        decay: rand(0.01, 0.04),
        pan: rand(-0.9, 0.9),
        rate: rand(0.7, 1.4),
      })
  );
}

const BUILDERS: Record<AmbientSoundId, (g: Graph) => void> = {
  // --- Focus noises: plain, steady, no events. Levels roughly matched by
  // loudness (white is the brightest, so the quietest).
  whiteNoise: (g) => {
    const lp = g.filter("lowpass", 12000);
    g.noise("white").connect(lp).connect(g.gain(0.3)).connect(g.out);
  },
  pinkNoise: (g) => {
    g.noise("pink").connect(g.gain(0.55)).connect(g.out);
  },
  brownNoise: (g) => {
    const hp = g.filter("highpass", 30);
    g.noise("brown").connect(hp).connect(g.gain(0.6)).connect(g.out);
  },

  chillRain: (g) => rain(g, false),
  heavyRain: (g) => rain(g, true),

  thunder: (g) => {
    rain(g, false);
    const bed = g.noise("brown");
    const bedLp = g.filter("lowpass", 90);
    bed.connect(bedLp).connect(g.gain(0.18)).connect(g.out);

    const storm = () => {
      const { ctx } = g;
      const now = ctx.currentTime + 0.05;
      const close = Math.random() < 0.35;
      const pan = rand(-0.6, 0.6);
      if (close) {
        // The crack of a near strike before its rumble.
        shot(g, now, { buffer: noiseBuffer(ctx, "white"), filter: { type: "lowpass", freq: 2600, q: 0.5 }, peak: 0.45, attack: 0.005, decay: 0.6, pan });
      }
      // Rolling rumble: several overlapping swells of lowpassed brown noise.
      const rolls = 3 + Math.floor(Math.random() * 4);
      let t = now + (close ? 0.15 : 0);
      for (let i = 0; i < rolls; i++) {
        const src = ctx.createBufferSource();
        src.buffer = noiseBuffer(ctx, "brown");
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(close ? 260 : 160, t);
        lp.frequency.exponentialRampToValueAtTime(60, t + 3);
        const env = ctx.createGain();
        const dur = rand(1.2, 2.8);
        env.gain.setValueAtTime(0.0001, t);
        env.gain.exponentialRampToValueAtTime(rand(0.5, close ? 1.1 : 0.7), t + rand(0.15, 0.5));
        env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        const p = ctx.createStereoPanner();
        p.pan.value = Math.max(-1, Math.min(1, pan + rand(-0.3, 0.3)));
        src.connect(lp).connect(env).connect(p).connect(g.out);
        src.start(t, rand(0, 8));
        src.stop(t + dur + 0.1);
        t += rand(0.4, 1.2);
      }
      g.after(rand(14000, 32000), storm);
    };
    g.after(rand(2500, 6000), storm);
  },

  wind: (g) => {
    const src = g.noise("pink");
    const bp = g.filter("bandpass", 500, 0.8);
    const gust = g.gain(0.5);
    const pan = g.add(g.ctx.createStereoPanner());
    src.connect(bp).connect(gust).connect(pan).connect(g.out);
    g.wander(bp.frequency, 280, 900, [2500, 5000], 1.8);
    g.wander(gust.gain, 0.3, 1, [2000, 4500], 1.4);
    g.wander(pan.pan, -0.5, 0.5, [4000, 8000], 3);

    // A thin whistle that rises with the stronger gusts.
    const hi = g.noise("white");
    const hiBp = g.filter("bandpass", 1800, 8);
    const hiGain = g.gain(0.02);
    hi.connect(hiBp).connect(hiGain).connect(g.out);
    g.wander(hiBp.frequency, 1300, 2600, [3000, 6000], 2);
    g.wander(hiGain.gain, 0.0, 0.05, [3000, 7000], 2);
  },

  ocean: (g) => {
    // Two shores, left and right, each with its own wave rhythm.
    for (const side of [-0.6, 0.6]) {
      const surf = g.noise("brown");
      const lp = g.filter("lowpass", 350);
      const env = g.gain(0.08);
      const pan = g.add(g.ctx.createStereoPanner());
      pan.pan.value = side;
      surf.connect(lp).connect(env).connect(pan).connect(g.out);

      const foam = g.noise("pink");
      const foamHp = g.filter("highpass", 1800);
      const foamEnv = g.gain(0);
      foam.connect(foamHp).connect(foamEnv).connect(pan);

      // Each wave is anchored with setValueAtTime and shaped with linear
      // ramps (rise, crash, recede) rather than chained setTargetAtTime, so
      // its level can never run away whatever was scheduled before.
      const wave = () => {
        const t = g.ctx.currentTime + 0.05;
        const rise = rand(2.5, 4), crash = rand(0.4, 0.9), recede = rand(3.5, 5.5), peak = rand(0.45, 0.7);
        const end = t + rise + crash + recede;
        for (const param of [env.gain, lp.frequency, foamEnv.gain]) param.cancelScheduledValues(t);
        env.gain.setValueAtTime(0.1, t);
        env.gain.linearRampToValueAtTime(peak, t + rise);
        env.gain.linearRampToValueAtTime(peak * 0.85, t + rise + crash);
        env.gain.linearRampToValueAtTime(0.1, end);
        lp.frequency.setValueAtTime(380, t);
        lp.frequency.linearRampToValueAtTime(1600, t + rise);
        lp.frequency.linearRampToValueAtTime(1100, t + rise + crash);
        lp.frequency.linearRampToValueAtTime(380, end);
        // Foam fizzes as the wave breaks and washes back.
        foamEnv.gain.setValueAtTime(0, t);
        foamEnv.gain.setValueAtTime(0, t + rise * 0.8);
        foamEnv.gain.linearRampToValueAtTime(peak * 0.16, t + rise + 0.2);
        foamEnv.gain.linearRampToValueAtTime(0, end);
        g.after((end - t) * 1000 * rand(1, 1.15), wave);
      };
      g.after(side < 0 ? 200 : rand(3000, 5000), wave);
    }
  },

  bonfire: (g) => {
    // The roar of the flames, flickering.
    const roar = g.noise("brown");
    const roarLp = g.filter("lowpass", 380);
    const roarGain = g.gain(0.3);
    roar.connect(roarLp).connect(roarGain).connect(g.out);
    g.wander(roarGain.gain, 0.18, 0.4, [300, 900], 0.25);
    const hiss = g.noise("pink");
    hiss.connect(g.filter("highpass", 3500)).connect(g.gain(0.035)).connect(g.out);

    // Crackles in bursts, and the odd louder pop of a knot in the wood.
    let intensity = 6;
    g.every(1500, () => (intensity = rand(2, 14)));
    scatter(
      g,
      () => intensity,
      (when) => {
        const pop = Math.random() < 0.08;
        shot(g, when, {
          filter: { type: "bandpass", freq: pop ? rand(600, 1200) : rand(1800, 5500), q: rand(0.8, 3) },
          peak: pop ? rand(0.35, 0.6) : rand(0.04, 0.22),
          attack: 0.001,
          decay: pop ? rand(0.05, 0.1) : rand(0.004, 0.02),
          pan: rand(-0.5, 0.5),
          rate: rand(0.8, 2),
        });
      }
    );
  },

  frog: (g) => {
    const { ctx } = g;
    // Night air.
    g.noise("brown").connect(g.filter("lowpass", 300)).connect(g.gain(0.12)).connect(g.out);

    // Crickets: high sine pulses in trills, a few insects at fixed spots.
    for (let k = 0; k < 3; k++) {
      const freq = rand(4200, 5200);
      const pan = rand(-0.8, 0.8);
      const trill = () => {
        const t = ctx.currentTime + 0.05;
        const pulses = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < pulses; i++) {
          const o = ctx.createOscillator();
          o.frequency.value = freq;
          const e = ctx.createGain();
          const s = t + i * 0.045;
          e.gain.setValueAtTime(0.0001, s);
          e.gain.exponentialRampToValueAtTime(0.03, s + 0.008);
          e.gain.exponentialRampToValueAtTime(0.0001, s + 0.03);
          const p = ctx.createStereoPanner();
          p.pan.value = pan;
          o.connect(e).connect(p).connect(g.out);
          o.start(s);
          o.stop(s + 0.04);
        }
        g.after(rand(350, 900), trill);
      };
      g.after(rand(0, 800), trill);
    }

    // Frogs: a glottal buzz (sawtooth) through two vocal formants, chopped
    // into pulses — "rib-bit" in two parts, each frog with its own pitch.
    const croak = (t: number, pitch: number, pan: number, len: number) => {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(pitch, t);
      o.frequency.linearRampToValueAtTime(pitch * 1.15, t + len);
      const f1 = ctx.createBiquadFilter();
      f1.type = "bandpass";
      f1.frequency.value = pitch * 4;
      f1.Q.value = 6;
      const f2 = ctx.createBiquadFilter();
      f2.type = "bandpass";
      f2.frequency.value = pitch * 10;
      f2.Q.value = 8;
      const chop = ctx.createGain();
      chop.gain.value = 0.5;
      const lfo = ctx.createOscillator();
      lfo.type = "square";
      lfo.frequency.value = rand(28, 40);
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 0.5;
      lfo.connect(lfoDepth).connect(chop.gain);
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.0001, t);
      env.gain.exponentialRampToValueAtTime(1.4, t + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, t + len);
      const p = ctx.createStereoPanner();
      p.pan.value = pan;
      o.connect(f1).connect(chop);
      o.connect(f2).connect(chop);
      chop.connect(env).connect(p).connect(g.out);
      [o, lfo].forEach((n) => {
        n.start(t);
        n.stop(t + len + 0.05);
      });
    };
    for (let k = 0; k < 3; k++) {
      const pitch = rand(90, 160);
      const pan = rand(-0.7, 0.7);
      const call = () => {
        const t = ctx.currentTime + 0.05;
        const ribbits = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < ribbits; i++) {
          const s = t + i * rand(0.45, 0.7);
          croak(s, pitch, pan, rand(0.08, 0.12));
          croak(s + rand(0.13, 0.17), pitch * 1.08, pan, rand(0.12, 0.18));
        }
        g.after(rand(2500, 7000), call);
      };
      g.after(rand(500, 3000), call);
    }
  },

  chirp: (g) => {
    const { ctx } = g;
    // Leaves rustling in a light breeze.
    const leaves = g.noise("pink");
    const lbp = g.filter("bandpass", 2400, 0.6);
    const lg = g.gain(0.08);
    leaves.connect(lbp).connect(lg).connect(g.out);
    g.wander(lg.gain, 0.04, 0.12, [2000, 4000], 1.5);

    // A note: a sine with a pitch contour and fast vibrato (FM), which is
    // what makes it read as a bird rather than a beep.
    const note = (t: number, f0: number, f1: number, len: number, pan: number, vib: number) => {
      const o = ctx.createOscillator();
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(f1, t + len);
      const v = ctx.createOscillator();
      v.frequency.value = rand(25, 60);
      const vd = ctx.createGain();
      vd.gain.value = vib;
      v.connect(vd).connect(o.frequency);
      const e = ctx.createGain();
      e.gain.setValueAtTime(0.0001, t);
      e.gain.exponentialRampToValueAtTime(0.28, t + len * 0.2);
      e.gain.exponentialRampToValueAtTime(0.0001, t + len);
      const p = ctx.createStereoPanner();
      p.pan.value = pan;
      o.connect(e).connect(p).connect(g.out);
      [o, v].forEach((n) => {
        n.start(t);
        n.stop(t + len + 0.02);
      });
    };
    // A few birds, each singing its own kind of phrase from its own spot.
    const songs = [
      // Warbler: quick descending run.
      (t: number, base: number, pan: number) => {
        for (let i = 0; i < 6; i++) note(t + i * 0.09, base * (1.3 - i * 0.05), base * (1.1 - i * 0.05), 0.07, pan, 120);
      },
      // Whistler: two long slurred notes, up then down.
      (t: number, base: number, pan: number) => {
        note(t, base * 0.8, base * 1.25, 0.35, pan, 30);
        note(t + 0.45, base * 1.2, base * 0.75, 0.4, pan, 30);
      },
      // Trill: rapid repeated chips.
      (t: number, base: number, pan: number) => {
        for (let i = 0; i < 10; i++) note(t + i * 0.05, base * 1.05, base * 0.95, 0.035, pan, 0);
      },
    ];
    for (let k = 0; k < 3; k++) {
      const song = songs[k];
      const base = rand(2400, 4200);
      const pan = rand(-0.8, 0.8);
      const sing = () => {
        song(ctx.currentTime + 0.05, base * rand(0.95, 1.05), pan);
        g.after(rand(2500, 8000), sing);
      };
      g.after(rand(300, 3000), sing);
    }
  },
};

/** Wraps a builder's graph in its own gain envelope so every sound fades in
 * on start and fades out on stop, instead of popping in/out. */
export function buildAmbientSound(id: AmbientSoundId, ctx: AudioContext, out: AudioNode): PlayingAmbientSound {
  const envelope = ctx.createGain();
  envelope.connect(out);
  const now = ctx.currentTime;
  envelope.gain.setValueAtTime(0, now);
  envelope.gain.linearRampToValueAtTime(1, now + FADE_SEC);

  const graph = new Graph(ctx, envelope);
  BUILDERS[id](graph);

  return {
    stop: () => {
      const stopAt = ctx.currentTime;
      envelope.gain.cancelScheduledValues(stopAt);
      envelope.gain.setValueAtTime(envelope.gain.value, stopAt);
      envelope.gain.linearRampToValueAtTime(0, stopAt + FADE_SEC);
      window.setTimeout(() => {
        graph.teardown();
        envelope.disconnect();
      }, FADE_SEC * 1000 + 100);
    },
  };
}
