# SafeTrack - Proyecto personal

## Descripción

SafeTrack es una plataforma orientada a la seguridad ciudadana, la información local y la participación comunitaria. La página presenta el propósito del proyecto, una experiencia de mapa de calles desplazable, avisos comunitarios con fichas de detalle, categorías de interés, una galería, un video y un formulario de participación.

## Alcance de esta versión

La página incorpora una experiencia interactiva de mapa construida con HTML, CSS y JavaScript nativo.

- El mapa de calles es un recurso vectorial local que se puede desplazar con el ratón o el dedo.
- Los controles permiten acercar, alejar y volver a centrar la vista.
- El icono del usuario y el radio de exploración permanecen fijos en el centro del mapa.
- Los marcadores permiten abrir detalles con hora, categoría, ubicación general y comentarios comunitarios.
- Los filtros permiten organizar los avisos por categoría.
- Los datos y ubicaciones del mapa son ilustrativos; no se consulta el GPS ni se reciben reportes externos.
- No se envían notificaciones ni se contacta a servicios de emergencia.
- El formulario usa validación nativa del navegador y conduce a una página de confirmación.
- El JavaScript se divide entre la navegación hamburguesa y los controles del mapa.

## Requisitos incluidos

- Menú horizontal en escritorio y menú vertical hamburguesa en móvil.
- Diseño responsive con CSS.
- Sección de propósito y problema.
- Vista de mapa de calles interactiva.
- Secciones de categorías, comunidad, galería y video.
- Formulario con `select`, `radio` y `checkbox`.
- Una sección con tipografía `Georgia` del sistema, diferente de Google Fonts.
- Página vinculada que abre en la misma pestaña (`target="_self"`).
- Página vinculada que abre en una pestaña nueva (`target="_blank"`).
- Dos hojas de estilo: `estilos.css` para la página y `he_pie.css` para el pie de página.
- PDF de la Ley N.º 29733 dentro de `documentos/`.
- Estructura compatible con GitHub Pages.

## Estructura

```text
SafeTrack/
├── index.html
├── nosotros.html
├── guia.html
├── confirmacion.html
├── css/
│   ├── estilos.css
│   └── he_pie.css
├── js/
│   ├── menu.js
│   └── mapa.js
├── imagenes/
│   └── mapa-calles.svg
├── videos/
│   └── safetrack-presentacion.mp4
├── documentos/
│   └── LEY29733.pdf
├── FUENTES.txt
└── LEEME.txt
```

## Abrir localmente

1. Descomprimir el archivo ZIP.
2. Abrir `index.html` con un navegador.
3. Pulsar **Iniciar** en la sección «Nuestra aplicación» para abrir el mapa.
4. Arrastrar el mapa con el ratón o el dedo para explorar otras zonas.
5. Seleccionar un marcador o una tarjeta del panel comunitario para consultar sus detalles y comentarios.
6. Probar los filtros, los controles de zoom y el botón para volver a centrar el mapa.
7. Cerrar el mapa para regresar a la pantalla inicial y volver a iniciarlo cuando se desee.
8. Para probar el menú móvil, reducir el ancho de la ventana o utilizar las herramientas de desarrollador en modo dispositivo.

No requiere instalar paquetes ni frameworks.

## Publicar en GitHub Pages

1. Crear o abrir el repositorio de GitHub.
2. Subir el contenido de esta carpeta directamente a la raíz del repositorio, de modo que `index.html` quede en el nivel superior.
3. Ir a **Settings → Pages**.
4. En **Build and deployment**, elegir **Deploy from a branch**.
5. Seleccionar la rama `main` y la carpeta `/(root)`.
6. Guardar y esperar que GitHub Pages publique el sitio.
7. Copiar el enlace que GitHub muestre en la sección Pages.

La publicación requiere acceso al repositorio de GitHub del propietario del proyecto.

## Uso responsable

Los avisos y las ubicaciones del mapa son ilustrativos. No deben utilizarse para tomar decisiones de seguridad ni sustituyen la información de las autoridades. Ante una emergencia, utiliza los canales oficiales correspondientes.
