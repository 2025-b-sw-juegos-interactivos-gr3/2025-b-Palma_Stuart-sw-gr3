# Cartero del Vecindario - Examen Babylon.js

Videojuego 3D desarrollado en Babylon.js para examen académico.

## Descripción del Juego

Eres un cartero que debe recoger cartas en la oficina de correos y entregarlas en el buzón de la casa del vecindario. El juego implementa mecánicas de recogida, transporte (parenting) y entrega de objetos con controles de primera persona.

## Características Implementadas

### Mecánicas de Juego
- **Sistema de movimiento**: Control WASD para mover al jugador en primera persona
- **Sistema de cámara**: Vista en primera persona con control de mouse
- **Recogida de objetos**: Presiona E cerca de la carta para recogerla (sistema de parenting)
- **Transporte de objetos**: La carta se adjunta a la cámara mientras se transporta
- **Entrega de objetos**: Presiona E cerca del buzón para entregar (parent = null)
- **Sistema de estados**: Validación para no recoger si ya tiene carta, no entregar si no la tiene
- **Proximidad**: Detección de distancia usando BABYLON.Vector3.Distance

### Elementos del Mundo 3D
- **Suelo**: Plano texturizado con asfalto
- **Oficina de Correos**: Edificio con techo y letrero (zona de pickup)
- **Casa con Buzón**: Casa con techo y buzón exterior (zona de delivery)
- **Carta**: Objeto visible con animación de flotación
- **Decoraciones**: Farolas con iluminación, árboles decorativos
- **Iluminación**: Sistema de luz hemisférica, direccional y puntual

### UI del Juego
- Pantalla de título con instrucciones
- Indicador de estado en tiempo real
- Contador de entregas completadas
- Prompts de interacción contextuales

## Cómo Ejecutar el Juego

### Opción 1: Servidor Local (Recomendado)

1. **Descargar las texturas** en la carpeta `assets/`:
   - `ground_asphalt.jpg` - Textura de asfalto para el suelo
   - `wall_brick.jpg` - Textura de ladrillo para edificios
   - `letter.png` - Textura de carta
   - `mailbox.png` - Textura de buzón

2. **Iniciar un servidor local**:

   Con Python 3:
   ```bash
   cd Examen-01
   python -m http.server 8000
   ```

   Con Python 2:
   ```bash
   cd Examen-01
   python -m SimpleHTTPServer 8000
   ```

   Con Node.js (http-server):
   ```bash
   cd Examen-01
   npx http-server -p 8000
   ```

   Con PHP:
   ```bash
   cd Examen-01
   php -S localhost:8000
   ```

3. **Abrir el navegador** en `http://localhost:8000`

### Opción 2: Extensión Live Server (VS Code)

1. Instala la extensión "Live Server" en Visual Studio Code
2. Abre la carpeta `Examen-01` en VS Code
3. Clic derecho en `index.html` → "Open with Live Server"

### Opción 3: Abrir directamente (no recomendado)

Puedes abrir `index.html` directamente en el navegador, pero las texturas podrían no cargarse debido a políticas CORS. El juego funcionará con colores sólidos como fallback.

## Controles del Juego

| Tecla | Acción |
|-------|--------|
| **W** | Mover adelante |
| **A** | Mover izquierda |
| **S** | Mover atrás |
| **D** | Mover derecha |
| **Mouse** | Mirar alrededor |
| **E** | Recoger carta / Entregar carta |

## Flujo de Juego

1. **Inicio**: Presiona "Comenzar Juego" en la pantalla de título
2. **Búsqueda**: Ve hacia la oficina de correos (edificio marrón a la izquierda)
3. **Recogida**: Acércate a la carta brillante y presiona **E** para recogerla
4. **Transporte**: La carta se adjunta a tu vista (parenting activo)
5. **Entrega**: Ve hacia la casa (edificio blanco a la derecha) y busca el buzón azul
6. **Completar**: Acércate al buzón y presiona **E** para entregar
7. **Repetir**: La carta reaparece en la oficina para entregas adicionales

## Estructura de Archivos

