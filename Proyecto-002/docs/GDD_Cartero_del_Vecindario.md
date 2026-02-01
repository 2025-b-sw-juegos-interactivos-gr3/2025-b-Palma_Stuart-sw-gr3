# Game Design Document (GDD)
## Cartero del Vecindario

**Versión:** 1.0
**Fecha:** Enero 2026
**Autores:** Stuart Palma, Paul Cajas
**Curso:** Software para Videojuegos - EPN

---

## I. Ficha Técnica y Concepto

### Información General

| Campo | Descripción |
|-------|-------------|
| **Título** | Cartero del Vecindario |
| **Género** | Simulación / Casual / Primera Persona |
| **Plataforma** | Web (Navegador) |
| **Motor** | Babylon.js |
| **Target** | Jugadores casuales, todas las edades (PEGI 3) |
| **Modo** | Un jugador |
| **Duración estimada** | Sesiones de 5-15 minutos |

### Elevator Pitch

> "Cartero del Vecindario es un juego casual en primera persona donde asumes el rol de un cartero novato. Tu misión es simple pero satisfactoria: recoger cartas en la oficina postal y entregarlas en los buzones correctos del vecindario. Con una brújula que te guía y efectos visuales gratificantes, cada entrega completada te hará querer hacer una más."

### Concepto Central

El jugador experimenta la rutina de un cartero en un vecindario suburbano tranquilo. El juego se enfoca en:
- **Simplicidad**: Mecánicas fáciles de aprender
- **Satisfacción**: Feedback audiovisual gratificante
- **Orientación**: Sistemas de navegación intuitivos
- **Progresión**: Contador de entregas que motiva a continuar

### Referencias e Inspiraciones

| Juego | Elemento tomado |
|-------|-----------------|
| *Untitled Goose Game* | Ambiente suburbano, tareas simples pero divertidas |
| *Paperboy* (1985) | Concepto de entrega de periódicos/cartas |
| *Death Stranding* | Satisfacción de completar entregas |
| *Cooking Mama* | Feedback visual y sonoro exagerado |

---

## II. Análisis MDA (Marco Teórico)

El Framework MDA (Mechanics, Dynamics, Aesthetics) de Hunicke, LeBlanc y Zubek nos permite diseñar desde la experiencia deseada hacia las reglas del sistema.

### 2.1 Aesthetics (Estéticas - La Experiencia Emocional)

Las estéticas son las respuestas emocionales que buscamos generar en el jugador.

| Estética | Descripción | Implementación |
|----------|-------------|----------------|
| **Satisfacción** | Sensación de logro al completar tareas | Confetti, sonidos de éxito, contador visible |
| **Sumisión/Relajación** | Estado de calma y desconexión | Ambiente suburbano tranquilo, música ambient suave |
| **Descubrimiento** | Explorar y conocer el vecindario | Casas con números, diferentes rutas posibles |
| **Competencia** | Deseo de mejorar y superar récords | Contador de entregas, tiempo implícito |

**Estética Principal:** SATISFACCIÓN
El jugador debe sentir una recompensa emocional inmediata cada vez que completa una entrega.

### 2.2 Dynamics (Dinámicas - Comportamientos Emergentes)

Las dinámicas son los patrones de comportamiento que emergen cuando el jugador interactúa con las mecánicas.

| Dinámica | Cómo se genera | Resultado |
|----------|----------------|-----------|
| **Ciclo de recompensa** | Pickup → Navigate → Deliver → Reward → Repeat | El jugador entra en un "flow state" |
| **Optimización de rutas** | Casas en diferentes posiciones + brújula | El jugador mentalmente planifica la ruta más eficiente |
| **Anticipación** | Acercarse al buzón con la carta | Tensión positiva antes de la recompensa |
| **Exploración guiada** | Brújula + números en casas | El jugador explora sin frustrarse |

