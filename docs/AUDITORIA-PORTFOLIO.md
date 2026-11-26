# Auditoría de `portfolio.html` (antes de la reconstrucción)

Fecha: 26/11/2026 · Fuente de contenido: proyecto actual + CV (PDF) + tecnologías indicadas por el propio Walter.

## Estructura técnica encontrada
- Página generada desde `src/pages/portfolio.html` por `scripts/build.mjs`.
- Carga **~370 KB** de CSS/JS/datos (incluye `descargas.js` con todo el código de la biblioteca, `lenguajes.js`, `blog.js`, `materiales.js`…) que esta página **no usa**.
- Renderizado por funciones `portfolio()` / `sobreMi()` en `pages.js`, que comparten datos de `sitio.js` con la página "Sobre mí": **dos páginas casi iguales** compitiendo.

## Problemas detectados

| Área | Problema |
|---|---|
| **Concepto** | Se lee como un CV: barra lateral + 8 bloques numerados (01, 01·b, 02…). No hay hero ni relato. |
| **Mensaje** | No responde en 10 segundos *quién es / qué hace / qué aporta*. El diferencial (gestión + técnica + aula) no aparece. |
| **Contenido redundante** | "Sobre mí" y "Portfolio" repiten trayectoria, competencias y metodología. |
| **Trayectoria** | Formación y experiencia mezcladas en una sola línea de 11 ítems; no muestra evolución. |
| **Tecnologías** | Faltan React, React Native, Expo, Node.js, Express, Next.js, SQL Server, PostgreSQL, Prisma, PLC, SAP. Presentadas como chips sueltos. |
| **Proyectos** | Mezcla material didáctico con proyectos profesionales; estados en jerga interna (publicado/planificado). |
| **Aportes** | 8 tarjetas idénticas: aspecto de plantilla. |
| **Faltantes** | No hay enfoque educativo, ni sección de IA y tecnología educativa, ni cierre de contacto. |
| **Mobile** | La barra lateral se apila arriba: hay que desplazarse mucho antes de ver contenido. |
| **SEO** | `title` y `description` no siguen lo pedido; un único `h1` genérico. |
| **Rendimiento** | Datos y scripts innecesarios; efectos globales (aurora, halo) que esta página no necesita. |
| **Contacto** | Sin correo ni canal directo configurado: el formulario no puede enviar. ⚠ Pendiente del propietario. |

## Información profesional conservada (verificada)
Ministerio de Justicia PBA 2000–2026 (instrucción, coordinación y conducción de equipos; retirado) ·
Coordinador de Educación 2021–2026 · Instructor de personal, Sección Cinotecnia, SPB 2017–2021 ·
El Paisa Servicios Integrales 2012–actualidad · TecnoMayores 2026–actualidad ·
Docente NTICx (EES N.º 38, ES N.º 178) y Lenguajes Tecnológicos (EEST N.º 10) ·
TS Análisis y Programación de Aplicaciones (ISFDyT N.º 46, 2026, en trámite) · Diplomatura en Ciberseguridad (UNNE, 2024) ·
Técnico en Refrigeración Industrial (UTN, 2014) · TS Seguridad Institucional (2009) · Tramo pedagógico (en curso) ·
DGCyE Listado 108 A 2027 · Inglés B1.

## Decisiones
1. `portfolio.html` pasa a ser **la** presentación profesional, en una sola página con relato propio.
2. `sobre-mi.html` redirige al perfil del portfolio (sin contenido duplicado).
3. Contenido profesional centralizado en `data/perfil.js`.
4. La página carga solo lo que usa: `tokens.css` + `portfolio.css` + `perfil.js` + `portfolio.js`.
5. No se muestran niveles de dominio de tecnologías ni métricas que no estén respaldadas.
