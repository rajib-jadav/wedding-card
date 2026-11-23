/**
 * Authentic Bengali Biye Bari Sanai (Shehnai) Acoustic Synthesizer.
 *
 * Models the real acoustics of a Bengali wedding Sanai ensemble:
 * 1. Quadruple/double-reed bright harmonic excitation with subtle breath chiff
 * 2. Conical-bore & metal-bell dual nasal resonant formant filters (1180 Hz & 2480 Hz)
 * 3. Continuous circular-breathed Sur-Sanai (drone shehnai) on Sa & Pa
 * 4. Traditional Bengali wedding Raag Khamaj / Desh festive dhun with vocal meend glides,
 *    murki grace notes, and expressive gamak vibrato
 * 5. Soft festive Kaharwa Tabla / Dholak groove & subtle Kanshi / Manjira shimmer
 */

function writeString(view: DataView, offset: number, text: string) {
  for (let i = 0; i < text.length; i++) {
    view.setUint8(offset + i, text.charCodeAt(i));
  }
}

// Auspicious ceremonial Sanai tonic Sa = C#4 / D4 (~311.13 Hz, Eb4 / D#4 bright festive Indian shehnai key)
function swaraToFreq(semitonesFromSa: number): number {
  return 311.13 * Math.pow(2, semitonesFromSa / 12);
}

interface BiquadCoeffs {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
}

function makePeakingEQ(sampleRate: number, freq: number, q: number, gainDb: number): BiquadCoeffs {
  const A = Math.pow(10, gainDb / 40);
  const w0 = (2 * Math.PI * freq) / sampleRate;
  const alpha = Math.sin(w0) / (2 * q);
  const cosW0 = Math.cos(w0);

  const b0 = 1 + alpha * A;
  const b1 = -2 * cosW0;
  const b2 = 1 - alpha * A;
  const a0 = 1 + alpha / A;
  const a1 = -2 * cosW0;
  const a2 = 1 - alpha / A;

  return {
    b0: b0 / a0,
    b1: b1 / a0,
    b2: b2 / a0,
    a1: a1 / a0,
    a2: a2 / a0,
  };
}

function makeLowPass(sampleRate: number, freq: number, q: number): BiquadCoeffs {
  const w0 = (2 * Math.PI * freq) / sampleRate;
  const alpha = Math.sin(w0) / (2 * q);
  const cosW0 = Math.cos(w0);

  const b0 = (1 - cosW0) / 2;
  const b1 = 1 - cosW0;
  const b2 = (1 - cosW0) / 2;
  const a0 = 1 + alpha;
  const a1 = -2 * cosW0;
  const a2 = 1 - alpha;

  return {
    b0: b0 / a0,
    b1: b1 / a0,
    b2: b2 / a0,
    a1: a1 / a0,
    a2: a2 / a0,
  };
}

function makeHighPass(sampleRate: number, freq: number, q: number): BiquadCoeffs {
  const w0 = (2 * Math.PI * freq) / sampleRate;
  const alpha = Math.sin(w0) / (2 * q);
  const cosW0 = Math.cos(w0);

  const b0 = (1 + cosW0) / 2;
  const b1 = -(1 + cosW0);
  const b2 = (1 + cosW0) / 2;
  const a0 = 1 + alpha;
  const a1 = -2 * cosW0;
  const a2 = 1 - alpha;

  return {
    b0: b0 / a0,
    b1: b1 / a0,
    b2: b2 / a0,
    a1: a1 / a0,
    a2: a2 / a0,
  };
}

function applyBiquadInPlace(buf: Float32Array, c: BiquadCoeffs) {
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  for (let i = 0; i < buf.length; i++) {
    const x0 = buf[i];
    const y0 = c.b0 * x0 + c.b1 * x1 + c.b2 * x2 - c.a1 * y1 - c.a2 * y2;
    x2 = x1;
    x1 = x0;
    y2 = y1;
    y1 = y0;
    buf[i] = y0;
  }
}

/**
 * Generates a bright, rich double-reed pulse/saw waveform with smooth upper rolloff.
 */
