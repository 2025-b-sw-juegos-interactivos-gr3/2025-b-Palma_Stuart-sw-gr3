# Arquitectura Técnica
## Cartero del Vecindario

**Versión:** 1.0
**Fecha:** Enero 2026
**Autor:** Palma Stuart

---

## 1. Stack Tecnológico

| Capa | Tecnología | Versión | Justificación |
|------|------------|---------|---------------|
| **Motor 3D** | Babylon.js | 8.31 | Web-native, documentación extensa, comunidad activa |
| **Lenguaje** | JavaScript | ES6+ | Módulos nativos, soporte universal en navegadores |
| **Audio** | Web Audio API | Nativo | Síntesis procedural sin archivos externos |
| **UI** | HTML5 + CSS3 | - | Flexibilidad, familiaridad, sin frameworks |
| **Servidor** | Cualquier HTTP | - | Solo archivos estáticos |

---

## 2. Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              NAVEGADOR                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         index.html                                  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │   Canvas     │  │     HUD      │  │   Prompts    │             │ │
│  │  │ (Babylon.js) │  │  (HTML/CSS)  │  │  (HTML/CSS)  │             │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      JavaScript Modules                             │ │
│  │                                                                      │ │
│  │   ┌─────────┐    ┌─────────────┐    ┌─────────────┐                │ │
│  │   │ main.js │───►│  config.js  │◄───│ gameLogic.js│                │ │
│  │   │ (Entry) │    │ (Singleton) │    │  (Logic)    │                │ │
│  │   └────┬────┘    └──────┬──────┘    └──────┬──────┘                │ │
│  │        │                │                   │                       │ │
│  │        ▼                ▼                   ▼                       │ │
│  │   ┌─────────┐    ┌─────────────┐    ┌─────────────┐                │ │
│  │   │camera.js│    │  audio.js   │    │ effects.js  │                │ │
│  │   │(FPS Cam)│    │ (Singleton) │    │   (VFX)     │                │ │
│  │   └─────────┘    └─────────────┘    └─────────────┘                │ │
│  │                                                                      │ │
│  │   ┌─────────┐    ┌─────────────┐    ┌─────────────┐                │ │
│  │   │objects.js│   │environment.js│   │decorations.js│               │ │
│  │   │ (Casas) │    │  (Terreno)  │    │  (Props)    │                │ │
│  │   └─────────┘    └─────────────┘    └─────────────┘                │ │
│  │                                                                      │ │
│  │   ┌─────────┐    ┌─────────────┐    ┌─────────────┐                │ │
│  │   │player.js│    │interactions.js│  │ controls.js │                │ │
│  │   │(Avatar) │    │  (Brújula)  │    │  (Input)    │                │ │
│  │   └─────────┘    └─────────────┘    └─────────────┘                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         Babylon.js Engine                           │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │
│  │  │  Scene   │  │ Meshes   │  │Materials │  │ Loaders  │           │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                    │                                     │
│                                    ▼                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                          Web APIs                                   │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │ │
│  │  │ WebGL 2  │  │Web Audio │  │  DOM     │  │Pointer   │           │ │
│  │  │          │  │   API    │  │  API     │  │Lock API  │           │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Diagrama de Clases UML

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              <<module>>                                  │
│                               config.js                                  │
│                         (Estado Global - Singleton)                      │
├─────────────────────────────────────────────────────────────────────────┤
│ - scene: BABYLON.Scene                                                   │
│ - camera: BABYLON.FreeCamera                                            │
│ - player: BABYLON.Mesh                                                  │
│ - letter: BABYLON.Mesh                                                  │
│ - mailbox: BABYLON.Mesh                                                 │
│ - playerHasLetter: boolean = false                                      │
│ - deliveryCount: number = 0                                             │
│ - gameStarted: boolean = false                                          │
│ - currentTargetHouse: number = 0                                        │
│ - houses: BABYLON.Mesh[] = []                                           │
│ - deliveryZones: BABYLON.Mesh[] = []                                    │
│ - housePositions: BABYLON.Vector3[] = []                                │
│ - statusDiv: HTMLElement                                                │
│ - targetDiv: HTMLElement                                                │
│ - deliveriesDiv: HTMLElement                                            │
│ - crosshair: HTMLElement                                                │
│ - compassArrow: HTMLElement                                             │
├─────────────────────────────────────────────────────────────────────────┤
│ + setScene(s: Scene): void                                              │
│ + setCamera(c: FreeCamera): void                                        │
│ + setPlayer(p: Mesh): void                                              │
│ + setLetter(l: Mesh): void                                              │
│ + setMailbox(m: Mesh): void                                             │
│ + setPlayerHasLetter(value: boolean): void                              │
│ + setGameStarted(value: boolean): void                                  │
│ + setCurrentTargetHouse(value: number): void                            │
│ + incrementDeliveryCount(): void                                        │
│ + addHouse(h: Mesh): void                                               │
│ + addDeliveryZone(d: Mesh): void                                        │
│ + addHousePosition(pos: Vector3): void                                  │
└─────────────────────────────────────────────────────────────────────────┘
                                    △
                                    │ imports
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│    <<class>>      │    │    <<module>>     │    │    <<module>>     │
│   AudioManager    │    │    gameLogic.js   │    │  interactions.js  │
│    (Singleton)    │    │                   │    │                   │
├───────────────────┤    ├───────────────────┤    ├───────────────────┤
│ - instance: Audio │    │                   │    │ - promptVisible:  │
│   Manager = null  │    │                   │    │   boolean         │
│ - ctx: AudioCtx   │    │                   │    │                   │
│ - isMuted: bool   │    │                   │    │                   │
│ - sfxVolume: num  │    │                   │    │                   │
│ - musicVolume:num │    │                   │    │                   │
│ - ambientOsc: Osc │    │                   │    │                   │
├───────────────────┤    ├───────────────────┤    ├───────────────────┤
│ + init(): this    │    │ + pickupLetter(): │    │ + checkProximity()│
│ + resume(): void  │    │   void            │    │   : string|null   │
│ + playPickup():   │    │ + deliverLetter():│    │ + updateCompass():│
│   void            │    │   void            │    │   void            │
│ + playDelivery(): │    │ + resetLetter():  │    │ + setCrosshair    │
│   void            │    │   void            │    │   Interactive():  │
│ + playError():    │    │                   │    │   void            │
│   void            │    │                   │    │ + showInteraction │
│ + startAmbient(): │    │                   │    │   Prompt(): void  │
│   void            │    │                   │    │ + hideInteraction │
│ + stopAmbient():  │    │                   │    │   Prompt(): void  │
│   void            │    │                   │    │                   │
│ + toggleMute():   │    │                   │    │                   │
│   boolean         │    │                   │    │                   │
└───────────────────┘    └───────────────────┘    └───────────────────┘
        │                           │                           │
        └───────────────────────────┼───────────────────────────┘
                                    │
                                    ▼
                        ┌───────────────────┐
                        │    <<module>>     │
                        │    effects.js     │
                        ├───────────────────┤
                        │ - glowLayer:      │
                        │   GlowLayer       │
                        ├───────────────────┤
                        │ + setupPost       │
                        │   Processing():   │
                        │   GlowLayer       │
                        │ + createConfetti  │
                        │   Explosion():    │
                        │   ParticleSys     │
                        │ + createSparkles()│
                        │   : ParticleSys   │
                        │ + screenShake():  │
                        │   void            │
                        │ + screenFlash():  │
                        │   void            │
                        │ + createPickup    │
                        │   Effect(): void  │
                        │ + createDelivery  │
                        │   Celebration():  │
                        │   void            │
                        └───────────────────┘
