import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

const BabylonScene = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear el motor de Babylon.js
    const engine = new BABYLON.Engine(canvasRef.current, true);
    engineRef.current = engine;

    // Crear la escena
    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;

    // Configurar el color de fondo con un azul oscuro nocturno
    scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.1, 1);

    // Crear cámara (tercera persona, seguirá al personaje)
    const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 3,
      10,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 20;

    // Agregar iluminación
    const light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    light.intensity = 0.8;

    // Luz direccional para sombras
    const dirLight = new BABYLON.DirectionalLight(
      "dirLight",
      new BABYLON.Vector3(-1, -2, -1),
      scene
    );
    dirLight.position = new BABYLON.Vector3(20, 40, 20);
    dirLight.intensity = 0.5;

    // Crear el suelo del laberinto
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 50, height: 50 },
      scene
    );
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);

    // Cargar la textura del piso
    const groundTexture = new BABYLON.Texture("/Textures/piso.jpg", scene);
    groundTexture.uScale = 3; // Repetir la textura 3 veces horizontalmente
    groundTexture.vScale = 3; // Repetir la textura 3 veces verticalmente

    groundMaterial.diffuseTexture = groundTexture;
    ground.material = groundMaterial;
    ground.checkCollisions = true;

    // Crear paredes del laberinto
    createMazeWalls(scene);

    // Crear cielo estrellado
    createStarrySky(scene);

    // Variable para almacenar el personaje
    let characterMesh = null;
    let animationGroups = [];

    // Crear un placeholder temporal (cilindro) para representar al personaje mientras carga
    const placeholder = BABYLON.MeshBuilder.CreateCylinder(
      "placeholder",
      { height: 2, diameter: 0.5 },
      scene
    );
    placeholder.position = new BABYLON.Vector3(0, 1, 0);
    const placeholderMat = new BABYLON.StandardMaterial("placeholderMat", scene);
    placeholderMat.diffuseColor = new BABYLON.Color3(0, 0.5, 1); // Azul EPN
    placeholder.material = placeholderMat;

    // La cámara sigue al placeholder inicialmente
    camera.setTarget(placeholder.position);
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 3;
    camera.radius = 10;

    // Cargar el modelo del perro
    BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "/models/dog/source/",
      "animal  10.glb",
      scene
    ).then((result) => {
      const meshes = result.meshes;
      const animationGroupsLoaded = result.animationGroups;
        console.log("✅ Personaje cargado exitosamente!");
        console.log("📦 Meshes:", meshes.length);
        console.log("🎬 Animaciones:", animationGroupsLoaded.length);

        // El primer mesh es el root
        characterMesh = meshes[0];

        // Posicionar el personaje en el centro del laberinto
        // Ajustar Y para que esté sobre el piso, no hundido
        characterMesh.position = new BABYLON.Vector3(0, 1.5, 0);

        // Rotación inicial del modelo del perro
        characterMesh.rotation.y = 0;

        // Ajustar escala del perro (puede necesitar ajuste según el tamaño del modelo)
        characterMesh.scaling = new BABYLON.Vector3(3, 3, 3);

        console.log("📍 Posición del personaje:", characterMesh.position);
        console.log("📏 Escala del personaje:", characterMesh.scaling);
        console.log("🔄 Rotación inicial del personaje:", characterMesh.rotation.y);

        // Hacer todos los meshes visibles y con material
        meshes.forEach((mesh, index) => {
          mesh.isVisible = true;
          console.log(`Mesh ${index}:`, mesh.name, "visible:", mesh.isVisible);

          // Si el mesh no tiene material, darle uno básico
          if (!mesh.material && mesh.name !== "__root__") {
            const mat = new BABYLON.StandardMaterial(`charMat${index}`, scene);
            mat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
            mesh.material = mat;
          }
        });

        // Guardar animaciones
        animationGroups = animationGroupsLoaded;

        // Reproducir la primera animación (usualmente es idle o walk)
        if (animationGroups.length > 0) {
          console.log("▶️ Reproduciendo animación:", animationGroups[0].name);
          animationGroups[0].start(true, 1.0, animationGroups[0].from, animationGroups[0].to, false);
        }

        // Ocultar el placeholder ya que el personaje se cargó
        placeholder.dispose();

        // Hacer que la cámara siga al personaje - ajustar posición inicial
        camera.setTarget(characterMesh.position);
        camera.alpha = -Math.PI / 2; // Rotación horizontal
        camera.beta = Math.PI / 3;    // Ángulo vertical
        camera.radius = 10;             // Distancia al personaje (un poco más lejos)

        // ===== SISTEMA DE MOVIMIENTO Y ROTACIÓN RECONSTRUIDO =====

        // Variables para controlar el movimiento
        const inputMap = {};
        const speed = 0.1;
        //const rotationSpeed = 0.1;
        const characterRadius = 0.5;

        // Capturar input del teclado
        scene.onKeyboardObservable.add((kbInfo) => {
          const key = kbInfo.event.key.toLowerCase();
          if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            inputMap[key] = true;
          } else if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYUP) {
            inputMap[key] = false;
          }
        });

        // Loop principal de actualización
        scene.registerBeforeRender(() => {
          if (!characterMesh) return;

          // Obtener input
          const forward = inputMap['w'] || inputMap['arrowup'];
          const backward = inputMap['s'] || inputMap['arrowdown'];
          const left = inputMap['a'] || inputMap['arrowleft'];
          const right = inputMap['d'] || inputMap['arrowright'];

          // Calcular dirección de movimiento en espacio local (relativo a la cámara)
          let moveX = 0;
          let moveZ = 0;

          if (forward) moveX = 1;    // W = adelante
          if (backward) moveX = -1;  // S = atrás
          if (left) moveZ = 1;       // A = izquierda
          if (right) moveZ = -1;     // D = derecha

          // Si hay movimiento
          if (moveX !== 0 || moveZ !== 0) {
            // Normalizar para movimiento diagonal consistente
            const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
            if (length > 0) {
              moveX /= length;
              moveZ /= length;
            }

            // Obtener la rotación de la cámara (solo en Y, horizontal)
            const cameraAngle = camera.alpha;

            // Rotar la dirección de movimiento según la cámara
            // CORREGIDO: invertir el cálculo para que coincida con la vista de la cámara
            const rotatedX = moveX * Math.cos(cameraAngle) + moveZ * Math.sin(cameraAngle);
            const rotatedZ = -moveX * Math.sin(cameraAngle) + moveZ * Math.cos(cameraAngle);

            // Guardar posición anterior para colisiones
            const previousPosition = characterMesh.position.clone();

            // Mover el personaje
            characterMesh.position.x += rotatedX * speed;
            characterMesh.position.z += rotatedZ * speed;

            // Detectar colisiones con paredes
            let hasCollision = false;
            scene.meshes.forEach((mesh) => {
              if (mesh.name.startsWith('wall') && mesh.checkCollisions) {
                const wallBounds = mesh.getBoundingInfo().boundingBox;
                const wallMin = wallBounds.minimumWorld;
                const wallMax = wallBounds.maximumWorld;
                const charPos = characterMesh.position;

                const closestX = Math.max(wallMin.x, Math.min(charPos.x, wallMax.x));
                const closestZ = Math.max(wallMin.z, Math.min(charPos.z, wallMax.z));

                const distanceX = charPos.x - closestX;
                const distanceZ = charPos.z - closestZ;
                const distance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ);

                if (distance < characterRadius) {
                  hasCollision = true;
                }
              }
            });

            // Revertir si hay colisión
            if (hasCollision) {
              characterMesh.position = previousPosition;
            }

            // ROTAR EL PERSONAJE hacia donde se mueve
            // Calcular ángulo objetivo basado en la dirección de movimiento
            // Probando diferentes fórmulas para que el perro mire correctamente

            // Opción 1: atan2 estándar
            let targetRotation = Math.atan2(rotatedX, rotatedZ);

            // Agregar offset de 90 grados para compensar la orientación del modelo
            // Si el perro mira mal, prueba cambiar este valor: 0, Math.PI/2, Math.PI, -Math.PI/2
            const modelOrientationOffset = -Math.PI / 2;
            targetRotation += modelOrientationOffset;

            // Calcular diferencia de ángulo (camino más corto)
            let angleDiff = targetRotation - characterMesh.rotation.y;

            // Normalizar entre -PI y PI
            while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

            // Aplicar rotación más rápida para que sea más visible
            characterMesh.rotation.y += angleDiff * 0.2;
          }

          // La cámara siempre sigue al personaje
          camera.target = characterMesh.position;
        });
      })
    .catch((error) => {
        console.error("❌ Error al cargar el personaje:", error);
        console.log("ℹ️ Usando placeholder como personaje");

        // Si falla la carga, usar el placeholder como personaje
        characterMesh = placeholder;

        // Variables para movimiento del placeholder
        let forward = false;
        let backward = false;
        let left = false;
        let right = false;
        const speed = 0.1;

        // Controles de teclado para el placeholder
        scene.onKeyboardObservable.add((kbInfo) => {
          switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
              switch (kbInfo.event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                  forward = true;
                  break;
                case 's':
                case 'arrowdown':
                  backward = true;
                  break;
                case 'a':
                case 'arrowleft':
                  left = true;
                  break;
                case 'd':
                case 'arrowright':
                  right = true;
                  break;
              }
              break;
            case BABYLON.KeyboardEventTypes.KEYUP:
              switch (kbInfo.event.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                  forward = false;
                  break;
                case 's':
                case 'arrowdown':
                  backward = false;
                  break;
                case 'a':
                case 'arrowleft':
                  left = false;
                  break;
                case 'd':
                case 'arrowright':
                  right = false;
                  break;
              }
              break;
          }
        });

        // Loop de actualización del placeholder
        scene.registerBeforeRender(() => {
          if (!characterMesh) return;

          const isMoving = forward || backward || left || right;

          if (isMoving) {
            // Guardar posición anterior para poder revertir si hay colisión
            const previousPosition = characterMesh.position.clone();

            // Mover el placeholder
            if (forward) characterMesh.position.z += speed;
            if (backward) characterMesh.position.z -= speed;
            if (left) characterMesh.position.x -= speed;
            if (right) characterMesh.position.x += speed;

            // Detectar colisiones con las paredes
            let hasCollision = false;
            const characterRadius = 0.5; // Radio del cilindro de colisión del personaje

            // Verificar colisión con todas las paredes
            scene.meshes.forEach((mesh) => {
              if (mesh.name.startsWith('wall') && mesh.checkCollisions) {
                // Obtener los límites de la pared
                const wallBounds = mesh.getBoundingInfo().boundingBox;
                const wallMin = wallBounds.minimumWorld;
                const wallMax = wallBounds.maximumWorld;

                // Verificar si el personaje está dentro o muy cerca de la pared
                const charPos = characterMesh.position;

                // Calcular el punto más cercano de la pared al personaje
                const closestX = Math.max(wallMin.x, Math.min(charPos.x, wallMax.x));
                const closestZ = Math.max(wallMin.z, Math.min(charPos.z, wallMax.z));

                // Calcular distancia entre el personaje y el punto más cercano
                const distanceX = charPos.x - closestX;
                const distanceZ = charPos.z - closestZ;
                const distance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ);

                // Si la distancia es menor que el radio del personaje, hay colisión
                if (distance < characterRadius) {
                  hasCollision = true;
                }
              }
            });

            // Si hay colisión, revertir el movimiento
            if (hasCollision) {
              characterMesh.position = previousPosition;
            }
          }

          // Actualizar posición de la cámara
          camera.setTarget(characterMesh.position);
        });
      });

    // Loop de renderizado
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100vh',
        display: 'block',
        outline: 'none'
      }}
    />
  );
};

