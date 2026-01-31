# Planificación del Proyecto
## Épicas y User Stories

**Proyecto:** Cartero del Vecindario
**Autor:** Palma Stuart
**Fecha:** Enero 2026
**Metodología:** Scrum adaptado para desarrollo de videojuegos
**Herramienta sugerida:** GitHub Projects

---

## Resumen de Épicas

| ID | Épica | Descripción | Story Points |
|----|-------|-------------|--------------|
| E-01 | Gestión e Investigación | Setup inicial, investigación, documentación base | 8 |
| E-02 | Diseño de Gameplay | Mecánicas core, MDA, balanceo | 13 |
| E-03 | Diseño Narrativo | Historia, personajes, worldbuilding | 5 |
| E-04 | Diseño de Escenarios | Level design, layouts, flujo | 8 |
| E-05 | Dirección de Arte | Estilo visual, paleta, referencias | 8 |
| E-06 | Arquitectura del Sistema | Diagramas UML, patrones, stack | 13 |
| E-07 | Prototipado | Vertical slice funcional | 21 |
| **TOTAL** | | | **76 SP** |

---

## Épica 01: Gestión e Investigación Inicial

**Descripción:** Configuración del proyecto, investigación de mercado y documentación inicial.

### User Stories

#### US-01.1: Configurar repositorio
```
COMO desarrollador
QUIERO configurar el repositorio de GitHub
PARA tener control de versiones y colaboración

Criterios de Aceptación:
- [ ] Repositorio creado en GitHub
- [ ] Estructura de carpetas definida
- [ ] README inicial con descripción del proyecto
- [ ] .gitignore configurado

Estimación: 2 SP
Labels: setup, documentation
```

#### US-01.2: Investigar juegos similares
```
COMO diseñador
QUIERO investigar juegos de simulación casual
PARA identificar patrones de diseño exitosos

Criterios de Aceptación:
- [ ] Lista de 5+ juegos analizados
- [ ] Mecánicas clave identificadas
- [ ] Referencias visuales recopiladas
- [ ] Documento de análisis competitivo

Estimación: 3 SP
Labels: research, documentation
```

#### US-01.3: Definir alcance del proyecto
```
COMO product owner
QUIERO definir el alcance del vertical slice
PARA establecer expectativas claras

Criterios de Aceptación:
- [ ] Features incluidas listadas
- [ ] Features excluidas documentadas
- [ ] Timeline tentativo
- [ ] Recursos necesarios identificados

Estimación: 3 SP
Labels: planning, documentation
```

---

## Épica 02: Diseño de Gameplay y Balanceo

**Descripción:** Definición de mecánicas, análisis MDA y balanceo de la experiencia.

### User Stories

#### US-02.1: Análisis MDA completo
```
COMO diseñador
QUIERO documentar el análisis MDA
PARA justificar las decisiones de diseño

Criterios de Aceptación:
- [ ] Estéticas deseadas definidas
- [ ] Dinámicas emergentes identificadas
- [ ] Mecánicas base documentadas
- [ ] Diagrama MDA creado

Estimación: 5 SP
Labels: design, MDA, documentation
```

#### US-02.2: Diseñar core loop
```
COMO diseñador
QUIERO definir el ciclo de juego principal
PARA crear una experiencia cohesiva

Criterios de Aceptación:
- [ ] Diagrama de core loop
- [ ] Tiempos estimados por fase
- [ ] Puntos de recompensa identificados
- [ ] Feedback por acción definido

Estimación: 3 SP
Labels: design, gameplay
```

#### US-02.3: Definir sistema de feedback
```
COMO diseñador
QUIERO especificar el feedback audiovisual
PARA maximizar la satisfacción del jugador

Criterios de Aceptación:
- [ ] Matriz de feedback por acción
- [ ] Tiempos de respuesta definidos
- [ ] Especificaciones de audio
- [ ] Especificaciones de VFX

Estimación: 3 SP
Labels: design, audio, VFX
```

#### US-02.4: Balancear mecánicas de movimiento
```
COMO diseñador
QUIERO definir valores de movimiento
PARA lograr una sensación de control satisfactoria

Criterios de Aceptación:
- [ ] Velocidad del jugador definida
- [ ] Sensibilidad de cámara especificada
- [ ] Colisiones configuradas
- [ ] Gravedad ajustada

Estimación: 2 SP
Labels: design, balancing
```

---

## Épica 03: Diseño Narrativo

**Descripción:** Historia, personajes y worldbuilding del juego.

### User Stories

#### US-03.1: Crear premisa del juego
```
COMO escritor
QUIERO definir la premisa narrativa
PARA dar contexto a la experiencia

Criterios de Aceptación:
- [ ] Elevator pitch escrito
- [ ] Premisa de 1 párrafo
- [ ] Tono definido
- [ ] Público objetivo identificado

Estimación: 2 SP
Labels: narrative, documentation
```