```

---

## 4. Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CARTERO DEL VECINDARIO                           │
│                          Sistema de Juego                               │
└─────────────────────────────────────────────────────────────────────────┘

                                    ┌─────────┐
                                    │ JUGADOR │
                                    └────┬────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         │                               │                               │
         ▼                               ▼                               ▼
┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
│   Iniciar       │            │    Moverse      │            │   Interactuar   │
│   Juego         │            │                 │            │                 │
│   (UC-01)       │            │   (UC-02)       │            │   (UC-03)       │
└─────────────────┘            └─────────────────┘            └────────┬────────┘
                                                                       │
                                              ┌────────────────────────┼────────────────────────┐
                                              │                        │                        │
                                              ▼                        ▼                        ▼
                                    ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
                                    │  Recoger Carta  │      │ Entregar Carta  │      │ Silenciar Audio │
                                    │    (UC-03a)     │      │    (UC-03b)     │      │    (UC-04)      │
                                    └────────┬────────┘      └────────┬────────┘      └─────────────────┘
                                             │                        │
                                             ▼                        ▼
                                    ┌─────────────────┐      ┌─────────────────┐
                                    │  <<include>>    │      │  <<include>>    │
                                    │ Reproducir SFX  │      │ Mostrar Confetti│
                                    └─────────────────┘      └─────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                         DESCRIPCIÓN DE CASOS DE USO                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  UC-01: Iniciar Juego                                                   │
│  ─────────────────────                                                  │
│  Actor: Jugador                                                         │
│  Precondición: Página cargada, pantalla de título visible               │
│  Flujo:                                                                 │
│    1. Jugador hace clic en "Jugar"                                      │
│    2. Sistema oculta pantalla de título                                 │
│    3. Sistema muestra HUD                                               │
│    4. Sistema inicializa audio                                          │
│    5. Sistema bloquea puntero                                           │
│  Postcondición: Juego activo, jugador puede moverse                     │
│                                                                          │
│  UC-02: Moverse                                                         │
│  ─────────────                                                          │
│  Actor: Jugador                                                         │
│  Precondición: Juego iniciado                                           │
│  Flujo:                                                                 │
│    1. Jugador presiona WASD                                             │
│    2. Sistema mueve cámara en dirección correspondiente                 │
│    3. Jugador mueve mouse                                               │
│    4. Sistema rota cámara                                               │
│  Postcondición: Cámara en nueva posición/orientación                    │
│                                                                          │
│  UC-03a: Recoger Carta                                                  │
│  ─────────────────────                                                  │
│  Actor: Jugador                                                         │
│  Precondición: Cerca de carta, no tiene carta                           │
│  Flujo:                                                                 │
│    1. Sistema muestra prompt "Presiona E"                               │
│    2. Sistema cambia crosshair a interactivo                            │
│    3. Jugador presiona E                                                │
│    4. Sistema adjunta carta a cámara                                    │
│    5. Sistema reproduce sonido de pickup                                │
│    6. Sistema muestra partículas                                        │
│    7. Sistema actualiza estado a "tiene carta"                          │
│  Postcondición: Jugador tiene carta, UI actualizada                     │
│                                                                          │
│  UC-03b: Entregar Carta                                                 │
│  ──────────────────────                                                 │
│  Actor: Jugador                                                         │
│  Precondición: Tiene carta, cerca del buzón correcto                    │
│  Flujo:                                                                 │
│    1. Sistema muestra prompt "Presiona E"                               │
│    2. Jugador presiona E                                                │
│    3. Sistema desadjunta carta                                          │
│    4. Sistema reproduce sonido de éxito                                 │
│    5. Sistema muestra confetti y flash                                  │
│    6. Sistema incrementa contador                                       │
│    7. Sistema selecciona nueva casa destino                             │
│    8. Sistema resetea carta en oficina                                  │
│  Postcondición: Entrega completada, nueva misión asignada               │
│                                                                          │
│  UC-04: Silenciar Audio                                                 │
│  ──────────────────────                                                 │
│  Actor: Jugador                                                         │
│  Precondición: Juego activo                                             │
│  Flujo:                                                                 │
│    1. Jugador hace clic en botón de audio                               │
│    2. Sistema alterna estado de mute                                    │
│    3. Sistema actualiza icono del botón                                 │
│  Postcondición: Audio silenciado/activado                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Diagrama de Estados

### 5.1 Estado del Juego

```
                              ┌───────────────┐
                              │    INICIO     │
                              │  (Loading)    │
                              └───────┬───────┘
                                      │ página cargada
                                      ▼
                              ┌───────────────┐
                              │    TÍTULO     │
                              │  (Menu)       │◄─────────────────────────┐
                              └───────┬───────┘                          │
                                      │ click "Jugar"                    │
                                      ▼                                  │
                              ┌───────────────┐                          │
                              │    JUGANDO    │                          │
                              │  (In-Game)    │                          │
                              └───────┬───────┘                          │
                                      │                                  │
                    ┌─────────────────┼─────────────────┐                │
                    │                 │                 │                │
                    ▼                 ▼                 ▼                │
            ┌───────────────┐ ┌───────────────┐ ┌───────────────┐       │
            │   BUSCANDO    │ │   LLEVANDO    │ │  ENTREGANDO   │       │
            │    CARTA      │ │    CARTA      │ │               │       │
            └───────┬───────┘ └───────┬───────┘ └───────┬───────┘       │
                    │ pickup          │ cerca           │ deliver        │
                    │                 │ buzón           │                │
                    └────────►────────┴────────►────────┘                │
                                      │                                  │
                                      │ (cierra ventana)                 │
                                      ▼                                  │
                              ┌───────────────┐                          │
                              │   FIN SESIÓN  │──────────────────────────┘
                              │               │     (reload)
                              └───────────────┘
