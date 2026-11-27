// ==========================================================================
// Plantilla del portfolio docente. Genera HTML estático a partir de
// data/perfil.js y data/sitio.js (la usa scripts/build.mjs, layout "portfolio").
// Todo el contenido queda en el HTML: se lee completo aunque falle JavaScript.
// Orden pensado para quien decide: quién es → qué aporta → cómo enseña → qué
// enseña → qué hizo → trayectoria → formación → CV → contacto.
// ==========================================================================
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ext = (u) => (/^https?:/.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "");
const ICON = {
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  out: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  down: '<path d="M12 4v12"/><path d="m6 10 6 6 6-6"/><path d="M5 20h14"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  wa: '<path d="M3 21l1.65-4.9A9 9 0 1 1 7.9 19.4z"/><path d="M8.5 9.5c.3 2.4 2.6 4.8 5 5.2l1.2-1.2 2 1-.4 1.6c-3.8.4-8.6-4.3-8.3-8.2l1.6-.4 1 2z"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  pin: '<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  learn: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  school: '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 3.45 1.73a1 1 0 0 1 .55.9V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7.38a1 1 0 0 1 .55-.9L6 10"/><path d="M18 5v17"/><path d="m4 6 7.1-3.55a2 2 0 0 1 1.8 0L20 6"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h8M8 17h5"/>',
};
const icon = (n, cls = "") => `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[n]}</svg>`;

export function loadData(root) {
  const ctx = { window: {} };
  ctx.WF = ctx.window.WF = {};
  vm.createContext(ctx);
  for (const f of ["sitio", "perfil"]) vm.runInContext(readFileSync(join(root, "data", f + ".js"), "utf8"), ctx);
  return ctx.WF;
}

export const NAV = [["perfil", "Perfil"], ["propuesta", "Propuesta docente"], ["aula", "Trabajo en aula"], ["proyectos", "Proyectos"], ["experiencia", "Experiencia"], ["formacion", "Formación"], ["cv", "CV"], ["contacto", "Contacto"]];

/** Teléfono legible a partir del formato internacional (5491165631842 → 11 6563-1842). */
export const phone = (wa) => { const d = String(wa || "").replace(/^549?/, ""); return d.length === 10 ? `${d.slice(0, 2)} ${d.slice(2, 6)}-${d.slice(6)}` : d; };


