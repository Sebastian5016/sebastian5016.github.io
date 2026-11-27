// ==========================================================================
// BUILD de la plataforma
//   node scripts/build.mjs
// 1. Genera los apuntes (apuntes/*.html) desde scripts/apuntes-src/
// 2. Genera data/descargas.js y verifica enlaces rotos (scripts/manifest.mjs)
// 3. Genera las páginas *.html de la raíz desde src/pages/ con el <head> común
// 4. Genera sitemap.xml y robots.txt
// Para regenerar los PDF de apuntes: node scripts/build-pdfs.mjs
// ==========================================================================
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { loadData, render as renderPortfolio } from "./portfolio-template.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const run = (f) => execFileSync(process.execPath, [join(root, "scripts", f)], { stdio: "inherit" });
run("build-apuntes.mjs");
run("manifest.mjs");

const sitio = readFileSync(join(root, "data/sitio.js"), "utf8");
const BASE = (sitio.match(/url:\s*"([^"]+)"/) || [])[1] || "/";
const UPDATED = (sitio.match(/actualizado:\s*"([^"]+)"/) || [])[1] || new Date().toISOString().slice(0, 10);
const NAME = "Walter Sebastián Fernández";
const KEYWORDS = "profesor de informática, profesor de tecnología, docente de informática, programación, educación tecnológica, informática educativa, educación digital, IA educativa, materiales de informática, recursos para estudiantes, portfolio docente";
const DATA = ["sitio", "taxonomia", "descargas", "proyectos", "lenguajes", "materiales", "rutas", "blog", "alumnos-proyectos", "secciones"];

const PERSON = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": BASE + "#walter", name: NAME, jobTitle: "Profesor de Informática", image: BASE + "assets/img/walter.jpg", address: { "@type": "PostalAddress", addressLocality: "Ramos Mejía", addressRegion: "Buenos Aires", addressCountry: "AR" }, alumniOf: [{ "@type": "EducationalOrganization", name: "ISFDyT N.º 46" }, { "@type": "CollegeOrUniversity", name: "Universidad Nacional del Nordeste" }, { "@type": "CollegeOrUniversity", name: "Universidad Tecnológica Nacional" }], url: BASE, knowsAbout: ["Informática", "Programación", "Bases de datos", "Redes", "Seguridad informática", "Inteligencia artificial", "Educación digital", "Pensamiento computacional"], sameAs: [...sitio.matchAll(/(linkedin|github|youtube):\s*"(https:[^"]+)"/g)].map((m) => m[2]) },
    { "@type": "WebSite", "@id": BASE + "#web", url: BASE, name: `${NAME} · Profesor de Informática`, inLanguage: "es", publisher: { "@id": BASE + "#walter" } },
  ],
};

