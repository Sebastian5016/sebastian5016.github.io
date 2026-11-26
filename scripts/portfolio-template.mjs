// ==========================================================================
// Plantilla del portfolio: genera HTML estático a partir de data/perfil.js
// y data/sitio.js. La usa scripts/build.mjs (layout "portfolio").
// Todo el contenido queda en el HTML: indexable y legible sin JavaScript.
// ==========================================================================
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ext = (u) => /^https?:/.test(u) ? ' target="_blank" rel="noopener noreferrer"' : "";
const ICON = {
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  out: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  pin: '<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  spark: '<path d="M9.94 14.5A2 2 0 0 0 8.5 13.06L2.36 11.5a.5.5 0 0 1 0-.96L8.5 8.94A2 2 0 0 0 9.94 7.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 7.5A2 2 0 0 0 15.5 8.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 13.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
  form: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
};
const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[n]}</svg>`;

export function loadData(root) {
  const ctx = { window: {} };
  ctx.WF = ctx.window.WF = {};
  vm.createContext(ctx);
  for (const f of ["sitio", "perfil"]) vm.runInContext(readFileSync(join(root, "data", f + ".js"), "utf8"), ctx);
  return ctx.WF;
}

export const NAV = [["perfil", "Perfil"], ["experiencia", "Experiencia"], ["tecnologia", "Tecnología"], ["proyectos", "Proyectos"], ["docencia", "Docencia"], ["formacion", "Formación"]];

export function render(WF) {
  const P = WF.perfil, S = WF.sitio;
  const STATE = { finalizado: "FINALIZADO", desarrollo: "EN DESARROLLO", concepto: "CONCEPTO" };
  const c = S.contacto, r = S.redes;
  const channels = [
    c.email && `<a class="b b--main" href="mailto:${esc(c.email)}">Escribir un correo ${icon("mail")}</a>`,
    r.whatsapp && `<a class="b b--wa" href="https://wa.me/${esc(r.whatsapp)}"${ext("https:")}>WhatsApp ${icon("chat")}</a>`,
    (c.email || c.formEndpoint) && `<a class="b" href="contacto.html">Formulario de contacto ${icon("form")}</a>`,
    r.linkedin && `<a class="b" href="${esc(r.linkedin)}"${ext(r.linkedin)}>LinkedIn ${icon("linkedin")}</a>`,
    r.github && `<a class="b" href="${esc(r.github)}"${ext(r.github)}>GitHub ${icon("github")}</a>`,
  ].filter(Boolean);
  const missingDirect = !c.email && !r.whatsapp && !c.formEndpoint && !r.linkedin;

  // Hitos de la tarjeta "trayectoria" (hero)
  const trace = [
    ["2000", "Ministerio de Justicia PBA", "Instrucción y conducción"],
    ["2012", "El Paisa Servicios Integrales", "Desarrollo web y gestión"],
    ["2017", "Instructor de personal", "Servicio Penitenciario Bonaerense"],
    ["2021", "Coordinador de Educación", "Trayectorias educativas"],
    ["2026", "TecnoMayores", "Inclusión digital"],
    ["Hoy", "Docente de NTICx", "y Lenguajes Tecnológicos"],
  ];

  const header = `
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="top" id="top">
  <div class="wrap top__in">
    <a class="brand" href="#inicio" aria-label="${esc(P.nombre)} — volver al inicio">
      <span class="brand__mark" aria-hidden="true">wf<i>_</i></span>
      <span class="brand__name">Walter S. Fernández<small>Docente · Tecnología</small></span>
    </a>
    <nav class="nav" aria-label="Secciones del portfolio">
      <ul>${NAV.map(([id, t]) => `<li><a href="#${id}" data-spy="${id}">${t}</a></li>`).join("")}</ul>
    </nav>
    <div class="top__cta">
      <a class="b b--sm" href="index.html">Plataforma educativa</a>
      <a class="b b--sm b--main" href="#contacto">Hablemos</a>
    </div>
    <button class="top__menu" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Abrir menú">${icon("menu")}</button>
  </div>
