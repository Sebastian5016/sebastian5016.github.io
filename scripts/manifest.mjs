// ==========================================================================
// Genera data/descargas.js a partir de la carpeta descargas/
// - Calcula tamaño y fecha de actualización de cada archivo.
// - Incrusta el contenido de los archivos de código (para mostrarlo en el sitio
//   sin servidor) → el código que se ve es SIEMPRE el mismo que se descarga.
// - Verifica que todos los archivos referenciados en data/*.js existan.
//   Si falta alguno, termina con error → nunca se publican enlaces rotos.
// Uso: node scripts/manifest.mjs
// ==========================================================================
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "descargas");
const CODE = new Set([".py", ".c", ".cpp", ".java", ".js", ".vb", ".html", ".css", ".sql", ".ino", ".md", ".csv", ".txt"]);
const LANG = { ".py": "python", ".c": "c", ".cpp": "cpp", ".ino": "cpp", ".java": "java", ".js": "javascript", ".vb": "vbnet", ".html": "html", ".css": "css", ".sql": "sql", ".md": "markdown", ".csv": "csv", ".txt": "texto" };
const TIPO = { ".pdf": "PDF", ".csv": "CSV", ".txt": "TXT", ".md": "MD", ".html": "HTML", ".doc": "DOC", ".docx": "DOC", ".ppt": "PPT", ".pptx": "PPT", ".xls": "XLS", ".xlsx": "XLS" };

function walk(d) {
  return readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
}
function gitDate(p) {
  try { const d = execSync(`git log -1 --format=%cs -- "${p}"`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); if (d) return d; } catch {}
  return statSync(p).mtime.toISOString().slice(0, 10);
}

const archivos = {};
for (const abs of walk(dir).sort()) {
  const rel = relative(root, abs).split("\\").join("/");
  const ext = extname(abs).toLowerCase();
  const size = statSync(abs).size;
  const item = { ruta: rel, nombre: rel.split("/").pop(), ext: ext.slice(1), tipo: TIPO[ext] || "Código", bytes: size, actualizado: gitDate(abs) };
  if (CODE.has(ext) && size < 40000) { item.lenguaje = LANG[ext]; item.contenido = readFileSync(abs, "utf8"); }
  archivos[rel] = item;
}

// Verificación de referencias en los datos
const refs = new Set();
for (const f of readdirSync(join(root, "data")).filter(f => f.endsWith(".js") && f !== "descargas.js")) {
  const txt = readFileSync(join(root, "data", f), "utf8");
  for (const m of txt.matchAll(/["'`](descargas\/[^"'`]+)["'`]/g)) refs.add(m[1]);
  for (const m of txt.matchAll(/["'`](apuntes\/[^"'`]+\.html)["'`]/g)) refs.add(m[1]);
}
const rotos = [...refs].filter(r => r.startsWith("descargas/") ? !archivos[r] : !safeExists(join(root, r)));
function safeExists(p) { try { statSync(p); return true; } catch { return false; } }

const out = `/* ARCHIVO GENERADO por scripts/manifest.mjs — no editar a mano. */
window.WF = window.WF || {};
WF.descargas = ${JSON.stringify(archivos, null, 1)};
`;
writeFileSync(join(root, "data/descargas.js"), out);
console.log(`✔ ${Object.keys(archivos).length} archivos en data/descargas.js · ${refs.size} referencias verificadas`);
if (rotos.length) { console.error("✘ Enlaces rotos:\n  " + rotos.join("\n  ")); process.exit(1); }
