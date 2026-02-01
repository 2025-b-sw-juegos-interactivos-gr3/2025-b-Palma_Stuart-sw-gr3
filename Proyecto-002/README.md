# Proyecto 002: Cartero del Vecindario

**Autores:** Stuart Palma, Paul Cajas
**Curso:** Software para Videojuegos - EPN
**Fecha:** Enero 2026
**Versión:** 1.0

---

## Descripción del Proyecto

**Cartero del Vecindario** es un vertical slice de un juego casual en primera persona desarrollado con Babylon.js. El jugador asume el rol de un cartero novato que debe recoger cartas en la oficina postal y entregarlas en los buzones correctos del vecindario.

### Elevator Pitch

> "Cartero del Vecindario es un juego casual en primera persona donde asumes el rol de un cartero novato. Tu misión es simple pero satisfactoria: recoger cartas en la oficina postal y entregarlas en los buzones correctos del vecindario. Con una brújula que te guía y efectos visuales gratificantes, cada entrega completada te hará querer hacer una más."

---

## Estructura del Proyecto

```
Proyecto-002/
├── README.md                    <- Este archivo
├── docs/
│   └── GDD_Cartero_del_Vecindario.md    <- Game Design Document
├── arquitectura/
│   └── ARQUITECTURA_TECNICA.md          <- Diagramas UML y patrones
├── arte/
│   └── DIRECCION_ARTE.md                <- Estilo visual y assets
└── planificacion/
    └── EPICAS_USER_STORIES.md           <- Gestión del proyecto
```

---

## Entregables

### A. Game Design Document (GDD) con Análisis MDA
**Ubicación:** `docs/GDD_Cartero_del_Vecindario.md`

Contenido:
- Ficha técnica y concepto
- Análisis MDA completo (Aesthetics, Dynamics, Mechanics)
- Mecánicas detalladas y Core Loop
- Narrativa y worldbuilding
- Diseño de niveles con posiciones exactas
- Especificaciones de arte y audio
- Métricas y KPIs

### B. Arquitectura Técnica
**Ubicación:** `arquitectura/ARQUITECTURA_TECNICA.md`

Contenido:
- Stack tecnológico (Babylon.js, JavaScript ES6+, Web Audio API)
- Diagrama de arquitectura general
- Diagrama de clases UML
- Diagrama de casos de uso
- Diagrama de estados
- Diagrama de secuencia
- Patrones de diseño con justificación

### C. Dirección de Arte y Mockups
**Ubicación:** `arte/DIRECCION_ARTE.md`

Contenido:
- Estilo visual (Low-poly estilizado)
- Paleta de colores con códigos hex
- Diseño de elementos (casas, buzones, carta)
- Wireframes de UI/HUD
- Moodboard y referencias visuales
- Checklist de assets (Kenney.nl)

### D. Planificación y Gestión
**Ubicación:** `planificacion/EPICAS_USER_STORIES.md`

Contenido:
- 7 Épicas con 76 Story Points totales
- 20 User Stories con criterios de aceptación
- Sprints sugeridos (5 semanas)
- Tablero Kanban
- Labels para GitHub Issues
- Definition of Done

---

## Tecnologías

| Componente | Tecnología |
|------------|------------|
| Motor 3D | Babylon.js 8.31 |
| Lenguaje | JavaScript ES6+ |
| Audio | Web Audio API (síntesis) |
| UI | HTML5 + CSS3 |
| Assets 3D | Kenney.nl (CC0) |

---

## Framework MDA

El proyecto aplica el Framework MDA de Hunicke, LeBlanc y Zubek:

| Capa | Descripción |
|------|-------------|
| **Aesthetics** | SATISFACCION - Sensación de logro al completar entregas |
| **Dynamics** | Ciclo de recompensa: Pickup → Navigate → Deliver → Reward |
| **Mechanics** | Movimiento FPS, sistema de pickup/delivery, brújula direccional |

---

## Enlaces de Referencia

- **Kenney Assets:** https://kenney.nl/assets
- **Babylon.js:** https://www.babylonjs.com/
- **Framework MDA:** https://users.cs.northwestern.edu/~hunicke/MDA.pdf

---

**Escuela Politécnica Nacional**
**Carrera de Software - 2026**
