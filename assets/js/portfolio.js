/* ==========================================================================
   PORTFOLIO — interacción mínima. El contenido completo ya está en el HTML:
   si este archivo no carga o falla, la página se lee y se navega igual.
   - Menú móvil accesible (Esc, foco, bloqueo de scroll).
   - Sección activa en la navegación.
   - Revelado suave al hacer scroll (respeta prefers-reduced-motion).
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /* Menú móvil */
  const btn = $(".top__menu"), sheet = $("#sheet");
  if (btn && sheet) {
    const openIcon = btn.innerHTML;
    const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    const setMenu = (open) => {
      sheet.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      btn.innerHTML = open ? closeIcon : openIcon;
      document.body.classList.toggle("is-locked", open);
      if (open) { const first = $("a", sheet); if (first) first.focus(); }
    };
    btn.addEventListener("click", () => setMenu(sheet.hidden));
    sheet.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !sheet.hidden) { setMenu(false); btn.focus(); } });
    window.matchMedia("(min-width: 1200px)").addEventListener("change", (m) => { if (m.matches && !sheet.hidden) setMenu(false); });
  }

  if (!("IntersectionObserver" in window)) return;

  /* Sección activa en la navegación */
  const links = $$("[data-spy]");
  const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => (a.dataset.spy === en.target.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  }), { rootMargin: "-45% 0px -50% 0px" });
  [...new Set(links.map((a) => a.dataset.spy))].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* Revelado al entrar en pantalla */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  document.documentElement.classList.add("rv-on"); // recién ahora: si algo falló antes, todo queda visible
  $$("[data-rv]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
    io.observe(el);
  });
})();
