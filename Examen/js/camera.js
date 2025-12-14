// ============================================
// SISTEMA DE CÁMARA
// ============================================

import { setCamera } from './config.js';

// Crea y configura la cámara con controles WASD y sistema de colisiones
export function createCamera(scene, canvas) {
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1.6, -10), scene);
    camera.attachControl(canvas, true);
    camera.speed = 0.2;
    camera.angularSensibility = 2000;
    camera.keysUp = [87];    // W
    camera.keysDown = [83];  // S
    camera.keysLeft = [65];  // A
    camera.keysRight = [68]; // D
    camera.minZ = 0.1;

    // Sistema de colisiones y gravedad
    scene.gravity = new BABYLON.Vector3(0, -0.15, 0);
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(0.5, 0.8, 0.5);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, 0.8, 0);

    setCamera(camera);
    return camera;
}
