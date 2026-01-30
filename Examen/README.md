# Cartero del Vecindario

**Vertical Slice - Prototipo Jugable | Examen Final**

Un juego 3D en primera persona desarrollado con **Babylon.js** donde el jugador asume el rol de un cartero que debe recoger y entregar cartas en un vecindario suburbano.

---

## Descripción del Juego

Este proyecto es un **Vertical Slice** con **Enfoque en Mecánicas** que demuestra un ciclo de gameplay completo y pulido:

- Sistema de recolección y entrega de objetos
- Movimiento en primera persona (FPS)
- **Brújula direccional** que apunta al destino
- **Números 3D** visibles sobre cada casa
- Feedback audiovisual completo (sonidos sintéticos + partículas)
- UI/HUD minimalista con paleta cálida coherente

### Objetivo del Juego
1. **Recoge** la carta en la oficina postal (zona azul brillante)
2. **Sigue la brújula** para encontrar la casa destino
3. **Entrega** la carta en el buzón (zona verde)
4. **Repite** para completar más entregas

---

## Cómo Ejecutar el Prototipo

### Opción 1: Servidor Local (Recomendado)
```bash
# Navegar a la carpeta del proyecto
cd Examen

# Usar cualquier servidor HTTP local
npx serve .
# o
python -m http.server 8000
# o
php -S localhost:8000
```
Luego abrir `http://localhost:8000` en el navegador.

### Opción 2: Live Server (VS Code)
1. Instalar la extensión "Live Server" en VS Code
2. Abrir la carpeta `Examen/`
3. Click derecho en `index.html` → "Open with Live Server"

---

## Controles

| Tecla | Acción |
|-------|--------|
| **W/A/S/D** | Movimiento |
| **Mouse** | Mirar alrededor |
| **E** | Recoger / Entregar carta |
| **ESC** | Liberar cursor |
| **🔊** | Silenciar / Activar audio |

---

## Tecnologías Utilizadas