#### US-03.2: Diseñar el escenario
```
COMO diseñador de mundo
QUIERO definir el vecindario
PARA crear un ambiente inmersivo

Criterios de Aceptación:
- [ ] Descripción del vecindario
- [ ] Elementos del escenario listados
- [ ] Atmósfera deseada documentada
- [ ] Referencias visuales recopiladas

Estimación: 3 SP
Labels: narrative, worldbuilding
```

---

## Épica 04: Diseño de Escenarios y Niveles

**Descripción:** Layout del nivel, posicionamiento de elementos y flujo de juego.

### User Stories

#### US-04.1: Crear layout del vecindario
```
COMO level designer
QUIERO diseñar el mapa del vecindario
PARA optimizar la navegación del jugador

Criterios de Aceptación:
- [ ] Mapa 2D del nivel
- [ ] Posiciones de casas marcadas
- [ ] Oficina postal ubicada
- [ ] Rutas principales identificadas

Estimación: 3 SP
Labels: level-design, documentation
```

#### US-04.2: Definir posiciones exactas
```
COMO level designer
QUIERO especificar coordenadas de objetos
PARA facilitar la implementación

Criterios de Aceptación:
- [ ] Tabla de posiciones (X, Y, Z)
- [ ] Rotaciones definidas
- [ ] Escalas especificadas
- [ ] Colisiones mapeadas

Estimación: 2 SP
Labels: level-design, technical
```

#### US-04.3: Diseñar sistema de navegación
```
COMO diseñador
QUIERO planificar ayudas de navegación
PARA evitar que el jugador se pierda

Criterios de Aceptación:
- [ ] Brújula especificada
- [ ] Números en casas diseñados
- [ ] Indicadores visuales definidos
- [ ] Flujo de dificultad documentado

Estimación: 3 SP
Labels: level-design, UX
```

---

## Épica 05: Dirección de Arte y Audio

**Descripción:** Estilo visual, paleta de colores, referencias y diseño sonoro.

### User Stories

#### US-05.1: Definir estilo visual
```
COMO director de arte
QUIERO establecer la dirección artística
PARA mantener coherencia visual

Criterios de Aceptación:
- [ ] Estilo 3D definido (low-poly)
- [ ] Referencias visuales recopiladas
- [ ] Moodboard creado
- [ ] Ejemplos de assets identificados

Estimación: 3 SP
Labels: art, documentation
```

#### US-05.2: Crear paleta de colores
```
COMO director de arte
QUIERO definir la paleta de colores
PARA reforzar la atmósfera del juego

Criterios de Aceptación:
- [ ] Colores primarios definidos (hex)
- [ ] Colores de UI especificados
- [ ] Usos por color documentados
- [ ] Ejemplos de aplicación

Estimación: 2 SP
Labels: art, UI
```

#### US-05.3: Diseñar UI/HUD
```
COMO diseñador de UI
QUIERO crear wireframes del HUD
PARA planificar la interfaz

Criterios de Aceptación:
- [ ] Wireframe del HUD
- [ ] Wireframe de pantalla de título
- [ ] Elementos de UI listados
- [ ] Comportamientos definidos

Estimación: 3 SP
Labels: UI, wireframes
```

---

## Épica 06: Arquitectura del Sistema

**Descripción:** Diseño técnico, diagramas UML y patrones de diseño.

### User Stories

#### US-06.1: Seleccionar stack tecnológico
```
COMO arquitecto
QUIERO elegir las tecnologías del proyecto
PARA definir la base técnica

Criterios de Aceptación:
- [ ] Motor 3D seleccionado y justificado
- [ ] Lenguaje definido
- [ ] Herramientas auxiliares listadas
- [ ] Compatibilidad verificada

Estimación: 2 SP
Labels: architecture, technical
```

#### US-06.2: Crear diagrama de clases
```
COMO arquitecto
QUIERO diseñar el diagrama de clases
PARA visualizar la estructura del código

Criterios de Aceptación:
- [ ] Clases principales identificadas
- [ ] Relaciones definidas
- [ ] Métodos documentados
- [ ] Atributos especificados

Estimación: 5 SP
Labels: architecture, UML
```

#### US-06.3: Crear diagrama de estados
```
COMO arquitecto
QUIERO diseñar diagramas de estados
PARA modelar el flujo del juego

Criterios de Aceptación:
- [ ] Estado del juego modelado
- [ ] Estado del jugador modelado
- [ ] Transiciones definidas
- [ ] Condiciones especificadas

Estimación: 3 SP
Labels: architecture, UML
```

#### US-06.4: Documentar patrones de diseño
```
COMO arquitecto
QUIERO identificar patrones a usar
PARA seguir buenas prácticas

Criterios de Aceptación:
- [ ] Patrones seleccionados
- [ ] Justificación por patrón
- [ ] Ejemplos de implementación
- [ ] Ubicación en el código

Estimación: 3 SP
Labels: architecture, patterns
```

