// ============================================
// DECORACIONES Y ASSETS 3D
// ============================================

// Crea decoraciones organizadas: farolas, árboles y flores
export function createDecorations(scene) {
    const lightPath = "assets/kenney_city-kit-roads/Models/GLB format/";

    // FAROLAS en intersecciones y extremos (todas con luz)
    const streetLightPositions = [
        { x: -3, z: -20, hasLight: false }, { x: 3, z: -20, hasLight: false },
        { x: -3, z: -10, hasLight: true  }, { x: 3, z: -10, hasLight: true  },
        { x: -3, z: 0,   hasLight: true  }, { x: 3, z: 0,   hasLight: true  },
        { x: -3, z: 10,  hasLight: true  }, { x: 3, z: 10,  hasLight: true  },
        { x: -3, z: 20,  hasLight: false }, { x: 3, z: 20,  hasLight: false }
    ];

    streetLightPositions.forEach((pos, i) => {
        const lightModel = i % 2 === 0 ? "light-curved.glb" : "light-square.glb";
        BABYLON.SceneLoader.ImportMesh("", lightPath, lightModel, scene, function (meshes) {
            if (meshes.length > 0) {
                meshes[0].position = new BABYLON.Vector3(pos.x, 0, pos.z);
                meshes[0].scaling = new BABYLON.Vector3(3.5, 3.5, 3.5); // más grandes

                // SIN colisiones (solo visual/luz)
                meshes.forEach(mesh => {
                    mesh.checkCollisions = false;
                });

                // Luz puntual solo donde se requiere para no exceder UBOs
                if (pos.hasLight) {
                    const pointLight = new BABYLON.PointLight(
                        "streetLight" + i,
                        new BABYLON.Vector3(pos.x, 4.5, pos.z),
                        scene
                    );
                    pointLight.intensity = 0.9;
                    pointLight.range = 14;
                    pointLight.diffuse = new BABYLON.Color3(1, 0.9, 0.7);
                }
            }
        });
    });
}

// Carga árboles perimetrales y flores en jardines
export function createKenneyAssets(scene) {
    const naturePath = "assets/kenney_nature-kit/Models/GLTF format/";

    // ÁRBOLES PERIMETRALES (16 árboles en bordes)
    const treePositions = [
        // Línea Oeste (x=-20)
        { x: -20, z: -15, type: 0 },
        { x: -20, z: -10, type: 1 },
        { x: -20, z: -5,  type: 2 },
        { x: -20, z: 0,   type: 0 },
        { x: -20, z: 5,   type: 1 },
        { x: -20, z: 10,  type: 2 },
        { x: -20, z: 15,  type: 0 },
        { x: -20, z: 20,  type: 1 },

        // Línea Este (x=20)
        { x: 20, z: -15, type: 2 },
        { x: 20, z: -10, type: 0 },
        { x: 20, z: -5,  type: 1 },
        { x: 20, z: 0,   type: 2 },
        { x: 20, z: 5,   type: 0 },
        { x: 20, z: 10,  type: 1 },
        { x: 20, z: 15,  type: 2 },
        { x: 20, z: 20,  type: 0 }
    ];

    const treeTypes = ["tree_default.glb", "tree_cone.glb", "tree_blocks.glb"];

    treePositions.forEach(pos => {
        BABYLON.SceneLoader.ImportMesh("", naturePath, treeTypes[pos.type], scene, function (meshes) {
            if (meshes.length > 0) {
                meshes[0].position = new BABYLON.Vector3(pos.x, 0, pos.z);
                meshes[0].scaling = new BABYLON.Vector3(2.5, 2.5, 2.5); // ESCALA 2.5x
                meshes[0].rotation.y = Math.random() * Math.PI * 2;

                // SIN colisiones (decoración perimetral)
                meshes.forEach(mesh => {
                    mesh.checkCollisions = false;
                });
            }
        });
    });

    // FLORES EN JARDINES (10 flores - 2 por casa)
    const flowerPositions = [
        // Casa 1 (x=-10, z=15)
        { x: -7.5, z: 15.5, type: 0 },
        { x: -6.5, z: 15.5, type: 1 },

        // Casa 2 (x=-10, z=5)
        { x: -7.5, z: 5.5, type: 1 },
        { x: -6.5, z: 5.5, type: 2 },

        // Casa 3 (x=-10, z=-5)
        { x: -7.5, z: -4.5, type: 2 },
        { x: -6.5, z: -4.5, type: 0 },

        // Casa 4 (x=10, z=15)
        { x: 6.5, z: 15.5, type: 0 },
        { x: 7.5, z: 15.5, type: 1 },

        // Casa 5 (x=10, z=5)
        { x: 6.5, z: 5.5, type: 1 },
        { x: 7.5, z: 5.5, type: 2 }
    ];

    const flowerTypes = ["flower_purpleA.glb", "flower_redA.glb", "flower_yellowA.glb"];

    flowerPositions.forEach(pos => {
        BABYLON.SceneLoader.ImportMesh("", naturePath, flowerTypes[pos.type], scene, function (meshes) {
            if (meshes.length > 0) {
                meshes[0].position = new BABYLON.Vector3(pos.x, 0, pos.z);
                meshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5); // ESCALA 1.5x
                meshes[0].rotation.y = Math.random() * Math.PI * 2;
            }
        });
    });

    // ROCAS DECORATIVAS (4 rocas en esquinas)
    const rockPositions = [
        { x: -15, z: -15, type: 0 },
        { x: -15, z: 20,  type: 1 },
        { x: 15,  z: -15, type: 0 },
        { x: 15,  z: 20,  type: 1 }
    ];

    const rockTypes = ["rock_smallA.glb", "rock_smallB.glb"];

    rockPositions.forEach(pos => {
        BABYLON.SceneLoader.ImportMesh("", naturePath, rockTypes[pos.type], scene, function (meshes) {
            if (meshes.length > 0) {
                meshes[0].position = new BABYLON.Vector3(pos.x, 0, pos.z);
                meshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5); // ESCALA 1.5x
                meshes[0].rotation.y = Math.random() * Math.PI * 2;

                // SIN colisiones (decoración)
                meshes.forEach(mesh => {
                    mesh.checkCollisions = false;
                });
            }
        });
    });
}
