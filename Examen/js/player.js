// ============================================
// JUGADOR
// ============================================

import { setPlayer, camera } from './config.js';

// Crea la representación invisible del jugador para seguimiento de posición
export function createPlayer(scene) {
    const player = BABYLON.MeshBuilder.CreateSphere(
        "player",
        { diameter: 0.5 },
        scene
    );
    player.position = camera.position.clone();
    player.isVisible = false;

    setPlayer(player);
    return player;
}