**Dinámica Principal:** CICLO DE RECOMPENSA
El loop pickup → deliver → reward es corto (30-60 segundos) y constantemente gratificante.

### 2.3 Mechanics (Mecánicas - Las Reglas del Sistema)

Las mecánicas son las reglas formales y algoritmos que definen el juego.

#### Mecánicas de Movimiento
| Mecánica | Valor | Justificación |
|----------|-------|---------------|
| Velocidad del jugador | 0.2 unidades/frame | Balance entre control y rapidez |
| Gravedad | -0.15 Y | Sensación de peso realista |
| Altura de cámara | 1.6 unidades | Simula altura humana promedio |
| Ellipsoid de colisión | (0.5, 0.8, 0.5) | Permite pasar por espacios razonables |

#### Mecánicas de Interacción
| Mecánica | Valor | Justificación |
|----------|-------|---------------|
| Distancia de interacción | 2.5 unidades | Cercano pero no frustrante |
| Tecla de interacción | E | Estándar en juegos FPS |
| Feedback visual | Crosshair cambia de color | Indica posibilidad de interacción |

#### Mecánicas de Entrega
| Mecánica | Descripción |
|----------|-------------|
| Selección de casa | Random excluyendo la anterior |
| Parenting de carta | La carta se adjunta a la cámara |
| Offset de carta | (0.4, -0.25, 0.8) relativo a cámara |

#### Mecánicas de Feedback
| Evento | Audio | Visual |
|--------|-------|--------|
| Pickup | Tono ascendente (C5→C6) | Anillo expansivo + partículas |
| Delivery | Acorde mayor (C-E-G) | Confetti + screen flash + shake |
| Error | Tono descendente | Ninguno |

### 2.4 Diagrama MDA

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PERSPECTIVA DEL DISEÑADOR                    │
│                              (Bottom-Up)                             │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ MECHANICS (Reglas)                                                   │
│ ─────────────────                                                    │
│ • Movimiento WASD + Mouse                                           │
│ • Interacción con E a distancia < 2.5                               │
│ • Parenting de carta a cámara                                       │
│ • Selección random de siguiente casa                                │
│ • Audio sintético con Web Audio API                                 │
│ • Partículas con ParticleSystem                                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ DYNAMICS (Comportamientos)                                          │
│ ──────────────────────────                                          │
│ • Ciclo: Pickup → Navigate → Deliver → Reward                       │
│ • Optimización mental de rutas                                      │
│ • Anticipación antes de entregar                                    │
│ • Exploración del vecindario                                        │
│ • "Flow state" por ciclos cortos                                    │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│ AESTHETICS (Emociones)                                              │
│ ──────────────────────                                              │
│ • SATISFACCIÓN (principal)                                          │
│ • Relajación                                                        │
│ • Descubrimiento                                                    │
│ • Competencia suave                                                 │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         PERSPECTIVA DEL JUGADOR                      │
│                              (Top-Down)                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## III. Mecánicas Detalladas (Game System Design)

### 3.1 Core Loop

```
┌──────────────┐
│    INICIO    │
│  (Oficina)   │
└──────┬───────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│   BUSCAR     │     │   FEEDBACK   │
│   CARTA      │◄────┤   (Sonido +  │
│              │     │  Partículas) │
└──────┬───────┘     └──────────────┘
       │                    ▲
       ▼                    │
┌──────────────┐            │
│   RECOGER    │────────────┘
│   (E key)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   NAVEGAR    │◄─────┐
│  (Brújula)   │      │
└──────┬───────┘      │
       │              │
       ▼              │
┌──────────────┐      │
│  ENCONTRAR   │      │
│    CASA      │      │
└──────┬───────┘      │
       │              │
       ▼              │
┌──────────────┐      │
│   ENTREGAR   │      │
│   (E key)    │      │
└──────┬───────┘      │
       │              │
       ▼              │
┌──────────────┐      │
│ CELEBRACIÓN  │      │
│  (Confetti)  │      │
└──────┬───────┘      │
       │              │
       ▼              │
┌──────────────┐      │
│  CONTADOR++  │──────┘
│ Nueva casa   │
└──────────────┘
```