</header>
<div class="sheet" id="sheet" hidden>
  <nav aria-label="Menú del portfolio"><ol>${NAV.map(([id, t]) => `<li><a href="#${id}" data-spy="${id}">${t}</a></li>`).join("")}<li><a href="#contacto">Contacto</a></li></ol></nav>
  <div class="btns"><a class="b b--main" href="#contacto">Hablemos ${icon("arrow", "go")}</a><a class="b" href="index.html">Plataforma educativa</a></div>
</div>`;

  const main = `
<main id="contenido">
<section class="hero" id="inicio" aria-labelledby="hero-t">
  <div class="wrap">
    <div class="hero__grid">
      <div>
        <p class="hero__role" data-in style="--d:0"><span class="live" aria-hidden="true"></span>${esc(P.rol)}</p>
        <h1 id="hero-t" data-in style="--d:1"><span>Walter Sebastián</span><span class="grad">Fernández</span></h1>
        <p class="hero__lead" data-in style="--d:2">${esc(P.frase)}</p>
        <div class="btns" data-in style="--d:3">
          <a class="b b--main" href="#perfil">Conocer mi perfil ${icon("arrow", "go")}</a>
          <a class="b" href="#proyectos">Ver proyectos</a>
        </div>
      </div>
      <aside class="trace" aria-label="Trayectoria resumida" data-in style="--d:3">
        <div class="trace__head"><b>trayectoria</b><span>2000 → hoy</span></div>
        <ol>${trace.map(([y, t, d], i) => `<li style="--d:${i}"><time>${y}</time><i aria-hidden="true"></i><p><strong>${esc(t)}</strong><span>${esc(d)}</span></p></li>`).join("")}</ol>
      </aside>
    </div>
    <ul class="facts" aria-label="Datos destacados" data-in style="--d:4">
      <li><strong>+25 años de trayectoria</strong><span>Ministerio de Justicia PBA</span></li>
      <li><strong>Técnico Superior</strong><span>Análisis y Programación</span></li>
      <li><strong>Diplomatura</strong><span>Ciberseguridad · UNNE</span></li>
      <li><strong>Docente en 3 escuelas</strong><span>NTICx · Lenguajes Tecnológicos</span></li>
    </ul>
  </div>
</section>