// Función para crear las paredes del laberinto
function createMazeWalls(scene) {
  const wallMaterial = new BABYLON.StandardMaterial("wallMat", scene);

  // Cargar la textura de la pared
  const wallTexture = new BABYLON.Texture("/Textures/fondoPared.jpg", scene);
  wallTexture.uScale = 2; // Repetir la textura horizontalmente
  wallTexture.vScale = 1; // Repetir la textura verticalmente

  wallMaterial.diffuseTexture = wallTexture;

  // Diseño del laberinto más complejo
  const walls = [
    // Paredes exteriores
    { x: 0, z: 25, width: 50, depth: 1 },
    { x: 0, z: -25, width: 50, depth: 1 },
    { x: 25, z: 0, width: 1, depth: 50 },
    { x: -25, z: 0, width: 1, depth: 50 },

    // Paredes internas del laberinto
    { x: 10, z: 0, width: 1, depth: 20 },
    { x: -10, z: 5, width: 1, depth: 15 },
    { x: 0, z: 10, width: 15, depth: 1 },
    { x: 5, z: -10, width: 20, depth: 1 },
    { x: -15, z: -10, width: 10, depth: 1 },
    { x: 15, z: 15, width: 15, depth: 1 },
  ];

  walls.forEach((wallData, index) => {
    const wall = BABYLON.MeshBuilder.CreateBox(
      `wall${index}`,
      { width: wallData.width, height: 5, depth: wallData.depth },
      scene
    );
    wall.position = new BABYLON.Vector3(wallData.x, 2.5, wallData.z);
    wall.material = wallMaterial;
    wall.checkCollisions = true;
  });
}

