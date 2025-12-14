// ============================================
// SISTEMA DE ILUMINACIÓN
// ============================================

// Crea el sistema de iluminación (hemisférica, direccional y puntual)
export function createLights(scene) {
    const hemisphericLight = new BABYLON.HemisphericLight(
        "hemiLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    hemisphericLight.intensity = 0.8;

    const directionalLight = new BABYLON.DirectionalLight(
        "dirLight",
        new BABYLON.Vector3(-1, -2, -1),
        scene
    );
    directionalLight.position = new BABYLON.Vector3(20, 40, 20);
    directionalLight.intensity = 0.7;

    // Luz puntual en la oficina de correos
    const officeLight = new BABYLON.PointLight(
        "officeLight",
        new BABYLON.Vector3(-10, 2.5, 0),
        scene
    );
    officeLight.intensity = 0.8;
    officeLight.range = 8;
    officeLight.diffuse = new BABYLON.Color3(1, 0.9, 0.7);
}
