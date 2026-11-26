# Arquitectura de la plataforma — Walter Sebastián Fernández

> Portfolio docente + biblioteca educativa abierta de informática.
> Filosofía: **"Aprender tecnología haciendo."**

---

## 1. Arquitectura final

**Sitio estático multipágina, guiado por datos.**

```
┌────────────────────────────────────────────────────────────┐
│  PÁGINAS (HTML)        → estructura, SEO, contenido fijo   │
│  DATOS   (data/*.js)   → proyectos, recursos, artículos…   │
│  MOTOR   (assets/js)   → render, búsqueda, filtros, rutas  │
│  DISEÑO  (assets/css)  → sistema de diseño con tokens      │
│  ARCHIVOS (descargas/) → material descargable real         │
│  SCRIPTS (scripts/)    → manifiesto, PDFs, enlaces rotos   │
└────────────────────────────────────────────────────────────┘
```

| Decisión | Por qué |
|---|---|
| HTML + CSS + JS sin frameworks | Se aloja gratis (GitHub Pages / Netlify), no se rompe con actualizaciones, cualquier docente puede editarlo. |
| Una página HTML por sección | Cada sección tiene su propio `<title>`, descripción y URL → mejor SEO. |
| Contenido en `data/*.js` | Agregar un proyecto = agregar un objeto. El diseño no se toca. |
| Detalle por parámetro (`proyecto.html?id=…`) | Una plantilla sirve para infinitos proyectos, lenguajes, rutas y artículos. |
| `descargas/` + `scripts/manifest.mjs` | Tamaño y fecha de cada archivo se calculan solos. El script falla si hay un enlace roto. |
| `ProgressStore` (adaptador) | Hoy guarda el progreso en el navegador; mañana se cambia por una API con cuentas sin tocar las páginas. |

## 2. Mapa del sitio

```
/                         Inicio
├── sobre-mi.html          Sobre mí (perfil humano + línea temporal)
├── portfolio.html         Portfolio profesional (instituciones / RRHH, 2 minutos)
├── proyectos.html         Proyectos (tarjetas + filtros)
│   └── proyecto.html?id=  Ficha de proyecto (12 bloques)
├── programacion.html      Biblioteca por lenguaje
│   └── lenguaje.html?l=   Python, C, C++, Java, JavaScript, VB.NET, HTML, CSS, SQL
├── materiales.html        Biblioteca filtrable (6 filtros + texto)
├── alumnos.html           Recursos para alumnos (mobile first)
│   └── alumnos.html?cat=  Categoría guiada en 7 pasos
├── rutas.html             Rutas de aprendizaje
│   └── ruta.html?id=      Ruta con niveles y progreso
├── proyectos-alumnos.html Galería con política de privacidad
├── ia.html                IA y Educación (+ constructor de prompts)
├── tecnologia.html        Hardware, redes, sistemas, seguridad…
├── blog.html              Artículos con categorías
│   └── articulo.html?id=  Artículo + recursos relacionados + compartir
├── recursos.html          Descargas, herramientas e integraciones
├── buscar.html?q=         Resultados de búsqueda global
├── contacto.html          Formulario + canales
├── privacidad.html        Privacidad y separación de contenidos
└── 404.html
```

## 3. Estructura de navegación

- **Barra principal (6 entradas, no 13):** Inicio · Sobre mí · Proyectos · Aprender ▾ · Blog · Contacto
  - **Aprender ▾** agrupa: Programación, Materiales, Alumnos, Rutas, IA y Educación, Tecnología, Recursos, Proyectos de alumnos.
- **Acceso directo por público:** botón *Portfolio* (instituciones) y botón destacado *Alumnos*.
- **Búsqueda global** siempre visible: `Ctrl + K` o `/`.
- **Migas de pan** en todas las páginas internas → "¿Dónde estoy?".
- **"Qué sigue"** al final de cada ficha → "¿Qué hago después?".
- **Pie de página** con el mapa completo del sitio.
- En celular: menú a pantalla completa, botones de 48 px mínimo.

## 4. Diseño visual (v2 · premium)

- **Concepto:** *laboratorio nocturno*. Fondo `#07040E`, la luz nace del propio sistema.
- **Identidad:** principal **violeta señal `#7357FF`** (portfolio: *mostrar lo que sé*) y secundario **cian fósforo `#2CC9EA`** (aula: *enseñar lo que sé*). Cada página indica su modo con un indicador visible.
- **Tipografía:** Geist (texto y títulos, tracking negativo) + Geist Mono (código, métricas, etiquetas técnicas).
- **Efectos, con función y medida:** aurora WebGL propia solo en el hero de inicio (media resolución, pausa fuera de pantalla, alternativa CSS); vidrio solo en navegación y elementos flotantes; borde animado en 3 lugares (proyecto destacado, recurso recomendado, llamada a la acción); halo de cursor solo en escritorio.
- **Modo lectura:** versión clara sin efectos para leer apuntes, proyectar en el aula e imprimir.
- **Accesibilidad:** contraste AA, foco visible, `prefers-reduced-motion` elimina toda animación, áreas táctiles de 44 px o más.

