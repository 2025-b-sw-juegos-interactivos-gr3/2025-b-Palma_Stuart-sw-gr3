// ============================================
// LÓGICA DE JUEGO
// ============================================

import {
    camera, letter, mailbox, playerHasLetter, deliveryCount,
    statusDiv, targetDiv, deliveriesDiv, deliveryZones, currentTargetHouse, scene,
    setPlayerHasLetter, incrementDeliveryCount, setCurrentTargetHouse, setMailbox
} from './config.js';
import { hideInteractionPrompt } from './interactions.js';

// Recoge la carta usando sistema de parenting
export function pickupLetter() {
    if (playerHasLetter) {
        console.log("Ya tienes una carta");
        return;
    }

    letter.parent = camera;
    letter.position = new BABYLON.Vector3(0.5, -0.3, 1);
    letter.rotation = new BABYLON.Vector3(0, 0, 0);

    setPlayerHasLetter(true);
    statusDiv.textContent = "Estado: Lleva la carta al buzón";
    hideInteractionPrompt();

    console.log("Carta recogida");
}

// Entrega la carta en el buzón correcto y selecciona nueva casa destino
export function deliverLetter() {
    if (!playerHasLetter) {
        console.log("No tienes ninguna carta");
        return;
    }

    letter.parent = null;
    letter.position = mailbox.position.clone();
    letter.position.y += 1;

    const deliveryIndicatorMat = scene.getMaterialByName("indicatorMat" + (currentTargetHouse + 1));
    if (deliveryIndicatorMat) {
        deliveryIndicatorMat.emissiveColor = new BABYLON.Color3(0.5, 2, 0.5);
        setTimeout(() => {
            deliveryIndicatorMat.emissiveColor = new BABYLON.Color3(0.1, 0.6, 0.2);
        }, 300);
    }

    let nextHouse = currentTargetHouse;
    while (nextHouse === currentTargetHouse && deliveryZones.length > 1) {
        nextHouse = Math.floor(Math.random() * deliveryZones.length);
    }
    setCurrentTargetHouse(nextHouse);
    setMailbox(deliveryZones[currentTargetHouse]);
    targetDiv.textContent = "Casa destino: #" + (currentTargetHouse + 1);

    let alpha = 1;
    let scale = 1;
    const fadeOut = setInterval(() => {
        alpha -= 0.05;
        scale += 0.02;
        letter.visibility = alpha;
        letter.scaling = new BABYLON.Vector3(scale, scale, scale);
        if (alpha <= 0) {
            clearInterval(fadeOut);
            letter.scaling = new BABYLON.Vector3(1, 1, 1);
            resetLetter();
        }
    }, 50);

    setPlayerHasLetter(false);
    incrementDeliveryCount();

    statusDiv.textContent = "Estado: ✓ ¡Entrega completada! Busca la siguiente carta";
    deliveriesDiv.textContent = "Entregas: " + deliveryCount;
    hideInteractionPrompt();

    console.log("Carta entregada. Total entregas: " + deliveryCount);
}

// Resetea la carta a su posición inicial en la oficina
export function resetLetter() {
    letter.position = new BABYLON.Vector3(0, 0.5, -8);
    letter.rotation = new BABYLON.Vector3(0, 0, 0);
    letter.visibility = 1;
    letter.parent = null;
    statusDiv.textContent = "Estado: Busca la carta en la oficina";
}
