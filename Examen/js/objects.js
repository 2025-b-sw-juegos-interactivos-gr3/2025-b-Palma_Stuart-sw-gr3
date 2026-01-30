// ============================================
// OBJETOS DEL JUEGO (CARTA Y CASAS)
// ============================================

import { setLetter, setMailbox, setCurrentTargetHouse, addHouse, addDeliveryZone, playerHasLetter, addHousePosition } from './config.js';

// Crea la carta dentro de la oficina
export function createLetter(scene) {
    const letter = BABYLON.MeshBuilder.CreateBox(
        "letter",
        { width: 0.3, height: 0.4, depth: 0.01 },
        scene
    );
    // Aparece frente al jugador (spawn camera en 0,1.6,-10)
    letter.position = new BABYLON.Vector3(0, 0.5, -8);

    const letterMaterial = new BABYLON.StandardMaterial("letterMat", scene);
    letterMaterial.diffuseTexture = new BABYLON.Texture("assets/letter.png", scene);
    letterMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0.9);
    letterMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.35, 0.15);
    letterMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.3);
    letter.material = letterMaterial;

    // Halo de luz
    const letterGlow = BABYLON.MeshBuilder.CreatePlane(
        "letterGlow",
        { size: 0.6 },
        scene
    );
    letterGlow.parent = letter;
    letterGlow.position = new BABYLON.Vector3(0, 0, -0.05);
    letterGlow.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    const glowMat = new BABYLON.StandardMaterial("glowMat", scene);
    glowMat.emissiveColor = new BABYLON.Color3(1, 0.9, 0.5);
    glowMat.alpha = 0.15;
    letterGlow.material = glowMat;

    // Animación de flotación
    let letterFloat = 0;
    scene.registerBeforeRender(function() {
        if (!playerHasLetter && letter.parent === null) {
            letterFloat += 0.02;
            letter.position.y = 0.5 + Math.sin(letterFloat) * 0.1;
            letter.rotation.y += 0.01;
        }
    });

    setLetter(letter);
    return letter;
}

// Crea una casa con escala aumentada para perspectiva first-person
export function createHouse(id, posX, posZ, scene, buildingType, rotation) {
    // Collider invisible reducido (NO bloquea buzón ni puerta)
    const houseCollider = BABYLON.MeshBuilder.CreateBox(
        "houseCollider" + id,
        { width: 4, height: 8, depth: 4 }, // Reducido de 6x6 a 4x4
        scene
    );
    houseCollider.position = new BABYLON.Vector3(posX, 4, posZ);
    houseCollider.isVisible = false;
    houseCollider.checkCollisions = true;

    // Modelo GLB con ESCALA 4.5x (proporción first-person)
    const buildingModel = buildingType || "building-type-a.glb";
    BABYLON.SceneLoader.ImportMesh("", "assets/kenney_city-kit-suburban_20/Models/GLB format/", buildingModel, scene, function (meshes) {
        if (meshes.length > 0) {
            const houseRoot = meshes[0];
            houseRoot.position = new BABYLON.Vector3(posX, 0, posZ);
            houseRoot.scaling = new BABYLON.Vector3(4.5, 4.5, 4.5); // ESCALA AUMENTADA
            houseRoot.rotation.y = rotation || 0;

            // GLB sin colisiones (solo collider invisible)
            meshes.forEach(mesh => {
                mesh.checkCollisions = false;
            });
        }
    });

    // Posición del buzón al frente de la casa según su forward
    const forward = new BABYLON.Vector3(Math.sin(rotation || 0), 0, Math.cos(rotation || 0));
    const mailboxX = posX + forward.x * 3;
    const mailboxZ = posZ + forward.z * 3;

    // Zona de entrega (crítica para mecánica)
    const deliveryBox = BABYLON.MeshBuilder.CreateBox(
        "deliveryZone" + id,
        { width: 1.5, height: 1.5, depth: 1.5 },
        scene
    );
    deliveryBox.position = new BABYLON.Vector3(mailboxX, 0.75, mailboxZ);
    deliveryBox.isVisible = false;

    // Buzón 3D (sin colisiones para NO bloquear entrega)
    BABYLON.SceneLoader.ImportMesh("", "assets/", "mailbox_lp.glb", scene, function (meshes) {
        if (meshes.length > 0) {
            meshes[0].position = new BABYLON.Vector3(mailboxX, 0, mailboxZ);
            meshes[0].scaling = new BABYLON.Vector3(0.28, 0.28, 0.28); // buzón más pequeño
            meshes[0].rotation.y = rotation || 0;

            // Buzón sin colisiones (zona de entrega debe ser accesible)
            meshes.forEach(mesh => {
                mesh.checkCollisions = false;
            });
        }
    });

    // Indicador visual de zona de entrega
    const indicator = BABYLON.MeshBuilder.CreateDisc(
        "houseIndicator" + id,
        { radius: 0.9, tessellation: 64 },
        scene
    );
    indicator.position = new BABYLON.Vector3(mailboxX, 0.05, mailboxZ);
    indicator.rotation.x = Math.PI / 2;

    const indicatorMat = new BABYLON.StandardMaterial("indicatorMat" + id, scene);
    indicatorMat.diffuseColor = new BABYLON.Color3(0.2, 1, 0.3);
    indicatorMat.emissiveColor = new BABYLON.Color3(0.1, 0.6, 0.2);
    indicatorMat.alpha = 0.4;
    indicator.material = indicatorMat;

    return {
        house: houseCollider,
        deliveryZone: deliveryBox,
        indicator: indicator
    };
}