## 5. Sistema de categorías (taxonomía única)

Toda la plataforma comparte una sola taxonomía (`data/taxonomia.js`):

| Eje | Valores |
|---|---|
| **Área** | Programación · Bases de datos · Redes · Hardware · Sistemas · Seguridad · IA · Web · Ofimática · Pensamiento computacional · Diseño digital |
| **Nivel** | Inicial · Intermedio · Avanzado (con indicador ●○○) |
| **Destinatario** | Secundario ciclo básico · Secundario ciclo superior · Técnico · Adultos / autodidactas · Docentes |
| **Tipo de recurso** | Apunte · Guía · Ejercicios · Evaluación · Proyecto · Tutorial · Video · Código · Enlace · Presentación |
| **Formato** | PDF · DOC · PPT · XLS · Código · Video · Enlace · HTML |

Un mismo tema (p. ej. *SQL*) aparece conectado en proyectos, materiales, lenguajes, rutas, blog y búsqueda.

## 6. Sistema de proyectos

- **Tarjeta:** nombre, descripción, área, tecnologías, nivel, estado (Publicado / En desarrollo / Planificado), botón *Ver proyecto*.
- **Ficha (12 bloques):** problema · objetivo · conceptos · herramientas · desarrollo (pasos) · código · imágenes · resultado · qué aprendimos · actividad propuesta · descargables · mejoras.
- **GitHub:** cada proyecto puede tener `github`, `demo`, `readme` → se muestra un panel con código fuente, README, tecnologías, demo, capturas y objetivo educativo.
- **Proyectos de alumnos:** galería aparte, solo iniciales/identificador, con aviso de autorización obligatorio.

## 7. Sistema de recursos

- **Materiales** (`data/materiales.js`): cada recurso tiene materia, nivel, tema, dificultad, tipo y formato → filtros combinables + URL compartible (`materiales.html?tema=sql&nivel=inicial`).
- **Descargas** (`data/descargas.js`, generado): nombre, tipo, tamaño, descripción, fecha de actualización. Generado por `scripts/manifest.mjs` a partir de la carpeta `descargas/`.
- **Botón "Descargar" inteligente:** si el archivo aún no existe se muestra *Próximamente* (deshabilitado) → nunca hay enlaces rotos.
- **Archivos pesados / editables** (DOC, PPT, XLS, videos): se enlazan desde Google Drive o YouTube con el mismo modelo de datos.

## 8. Integraciones

Configuradas en un solo lugar (`data/sitio.js → integraciones`). Si un campo está vacío, el componente no se muestra.

| Servicio | Uso |
|---|---|
| GitHub | Código fuente, README y demo de cada proyecto |
| YouTube | Videos embebidos (modo privacidad `youtube-nocookie`) |
| Google Drive | Archivos DOC/PPT/XLS y vista previa |
| Google Forms | Evaluaciones y autoevaluaciones |
| Google Classroom | Enlace por curso |
| Google Calendar | Agenda de entregas / clases de consulta |
| Canva | Presentaciones e infografías embebidas |
| Notion | Planificaciones y documentación |
| Formspree (u otro) | Envío del formulario de contacto |

## 9. Estrategia de crecimiento

| Etapa | Qué se suma | Cambio técnico |
|---|---|---|
| **1 — Base (hoy)** | Portfolio, proyectos, 9 lenguajes, materiales, rutas, IA, blog | Sitio estático |
| **2 — Contenido** | Más proyectos, apuntes, videos, artículos | Solo editar `data/` |
| **3 — Cursos** | Más materias, rutas por curso, Classroom | Nuevas entradas en `rutas.js` |
| **4 — Automatización** | Generar páginas estáticas por proyecto/artículo (SEO) | Script en `scripts/` |
| **5 — Cuentas** | Progreso sincronizado, entregas | Reemplazar `ProgressStore` por API (Supabase / Firebase) |

**Separación de contenidos**

| Público | Educativo abierto | Privado (fuera del sitio) |
|---|---|---|
| Perfil, portfolio, proyectos, blog | Materiales, rutas, ejercicios, proyectos de alumnos autorizados | Notas, datos de alumnos, evaluaciones con respuestas, autorizaciones firmadas → Classroom / Drive privado |
