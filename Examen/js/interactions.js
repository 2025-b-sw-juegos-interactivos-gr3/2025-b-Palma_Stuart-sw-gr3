// ============================================
// SISTEMA DE INTERACCIÓN Y NAVEGACIÓN
// ============================================

import {
    camera, letter, playerHasLetter, deliveryZones, currentTargetHouse,
    gameStarted, interactionPrompt, crosshair, compassArrow, housePositions
} from './config.js';

// Estado del prompt
let promptVisible = false;

// Verifica la proximidad del jugador a objetos interactuables
export function checkProximity() {
    if (!gameStarted) return null;

    const playerPos = camera.position;
    const letterPos = letter.getAbsolutePosition();
    const distanceToLetter = BABYLON.Vector3.Distance(playerPos, letterPos);

    // Cerca de la carta (y no la tiene)
    if (distanceToLetter < 2.5 && !playerHasLetter) {
        showInteractionPrompt("📧", "Recoger carta");
        setCrosshairInteractive(true);
        return "letter";
    }

    // Tiene carta - verificar buzón destino
    if (playerHasLetter && deliveryZones[currentTargetHouse]) {
        const targetZone = deliveryZones[currentTargetHouse];
        const distanceToTarget = BABYLON.Vector3.Distance(playerPos, targetZone.position);

        if (distanceToTarget < 2.5) {
            showInteractionPrompt("📬", "Entregar carta");
            setCrosshairInteractive(true);
            return "mailbox";
        }
    }

    hideInteractionPrompt();
    setCrosshairInteractive(false);
    return null;
}

// ========== CROSSHAIR INTERACTIVO ==========
export function setCrosshairInteractive(isInteractive) {
    if (!crosshair) return;

    if (isInteractive) {
        crosshair.classList.add('interactive');
    } else {
        crosshair.classList.remove('interactive');
    }
}

// ========== PROMPTS CON ANIMACIÓN ==========
export function showInteractionPrompt(icon, action) {
    if (!interactionPrompt) return;

    interactionPrompt.innerHTML = `<span class="icon">${icon}</span> Presiona <span class="key">E</span> para ${action}`;
    interactionPrompt.style.display = "block";

    // Pequeño delay para la animación
    if (!promptVisible) {
        promptVisible = true;
        requestAnimationFrame(() => {
            interactionPrompt.classList.add('visible');
        });
    }
}

export function hideInteractionPrompt() {
    if (!interactionPrompt) return;

    if (promptVisible) {
        promptVisible = false;
        interactionPrompt.classList.remove('visible');

        // Ocultar después de la transición
        setTimeout(() => {
            if (!promptVisible) {
                interactionPrompt.style.display = "none";
            }
        }, 250);
    }
}

// ========== BRÚJULA DIRECCIONAL ==========
export function updateCompass() {
    if (!gameStarted || !compassArrow || !camera) return;
    if (!housePositions[currentTargetHouse]) return;

    const playerPos = camera.position;
    const targetPos = housePositions[currentTargetHouse];

    // Calcular dirección hacia el objetivo
    const directionToTarget = targetPos.subtract(playerPos);
    directionToTarget.y = 0; // Ignorar altura
    directionToTarget.normalize();

    // Obtener la dirección de la cámara (hacia donde mira el jugador)
    const cameraDirection = camera.getDirection(BABYLON.Vector3.Forward());
    cameraDirection.y = 0;
    cameraDirection.normalize();

    // Calcular el ángulo entre la dirección de la cámara y el objetivo
    // Usando atan2 para obtener el ángulo con signo
    const angleToTarget = Math.atan2(directionToTarget.x, directionToTarget.z);
    const cameraAngle = Math.atan2(cameraDirection.x, cameraDirection.z);

    // Ángulo relativo (cuánto debe girar la flecha)
    let relativeAngle = angleToTarget - cameraAngle;

    // Normalizar a -PI a PI
    while (relativeAngle > Math.PI) relativeAngle -= Math.PI * 2;
    while (relativeAngle < -Math.PI) relativeAngle += Math.PI * 2;

    // Aplicar rotación a la flecha (negativo porque CSS gira en sentido horario)
    const degrees = -relativeAngle * (180 / Math.PI);
    compassArrow.style.transform = `rotate(${degrees}deg)`;
}

// ========== DISTANCIA AL OBJETIVO ==========
export function getDistanceToTarget() {
    if (!camera || !housePositions[currentTargetHouse]) return 0;

    const playerPos = camera.position;
    const targetPos = housePositions[currentTargetHouse];

    return BABYLON.Vector3.Distance(playerPos, targetPos);
}