### 3.2 Sistema de Inventario

El sistema de inventario es binario (tiene carta / no tiene carta).

| Estado | playerHasLetter | Acciones disponibles |
|--------|-----------------|----------------------|
| Sin carta | `false` | Puede recoger carta |
| Con carta | `true` | Puede entregar carta |

**Implementación:** Variable booleana global con funciones setter.

### 3.3 Sistema de Navegación

#### Brújula Direccional
```
Ángulo = atan2(target.x - player.x, target.z - player.z) - cameraAngle
```

La flecha CSS rota según el ángulo relativo entre la dirección de la cámara y la posición del buzón destino.

#### Números 3D
Cada casa tiene un número flotante usando `DynamicTexture` de Babylon.js con `billboardMode = ALL` para que siempre mire al jugador.

### 3.4 Sistema de Feedback

#### Jerarquía de Feedback
1. **Inmediato** (0-100ms): Cambio de crosshair, sonido
2. **Corto** (100-500ms): Partículas, screen flash
3. **Medio** (500-2000ms): Animación de carta, confetti cayendo

#### Matriz de Feedback por Acción

| Acción | Visual | Audio | Háptico |
|--------|--------|-------|---------|
| Cerca de interactivo | Crosshair naranja | - | - |
| Pickup | Anillo + partículas azules | Tono ascendente | - |
| Delivery | Confetti + flash + shake | Acorde mayor | Screen shake |
| Error | - | Tono bajo | - |

### 3.5 Controles

| Input | Acción | Contexto |
|-------|--------|----------|
| W | Mover adelante | Siempre |
| S | Mover atrás | Siempre |
| A | Mover izquierda | Siempre |
| D | Mover derecha | Siempre |
| Mouse | Rotar cámara | Pointer lock activo |
| E | Interactuar | Cerca de objeto interactivo |
| ESC | Liberar cursor | Siempre |
| Click en 🔊 | Toggle mute | Siempre |

---

## IV. Narrativa y Mundo

### 4.1 Premisa

Es tu primer día como cartero en un tranquilo vecindario suburbano. Tu jefe te ha dado una tarea simple: recoger las cartas de la oficina postal y entregarlas en los buzones correctos. ¿Cuántas entregas puedes completar?

### 4.2 Personaje

**El Cartero (Jugador)**
- No tiene nombre definido (proyección del jugador)
- Visto en primera persona (solo se ven las manos con la carta)
- Motivación: Completar entregas, ser un buen cartero

### 4.3 Escenario

**El Vecindario**
- Ambiente suburbano estadounidense
- 5 casas residenciales con diferentes colores
- 1 oficina postal central
- Decoraciones: árboles, farolas, flores
- Hora del día: Atardecer (iluminación cálida)

### 4.4 Tono y Atmósfera

- **Relajado**: Sin presión de tiempo, sin enemigos
- **Colorido**: Paleta cálida (naranjas, dorados, verdes)
- **Satisfactorio**: Cada acción tiene feedback positivo

---

## V. Diseño de Niveles

### 5.1 Layout del Vecindario

```
        NORTE
          │
    ┌─────┴─────┐
    │           │
    │  CASA 3   │
    │    [3]    │
    │           │
    ├───────────┤
    │           │
    │  CASA 2   │
    │    [2]    │
    │           │
    ├───────────┤
    │           │
    │  CASA 1   │
    │    [1]    │
    │           │
    └─────┬─────┘
          │
OESTE ────┼──── ESTE
          │
    ┌─────┴─────┐        ┌───────────┐
    │           │        │           │
    │  OFICINA  │        │  CASA 4   │
    │  POSTAL   │        │    [4]    │
    │   [📮]    │        │           │
    │           │        ├───────────┤
    └───────────┘        │           │
                         │  CASA 5   │
                         │    [5]    │
                         │           │
                         └───────────┘
          │
        SUR
```

