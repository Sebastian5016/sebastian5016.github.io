# Walter Sebastián Fernández — Plataforma docente

> **Aprender tecnología haciendo.**
> Portfolio profesional de un profesor de Informática y biblioteca educativa abierta.

Sitio estático (HTML + CSS + JavaScript, sin frameworks): se publica gratis en GitHub Pages, funciona en celular, tablet y PC, y crece agregando datos, no tocando diseño.

## Qué incluye

| Sección | Para quién | Qué hace |
|---|---|---|
| Inicio | Todos | Doble entrada: instituciones / estudiantes |
| Sobre mí · Portfolio | Instituciones, RRHH | Perfil en 2 minutos, versión imprimible en PDF |
| Proyectos | Todos | Fichas de 12 bloques con código, demo, actividad y descargas |
| Programación | Estudiantes | 9 lenguajes: conceptos, ejemplos, ejercicios, desafíos |
| Materiales | Estudiantes, docentes | Biblioteca con 6 filtros y URL compartible |
| Alumnos | Estudiantes | Navegación simple en 6 pasos, pensada para celular |
| Rutas | Estudiantes | Niveles con progreso guardado |
| IA y Educación | Todos | Semáforo de uso, ejemplos, constructor de prompts, checklist |
| Tecnología · Recursos · Blog · Contacto | Todos | Áreas, descargas con tamaño/fecha, integraciones, artículos |

Búsqueda global con `Ctrl + K` o `/` en todas las páginas.

## Publicar en GitHub Pages

1. *Settings → Pages → Deploy from a branch* → rama principal, carpeta `/ (root)`.
2. Editar `url` en `data/sitio.js` con la dirección final y ejecutar `node scripts/build.mjs`.

## Antes de publicar — completar ✏️

En `data/sitio.js`: correo profesional, LinkedIn, YouTube (opcional), instituciones y años de la línea temporal, y opcionalmente `formEndpoint` (Formspree) para el formulario.

## Cómo agregar contenido

Ver **[docs/GUIA-CONTENIDOS.md](docs/GUIA-CONTENIDOS.md)**. Arquitectura completa: **[docs/ARQUITECTURA.md](docs/ARQUITECTURA.md)**.

```bash
node scripts/build.mjs        # apuntes + manifiesto de descargas + páginas + sitemap
node scripts/build-pdfs.mjs   # regenera los PDF de los apuntes
```

## Estructura

```
data/          ← TODO el contenido (lo único que se edita a diario)
descargas/     ← archivos descargables reales
src/pages/     ← plantillas de las páginas (el build genera los .html de la raíz)
scripts/       ← build, PDFs, manifiesto y verificación de enlaces
assets/        ← diseño (css), motor (js), imágenes
apuntes/       ← apuntes en HTML (generados desde scripts/apuntes-src)
```

Materiales bajo licencia **CC BY-NC-SA 4.0**.
