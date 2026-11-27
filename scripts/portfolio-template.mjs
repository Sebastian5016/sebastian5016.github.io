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

export const NAV = [["sobre-mi", "Sobre mí"], ["propuesta", "Propuesta docente"], ["areas", "Áreas"], ["proyectos", "Proyectos"], ["experiencia", "Experiencia"], ["formacion", "Formación"], ["cv", "CV"], ["contacto", "Contacto"]];

/** Teléfono legible a partir del formato internacional (5491165631842 → 11 6563-1842). */
export const phone = (wa) => { const d = String(wa || "").replace(/^549?/, ""); return d.length === 10 ? `${d.slice(0, 2)} ${d.slice(2, 6)}-${d.slice(6)}` : d; };

export function render(WF, root) {
  const P = WF.perfil, S = WF.sitio, c = S.contacto, r = S.redes;
  const cvPath = join(root, P.cv);
  const cvOk = existsSync(cvPath);
  const cvKb = cvOk ? Math.round(statSync(cvPath).size / 1024) : 0;
  const cvBtn = (cls = "b b--main") => cvOk ? `<a class="${cls}" href="${esc(P.cv)}" download>Descargar CV ${icon("down")}</a>` : "";
  const mailto = c.email ? `mailto:${c.email}?subject=${encodeURIComponent("Contacto desde su portfolio docente")}` : "";
  const wa = r.whatsapp ? `https://wa.me/${r.whatsapp}?text=${encodeURIComponent("Hola Walter, te escribo por tu portfolio docente.")}` : "";
  const contactHref = mailto || wa || "#contacto";

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
    <div class="top__cta">
      ${cvBtn("b b--sm")}
      <a class="b b--sm b--main" href="#contacto">Contactarme</a>
    </div>
    <button class="top__menu" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Abrir menú">${icon("menu")}</button>
  </div>
</header>
<div class="sheet" id="sheet" hidden>
  <nav aria-label="Menú del portfolio"><ol><li><a href="#inicio">Inicio</a></li>${NAV.map(([id, t]) => `<li><a href="#${id}" data-spy="${id}">${t}</a></li>`).join("")}</ol></nav>
  <div class="btns">${cvBtn()}<a class="b" href="#contacto">Contactarme</a></div>
</div>`;

  const hero = `
<section class="hero" id="inicio" aria-labelledby="hero-t">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <img class="hero__avatar" src="assets/img/walter-sm.jpg" alt="" width="88" height="88">
      <h1 id="hero-t" data-in style="--d:0">${esc(P.nombre)}</h1>
      <p class="hero__title" data-in style="--d:1">${P.titulo.split("|").map((x) => `<span>${esc(x.trim())}</span>`).join("")}</p>
      <p class="hero__lead" data-in style="--d:2">${esc(P.propuesta)}</p>
      <p class="hero__sub" data-in style="--d:3">${esc(P.bajada)}</p>
      <div class="btns" data-in style="--d:4">
        ${cvBtn()}
        <a class="b" href="#contacto">Contactarme ${icon("mail")}</a>
      </div>
      <a class="lnk hero__more" href="#propuesta" data-in style="--d:5">Conocer mi propuesta docente ${icon("arrow")}</a>
    </div>
    <figure class="hero__media" data-in style="--d:2">
      <img class="hero__photo" src="${esc(P.foto)}" alt="${esc(P.fotoAlt)}" width="640" height="640" fetchpriority="high">
      <figcaption class="today">
        <span class="today__label"><span class="live" aria-hidden="true"></span>${esc(P.hoy.titulo)}</span>
        <ul>${P.hoy.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </figcaption>
    </figure>
  </div>
  <div class="wrap">
    <ul class="keys" aria-label="Perfil en cuatro datos" data-in style="--d:5">${P.claves.map((k) => `<li><strong>${esc(k.t)}</strong><span>${esc(k.d)}</span></li>`).join("")}</ul>
  </div>
</section>`;

  const about = `
<section class="sec" id="sobre-mi" aria-labelledby="sobre-t">
  <div class="wrap about">
    <div>
      <p class="kicker" data-rv>Sobre mí</p>
      <h2 class="h2" id="sobre-t" data-rv>Una trayectoria que hoy suma en el aula</h2>
      <div class="bio" data-rv>${P.sobreMi.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
    </div>
    <aside class="edge" data-rv aria-label="Mi diferencial">
      <p class="edge__label">Mi diferencial</p>
      <blockquote>${esc(P.diferencial)}</blockquote>
      <p class="edge__place">${icon("pin")}${esc(P.ubicacion)}</p>
    </aside>
  </div>
</section>`;

  const aportes = `
<section class="sec sec--tint" id="aportes" aria-labelledby="aportes-t">
  <div class="wrap">
    <div class="head" data-rv>
      <p class="kicker">Para su institución</p>
      <h2 class="h2" id="aportes-t">Qué puedo aportar a una institución</h2>
    </div>
    <ul class="give">${P.aportes.map((a, i) => `<li class="card" data-rv style="--d:${i % 3}">${icon(a.icono, "card__ico")}<h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></li>`).join("")}</ul>
  </div>
</section>`;

  const propuesta = `
<section class="sec" id="propuesta" aria-labelledby="prop-t">
  <div class="wrap">
    <div class="teach">
      <div>
        <p class="kicker" data-rv>Propuesta docente</p>
        <h2 class="h2" id="prop-t" data-rv>Cómo entiendo la enseñanza</h2>
      </div>
      <div class="teach__text" data-rv>${P.ensenanza.map((t) => `<p>${esc(t)}</p>`).join("")}
        <p class="teach__seek">Lo que busco en mis clases</p>
        <ul class="chips">${P.busco.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="method" aria-labelledby="metodo-t">
      <h3 class="method__title" id="metodo-t" data-rv>Así trabajo en el aula</h3>
      <ol class="steps">${P.proceso.map((s, i) => `<li data-rv style="--d:${i}"><span class="steps__n">${String(i + 1).padStart(2, "0")}</span><strong>${esc(s.t)}</strong><p>${esc(s.d)}</p></li>`).join("")}</ol>
      <p class="method__note" data-rv>${esc(P.procesoNota)}</p>
    </div>
  </div>
</section>`;

  const areas = `
<section class="sec sec--tint" id="areas" aria-labelledby="areas-t">
  <div class="wrap">
    <div class="head head--split" data-rv>
      <div><p class="kicker">Áreas</p><h2 class="h2" id="areas-t">Áreas en las que puedo aportar</h2></div>
      <div><ul class="levels" aria-label="Niveles">${P.niveles.map((n) => `<li>${esc(n)}</li>`).join("")}</ul><p class="levels__note">${esc(P.habilitacion)}</p></div>
    </div>
    <ul class="areas">${P.areas.map((a, i) => `<li class="${a.principal ? "is-main" : ""}" data-rv style="--d:${i % 4}"><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></li>`).join("")}</ul>
  </div>
</section>`;

  const proyectos = `
<section class="sec" id="proyectos" aria-labelledby="proy-t">
  <div class="wrap">
    <div class="head" data-rv>
      <p class="kicker">Proyectos</p>
      <h2 class="h2" id="proy-t">Lo que hago, además de enseñar</h2>
    </div>
    <h3 class="sub" data-rv>Proyectos y recursos educativos</h3>
    <ul class="edu-list">${P.proyectosEdu.map((p, i) => `<li class="card" data-rv style="--d:${i % 2}"><span class="tagline">${esc(p.tipo)}</span><h4>${esc(p.nombre)}</h4><p>${esc(p.descripcion)}</p><a class="lnk" href="${esc(p.enlace.u)}"${ext(p.enlace.u)}>${esc(p.enlace.t)} ${icon("arrow")}</a></li>`).join("")}</ul>
    <p class="note" data-rv>${esc(P.proyectosEduNota)}</p>

    <h3 class="sub" data-rv>Proyectos tecnológicos</h3>
    <div class="tech-cases">${P.proyectosTec.map((p) => `<article class="case" data-rv>
      <div class="case__main">
        <span class="state${/desarrollo/i.test(p.estado) ? " state--dev" : ""}">${esc(p.estado)}</span>
        <h4>${esc(p.nombre)}</h4>
        <p>${esc(p.descripcion)}</p>
        <p class="case__problem"><b>Problema que resuelve:</b> ${esc(p.problema)}</p>
        <div class="case__links">${p.enlaces.map((l) => `<a class="lnk" href="${esc(l.u)}"${ext(l.u)}>${esc(l.t)} ${icon(/^https?:/.test(l.u) ? "out" : "arrow")}</a>`).join("")}</div>
      </div>
      <dl class="case__side">
        <div><dt>Tecnología utilizada</dt><dd><ul class="chips chips--mono">${p.tecnologias.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></dd></div>
        <div><dt>Qué demuestra</dt><dd><ul class="checks">${p.demuestra.map((d) => `<li>${icon("check")}${esc(d)}</li>`).join("")}</ul></dd></div>
      </dl>
    </article>`).join("")}</div>

    <div class="stack" aria-labelledby="tec-t" data-rv>
      <h3 class="sub" id="tec-t">Tecnologías que uso</h3>
      <dl>${P.tecnologias.map((g) => `<div><dt>${esc(g.t)}</dt><dd>${g.items.map(esc).join(" · ")}</dd></div>`).join("")}</dl>
    </div>
  </div>
</section>`;

  const expItem = (e) => `<li class="exp${e.actual ? " exp--now" : ""}"><span class="exp__time">${esc(e.periodo)}</span><h4>${esc(e.cargo)}</h4><p class="exp__place">${esc(e.lugar)}</p><p>${esc(e.texto)}</p>${e.aporta ? `<p class="exp__gives"><b>Aporta hoy:</b> ${esc(e.aporta)}</p>` : ""}</li>`;
  const experiencia = `
<section class="sec sec--tint" id="experiencia" aria-labelledby="exp-t">
  <div class="wrap">
    <div class="head head--split" data-rv>
      <div><p class="kicker">Experiencia</p><h2 class="h2" id="exp-t">Experiencia que también forma parte de mi manera de enseñar</h2></div>
      <p class="intro">Una trayectoria profesional diversa que hoy aporta experiencia, organización, criterio y capacidad de resolución al trabajo docente.</p>
    </div>
    <div class="exps">
      <div data-rv><h3 class="sub">Docente y educativa</h3><ol class="exp-list">${P.expDocente.map(expItem).join("")}</ol></div>
      <div data-rv style="--d:1"><h3 class="sub">Profesional</h3><ol class="exp-list">${P.expProfesional.map(expItem).join("")}</ol></div>
    </div>
    <div class="gives" data-rv>
      <p>Lo que esta experiencia aporta al aula</p>
      <ul class="chips">${P.expAporta.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>
  </div>
</section>`;

  const formacion = `
<section class="sec" id="formacion" aria-labelledby="form-t">
  <div class="wrap form-grid">
    <div>
      <p class="kicker" data-rv>Formación</p>
      <h2 class="h2" id="form-t" data-rv>Formación docente, superior y tecnológica</h2>
      <p class="langs" data-rv>${P.idiomas.map((l) => `<span><b>${esc(l.t)}</b> ${esc(l.n)}</span>`).join("")}</p>
    </div>
    <ol class="study">${P.formacion.map((f) => `<li class="${f.destacado ? "is-key" : ""}" data-rv><span class="study__group">${esc(f.grupo)}</span><h3>${esc(f.t)}</h3>${f.i ? `<p>${esc(f.i)}</p>` : ""}<time>${esc(f.a)}</time></li>`).join("")}</ol>
  </div>
</section>`;

  const competencias = `
<section class="sec sec--tint" id="competencias" aria-labelledby="comp-t">
  <div class="wrap">
    <div class="head" data-rv><p class="kicker">Competencias</p><h2 class="h2" id="comp-t">Competencias</h2></div>
    <div class="skills">${P.competencias.map((g, i) => `<div data-rv style="--d:${i}"><h3>${esc(g.t)}</h3><ul class="checks">${g.items.map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
  </div>
</section>`;

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
        ${cvOk ? `<p class="cv__meta">${icon("file")}PDF · ${cvKb} KB · Formato A4</p>` : ""}
      </div>
    </div>
  </div>
</section>`;

  const contacto = `
<section class="sec" id="contacto" aria-labelledby="contacto-t">
  <div class="wrap">
    <div class="talk" data-rv>
      <div>
        <p class="kicker">Contacto</p>
        <h2 class="h2" id="contacto-t">¿Buscás un docente de Informática o NTICx?</h2>
        <p class="intro">Estoy disponible para integrarme a proyectos educativos e instituciones que valoren la tecnología como herramienta para aprender, crear y resolver problemas.</p>
        <div class="btns" style="margin-top:32px">
          ${mailto ? `<a class="b b--main" href="${esc(mailto)}">Contactarme ${icon("mail")}</a>` : ""}
          ${cvBtn("b")}
        </div>
      </div>
      <ul class="ways" aria-label="Medios de contacto">
        ${c.email ? `<li><a href="${esc(mailto)}">${icon("mail")}<span><small>Correo</small>${esc(c.email)}</span></a></li>` : ""}
        ${wa ? `<li><a class="ways__wa" href="${esc(wa)}"${ext(wa)}>${icon("wa")}<span><small>WhatsApp</small>${esc(phone(r.whatsapp))}</span></a></li>` : ""}
        ${r.linkedin ? `<li><a href="${esc(r.linkedin)}"${ext(r.linkedin)}>${icon("briefcase")}<span><small>LinkedIn</small>Perfil profesional</span></a></li>` : ""}
        ${r.github ? `<li><a href="${esc(r.github)}"${ext(r.github)}>${icon("github")}<span><small>GitHub</small>${esc(r.github.replace("https://github.com/", ""))}</span></a></li>` : ""}
        <li class="ways__place">${icon("pin")}<span><small>Zona</small>${esc(P.ubicacion)}</span></li>
      </ul>
    </div>
  </div>
</section>`;

  const footer = `
<footer class="foot">
  <div class="wrap foot__in">
    <span>© ${new Date().getFullYear()} ${esc(P.nombre)} · ${esc(P.titulo.replace(/\|/g, "·"))}</span>
    <nav aria-label="Enlaces del pie"><a href="index.html">Plataforma educativa</a><a href="privacidad.html">Privacidad</a><a href="#inicio">Volver arriba</a></nav>
  </div>
</footer>`;

  const html = header + `\n<main id="contenido">` + hero + about + aportes + propuesta + areas + proyectos + experiencia + formacion + competencias + cv + contacto + `\n</main>` + footer;
  return { html, missingDirect: !c.email && !wa, cvOk, contactHref };
}
