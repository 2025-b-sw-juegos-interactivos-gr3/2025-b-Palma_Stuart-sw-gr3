// ============================================
// ARCHIVO PRINCIPAL - INICIALIZACIÓN DEL JUEGO
// ============================================

import { setScene, setGameStarted, gameStarted, player, camera, gameTitle, startButton, targetDiv, currentTargetHouse, scene } from './config.js';
import { createCamera } from './camera.js';
import { createLights } from './lights.js';
import { createGround, createPostOffice } from './environment.js';
import { createLetter, createNeighborhoodHouses } from './objects.js';
import { createDecorations, createKenneyAssets } from './decorations.js';
import { createPlayer } from './player.js';
import { setupKeyboardControls } from './controls.js';
import { checkProximity, updateCompass } from './interactions.js';
import { audioManager } from './audio.js';
import { setupPostProcessing } from './effects.js';

// Canvas y motor Babylon.js
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// Crea la escena completa del juego
function createScene() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 1.0);

    createCamera(scene, canvas);
    createLights(scene);
    createGround(scene);
    createPostOffice(scene);
    createLetter(scene);
    createNeighborhoodHouses(scene);
    createDecorations(scene);
    createKenneyAssets(scene);
    createPlayer(scene);

    return scene;
}

// Inicializa efectos de post-procesamiento después de crear la escena
function initPostProcessing(scene, camera) {
    setupPostProcessing(scene, camera);
}

// Inicialización del juego
const gameScene = createScene();
setScene(gameScene);
setupKeyboardControls(gameScene);

// Maneja el inicio del juego
startButton.addEventListener("click", () => {
    setGameStarted(true);
    gameTitle.style.display = "none";
    targetDiv.textContent = "Casa #" + (currentTargetHouse + 1);

    // Inicializar audio (requiere interacción del usuario)
    audioManager.init();
    audioManager.startAmbient();

    // Inicializar post-procesamiento
    initPostProcessing(gameScene, camera);

    // Bloquear puntero para mejor control FPS
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();

    canvas.focus();
});

// Botón de mute
const muteBtn = document.getElementById('mute-btn');
if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        const isMuted = audioManager.toggleMute();
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
        muteBtn.title = isMuted ? 'Activar sonido' : 'Silenciar';
    });
}

// Loop de renderizado principal
engine.runRenderLoop(function() {
    // Siempre renderizar la escena
    if (gameScene) {
        gameScene.render();
    }

    // Lógica del juego solo cuando está activo
    if (gameStarted && player && camera) {
        player.position = camera.position.clone();
        checkProximity();
        updateCompass();
    }
});

// Maneja el redimensionamiento de la ventana
window.addEventListener("resize", function() {
    engine.resize();
});

// Log de assets cargados
gameScene.onReadyObservable.addOnce(() => {
    console.log("Escena lista");
    console.log("Assets cargados desde carpeta assets/:");
    console.log("  ✓ assets/ground_asphalt.jpg");
    console.log("  ✓ assets/wall_brick.jpg");
    console.log("  ✓ assets/letter.png");
    console.log("  ✓ assets/mailbox.glb");
});
