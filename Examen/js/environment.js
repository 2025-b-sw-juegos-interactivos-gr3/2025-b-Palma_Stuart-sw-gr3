// ============================================
// ENTORNO DEL JUEGO (SUELO Y CALLES)
// ============================================

// Crea el suelo del vecindario con textura de asfalto y genera la grilla de calles
export function createGround(scene) {
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 60, height: 60 },
        scene
    );

    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/ground_asphalt.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 12;
    groundMaterial.diffuseTexture.vScale = 12;
    groundMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    ground.material = groundMaterial;
    ground.checkCollisions = true;

    // Red de calles conectada (eje principal + ramales)
    createStreetGrid(scene);
}

// Crea una grilla de calles: eje principal y ramales hacia las casas
function createStreetGrid(scene) {
    // Pavimentos/tiles de calle desactivados: estaban causando problemas visuales.
    // Se mantiene solo el suelo de asfalto base.
    return;
}

// Crea la zona de pickup de la oficina (sin paredes)
export function createPostOffice(scene) {
    // Movida al frente del spawn del jugador
    const officeX = 0;
    const officeZ = -8;

    // Zona de pickup (crítica para mecánica)
    const pickupZoneIndicator = BABYLON.MeshBuilder.CreateDisc(
        "pickupZone",
        { radius: 1.5, tessellation: 64 },
        scene
    );
    pickupZoneIndicator.position = new BABYLON.Vector3(officeX, 0.05, officeZ);
    pickupZoneIndicator.rotation.x = Math.PI / 2;

    const pickupZoneMat = new BABYLON.StandardMaterial("pickupZoneMat", scene);
    pickupZoneMat.diffuseColor = new BABYLON.Color3(0.2, 0.8, 1);
    pickupZoneMat.emissiveColor = new BABYLON.Color3(0.1, 0.4, 0.6);
    pickupZoneMat.alpha = 0.3;
    pickupZoneIndicator.material = pickupZoneMat;

    // Animación del indicador
    let pickupGlow = 0;
    scene.registerBeforeRender(function() {
        pickupGlow += 0.03;
        pickupZoneMat.alpha = 0.3 + Math.sin(pickupGlow) * 0.15;
    });
}