<section class="sec" id="perfil" aria-labelledby="perfil-t">
  <div class="wrap">
    <div class="about">
      <figure class="portrait" data-rv>
        <img src="${esc(P.foto)}" alt="${esc(P.fotoAlt)}" width="640" height="640" loading="lazy" decoding="async">
        <figcaption>${icon("pin")}${esc(P.ubicacion)}</figcaption>
      </figure>
      <div class="about__text">
        <p class="kicker" data-rv>Perfil</p>
        <h2 class="h2" id="perfil-t" data-rv>Sobre mí</h2>
        <div class="bio" style="margin-top:32px" data-rv>${P.sobreMi.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        <p class="pull" data-rv>${esc(P.sintesis)}</p>
      </div>
    </div>

    <div class="axes__head head head--split" data-rv>
      <div><p class="kicker">El diferencial</p><h2 class="h2" id="ejes-t">Una trayectoria diferente</h2></div>
      <p class="intro">Cuatro ejes que se sostienen entre sí: experiencia real, formación tecnológica, aula y gestión.</p>
    </div>
    <div class="axes" aria-labelledby="ejes-t">
      ${P.ejes.map((e, i) => `<article class="axis axis--${e.id}" data-rv style="--d:${i}">
        <h3 class="axis__label">${esc(e.titulo)}</h3>
        <p class="axis__num">${esc(e.dato)}${e.unidad ? `<small>${esc(e.unidad)}</small>` : ""}</p>
        <div><p class="axis__detail">${esc(e.detalle)}</p><p class="axis__text">${esc(e.texto)}</p></div>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="sec" id="aportes" aria-labelledby="aportes-t">
  <div class="wrap">
    <div class="head head--split" data-rv>
      <div><p class="kicker">Para su institución</p><h2 class="h2" id="aportes-t">¿Qué puedo aportar?</h2></div>
      <p class="intro">Experiencia real de gestión y capacitación, combinada con formación técnica y docente. Así se traduce en el día a día de una escuela.</p>
    </div>
    <div class="give">
      ${P.aportes.map((g, i) => `<div class="give__col" data-rv style="--d:${i}"><h3>${esc(g.para)} <span>${String(g.items.length).padStart(2, "0")}</span></h3><ul>${g.items.map((it) => `<li><strong>${esc(it.t)}</strong><p>${esc(it.d)}</p></li>`).join("")}</ul></div>`).join("")}
    </div>
  </div>
</section>

<section class="sec" id="experiencia" aria-labelledby="exp-t">
  <div class="wrap career">
    <div class="career__aside" data-rv>
      <p class="kicker">Experiencia</p>
      <h2 class="h2" id="exp-t">Una carrera que fue sumando capas</h2>
      <p class="intro">Cada etapa agregó algo que hoy llevo al aula.</p>
      <ol class="chain" aria-label="Evolución profesional">${P.evolucion.map((e) => `<li data-stage="${esc(e)}">${esc(e)}</li>`).join("")}</ol>
    </div>
    <ol class="jobs">
      ${P.experiencia.map((j) => `<li class="job${j.actual ? " job--now" : ""}" data-rv data-stages="${esc(j.etapa)}">
        <div class="job__meta"><span class="job__time">${esc(j.desde ? `${j.desde} – ${j.hasta}` : j.hasta)}</span><span class="job__stage">${esc(j.etapa)}</span></div>
        <h3>${esc(j.cargo)}</h3>
        <p class="job__place">${esc(j.lugar)}</p>
        <p>${esc(j.texto)}</p>
      </li>`).join("")}
    </ol>
  </div>
</section>

<section class="sec" id="tecnologia" aria-labelledby="tec-t">
  <div class="wrap">
    <div class="head head--split" data-rv>
      <div><p class="kicker">Tecnología</p><h2 class="h2" id="tec-t">Herramientas con las que trabajo</h2></div>
      <p class="intro">Lenguajes, entornos y conocimientos que uso en desarrollo y en la enseñanza.</p>
    </div>
    <div class="stack">
      ${(() => { const [first, ...rest] = P.tecnologias; return `<div class="stack__main" data-rv>
        <p class="stack__label"><b>${esc(first.titulo)}</b><span>${esc(first.nota)} · ${first.items.length}</span></p>
        <ul class="langs" aria-label="${esc(first.titulo)}">${first.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      <div class="stack__row">${rest.map((g, i) => `<div class="stack__card" data-rv style="--d:${i}"><h3>${esc(g.titulo)}</h3><p>${esc(g.nota)}</p><ul class="pills">${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>`; })()}
    </div>
  </div>
</section>

<section class="sec" id="proyectos" aria-labelledby="proy-t">
  <div class="wrap">
    <div class="head head--split" data-rv>
      <div><p class="kicker">Proyectos</p><h2 class="h2" id="proy-t">Lo que construí y construyo</h2></div>
      <p class="intro">Proyectos reales, con su estado actual. Sin maquetas ni ejemplos inventados.</p>
    </div>
    <ol class="cases">
      ${P.proyectos.map((p) => `<li class="case" data-rv>
        <div><span class="case__type">${esc(p.tipo)}</span><h3>${esc(p.nombre)}</h3><p class="case__desc">${esc(p.descripcion)}</p></div>
        <dl><div><dt>Objetivo</dt><dd>${esc(p.objetivo)}</dd></div></dl>
        <dl><div><dt>Tecnologías</dt><dd><ul class="pills">${p.tecnologias.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></dd></div>
          <div><dt>Estado</dt><dd><span class="state state--${p.estado}">${STATE[p.estado]}${p.nota ? ` <small>· ${esc(p.nota)}</small>` : ""}</span></dd></div></dl>
        <div class="case__links">${p.enlaces.map((l) => `<a class="lnk" href="${esc(l.u)}"${ext(l.u)}>${esc(l.t)} ${icon(/^https?:/.test(l.u) ? "out" : "arrow")}</a>`).join("")}</div>
      </li>`).join("")}
    </ol>
  </div>
</section>

<section class="sec sec--aula" id="docencia" aria-labelledby="doc-t">
  <div class="wrap">
    <div class="head" data-rv>
      <p class="kicker">Docencia</p>
      <h2 class="h2" id="doc-t">Mi enfoque educativo</h2>
      <p class="intro">${esc(P.enfoqueIntro)}</p>
    </div>
    <div class="teach">
      <ul class="principles">${P.enfoque.map((e, i) => `<li data-rv style="--d:${i % 2}"><strong>${esc(e.t)}</strong><p>${esc(e.d)}</p></li>`).join("")}</ul>
      <div>
        <div class="now" data-rv>
          <h3>Dónde enseño hoy</h3>
          <ul>${P.escuelas.map((s) => `<li><strong>${esc(s.escuela)} · ${esc(s.lugar)}</strong><span>${esc(s.materia)} — ${esc(s.cursos)}</span></li>`).join("")}</ul>
          <div class="now__foot"><span>${esc(P.habilitacion)}</span><span>${esc(P.niveles)}</span></div>
        </div>
        <div class="aula" data-rv>
          <strong>Plataforma educativa abierta</strong>
          <p>Apuntes, rutas de aprendizaje, ejercicios y proyectos que preparo para mis clases, disponibles para cualquier estudiante.</p>
          <a class="lnk" href="alumnos.html">Ver los recursos para alumnos ${icon("arrow")}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="ia" aria-labelledby="ia-t">
  <div class="wrap ai">
    <div data-rv>
      <p class="kicker">IA y tecnología educativa</p>
      <h2 class="h2" id="ia-t">Tecnología nueva, con criterio</h2>
      <p class="intro">${esc(P.iaIntro)}</p>
      <p class="honest">Línea de interés y formación continua</p>
    </div>
    <div data-rv>
      <ul class="topics">${P.iaTemas.map((t) => `<li><strong>${esc(t.t)}</strong><p>${esc(t.d)}</p></li>`).join("")}</ul>
      <div class="evidence">${icon("spark")}<div><p>${esc(P.iaEvidencia.t)}</p><a class="lnk" href="${esc(P.iaEvidencia.u)}">Ver la sección de IA ${icon("arrow")}</a></div></div>
    </div>
  </div>
</section>

<section class="sec" id="formacion" aria-labelledby="form-t">
  <div class="wrap">
    <div class="head head--split" data-rv>
      <div><p class="kicker">Formación</p><h2 class="h2" id="form-t">Formación técnica, académica y docente</h2></div>
      <p class="intro">Primero lo más relevante para la enseñanza de la tecnología.</p>
    </div>
    <div class="edu">
      ${P.formacion.map((g, i) => `<div class="edu__group${i === 0 ? " edu__group--main" : ""}" data-rv style="--d:${i}"><h3>${esc(g.grupo)}</h3><ul>${g.items.map((it) => `<li><strong>${esc(it.t)}</strong>${it.i ? `<span>${esc(it.i)}</span>` : ""}<time>${esc(it.a)}</time></li>`).join("")}</ul></div>`).join("")}
    </div>
    <p class="langs-spoken" data-rv>${P.idiomas.map((l) => `<span><b>${esc(l.t)}</b> — ${esc(l.n)}</span>`).join("")}</p>
  </div>
</section>

<section class="sec" id="contacto" aria-labelledby="contacto-t">
  <div class="wrap">
    <div class="talk" data-rv>
      <div class="talk__in">
        <div>
          <p class="kicker">Contacto</p>
          <h2 id="contacto-t">Hablemos</h2>
          <p class="talk__text">Para horas cátedra de Informática, NTICx, Tecnología o Programación, proyectos institucionales o colaboraciones.</p>
          <p class="talk__note">${icon("pin")}${esc(P.ubicacion)}</p>
        </div>
        <div class="talk__side">${channels.join("")}</div>
      </div>
    </div>
  </div>
</section>
</main>`;

  const footer = `
<footer class="foot">
  <div class="wrap foot__in">
    <span>© ${new Date().getFullYear()} ${esc(P.nombre)}</span>
    <nav aria-label="Enlaces del pie"><a href="index.html">Plataforma educativa</a><a href="proyectos.html">Todos los proyectos</a><a href="privacidad.html">Privacidad</a><a href="#inicio">Volver arriba ↑</a></nav>
  </div>
</footer>`;

  return { html: header + main + footer, missingDirect };
}