---

## Épica 07: Prototipado (Vertical Slice)

**Descripción:** Implementación del prototipo funcional.

### User Stories

#### US-07.1: Implementar movimiento FPS
```
COMO desarrollador
QUIERO implementar el sistema de movimiento
PARA que el jugador pueda navegar

Criterios de Aceptación:
- [ ] Movimiento WASD funcional
- [ ] Rotación con mouse
- [ ] Colisiones activas
- [ ] Gravedad aplicada

Estimación: 5 SP
Labels: development, core
```

#### US-07.2: Implementar sistema de pickup
```
COMO desarrollador
QUIERO implementar recoger carta
PARA completar la primera mitad del loop

Criterios de Aceptación:
- [ ] Detección de proximidad
- [ ] Parenting de carta a cámara
- [ ] Cambio de estado
- [ ] Feedback audiovisual

Estimación: 5 SP
Labels: development, core
```

#### US-07.3: Implementar sistema de delivery
```
COMO desarrollador
QUIERO implementar entregar carta
PARA completar el core loop

Criterios de Aceptación:
- [ ] Detección de buzón correcto
- [ ] Animación de entrega
- [ ] Selección de nueva casa
- [ ] Incremento de contador

Estimación: 5 SP
Labels: development, core
```

#### US-07.4: Implementar UI y HUD
```
COMO desarrollador
QUIERO implementar la interfaz
PARA mostrar información al jugador

Criterios de Aceptación:
- [ ] Pantalla de título
- [ ] HUD con estado y contador
- [ ] Brújula funcional
- [ ] Prompts de interacción

Estimación: 3 SP
Labels: development, UI
```

#### US-07.5: Implementar audio
```
COMO desarrollador
QUIERO implementar el sistema de audio
PARA dar feedback sonoro

Criterios de Aceptación:
- [ ] Sonido de pickup
- [ ] Sonido de delivery
- [ ] Música ambiente
- [ ] Control de mute

Estimación: 3 SP
Labels: development, audio
```

---

## Tablero Kanban Sugerido

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   BACKLOG   │   TO DO     │ IN PROGRESS │   REVIEW    │    DONE     │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│             │             │             │             │             │
│  US-07.5    │  US-06.4    │  US-07.3    │  US-02.1    │  US-01.1    │
│  US-07.4    │  US-05.3    │             │             │  US-01.2    │
│             │  US-04.3    │             │             │  US-01.3    │
│             │             │             │             │  US-03.1    │
│             │             │             │             │  US-06.1    │
│             │             │             │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

## Sprints Sugeridos

### Sprint 1: Fundamentos (Semana 1)
- E-01: Gestión e Investigación (completa)
- US-02.1: Análisis MDA
- US-03.1: Premisa del juego
- US-06.1: Stack tecnológico

### Sprint 2: Diseño Core (Semana 2)
- US-02.2: Core loop
- US-02.3: Sistema de feedback
- US-04.1: Layout del vecindario
- US-05.1: Estilo visual

### Sprint 3: Arquitectura (Semana 3)
- US-06.2: Diagrama de clases
- US-06.3: Diagrama de estados
- US-05.2: Paleta de colores
- US-05.3: Wireframes UI

### Sprint 4: Prototipo (Semana 4)
- US-07.1: Movimiento FPS
- US-07.2: Sistema pickup
- US-07.3: Sistema delivery

### Sprint 5: Pulido (Semana 5)
- US-07.4: UI y HUD
- US-07.5: Audio
- US-06.4: Patrones documentados
- Testing y ajustes

---

## Labels para GitHub Issues

| Label | Color | Descripción |
|-------|-------|-------------|
| `epic` | #7057ff | Épica/Feature grande |
| `user-story` | #0075ca | Historia de usuario |
| `documentation` | #0052cc | Documentación |
| `design` | #d876e3 | Diseño de juego |
| `architecture` | #e99695 | Arquitectura técnica |
| `development` | #0e8a16 | Desarrollo/código |
| `art` | #fbca04 | Arte y visual |
| `audio` | #c5def5 | Audio y música |
| `UI` | #bfdadc | Interfaz de usuario |
| `bug` | #d73a4a | Error/problema |
| `enhancement` | #a2eeef | Mejora |

---

## Definición de Done (DoD)

Una User Story se considera **DONE** cuando:

- [ ] Todos los criterios de aceptación cumplidos
- [ ] Documentación actualizada
- [ ] Código revisado (si aplica)
- [ ] Sin bugs conocidos
- [ ] Aprobado por el equipo

---

**Documento de Planificación - Cartero del Vecindario**
**Autor:** Palma Stuart | **Versión 1.0** | **Enero 2026**
**Escuela Politécnica Nacional - Software para Videojuegos**
