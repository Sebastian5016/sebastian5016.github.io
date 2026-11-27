// ==========================================================================
// Genera el CV público en PDF (A4) y su miniatura a partir de data/perfil.js
// y data/sitio.js. Sin DNI ni domicilio exacto.
// Uso: node scripts/build-cv.mjs   (requiere Chromium de Playwright)
// Salida: descargas/cv/CV-Walter-Sebastian-Fernandez.pdf · assets/img/cv-thumb.jpg
// ==========================================================================
import { mkdirSync, writeFileSync, readFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { loadData, phone } from "./portfolio-template.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { perfil: P, sitio: S } = loadData(root);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const photo = "data:image/jpeg;base64," + readFileSync(join(root, "assets/img/walter-sm.jpg")).toString("base64");
const exp = (list) => list.map((e) => `<div class="item"><div class="row"><b>${esc(e.cargo)}</b><span>${esc(e.periodo)}</span></div><div class="place">${esc(e.lugar)}</div>${e.aporta ? `<p>Aporta: ${esc(e.aporta)}</p>` : ""}</div>`).join("");

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>CV — ${esc(P.nombre)}</title>
<style>
@page { size: A4; margin: 14mm 14mm 12mm; }
* { box-sizing: border-box; }
body { margin: 0; font: 9.2pt/1.4 "Geist", "Inter", "Segoe UI", Arial, sans-serif; color: #1a1726; }
header { display: flex; gap: 16px; align-items: center; padding-bottom: 12px; border-bottom: 2px solid #5236E0; }
header img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; }
h1 { font-size: 20pt; margin: 0; letter-spacing: -0.02em; line-height: 1.1; }
.title { color: #5236E0; font-weight: 600; margin: 3px 0 4px; }
.contact { font-size: 8.6pt; color: #4a4560; }
.contact span + span::before { content: " · "; }
main { display: grid; grid-template-columns: 1.55fr 1fr; gap: 20px; margin-top: 14px; }
h2 { font-size: 8.6pt; text-transform: uppercase; letter-spacing: 0.1em; color: #5236E0; margin: 11px 0 5px; border-bottom: 1px solid #ddd8ef; padding-bottom: 3px; }
h2:first-child { margin-top: 0; }
p { margin: 0; }
.item { margin-bottom: 6px; break-inside: avoid; }
.row { display: flex; justify-content: space-between; gap: 10px; }
.row span { color: #625C7E; white-space: nowrap; font-size: 8.6pt; }
.place { color: #4a4560; font-size: 8.6pt; }
ul { margin: 0; padding-left: 14px; }
li { margin: 1px 0; }
.chips { font-size: 8.8pt; color: #2a2638; }
.k { font-weight: 600; }
.lead { color: #2a2638; }
footer { margin-top: 12px; font-size: 7.8pt; color: #8a849f; text-align: center; }
</style></head><body>
<header><img src="${photo}" alt=""><div>
  <h1>${esc(P.nombre)}</h1>
  <div class="title">${esc(P.titulo.replace(/\|/g, "·"))}</div>
  <div class="contact">${[S.contacto.email && `<span>${esc(S.contacto.email)}</span>`, S.redes.whatsapp && `<span>WhatsApp ${esc(phone(S.redes.whatsapp))}</span>`, `<span>${esc(P.ubicacion)}</span>`, `<span>${esc(S.url)}portfolio.html</span>`].filter(Boolean).join("")}</div>
</div></header>
<main>
  <section>
    <h2>Perfil</h2><p class="lead">${esc(P.bajada)}</p>
    <h2>Experiencia docente</h2>
    <div class="item"><div class="row"><b>Profesor de NTICx y Lenguajes Tecnológicos</b><span>Actualidad</span></div>
      <ul>${P.escuelas.map((d) => `<li>${esc(d.materia)} — ${esc(d.escuela)} (${esc(d.lugar)}) · ${esc(d.cursos)}</li>`).join("")}</ul></div>
    
    <h2>Experiencia profesional y educativa</h2>${exp(P.experiencia.filter((e) => e.periodo !== "Actualidad"))}
    <h2>Formación</h2>${P.formacion.map((f) => `<div class="item"><div class="row"><b>${esc(f.t)}</b><span>${esc(P.estadosFormacion[f.estado])}${f.a ? ` · ${esc(f.a)}` : ""}</span></div>${f.i ? `<div class="place">${esc(f.i)}</div>` : ""}</div>`).join("")}
  </section>
  <aside>
    <h2>Áreas</h2><ul class="chips">${P.areas.map((a) => `<li>${esc(a.t)}</li>`).join("")}</ul>
    <h2>Niveles</h2><p class="chips">${P.niveles.map(esc).join(" · ")}</p>
    <h2>Credenciales</h2>${P.credenciales.map((x) => `<p class="chips">${esc(x.t)} — ${esc(x.d)}</p>`).join("")}
    ${P.competencias.map((g) => `<h2>Competencias ${esc(g.t.toLowerCase())}</h2><p class="chips">${g.items.map(esc).join(" · ")}</p>`).join("")}
    <h2>Tecnologías</h2>${P.tecnologias.map((g) => `<p class="chips"><span class="k">${esc(g.t)}:</span> ${g.items.map(esc).join(", ")}</p>`).join("")}
    <h2>Idiomas</h2><p class="chips">${P.idiomas.map((l) => `${esc(l.t)} — ${esc(l.n)}`).join("<br>")}</p>
  </aside>
</main>
<footer>Portfolio y materiales: ${esc(S.url)}portfolio.html</footer>
</body></html>`;

const outDir = join(root, "descargas/cv");
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, "cv.html"); // temporal: se borra al terminar
writeFileSync(tmp, html);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
await page.emulateMedia({ media: "print" });
const pdfPath = join(outDir, "CV-Walter-Sebastian-Fernandez.pdf");
await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
// Miniatura de 420 × 594 px: la página A4 en pantalla, reducida con zoom CSS
const thumb = await browser.newPage({ viewport: { width: 420, height: 594 } });
await thumb.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
await thumb.addStyleTag({ content: "html{zoom:0.529}body{padding:14mm;width:210mm;min-height:297mm;background:#fff}" });
await thumb.screenshot({ path: join(root, "assets/img/cv-thumb.jpg"), type: "jpeg", quality: 82 });
await browser.close();
unlinkSync(tmp);
console.log("✔ CV:", pdfPath.replace(root + "/", ""));