### 5.2 Posiciones Exactas

| Elemento | Posición (X, Y, Z) | Rotación |
|----------|-------------------|----------|
| Oficina Postal | (0, 0, -8) | 0° |
| Casa 1 | (-12, 0, -10) | 0° (mira Este) |
| Casa 2 | (-12, 0, 0) | 0° (mira Este) |
| Casa 3 | (-12, 0, 10) | 0° (mira Este) |
| Casa 4 | (12, 0, -10) | 180° (mira Oeste) |
| Casa 5 | (12, 0, 10) | 180° (mira Oeste) |
| Spawn Jugador | (0, 1.6, -10) | - |

### 5.3 Flujo del Nivel

1. **Inicio**: Jugador en spawn, ve la pantalla de título
2. **Orientación**: Al iniciar, la oficina postal está frente al jugador
3. **Primera entrega**: Casa 1 está cerca, fácil de encontrar
4. **Siguientes entregas**: Casas aleatorias, brújula ayuda

### 5.4 Elementos del Escenario

| Elemento | Cantidad | Propósito |
|----------|----------|-----------|
| Casas | 5 | Puntos de entrega |
| Oficina Postal | 1 | Punto de pickup |
| Árboles | 16 | Decoración, límites visuales |
| Farolas | 10 | Iluminación, landmarks |
| Flores | 10 | Decoración, color |
| Rocas | 4 | Decoración en esquinas |

---

## VI. Arte y Audio

### 6.1 Estilo Visual

**Dirección Artística:** Low-poly estilizado con colores vibrantes

| Aspecto | Descripción |
|---------|-------------|
| Estilo 3D | Low-poly, sin texturas detalladas |
| Paleta | Cálida (naranjas, dorados, verdes suaves) |
| Iluminación | Atardecer, sombras suaves |
| UI | Minimalista, glassmorphism |

### 6.2 Paleta de Colores

| Uso | Color | Hex |
|-----|-------|-----|
| Primario (UI, efectos) | Naranja | #E85D04 |
| Secundario | Naranja claro | #F48C06 |
| Acento | Dorado | #FAA307 |
| Éxito | Verde suave | #52B788 |
| Fondo UI | Gris oscuro | #1A1A1D |
| Texto | Crema | #FEFAE0 |
| Cielo | Azul claro | #80CCFF |

### 6.3 Assets 3D

**Fuente:** Kenney.nl (CC0 License)

| Pack | Assets utilizados |
|------|-------------------|
| City Kit Suburban | 5 tipos de casas |
| City Kit Roads | Farolas |
| Nature Kit | Árboles, flores, rocas |

### 6.4 Diseño de Audio

**Enfoque:** Síntesis procedural con Web Audio API

| Sonido | Tipo | Descripción |
|--------|------|-------------|
| Pickup | SFX | Tono ascendente C5→C6 (150ms) |
| Delivery | SFX | Acorde C-E-G arpegiado (600ms) |
| Error | SFX | Tono descendente (150ms) |
| Ambiente | Música | Drone suave en C2 con LFO |

**Justificación de síntesis:**
- Sin archivos externos = menor tamaño
- Control total sobre los parámetros
- Funciona offline

### 6.5 Referencias Visuales (Moodboard)

**Ambiente:** Vecindarios de películas como "Edward Scissorhands" o "The Truman Show"

**Estilo UI:** Interfaces minimalistas de juegos como "Journey" o "ABZU"

**Feedback:** Efectos de celebración como "Fall Guys" o "Candy Crush"

---

## VII. Arquitectura de Software

### 7.1 Stack Tecnológico