const head = (m, file) => `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${m.title}</title>
<meta name="description" content="${m.desc}">
<meta name="author" content="${NAME}">
<meta name="keywords" content="${KEYWORDS}">
${m.sitemap === false ? '<meta name="robots" content="index, follow">\n' : ""}<link rel="canonical" href="${BASE}${file === "index.html" ? "" : file}">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_AR">
<meta property="og:site_name" content="${NAME} · Profesor de Informática">
<meta property="og:title" content="${m.title}">
<meta property="og:description" content="${m.desc}">
<meta property="og:url" content="${BASE}${file === "index.html" ? "" : file}">
<meta property="og:image" content="${BASE}${m.og || "assets/img/og.png"}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#07040E">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/tokens.css">
${m.layout === "portfolio"
  ? `<link rel="stylesheet" href="assets/css/portfolio.css">\n<script>document.documentElement.classList.add("js")</script>`
  : `<link rel="stylesheet" href="assets/css/main.css">\n<script src="assets/js/theme.js"></script>`}
${m.page === "inicio" ? `<script type="application/ld+json">${JSON.stringify(PERSON)}</script>\n` : ""}${m.layout === "portfolio" ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: PERSON["@graph"][0] })}</script>\n` : ""}${m.redirect ? `<meta http-equiv="refresh" content="0; url=${m.redirect}">\n` : ""}</head>`;

// Layout "portfolio": página autónoma, sin el motor de la plataforma
const portfolioBody = (m, html) => `<body data-page="${m.page}">
${html}
<script src="assets/js/portfolio.js"></script>
</body>
</html>
`;
const PDATA = loadData(root);

const body = (m, content) => `<body data-page="${m.page}">
<a class="skip-link" href="#main">Saltar al contenido</a>
<div id="site-header"></div>
<noscript><nav class="noscript" aria-label="Navegación básica"><a href="index.html">Inicio</a> · <a href="portfolio.html">Portfolio docente</a> · <a href="alumnos.html">Recursos para alumnos</a> · <a href="contacto.html">Contacto</a></nav></noscript>
<main id="main" tabindex="-1">
${content}
</main>
<div id="site-footer"></div>
${DATA.map((d) => `<script src="data/${d}.js"></script>`).join("\n")}
<script src="assets/js/core.js"></script>
<script src="assets/js/pages.js"></script>
<script src="assets/js/fx.js"></script>
</body>
</html>
`;

const pages = [];
for (const f of readdirSync(join(root, "src/pages")).filter((f) => f.endsWith(".html"))) {
  const raw = readFileSync(join(root, "src/pages", f), "utf8");
  const mm = raw.match(/<!--meta\s+(\{[\s\S]*?\})\s*-->/);
  if (!mm) throw new Error("Falta meta en " + f);
  const m = JSON.parse(mm[1]);
  const content = raw.slice(mm[0].length).trim();
  if (m.layout === "portfolio") {
    const { html, missingDirect } = renderPortfolio(PDATA, root);
    writeFileSync(join(root, f), head(m, f) + "\n" + portfolioBody(m, html));
    if (missingDirect) console.warn("⚠ Portfolio: falta un canal directo (correo, WhatsApp, LinkedIn o formulario) en data/sitio.js. Solo se muestra GitHub.");
  } else writeFileSync(join(root, f), head(m, f) + "\n" + body(m, content));
  pages.push({ f, m });
}
console.log(`✔ ${pages.length} páginas generadas`);

// Sitemap: páginas + detalles (proyectos, lenguajes, rutas, artículos)
const ids = (file, re) => [...readFileSync(join(root, "data", file), "utf8").matchAll(re)].map((x) => x[1]);
const urls = [
  ...pages.filter((p) => p.m.sitemap !== false).map((p) => ({ loc: p.f === "index.html" ? "" : p.f, pr: p.m.priority || "0.5" })),
  ...ids("proyectos.js", /^\s{4}id: "([^"]+)"/gm).map((id) => ({ loc: `proyecto.html?id=${id}`, pr: "0.8" })),
  ...ids("lenguajes.js", /^\s{4}id: "([^"]+)"/gm).map((id) => ({ loc: `lenguaje.html?l=${id}`, pr: "0.8" })),
  ...ids("rutas.js", /^\s{4}id: "([^"]+)"/gm).map((id) => ({ loc: `ruta.html?id=${id}`, pr: "0.7" })),
  ...ids("blog.js", /^\s{4}id: "([^"]+)"/gm).map((id) => ({ loc: `articulo.html?id=${id}`, pr: "0.7" })),
  ...readdirSync(join(root, "apuntes")).filter((f) => f.endsWith(".html")).map((f) => ({ loc: `apuntes/${f}`, pr: "0.7" })),
];
writeFileSync(join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE}${u.loc.replace(/&/g, "&amp;")}</loc><lastmod>${UPDATED}</lastmod><priority>${u.pr}</priority></url>`).join("\n")}
</urlset>
`);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /scripts/\n\nSitemap: ${BASE}sitemap.xml\n`);
console.log(`✔ sitemap.xml (${urls.length} URLs) y robots.txt`);
