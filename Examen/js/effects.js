// ============================================
// SISTEMA DE EFECTOS VISUALES
// Partículas, screen shake, glow, flash
// ============================================

import { scene, camera } from './config.js';

// Referencia al GlowLayer global
let glowLayer = null;

// ========== SETUP POST-PROCESSING (Glow/Bloom) ==========
export function setupPostProcessing(sceneRef, cameraRef) {
    // Crear GlowLayer para efectos de brillo
    glowLayer = new BABYLON.GlowLayer("glowLayer", sceneRef, {
        mainTextureFixedSize: 512,
        blurKernelSize: 64
    });
    glowLayer.intensity = 0.5;

    return glowLayer;
}

// ========== CONFETTI EXPLOSION (Entrega exitosa) ==========
export function createConfettiExplosion(sceneRef, position) {
    // Sistema de partículas principal - Confetti
    const confetti = new BABYLON.ParticleSystem("confetti", 300, sceneRef);

    // Textura procedural para confetti (cuadrado)
    const textureSize = 32;
    const textureData = new Uint8Array(textureSize * textureSize * 4);
    for (let i = 0; i < textureSize * textureSize * 4; i += 4) {
        textureData[i] = 255;     // R
        textureData[i + 1] = 255; // G
        textureData[i + 2] = 255; // B
        textureData[i + 3] = 255; // A
    }
    const rawTexture = BABYLON.RawTexture.CreateRGBATexture(
        textureData, textureSize, textureSize, sceneRef, false, false
    );
    confetti.particleTexture = rawTexture;

    // Emisor
    confetti.emitter = position.clone();
    confetti.minEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
    confetti.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5);

    // Colores cálidos coherentes con la paleta
    confetti.color1 = new BABYLON.Color4(0.91, 0.36, 0.02, 1);  // Naranja primario #E85D04
    confetti.color2 = new BABYLON.Color4(0.98, 0.64, 0.02, 1);  // Amarillo dorado #FAA307
    confetti.colorDead = new BABYLON.Color4(0.32, 0.72, 0.53, 0); // Verde suave fade

    // Tamaño
    confetti.minSize = 0.05;
    confetti.maxSize = 0.15;

    // Vida
    confetti.minLifeTime = 1.5;
    confetti.maxLifeTime = 3;

    // Velocidad - explosión hacia arriba y lados
    confetti.direction1 = new BABYLON.Vector3(-3, 8, -3);
    confetti.direction2 = new BABYLON.Vector3(3, 12, 3);

    // Emisión
    confetti.emitRate = 300;
    confetti.manualEmitCount = 200;

    // Gravedad
    confetti.gravity = new BABYLON.Vector3(0, -5, 0);

    // Rotación
    confetti.minAngularSpeed = -Math.PI * 2;
    confetti.maxAngularSpeed = Math.PI * 2;

    // Blending
    confetti.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

    // Iniciar
    confetti.start();

    // Auto-destruir después de la animación
    setTimeout(() => {
        confetti.stop();
        setTimeout(() => confetti.dispose(), 3000);
    }, 500);

    return confetti;
}

