// ============================================
// MANEJO DE TECLADO
// ============================================

import { gameStarted } from './config.js';
import { checkProximity } from './interactions.js';
import { pickupLetter, deliverLetter } from './gameLogic.js';

// Configura los controles de teclado (tecla E para interacción)
export function setupKeyboardControls(scene) {
    scene.onKeyboardObservable.add((kbInfo) => {
        if (!gameStarted) return;

        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if (kbInfo.event.key === "e" || kbInfo.event.key === "E") {
                    const proximityTarget = checkProximity();

                    if (proximityTarget === "letter") {
                        pickupLetter();
                    }
                    else if (proximityTarget === "mailbox") {
                        deliverLetter();
                    }
                }
                break;
        }
    });
}