// Función para crear un cielo estrellado con partículas
function createStarrySky(scene) {
  // Crear un sistema de partículas para las estrellas
  const particleSystem = new BABYLON.ParticleSystem("stars", 2000, scene);

  // Crear una textura para las partículas (estrella simple)
  particleSystem.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/textures/flare.png", scene);

  // Posición del emisor (centro del laberinto, muy alto)
  particleSystem.emitter = new BABYLON.Vector3(0, 50, 0);
  particleSystem.minEmitBox = new BABYLON.Vector3(-100, 0, -100); // Area de emisión
  particleSystem.maxEmitBox = new BABYLON.Vector3(100, 50, 100);

  // Colores de las estrellas (blanco y amarillo pálido)
  particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
  particleSystem.color2 = new BABYLON.Color4(1, 1, 0.8, 1);
  particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 0);

  // Tamaño de las estrellas
  particleSystem.minSize = 0.3;
  particleSystem.maxSize = 1.5;

  // Vida de las partículas (efecto de parpadeo)
  particleSystem.minLifeTime = 2;
  particleSystem.maxLifeTime = 5;

  // Tasa de emisión
  particleSystem.emitRate = 400;

  // Modo de mezcla para que brillen
  particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

  // Gravedad (sin gravedad para que floten)
  particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

  // Dirección de las partículas (movimiento mínimo)
  particleSystem.direction1 = new BABYLON.Vector3(-0.1, -0.1, -0.1);
  particleSystem.direction2 = new BABYLON.Vector3(0.1, 0.1, 0.1);

  // Velocidad mínima y máxima
  particleSystem.minEmitPower = 0.01;
  particleSystem.maxEmitPower = 0.05;
  particleSystem.updateSpeed = 0.005;

  // Iniciar el sistema de partículas
  particleSystem.start();

  // Crear una esfera gigante semitransparente para simular un domo celeste (opcional)
  const skyDome = BABYLON.MeshBuilder.CreateSphere("skyDome", { diameter: 200, segments: 32 }, scene);
  const skyMaterial = new BABYLON.StandardMaterial("skyMat", scene);

  // Crear un gradiente de azul oscuro a negro
  skyMaterial.diffuseColor = new BABYLON.Color3(0.02, 0.02, 0.15);
  skyMaterial.emissiveColor = new BABYLON.Color3(0.01, 0.01, 0.08);
  skyMaterial.backFaceCulling = false; // Ver desde dentro
  skyMaterial.alpha = 0.3;

  skyDome.material = skyMaterial;
  skyDome.position.y = 30;

  return particleSystem;
}

export default BabylonScene;