// Genera /apuntes/*.html a partir de scripts/apuntes-src/*.html
// Cada fuente empieza con un bloque de metadatos:
// <!--meta {"titulo":"…","area":"…","nivel":"…","descripcion":"…"} -->
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "scripts/apuntes-src");
const out = join(root, "apuntes");

for (const file of readdirSync(src).filter(f => f.endsWith(".html"))) {
  const raw = readFileSync(join(src, file), "utf8");
  const m = raw.match(/<!--meta\s+(\{[\s\S]*?\})\s*-->/);
  if (!m) throw new Error(`Falta meta en ${file}`);
  const meta = JSON.parse(m[1]);
  const body = raw.slice(m[0].length).trim();
  const slug = file.replace(/\.html$/, "");
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.titulo} — Apunte · Walter Sebastián Fernández</title>
<meta name="description" content="${meta.descripcion}">
<meta name="author" content="Walter Sebastián Fernández">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600&family=Geist+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="apunte.css">
<link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
</head>
<body>
<div class="wrap">
  <div class="top">
    <span>Walter Sebastián Fernández · Apuntes de Informática</span>
    <span class="noprint"><a href="../alumnos.html">← Recursos para alumnos</a> · <a href="../descargas/apuntes/${slug}.pdf" download>Descargar PDF</a> · <button class="print-btn" onclick="print()">Imprimir</button></span>
  </div>
  <div class="kicker">Apunte · ${meta.area}</div>
  <h1>${meta.titulo}</h1>
  <div class="meta"><span>Nivel: ${meta.nivel}</span><span>Lectura: ${meta.lectura}</span><span>Actualizado: ${meta.fecha}</span></div>
${body}
  <footer>Material educativo abierto · Walter Sebastián Fernández · Licencia CC BY-NC-SA 4.0 · Podés usarlo y adaptarlo citando la fuente, sin fines comerciales.</footer>
</div>
</body>
</html>
`;
  writeFileSync(join(out, `${slug}.html`), html);
  console.log("✔ apuntes/" + slug + ".html");
}
