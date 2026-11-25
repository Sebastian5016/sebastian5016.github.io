/* ==========================================================================
   RENDERIZADO DE PÁGINAS
   Cada página declara <body data-page="…"> y aquí se completa con los datos.
   ========================================================================== */
(function () {
  "use strict";
  const WF = window.WF, T = WF.taxonomia, S = WF.sitio;
  const { $, $$, esc, norm, params, fmtDate, fmtBytes, icon, level, status, tag, tags, areaName, areaIcon, downloadBtn, openBtn, fileInfo, cover, codeBlock, autoCrumb, extAttrs, isExternal } = WF;
  const byId = (arr, id) => (arr || []).find((x) => x.id === id);
  const mount = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };
  const setMeta = (title, desc) => {
    document.title = `${title} — ${S.nombreCorto} · ${S.rol}`;
    if (desc) { const m = $('meta[name="description"]'); if (m) m.content = desc; }
    const og = $('meta[property="og:title"]'); if (og) og.content = title;
  };
  const notFound = (sel, what, back) => mount(sel, `<div class="container section"><div class="empty">${icon("compass")}<strong>No encontramos ${what}</strong><p>Puede que el enlace haya cambiado.</p><a class="btn btn--primary" href="${back.href}">${icon("arrowLeft")} ${back.t}</a></div></div>`);

  /* ======================= Tarjetas reutilizables ======================= */
  function projectCard(p) {
    return `<article class="card card--link project-card">
      <div class="project-card__cover">${cover(p.id, areaName(p.area), areaIcon(p.area))}</div>
      <div class="card__kicker">${status(p.estado)}${level(p.nivel)}</div>
      <h3 class="card__title"><a href="proyecto.html?id=${esc(p.id)}">${esc(p.titulo)}</a></h3>
      <p class="card__text">${esc(p.resumen)}</p>
      ${tags(p.tecnologias)}
      <div class="card__foot"><span class="muted mono" style="font-size:var(--fs-xs)">${esc(areaName(p.area))}</span><span class="link-arrow">Ver proyecto ${icon("arrow")}</span></div>
    </article>`;
  }
  function resourceCard(m) {
    const fmt = (T.formatos[m.formato] || m.formato).toUpperCase();
    return `<article class="card resource-card">
      <div class="resource-card__head"><span class="format" aria-label="Formato ${esc(fmt)}">${esc(fmt.slice(0, 6))}</span>
        <div><h3 class="card__title">${esc(m.titulo)}</h3><span class="muted mono" style="font-size:var(--fs-xs)">${esc(T.tipos[m.tipo] || m.tipo)} · ${esc(areaName(m.tema))}</span></div></div>
      <p class="card__text">${esc(m.descripcion)}</p>
      <div class="tags">${tag(T.destinatarios[m.nivel] || m.nivel)}${level(m.dificultad) ? `<span class="tag">${level(m.dificultad)}</span>` : ""}</div>
      <div class="btn-row">${m.abrir ? openBtn(m.abrir, { small: true }) : ""}${m.formato === "enlace" ? "" : downloadBtn(m.archivo, { small: true, cls: m.abrir ? "btn" : "btn btn--primary" })}</div>
    </article>`;
  }
  function postCard(a) {
    return `<article class="card card--link post-card">
      <div class="project-card__cover">${cover(a.id, T.blog[a.categoria], "pen")}</div>
      <div class="card__kicker">${tag(T.blog[a.categoria], "tag--accent")}<time datetime="${a.fecha}">${fmtDate(a.fecha)}</time></div>
      <h3 class="card__title"><a href="articulo.html?id=${esc(a.id)}">${esc(a.titulo)}</a></h3>
      <p class="card__text">${esc(a.resumen)}</p>
      <div class="card__foot"><span class="muted mono" style="font-size:var(--fs-xs)">${icon("clock", "").replace("<svg", '<svg style="width:14px;height:14px;display:inline;vertical-align:-2px"')} ${esc(a.lectura)}</span><span class="link-arrow">Leer ${icon("arrow")}</span></div>
    </article>`;
  }
  function langCard(l) {
    const ej = Object.keys(WF.descargas || {}).filter((k) => k.startsWith(`descargas/programacion/${l.id}/`)).length;
    return `<article class="card card--link lang-card">
      <div class="lang-badge" aria-hidden="true">${esc(l.sigla)}</div>
      <h3 class="card__title"><a href="lenguaje.html?l=${esc(l.id)}">${esc(l.nombre)}</a></h3>
      <p class="card__text">${esc(l.descripcion)}</p>
      <dl><dt>Conceptos</dt><dd>${l.conceptos.length}</dd><dt>Ejemplos</dt><dd>${ej}</dd><dt>Ejercicios</dt><dd>${l.ejercicios.length}</dd><dt>Desafíos</dt><dd>${l.desafios.length}</dd></dl>
      <div class="card__foot"><span class="tags">${["inicial", "intermedio", "avanzado"].filter((n) => l.conceptos.some((c) => c.nivel === n)).map((n) => tag(T.niveles[n].nombre)).join("")}</span>${icon("arrow").replace("<svg", '<svg style="width:18px;height:18px;color:var(--accent-text)"')}</div>
    </article>`;
  }
  function routeCard(r) {
    const pct = WF.ProgressStore.percent(r.id, r.niveles.length);
    const done = WF.ProgressStore.done(r.id);
    return `<article class="card card--link route-card">
      <div class="card__kicker">${tag(areaName(r.area), "tag--accent")}${status(r.estado)}</div>
      <h3 class="card__title"><a href="ruta.html?id=${esc(r.id)}">${esc(r.titulo)}</a></h3>
      <p class="card__text">${esc(r.descripcion)}</p>
      <div class="mini-route" aria-hidden="true">${r.niveles.map((_, i) => `<i class="${done.has(i) ? "on" : ""}"></i>`).join("")}</div>
      <div class="progress-label"><span>${r.niveles.length} niveles · ${esc(r.duracion)}</span><span>${pct}% completado</span></div>
      <div class="card__foot">${level(r.nivel)}<span class="link-arrow">${pct > 0 ? "Continuar" : "Empezar"} ${icon("arrow")}</span></div>
    </article>`;
  }
  function timeline(items) {
    const lbl = { formacion: "Formación", experiencia: "Experiencia", actual: "Actualidad" };
    return `<ol class="timeline">${items.map((t) => `<li class="timeline__item" data-type="${esc(t.tipo)}"><div class="timeline__type"><span>${esc(t.etiqueta || lbl[t.tipo])}</span>${t.periodo ? `<span>· ${esc(t.periodo)}</span>` : ""}</div><h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></li>`).join("")}</ol>`;
  }
  const timelineLegend = `<div class="legend" aria-hidden="true"><span><i class="sq"></i>Formación</span><span><i></i>Experiencia</span><span><i class="fill"></i>Actualidad</span></div>`;
  const methodSteps = (row = true) => `<ol class="steps${row ? " steps--row" : ""}">${S.metodologia.map((m) => `<li class="step"><strong>${esc(m.titulo)}</strong><p>${esc(m.texto)}</p></li>`).join("")}</ol>`;
  const fileRow = (path) => {
    const f = fileInfo(path);
    if (!f) return `<li><span class="row"><span class="format">—</span>${esc(path.split("/").pop())}<span class="muted" style="margin-left:auto">Próximamente</span></span></li>`;
    return `<li><a href="${esc(path)}" download="${esc(f.nombre)}"><span class="format">${esc(f.ext.toUpperCase())}</span><span>${esc(f.nombre)}<br><small class="muted mono">${fmtBytes(f.bytes)} · ${fmtDate(f.actualizado)}</small></span>${icon("download")}</a></li>`;
  };

  /* ============================== INICIO ============================== */
  function home() {
    const nFiles = Object.keys(WF.descargas || {}).length;
    mount("#stats", [
      [WF.proyectos.length, "proyectos documentados"],
      [WF.materiales.length, "materiales educativos"],
      [WF.lenguajes.length, "lenguajes de programación"],
      [nFiles, "archivos descargables"],
    ].map(([n, t]) => `<div class="stat"><strong>${n}</strong><span>${t}</span></div>`).join(""));
    $$("[data-count]").forEach((el) => {
      const k = el.dataset.count;
      const v = { proyectos: WF.proyectos.length, materiales: WF.materiales.length, lenguajes: WF.lenguajes.length, rutas: WF.rutas.length, blog: WF.blog.length, ia: WF.secciones.iaTemas.length, tecnologia: WF.secciones.tecnologiaAreas.length, archivos: nFiles }[k];
      el.textContent = v ?? "";
    });
    mount("#home-projects", WF.proyectos.filter((p) => p.destacado).slice(0, 3).map(projectCard).join(""));
    mount("#home-routes", WF.rutas.slice(0, 3).map(routeCard).join(""));
    mount("#home-posts", [...WF.blog].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 3).map(postCard).join(""));
  }

  /* ============================= SOBRE MÍ ============================= */
  function sobreMi() {
    mount("#perfil-humano", S.perfilHumano.map((p) => `<p>${esc(p)}</p>`).join(""));
    mount("#timeline", timelineLegend + timeline(S.lineaTemporal));
    mount("#especializacion", S.especializacion.map((e) => `<div class="card"><div class="card__icon">${icon(e.icono)}</div><h3 class="card__title">${esc(e.titulo)}</h3><p class="card__text" style="margin:0">${esc(e.texto)}</p></div>`).join(""));
    mount("#intereses", S.intereses.map((i) => `<span class="chip" style="cursor:default">${esc(i)}</span>`).join(""));
    mount("#metodo-steps", methodSteps());
  }

  /* ============================ PORTFOLIO ============================= */
  function portfolio() {
    mount("#pf-perfil", `<p class="lead" style="max-width:none">${esc(S.perfilDocente)}</p>`);
    mount("#pf-formacion", timeline(S.lineaTemporal.filter((t) => t.tipo !== "experiencia")));
    mount("#pf-experiencia", timeline(S.lineaTemporal.filter((t) => t.tipo !== "formacion")));
    const list = (arr) => `<ul class="check-list">${arr.map((c) => `<li>${icon("check")}${esc(c)}</li>`).join("")}</ul>`;
    mount("#pf-competencias", `<div class="skill-group"><h3>${icon("grad")}Competencias docentes</h3>${list(S.competencias.docentes)}</div><div class="skill-group"><h3>${icon("code")}Competencias tecnológicas</h3>${list(S.competencias.tecnologicas)}</div>`);
    mount("#pf-herramientas", S.herramientas.map((g) => `<div class="skill-group"><h3 style="font-size:.85rem;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.05em;color:var(--ink-3)">${esc(g.grupo)}</h3>${tags(g.items)}</div>`).join(""));
    mount("#pf-aportes", S.aportes.map((a) => `<div class="card"><div class="card__icon">${icon(a.icono)}</div><h3 class="card__title">${esc(a.titulo)}</h3><p class="card__text" style="margin:0">${esc(a.texto)}</p></div>`).join(""));
    mount("#pf-metodo", methodSteps());
    mount("#pf-proyectos", WF.proyectos.filter((p) => p.estado === "publicado").slice(0, 6).map((p) => `<a class="card card--link" href="proyecto.html?id=${esc(p.id)}" style="text-decoration:none;color:inherit"><div class="card__kicker"><span class="tag tag--accent">${esc(areaName(p.area))}</span>${level(p.nivel)}</div><h3 class="card__title">${esc(p.titulo)}</h3><p class="card__text" style="margin:0">${esc(p.resumen)}</p></a>`).join(""));
    const c = S.contacto;
    mount("#pf-datos", `<dl class="kv">
      <dt>Perfil</dt><dd>${esc(S.roles.join(" · "))}</dd>
      <dt>Ubicación</dt><dd>${esc(c.ubicacion)}</dd>
      <dt>Disponibilidad</dt><dd>${esc(c.disponibilidad)}</dd>
      ${c.email ? `<dt>Correo</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd>` : ""}
      ${S.redes.linkedin ? `<dt>LinkedIn</dt><dd><a href="${esc(S.redes.linkedin)}" target="_blank" rel="noopener">Perfil</a></dd>` : ""}
      ${S.redes.github ? `<dt>GitHub</dt><dd><a href="${esc(S.redes.github)}" target="_blank" rel="noopener">${esc(S.redes.github.replace("https://", ""))}</a></dd>` : ""}
      <dt>Plataforma</dt><dd>${WF.proyectos.length} proyectos · ${WF.materiales.length} materiales · ${WF.lenguajes.length} lenguajes</dd>
    </dl>`);
    const pb = $("[data-print]"); if (pb) pb.addEventListener("click", () => window.print());
  }

  /* ============================ PROYECTOS ============================= */
  function proyectos() {
    const p = params();
    const state = { area: p.get("area") || "", nivel: p.get("nivel") || "", estado: p.get("estado") || "", q: p.get("q") || "" };
    const areas = [...new Set(WF.proyectos.map((x) => x.area))];
    mount("#proj-filters", `
      <div class="field" style="flex:1 1 240px"><label for="pq">Buscar</label><div class="input-icon">${icon("search")}<input id="pq" class="input" type="search" placeholder="Nombre, tecnología, concepto…" value="${esc(state.q)}"></div></div>
      <div class="field" style="flex:0 1 180px"><label for="pn">Nivel</label><select id="pn" class="select"><option value="">Todos</option>${Object.entries(T.niveles).map(([k, v]) => `<option value="${k}"${state.nivel === k ? " selected" : ""}>${v.nombre}</option>`).join("")}</select></div>
      <div class="field" style="flex:0 1 180px"><label for="pe">Estado</label><select id="pe" class="select"><option value="">Todos</option>${Object.entries(T.estados).map(([k, v]) => `<option value="${k}"${state.estado === k ? " selected" : ""}>${v}</option>`).join("")}</select></div>
      <div class="field" style="flex:1 1 100%"><span class="label" id="pa-l">Área</span><div class="chip-group" role="group" aria-labelledby="pa-l"><button class="chip" type="button" data-area="" aria-pressed="${!state.area}">Todas</button>${areas.map((a) => `<button class="chip" type="button" data-area="${a}" aria-pressed="${state.area === a}">${esc(areaName(a))} <span class="count">${WF.proyectos.filter((x) => x.area === a).length}</span></button>`).join("")}</div></div>`);
    const draw = () => {
      const q = norm(state.q);
      const list = WF.proyectos.filter((x) => (!state.area || x.area === state.area) && (!state.nivel || x.nivel === state.nivel) && (!state.estado || x.estado === state.estado) && (!q || norm([x.titulo, x.resumen, ...x.tecnologias, ...x.conceptos, areaName(x.area)].join(" ")).includes(q)));
      mount("#proj-count", `<span>${list.length} de ${WF.proyectos.length} proyectos</span>${state.area || state.nivel || state.estado || state.q ? `<button class="btn btn--ghost btn--sm" type="button" data-clear>${icon("x")} Limpiar filtros</button>` : ""}`);
      mount("#proj-grid", list.length ? list.map(projectCard).join("") : `<div class="empty" style="grid-column:1/-1">${icon("search")}<strong>No hay proyectos con esos filtros</strong>Probá quitar alguno.</div>`);
      const u = new URLSearchParams(Object.entries(state).filter(([, v]) => v));
      history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : ""));
    };
    $("#pq").addEventListener("input", (e) => { state.q = e.target.value; draw(); });
    $("#pn").addEventListener("change", (e) => { state.nivel = e.target.value; draw(); });
    $("#pe").addEventListener("change", (e) => { state.estado = e.target.value; draw(); });
    $("#proj-filters").addEventListener("click", (e) => { const b = e.target.closest("[data-area]"); if (!b) return; state.area = b.dataset.area; $$("[data-area]").forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); });
    $("#proj-count").addEventListener("click", (e) => { if (e.target.closest("[data-clear]")) { location.href = "proyectos.html"; } });
    draw();
  }

  /* ========================= FICHA DE PROYECTO ========================= */
  function proyecto() {
    const p = byId(WF.proyectos, params().get("id"));
    if (!p) return notFound("#project", "este proyecto", { href: "proyectos.html", t: "Ver todos los proyectos" });
    setMeta(p.titulo, p.resumen);
    const blocks = [];
    const B = (id, title, body) => blocks.push({ id, title, body });
    const gh = p.github || {};
    const demo = p.demo || gh.demo;

    B("problema", "Problema planteado", `<div class="callout"><div class="callout__title">${icon("target")}La pregunta que guía el proyecto</div><p>${esc(p.problema)}</p></div>`);
    B("objetivo", "Objetivo", `<p class="lead" style="max-width:none">${esc(p.objetivo)}</p>`);
    B("conceptos", "Conceptos trabajados", tags(p.conceptos, "tag--accent"));
    B("herramientas", "Herramientas utilizadas", `<ul class="check-list">${p.herramientas.map((h) => `<li>${icon("tool")}${esc(h)}</li>`).join("")}</ul>`);
    B("desarrollo", "Desarrollo", `<ol class="dev-steps">${p.desarrollo.map((d) => `<li><strong>${esc(d.titulo)}</strong><p>${esc(d.texto)}</p></li>`).join("")}</ol>`);
    const ghPanel = (gh.repo || demo) ? `<div class="github-panel"><div class="github-panel__head">${icon("github")}<strong>${gh.repo ? esc(gh.repo.replace("https://github.com/", "")) : "Código y demo"}</strong></div><div class="github-panel__body">
        <p style="margin:0;font-size:var(--fs-sm)"><strong>Objetivo educativo:</strong> ${esc(p.objetivo)}</p>${tags(p.tecnologias)}
        <div class="github-panel__links">${gh.repo ? `<a class="btn btn--sm" href="${esc(gh.repo)}" target="_blank" rel="noopener">${icon("code")} Código fuente</a>` : ""}${gh.readme ? `<a class="btn btn--sm" href="${esc(gh.readme)}" target="_blank" rel="noopener">${icon("file")} README</a>` : ""}${demo ? `<a class="btn btn--sm btn--primary" href="${esc(demo)}"${extAttrs(demo)}>${icon("play")} Ver demo</a>` : ""}</div></div></div>` : "";
    B("codigo", "Código", (p.codigo || []).map((c) => codeBlock(c)).join("") + ghPanel);
    const imgs = (p.imagenes || []).map((im) => `<figure><div class="figure-frame" style="aspect-ratio:auto;background:#f6f5f1"><img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy" width="640" height="380"></div><figcaption>${esc(im.caption || "")}</figcaption></figure>`).join("");
    const out = p.salida ? `<figure><div class="terminal"><div class="terminal__bar"><i></i><i></i><i></i><span>salida del programa</span></div><div class="terminal__body"><pre style="margin:0;font:inherit;white-space:pre-wrap">${esc(p.salida)}</pre></div></div><figcaption>Ejecución de ejemplo</figcaption></figure>` : "";
    const live = demo && !isExternal(demo) ? `<figure><div class="embed" style="aspect-ratio:4/3"><iframe src="${esc(demo)}" title="Demo en vivo: ${esc(p.titulo)}" loading="lazy" sandbox="allow-scripts"></iframe></div><figcaption>Demo en vivo · podés usarla acá mismo</figcaption></figure>` : "";
    B("imagenes", "Imágenes y capturas", (imgs || out || live) ? `<div class="figure-grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,${live ? 420 : 300}px),1fr))">${imgs}${out}${live}</div>` : `<div class="notice">${icon("image")}<p>Las capturas de este proyecto se publicarán cuando esté terminado.</p></div>`);
    B("resultado", "Resultado", `<p>${esc(p.resultado)}</p>`);
    B("aprendimos", "Qué aprendimos", p.aprendimos.length ? `<ul class="check-list">${p.aprendimos.map((a) => `<li>${icon("lightbulb")}${esc(a)}</li>`).join("")}</ul>` : `<p class="muted">Se completará al finalizar el proyecto con el curso.</p>`);
    const a = p.actividad || {};
    B("actividad", "Actividad propuesta", `<div class="callout"><div class="callout__title">${icon("flag")}${esc(a.consigna || "")}</div><ol>${(a.pasos || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ol>${a.entrega ? `<p><strong>Entrega:</strong> ${esc(a.entrega)}</p>` : ""}</div>`);
    B("descargas", "Material descargable", `<ul class="simple-list">${(p.descargas || []).map(fileRow).join("")}</ul>`);
    B("mejoras", "Posibles mejoras", `<ul class="check-list">${p.mejoras.map((m) => `<li>${icon("trending")}${esc(m)}</li>`).join("")}</ul>`);

    const lang = p.relacionados && byId(WF.lenguajes, p.relacionados.lenguaje);
    const ruta = p.relacionados && byId(WF.rutas, p.relacionados.ruta);
    const others = WF.proyectos.filter((x) => x.id !== p.id && x.area === p.area).concat(WF.proyectos.filter((x) => x.id !== p.id && x.area !== p.area)).slice(0, 1);
    const next = [
      lang && { href: `lenguaje.html?l=${lang.id}`, k: "Aprender el lenguaje", t: lang.nombre },
      ruta && { href: `ruta.html?id=${ruta.id}`, k: "Ruta de aprendizaje", t: ruta.titulo },
      ...others.map((o) => ({ href: `proyecto.html?id=${o.id}`, k: "Otro proyecto", t: o.titulo })),
    ].filter(Boolean);

    mount("#project", `
    <header class="page-head"><div class="container">
      ${autoCrumb(p.titulo)}
      <div class="tags" style="margin-bottom:16px">${tag(areaName(p.area), "tag--accent")}${status(p.estado)}<span class="tag">${level(p.nivel)}</span></div>
      <h1>${esc(p.titulo)}</h1>
      <p class="lead">${esc(p.resumen)}</p>
      <div class="page-head__meta">
        <dl class="meta-strip">
          <div><dt>Destinatarios</dt><dd>${esc(T.destinatarios[p.destinatario] || "")}</dd></div>
          <div><dt>Duración</dt><dd>${esc(p.duracion)}</dd></div>
          <div><dt>Actualizado</dt><dd>${fmtDate(p.fecha)}</dd></div>
          <div><dt>Tecnologías</dt><dd>${esc(p.tecnologias.join(", "))}</dd></div>
        </dl>
      </div>
      <div class="btn-row" style="margin-top:24px">${demo ? `<a class="btn btn--primary" href="${esc(demo)}"${extAttrs(demo)}>${icon("play")} Ver demo</a>` : ""}<a class="btn${demo ? "" : " btn--primary"}" href="#descargas">${icon("download")} Material descargable</a><a class="btn btn--ghost" href="#actividad">${icon("flag")} Actividad</a></div>
    </div></header>
    <div class="container section--tight">
      <div class="doc-layout">
        <nav class="toc" aria-label="Contenido del proyecto"><h2>En esta página</h2><ol>${blocks.map((b, i) => `<li><a href="#${b.id}"><span>${String(i + 1).padStart(2, "0")}</span>${esc(b.title)}</a></li>`).join("")}</ol></nav>
        <div>
          ${blocks.map((b, i) => `<section class="doc-block" id="${b.id}" aria-labelledby="${b.id}-h"><div class="doc-block__head"><span class="doc-block__num">${String(i + 1).padStart(2, "0")}</span><h2 id="${b.id}-h">${esc(b.title)}</h2></div>${b.body}</section>`).join("")}
          ${next.length ? `<section class="doc-block"><div class="doc-block__head"><span class="doc-block__num">→</span><h2>¿Qué sigue?</h2></div><div class="next-up">${next.map((n) => `<a href="${n.href}"><small>${esc(n.k)}</small><strong>${esc(n.t)}${icon("arrow")}</strong></a>`).join("")}</div></section>` : ""}
        </div>
      </div>
    </div>`);
    tocSpy();
  }

  function tocSpy() {
    const links = $$(".toc a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { links.forEach((l) => l.classList.remove("is-active")); const l = map.get(en.target.id); if (l) l.classList.add("is-active"); } });
    }, { rootMargin: "-20% 0px -70% 0px" });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* =========================== PROGRAMACIÓN =========================== */
  function programacion() {
    mount("#langs", WF.lenguajes.map(langCard).join(""));
    mount("#prog-routes", WF.rutas.filter((r) => ["programacion", "web", "bd"].includes(r.area)).map(routeCard).join(""));
    mount("#prog-projects", WF.proyectos.filter((p) => ["programacion", "web", "bd"].includes(p.area) || p.tecnologias.some((t) => WF.lenguajes.some((l) => l.nombre === t))).slice(0, 3).map(projectCard).join(""));
  }

  function lenguaje() {
    const l = byId(WF.lenguajes, params().get("l"));
    if (!l) return notFound("#lang", "este lenguaje", { href: "programacion.html", t: "Ver todos los lenguajes" });
    setMeta(`${l.nombre}: biblioteca de programación`, l.descripcion);
    const files = Object.keys(WF.descargas || {}).filter((k) => k.startsWith(`descargas/programacion/${l.id}/`));
    const projs = WF.proyectos.filter((p) => (p.relacionados && p.relacionados.lenguaje === l.id) || p.tecnologias.includes(l.nombre));
    const lvlBtns = `<div class="level-tabs" role="group" aria-label="Filtrar por nivel"><button type="button" data-lvl="" aria-pressed="true">Todos</button>${Object.entries(T.niveles).map(([k, v]) => `<button type="button" data-lvl="${k}" aria-pressed="false">${v.nombre}</button>`).join("")}</div>`;
    const sections = [
      ["introduccion", "Introducción"], ["conceptos", "Conceptos"], ["ejemplos", "Ejemplos"], ["ejercicios", "Ejercicios"], ["desafios", "Desafíos"], ["proyectos", "Proyectos"], ["descargas", "Descargas"],
    ];
    const counts = { conceptos: l.conceptos.length, ejemplos: files.length, ejercicios: l.ejercicios.length, desafios: l.desafios.length, proyectos: projs.length, descargas: files.length };
    mount("#lang", `
    <header class="page-head"><div class="container">
      ${autoCrumb(l.nombre)}
      <div class="lang-head"><div class="lang-badge" aria-hidden="true">${esc(l.sigla)}</div><div><span class="eyebrow">Biblioteca de programación</span><h1 style="margin:0">${esc(l.nombre)}</h1></div></div>
      <p class="lead" style="margin-top:16px">${esc(l.descripcion)}</p>
    </div></header>
    <div class="container">
      <nav class="tabs" aria-label="Secciones del lenguaje">${sections.map(([id, t]) => `<a class="tab" href="#${id}">${t}${counts[id] != null ? ` <span class="count">${counts[id]}</span>` : ""}</a>`).join("")}</nav>
      <section id="introduccion" class="section--tight"><div class="split split--aside">
        <div class="prose"><h2>Introducción</h2><p>${esc(l.intro)}</p><h3>¿Para qué se usa?</h3>${tags(l.usos, "tag--accent")}</div>
        <aside class="info-panel"><dl><div><dt>Para practicar</dt><dd><ul class="check-list" style="margin-top:6px">${l.herramientas.map((h) => `<li>${icon("external")}<a href="${esc(h.url)}" target="_blank" rel="noopener">${esc(h.nombre)}</a></li>`).join("")}</ul></dd></div>
        <div><dt>Cómo usar esta página</dt><dd>Leé los conceptos de tu nivel, ejecutá los ejemplos, resolvé los ejercicios y terminá con un desafío o proyecto.</dd></div></dl></aside>
      </div></section>
      <section id="conceptos" class="section--tight"><div class="section-head"><div><h2>Conceptos básicos</h2><p>Organizados por nivel: inicial, intermedio y avanzado.</p></div>${lvlBtns}</div>
        <div class="grid grid-3" data-lvl-scope>${l.conceptos.map((c, i) => `<div class="concept" data-nivel="${c.nivel}"><h3><span>${String(i + 1).padStart(2, "0")} · ${esc(c.titulo)}</span>${level(c.nivel)}</h3><p>${esc(c.texto)}</p></div>`).join("")}</div></section>
      <section id="ejemplos" class="section--tight"><h2>Ejemplos</h2><p class="muted">Código comentado. Copialo, ejecutalo y modificalo: es la mejor forma de aprender.</p>${files.length ? files.map((f) => codeBlock(f)).join("") : `<div class="notice">${icon("info")}<p>Los ejemplos de ${esc(l.nombre)} se están preparando.</p></div>`}</section>
      <section id="ejercicios" class="section--tight"><div class="section-head"><div><h2>Ejercicios</h2><p>Abrí cada ejercicio para ver la consigna y una pista.</p></div>${lvlBtns}</div>
        <div data-lvl-scope>${l.ejercicios.map((x, i) => `<details class="exercise" data-nivel="${x.nivel}"><summary><span class="exercise__num">${String(i + 1).padStart(2, "0")}</span><strong>${esc(x.titulo)}</strong>${level(x.nivel)}</summary><div class="exercise__body"><p>${esc(x.enunciado)}</p>${x.pista ? `<details class="hint"><summary>💡 Ver pista</summary><p style="margin-top:8px"><code>${esc(x.pista)}</code></p></details>` : ""}</div></details>`).join("")}</div></section>
      <section id="desafios" class="section--tight"><h2>Desafíos</h2><div class="grid grid-3">${l.desafios.map((d) => `<div class="card"><div class="card__kicker"><span class="tag tag--accent">${icon("flag")}Desafío</span>${level(d.nivel)}</div><h3 class="card__title">${esc(d.titulo)}</h3><p class="card__text" style="margin:0">${esc(d.texto)}</p></div>`).join("")}</div></section>
      <section id="proyectos" class="section--tight"><h2>Proyectos con ${esc(l.nombre)}</h2>${projs.length ? `<div class="grid grid-3">${projs.map(projectCard).join("")}</div>` : `<div class="notice">${icon("layers")}<p>Pronto habrá proyectos con ${esc(l.nombre)}. Mientras tanto, mirá <a href="proyectos.html">todos los proyectos</a>.</p></div>`}</section>
      <section id="descargas" class="section--tight"><h2>Código descargable</h2><ul class="simple-list" style="max-width:720px">${files.map(fileRow).join("") || `<li class="muted">Sin archivos todavía.</li>`}</ul></section>
      <section class="section--tight"><h2>Otros lenguajes</h2><div class="chip-group">${WF.lenguajes.filter((x) => x.id !== l.id).map((x) => `<a class="chip" href="lenguaje.html?l=${x.id}">${esc(x.nombre)}</a>`).join("")}</div></section>
    </div>`);
    $("#lang").addEventListener("click", (e) => {
      const b = e.target.closest("[data-lvl]"); if (!b) return;
      const v = b.dataset.lvl;
      $$("[data-lvl]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.lvl === v));
      $$("[data-lvl-scope] [data-nivel]").forEach((el) => (el.hidden = v && el.dataset.nivel !== v));
    });
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 50); }
  }

  /* ============================ MATERIALES ============================ */
  function materiales() {
    const p = params();
    const F = [
      { k: "materia", label: "Materia", opts: T.materias, kind: "select" },
      { k: "nivel", label: "Nivel educativo", opts: T.destinatarios, kind: "select" },
      { k: "tema", label: "Tema", opts: Object.fromEntries(Object.entries(T.areas).map(([k, v]) => [k, v.nombre])), kind: "select" },
      { k: "dificultad", label: "Dificultad", opts: Object.fromEntries(Object.entries(T.niveles).map(([k, v]) => [k, v.nombre])), kind: "chips" },
      { k: "tipo", label: "Tipo de recurso", opts: T.tipos, kind: "select" },
      { k: "formato", label: "Formato", opts: T.formatos, kind: "chips" },
    ];
    const state = Object.fromEntries(F.map((f) => [f.k, p.get(f.k) || ""]));
    state.q = p.get("q") || "";
    const matches = (m, except) => F.every((f) => f.k === except || !state[f.k] || m[f.k] === state[f.k]) && (!state.q || norm([m.titulo, m.descripcion, ...(m.etiquetas || []), areaName(m.tema), T.tipos[m.tipo]].join(" ")).includes(norm(state.q)));
    const drawFilters = () => {
      mount("#mat-filters-body", `
        <div class="field"><label for="mq">Buscar</label><div class="input-icon">${icon("search")}<input id="mq" class="input" type="search" placeholder="Ej.: Python, redes, Word" value="${esc(state.q)}"></div></div>
        ${F.map((f) => {
          const present = Object.entries(f.opts).filter(([k]) => WF.materiales.some((m) => m[f.k] === k));
          const count = (k) => WF.materiales.filter((m) => m[f.k] === k && matches(m, f.k)).length;
          if (f.kind === "chips") return `<div class="field"><span class="label" id="l-${f.k}">${f.label}</span><div class="chip-group" role="group" aria-labelledby="l-${f.k}">${present.map(([k, v]) => `<button type="button" class="chip" data-f="${f.k}" data-v="${k}" aria-pressed="${state[f.k] === k}">${esc(v)} <span class="count">${count(k)}</span></button>`).join("")}</div></div>`;
          return `<div class="field"><label for="f-${f.k}">${f.label}</label><select id="f-${f.k}" class="select" data-f="${f.k}"><option value="">Todos</option>${present.map(([k, v]) => `<option value="${k}"${state[f.k] === k ? " selected" : ""}>${esc(v)} (${count(k)})</option>`).join("")}</select></div>`;
        }).join("")}`);
      const q = $("#mq");
      q.addEventListener("input", () => { state.q = q.value; drawResults(); });
    };
    const drawResults = () => {
      const list = WF.materiales.filter((m) => matches(m));
      const active = F.filter((f) => state[f.k]).length + (state.q ? 1 : 0);
      mount("#mat-count", `<span>${list.length} recurso${list.length === 1 ? "" : "s"}${active ? ` · ${active} filtro${active > 1 ? "s" : ""} activo${active > 1 ? "s" : ""}` : ""}</span>${active ? `<button class="btn btn--ghost btn--sm" type="button" data-clear>${icon("x")} Limpiar filtros</button>` : ""}`);
      mount("#mat-grid", list.length ? list.map(resourceCard).join("") : `<div class="empty" style="grid-column:1/-1">${icon("search")}<strong>No hay materiales con esos filtros</strong>Probá con menos filtros o usá la <a href="#" data-search-open>búsqueda global</a>.</div>`);
      const ft = $("#filters-toggle"); if (ft) ft.querySelector("span").textContent = active ? `Filtros (${active})` : "Filtros";
      const u = new URLSearchParams(Object.entries(state).filter(([, v]) => v));
      history.replaceState(null, "", location.pathname + (u.toString() ? "?" + u : ""));
    };
    const body = $("#mat-filters-body");
    body.addEventListener("change", (e) => { const s = e.target.closest("select[data-f]"); if (s) { state[s.dataset.f] = s.value; drawFilters(); drawResults(); } });
    body.addEventListener("click", (e) => { const c = e.target.closest("button[data-f]"); if (c) { state[c.dataset.f] = state[c.dataset.f] === c.dataset.v ? "" : c.dataset.v; drawFilters(); drawResults(); } });
    $("#mat-count").addEventListener("click", (e) => { if (e.target.closest("[data-clear]")) { Object.keys(state).forEach((k) => (state[k] = "")); drawFilters(); drawResults(); } });
    const ft = $("#filters-toggle"); if (ft) ft.addEventListener("click", () => { const f = $(".filters"); const o = f.classList.toggle("is-open"); ft.setAttribute("aria-expanded", o); });
    drawFilters(); drawResults();
  }

  /* ======================== RECURSOS PARA ALUMNOS ======================== */
  const CAT_APRENDER = {
    apuntes: ["Apuntes de todas las áreas en PDF", "Para leer en el celular o imprimir", "Cada apunte termina con una actividad"],
    programacion: () => WF.lenguajes.map((l) => l.nombre),
    internet: ["Cómo funciona Internet", "Redes y direcciones IP", "HTML, CSS y JavaScript", "Navegar de forma segura"],
    hardware: () => WF.secciones.tecnologiaAreas.find((a) => a.id === "hardware").temas,
    seguridad: () => WF.secciones.tecnologiaAreas.find((a) => a.id === "seguridad").temas,
    ia: () => WF.secciones.iaTemas.slice(0, 6).map((t) => t.titulo),
    bd: () => WF.secciones.tecnologiaAreas.find((a) => a.id === "bd").temas,
    diseno: ["Documentos prolijos", "Presentaciones", "Infografías", "Diseño web"],
    pensamiento: ["Descomposición", "Patrones", "Abstracción", "Algoritmos y diagramas de flujo"],
  };
  const CAT_RUTA = { programacion: "intro-programacion", internet: "desarrollo-web", bd: "bases-de-datos", ia: "ia-responsable", pensamiento: "intro-programacion", diseno: "desarrollo-web" };
  function alumnos() {
    const cat = params().get("cat");
    const c = cat && T.alumnos.find((x) => x.id === cat);
    if (!c) {
      mount("#al-tiles", T.alumnos.map((x) => {
        const n = WF.materiales.filter((m) => (m.alumnos || []).includes(x.id)).length;
        return `<a class="big-tile" href="alumnos.html?cat=${x.id}"><span class="big-tile__emoji" aria-hidden="true">${x.emoji}</span><strong>${esc(x.nombre)}</strong><small>${n} recurso${n === 1 ? "" : "s"} →</small></a>`;
      }).join(""));
      mount("#al-routes", WF.rutas.map(routeCard).join(""));
      mount("#al-apuntes", WF.materiales.filter((m) => m.tipo === "apunte" || (m.formato === "pdf" && m.archivo)).map((m) => `<li><a href="${esc(m.abrir)}"><span class="format">PDF</span>${esc(m.titulo)}${icon("arrow")}</a></li>`).join(""));
      return;
    }
    $("#al-home").hidden = true;
    setMeta(`${c.nombre} — Recursos para alumnos`, `Materiales, actividades y proyectos de ${c.nombre} para estudiantes.`);
    const mats = WF.materiales.filter((m) => (m.alumnos || []).includes(c.id) || (c.id === "apuntes" && m.tipo === "apunte"));
    const files = [...new Set(mats.map((m) => m.archivo).filter((a) => a && fileInfo(a)))];
    const projs = WF.proyectos.filter((p) => c.area && (p.area === c.area || (c.id === "internet" && p.area === "redes")));
    const aprender = typeof CAT_APRENDER[c.id] === "function" ? CAT_APRENDER[c.id]() : CAT_APRENDER[c.id] || [];
    const ruta = byId(WF.rutas, CAT_RUTA[c.id]);
    const first = mats.find((m) => m.abrir && !isExternal(m.abrir)) || mats[0];
    const step = (n, title, body) => `<li class="guide-step"><div class="guide-step__q"><span>${n}</span><h2>${title}</h2></div>${body}</li>`;
    const matRow = (m) => !(m.abrir || m.archivo) ? `<li><span class="row"><span class="format">${esc((T.formatos[m.formato] || "").toUpperCase().slice(0, 5))}</span><span>${esc(m.titulo)}<br><small class="muted mono">Próximamente</small></span></span></li>` : `<li><a href="${esc(m.abrir || m.archivo)}"${extAttrs(m.abrir)}><span class="format">${esc((T.formatos[m.formato] || "").toUpperCase().slice(0, 5))}</span><span>${esc(m.titulo)}</span>${icon(isExternal(m.abrir) ? "external" : "arrow")}</a></li>`;
    mount("#al-cat", `
      <div class="you-are-here">${icon("mapPin")}<span>Estás en: <a href="alumnos.html" style="color:inherit">Recursos para alumnos</a> › ${c.emoji} ${esc(c.nombre)}</span></div>
      <h1 style="font-size:clamp(1.8rem,1.3rem + 2vw,2.5rem)">${c.emoji} ${esc(c.nombre)}</h1>
      <p class="lead" style="margin-bottom:28px">Seguí estos pasos en orden. Todo funciona desde el celular.</p>
      <ol class="guide-steps">
        ${step(1, "¿Qué puedo aprender?", `<div class="tags">${aprender.map((a) => tag(a)).join("")}</div>`)}
        ${step(2, "¿Qué tengo que hacer?", `<ol><li>Leé el material de inicio${first ? `: <a href="${esc(first.abrir || first.archivo)}"${extAttrs(first.abrir)}>${esc(first.titulo)}</a>` : ""}.</li><li>Hacé la actividad que está al final.</li><li>Practicá con los ejercicios o el proyecto.</li><li>Si algo no se entiende, anotá tu pregunta para la clase.</li></ol>`)}
        ${step(3, "¿Qué material necesito?", mats.length ? `<ul class="simple-list">${mats.map(matRow).join("")}</ul>` : `<p class="muted">Pronto habrá materiales en esta categoría.</p>`)}
        ${step(4, "¿Dónde lo descargo?", files.length ? `<ul class="simple-list">${files.map(fileRow).join("")}</ul>` : `<p class="muted">No hay archivos para descargar todavía. Podés usar los materiales en línea.</p>`)}
        ${step(5, "¿Qué proyecto puedo hacer?", projs.length ? `<ul class="simple-list">${projs.map((p) => `<li><a href="proyecto.html?id=${p.id}"><span class="format">PROY</span><span>${esc(p.titulo)}<br>${level(p.nivel)}</span>${icon("arrow")}</a></li>`).join("")}</ul>` : `<p>Mirá la <a href="proyectos.html">lista completa de proyectos</a>.</p>`)}
        ${step(6, "¿Qué hago después?", `<div class="next-up">${ruta ? `<a href="ruta.html?id=${ruta.id}"><small>Seguí una ruta paso a paso</small><strong>${esc(ruta.titulo)}${icon("arrow")}</strong></a>` : ""}<a href="alumnos.html"><small>Elegí otro tema</small><strong>Volver a las categorías${icon("arrow")}</strong></a><a href="#" data-search-open><small>¿Buscás algo puntual?</small><strong>Buscar en la plataforma${icon("search")}</strong></a></div>`)}
      </ol>`);
    $("#al-cat").hidden = false;
  }

  /* =============================== RUTAS =============================== */
  function rutas() {
    const draw = () => mount("#routes", WF.rutas.map(routeCard).join(""));
    draw(); document.addEventListener("wf:progress", draw);
  }
  function ruta() {
    const r = byId(WF.rutas, params().get("id"));
    if (!r) return notFound("#route", "esta ruta", { href: "rutas.html", t: "Ver todas las rutas" });
    setMeta(r.titulo, r.descripcion);
    const PS = WF.ProgressStore;
    const draw = () => {
      const done = PS.done(r.id);
      const cur = r.niveles.findIndex((_, i) => !done.has(i));
      const pct = PS.percent(r.id, r.niveles.length);
      const resLink = (id) => { const m = byId(WF.materiales, id); return m ? `<li><a href="${esc(m.abrir || m.archivo)}"${extAttrs(m.abrir)}><span class="format">${esc((T.formatos[m.formato] || "").toUpperCase().slice(0, 5))}</span><span>${esc(m.titulo)}</span>${icon("arrow")}</a></li>` : ""; };
      mount("#route", `
      <header class="page-head"><div class="container">
        ${autoCrumb(r.titulo)}
        <div class="tags" style="margin-bottom:16px">${tag(areaName(r.area), "tag--accent")}${status(r.estado)}<span class="tag">${level(r.nivel)}</span><span class="tag">${icon("clock")}${esc(r.duracion)}</span></div>
        <h1>${esc(r.titulo)}</h1><p class="lead">${esc(r.descripcion)}</p>
        <div style="max-width:560px;margin-top:28px"><div class="progress-label"><span>Tu progreso: ${done.size} de ${r.niveles.length} niveles</span><span>${pct}%</span></div><div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de la ruta"><div class="progress__bar" style="width:${pct}%"></div></div>
        <p class="muted" style="font-size:var(--fs-xs);margin-top:10px">${icon("info").replace("<svg", '<svg style="width:14px;height:14px;display:inline;vertical-align:-2px"')} El progreso se guarda en este navegador. ${done.size ? `<button class="btn btn--ghost btn--sm" type="button" data-reset>Reiniciar</button>` : ""}</p></div>
      </div></header>
      <div class="container container--narrow section--tight">
        ${pct === 100 ? `<div class="callout" style="margin-top:0"><div class="callout__title">${icon("checkCircle")}¡Completaste la ruta!</div><p>Excelente trabajo. Mirá otras <a href="rutas.html">rutas de aprendizaje</a> o compartí tu proyecto final.</p></div>` : ""}
        <ol class="route-map">${r.niveles.map((n, i) => `
          <li class="route-level${done.has(i) ? " is-done" : ""}${i === cur ? " is-current" : ""}">
            <span class="route-level__badge" aria-hidden="true">${done.has(i) ? icon("check") : i + 1}</span>
            <details class="route-level__card"${i === cur ? " open" : ""}>
              <summary><span class="muted">Nivel ${i + 1}${done.has(i) ? " · completado ✓" : i === cur ? " · estás acá" : ""}</span><h3>${esc(n.titulo)}</h3>${icon("chevron").replace("<svg", '<svg style="width:18px;height:18px;color:var(--ink-3)"')}</summary>
              <div class="route-level__body">
                <div><h4>Objetivo</h4><p style="margin:0">${esc(n.objetivo)}</p></div>
                <div><h4>Actividades</h4><ol style="margin:0">${n.actividades.map((a) => `<li>${esc(a)}</li>`).join("")}</ol></div>
                ${(n.recursos || []).length || (n.enlaces || []).length ? `<div><h4>Material</h4><ul class="simple-list">${(n.recursos || []).map(resLink).join("")}${(n.enlaces || []).map((e) => `<li><a href="${esc(e.url)}"><span class="format">IR</span><span>${esc(e.texto)}</span>${icon("arrow")}</a></li>`).join("")}</ul></div>` : ""}
                <label class="done-toggle"><input type="checkbox" data-lvl="${i}"${done.has(i) ? " checked" : ""}> Marcar nivel como completado</label>
              </div>
            </details>
          </li>`).join("")}</ol>
      </div>`);
    };
    draw();
    $("#route").addEventListener("change", (e) => { const c = e.target.closest("[data-lvl]"); if (c) PS.toggle(r.id, +c.dataset.lvl, c.checked); });
    $("#route").addEventListener("click", (e) => { if (e.target.closest("[data-reset]") && confirm("¿Reiniciar el progreso de esta ruta?")) PS.reset(r.id); });
    document.addEventListener("wf:progress", draw);
  }

  /* ======================== PROYECTOS DE ALUMNOS ======================== */
  function proyectosAlumnos() {
    mount("#gallery", WF.alumnosProyectos.map((a) => `
      <article class="card" id="${esc(a.id)}">
        <div class="project-card__cover">${cover(a.id, areaName(a.area), areaIcon(a.area))}</div>
        <div class="card__kicker"><span class="tag">${icon("users")}${esc(a.autor)}</span>${a.ejemplo ? `<span class="tag" title="Ficha de muestra para ilustrar el formato">Ejemplo de formato</span>` : ""}</div>
        <h3 class="card__title">${esc(a.titulo)}</h3>
        <dl style="grid-template-columns:1fr;gap:2px 0">
          <dt>Problema</dt><dd style="margin-bottom:8px">${esc(a.problema)}</dd>
          <dt>Solución</dt><dd style="margin-bottom:8px">${esc(a.solucion)}</dd>
          <dt>Resultado</dt><dd style="margin-bottom:8px">${esc(a.resultado)}</dd>
          <dt>Qué aprendió</dt><dd><em>${esc(a.aprendizaje)}</em></dd>
        </dl>
        ${tags(a.tecnologias)}
        ${a.enlace ? `<div class="card__foot"><a class="link-arrow" href="${esc(a.enlace)}"${extAttrs(a.enlace)}>Ver trabajo ${icon("arrow")}</a></div>` : ""}
      </article>`).join(""));
  }

  /* =========================== IA Y EDUCACIÓN =========================== */
  function ia() {
    mount("#ia-temas", WF.secciones.iaTemas.map((t) => `<div class="card" id="tema-${t.id}"><div class="card__icon">${icon(t.icono)}</div><h3 class="card__title">${esc(t.titulo)}</h3><p class="card__text" style="margin:0">${esc(t.texto)}</p></div>`).join(""));
    // Constructor de prompts
    const form = $("#prompt-form"), out = $("#prompt-out");
    if (form) {
      const build = () => {
        const v = Object.fromEntries(new FormData(form).entries());
        const lines = [];
        if (v.rol) lines.push(`Actuá como ${v.rol}.`);
        lines.push(v.tarea ? `${v.tarea.trim().replace(/\.$/, "")}.` : "[Escribí acá qué necesitás]");
        if (v.contexto) lines.push(`Contexto: ${v.contexto.trim()}.`);
        if (v.formato) lines.push(`Formato de la respuesta: ${v.formato}.`);
        const lim = $$("input[name=limite]:checked", form).map((c) => c.value);
        if (lim.length) lines.push("Condiciones:\n" + lim.map((l) => `- ${l}`).join("\n"));
        lines.push("Al final, indicá qué partes de tu respuesta conviene verificar en otras fuentes.");
        $("#prompt-text").textContent = lines.join("\n\n");
      };
      form.addEventListener("input", build); form.addEventListener("change", build); build();
      $("#prompt-copy").addEventListener("click", () => WF.copyText($("#prompt-text").textContent));
    }
    // Checklist de verificación
    const cl = $("#verify-list");
    if (cl) {
      const upd = () => { const all = $$("input", cl), n = all.filter((c) => c.checked).length; mount("#verify-score", n === all.length ? `${icon("checkCircle")} <strong>¡Listo!</strong> Podés usar la información con confianza razonable.` : `${n} de ${all.length} comprobaciones realizadas.`); };
      cl.addEventListener("change", upd); upd();
    }
    mount("#ia-materiales", WF.materiales.filter((m) => m.tema === "ia").map(resourceCard).join(""));
  }

  /* ============================= TECNOLOGÍA ============================= */
  function tecnologia() {
    mount("#tec-areas", WF.secciones.tecnologiaAreas.map((a) => {
      const mats = WF.materiales.filter((m) => m.tema === a.id);
      const projs = WF.proyectos.filter((p) => p.area === a.id);
      return `<section class="card" id="${a.id}" aria-labelledby="h-${a.id}">
        <div class="card__icon">${icon(a.icono)}</div>
        <h2 class="card__title" id="h-${a.id}" style="font-size:1.2rem">${esc(a.titulo)}</h2>
        <p class="card__text">${esc(a.texto)}</p>
        ${tags(a.temas)}
        <div class="card__foot" style="margin-top:18px">
          <span class="muted mono" style="font-size:var(--fs-xs)">${mats.length} materiales · ${projs.length} proyectos</span>
          <a class="link-arrow" href="${a.id === "ia" ? "ia.html" : `materiales.html?tema=${a.id}`}">Explorar ${icon("arrow")}</a>
        </div>
      </section>`;
    }).join(""));
    mount("#tec-tools", WF.secciones.herramientas.map((h) => `<a class="channel" href="${esc(h.url)}" target="_blank" rel="noopener">${icon(areaIcon(h.area))}<span><strong>${esc(h.nombre)}</strong><small>${esc(h.texto)}</small></span></a>`).join(""));
  }

  /* ================================ BLOG ================================ */
  function blog() {
    const posts = [...WF.blog].sort((a, b) => b.fecha.localeCompare(a.fecha));
    let cat = params().get("cat") || "";
    const cats = Object.entries(T.blog);
    const draw = () => {
      mount("#blog-cats", `<button class="chip" type="button" data-cat="" aria-pressed="${!cat}">Todas <span class="count">${posts.length}</span></button>` + cats.map(([k, v]) => { const n = posts.filter((p) => p.categoria === k).length; return `<button class="chip" type="button" data-cat="${k}" aria-pressed="${cat === k}"${n ? "" : " disabled"}>${esc(v)} <span class="count">${n}</span></button>`; }).join(""));
      const list = posts.filter((p) => !cat || p.categoria === cat);
      const [f, ...rest] = list;
      mount("#blog-featured", f ? `<article class="featured-post"><div class="featured-post__cover">${cover(f.id, "", "")}</div><div class="featured-post__body"><div class="card__kicker" style="justify-content:flex-start">${tag(T.blog[f.categoria], "tag--accent")}<time class="mono muted" style="font-size:var(--fs-xs)" datetime="${f.fecha}">${fmtDate(f.fecha)}</time></div><h2><a href="articulo.html?id=${f.id}">${esc(f.titulo)}</a></h2><p class="muted">${esc(f.resumen)}</p><span class="link-arrow" style="margin-top:auto">Leer artículo · ${esc(f.lectura)} ${icon("arrow")}</span></div></article>` : `<div class="empty">${icon("pen")}<strong>Todavía no hay artículos en esta categoría</strong></div>`);
      mount("#blog-grid", rest.map(postCard).join(""));
    };
    $("#blog-cats").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) { cat = b.dataset.cat; draw(); history.replaceState(null, "", cat ? `?cat=${cat}` : location.pathname); } });
    draw();
  }
  function articulo() {
    const a = byId(WF.blog, params().get("id"));
    if (!a) return notFound("#article", "este artículo", { href: "blog.html", t: "Volver al blog" });
    setMeta(a.titulo, a.resumen);
    const url = location.href;
    const rm = (a.relacionados.materiales || []).map((id) => byId(WF.materiales, id)).filter(Boolean);
    const rp = (a.relacionados.proyectos || []).map((id) => byId(WF.proyectos, id)).filter(Boolean);
    const more = WF.blog.filter((x) => x.id !== a.id).sort((x, y) => y.fecha.localeCompare(x.fecha)).slice(0, 2);
    const enc = encodeURIComponent;
    mount("#article", `
    <article>
      <header class="page-head" style="border-bottom:0;padding-bottom:24px"><div class="container container--narrow">
        ${autoCrumb(a.titulo)}
        <div class="post-meta" style="margin-bottom:16px"><a class="tag tag--accent" href="blog.html?cat=${a.categoria}" style="text-decoration:none">${esc(T.blog[a.categoria])}</a><time datetime="${a.fecha}">${fmtDate(a.fecha, { day: "numeric", month: "long", year: "numeric" })}</time><span class="mono" style="font-size:var(--fs-xs)">${esc(a.lectura)} de lectura</span></div>
        <h1 style="max-width:none">${esc(a.titulo)}</h1>
        <p class="lead">${esc(a.resumen)}</p>
        <p class="muted" style="font-size:var(--fs-sm);margin-top:16px">Por <a href="sobre-mi.html">${esc(S.nombre)}</a></p>
      </div></header>
      <div class="container container--narrow">
        <div class="article-cover" role="img" aria-label="${esc(a.imagenAlt || a.titulo)}">${cover(a.id + "-cover", "", "")}</div>
        <div class="article-body">${a.contenido}</div>
        <hr>
        <div class="share" aria-label="Compartir"><strong style="font-size:var(--fs-sm);margin-right:6px">${icon("share").replace("<svg", '<svg style="width:16px;height:16px;display:inline;vertical-align:-3px"')} Compartir:</strong>
          ${navigator.share ? `<button class="btn btn--sm" type="button" data-share>${icon("share")} Compartir…</button>` : ""}
          <a class="btn btn--sm" href="https://wa.me/?text=${enc(a.titulo + " " + url)}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="btn btn--sm" href="https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}" target="_blank" rel="noopener">${icon("linkedin")} LinkedIn</a>
          <a class="btn btn--sm" href="mailto:?subject=${enc(a.titulo)}&body=${enc(url)}">${icon("mail")} Correo</a>
          <button class="btn btn--sm" type="button" data-copylink>${icon("link")} Copiar enlace</button>
        </div>
        ${rm.length || rp.length ? `<section class="section--tight"><h2 style="font-size:1.3rem">Recursos relacionados</h2><ul class="simple-list">${rp.map((p) => `<li><a href="proyecto.html?id=${p.id}"><span class="format">PROY</span><span>${esc(p.titulo)}</span>${icon("arrow")}</a></li>`).join("")}${rm.map((m) => `<li><a href="${esc(m.abrir || m.archivo)}"${extAttrs(m.abrir)}><span class="format">${esc((T.formatos[m.formato] || "").toUpperCase().slice(0, 5))}</span><span>${esc(m.titulo)}</span>${icon("arrow")}</a></li>`).join("")}</ul></section>` : ""}
        <section class="section--tight"><h2 style="font-size:1.3rem">Seguí leyendo</h2><div class="grid grid-2">${more.map(postCard).join("")}</div></section>
      </div>
    </article>`);
    $("#article").addEventListener("click", (e) => {
      if (e.target.closest("[data-copylink]")) WF.copyText(url);
      if (e.target.closest("[data-share]")) navigator.share({ title: a.titulo, text: a.resumen, url }).catch(() => {});
    });
    // Datos estructurados del artículo (SEO)
    const ld = document.createElement("script"); ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: a.titulo, description: a.resumen, datePublished: a.fecha, author: { "@type": "Person", name: S.nombre }, inLanguage: "es" });
    document.head.appendChild(ld);
  }

  /* ========================= RECURSOS / DESCARGAS ========================= */
  function recursos() {
    const all = Object.values(WF.descargas || {});
    const groupOf = (f) => { const p = f.ruta.split("/"); return p[1] === "programacion" ? `Programación · ${p[2]}` : p[1] === "proyectos" ? "Proyectos" : p[1] === "apuntes" ? "Apuntes" : p[1] === "docentes" ? "Docentes" : "Otros"; };
    const desc = {};
    WF.materiales.forEach((m) => { if (m.archivo) desc[m.archivo] = m.descripcion; });
    WF.proyectos.forEach((p) => (p.descargas || []).forEach((d) => { if (!desc[d]) desc[d] = `Proyecto: ${p.titulo}`; }));
    WF.lenguajes.forEach((l) => all.filter((f) => f.ruta.startsWith(`descargas/programacion/${l.id}/`)).forEach((f) => { if (!desc[f.ruta]) desc[f.ruta] = `Ejemplo de ${l.nombre}`; }));
    const groups = [...new Set(all.map(groupOf).map((g) => g.split(" · ")[0]))];
    let g = params().get("g") || "", q = "";
    const draw = () => {
      const list = all.filter((f) => (!g || groupOf(f).startsWith(g)) && (!q || norm(f.nombre + " " + (desc[f.ruta] || "") + " " + groupOf(f)).includes(norm(q))));
      mount("#dl-count", `<span>${list.length} archivo${list.length === 1 ? "" : "s"} · ${fmtBytes(list.reduce((s, f) => s + f.bytes, 0))} en total</span>`);
      mount("#dl-table", list.length ? `<table class="dl-table"><caption class="sr-only">Archivos descargables</caption><thead><tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Tamaño</th><th scope="col">Actualizado</th><th scope="col"><span class="sr-only">Acción</span></th></tr></thead><tbody>${list.map((f) => `<tr><td><div class="name">${esc(f.nombre)}</div><div class="desc">${esc(desc[f.ruta] || groupOf(f))}</div></td><td class="num">${esc(f.tipo)}</td><td class="num">${fmtBytes(f.bytes)}</td><td class="num">${fmtDate(f.actualizado)}</td><td class="cell-action">${downloadBtn(f.ruta, { small: true })}</td></tr>`).join("")}</tbody></table>` : `<div class="empty">${icon("search")}<strong>Sin archivos</strong></div>`);
    };
    mount("#dl-groups", `<button class="chip" type="button" data-g="" aria-pressed="${!g}">Todos</button>` + groups.map((x) => `<button class="chip" type="button" data-g="${esc(x)}" aria-pressed="${g === x}">${esc(x)} <span class="count">${all.filter((f) => groupOf(f).startsWith(x)).length}</span></button>`).join(""));
    $("#dl-groups").addEventListener("click", (e) => { const b = e.target.closest("[data-g]"); if (!b) return; g = b.dataset.g; $$("[data-g]").forEach((x) => x.setAttribute("aria-pressed", x === b)); draw(); });
    $("#dl-q").addEventListener("input", (e) => { q = e.target.value; draw(); });
    draw();
    mount("#tools", WF.secciones.herramientas.map((h) => `<a class="channel" href="${esc(h.url)}" target="_blank" rel="noopener">${icon(areaIcon(h.area))}<span><strong>${esc(h.nombre)}</strong><small>${esc(h.texto)}</small></span></a>`).join(""));
    mount("#integrations", WF.secciones.integraciones.map((it) => {
      const on = S.integraciones[it.id] && S.integraciones[it.id].activo;
      return `<div class="integration"><span class="integration__logo">${icon(it.icono)}</span><div><h3>${esc(it.nombre)} <span class="status status--${on ? "publicado" : "planificado"}">${on ? "Activa" : "Preparada"}</span></h3><p>${esc(it.uso)}</p></div></div>`;
    }).join(""));
  }

  /* ============================== CONTACTO ============================== */
  function contacto() {
    const c = S.contacto;
    const ch = [
      c.email && { href: `mailto:${c.email}`, i: "mail", t: "Correo profesional", s: c.email },
      S.redes.linkedin && { href: S.redes.linkedin, i: "linkedin", t: "LinkedIn", s: S.redes.linkedin.replace(/^https?:\/\/(www\.)?/, "") },
      S.redes.github && { href: S.redes.github, i: "github", t: "GitHub", s: S.redes.github.replace(/^https?:\/\//, "") },
      S.redes.youtube && { href: S.redes.youtube, i: "youtube", t: "YouTube", s: "Canal de videos" },
    ].filter(Boolean);
    mount("#channels", ch.map((x) => `<a class="channel" href="${esc(x.href)}"${extAttrs(x.href)}>${icon(x.i)}<span><strong>${esc(x.t)}</strong><small>${esc(x.s)}</small></span></a>`).join("") || `<p class="muted">Usá el formulario para escribirme.</p>`);
    mount("#availability", esc(c.disponibilidad));
    const form = $("#contact-form"); if (!form) return;
    const motivo = params().get("motivo"); if (motivo && form.motivo) form.motivo.value = motivo;
    const err = (name, msg) => { const f = form.elements[name], e = $(`#err-${name}`); f.setAttribute("aria-invalid", msg ? "true" : "false"); if (e) e.textContent = msg || ""; return !msg; };
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(form).entries());
      if (d.website) return; // trampa anti-spam
      const ok = [err("nombre", d.nombre.trim().length < 2 ? "Escribí tu nombre." : ""), err("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) ? "" : "Escribí un correo válido."), err("mensaje", d.mensaje.trim().length < 10 ? "El mensaje es muy corto (mínimo 10 caracteres)." : "")].every(Boolean);
      const st = $("#form-status");
      if (!ok) { st.hidden = false; st.className = "form__status form__status--err"; st.innerHTML = `${icon("alert")}<span>Revisá los campos marcados.</span>`; form.querySelector("[aria-invalid=true]").focus(); return; }
      const btn = form.querySelector("[type=submit]"); btn.disabled = true;
      if (c.formEndpoint) {
        try {
          const r = await fetch(c.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
          if (!r.ok) throw new Error();
          st.hidden = false; st.className = "form__status form__status--ok"; st.innerHTML = `${icon("checkCircle")}<span><strong>¡Mensaje enviado!</strong> Te respondo a la brevedad.</span>`; form.reset();
        } catch { st.hidden = false; st.className = "form__status form__status--err"; st.innerHTML = `${icon("alert")}<span>No se pudo enviar. Probá de nuevo en unos minutos.</span>`; }
      } else if (c.email) {
        const body = `${d.mensaje}\n\n— ${d.nombre}${d.institucion ? " · " + d.institucion : ""}\n${d.email}`;
        location.href = `mailto:${c.email}?subject=${encodeURIComponent(`[${d.motivo}] Consulta desde la plataforma`)}&body=${encodeURIComponent(body)}`;
        st.hidden = false; st.className = "form__status form__status--ok"; st.innerHTML = `${icon("mail")}<span>Se abrió tu aplicación de correo con el mensaje listo para enviar.</span>`;
      } else {
        st.hidden = false; st.className = "form__status form__status--err"; st.innerHTML = `${icon("info")}<span>El formulario todavía no está conectado. Configurá <code>contacto.email</code> o <code>contacto.formEndpoint</code> en <code>data/sitio.js</code>.</span>`;
      }
      btn.disabled = false;
    });
  }

  /* ============================== BUSCAR ============================== */
  function buscar() {
    const input = $("#q");
    let type = "";
    input.value = params().get("q") || "";
    const draw = () => {
      const q = input.value.trim();
      history.replaceState(null, "", q ? `?q=${encodeURIComponent(q)}` : location.pathname);
      if (!q) { mount("#search-types", ""); mount("#search-results-page", `<div class="search-suggest" style="padding:0"><p class="muted mono" style="font-size:var(--fs-xs)">Búsquedas frecuentes:</p><div class="chip-group">${["Python", "SQL", "redes", "IA", "Word", "programación", "seguridad", "Arduino", "HTML", "Excel"].map((s) => `<button class="chip" type="button" data-s="${s}">${s}</button>`).join("")}</div></div>`); return; }
      const res = WF.search(q, 200);
      const types = [...new Set(res.map((r) => r.tipo))];
      if (type && !types.includes(type)) type = "";
      mount("#search-types", res.length ? `<button class="chip" type="button" data-t="" aria-pressed="${!type}">Todo <span class="count">${res.length}</span></button>` + types.map((t) => `<button class="chip" type="button" data-t="${esc(t)}" aria-pressed="${type === t}">${esc(t)} <span class="count">${res.filter((r) => r.tipo === t).length}</span></button>`).join("") : "");
      const list = res.filter((r) => !type || r.tipo === type);
      mount("#search-results-page", list.length ? `<p class="results-meta">${list.length} resultado${list.length === 1 ? "" : "s"} para “${esc(q)}”</p><div style="display:grid;gap:4px">${list.map((it) => `<a class="search-result" href="${esc(it.url)}"${extAttrs(it.url)} style="border:1px solid var(--line);background:var(--surface)"><span class="search-result__icon">${icon(it.icono)}</span><div><strong>${WF.markTerms(it.titulo, q)}</strong><small>${esc(it.tipo)} · ${esc(it.texto)}</small></div>${icon("arrow").replace("<svg", '<svg style="width:16px;height:16px;color:var(--ink-3);flex-shrink:0"')}</a>`).join("")}</div>` : `<div class="empty">${icon("search")}<strong>Sin resultados para “${esc(q)}”</strong>Probá con otra palabra, por ejemplo “programación” o “redes”.</div>`);
    };
    input.addEventListener("input", draw);
    $("#search-types").addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (b) { type = b.dataset.t; draw(); } });
    $("#search-results-page").addEventListener("click", (e) => { const b = e.target.closest("[data-s]"); if (b) { input.value = b.dataset.s; draw(); } });
    draw(); input.focus();
  }

  /* ============================ Despachador ============================ */
  const ROUTES = { inicio: home, "sobre-mi": sobreMi, portfolio, proyectos, proyecto, programacion, lenguaje, materiales, alumnos, rutas, ruta, "proyectos-alumnos": proyectosAlumnos, ia, tecnologia, blog, articulo, recursos, contacto, buscar };
  const fn = ROUTES[document.body.dataset.page];
  if (fn) {
    try { fn(); } catch (err) { console.error(err); const m = $("#main"); if (m) m.insertAdjacentHTML("afterbegin", `<div class="container section"><div class="empty">${icon("alert")}<strong>Algo no se cargó bien</strong>Recargá la página. Si el problema sigue, avisame desde <a href="contacto.html">contacto</a>.</div></div>`); }
  }
  WF.hydrateIcons();
})();