```
Examen-01/
├── index.html                 # HTML y UI del juego
├── README.md                  # Este archivo
├── js/                        # Módulos JavaScript (ES6)
│   ├── config.js              # Variables globales y configuración
│   ├── camera.js              # Sistema de cámara y controles
│   ├── lights.js              # Sistema de iluminación
│   ├── environment.js         # Suelo y oficina de correos
│   ├── objects.js             # Carta y casas del vecindario
│   ├── decorations.js         # Decoraciones y assets 3D
│   ├── player.js              # Representación del jugador
│   ├── interactions.js        # Sistema de proximidad y prompts
│   ├── gameLogic.js           # Lógica de recogida y entrega
│   ├── controls.js            # Manejo de teclado
│   └── main.js                # Inicialización y loop principal
└── assets/                    # Carpeta para assets
    ├── ground_asphalt.jpg
    ├── wall_brick.jpg
    ├── letter.png
    ├── mailbox.glb
    └── kenney_nature-kit/     # Assets 3D decorativos
        └── Models/GLTF format/
            ├── tree_default.glb
            ├── tree_cone.glb
            ├── tree_blocks.glb
            ├── flower_purpleA.glb
            ├── flower_redA.glb
            ├── flower_yellowA.glb
            ├── rock_smallA.glb
            └── rock_smallB.glb
```

## Requisitos Técnicos Implementados

- **Engine**: Babylon.js 6.x (CDN)
- **Arquitectura**: Módulos ES6 para organización de código
- **Cámara**: FreeCamera (primera persona)
- **Input**: scene.onKeyboardObservable para detección de teclas
- **Proximidad**: BABYLON.Vector3.Distance para calcular distancias
- **Parenting**: Sistema parent/child para adjuntar objetos
- **Materiales**: StandardMaterial con texturas y colores
- **Iluminación**: HemisphericLight, DirectionalLight, PointLight
- **Assets 3D**: SceneLoader para modelos GLB/GLTF

## Créditos de Assets

Las texturas utilizadas son de licencia libre y pueden descargarse de:

### Texturas de Suelo y Paredes
- **Poly Haven** (https://polyhaven.com/)
  - CC0 License - Dominio público
  - Sugerencia: Buscar "asphalt" para el suelo

- **AmbientCG** (https://ambientcg.com/)
  - CC0 License - Dominio público
  - Sugerencia: Buscar "brick" para las paredes

### Sprites y Texturas 2D
- **Kenney.nl** (https://kenney.nl/)
  - CC0 License - Dominio público
  - Sugerencia: Game Icons pack para carta y buzón

### Alternativas Sugeridas
- **OpenGameArt** (https://opengameart.org/)
- **Textures.com** (versión gratuita limitada)
- **FreePBR** (https://freepbr.com/)

## Notas de Desarrollo

- El código está **modularizado usando ES6 modules** para mejor organización
- 11 módulos JavaScript separados por responsabilidad
- Sistema de estados implementado para validación de acciones
- Animaciones procedurales (flotación de carta, rotación)
- UI responsiva con prompts contextuales
- Fallback a colores sólidos si las texturas no se cargan
- Optimizado para navegadores modernos (Chrome, Firefox, Edge)

## Arquitectura del Código

El juego utiliza una arquitectura modular con separación de responsabilidades:

1. **config.js**: Gestión centralizada de variables globales
2. **camera.js**: Configuración de cámara, colisiones y gravedad
3. **lights.js**: Sistema de iluminación del mundo 3D
4. **environment.js**: Creación del entorno (suelo, oficina)
5. **objects.js**: Objetos interactuables (carta, casas)
6. **decorations.js**: Elementos decorativos y assets 3D
7. **player.js**: Representación del jugador
8. **interactions.js**: Sistema de proximidad y prompts
9. **gameLogic.js**: Mecánicas de recogida y entrega
10. **controls.js**: Manejo de input del teclado
11. **main.js**: Orquestación e inicialización

## Solución de Problemas

### Las texturas no se cargan
- Asegúrate de usar un servidor local (no abrir el archivo directamente)
- Verifica que los archivos de textura existen en la carpeta `assets/`
- Revisa la consola del navegador (F12) para errores

### El juego no responde
- Haz clic en el canvas después de presionar "Comenzar Juego"
- Verifica que estás usando un navegador compatible (Chrome/Firefox recomendados)

### La carta no se puede recoger
- Acércate más (distancia menor a 2 unidades)
- Asegúrate de estar mirando hacia la carta
- Presiona E (no mantengas presionado)

## Autor

Proyecto desarrollado para examen académico de programación de videojuegos 3D.

## Tecnologías Utilizadas

- **Babylon.js**: Motor de renderizado 3D
- **HTML5 Canvas**: Superficie de renderizado
- **JavaScript**: Lógica del juego
- **CSS3**: Interfaz de usuario

---

**Fecha de desarrollo**: Diciembre 2025
**Versión**: 1.0
**Licencia del código**: Académico - Uso educativo
