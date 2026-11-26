/* Se carga en <head>: aplica el "modo lectura" (claro) antes de pintar, si el visitante lo eligió. */
(function () {
  try { if (localStorage.getItem("wf.theme") === "light") document.documentElement.setAttribute("data-theme", "light"); } catch (e) {}
})();