// Crea vecindario: 5 casas frente a las calles
export function createNeighborhoodHouses(scene) {
    const buildingTypes = [
        "building-type-a.glb",
        "building-type-b.glb",
        "building-type-c.glb",
        "building-type-d.glb",
        "building-type-e.glb"
    ];

    // Casas west (mirando Este) y east (mirando Oeste) alineadas con ramales
    const houseConfigs = [
        { id: 1, x: -12, z: -10, building: buildingTypes[0], rotation: 0 },
        { id: 2, x: -12, z: 0,   building: buildingTypes[1], rotation: 0 },
        { id: 3, x: -12, z: 10,  building: buildingTypes[2], rotation: 0 },
        { id: 4, x: 12,  z: -10, building: buildingTypes[3], rotation: Math.PI },
        { id: 5, x: 12,  z: 10,  building: buildingTypes[4], rotation: Math.PI }
    ];

    houseConfigs.forEach(pos => {
        const houseData = createHouse(pos.id, pos.x, pos.z, scene, pos.building, pos.rotation);
        addHouse(houseData.house);
        addDeliveryZone(houseData.deliveryZone);

        // Guardar posición para la brújula (posición del buzón/zona de entrega)
        const forward = new BABYLON.Vector3(Math.sin(pos.rotation || 0), 0, Math.cos(pos.rotation || 0));
        const targetPos = new BABYLON.Vector3(
            pos.x + forward.x * 3,
            1,
            pos.z + forward.z * 3
        );
        addHousePosition(targetPos);

        // Crear número 3D visible sobre la casa
        createHouseNumber(scene, pos.id, pos.x, pos.z, pos.rotation);
    });

    setCurrentTargetHouse(0);
    setMailbox(houseConfigs.length > 0 ? scene.getMeshByName("deliveryZone1") : null);
}

// Crea número 3D flotante sobre cada casa
function createHouseNumber(scene, id, x, z, rotation) {
    // Texto dinámico para el número
    const dynamicTexture = new BABYLON.DynamicTexture("houseNumberTex" + id, { width: 128, height: 128 }, scene);
    const ctx = dynamicTexture.getContext();

    // Dibujar número con fondo
    ctx.fillStyle = "#E85D04"; // Color primario
    ctx.beginPath();
    ctx.arc(64, 64, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 60px Inter, Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(id.toString(), 64, 68);

    dynamicTexture.update();

    // Crear plano con el número
    const numberPlane = BABYLON.MeshBuilder.CreatePlane("houseNumber" + id, { size: 2 }, scene);

    // Posicionar arriba y al frente de la casa
    const forward = new BABYLON.Vector3(Math.sin(rotation || 0), 0, Math.cos(rotation || 0));
    numberPlane.position = new BABYLON.Vector3(
        x + forward.x * 4,
        6, // Altura visible
        z + forward.z * 4
    );
    numberPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    const numberMat = new BABYLON.StandardMaterial("numberMat" + id, scene);
    numberMat.diffuseTexture = dynamicTexture;
    numberMat.emissiveTexture = dynamicTexture;
    numberMat.opacityTexture = dynamicTexture;
    numberMat.useAlphaFromDiffuseTexture = true;
    numberMat.disableLighting = true;
    numberPlane.material = numberMat;

    return numberPlane;
}