| Componente | Tecnología | Justificación |
|------------|------------|---------------|
| Motor 3D | Babylon.js 8.31 | Web-native, bien documentado |
| Lenguaje | JavaScript ES6+ | Módulos nativos, async/await |
| Audio | Web Audio API | Síntesis sin archivos |
| UI | HTML5 + CSS3 | Familiar, flexible |
| Build | Ninguno (vanilla) | Simplicidad, sin dependencias |

### 7.2 Estructura de Módulos

```
Examen/
├── index.html          # Punto de entrada, UI
└── js/
    ├── main.js         # Inicialización, loop
    ├── config.js       # Estado global (Singleton)
    ├── camera.js       # Sistema de cámara FPS
    ├── player.js       # Representación del jugador
    ├── controls.js     # Input handling
    ├── interactions.js # Proximidad, brújula
    ├── gameLogic.js    # Pickup/Delivery
    ├── lights.js       # Iluminación
    ├── environment.js  # Terreno, oficina
    ├── objects.js      # Casas, cartas, buzones
    ├── decorations.js  # Árboles, farolas
    ├── audio.js        # AudioManager (Singleton)
    └── effects.js      # Partículas, VFX
```

### 7.3 Patrones de Diseño

| Patrón | Uso | Archivo |
|--------|-----|---------|
| **Singleton** | AudioManager, Config | `audio.js`, `config.js` |
| **Module** | Separación de concerns | Todos los archivos |
| **Observer** | Eventos de render | `scene.registerBeforeRender` |
| **Factory** | Creación de objetos | `createHouse()`, `createLetter()` |

### 7.4 Diagrama de Clases Conceptual

```
┌─────────────────────────────────────────────────────────────────┐
│                          <<module>>                              │
│                           config.js                              │
│─────────────────────────────────────────────────────────────────│
│ - scene: Scene                                                   │
│ - camera: FreeCamera                                            │
│ - player: Mesh                                                  │
│ - letter: Mesh                                                  │
│ - playerHasLetter: boolean                                      │
│ - deliveryCount: number                                         │
│ - gameStarted: boolean                                          │
│ - houses[]: Mesh[]                                              │
│ - deliveryZones[]: Mesh[]                                       │
│ - housePositions[]: Vector3[]                                   │
│─────────────────────────────────────────────────────────────────│
│ + setScene(s): void                                             │
│ + setCamera(c): void                                            │
│ + setPlayerHasLetter(v): void                                   │
│ + incrementDeliveryCount(): void                                │
│ + addHousePosition(pos): void                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ imports
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          <<class>>                               │
│                        AudioManager                              │
│                         (Singleton)                              │
│─────────────────────────────────────────────────────────────────│
│ - instance: AudioManager                                        │
│ - ctx: AudioContext                                             │
│ - isMuted: boolean                                              │
│ - sfxVolume: number                                             │
│ - musicVolume: number                                           │
│─────────────────────────────────────────────────────────────────│
│ + init(): AudioManager                                          │
│ + playPickup(): void                                            │
│ + playDelivery(): void                                          │
│ + playError(): void                                             │
│ + startAmbient(): void                                          │
│ + toggleMute(): boolean                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          <<module>>                              │
│                         gameLogic.js                             │
│─────────────────────────────────────────────────────────────────│
│ + pickupLetter(): void                                          │
│ + deliverLetter(): void                                         │
│ + resetLetter(): void                                           │
└─────────────────────────────────────────────────────────────────┘
         │                                    │
         │ calls                              │ calls
         ▼                                    ▼
┌─────────────────────┐            ┌─────────────────────┐
│     audio.js        │            │     effects.js      │
│  (AudioManager)     │            │   (VFX System)      │
│─────────────────────│            │─────────────────────│
│ playPickup()        │            │ createPickupEffect()│
│ playDelivery()      │            │ createConfetti()    │
│                     │            │ screenShake()       │
└─────────────────────┘            └─────────────────────┘
```