```

### 5.2 Estado del Jugador

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ESTADO DEL JUGADOR                               │
└─────────────────────────────────────────────────────────────────────────┘

                    ┌───────────────────────────────┐
                    │         SIN_CARTA             │
                    │  ─────────────────────────    │
                    │  playerHasLetter = false      │
                    │  Puede: recoger carta         │
                    │  No puede: entregar           │
                    └───────────────┬───────────────┘
                                    │
                                    │ pickupLetter()
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │         CON_CARTA             │
                    │  ─────────────────────────    │
                    │  playerHasLetter = true       │
                    │  Carta visible en cámara      │
                    │  Puede: entregar carta        │
                    │  No puede: recoger otra       │
                    └───────────────┬───────────────┘
                                    │
                                    │ deliverLetter()
                                    │
                                    ▼
                              ┌───────────┐
                              │  RESET    │
                              │           │
                              └─────┬─────┘
                                    │
                                    │ resetLetter()
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │         SIN_CARTA             │
                    │        (Nueva misión)         │
                    └───────────────────────────────┘
```

---

## 6. Diagrama de Secuencia: Entrega de Carta

```
┌─────────┐     ┌──────────┐     ┌───────────┐     ┌─────────┐     ┌─────────┐     ┌────────┐
│ Jugador │     │ controls │     │ gameLogic │     │ config  │     │  audio  │     │effects │
└────┬────┘     └────┬─────┘     └─────┬─────┘     └────┬────┘     └────┬────┘     └───┬────┘
     │               │                 │                │               │              │
     │  presiona E   │                 │                │               │              │
     │──────────────►│                 │                │               │              │
     │               │                 │                │               │              │
     │               │ checkProximity()│                │               │              │
     │               │────────────────►│                │               │              │
     │               │                 │                │               │              │
     │               │  return "mailbox"               │               │              │
     │               │◄────────────────│                │               │              │
     │               │                 │                │               │              │
     │               │ deliverLetter() │                │               │              │
     │               │────────────────►│                │               │              │
     │               │                 │                │               │              │
     │               │                 │ setPlayerHas   │               │              │
     │               │                 │ Letter(false)  │               │              │
     │               │                 │───────────────►│               │              │
     │               │                 │                │               │              │
     │               │                 │ incrementDeliveryCount()       │              │
     │               │                 │───────────────►│               │              │
     │               │                 │                │               │              │
     │               │                 │ playDelivery() │               │              │
     │               │                 │───────────────────────────────►│              │
     │               │                 │                │               │              │
     │               │                 │ createDeliveryCelebration()    │              │
     │               │                 │──────────────────────────────────────────────►│
     │               │                 │                │               │              │
     │               │                 │                │               │    confetti  │
     │               │                 │                │               │    + flash   │
     │               │                 │                │               │    + shake   │
     │               │                 │                │               │◄─────────────│
     │               │                 │                │               │              │
     │               │                 │ setCurrentTargetHouse(next)    │              │
     │               │                 │───────────────►│               │              │
     │               │                 │                │               │              │
     │               │                 │ resetLetter()  │               │              │
     │               │                 │───────────────►│               │              │
     │               │                 │                │               │              │
     │  UI actualizada                 │                │               │              │
     │◄────────────────────────────────│                │               │              │
     │               │                 │                │               │              │
```

