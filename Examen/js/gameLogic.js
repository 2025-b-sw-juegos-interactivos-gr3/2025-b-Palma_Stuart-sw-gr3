// ============================================
// LÓGICA DE JUEGO
// ============================================

import {
    camera, letter, mailbox, playerHasLetter, deliveryCount,
    statusDiv, targetDiv, deliveriesDiv, deliveryZones, currentTargetHouse, scene,
    setPlayerHasLetter, incrementDeliveryCount, setCurrentTargetHouse, setMailbox,
    statusIndicator
} from './config.js';
import { hideInteractionPrompt } from './interactions.js';
import { audioManager } from './audio.js';
import { createPickupEffect, createDeliveryCelebration } from './effects.js';

// Recoge la carta usando sistema de parenting
export function pickupLetter() {
    if (playerHasLetter) {
        console.log("Ya tienes una carta");
        audioManager.playError();
        return;
    }

    // Guardar posición para efecto visual
    const pickupPosition = letter.position.clone();

    // Parenting al camera para que la carta siga al jugador
    letter.parent = camera;
    letter.position = new BABYLON.Vector3(0.4, -0.25, 0.8); // Offset mejorado
    letter.rotation = new BABYLON.Vector3(0.1, 0, 0.05);    // Ligera inclinación natural

    setPlayerHasLetter(true);
    statusDiv.textContent = "Lleva la carta al buzón";
    hideInteractionPrompt();

    // Actualizar indicador visual de estado
    if (statusIndicator) {
        statusIndicator.classList.add('has-letter');
        statusIndicator.classList.remove('delivered');
    }

    // Audio y efectos visuales
    audioManager.playPickup();
    createPickupEffect(scene, pickupPosition);

    // Animación de UI
    const statusEl = document.getElementById('status-text');
    if (statusEl) {
        statusEl.style.animation = 'none';
        statusEl.offsetHeight; // Trigger reflow
        statusEl.style.animation = 'pulse-status 0.5s ease';
    }

    console.log("Carta recogida");
}

// Entrega la carta en el buzón correcto y selecciona nueva casa destino
export function deliverLetter() {
    if (!playerHasLetter) {
        console.log("No tienes ninguna carta");
        audioManager.playError();
        return;
    }

    // Posición de entrega para efectos
    const deliveryPosition = mailbox.position.clone();
    deliveryPosition.y += 1;

    letter.parent = null;
    letter.position = deliveryPosition;

    // Flash en el indicador de entrega
    const deliveryIndicatorMat = scene.getMaterialByName("indicatorMat" + (currentTargetHouse + 1));
    if (deliveryIndicatorMat) {
        deliveryIndicatorMat.emissiveColor = new BABYLON.Color3(0.5, 2, 0.5);
        setTimeout(() => {
            if (deliveryIndicatorMat) {
                deliveryIndicatorMat.emissiveColor = new BABYLON.Color3(0.1, 0.6, 0.2);
            }
        }, 300);
    }

    // Selección de siguiente casa (FIX: evitar loop infinito)
    let nextHouse = currentTargetHouse;
    if (deliveryZones.length > 1) {
        // Crear array de opciones excluyendo la casa actual
        const availableHouses = [];
        for (let i = 0; i < deliveryZones.length; i++) {
            if (i !== currentTargetHouse) {
                availableHouses.push(i);
            }
        }
        // Seleccionar aleatoriamente de las disponibles
        nextHouse = availableHouses[Math.floor(Math.random() * availableHouses.length)];
    }
    setCurrentTargetHouse(nextHouse);
    setMailbox(deliveryZones[nextHouse]);
    targetDiv.textContent = "Casa #" + (nextHouse + 1);

    // Audio y efectos de celebración
    audioManager.playDelivery();
    createDeliveryCelebration(scene, camera, deliveryPosition);

    // Animación de carta (fade out + scale up)
    let alpha = 1;
    let scale = 1;
    const fadeOut = setInterval(() => {
        alpha -= 0.05;
        scale += 0.03;
        letter.visibility = alpha;
        letter.scaling = new BABYLON.Vector3(scale, scale, scale);
        if (alpha <= 0) {
            clearInterval(fadeOut);
            letter.scaling = new BABYLON.Vector3(1, 1, 1);
            resetLetter();
        }
    }, 40);

    setPlayerHasLetter(false);
    incrementDeliveryCount();

    statusDiv.textContent = "¡Entrega completada! Busca la siguiente carta";
    deliveriesDiv.textContent = deliveryCount;
    hideInteractionPrompt();

    // Actualizar indicador visual de estado
    if (statusIndicator) {
        statusIndicator.classList.remove('has-letter');
        statusIndicator.classList.add('delivered');
        // Volver a estado de búsqueda después de un momento
        setTimeout(() => {
            statusIndicator.classList.remove('delivered');
        }, 2000);
    }

    // Animación del contador
    const deliveriesEl = document.getElementById('delivery-count');
    if (deliveriesEl) {
        deliveriesEl.style.animation = 'none';
        deliveriesEl.offsetHeight;
        deliveriesEl.style.animation = 'bounce-counter 0.6s ease';
    }

    console.log("Carta entregada. Total entregas: " + deliveryCount);
}

// Resetea la carta a su posición inicial en la oficina
export function resetLetter() {
    letter.position = new BABYLON.Vector3(0, 0.5, -8);
    letter.rotation = new BABYLON.Vector3(0, 0, 0);
    letter.visibility = 1;
    letter.parent = null;
    statusDiv.textContent = "Busca la carta en la oficina";
}
