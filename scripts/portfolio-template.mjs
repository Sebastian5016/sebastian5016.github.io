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
  monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
  spark: '<path d="M9.94 14.5A2 2 0 0 0 8.5 13.06L2.36 11.5a.5.5 0 0 1 0-.96L8.5 8.94A2 2 0 0 0 9.94 7.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 7.5A2 2 0 0 0 15.5 8.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 13.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
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

// [id o URL, texto]. Las URL (con ".html") salen a la plataforma educativa.
export const NAV = [["perfil", "Perfil"], ["docencia", "Docencia"], ["areas", "Áreas"], ["proyectos", "Proyectos"], ["experiencia", "Experiencia"], ["formacion", "Formación"], ["materiales.html", "Recursos"], ["contacto", "Contacto"]];

/** Teléfono legible a partir del formato internacional (5491165631842 → 11 6563-1842). */
export const phone = (wa) => { const d = String(wa || "").replace(/^549?/, ""); return d.length === 10 ? `${d.slice(0, 2)} ${d.slice(2, 6)}-${d.slice(6)}` : d; };


export function render(WF, root) {
  const P = WF.perfil, S = WF.sitio, c = S.contacto, r = S.redes;
  const cvOk = existsSync(join(root, P.cv));
  const cvKb = cvOk ? Math.round(statSync(join(root, P.cv)).size / 1024) : 0;
  const cvBtn = (cls = "b b--main") => (cvOk ? `<a class="${cls}" href="${esc(P.cv)}" download>Descargar CV ${icon("down")}</a>` : "");
  const mailto = c.email ? `mailto:${c.email}?subject=${encodeURIComponent("Contacto desde su portfolio docente")}` : "";
  const wa = r.whatsapp ? `https://wa.me/${r.whatsapp}?text=${encodeURIComponent("Hola Sebastián, te escribo por tu portfolio docente.")}` : "";
  const link = (l, cls = "lnk") => `<a class="${cls}" href="${esc(l.u)}"${ext(l.u)}>${esc(l.t)} ${icon(/^https?:/.test(l.u) ? "out" : "arrow")}</a>`;
  const navHref = (id) => (id.includes(".html") ? id : `#${id}`);
  const spy = (id) => (id.includes(".html") ? "" : ` data-spy="${id}"`);
  const head = (kicker, id, title, intro = "") => `<div class="head" data-rv><p class="kicker">${kicker}</p><h2 class="h2" id="${id}">${title}</h2>${intro ? `<p class="intro">${intro}</p>` : ""}</div>`;

  const header = `
<a class="skip" href="#contenido">Saltar al contenido</a>
<header class="top" id="top">
  <div class="wrap top__in">
    <a class="brand" href="#inicio" aria-label="${esc(P.marca)}, inicio del portfolio">
      <span class="brand__name">${esc(P.marca)}<small>${esc(P.titulo.replace(/\s*\|\s*/g, " · "))}</small></span>
    </a>
    <nav class="nav" aria-label="Secciones del portfolio">
      <ul>${NAV.slice(0, 7).map(([id, t]) => `<li><a href="${navHref(id)}"${spy(id)}>${t}</a></li>`).join("")}</ul>
    </nav>
    <div class="top__cta">${cvBtn("b b--sm")}<a class="b b--sm b--main" href="#contacto">Contactarme</a></div>
    <button class="top__menu" type="button" aria-expanded="false" aria-controls="sheet" aria-label="Abrir menú">${icon("menu")}</button>
  </div>
</header>
<div class="sheet" id="sheet" hidden>
  <nav aria-label="Menú del portfolio"><ol><li><a href="#inicio">Inicio</a></li>${NAV.map(([id, t]) => `<li><a href="${navHref(id)}"${spy(id)}>${t}</a></li>`).join("")}<li><a href="#cv">CV</a></li></ol></nav>
  <div class="btns">${cvBtn()}<a class="b" href="#contacto">Contactarme</a></div>
</div>`;

  /* 1 · Quién soy y qué hago */
  const hero = `
<section class="hero" id="inicio" aria-labelledby="hero-t">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <img class="hero__avatar" src="assets/img/walter-sm.jpg" alt="" width="88" height="88">
      <h1 id="hero-t" data-in style="--d:0">${esc(P.marca)}</h1>
      <p class="hero__title" data-in style="--d:1">${P.titulo.split("|").map((x) => `<span>${esc(x.trim())}</span>`).join("")}</p>
      <p class="hero__lead" data-in style="--d:2">${esc(P.propuesta)}</p>
      <p class="hero__sub" data-in style="--d:3">${esc(P.bajada)}</p>
      <div class="btns" data-in style="--d:4">${cvBtn()}<a class="b" href="#contacto">Contactarme ${icon("mail")}</a></div>
      <a class="lnk hero__more" href="#docencia" data-in style="--d:5">Ver mi propuesta docente ${icon("arrow")}</a>
    </div>
    <figure class="hero__media" data-in style="--d:2">
      <img class="hero__photo" src="${esc(P.foto)}" alt="${esc(P.fotoAlt)}" width="640" height="640" fetchpriority="high">
      <figcaption class="hero__cap">${icon("pin")}${esc(P.ubicacion)}</figcaption>
    </figure>
  </div>
</section>
<section class="motto" aria-labelledby="motto-t">
  <div class="wrap motto__in">
    <h2 class="sr-only" id="motto-t">Una trayectoria diferente</h2>
    <p class="motto__kicker" data-rv>Una trayectoria diferente</p>
    <p class="motto__quote" data-rv>${esc(P.lema)}</p>
    <ul class="motto__traits" data-rv>${P.rasgos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  </div>
</section>`;

  const perfil = `
<section class="sec" id="perfil" aria-labelledby="perfil-t">
  <div class="wrap who">
    <div>
      <p class="kicker" data-rv>Perfil</p>
      <h2 class="h2" id="perfil-t" data-rv>Quién soy</h2>
      <div class="who__text" data-rv>${P.quienSoy.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
    </div>
    <div class="today" data-rv aria-labelledby="hoy-t">
      <h3 id="hoy-t"><span class="live" aria-hidden="true"></span>Dónde enseño hoy</h3>
      <ul>${P.escuelas.map((e) => `<li><strong>${esc(e.escuela)} — ${esc(e.lugar)}</strong><span>${esc(e.materia)} — ${esc(e.cursos)}</span></li>`).join("")}</ul>
    </div>
  </div>
</section>`;

  /* 2 · Qué aporto */
  const aportes = `
<section class="sec sec--tint" id="aportes" aria-labelledby="aportes-t">
  <div class="wrap">
    ${head("Para su institución", "aportes-t", "Qué puedo aportar")}
    <div class="give">${P.aportes.map((a, i) => `<div data-rv style="--d:${i}">${icon(a.icono, "give__ico")}<h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></div>`).join("")}</div>
  </div>
</section>`;

  /* 3 · Cómo enseño */
  const docencia = `
<section class="sec" id="docencia" aria-labelledby="doc-t">
  <div class="wrap">
    <p class="kicker" data-rv>Docencia</p>
    <h2 class="sr-only" id="doc-t">Cómo enseño</h2>
    <blockquote class="statement" data-rv>${esc(P.frase)}</blockquote>
    <dl class="principles">${P.principios.map((p, i) => `<div data-rv style="--d:${i % 3}"><dt>${esc(p.t)}</dt><dd>${esc(p.d)}</dd></div>`).join("")}</dl>
    <div class="flow" data-rv aria-labelledby="flow-t">
      <h3 id="flow-t">Cómo trabajo en el aula</h3>
      <ol>${P.proceso.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
      <p>${esc(P.procesoNota)}</p>
    </div>
    <div class="ai" data-rv aria-labelledby="ia-t">
      <p class="ai__kicker">Inteligencia artificial</p>
      <h3 id="ia-t">${esc(P.ia.t)}</h3>
      <p>${esc(P.ia.d)}</p>
      <ul class="chips">${P.ia.temas.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      ${link(P.ia.enlace)}
    </div>
  </div>
</section>`;

  const areas = `
<section class="sec sec--tint" id="areas" aria-labelledby="areas-t">
  <div class="wrap">
    ${head("Áreas", "areas-t", "Áreas en las que puedo aportar")}
    <ul class="areas">${P.areas.map((a, i) => `<li data-rv style="--d:${i % 3}">${icon(a.icono, "areas__ico")}<div><h3>${esc(a.t)}</h3><p>${esc(a.d)}</p></div></li>`).join("")}</ul>
    <ul class="levels" aria-label="Niveles" data-rv>${P.niveles.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
  </div>
</section>`;

  /* 4 · Qué hago realmente */
  const trabajo = `
<section class="sec" id="trabajo" aria-labelledby="trabajo-t">
  <div class="wrap">
    ${head("Evidencias", "trabajo-t", "Así se ve mi trabajo", "La tecnología se aprende haciendo, resolviendo y creando.")}
    <ul class="proof">${P.evidencias.map((e, i) => `<li class="proof__item${e.destacada ? " proof__item--big" : ""}" data-rv style="--d:${i % 2}">
      <div class="proof__img"><img src="${esc(e.imagen)}" alt="" width="800" height="500" loading="lazy" decoding="async"></div>
      <div class="proof__body"><span class="proof__type">${esc(e.tipo)}</span><h3><a href="${esc(e.u)}"${ext(e.u)}>${esc(e.t)}</a></h3><p>${esc(e.d)}</p></div>
    </li>`).join("")}</ul>
    <p class="note" data-rv>${esc(P.evidenciasNota)}</p>
  </div>
</section>`;

  const D = P.destacado;
  const proyectos = `
<section class="sec sec--tint" id="proyectos" aria-labelledby="proy-t">
  <div class="wrap">
    ${head("Proyectos", "proy-t", "Proyectos")}
    <article class="feature" data-rv>
      <div class="feature__img"><img src="${esc(D.imagen)}" alt="${esc(D.alt)}" width="800" height="500" loading="lazy" decoding="async"></div>
      <div class="feature__body">
        <p class="feature__type">${esc(D.tipo)}</p><span class="state state--dev">${esc(D.estado)}</span>
        <h3>${esc(D.nombre)}</h3>
        <p>${esc(D.que)}</p>
        <ul class="checks">${D.demuestra.map((x) => `<li>${icon("check")}${esc(x)}</li>`).join("")}</ul>
        <p class="feature__tech">${D.tecnologias.map(esc).join(" · ")}</p>
        <div class="feature__links">${D.enlaces.map((l) => link(l)).join("")}</div>
      </div>
    </article>
    <h3 class="others__t" data-rv>Otros proyectos</h3>
    <ul class="others">${P.otros.map((o) => `<li data-rv><a href="${esc(o.u)}"${ext(o.u)}><span class="others__type">${esc(o.tipo)}</span><span class="others__main"><strong>${esc(o.nombre)}</strong><span>${esc(o.d)}</span></span><span class="state${/desarrollo|curso/i.test(o.estado) ? " state--dev" : ""}">${esc(o.estado)}</span>${icon(/^https?:/.test(o.u) ? "out" : "arrow", "others__go")}</a></li>`).join("")}</ul>
  </div>
</section>`;

  /* 5 · Experiencia y formación */
  const experiencia = `
<section class="sec" id="experiencia" aria-labelledby="exp-t">
  <div class="wrap">
    ${head("Experiencia", "exp-t", "Experiencia profesional que también forma parte de mi manera de enseñar")}
    <p class="path__title" data-rv>${esc(P.etapasTitulo)}</p>
    <ol class="path" data-rv aria-label="Evolución profesional">${P.etapas.map((e) => `<li>${esc(e)}</li>`).join("")}</ol>
    <ol class="exp-list">${P.experiencia.map((e) => `<li class="exp" data-rv><span class="exp__time">${esc(e.periodo)}</span><div><h3>${esc(e.cargo)}</h3><p class="exp__place">${esc(e.lugar)}</p></div>${e.aporta ? `<p class="exp__gives"><span>Aporta hoy</span>${esc(e.aporta)}</p>` : `<p class="exp__gives exp__gives--now"><span>Hoy</span>Ver «Dónde enseño hoy»</p>`}</li>`).join("")}</ol>
  </div>
</section>`;

  const formacion = `
<section class="sec sec--tint" id="formacion" aria-labelledby="form-t">
  <div class="wrap form-grid">
    <div>
      <p class="kicker" data-rv>Formación</p>
      <h2 class="h2" id="form-t" data-rv>Formación</h2>
      <dl class="creds" data-rv>
        ${P.credenciales.map((x) => `<div><dt>Credencial docente</dt><dd><b>${esc(x.t)}</b> · ${esc(x.d)}</dd></div>`).join("")}
        <div><dt>Idiomas</dt><dd>${P.idiomas.map((l) => `<b>${esc(l.t)}</b> ${esc(l.n)}`).join(" · ")}</dd></div>
      </dl>
    </div>
    <ol class="study">${P.formacion.map((f) => `<li class="${f.destacado ? "is-key" : ""}" data-rv><span class="study__group">${esc(f.grupo)}</span><h3>${esc(f.t)}</h3>${f.i ? `<p>${esc(f.i)}</p>` : ""}<p class="study__state"><span class="badge badge--${f.estado.replace(/\s/g, "-")}">${esc(P.estadosFormacion[f.estado])}</span>${f.a ? `<time>${esc(f.a)}</time>` : ""}</p></li>`).join("")}</ol>
  </div>
</section>`;

  /* 6 · Tecnologías y competencias (compacto) */
  const tecnologias = `
<section class="sec sec--compact" id="tecnologias" aria-labelledby="tec-t">
  <div class="wrap">
    ${head("Competencias", "tec-t", "Competencias y tecnologías")}
    <dl class="tech" data-rv>${[...P.competencias, ...P.tecnologias].map((g) => `<div><dt>${esc(g.t)}</dt><dd>${g.items.map(esc).join(" · ")}</dd></div>`).join("")}</dl>
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
        ${cvOk ? `<p class="cv__meta">${icon("file")}${esc(P.nombre)} · PDF · ${cvKb} KB · 1 página A4</p>` : ""}
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
    <span>© ${new Date().getFullYear()} ${esc(P.marca)} · ${esc(P.titulo.replace(/\|/g, "·"))}</span>
    <nav aria-label="Enlaces del pie"><a href="index.html">Plataforma educativa</a>${r.github ? `<a href="${esc(r.github)}"${ext(r.github)}>GitHub</a>` : ""}<a href="privacidad.html">Privacidad</a><a href="#inicio">Volver arriba</a></nav>
  </div>
</footer>`;

  const html = header + `\n<main id="contenido">` + hero + perfil + aportes + docencia + areas + trabajo + proyectos + experiencia + formacion + tecnologias + cv + contacto + `\n</main>` + footer;
  return { html, missingDirect: !c.email && !wa, cvOk };
}
