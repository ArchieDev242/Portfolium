// Authentic retro Windows 98 synthesised sound effects using Web Audio API

let audio_ctx = null;
let is_muted = false;
let master_volume = 0.8;

export const set_master_volume = (vol) => {
  master_volume = Math.max(0, Math.min(1, vol));
};

export const get_master_volume = () => master_volume;

const get_audio_context = () => {
  if(typeof window === 'undefined') return null;
  if(!audio_ctx)
  {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(AudioContextClass)
    {
      audio_ctx = new AudioContextClass();
    }
  }
  if(audio_ctx && audio_ctx.state === 'suspended')
  {
    audio_ctx.resume();
  }
  return audio_ctx;
};

export const set_sound_muted = (muted) => {
  is_muted = muted;
};

export const get_sound_muted = () => is_muted;

export const play_sound = (type = 'click') => {
  if(is_muted) return;
  const ctx = get_audio_context();
  if(!ctx) return;

  const now = ctx.currentTime;

  if(type === 'click')
  {
    // Subtle tactile mechanical button press
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);
    gain.gain.setValueAtTime(0.08 * master_volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } else if(type === 'open')
  {
    // Window opening chord
    const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.03);
      gain.gain.setValueAtTime(0.07 * master_volume, now + idx * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.03);
      osc.stop(now + idx * 0.03 + 0.2);
    });
  } else if(type === 'close')
  {
    // Window closing descending chord
    const freqs = [783.99, 659.25, 523.25];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.025);
      gain.gain.setValueAtTime(0.06 * master_volume, now + idx * 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.025 + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.025);
      osc.stop(now + idx * 0.025 + 0.16);
    });
  } else if(type === 'chord')
  {
    // Iconic Win98 chord / alert
    const chord_freqs = [440, 554.37, 659.25, 880];
    chord_freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.09 * master_volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    });
  } else if(type === 'startup')
  {
    // Nostalgic Win98 arpeggio
    const notes = [
      { f: 261.63, t: 0.0, d: 0.8 },  // C4
      { f: 392.00, t: 0.15, d: 0.9 }, // G4
      { f: 523.25, t: 0.35, d: 1.1 }, // C5
      { f: 659.25, t: 0.55, d: 1.2 }, // E5
      { f: 783.99, t: 0.75, d: 1.4 }, // G5
      { f: 1046.5, t: 0.95, d: 1.6 }  // C6
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.f, now + n.t);
      gain.gain.setValueAtTime(0.001, now + n.t);
      gain.gain.linearRampToValueAtTime(0.1 * master_volume, now + n.t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }
};
