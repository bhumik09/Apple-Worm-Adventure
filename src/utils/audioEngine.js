// Web Audio API Synthesizer Engine for Apple Worm Adventure
// Provides zero-latency sound effects and procedural background music

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = true;
    this.sfxVolume = 0.5;
    this.musicVolume = 0.25;
    this.musicInterval = null;
    this.musicStep = 0;
    this.isInitialized = false;

    // Load preferences
    try {
      const savedSfx = localStorage.getItem("appleWorm_sfx");
      if (savedSfx !== null) this.sfxEnabled = savedSfx === "true";
      const savedMusic = localStorage.getItem("appleWorm_music");
      if (savedMusic !== null) this.musicEnabled = savedMusic === "true";
    } catch {
      // Ignore localStorage errors
    }
  }

  init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.isInitialized = true;
      if (this.musicEnabled) {
        this.startBGM();
      }
    } catch {
      // Audio not supported
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setSfxEnabled(enabled) {
    this.sfxEnabled = enabled;
    try {
      localStorage.setItem("appleWorm_sfx", String(enabled));
    } catch { /* ignore */ }
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    try {
      localStorage.setItem("appleWorm_music", String(enabled));
    } catch { /* ignore */ }
    if (enabled) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
  }

  vibrate(pattern = 15) {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Safe vibration fallback
      }
    }
  }

  // --- Sound Effects ---

  playTone(freq, duration = 0.1, type = "sine", gainVal = 0.2, pitchDecay = 0) {
    if (!this.sfxEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (pitchDecay !== 0) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(20, freq + pitchDecay),
          now + duration
        );
      }

      const effectiveGain = gainVal * this.sfxVolume;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(effectiveGain, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch {
      // Audio context error
    }
  }

  playMove() {
    this.vibrate(10);
    // Soft slither pop
    this.playTone(320, 0.05, "triangle", 0.08, 40);
  }

  playEat(isGolden = false) {
    this.vibrate(isGolden ? [25, 40, 30] : [20, 30, 20]);
    if (isGolden) {
      // Sparkly golden apple harp
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 0.22, "triangle", 0.2, 0);
        }, i * 45);
      });
    } else {
      // Crisp juicy munch + happy ding
      this.playTone(380, 0.08, "triangle", 0.25, -120);
      setTimeout(() => {
        this.playTone(880, 0.14, "sine", 0.22, 0);
      }, 50);
    }
  }

  playKey() {
    this.vibrate([25, 30, 25]);
    // Shimmering brass key pickup
    const chimes = [880, 1174.66, 1760];
    chimes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.18, "sine", 0.2, 0);
      }, idx * 60);
    });
  }

  playGateOpen() {
    this.vibrate([30, 40, 50]);
    // Dissolving energy barrier whoosh
    this.playTone(400, 0.25, "sawtooth", 0.15, -280);
    setTimeout(() => {
      this.playTone(600, 0.2, "sine", 0.12, 100);
    }, 100);
  }

  playTeleport() {
    this.vibrate([25, 35, 60]);
    // Cosmic hyperspace warp sound
    this.playTone(300, 0.25, "sine", 0.2, 600);
    setTimeout(() => {
      this.playTone(900, 0.2, "triangle", 0.15, -450);
    }, 120);
  }

  playPortalUnlock() {
    this.vibrate([40, 50, 60]);
    // Big energy portal awakening
    const chord = [392, 493.88, 587.33, 783.99];
    chord.forEach((f) => {
      this.playTone(f, 0.45, "sine", 0.18);
    });
  }

  playWin() {
    this.vibrate([35, 50, 35, 60, 90]);
    // Glorious celebratory fanfare
    const melody = [
      { f: 523.25, d: 0.12, delay: 0 },
      { f: 659.25, d: 0.12, delay: 110 },
      { f: 783.99, d: 0.12, delay: 220 },
      { f: 1046.5, d: 0.35, delay: 330 },
      { f: 880.0, d: 0.15, delay: 520 },
      { f: 1046.5, d: 0.5, delay: 680 },
    ];
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, note.d, "triangle", 0.25);
      }, note.delay);
    });
  }

  playFail(_reason = "wall") {
    this.vibrate([50, 40, 50]);
    // Comic cartoony bump / whomp
    this.playTone(280, 0.12, "sawtooth", 0.2, -140);
    setTimeout(() => {
      this.playTone(180, 0.2, "triangle", 0.25, -90);
    }, 110);
  }

  playStar(starNum = 1) {
    this.vibrate(20);
    // High ding when star awards (pitch increases for 1st, 2nd, 3rd star)
    const pitches = [880, 1174.66, 1567.98];
    const freq = pitches[Math.min(starNum - 1, 2)];
    this.playTone(freq, 0.25, "triangle", 0.28);
  }

  playCoinReward() {
    this.vibrate([15, 30, 20]);
    this.playTone(987.77, 0.1, "sine", 0.22);
    setTimeout(() => {
      this.playTone(1318.51, 0.25, "triangle", 0.25);
    }, 90);
  }

  playClick() {
    this.vibrate(8);
    this.playTone(600, 0.04, "sine", 0.1, 0);
  }

  playUndo() {
    this.vibrate(12);
    this.playTone(550, 0.08, "sine", 0.15, -200);
  }

  // --- Background Music Loop ---
  startBGM() {
    if (this.musicInterval) return;
    this.ensureContext();

    // Cheerful, mellow, looping chord progression
    // Cmaj7 -> Am7 -> Dm7 -> G7
    const chords = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [293.66, 349.23, 440.0, 523.25], // Dm7
      [196.0, 246.94, 293.66, 392.0],  // G7
    ];

    const melodyNotes = [
      523.25, 659.25, 783.99, 659.25,
      880.0, 783.99, 659.25, 523.25,
      587.33, 698.46, 880.0, 698.46,
      783.99, 659.25, 587.33, 493.88,
    ];

    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled || !this.ctx || this.ctx.state !== "running") return;

      try {
        const chordIndex = Math.floor((this.musicStep / 4) % chords.length);
        const chord = chords[chordIndex];
        const now = this.ctx.currentTime;

        // Play subtle gentle chord tone on beat 0
        if (this.musicStep % 4 === 0) {
          chord.forEach((freq) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq * 0.5, now);

            const vol = 0.02 * this.musicVolume;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(vol, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 1.3);
          });
        }

        // Play marimba/bell melody note
        const melodyFreq = melodyNotes[this.musicStep % melodyNotes.length];
        const mOsc = this.ctx.createOscillator();
        const mGain = this.ctx.createGain();
        mOsc.type = "triangle";
        mOsc.frequency.setValueAtTime(melodyFreq, now);

        const mVol = 0.035 * this.musicVolume;
        mGain.gain.setValueAtTime(0.0001, now);
        mGain.gain.linearRampToValueAtTime(mVol, now + 0.02);
        mGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

        mOsc.connect(mGain);
        mGain.connect(this.ctx.destination);
        mOsc.start(now);
        mOsc.stop(now + 0.3);

        this.musicStep = (this.musicStep + 1) % 128;
      } catch {
        // Safe fallback
      }
    }, 320);
  }

  stopBGM() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const audio = new AudioEngine();