- **Motor 3D**: [Babylon.js](https://www.babylonjs.com/) v8.31
- **Lenguaje**: JavaScript ES6+ (Modules)
- **Assets 3D**: [Kenney.nl](https://kenney.nl/) (City Kit, Nature Kit) - CC0 License
- **Audio**: Web Audio API (síntesis de sonido procedural)
- **Tipografía**: Google Fonts (Inter)
- **Estilos**: CSS3 con variables CSS, animaciones y backdrop-filter

---

## Estructura del Proyecto

```
Examen/
├── index.html          # Punto de entrada y UI/HUD minimalista
├── README.md           # Este archivo
│
├── js/                 # Código JavaScript modular (14 archivos)
│   ├── main.js         # Inicialización y loop principal
│   ├── config.js       # Variables globales y estado del juego
│   ├── camera.js       # Sistema de cámara FPS con colisiones
│   ├── player.js       # Representación del jugador
│   ├── controls.js     # Manejo de entrada (teclado)
│   ├── interactions.js # Proximidad, crosshair interactivo, brújula
│   ├── gameLogic.js    # Mecánicas principales (pickup/delivery)
│   ├── lights.js       # Iluminación de escena
│   ├── environment.js  # Terreno y oficina postal
│   ├── objects.js      # Cartas, casas, buzones, números 3D
│   ├── decorations.js  # Farolas, árboles, flores
│   ├── audio.js        # Sistema de audio (Patrón Singleton)
│   └── effects.js      # Partículas y efectos visuales
│
└── assets/             # Recursos 3D y texturas
    ├── ground_asphalt.jpg
    ├── letter.png
    ├── mailbox_lp.glb
    ├── kenney_city-kit-roads/
    ├── kenney_city-kit-suburban_20/
    └── kenney_nature-kit/
```

---

## Características Técnicas Destacadas

### 1. Sistema de Audio - Patrón Singleton (audio.js)

Implementación de un **AudioManager** usando el patrón Singleton con Web Audio API:

```javascript
class AudioManager {
    static instance = null;

    constructor() {
        if (AudioManager.instance) return AudioManager.instance;
        this.ctx = new AudioContext();
        AudioManager.instance = this;
    }

    playPickup()   // Tono ascendente tipo "coin collect"
    playDelivery() // Acorde mayor de éxito (C-E-G)
    playError()    // Tono de rechazo
}
```

### 2. Sistema de Navegación - Brújula Direccional

La brújula en el HUD apunta dinámicamente hacia la casa destino:

```javascript
export function updateCompass() {
    // Calcula ángulo entre dirección de la cámara y objetivo
    const angleToTarget = Math.atan2(directionToTarget.x, directionToTarget.z);
    const cameraAngle = Math.atan2(cameraDirection.x, cameraDirection.z);
    const relativeAngle = angleToTarget - cameraAngle;

    // Rota la flecha CSS
    compassArrow.style.transform = `rotate(${degrees}deg)`;
}
```

### 3. Señalización Visual - Números 3D

Cada casa tiene un número 3D visible usando DynamicTexture:

```javascript
function createHouseNumber(scene, id, x, z) {
    const dynamicTexture = new BABYLON.DynamicTexture(...);
    ctx.fillText(id.toString(), 64, 68); // Dibuja número

    const numberPlane = BABYLON.MeshBuilder.CreatePlane(...);
    numberPlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
}
```

### 4. Crosshair Interactivo

El crosshair cambia de apariencia cuando está sobre un objeto interactivo:

```javascript
export function setCrosshairInteractive(isInteractive) {
    if (isInteractive) {
        crosshair.classList.add('interactive'); // Punto → Anillo naranja
    }
}
```

### 5. Paleta de Colores Coherente

Variables CSS para consistencia visual:

```css
:root {
    --color-primary: #E85D04;    /* Naranja cálido */
    --color-secondary: #F48C06;  /* Naranja claro */
    --color-accent: #FAA307;     /* Amarillo dorado */
    --color-success: #52B788;    /* Verde suave */
    --color-text: #FEFAE0;       /* Texto crema */
}
```

---

## Mejoras Implementadas (Según Feedback)

| Área | Mejora |
|------|--------|
| **UI/UX** | Paleta cálida coherente, HUD minimalista, tipografía legible (Inter) |
| **Navegación** | Brújula direccional que apunta al destino |
| **Señalización** | Números 3D flotantes sobre cada casa |
| **Crosshair** | Cambia de color al estar sobre objetos interactivos |
| **Transiciones** | Fade in al iniciar, prompts con animación suave |
| **Feedback** | Partículas y flash de pantalla con colores coherentes |

---

## Marco MDA (Mechanics, Dynamics, Aesthetics)

### Mecánicas
- Movimiento en primera persona (WASD + mouse)
- Interacción por proximidad (tecla E)
- Brújula direccional hacia objetivo
- Sistema de contador de entregas

### Dinámicas
- Navegación orientada por brújula
- Identificación visual de casas por números
- Ciclo: **pickup → navigate → deliver → repeat**
- Feedback inmediato en cada acción

### Estéticas
- **Satisfacción**: Feedback audiovisual gratificante (confetti, sonidos)
- **Orientación**: Brújula y números eliminan frustración de búsqueda
- **Inmersión**: Paleta cálida crea ambiente de vecindario acogedor
- **Logro**: Contador visible motiva a continuar

### Reflexión Crítica
> "La mecánica de recoger y entregar, combinada con la brújula direccional, elimina la frustración de la búsqueda aleatoria y permite al jugador enfocarse en la satisfacción de completar entregas. El feedback audiovisual inmediato (partículas naranjas, sonidos de éxito) refuerza la sensación de logro y crea un ciclo de juego gratificante."

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        main.js                              │
│              (Inicialización y Loop Principal)              │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   config.js   │   │  interactions.js │   │   gameLogic.js  │
│ (Estado Global│   │ (Proximidad,     │   │ (Pickup/Deliver)│
│  Singleton)   │   │  Brújula)        │   │                 │
└───────────────┘   └─────────────────┘   └─────────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   audio.js    │   │   effects.js    │   │   objects.js    │
│  (Singleton   │   │  (Partículas,   │   │ (Casas, Cartas, │
│   Web Audio)  │   │   Flash, Shake) │   │  Números 3D)    │
└───────────────┘   └─────────────────┘   └─────────────────┘
```

---

## Solución de Problemas

### El audio no funciona
- El audio requiere interacción del usuario (click en "Jugar")
- Verifica que el navegador no esté bloqueando Web Audio API

### La brújula no se mueve
- Asegúrate de que el juego ha iniciado (click en "Jugar")
- La brújula apunta hacia el buzón de la casa destino

### Los números de las casas no se ven
- Acércate un poco; los números están a 6 unidades de altura
- Verifica que los modelos se cargaron (ver consola)

---

## Créditos

- **Motor 3D**: Babylon.js por Babylon.js Team
- **Assets 3D**: Kenney (kenney.nl) - CC0 License
- **Tipografía**: Inter por Rasmus Andersson
- **Desarrollo**: [Tu Nombre]
- **Curso**: Software para Videojuegos - EPN

---

## Información del Proyecto

- **Tipo**: Vertical Slice - Examen Final
- **Enfoque**: Mecánicas de gameplay
- **Versión**: 3.0 (con mejoras de feedback)
- **Fecha**: Enero 2026

---

*Este proyecto demuestra un ciclo de gameplay pulido con navegación intuitiva, feedback audiovisual coherente, y arquitectura modular siguiendo patrones de diseño de software.*