// ========== SPARKLES/ESTRELLAS (Brillos mágicos) ==========
export function createSparkles(sceneRef, position) {
    const sparkles = new BABYLON.ParticleSystem("sparkles", 100, sceneRef);

    // Textura de estrella procedural
    const size = 32;
    const data = new Uint8Array(size * size * 4);
    const center = size / 2;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const idx = (y * size + x) * 4;
            const dx = x - center;
            const dy = y - center;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const alpha = Math.max(0, 1 - dist / center) * 255;
            data[idx] = 255;
            data[idx + 1] = 255;
            data[idx + 2] = 200;
            data[idx + 3] = alpha;
        }
    }
    sparkles.particleTexture = BABYLON.RawTexture.CreateRGBATexture(
        data, size, size, sceneRef, false, false
    );

    sparkles.emitter = position.clone();
    sparkles.minEmitBox = new BABYLON.Vector3(-1, 0, -1);
    sparkles.maxEmitBox = new BABYLON.Vector3(1, 2, 1);

    // Colores dorados/blancos
    sparkles.color1 = new BABYLON.Color4(1, 0.95, 0.6, 1);
    sparkles.color2 = new BABYLON.Color4(1, 1, 1, 1);
    sparkles.colorDead = new BABYLON.Color4(1, 0.8, 0.3, 0);

    sparkles.minSize = 0.1;
    sparkles.maxSize = 0.25;
    sparkles.minLifeTime = 0.5;
    sparkles.maxLifeTime = 1.5;

    sparkles.direction1 = new BABYLON.Vector3(-1, 3, -1);
    sparkles.direction2 = new BABYLON.Vector3(1, 5, 1);

    sparkles.emitRate = 80;
    sparkles.manualEmitCount = 60;

    sparkles.gravity = new BABYLON.Vector3(0, -2, 0);

    sparkles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    sparkles.start();

    setTimeout(() => {
        sparkles.stop();
        setTimeout(() => sparkles.dispose(), 2000);
    }, 400);

    return sparkles;
}

// ========== SCREEN SHAKE ==========
export function screenShake(cameraRef, intensity = 0.1, duration = 300) {
    if (!cameraRef) return;

    const originalPosition = cameraRef.position.clone();
    const startTime = Date.now();

    const shakeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress >= 1) {
            clearInterval(shakeInterval);
            // No restaurar posición ya que la cámara se mueve constantemente
            return;
        }

        // Intensidad decreciente
        const currentIntensity = intensity * (1 - progress);

        // Offset aleatorio
        const offsetX = (Math.random() - 0.5) * 2 * currentIntensity;
        const offsetY = (Math.random() - 0.5) * 2 * currentIntensity;

        // Aplicar al target de la cámara (no a la posición directamente en FPS)
        if (cameraRef.rotation) {
            cameraRef.rotation.x += offsetY * 0.1;
            cameraRef.rotation.y += offsetX * 0.1;
        }
    }, 16); // ~60fps
}

