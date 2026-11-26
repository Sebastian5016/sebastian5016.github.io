/* ==========================================================================
   PORTFOLIO — interacción mínima (el contenido ya viene en el HTML)
   - Encabezado sólido al bajar del hero.
   - Menú móvil accesible (Esc, foco, bloqueo de scroll).
   - Sección activa en la navegación (scrollspy).
   - Etapa activa en la línea de evolución profesional.
   - Revelado suave al entrar en pantalla (respeta reduced motion).
   Sin dependencias. Si falla, la página se lee completa igual.
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  /* Encabezado */
  const top = $(".top"), hero = $("#inicio");
  if (hasIO && top && hero) {
    new IntersectionObserver(([e]) => top.classList.toggle("is-solid", !e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" }).observe(hero);
  } else if (top) top.classList.add("is-solid");

  /* Menú móvil */
  const btn = $(".top__menu"), sheet = $("#sheet");
  const menuIcon = btn ? btn.innerHTML : "";
  const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  const setMenu = (open) => {
    sheet.hidden = !open;
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    btn.innerHTML = open ? closeIcon : menuIcon;
    document.body.classList.toggle("is-locked", open);
    top.classList.toggle("is-solid", open || top.classList.contains("is-solid"));
    if (open) { const first = $("a", sheet); if (first) first.focus(); }
  };
  if (btn && sheet) {
    btn.addEventListener("click", () => setMenu(sheet.hidden));
    sheet.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) { setMenu(false); btn.focus(); } });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", (m) => { if (m.matches && !sheet.hidden) setMenu(false); });
  }

  if (!hasIO) return;

  /* Sección activa */
  const links = $$("[data-spy]");
  const sections = [...new Set(links.map((a) => a.dataset.spy))].map((id) => document.getElementById(id)).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => (a.dataset.spy === en.target.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* Etapa activa de la evolución profesional */
  const chain = $$(".chain li");
  const STAGE = { "Operativa y liderazgo": ["Experiencia operativa", "Liderazgo"] };
  if (chain.length) {
    const jio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const st = en.target.dataset.stages;
        const on = STAGE[st] || [st];
        chain.forEach((li) => li.classList.toggle("is-on", on.includes(li.dataset.stage)));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".job").forEach((j) => jio.observe(j));
  }

  /* Borde luminoso del contacto: girar solo cuando se ve */
  const talk = $(".talk");
  if (talk) new IntersectionObserver(([e]) => talk.classList.toggle("is-visible", e.isIntersecting)).observe(talk);

  /* Revelado al entrar en pantalla */
  if (reduced) return;
  const rio = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  // La clase se agrega recién acá: si algo falla antes, el contenido queda visible.
  document.documentElement.classList.add("rv-on");
  $$("[data-rv]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
    rio.observe(el);
  });
})();