---

## 7. Patrones de Diseño

### 7.1 Singleton Pattern

**Uso:** `AudioManager`, `config.js`

**Justificación:**
- El audio debe ser centralizado para evitar múltiples instancias
- El estado global debe ser único y accesible desde cualquier módulo

**Implementación:**
```javascript
class AudioManager {
    static instance = null;

    constructor() {
        if (AudioManager.instance) {
            return AudioManager.instance;
        }
        AudioManager.instance = this;
    }
}
```

### 7.2 Module Pattern

**Uso:** Todos los archivos `.js`

**Justificación:**
- Encapsulación de funcionalidad
- Separación de concerns
- Facilita el mantenimiento

**Implementación:**
```javascript
// camera.js
export function createCamera(scene, canvas) { ... }
```

### 7.3 Observer Pattern

**Uso:** Sistema de render loop

**Justificación:**
- Desacopla la lógica del render
- Permite múltiples suscriptores al loop

**Implementación:**
```javascript
scene.registerBeforeRender(() => {
    // Se ejecuta cada frame
});
```

### 7.4 Factory Pattern

**Uso:** Creación de objetos 3D

**Justificación:**
- Encapsula la lógica de creación compleja
- Facilita la creación de múltiples instancias similares

**Implementación:**
```javascript
function createHouse(id, posX, posZ, scene, buildingType, rotation) {
    // Crea y retorna un objeto casa completo
    return { house, deliveryZone, indicator };
}
```

