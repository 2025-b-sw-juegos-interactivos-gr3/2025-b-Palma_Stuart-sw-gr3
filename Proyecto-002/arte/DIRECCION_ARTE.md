# Dirección de Arte
## "Cartero del Vecindario"

**Versión:** 1.0
**Fecha:** Enero 2026
**Autores:** Stuart Palma, Paul Cajas

---

## Resumen Ejecutivo

Este documento establece la dirección artística para "Cartero del Vecindario", definiendo el estilo visual, paleta de colores, referencias y lineamientos para mantener coherencia en todos los assets del juego.

---

## 1. Estilo Visual

### 1.1 Descripción General

**Estilo:** Low-Poly Estilizado con influencias de ilustración editorial

El juego adopta un estilo **low-poly minimalista** con las siguientes características:

| Aspecto | Descripción |
|---------|-------------|
| Geometría | Formas simplificadas, pocos polígonos, sin suavizado |
| Texturas | Colores planos o gradientes suaves, sin texturas fotorrealistas |
| Iluminación | Suave y cálida, sombras definidas pero no duras |
| Atmósfera | Acogedora, nostálgica, como una tarde de verano |

### 1.2 Justificación del Estilo

1. **Rendimiento**: Low-poly permite ejecutar en navegadores sin problemas
2. **Legibilidad**: Siluetas claras facilitan identificar objetos importantes
3. **Coherencia**: Fácil de mantener consistencia visual con assets limitados
4. **Atmósfera**: Evoca sensación de cuento ilustrado o recuerdo nostálgico

### 1.3 Referencias Visuales

**Juegos de referencia:**
- *A Short Hike* - Paleta cálida, low-poly amigable
- *Untitled Goose Game* - Simplicidad, colores planos
- *Townscaper* - Arquitectura estilizada, colores pasteles
- *Unpacking* - Objetos cotidianos con encanto

**Estilos artísticos:**
- Ilustración editorial de los años 50-60
- Postales vintage de vecindarios americanos
- Arte de Charley Harper (formas geométricas naturales)

---

## 2. Paleta de Colores

### 2.1 Colores Primarios

```
┌─────────────────────────────────────────────────────────────┐
│  PALETA PRINCIPAL - CÁLIDA/URBANA                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ██████  Naranja Cálido    #E85D04   RGB(232, 93, 4)       │
│  ██████  Naranja Claro     #F48C06   RGB(244, 140, 6)      │
│  ██████  Amarillo Dorado   #FAA307   RGB(250, 163, 7)      │
│  ██████  Verde Suave       #52B788   RGB(82, 183, 136)     │
│  ██████  Crema/Texto       #FEFAE0   RGB(254, 250, 224)    │
│  ██████  Fondo Oscuro      #1A1A1D   RGB(26, 26, 29)       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Uso de Colores

| Color | Código | Uso Principal |
|-------|--------|---------------|
| Naranja Cálido | `#E85D04` | Acciones principales, botones, highlights |
| Naranja Claro | `#F48C06` | Hover states, acentos secundarios |
| Amarillo Dorado | `#FAA307` | Recompensas, feedback positivo, puntos de interés |
| Verde Suave | `#52B788` | Éxito, confirmación, estado "carta recogida" |
| Crema | `#FEFAE0` | Texto principal, elementos UI claros |
| Fondo Oscuro | `#1A1A1D` | Fondos UI, overlays |

### 2.3 Colores del Entorno 3D

```
CIELO Y AMBIENTE
├── Cielo día:        #87CEEB (azul claro)
├── Horizonte:        #FFF8DC (cornsilk, cálido)
├── Luz solar:        #FFFACD (lemon chiffon)
└── Sombras:          #2F4F4F (dark slate gray, suave)

VEGETACIÓN
├── Césped:           #7CB342 (verde lima suave)
├── Árboles copa:     #558B2F (verde bosque)
├── Troncos:          #795548 (marrón medio)
└── Arbustos:         #8BC34A (verde claro)

ARQUITECTURA
├── Casas base:       Variado por casa (pasteles)
├── Techos:           #8B4513 (saddle brown) / #B22222 (firebrick)
├── Madera:           #DEB887 (burlywood)
├── Concreto:         #A9A9A9 (dark gray)
└── Buzones:          #E85D04 (naranja principal)

OBJETOS ESPECIALES
├── Carta:            #FEFAE0 (crema) con sobre #E85D04
├── Oficina postal:   #4169E1 (royal blue) - destacar
└── Zona interacción: #00CED1 (cyan claro, glow)
```

---