### 7.5 Diagrama de Estados (Flujo del Juego)

```
┌─────────────┐
│   TÍTULO    │
│  (Inicial)  │
└──────┬──────┘
       │ click "Jugar"
       ▼
┌─────────────┐
│  BUSCANDO   │◄─────────────────────────┐
│   CARTA     │                          │
└──────┬──────┘                          │
       │ cerca de carta                  │
       ▼                                 │
┌─────────────┐                          │
│   PUEDE     │                          │
│  RECOGER    │                          │
└──────┬──────┘                          │
       │ presiona E                      │
       ▼                                 │
┌─────────────┐                          │
│   TIENE     │                          │
│   CARTA     │                          │
└──────┬──────┘                          │
       │ cerca de buzón correcto         │
       ▼                                 │
┌─────────────┐                          │
│   PUEDE     │                          │
│  ENTREGAR   │                          │
└──────┬──────┘                          │
       │ presiona E                      │
       ▼                                 │
┌─────────────┐                          │
│ CELEBRACIÓN │──────────────────────────┘
│  (1.5 seg)  │     reset + nueva casa
└─────────────┘
```

### 7.6 Persistencia de Datos

**Enfoque actual:** Sin persistencia (sesión única)

**Futuras mejoras posibles:**
- `localStorage` para guardar récord de entregas
- Estructura JSON propuesta:

```json
{
  "highScore": 15,
  "totalDeliveries": 47,
  "lastPlayed": "2026-01-29T21:00:00Z"
}
```

---

## VIII. Métricas y KPIs

### 8.1 Métricas de Diseño

| Métrica | Valor Objetivo | Justificación |
|---------|----------------|---------------|
| Tiempo por entrega | 30-60 seg | Ciclos cortos = más satisfacción |
| Distancia máxima | ~25 unidades | Navegable en tiempo razonable |
| Tiempo de feedback | < 100ms | Respuesta inmediata |

### 8.2 KPIs de Experiencia

| KPI | Cómo medirlo |
|-----|--------------|
| Entregas por sesión | Promedio del contador al cerrar |
| Tiempo de sesión | Tiempo desde "Jugar" hasta cerrar |
| Tasa de abandono | Sesiones < 3 entregas |

---

## IX. Alcance y Limitaciones

### 9.1 Incluido en el Vertical Slice

- ✅ Movimiento FPS completo
- ✅ Sistema de pickup/delivery
- ✅ 5 casas con selección aleatoria
- ✅ Brújula direccional
- ✅ Números 3D en casas
- ✅ Audio sintético
- ✅ Partículas y efectos
- ✅ HUD minimalista

### 9.2 Fuera del Alcance (Futuras versiones)

- ❌ Múltiples niveles/vecindarios
- ❌ Sistema de puntuación con tiempo
- ❌ Obstáculos (perros, charcos, etc.)
- ❌ Customización del cartero
- ❌ Modo multijugador
- ❌ Tabla de líderes online
- ❌ Versión móvil

---

## X. Conclusiones

### 10.1 Validación del Diseño

El framework MDA nos permitió:
1. **Definir la experiencia** (Satisfacción) antes de las mecánicas
2. **Justificar cada sistema** en función de la emoción deseada
3. **Balancear el feedback** para reforzar el ciclo de recompensa

### 10.2 Lecciones Aprendidas

1. **El feedback es crítico**: Sin partículas ni sonidos, el juego se siente vacío
2. **La orientación reduce frustración**: La brújula y números fueron esenciales
3. **Simplicidad > Complejidad**: Un loop simple bien pulido es más divertido

### 10.3 Próximos Pasos

1. Implementar persistencia con localStorage
2. Añadir más variedad de casas
3. Sistema de puntuación con tiempo
4. Pruebas con usuarios reales

---

**Documento creado para el curso de Software para Videojuegos**
**Escuela Politécnica Nacional - 2026**