---

## 8. Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FLUJO DE DATOS                                  │
└─────────────────────────────────────────────────────────────────────────┘

     INPUT                    PROCESO                     OUTPUT
  ┌─────────┐              ┌───────────┐              ┌─────────────┐
  │ Teclado │─────────────►│ controls  │─────────────►│ Movimiento  │
  │ (WASD)  │              │    .js    │              │ de cámara   │
  └─────────┘              └───────────┘              └─────────────┘

  ┌─────────┐              ┌───────────┐              ┌─────────────┐
  │  Mouse  │─────────────►│  camera   │─────────────►│ Rotación    │
  │         │              │    .js    │              │ de cámara   │
  └─────────┘              └───────────┘              └─────────────┘

  ┌─────────┐              ┌───────────┐              ┌─────────────┐
  │ Tecla E │─────────────►│ gameLogic │─────────────►│ Estado      │
  │         │              │    .js    │              │ del juego   │
  └─────────┘              └───────────┘              └─────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
             ┌───────────┐┌───────────┐┌───────────┐
             │  config   ││  audio    ││ effects   │
             │   .js     ││   .js     ││   .js     │
             └─────┬─────┘└─────┬─────┘└─────┬─────┘
                   │            │            │
                   ▼            ▼            ▼
             ┌───────────┐┌───────────┐┌───────────┐
             │    UI     ││  Sonido   ││ Partículas│
             │   (DOM)   ││ (Speaker) ││  (Canvas) │
             └───────────┘└───────────┘└───────────┘
```

---

## 9. Consideraciones de Rendimiento

| Aspecto | Implementación | Justificación |
|---------|----------------|---------------|
| Modelos 3D | Assets low-poly de Kenney | Menor carga de GPU |
| Texturas | Resolución limitada | Menor uso de VRAM |
| Partículas | Auto-dispose después de animación | Evita memory leaks |
| Audio | Web Audio API (síntesis) | Sin cargas de archivos |
| Colisiones | Ellipsoid simple | Cálculos rápidos |
| LOD | No implementado | Escena pequeña |

---

## 10. Seguridad

| Riesgo | Mitigación |
|--------|------------|
| XSS | No hay input de usuario persistente |
| Datos sensibles | No se manejan datos personales |
| Cheating | Juego single-player sin competencia |

---

**Documento de Arquitectura - Cartero del Vecindario**
**Autor:** Palma Stuart | **Versión 1.0** | **Enero 2026**
**Escuela Politécnica Nacional - Software para Videojuegos**