export function render(WF, root) {
  const P = WF.perfil, S = WF.sitio, c = S.contacto, r = S.redes;
  const cvOk = existsSync(join(root, P.cv));
  const cvKb = cvOk ? Math.round(statSync(join(root, P.cv)).size / 1024) : 0;
  const cvBtn = (cls = "b b--main") => (cvOk ? `<a class="${cls}" href="${esc(P.cv)}" download>Descargar CV ${icon("down")}</a>` : "");
  const mailto = c.email ? `mailto:${c.email}?subject=${encodeURIComponent("Contacto desde su portfolio docente")}` : "";
  const wa = r.whatsapp ? `https://wa.me/${r.whatsapp}?text=${encodeURIComponent("Hola Walter, te escribo por tu portfolio docente.")}` : "";
  const link = (l, cls = "lnk") => `<a class="${cls}" href="${esc(l.u)}"${ext(l.u)}>${esc(l.t)} ${icon(/^https?:/.test(l.u) ? "out" : "arrow")}</a>`;
  const head = (kicker, id, title, intro = "", split = false) => `<div class="head${split ? " head--split" : ""}" data-rv><div><p class="kicker">${kicker}</p><h2 class="h2" id="${id}">${title}</h2></div>${intro ? `<p class="intro">${intro}</p>` : ""}</div>`;

  /* --- Encabezado y menú --- */
  const header = `
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="top" id="top">
  <div class="wrap top__in">
    <a class="brand" href="#inicio" aria-label="${esc(P.nombre)}, inicio del portfolio">
      <span class="brand__mark" aria-hidden="true">WF</span>
      <span class="brand__name">Walter S. Fernández<small>Profesor de Informática · NTICx</small></span>
    </a>
    <nav class="nav" aria-label="Secciones del portfolio">
      <ul>${NAV.slice(0, 6).map(([id, t]) => `<li><a href="#${id}" data-spy="${id}">${t}</a></li>`).join("")}</ul>
    </nav>
    <div class="top__cta">${cvBtn("b b--sm")}<a class="b b--sm b--main" href="#contacto">Contactarme</a></div>
    <button class="top__menu" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Abrir menú">${icon("menu")}</button>
  </div>
</header>
<div class="sheet" id="sheet" hidden>
  <nav aria-label="Menú del portfolio"><ol><li><a href="#inicio">Inicio</a></li>${NAV.map(([id, t]) => `<li><a href="#${id}" data-spy="${id}">${t}</a></li>`).join("")}</ol></nav>
  <div class="btns">${cvBtn()}<a class="b" href="#contacto">Contactarme</a></div>
</div>`;

  /* --- 01 Portada --- */
  const hero = `
<section class="hero" id="inicio" aria-labelledby="hero-t">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <img class="hero__avatar" src="assets/img/walter-sm.jpg" alt="" width="88" height="88">
      <h1 id="hero-t" data-in style="--d:0">${esc(P.nombre)}</h1>
      <p class="hero__title" data-in style="--d:1">${P.titulo.split("|").map((x) => `<span>${esc(x.trim())}</span>`).join("")}</p>
      <p class="hero__lead" data-in style="--d:2">${esc(P.propuesta)}</p>
      <p class="hero__sub" data-in style="--d:3">${esc(P.bajada)}</p>
      <div class="btns" data-in style="--d:4">${cvBtn()}<a class="b" href="#contacto">Contactarme ${icon("mail")}</a></div>
      <a class="lnk hero__more" href="#propuesta" data-in style="--d:5">Ver mi propuesta docente ${icon("arrow")}</a>
    </div>
    <figure class="hero__media" data-in style="--d:2">
      <img class="hero__photo" src="${esc(P.foto)}" alt="${esc(P.fotoAlt)}" width="640" height="640" fetchpriority="high">
      <figcaption class="today"><span class="today__label"><span class="live" aria-hidden="true"></span>Hoy enseño</span><ul>${P.hoy.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></figcaption>
    </figure>
  </div>
  <div class="wrap"><ul class="keys" aria-label="Perfil en tres datos" data-in style="--d:5">${P.claves.map((k) => `<li><strong>${esc(k.t)}</strong><span>${esc(k.d)}</span></li>`).join("")}</ul></div>
</section>
<div class="motto"><div class="wrap"><p data-rv>${esc(P.lema)}</p></div></div>`;

  /* --- 02 Quién soy + experiencia docente actual --- */
  const perfil = `
<section class="sec" id="perfil" aria-labelledby="perfil-t">
  <div class="wrap">
    <div class="who">
      <div>
        <p class="kicker" data-rv>Perfil</p>
        <h2 class="h2" id="perfil-t" data-rv>Quién soy</h2>
        <p class="who__text" data-rv>${esc(P.quienSoy)}</p>
      </div>
      <div class="now" data-rv aria-labelledby="now-t">
        <h3 id="now-t"><span class="live" aria-hidden="true"></span>Experiencia docente actual</h3>
        <ul>${P.docenciaActual.map((d) => `<li><strong>${esc(d.materia)}</strong><span class="now__school">${esc(d.escuela)} · ${esc(d.lugar)}</span><span class="now__meta">${esc(d.nivel)} · ${esc(d.cursos)}</span></li>`).join("")}</ul>
        <p class="now__foot">Profesor · ${esc(P.docenciaPeriodo)}</p>
      </div>
    </div>
    <div class="stages" aria-labelledby="etapas-t">
      <h3 id="etapas-t" data-rv>${esc(P.etapasTitulo)}</h3>
      <ol>${P.etapas.map((e, i) => `<li data-rv style="--d:${i}"><strong>${esc(e.t)}</strong><p>${esc(e.d)}</p></li>`).join("")}</ol>
    </div>
  </div>
</section>`;

  /* --- 03 Qué puedo aportar --- */
  const aportes = `
<section class="sec sec--tint" id="aportes" aria-labelledby="aportes-t">
  <div class="wrap">
    ${head("Para su institución", "aportes-t", "Qué puedo aportar")}
    <div class="give">${P.aportes.map((a, i) => `<div class="give__col" data-rv style="--d:${i}"><p class="give__for">${esc(a.para)}</p><h3>${esc(a.foco)}</h3><ul class="checks">${a.items.map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
  </div>
</section>`;

  /* --- 04 Cómo entiendo la enseñanza --- */
  const propuesta = `
<section class="sec" id="propuesta" aria-labelledby="prop-t">
  <div class="wrap">
    ${head("Propuesta docente", "prop-t", "Cómo entiendo la enseñanza", esc(P.ensenanza), true)}
    <ul class="focus">${P.enfoque.map((e, i) => `<li data-rv style="--d:${i % 3}"><strong>${esc(e.t)}</strong><p>${esc(e.d)}</p></li>`).join("")}</ul>
    <div class="student" aria-labelledby="est-t">
      <h3 id="est-t" data-rv>Qué encuentra un estudiante en mis clases</h3>
      <ul>${P.estudiante.map((e, i) => `<li data-rv style="--d:${i % 3}"><strong>${esc(e.t)}</strong><span>${esc(e.d)}</span></li>`).join("")}</ul>
    </div>
    <aside class="ai" data-rv aria-labelledby="ia-t">
      <h3 id="ia-t">${esc(P.ia.t)}</h3>
      <p>${esc(P.ia.d)}</p>
      ${link(P.ia.enlace)}
    </aside>
  </div>
</section>`;

  /* --- 05 Cómo trabajo en el aula --- */
  const aula = `
<section class="sec sec--tint" id="aula" aria-labelledby="aula-t">
  <div class="wrap">
    ${head("Trabajo en aula", "aula-t", "Cómo trabajo en el aula", esc(P.procesoNota), true)}
    <ol class="steps">${P.proceso.map((s, i) => `<li data-rv style="--d:${i}"><span class="steps__n">${String(i + 1).padStart(2, "0")}</span><strong>${esc(s.t)}</strong><p>${esc(s.d)}</p></li>`).join("")}</ol>
  </div>
</section>`;

  /* --- 06 Así se ve mi trabajo --- */
  const evidencias = `
<section class="sec" id="evidencias" aria-labelledby="ev-t">
  <div class="wrap">
    ${head("Evidencias", "ev-t", "Así se ve mi trabajo", esc(P.evidenciasNota), true)}
    <ul class="proof">${P.evidencias.map((e, i) => `<li class="proof__item${e.imagen ? "" : " proof__item--empty"}" data-rv style="--d:${i % 3}">
      ${e.imagen ? `<div class="proof__img"><img src="${esc(e.imagen)}" alt="" width="800" height="500" loading="lazy" decoding="async"></div>` : `<div class="proof__img proof__img--empty" aria-hidden="true">${icon("users")}</div>`}
      <div class="proof__body">
        <span class="proof__type">${esc(e.tipo)}</span>
        <h3>${e.u ? `<a href="${esc(e.u)}"${ext(e.u)}>${esc(e.t)}</a>` : esc(e.t)}</h3>
        ${e.imagen ? `<p class="sr-only">${esc(e.alt)}</p>` : ""}
        <p>${esc(e.trabaja)}</p>
        <p class="proof__shows"><b>Demuestra:</b> ${esc(e.demuestra)}</p>
      </div>
    </li>`).join("")}</ul>
  </div>
</section>`;

  /* --- 07 Áreas --- */
  const areas = `
<section class="sec sec--tint" id="areas" aria-labelledby="areas-t">
  <div class="wrap">
    <div class="head head--split" data-rv><div><p class="kicker">Áreas</p><h2 class="h2" id="areas-t">Áreas en las que puedo aportar</h2></div><ul class="levels" aria-label="Niveles">${P.niveles.map((n) => `<li>${esc(n)}</li>`).join("")}</ul></div>
    <ul class="areas">${P.areas.map((a, i) => `<li class="${a.principal ? "is-main" : ""}" data-rv style="--d:${i % 4}"><h3>${esc(a.t)}</h3>${a.d ? `<p>${esc(a.d)}</p>` : ""}</li>`).join("")}</ul>
  </div>
</section>`;

  /* --- 08 Proyectos --- */
  const proyectos = `
<section class="sec" id="proyectos" aria-labelledby="proy-t">
  <div class="wrap">
    ${head("Proyectos", "proy-t", "Proyectos")}
    <div class="projects">${P.proyectos.map((p) => `<article class="project" data-rv>
      <header><span class="project__type">${esc(p.tipo)}</span><span class="state${/desarrollo|curso/i.test(p.estado) ? " state--dev" : ""}">${esc(p.estado)}</span></header>
      <h3>${esc(p.nombre)}</h3>
      <p>${esc(p.que)}</p>
      <dl>
        <div><dt>Problema que resuelve</dt><dd>${esc(p.problema)}</dd></div>
        <div><dt>Qué demuestra</dt><dd>${esc(p.demuestra)}</dd></div>
      </dl>
      <ul class="chips chips--mono" aria-label="Tecnologías">${p.tecnologias.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="project__links">${p.enlaces.map((l) => link(l)).join("")}</div>
    </article>`).join("")}</div>
  </div>
</section>`;

  /* --- 09 Experiencia profesional --- */
  const experiencia = `
<section class="sec sec--tint" id="experiencia" aria-labelledby="exp-t">
  <div class="wrap">
    ${head("Experiencia", "exp-t", "Experiencia profesional que también forma parte de mi manera de enseñar", "Una trayectoria profesional diversa que hoy aporta experiencia, criterio, organización y capacidad de resolución al trabajo docente.", true)}
    <ol class="exp-list">${P.experiencia.map((e) => `<li class="exp" data-rv><span class="exp__time">${esc(e.periodo)}</span><div><h3>${esc(e.cargo)}</h3><p class="exp__place">${esc(e.lugar)}</p><p>${esc(e.texto)}</p></div><p class="exp__gives"><span>Aporta hoy</span>${esc(e.aporta)}</p></li>`).join("")}</ol>
    <ul class="chips gives" aria-label="Competencias que aporta esta experiencia" data-rv>${P.expAporta.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  </div>
</section>`;

  /* --- 10 Formación --- */
  const formacion = `
<section class="sec" id="formacion" aria-labelledby="form-t">
  <div class="wrap form-grid">
    <div>
      <p class="kicker" data-rv>Formación</p>
      <h2 class="h2" id="form-t" data-rv>Formación</h2>
      <div class="creds" data-rv>
        <p class="creds__label">Credenciales docentes</p>
        ${P.credenciales.map((x) => `<p><b>${esc(x.t)}</b> ${esc(x.d)}</p>`).join("")}
        <p class="creds__label" style="margin-top:16px">Idiomas</p>
        <p>${P.idiomas.map((l) => `<b>${esc(l.t)}</b> ${esc(l.n)}`).join(" · ")}</p>
      </div>
    </div>
    <ol class="study">${P.formacion.map((f) => `<li class="${f.destacado ? "is-key" : ""}" data-rv><span class="study__group">${esc(f.grupo)}</span><h3>${esc(f.t)}</h3>${f.i ? `<p>${esc(f.i)}</p>` : ""}<p class="study__state"><span class="badge badge--${f.estado.replace(/\s/g, "-")}">${esc(P.estadosFormacion[f.estado])}</span>${f.a ? `<time>${esc(f.a)}</time>` : ""}</p></li>`).join("")}</ol>
  </div>
</section>`;

  /* --- 11 Competencias y tecnologías --- */
  const competencias = `
<section class="sec sec--tint" id="competencias" aria-labelledby="comp-t">
  <div class="wrap">
    ${head("Competencias", "comp-t", "Competencias y tecnologías")}
    <div class="skills">
      ${P.competencias.map((g, i) => `<div data-rv style="--d:${i}"><h3>${esc(g.t)}</h3><ul class="checks">${g.items.map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul></div>`).join("")}
      <div class="skills__tech" data-rv style="--d:2"><h3>Tecnológicas</h3><dl>${P.tecnologias.map((g) => `<div><dt>${esc(g.t)}</dt><dd>${g.items.map(esc).join(" · ")}</dd></div>`).join("")}</dl></div>
    </div>
  </div>
</section>`;

  /* --- 12 CV --- */
  const cv = `
<section class="sec" id="cv" aria-labelledby="cv-t">
  <div class="wrap">
    <div class="cv" data-rv>
      ${cvOk ? `<a class="cv__thumb" href="${esc(P.cv)}" download aria-label="Descargar CV en PDF"><img src="assets/img/cv-thumb.jpg" alt="Vista previa de la primera página del CV" width="420" height="594" loading="lazy" decoding="async"></a>` : ""}
      <div>
        <p class="kicker">CV</p>
        <h2 class="h2" id="cv-t">Mi CV</h2>
        <p class="intro">Para conocer mi trayectoria profesional y formación completa, podés descargar mi CV.</p>
        <div class="btns" style="margin-top:28px">${cvBtn()}</div>
        ${cvOk ? `<p class="cv__meta">${icon("file")}PDF · ${cvKb} KB · 1 página A4</p>` : ""}
      </div>
    </div>
  </div>
</section>`;

  /* --- 13 Contacto (última acción de la página) --- */
  const contacto = `
<section class="sec" id="contacto" aria-labelledby="contacto-t">
  <div class="wrap">
    <div class="talk" data-rv>
      <div>
        <p class="kicker">Contacto</p>
        <h2 class="h2" id="contacto-t">${esc(P.ctaTitulo)}</h2>
        <p class="intro">${esc(P.ctaTexto)}</p>
        <div class="btns" style="margin-top:32px">${mailto ? `<a class="b b--main" href="${esc(mailto)}">Contactarme ${icon("mail")}</a>` : ""}${cvBtn("b")}</div>
      </div>
      <ul class="ways" aria-label="Medios de contacto">
        ${c.email ? `<li><a href="${esc(mailto)}">${icon("mail")}<span><small>Correo</small>${esc(c.email)}</span></a></li>` : ""}
        ${wa ? `<li><a class="ways__wa" href="${esc(wa)}"${ext(wa)}>${icon("wa")}<span><small>WhatsApp</small>${esc(phone(r.whatsapp))}</span></a></li>` : ""}
        ${r.linkedin ? `<li><a href="${esc(r.linkedin)}"${ext(r.linkedin)}>${icon("briefcase")}<span><small>LinkedIn</small>Perfil profesional</span></a></li>` : ""}
        <li class="ways__place">${icon("pin")}<span><small>Zona</small>${esc(P.ubicacion)}</span></li>
      </ul>
    </div>
  </div>
</section>`;

  const footer = `
<footer class="foot">
  <div class="wrap foot__in">
    <span>© ${new Date().getFullYear()} ${esc(P.nombre)} · ${esc(P.titulo.replace(/\|/g, "·"))}</span>
    <nav aria-label="Enlaces del pie"><a href="index.html">Plataforma educativa</a>${r.github ? `<a href="${esc(r.github)}"${ext(r.github)}>GitHub</a>` : ""}<a href="privacidad.html">Privacidad</a><a href="#inicio">Volver arriba</a></nav>
  </div>
</footer>`;

  const html = header + `\n<main id="contenido">` + hero + perfil + aportes + propuesta + aula + evidencias + areas + proyectos + experiencia + formacion + competencias + cv + contacto + `\n</main>` + footer;
  return { html, missingDirect: !c.email && !wa, cvOk };
}