function doubleReedWave(phase: number, brightness: number): number {
  let sum = 0;
  // Strong harmonics 1..11 give the nasal reedy edge of cane double reeds
  const weights = [0.36, 0.44, 0.38, 0.30, 0.24, 0.19, 0.15, 0.11, 0.08, 0.055, 0.035];
  for (let h = 1; h <= weights.length; h++) {
    const scale = h > 4 ? brightness : 1;
    sum += Math.sin(phase * h) * weights[h - 1] * scale;
  }
  return sum;
}

interface SanaiPhraseNote {
  start: number; // seconds
  duration: number;
  semi: number; // Raag Khamaj / Desh wedding dhun: Sa=0, Re=2, Ga=4, Ma=5, Pa=7, Dha=9, ni=10, Ni=11, Sa'=12, Re'=14, Ga'=16
  slideFrom?: number;
  graceSemi?: number; // quick Bengali kan-swar / murki ornament right at onset
  amp: number;
  vibratoHz?: number;
}

export function createBengaliShehnaiUrl(): string {
  const sampleRate = 28000;
  const totalSeconds = 24.0;
  const totalSamples = Math.floor(sampleRate * totalSeconds);

  const sanaiRaw = new Float32Array(totalSamples);
  const droneRaw = new Float32Array(totalSamples);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  // 1. CONTINUOUS CIRCULAR-BREATHED SUR-SANAI (DRONE SHEHNAI) ON Sa & Pa
  let drPhaseSa = 0;
  let drPhasePa = 0;
  let drPhaseLowSa = 0;
  const fSa = swaraToFreq(0);
  const fPa = swaraToFreq(-5); // Mandra Pa
  const fLowSa = swaraToFreq(-12);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    // Gentle circular-breathing swell every 4 seconds
    const breath = 0.84 + 0.16 * Math.sin((2 * Math.PI * t) / 4.0);
    const microPitch = 1 + 0.0018 * Math.sin(2 * Math.PI * 1.3 * t);

    drPhaseSa += (2 * Math.PI * fSa * microPitch) / sampleRate;
    drPhasePa += (2 * Math.PI * fPa) / sampleRate;
    drPhaseLowSa += (2 * Math.PI * fLowSa) / sampleRate;

    const reedSa =
      Math.sin(drPhaseSa) * 0.4 +
      Math.sin(drPhaseSa * 2) * 0.34 +
      Math.sin(drPhaseSa * 3) * 0.22 +
      Math.sin(drPhaseSa * 4) * 0.12;
    const reedPa =
      Math.sin(drPhasePa) * 0.45 +
      Math.sin(drPhasePa * 2) * 0.3 +
      Math.sin(drPhasePa * 3) * 0.16;
    const tanpuraLow =
      Math.sin(drPhaseLowSa) * 0.55 +
      Math.sin(drPhaseLowSa * 2) * 0.28 +
      Math.sin(drPhaseLowSa * 3) * 0.14;

    droneRaw[i] = (reedSa * 0.026 + reedPa * 0.024 + tanpuraLow * 0.04) * breath;
  }

  // Shape drone with softer nasal resonance so it blends behind the lead Sanai
  applyBiquadInPlace(droneRaw, makePeakingEQ(sampleRate, 1120, 2.2, 5.5));
  applyBiquadInPlace(droneRaw, makeLowPass(sampleRate, 2600, 0.7));

  // 2. LEAD BENGALI BIYE BARI SANAI MELODY (Festive Raag Khamaj / Desh Wedding Dhun)
  // Characteristic Biye Bari Sanai motifs: Sa-Ga-Ma-Pa -> Dha-ni-Dha-Pa -> Pa-Dha-Ni-Sa'-Re'-Sa' -> graceful weeping/joyful resolution
  const melody: SanaiPhraseNote[] = [
    // Opening Auspicious Alap-Dhun Call (Sa - Ga - Ma - Pa — Dha - Pa)
    { start: 0.15, duration: 0.95, semi: 0, slideFrom: -2, amp: 0.19, vibratoHz: 5.4 },
    { start: 1.05, duration: 0.55, semi: 4, slideFrom: 2, amp: 0.21, vibratoHz: 5.8 },
    { start: 1.58, duration: 0.48, semi: 5, slideFrom: 4, amp: 0.21, vibratoHz: 5.8 },
    { start: 2.02, duration: 1.25, semi: 7, slideFrom: 5, graceSemi: 9, amp: 0.24, vibratoHz: 6.0 },
    { start: 3.22, duration: 0.65, semi: 9, slideFrom: 7, amp: 0.22, vibratoHz: 5.8 },
    { start: 3.85, duration: 1.05, semi: 7, slideFrom: 9, graceSemi: 10, amp: 0.22, vibratoHz: 5.6 },

    // Joyful Bengali Wedding Cadence (Ga - Ma - Pa - Dha - Ni - Sa' - Re' - Sa')
    { start: 5.15, duration: 0.45, semi: 4, slideFrom: 2, amp: 0.20 },
    { start: 5.58, duration: 0.45, semi: 5, slideFrom: 4, amp: 0.21 },
    { start: 6.0, duration: 0.55, semi: 7, slideFrom: 5, amp: 0.22 },
    { start: 6.52, duration: 0.65, semi: 9, slideFrom: 7, amp: 0.23 },
    { start: 7.14, duration: 0.52, semi: 11, slideFrom: 9, amp: 0.24 },
    { start: 7.64, duration: 1.45, semi: 12, slideFrom: 11, graceSemi: 14, amp: 0.26, vibratoHz: 6.2 },
    { start: 9.05, duration: 0.72, semi: 14, slideFrom: 12, amp: 0.24, vibratoHz: 6.0 },
    { start: 9.75, duration: 1.25, semi: 12, slideFrom: 14, graceSemi: 11, amp: 0.23, vibratoHz: 5.8 },

    // Classic Biye Bari Sanai Sighing / Festive Descent (ni - Dha - Pa - Dha - Ma - Ga - Re)
    { start: 11.25, duration: 0.55, semi: 10, slideFrom: 12, amp: 0.22 },
    { start: 11.78, duration: 0.62, semi: 9, slideFrom: 10, amp: 0.22 },
    { start: 12.38, duration: 0.88, semi: 7, slideFrom: 9, graceSemi: 9, amp: 0.23, vibratoHz: 5.9 },
    { start: 13.22, duration: 0.52, semi: 9, slideFrom: 7, amp: 0.21 },
    { start: 13.72, duration: 0.62, semi: 5, slideFrom: 7, amp: 0.21 },
    { start: 14.32, duration: 0.95, semi: 4, slideFrom: 5, graceSemi: 5, amp: 0.21, vibratoHz: 5.6 },
    { start: 15.25, duration: 0.65, semi: 2, slideFrom: 4, amp: 0.19 },

    // Celebratory High Flourish (Pa - Dha - Sa' - Re' - Ga' - Re' - Sa' - ni - Dha - Pa)
    { start: 16.2, duration: 0.45, semi: 7, slideFrom: 4, amp: 0.21 },
    { start: 16.62, duration: 0.48, semi: 9, slideFrom: 7, amp: 0.22 },
    { start: 17.08, duration: 0.55, semi: 12, slideFrom: 9, amp: 0.24 },
    { start: 17.6, duration: 0.52, semi: 14, slideFrom: 12, amp: 0.24 },
    { start: 18.1, duration: 0.9, semi: 16, slideFrom: 14, amp: 0.25, vibratoHz: 6.3 },
    { start: 18.96, duration: 0.5, semi: 14, slideFrom: 16, amp: 0.23 },
    { start: 19.44, duration: 0.7, semi: 12, slideFrom: 14, amp: 0.22 },
    { start: 20.12, duration: 0.52, semi: 9, slideFrom: 10, amp: 0.21 },
    { start: 20.62, duration: 0.72, semi: 7, slideFrom: 9, amp: 0.21 },

    // Tender Ceremonial Resolution Home to Sa (Ma - Ga - Re - Sa)
    { start: 21.32, duration: 0.45, semi: 5, slideFrom: 7, amp: 0.19 },
    { start: 21.75, duration: 0.52, semi: 4, slideFrom: 5, amp: 0.19 },
    { start: 22.25, duration: 0.48, semi: 2, slideFrom: 4, amp: 0.18 },
    { start: 22.7, duration: 1.25, semi: 0, slideFrom: 2, amp: 0.20, vibratoHz: 5.2 },
  ];

  // Deterministic pseudo-random for subtle cane reed air chiff
  let noiseSeed = 1234567;
  const nextNoise = () => {
    noiseSeed = (noiseSeed * 16807) % 2147483647;
    return (noiseSeed / 1073741823.5) - 1;
  };

  for (const note of melody) {
    const startIdx = Math.floor(note.start * sampleRate);
    const len = Math.floor(note.duration * sampleRate);
    const targetFreq = swaraToFreq(note.semi);
    const startFreq =
      note.slideFrom !== undefined ? swaraToFreq(note.slideFrom) : targetFreq;
    const graceFreq =
      note.graceSemi !== undefined ? swaraToFreq(note.graceSemi) : targetFreq;
    const vibHz = note.vibratoHz ?? 5.7;

    let phase = 0;

    for (let i = 0; i < len; i++) {
      const idx = (startIdx + i) % totalSamples;
      const t = i / sampleRate;
      const progress = i / len;

      // Expressive Bengali vocal meend slide + optional fast murki/kan-swar ornament
      let baseFreq = targetFreq;
      if (t < 0.14) {
        const m = t / 0.14;
        const smooth = m * m * (3 - 2 * m);
        baseFreq = startFreq + (targetFreq - startFreq) * smooth;
      } else if (note.graceSemi !== undefined && t >= 0.24 && t < 0.34) {
        const gm = Math.sin(((t - 0.24) / 0.1) * Math.PI);
        baseFreq = targetFreq + (graceFreq - targetFreq) * gm * 0.72;
      }

      // Expressive Indian gamak/andolan vibrato building organically on sustained swaras
      const vibRamp = Math.min(1, Math.max(0, (t - 0.16) / 0.24));
      const vibDepth = 0.0115 * vibRamp;
      const freq = baseFreq * (1 + vibDepth * Math.sin(2 * Math.PI * vibHz * t));

      phase += (2 * Math.PI * freq) / sampleRate;

      // Smooth reed attack, warm lyrical swell, legato tail
      const attack = Math.min(1, t / 0.055);
      const release = Math.min(1, (note.duration - t) / 0.11);
      const env = Math.max(0, attack * release) * (0.88 + 0.12 * Math.sin(Math.PI * progress));

      // Brightness increases slightly with breath pressure
      const brightness = 0.78 + 0.28 * env;
      const reed = doubleReedWave(phase, brightness);
      // Tiny cane breath chiff only at very start of attack
      const chiff = t < 0.04 ? nextNoise() * 0.045 * (1 - t / 0.04) : 0;

      sanaiRaw[idx] += (reed + chiff) * env * note.amp;
    }
  }

  // Apply TRUE CONICAL-BORE & FLARED-BELL SANAI ACOUSTIC FORMANT FILTER CHAIN!
  // 1. High-pass @ 260 Hz clears muddy sub-fundamentals like a real narrow wooden bore
  applyBiquadInPlace(sanaiRaw, makeHighPass(sampleRate, 260, 0.75));
  // 2. Primary nasal body formant peak @ 1180 Hz (+9.5 dB) — iconic singing Sanai voice
  applyBiquadInPlace(sanaiRaw, makePeakingEQ(sampleRate, 1180, 3.0, 9.5));
  // 3. Secondary bright metallic bell resonance @ 2480 Hz (+7.5 dB) — unmistakable Biye Bari cut
  applyBiquadInPlace(sanaiRaw, makePeakingEQ(sampleRate, 2480, 3.6, 7.5));
  // 4. Gentle warmth low-pass @ 4300 Hz so phone speakers stay sweet and never harsh
  applyBiquadInPlace(sanaiRaw, makeLowPass(sampleRate, 4300, 0.8));

  // Mix Lead Sanai + Sur-Sanai Drone into stereo field
  for (let i = 0; i < totalSamples; i++) {
    const s = Math.tanh(sanaiRaw[i] * 0.92) * 0.62;
    const d = droneRaw[i] * 0.95;
    left[i] += s * 0.76 + d * 0.85;
    right[i] += s * 0.70 + d * 0.95;
  }

  // 3. FESTIVE BENGALI BIYE BARI DHOLAK / TABLA KAHARWA GROOVE + MANJIRA SHIMMER
  const stepSec = 0.375; // Festive 8-step Kaharwa groove (100 BPM)
  const totalSteps = Math.floor(totalSeconds / stepSec);

  for (let step = 0; step < totalSteps; step++) {
    const beatInBar = step % 8;
    const stepStart = Math.floor(step * stepSec * sampleRate);

    // Warm resonant Dholak / Baya bass on beats 0, 3, 4
    if (beatInBar === 0 || beatInBar === 3 || beatInBar === 4) {
      const bayaLen = Math.floor(0.22 * sampleRate);
      const bayaAmp = beatInBar === 0 ? 0.085 : 0.055;
      let ph = 0;
      for (let i = 0; i < bayaLen; i++) {
        const idx = (stepStart + i) % totalSamples;
        const t = i / sampleRate;
        const pitch = 118 - 36 * Math.exp(-t * 17);
        ph += (2 * Math.PI * pitch) / sampleRate;
        const env = Math.min(1, t / 0.006) * Math.exp(-t * 12);
        const val = Math.sin(ph) * env * bayaAmp;
        left[idx] += val * 0.82;
        right[idx] += val * 0.82;
      }
    }

    // Crisp Tabla Daya / Naqqara stroke on beats 0, 2, 4, 6
    if (beatInBar === 0 || beatInBar === 2 || beatInBar === 4 || beatInBar === 6) {
      const dayaLen = Math.floor(0.13 * sampleRate);
      const dayaFreq = beatInBar === 2 || beatInBar === 6 ? swaraToFreq(0) : swaraToFreq(7);
      const dayaAmp = beatInBar === 0 ? 0.042 : 0.03;
      for (let i = 0; i < dayaLen; i++) {
        const idx = (stepStart + i) % totalSamples;
        const t = i / sampleRate;
        const env = Math.min(1, t / 0.003) * Math.exp(-t * 23);
        const w = 2 * Math.PI * dayaFreq * t;
        const val = (Math.sin(w) * 0.68 + Math.sin(w * 2.01) * 0.32) * env * dayaAmp;
        left[idx] += val * 0.62;
        right[idx] += val * 0.88;
      }
    }

    // Auspicious brass Kanshi / Manjira shimmer on beats 0 and 4
    if (beatInBar === 0 || beatInBar === 4) {
      const chimeLen = Math.floor(0.55 * sampleRate);
      const chimeFreq = swaraToFreq(24);
      const chimeAmp = beatInBar === 0 ? 0.017 : 0.011;
      for (let i = 0; i < chimeLen; i++) {
        const idx = (stepStart + i) % totalSamples;
        const t = i / sampleRate;
        const env = Math.min(1, t / 0.004) * Math.exp(-t * 7.5);
        const w = 2 * Math.PI * chimeFreq * t;
        const val = (Math.sin(w) * 0.6 + Math.sin(w * 2.76) * 0.3) * env * chimeAmp;
        left[idx] += val * 0.45;
        right[idx] += val * 0.92;
      }
    }
  }

  // 4. COURTYARD BIYE BARI STEREO AMBIENCE / REVERB
  const delayL1 = Math.floor(0.21 * sampleRate);
  const delayR1 = Math.floor(0.29 * sampleRate);
  const delayL2 = Math.floor(0.46 * sampleRate);
  const delayR2 = Math.floor(0.57 * sampleRate);

  const outL = new Float32Array(totalSamples);
  const outR = new Float32Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    const revL =
      left[i] +
      right[(i - delayL1 + totalSamples) % totalSamples] * 0.28 +
      left[(i - delayL2 + totalSamples) % totalSamples] * 0.15;
    const revR =
      right[i] +
      left[(i - delayR1 + totalSamples) % totalSamples] * 0.28 +
      right[(i - delayR2 + totalSamples) % totalSamples] * 0.15;

    outL[i] = Math.tanh(revL * 1.12) * 0.84;
    outR[i] = Math.tanh(revR * 1.12) * 0.84;
  }

  // 5. ENCODE 16-BIT STEREO PCM WAV
  const numChannels = 2;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = totalSamples * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < totalSamples; i++) {
    const lSample = Math.max(-1, Math.min(1, outL[i]));
    const rSample = Math.max(-1, Math.min(1, outR[i]));
    view.setInt16(offset, Math.round(lSample * 32767), true);
    view.setInt16(offset + 2, Math.round(rSample * 32767), true);
    offset += 4;
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}
