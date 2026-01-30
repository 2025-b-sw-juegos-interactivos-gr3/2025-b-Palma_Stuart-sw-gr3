// ============================================
// SISTEMA DE AUDIO - Patrón Singleton
// Utiliza Web Audio API para generar sonidos sintéticos
// ============================================

class AudioManager {
    static instance = null;

    constructor() {
        // Patrón Singleton: solo una instancia
        if (AudioManager.instance) {
            return AudioManager.instance;
        }

        this.ctx = null;
        this.isMuted = false;
        this.sfxVolume = 0.5;
        this.musicVolume = 0.3;
        this.ambientOsc = null;
        this.ambientGain = null;

        AudioManager.instance = this;
    }

    // Inicializa el contexto de audio (debe llamarse después de interacción del usuario)
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this;
    }

    // Resume el contexto si está suspendido (requerido por políticas de autoplay)
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // ========== SONIDO DE PICKUP (Tono ascendente tipo "coin collect") ==========
    playPickup() {
        if (this.isMuted || !this.ctx) return;
        this.resume();

        const now = this.ctx.currentTime;

        // Oscilador principal - tono ascendente
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6

        // Oscilador secundario - armónico
        const osc2 = this.ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, now); // E5
        osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15); // E6

        // Envelope de volumen
        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        // Conectar
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        // Reproducir
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.2);
        osc2.stop(now + 0.2);
    }

    // ========== SONIDO DE ENTREGA (Acorde de éxito/fanfare) ==========
    playDelivery() {
        if (this.isMuted || !this.ctx) return;
        this.resume();

        const now = this.ctx.currentTime;

        // Acorde mayor C-E-G (Do mayor)
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        frequencies.forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            osc.type = index === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(freq, now);

            const gainNode = this.ctx.createGain();
            const startTime = now + (index * 0.05); // Arpegio rápido
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.3, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.6);

            osc.connect(gainNode);
            gainNode.connect(this.ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 0.6);
        });

        // Tono de "completado" adicional
        setTimeout(() => {
            if (this.isMuted || !this.ctx) return;
            const finalOsc = this.ctx.createOscillator();
            finalOsc.type = 'sine';
            finalOsc.frequency.setValueAtTime(1046.50, this.ctx.currentTime);

            const finalGain = this.ctx.createGain();
            finalGain.gain.setValueAtTime(this.sfxVolume * 0.2, this.ctx.currentTime);
            finalGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

            finalOsc.connect(finalGain);
            finalGain.connect(this.ctx.destination);

            finalOsc.start();
            finalOsc.stop(this.ctx.currentTime + 0.3);
        }, 300);
    }

    // ========== SONIDO DE ERROR/RECHAZO ==========
    playError() {
        if (this.isMuted || !this.ctx) return;
        this.resume();

        const now = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.15);

        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    // ========== MÚSICA AMBIENTE (Drone suave) ==========
    startAmbient() {
        if (this.isMuted || !this.ctx || this.ambientOsc) return;
        this.resume();

        // Oscilador base - drone en C
        this.ambientOsc = this.ctx.createOscillator();
        this.ambientOsc.type = 'sine';
        this.ambientOsc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2

        // LFO para modulación sutil
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.5, this.ctx.currentTime);

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(2, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(this.ambientOsc.frequency);

        // Ganancia principal
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.ambientGain.gain.linearRampToValueAtTime(this.musicVolume * 0.15, this.ctx.currentTime + 2);

        this.ambientOsc.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);

        this.ambientOsc.start();
        lfo.start();
    }

    stopAmbient() {
        if (this.ambientOsc) {
            this.ambientGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
            setTimeout(() => {
                if (this.ambientOsc) {
                    this.ambientOsc.stop();
                    this.ambientOsc = null;
                    this.ambientGain = null;
                }
            }, 1000);
        }
    }

    // ========== SONIDO DE PASOS (opcional) ==========
    playFootstep() {
        if (this.isMuted || !this.ctx) return;
        this.resume();

        const now = this.ctx.currentTime;

        // Ruido filtrado para simular paso
        const bufferSize = this.ctx.sampleRate * 0.05;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(this.sfxVolume * 0.1, now);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        noise.start(now);
    }

    // ========== CONTROLES ==========
    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.ambientGain) {
            this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
        } else if (!this.isMuted && this.ambientGain) {
            this.ambientGain.gain.setValueAtTime(this.musicVolume * 0.15, this.ctx.currentTime);
        }
        return this.isMuted;
    }

    setVolume(sfx, music) {
        if (sfx !== undefined) this.sfxVolume = Math.max(0, Math.min(1, sfx));
        if (music !== undefined) {
            this.musicVolume = Math.max(0, Math.min(1, music));
            if (this.ambientGain && !this.isMuted) {
                this.ambientGain.gain.setValueAtTime(this.musicVolume * 0.15, this.ctx.currentTime);
            }
        }
    }
}

// Exportar instancia singleton
export const audioManager = new AudioManager();
export { AudioManager };
