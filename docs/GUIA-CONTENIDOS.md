# Guía para agregar contenido

Todo el contenido vive en `data/`. Copiá un objeto existente, cambiá el `id` (minúsculas, sin espacios ni acentos) y completá. Los campos vacíos no se muestran.

| Quiero agregar… | Archivo | Notas |
|---|---|---|
| Un proyecto | `data/proyectos.js` | Código y archivos en `descargas/proyectos/<id>/`. Imágenes en `assets/img/proyectos/` **con `alt`**. |
| Un material | `data/materiales.js` | `archivo` vacío → botón "Próximamente". Para Drive/YouTube usá `abrir` con el enlace. |
| Un apunte | `scripts/apuntes-src/<id>.html` | Bloque `<!--meta …-->` al inicio. Después: `build.mjs` y `build-pdfs.mjs`. |
| Ejemplos de un lenguaje | `descargas/programacion/<lenguaje>/` | Aparecen solos en la página del lenguaje. |
| Un lenguaje nuevo | `data/lenguajes.js` | + carpeta en `descargas/programacion/<id>/`. |
| Una ruta | `data/rutas.js` | `recursos` usa ids de materiales; `enlaces` acepta cualquier página. |
| Un artículo | `data/blog.js` | `contenido` en HTML simple. |
| Trabajo de alumnos | `data/alumnos-proyectos.js` | ⚠ Solo con autorización. Solo iniciales o identificador. |
| Un área / categoría | `data/taxonomia.js` | Se propaga a filtros, búsqueda y tarjetas. |

Después de agregar archivos ejecutá `node scripts/build.mjs`: recalcula tamaños y fechas y **falla si hay un enlace roto**.

## Integraciones

En `data/sitio.js → integraciones` poné `activo: true` y el enlace/ID.

## Cuentas de usuario (futuro)

El progreso de las rutas usa `WF.ProgressStore` (en `assets/js/core.js`). Para sincronizarlo con cuentas (Supabase, Firebase o API propia):

```js
WF.ProgressStore.setAdapter({
  load: () => datosDelUsuario,          // { "id-ruta": [0, 1, 2] }
  save: (data) => enviarAlServidor(data),
});
```

Ninguna página necesita cambios.

## Privacidad (checklist antes de publicar)

- [ ] Sin apellidos, fotos, datos de contacto ni notas de estudiantes.
- [ ] Datos de ejemplo siempre ficticios y anónimos.
- [ ] Autorización firmada guardada en forma privada (modelo en `descargas/docentes/`).
- [ ] Códigos de Classroom y enlaces privados fuera del sitio.