## 3. Diseño de Elementos

### 3.1 Casas del Vecindario

**Características comunes:**
- Forma básica: cubo con techo a dos aguas
- Sin detalles excesivos (ventanas simples, puerta marcada)
- Cada casa tiene color distintivo para fácil identificación
- Número 3D flotante sobre cada casa

**Variaciones:**
```
Casa Tipo A          Casa Tipo B          Casa Tipo C
┌─────┐              ┌───────┐            ┌─────┐
│ /\  │              │  ___  │            │ /\  │
│/  \ │              │ / \ │             │/  \ │
├────┤              ├─────┤             ├────┤
│ □  │              │ □ □ │             │□  □│
│ ▯  │              │  ▯  │             │ ▯  │
└────┘              └─────┘             └────┘
Pequeña              Mediana              Con garaje
```

**Colores por casa:**
| Casa # | Color Base | Hex |
|--------|------------|-----|
| 1 | Amarillo pastel | #FFF9C4 |
| 2 | Rosa suave | #F8BBD9 |
| 3 | Verde menta | #C8E6C9 |
| 4 | Azul cielo | #BBDEFB |
| 5 | Lavanda | #E1BEE7 |
| 6 | Melocotón | #FFCCBC |

### 3.2 Oficina Postal

**Diseño distintivo:**
- Más grande que las casas residenciales
- Color azul distintivo (#4169E1)
- Bandera o letrero "CORREOS"
- Zona de pickup marcada con luz/glow
- Posición central o fácilmente visible

```
     CORREOS
    ┌───────┐
    │ ═══  │
    │ ▯ ▯  │
    │  ▮   │
    └──────┘
    ▓▓▓▓▓▓▓▓  <- Zona de pickup (glow azul)
```

### 3.3 Buzones

**Diseño:**
- Estilo americano clásico (cilíndrico con bandera)
- Color naranja (#E85D04) para visibilidad
- Bandera levantada = destino activo
- Efecto glow sutil cuando es el objetivo

```
    ┌──┐
    │▓▓│ <- Bandera
┌───┴──┴───┐
│  CORREO  │
└──────────┘
    ║
    ╨
```

### 3.4 La Carta

**Diseño:**
- Sobre blanco/crema clásico
- Sello postal naranja en esquina
- Líneas que simulan dirección escrita
- Efecto de "flotar" cuando está en inventario

```
┌─────────────┐
│ ┌──┐        │
│ │▓▓│  ════  │
│ └──┘  ════  │
│       ════  │
└─────────────┘
```

### 3.5 Números 3D de Casas

**Especificaciones:**
- Tipografía: Bold, sans-serif, alta legibilidad
- Tamaño: Visible desde distancia media
- Color: Blanco con borde/sombra para contraste
- Posición: Flotando 1-2 unidades sobre el techo
- Comportamiento: Billboard (siempre mira a cámara)

---

## 4. Interfaz de Usuario (UI)

### 4.1 Filosofía de Diseño

**Principios:**
1. **Minimalismo**: Solo información esencial visible
2. **No intrusivo**: UI no debe bloquear la vista del juego
3. **Feedback claro**: Estados y acciones claramente comunicados
4. **Coherencia**: Mismo lenguaje visual en todo el HUD

### 4.2 HUD Layout

```
┌─────────────────────────────────────────────────────────────┐
│ ┌──────────────┐           ┌───┐          ┌────────┐ ┌──┐  │
│ │ ● Busca la   │           │ ▲ │          │ 📬  5  │ │🔊│  │
│ │   carta      │           └───┘          └────────┘ └──┘  │
│ └──────────────┘          Destino                          │
│                           Casa #3                          │
│                                                             │
│                                                             │
│                             ·                               │
│                          (     )   <- Crosshair             │
│                             ·                               │
│                                                             │
│                                                             │
│                                                             │
│                   ┌─────────────────────┐                   │
│                   │ Presiona [E] para   │                   │
│                   │ recoger             │                   │
│                   └─────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Elementos UI Detallados

#### Panel de Estado (Izquierda)
```css
/* Especificaciones */
- Fondo: rgba(26, 26, 29, 0.92)
- Border-left: 3px solid #FAA307
- Border-radius: 8px
- Padding: 10px 16px
- Backdrop-filter: blur(10px)

/* Dot de estado */
- Sin carta: Amarillo pulsante (#FAA307)
- Con carta: Verde fijo (#52B788)
```

#### Brújula (Centro)
```css
/* Especificaciones */
- Tamaño: 70x70px
- Fondo: rgba(26, 26, 29, 0.92)
- Border: 2px solid rgba(254, 250, 224, 0.1)
- Border-radius: 50%

/* Flecha */
- Color: #E85D04
- Sombra: drop-shadow(0 0 4px #E85D04)
- Transición suave al rotar
```

#### Contador (Derecha)
```css
/* Especificaciones */
- Icono: 📬 (22px)
- Número: 28px, font-weight 800, color #E85D04
- Animación bounce al incrementar
```

#### Crosshair (Centro pantalla)
```css
/* Estado normal */
- Dot: 6px, blanco, opacity 0.8

/* Estado interactivo */
- Dot: 10px, #E85D04
- Ring: 28px, border #E85D04
- Glow: box-shadow 0 0 12px #E85D04
```

### 4.4 Pantalla de Título

```
┌─────────────────────────────────────────┐
│                                         │
│      Cartero del Vecindario             │
│         VERTICAL SLICE                  │
│                                         │
│    ┌──────┐  ┌──────┐  ┌──────┐        │
│    │ WASD │  │Mouse │  │  E   │        │
│    │Mover │  │Mirar │  │Inter │        │
│    └──────┘  └──────┘  └──────┘        │
│                                         │
│    ┌─────────────────────────────┐     │
│    │ Objetivo: Recoge la carta   │     │
│    │ y entrégala en el buzón...  │     │
│    └─────────────────────────────┘     │
│                                         │
│           [ JUGAR ]                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 5. Efectos Visuales (VFX)

### 5.1 Partículas de Pickup

**Descripción:** Partículas naranjas que emergen al recoger carta

```
Configuración:
- Cantidad: 30-50 partículas
- Color: #E85D04 → #FAA307 (gradiente)
- Tamaño: 0.1 → 0.02 (decrece)
- Duración: 0.8 segundos
- Dirección: Hacia arriba y afuera
- Gravedad: -0.5 (flotan ligeramente)
```

### 5.2 Confetti de Entrega

**Descripción:** Explosión de confetti multicolor al entregar carta

```
Configuración:
- Cantidad: 150-200 partículas
- Colores: Rojo, Verde, Azul, Amarillo, Magenta
- Tamaño: Variable (0.05 - 0.15)
- Duración: 2.5 segundos
- Dirección: Explosión radial hacia arriba
- Gravedad: 0.3 (caen suavemente)
- Rotación: Aleatoria (simula papel cayendo)
```

### 5.3 Screen Effects

| Efecto | Trigger | Descripción |
|--------|---------|-------------|
| Flash dorado | Entrega exitosa | Overlay #FAA307 al 30%, fade out 0.3s |
| Screen shake | Entrega exitosa | Intensidad 0.03, duración 0.2s |
| Fade in/out | Inicio juego | Negro → transparente, 0.8s |

### 5.4 Glow y Emisivos

**Zona de pickup (oficina):**
- Color: Cyan (#00CED1)
- Intensidad: 0.5
- Pulso suave: 1.5s ciclo

**Buzón destino:**
- Color: Naranja (#E85D04)
- Intensidad: 0.3
- Activo solo cuando jugador tiene carta

---

## 6. Tipografía

### 6.1 Fuente Principal

**Inter** (Google Fonts)
- Moderna, legible, versátil
- Pesos usados: 400, 500, 600, 700, 800

### 6.2 Uso por Contexto

| Contexto | Peso | Tamaño | Tracking |
|----------|------|--------|----------|
| Títulos | 800 | 36px | Normal |
| Subtítulos | 600 | 14px | 2px (uppercase) |
| Cuerpo | 500 | 13-14px | 0.3px |
| Números grandes | 800 | 28px | Normal |
| Labels pequeños | 600 | 11px | 1px (uppercase) |

---

## 7. Wireframes UI

### 7.1 Pantalla de Título

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                                                                │
│                                                                │
│                  ╔══════════════════════════╗                  │
│                  ║                          ║                  │
│                  ║   Cartero del            ║                  │
│                  ║      Vecindario          ║                  │
│                  ║   ─────────────────      ║                  │
│                  ║   VERTICAL SLICE         ║                  │
│                  ║                          ║                  │
│                  ║   [WASD] [Mouse] [E]     ║                  │
│                  ║   Mover  Mirar   Inter   ║                  │
│                  ║                          ║                  │
│                  ║   ┌──────────────────┐   ║                  │
│                  ║   │   Objetivo...    │   ║                  │
│                  ║   └──────────────────┘   ║                  │
│                  ║                          ║                  │
│                  ║      [ JUGAR ]           ║                  │
│                  ║                          ║                  │
│                  ╚══════════════════════════╝                  │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 7.2 HUD en Gameplay

```
┌────────────────────────────────────────────────────────────────┐
│┌────────────────┐         ┌─────┐           ┌─────────┐ ┌───┐ │
││● Busca carta   │         │  ▲  │           │ 📬  0   │ │ 🔊││
│└────────────────┘         └─────┘           └─────────┘ └───┘ │
│                          Destino                               │
│                          Casa #3                               │
│                                                                │
│                                                                │
│                                                                │
│                              ·                                 │
│                           (     )                              │
│                              ·                                 │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
│                    ┌─────────────────────┐                     │
│                    │   [E] Recoger       │                     │
│                    └─────────────────────┘                     │
└────────────────────────────────────────────────────────────────┘
```

### 7.3 Estados del HUD

**Sin carta:**
```
┌────────────────┐
│● Busca carta   │  <- Dot amarillo pulsante
└────────────────┘
```

**Con carta:**
```
┌────────────────┐
│● Entrega #3    │  <- Dot verde fijo
└────────────────┘
```

---

## 8. Moodboard Conceptual

### Referencias Visuales (Descripción)

**Ambiente:**
- Vecindarios suburbanos americanos de los años 50-60
- Postales vintage con colores saturados cálidos
- Fotografías de golden hour (atardecer dorado)

**Estilo artístico:**
- Ilustraciones de Charley Harper (naturaleza geométrica)
- Arte de Richard Scarry (ciudades amigables)
- Paletas de Wes Anderson (simetría, colores pasteles)

**Juegos:**
- A Short Hike (personajes low-poly, naturaleza)
- Untitled Goose Game (simplicidad, humor)
- Donut County (colores planos, formas suaves)
- Overcooked (caos organizado, colores brillantes)

### Palabras Clave de la Estética

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   CÁLIDO    NOSTÁLGICO    AMIGABLE    SATISFACTORIO│
│                                                     │
│   SIMPLE    LEGIBLE       COLORIDO    ACOGEDOR     │
│                                                     │
│   VERANO    VECINDARIO    RUTINA      RECOMPENSA   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 9. Especificaciones Técnicas

### 9.1 Assets 3D

| Asset | Polígonos Max | Formato |
|-------|---------------|---------|
| Casa simple | 500 | .glb |
| Árbol | 200 | .glb |
| Buzón | 100 | .glb |
| Carta | 50 | .glb |
| Decoración | 150 | .glb |

### 9.2 Texturas

- **Formato:** PNG (con transparencia donde necesario)
- **Resolución:** 256x256 máximo para objetos pequeños
- **Estilo:** Colores planos o gradientes simples
- **Compresión:** Optimizada para web

### 9.3 Exportación

- Modelos: glTF 2.0 (.glb)
- Imágenes UI: PNG/SVG
- Iconos: SVG preferido para escalabilidad

---

## 10. Checklist de Arte

### Assets 3D (Fuente: Kenney.nl - CC0 License)

**City Kit Suburban** (https://kenney.nl/assets/city-kit-suburban)
- [x] Casas residenciales (5 variantes de color)
- [x] Oficina postal (edificio comercial azul)
- [x] Buzones estilo americano

**City Kit Roads** (https://kenney.nl/assets/city-kit-roads)
- [x] Postes de luz / Farolas

**Nature Kit** (https://kenney.nl/assets/nature-kit)
- [x] Árboles (2-3 variantes)
- [x] Arbustos
- [x] Flores decorativas
- [x] Rocas

**Creación manual (primitivas Babylon.js)**
- [x] Carta/sobre (box con material crema + sello naranja)
- [x] Terreno (ground plane con color césped)
- [x] Números 3D (DynamicTexture con billboard)

### UI/2D (CSS + HTML)
- [x] Iconos de controles (texto estilizado WASD/Mouse/E)
- [x] Flecha de brújula (CSS transform rotate)
- [x] Crosshair (div con border-radius)
- [x] Iconos de estado (emojis Unicode)

### Efectos (Babylon.js ParticleSystem)
- [x] Configuración de partículas pickup (especificada en GDD)
- [x] Configuración de confetti (especificada en GDD)
- [x] Materiales emisivos (GlowLayer)
- [x] Post-procesado bloom (opcional)

---

---

**Documento de Dirección de Arte - Cartero del Vecindario**
**Autores:** Stuart Palma, Paul Cajas | **Versión 1.0** | **Enero 2026**
**Escuela Politécnica Nacional - Software para Videojuegos**