// ========== SCREEN FLASH ==========
export function screenFlash(color = 'gold', duration = 200) {
    // Crear overlay de flash
    let flashOverlay = document.getElementById('screen-flash');

    if (!flashOverlay) {
        flashOverlay = document.createElement('div');
        flashOverlay.id = 'screen-flash';
        flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity ${duration / 2}ms ease-out;
        `;
        document.body.appendChild(flashOverlay);
    }

    // Colores predefinidos (paleta cálida)
    const colors = {
        'gold': 'rgba(232, 93, 4, 0.35)',      // Naranja primario
        'orange': 'rgba(250, 163, 7, 0.4)',    // Amarillo dorado
        'white': 'rgba(255, 255, 255, 0.5)',
        'green': 'rgba(82, 183, 136, 0.3)',    // Verde suave
        'blue': 'rgba(100, 200, 255, 0.3)'
    };

    flashOverlay.style.backgroundColor = colors[color] || colors['gold'];
    flashOverlay.style.opacity = '1';

    setTimeout(() => {
        flashOverlay.style.opacity = '0';
    }, duration / 2);
}

// ========== PICKUP EFFECT (Efecto al recoger carta) ==========
export function createPickupEffect(sceneRef, position) {
    // Anillo de luz que se expande
    const ring = BABYLON.MeshBuilder.CreateTorus("pickupRing", {
        diameter: 0.5,
        thickness: 0.05,
        tessellation: 32
    }, sceneRef);

    ring.position = position.clone();
    ring.position.y += 0.5;

    const ringMat = new BABYLON.StandardMaterial("ringMat", sceneRef);
    ringMat.emissiveColor = new BABYLON.Color3(0.91, 0.55, 0.02); // Naranja cálido
    ringMat.disableLighting = true;
    ringMat.alpha = 0.8;
    ring.material = ringMat;

    // Animación de expansión
    let scale = 1;
    let alpha = 0.8;
    const expandInterval = setInterval(() => {
        scale += 0.15;
        alpha -= 0.05;

        ring.scaling = new BABYLON.Vector3(scale, 1, scale);
        ringMat.alpha = Math.max(0, alpha);

        if (alpha <= 0) {
            clearInterval(expandInterval);
            ring.dispose();
            ringMat.dispose();
        }
    }, 30);

    // Pequeñas partículas ascendentes
    const pickupSparkles = new BABYLON.ParticleSystem("pickupSparkles", 30, sceneRef);

    const sparkleSize = 16;
    const sparkleData = new Uint8Array(sparkleSize * sparkleSize * 4);
    for (let i = 0; i < sparkleSize * sparkleSize * 4; i += 4) {
        sparkleData[i] = 250;   // Naranja R
        sparkleData[i + 1] = 160;
        sparkleData[i + 2] = 50;
        sparkleData[i + 3] = 255;
    }
    pickupSparkles.particleTexture = BABYLON.RawTexture.CreateRGBATexture(
        sparkleData, sparkleSize, sparkleSize, sceneRef, false, false
    );

    pickupSparkles.emitter = position.clone();
    pickupSparkles.minEmitBox = new BABYLON.Vector3(-0.3, 0, -0.3);
    pickupSparkles.maxEmitBox = new BABYLON.Vector3(0.3, 0.3, 0.3);

    // Colores cálidos para pickup
    pickupSparkles.color1 = new BABYLON.Color4(0.98, 0.64, 0.02, 1); // Dorado
    pickupSparkles.color2 = new BABYLON.Color4(1, 1, 1, 1);
    pickupSparkles.colorDead = new BABYLON.Color4(0.91, 0.36, 0.02, 0); // Naranja fade

    pickupSparkles.minSize = 0.03;
    pickupSparkles.maxSize = 0.08;
    pickupSparkles.minLifeTime = 0.3;
    pickupSparkles.maxLifeTime = 0.8;

    pickupSparkles.direction1 = new BABYLON.Vector3(-0.5, 2, -0.5);
    pickupSparkles.direction2 = new BABYLON.Vector3(0.5, 4, 0.5);

    pickupSparkles.emitRate = 50;
    pickupSparkles.manualEmitCount = 25;

    pickupSparkles.gravity = new BABYLON.Vector3(0, 1, 0);
    pickupSparkles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    pickupSparkles.start();

    setTimeout(() => {
        pickupSparkles.stop();
        setTimeout(() => pickupSparkles.dispose(), 1000);
    }, 200);
}

// ========== DELIVERY CELEBRATION (Combina todos los efectos) ==========
export function createDeliveryCelebration(sceneRef, cameraRef, position) {
    // 1. Confetti explosion
    createConfettiExplosion(sceneRef, position);

    // 2. Sparkles
    createSparkles(sceneRef, position);

    // 3. Screen shake suave
    screenShake(cameraRef, 0.08, 250);

    // 4. Screen flash dorado
    screenFlash('gold', 300);

    // 5. Intensificar glow momentáneamente
    if (glowLayer) {
        const originalIntensity = glowLayer.intensity;
        glowLayer.intensity = 1.2;
        setTimeout(() => {
            glowLayer.intensity = originalIntensity;
        }, 400);
    }
}

// ========== INDICATOR PULSE (Animación de indicadores) ==========
export function pulseIndicator(mesh, baseScale = 1, pulseAmount = 0.1, speed = 2) {
    if (!mesh || !mesh._scene) return;

    const startTime = Date.now();

    mesh._scene.registerBeforeRender(() => {
        if (!mesh || mesh.isDisposed()) return;

        const elapsed = (Date.now() - startTime) / 1000;
        const pulse = Math.sin(elapsed * speed * Math.PI) * pulseAmount;
        const scale = baseScale + pulse;

        mesh.scaling = new BABYLON.Vector3(scale, 1, scale);
    });
}

// Exportar el glowLayer para uso externo
export function getGlowLayer() {
    return glowLayer;
}
