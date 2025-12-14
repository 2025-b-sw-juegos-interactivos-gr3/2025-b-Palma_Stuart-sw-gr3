// ============================================
// SISTEMA DE INTERACCIÓN
// ============================================

import { camera, letter, playerHasLetter, deliveryZones, currentTargetHouse, gameStarted, interactionPrompt } from './config.js';

// Verifica la proximidad del jugador a objetos interactuables
export function checkProximity() {
    if (!gameStarted) return;

    const playerPos = camera.position;
    const letterPos = letter.getAbsolutePosition();
    const distanceToLetter = BABYLON.Vector3.Distance(playerPos, letterPos);

    if (distanceToLetter < 2 && !playerHasLetter) {
        showInteractionPrompt("Presiona E para recoger la carta");
        return "letter";
    }

    if (playerHasLetter) {
        const targetZone = deliveryZones[currentTargetHouse];
        const distanceToTarget = BABYLON.Vector3.Distance(playerPos, targetZone.position);

        if (distanceToTarget < 2) {
            showInteractionPrompt("Presiona E para entregar en Casa #" + (currentTargetHouse + 1));
            return "mailbox";
        }
    }

    hideInteractionPrompt();
    return null;
}

// Muestra el prompt de interacción en pantalla
export function showInteractionPrompt(text) {
    interactionPrompt.textContent = text;
    interactionPrompt.style.display = "block";
}

// Oculta el prompt de interacción
export function hideInteractionPrompt() {
    interactionPrompt.style.display = "none";
}
