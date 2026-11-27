/* ==========================================================================
   NÚCLEO DE LA PLATAFORMA
   Utilidades, íconos, encabezado/pie, búsqueda global, progreso, código.
   Sin dependencias externas. Funciona también abriendo los archivos locales.
   ========================================================================== */
(function () {
  "use strict";
  const WF = (window.WF = window.WF || {});
  const T = WF.taxonomia;

  /* ---------- Utilidades ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = (s) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const params = () => new URLSearchParams(location.search);
  const isExternal = (u) => /^https?:\/\//.test(u || "");
  const fmtDate = (d, opts) => {
    if (!d) return "";
    const date = new Date(d + (d.length === 10 ? "T12:00:00" : ""));
    if (isNaN(date)) return d;
    return date.toLocaleDateString("es-AR", opts || { day: "numeric", month: "short", year: "numeric" });
  };
  const fmtBytes = (b) => {
    if (b == null) return "—";
    if (b < 1024) return b + " B";
    if (b < 1048576) return (b / 1024).toFixed(1).replace(".", ",") + " KB";
    return (b / 1048576).toFixed(1).replace(".", ",") + " MB";
  };
  const hash = (s) => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

  /* ---------- Íconos (trazos, 24×24) ---------- */
  const P = {
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    sparkles: '<path d="M9.94 14.5A2 2 0 0 0 8.5 13.06L2.36 11.5a.5.5 0 0 1 0-.96L8.5 8.94A2 2 0 0 0 9.94 7.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 7.5A2 2 0 0 0 15.5 8.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 13.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    puzzle: '<path d="M19.44 7.85c-.05.32.06.65.29.88l1.57 1.57a2.4 2.4 0 0 1 0 3.41l-1.61 1.61a.98.98 0 0 1-.84.28c-.47-.07-.8-.48-.97-.93a2.5 2.5 0 1 0-3.21 3.21c.45.17.86.5.93.97a.98.98 0 0 1-.28.84l-1.61 1.61a2.4 2.4 0 0 1-3.41 0l-1.57-1.57a1.03 1.03 0 0 0-.88-.29c-.49.07-.84.5-1.02.97a2.5 2.5 0 1 1-3.24-3.24c.46-.18.9-.53.97-1.02a1.03 1.03 0 0 0-.29-.88l-1.57-1.57a2.4 2.4 0 0 1 0-3.41L4.23 8.77c.24-.24.58-.35.92-.3.51.08.88.53 1.07 1.01a2.5 2.5 0 1 0 3.26-3.26c-.48-.2-.93-.56-1.01-1.07-.05-.34.06-.68.3-.92l1.53-1.53a2.4 2.4 0 0 1 3.41 0l1.57 1.57c.23.23.56.34.88.29.49-.07.84-.5 1.02-.97a2.5 2.5 0 1 1 3.24 3.24c-.46.18-.9.53-.97 1.02Z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
    bookOpen: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    xCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    auto: '<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    grad: '<path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    pen: '<path d="M12 20h9"/><path d="M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.85z"/>',
    home: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    play: '<path d="m7 4 13 8-13 8z" fill="currentColor"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.83 0L6 21"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>',
    trending: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    printer: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
    mapPin: '<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    send: '<path d="M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.03.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
    whatsapp: '<path d="M3 21l1.65-4.9A9 9 0 1 1 7.9 19.4z"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.8 5.4a2 2 0 0 1-1.28 1.28l-5.4 1.8 1.8-5.4a2 2 0 0 1 1.28-1.28z"/>',
  };
  const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${P[name] || P.file}</svg>`;

  /* ---------- Componentes pequeños ---------- */
  const areaName = (k) => (T.areas[k] ? T.areas[k].nombre : k);
  const areaIcon = (k) => (T.areas[k] ? T.areas[k].icono : "file");
  const level = (k) => {
    const n = T.niveles[k];
    if (!n) return "";
    return `<span class="level" title="Nivel ${esc(n.nombre)}"><span class="level__dots" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= n.valor ? "on" : ""}"></i>`).join("")}</span>${esc(n.nombre)}</span>`;
  };
  const status = (k) => `<span class="status status--${esc(k)}">${esc(T.estados[k] || k)}</span>`;
  const tag = (t, cls = "") => `<span class="tag ${cls}">${esc(t)}</span>`;
  const tags = (arr, cls) => `<div class="tags">${(arr || []).map((t) => tag(t, cls)).join("")}</div>`;
  const extAttrs = (u) => (isExternal(u) ? ' target="_blank" rel="noopener noreferrer"' : "");

  function fileInfo(path) { return (WF.descargas || {})[path] || null; }

  /** Botón de descarga que nunca rompe: si el archivo no existe muestra "Próximamente". */
  function downloadBtn(path, { label = "Descargar", cls = "btn", small = false } = {}) {
    const f = path && fileInfo(path);
    const size = small ? " btn--sm" : "";
    if (!f) return `<span class="${cls}${size}" aria-disabled="true" title="Este archivo todavía no está disponible">${icon("clock")} Próximamente</span>`;
    return `<a class="${cls}${size}" href="${esc(path)}" download="${esc(f.nombre)}" aria-label="${esc(label)} ${esc(f.nombre)} (${esc(f.tipo)}, ${fmtBytes(f.bytes)})">${icon("download")} ${esc(label)}</a>`;
  }
  function openBtn(url, { label = "Abrir", cls = "btn", small = false } = {}) {
    const size = small ? " btn--sm" : "";
    if (!url) return `<span class="${cls}${size}" aria-disabled="true">${icon("clock")} Próximamente</span>`;
    return `<a class="${cls}${size}" href="${esc(url)}"${extAttrs(url)}>${icon(isExternal(url) ? "external" : "eye")} ${esc(label)}</a>`;
  }

  /** Portada generativa (sin imágenes externas): patrón determinístico por semilla. */
  function cover(seed, label, iconName) {
    const h = hash(seed);
    const variant = h % 4;
    let shapes = "";
    const W = 400, H = 180;
    const rnd = (i) => ((h >> (i % 24)) ^ (i * 2654435761)) >>> 0;
    if (variant === 0) { // grilla de puntos con resaltes
      for (let x = 0; x < 20; x++) for (let y = 0; y < 9; y++) {
        const on = rnd(x * 9 + y) % 11 === 0;
        shapes += `<circle cx="${10 + x * 20}" cy="${10 + y * 20}" r="${on ? 4 : 1.6}" fill="${on ? "var(--accent)" : "var(--line-strong)"}" opacity="${on ? 0.8 : 1}"/>`;
      }
    } else if (variant === 1) { // barras tipo código
      for (let y = 0; y < 9; y++) {
        const indent = (rnd(y) % 4) * 24, w = 60 + (rnd(y + 3) % 200);
        shapes += `<rect x="${24 + indent}" y="${18 + y * 18}" width="${w}" height="7" rx="3.5" fill="${y % 3 === 1 ? "var(--accent)" : "var(--line-strong)"}" opacity="${y % 3 === 1 ? 0.55 : 0.9}"/>`;
      }
    } else if (variant === 2) { // nodos conectados
      const pts = Array.from({ length: 9 }, (_, i) => [30 + (rnd(i) % 340), 20 + (rnd(i + 11) % 140)]);
      pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; shapes += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="var(--line-strong)" stroke-width="1.5"/>`; });
      pts.forEach((p, i) => { shapes += `<circle cx="${p[0]}" cy="${p[1]}" r="${i % 3 === 0 ? 7 : 4}" fill="${i % 3 === 0 ? "var(--accent)" : "var(--surface)"}" stroke="var(--ink-3)" stroke-width="1.5"/>`; });
    } else { // bloques
      for (let i = 0; i < 14; i++) {
        const x = (rnd(i) % 18) * 22, y = (rnd(i + 5) % 7) * 24, s = 18 + (rnd(i + 9) % 3) * 22;
        shapes += `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="4" fill="${i % 4 === 0 ? "var(--accent)" : "var(--surface-3)"}" opacity="${i % 4 === 0 ? 0.35 : 0.9}"/>`;
      }
    }
    return `<div class="cover"><svg class="cover__art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${shapes}</svg>${label ? `<span class="cover__label">${iconName ? icon(iconName) : ""}${esc(label)}</span>` : ""}</div>`;
  }

  /* ---------- Resaltado de código (liviano) ---------- */
  const KW = {
    python: "and as assert break class continue def del elif else except False finally for from global if import in is lambda None not or pass raise return True try while with yield print input range len int float str list dict",
    c: "auto break case char const continue default do double else enum extern float for goto if int long register return short signed sizeof static struct switch typedef union unsigned void volatile while include define printf scanf NULL",
    cpp: "auto bool break case catch char class const continue default delete do double else enum false float for if include int long namespace new private protected public return short sizeof static string struct switch template this throw true try using vector virtual void while cout cin endl std const unsigned HIGH LOW OUTPUT INPUT pinMode digitalWrite delay setup loop",
    java: "abstract boolean break byte case catch char class continue default do double else extends final finally float for if implements import int interface long new null package private protected public return short static String super switch this throw throws try void while true false System",
    javascript: "async await break case catch class const continue default delete do else export extends false finally for function if import in instanceof let new null return switch this throw true try typeof undefined var void while of document console window",
    vbnet: "AddHandler And As Boolean ByRef ByVal Case Catch Class Const Dim Do Double Each Else ElseIf End Enum Exit False For Function Get Handles If Imports In Integer Is Loop Me Module New Next Nothing Not Of Or Private Property Public ReadOnly Return Select Set Shared String Sub Then To True Try Until While With Overrides Console",
    sql: "select from where and or not insert into values update set delete create table primary key foreign references integer text real null join on group by order having as count sum avg min max distinct limit desc asc inner left right check between unique case when then else end round is",
    css: "",
    html: "",
  };
  const kwSets = {};
  function highlight(code, lang) {
    lang = { ino: "cpp", js: "javascript", py: "python", vb: "vbnet" }[lang] || lang;
    if (!KW.hasOwnProperty(lang)) return esc(code);
    const ci = lang === "sql" || lang === "vbnet";
    if (!kwSets[lang]) kwSets[lang] = new Set(KW[lang].split(" ").map((w) => (ci ? w.toLowerCase() : w)));
    const set = kwSets[lang];
    let re;
    if (lang === "html") re = /(<!--[\s\S]*?-->)|("[^"]*"|'[^']*')|(<\/?[a-zA-Z][\w-]*|\/?>)|([\s\S])/g;
    else if (lang === "css") re = /(\/\*[\s\S]*?\*\/)|("[^"]*"|'[^']*')|(-?\b\d+(?:\.\d+)?(?:px|rem|em|%|fr|s|ms|vh|vw)?\b|#[0-9a-fA-F]{3,8}\b)|([a-z-]+(?=\s*:))|([\s\S])/g;
    else {
      const comment = { python: "#[^\\n]*", sql: "--[^\\n]*", vbnet: "'[^\\n]*" }[lang] || "\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/";
      const str = lang === "python" ? '"""[\\s\\S]*?"""|f?"(?:\\\\.|[^"\\\\\\n])*"|f?\'(?:\\\\.|[^\'\\\\\\n])*\'' : lang === "vbnet" ? '\\$?"[^"\\n]*"' : lang === "javascript" ? '`[\\s\\S]*?`|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'' : '"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'';
      re = new RegExp(`(${comment})|(${str})|(\\b\\d+(?:\\.\\d+)?\\b)|(#\\w+|[A-Za-z_]\\w*)|([\\s\\S])`, "g");
    }
    let out = "", m;
    while ((m = re.exec(code))) {
      const [all, c, s, n, w] = m;
      if (c) out += `<span class="tok-c">${esc(c)}</span>`;
      else if (s) out += `<span class="tok-s">${esc(s)}</span>`;
      else if (lang === "html" && n) out += `<span class="tok-t">${esc(n)}</span>`;
      else if (n) out += `<span class="tok-n">${esc(n)}</span>`;
      else if (w && lang === "css") out += `<span class="tok-f">${esc(w)}</span>`;
      else if (w) {
        const isKw = set.has(ci ? w.toLowerCase() : w) || w[0] === "#";
        const isFn = !isKw && code[re.lastIndex] === "(";
        out += isKw ? `<span class="tok-k">${esc(w)}</span>` : isFn ? `<span class="tok-f">${esc(w)}</span>` : esc(w);
      } else out += esc(all);
    }
    return out;
  }

  /** Bloque de código a partir de un archivo de descargas/ (misma fuente que la descarga). */
  function codeBlock(path, opts = {}) {
    const f = fileInfo(path);
    if (!f || f.contenido == null) return `<div class="notice">${icon("info")}<p>El archivo <code>${esc(path)}</code> no está disponible todavía.</p></div>`;
    const id = "code-" + hash(path);
    return `<figure class="code" ${opts.id ? `id="${esc(opts.id)}"` : ""}>
      <figcaption class="code__bar"><span>${esc(f.nombre)} · ${fmtBytes(f.bytes)}</span>
        <span class="code__actions">
          <button class="code__btn" type="button" data-copy="${id}">${icon("copy")}<span>Copiar</span></button>
          <a class="code__btn" href="${esc(path)}" download="${esc(f.nombre)}">${icon("download")}<span>Descargar</span></a>
        </span></figcaption>
      <pre><code id="${id}">${highlight(f.contenido.replace(/\s+$/, ""), f.lenguaje)}</code></pre></figure>`;
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status");
    t.innerHTML = icon("check") + esc(msg);
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); toast("Copiado al portapapeles"); }
    catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("Copiado al portapapeles"); } catch {} ta.remove(); }
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (b) { const el = document.getElementById(b.dataset.copy); if (el) copyText(el.innerText); }
  });

  /* ---------- Progreso (preparado para cuentas de usuario) ---------- */
  // Hoy el adaptador usa localStorage. Para sincronizar con cuentas, reemplazar
  // con WF.ProgressStore.setAdapter({ load(), save(data) }) apuntando a una API.
  WF.ProgressStore = (function () {
    const KEY = "wf.progress.v1";
    let adapter = {
      load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
      save(data) { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} },
    };
    let data = adapter.load();
    const emit = () => document.dispatchEvent(new CustomEvent("wf:progress"));
    return {
      setAdapter(a) { adapter = a; data = a.load() || {}; emit(); },
      done(ruta) { return new Set(data[ruta] || []); },
      isDone(ruta, i) { return (data[ruta] || []).includes(i); },
      toggle(ruta, i, value) {
        const s = new Set(data[ruta] || []);
        value ? s.add(i) : s.delete(i);
        data[ruta] = [...s].sort((a, b) => a - b);
        adapter.save(data); emit();
      },
      percent(ruta, total) { return total ? Math.round(((data[ruta] || []).length / total) * 100) : 0; },
      reset(ruta) { delete data[ruta]; adapter.save(data); emit(); },
    };
  })();

  /* ---------- Mapa de páginas: 4 grandes áreas ---------- */
  // area: perfil | aprender | proyectos | recursos   ·   mode: portfolio | aula
  const PAGES = {
    inicio: { t: "Inicio", href: "index.html", icon: "home" },
    portfolio: { t: "Portfolio profesional", href: "portfolio.html", icon: "briefcase", d: "Trayectoria, experiencia y proyectos", area: "perfil" },
    blog: { t: "Blog", href: "blog.html", icon: "pen", d: "Ideas y experiencias docentes", area: "perfil" },
    articulo: { t: "Artículo", parent: "blog" },
    contacto: { t: "Contacto", href: "contacto.html", icon: "mail", d: "Propuestas y consultas", area: "perfil" },
    alumnos: { t: "Recursos para alumnos", href: "alumnos.html", icon: "grad", d: "Empezá por acá, paso a paso", area: "aprender", mode: "aula" },
    rutas: { t: "Rutas de aprendizaje", href: "rutas.html", icon: "route", d: "Niveles con tu progreso", area: "aprender", mode: "aula" },
    ruta: { t: "Ruta", parent: "rutas" },
    materiales: { t: "Materiales educativos", href: "materiales.html", icon: "bookOpen", d: "Apuntes, guías y ejercicios", area: "aprender", mode: "aula" },
    programacion: { t: "Programación", href: "programacion.html", icon: "code", d: "9 lenguajes por nivel", area: "aprender", mode: "aula" },
    lenguaje: { t: "Lenguaje", parent: "programacion" },
    ia: { t: "IA y Educación", href: "ia.html", icon: "sparkles", d: "Uso responsable y prompts", area: "aprender", mode: "aula" },
    tecnologia: { t: "Tecnología", href: "tecnologia.html", icon: "cpu", d: "Hardware, redes, seguridad…", area: "aprender", mode: "aula" },
    proyectos: { t: "Proyectos", href: "proyectos.html", icon: "layers", d: "Profesionales y educativos", area: "proyectos" },
    proyecto: { t: "Proyecto", parent: "proyectos" },
    "proyectos-alumnos": { t: "Proyectos de alumnos", href: "proyectos-alumnos.html", icon: "users", d: "Galería con autorización", area: "proyectos" },
    recursos: { t: "Descargas", href: "recursos.html", icon: "download", d: "Archivos con tamaño y fecha", area: "recursos", mode: "aula" },
    buscar: { t: "Buscar", href: "buscar.html", icon: "search", d: "Todo el contenido con filtros", area: "recursos" },
    privacidad: { t: "Privacidad", href: "privacidad.html", icon: "lock" },
  };
  const AREAS = [
    { id: "perfil", t: "Perfil", d: "Mi trayectoria profesional y docente", items: [["portfolio"], ["blog"], ["contacto"]] },
    { id: "aprender", t: "Aprender", d: "Materiales, recursos y rutas", aula: true, items: [["alumnos"], ["rutas"], ["materiales"], ["programacion"], ["ia"], ["tecnologia"]] },
    { id: "proyectos", t: "Proyectos", d: "Propios y educativos", items: [["proyectos", "Todos los proyectos", "proyectos.html"], ["proyectos", "Proyectos profesionales", "proyectos.html?tipo=profesional", "briefcase", "Lo que desarrollo"], ["proyectos", "Proyectos educativos", "proyectos.html?tipo=educativo", "grad", "Para hacer en clase"], ["proyectos-alumnos"]] },
    { id: "recursos", t: "Recursos", d: "Herramientas, archivos, código y enlaces", aula: true, items: [["recursos"], ["recursos", "Código descargable", "recursos.html?g=Programación", "code", "Ejemplos por lenguaje"], ["recursos", "Herramientas", "recursos.html#h-tl", "tool", "Software recomendado"], ["materiales", "Videos y enlaces", "materiales.html?formato=enlace", "link", "Sitios recomendados"], ["buscar"]] },
  ];
  const current = document.body.dataset.page || "";
  const currentRoot = (PAGES[current] && PAGES[current].parent) || current;
  const pageInfo = PAGES[currentRoot] || {};
  const MODE = pageInfo.mode || (current === "inicio" ? "" : "portfolio");
  if (MODE === "aula") document.body.setAttribute("data-mode", "aula");

  function modeChip() {
    if (!MODE) return "";
    return MODE === "aula" ? `<span class="mode-chip" title="Contenido para aprender">Aula abierta · para aprender</span>` : `<span class="mode-chip" title="Trabajo profesional">Portfolio · trabajo profesional</span>`;
  }
  function breadcrumb(items) {
    const all = [{ t: "Inicio", href: "index.html" }, ...items];
    return `<div class="crumb-row"><nav class="breadcrumb" aria-label="Estás en"><ol>${all.map((it, i) => i === all.length - 1 ? `<li><span aria-current="page">${esc(it.t)}</span></li>` : `<li><a href="${esc(it.href)}">${esc(it.t)}</a></li>`).join("")}</ol></nav>${modeChip()}</div>`;
  }
  function autoCrumb(finalTitle) {
    const p = PAGES[current];
    if (!p || current === "inicio") return "";
    const items = [];
    const rootP = p.parent ? PAGES[p.parent] : p;
    const area = AREAS.find((a) => a.id === rootP.area);
    if (area) items.push({ t: area.t, href: PAGES[area.items[0][0]].href });
    if (p.parent && (!area || PAGES[area.items[0][0]] !== rootP)) items.push({ t: rootP.t, href: rootP.href });
    items.push({ t: finalTitle || p.t, href: p.href || "#" });
    return breadcrumb(items);
  }

  /* ---------- Encabezado ---------- */
  function areaLinks(a) {
    return a.items.map(([k, t, href, ic, d]) => {
      const p = PAGES[k];
      const h = href || p.href;
      const cur = !href && currentRoot === k ? ' aria-current="page"' : "";
      return { h, t: t || p.t, ic: ic || p.icon, d: d || p.d, cur };
    });
  }
  function renderHeader() {
    const S = WF.sitio;
    const host = $("#site-header");
    if (!host) return;
    const activeArea = pageInfo.area;
    host.outerHTML = `
<header class="site-header" id="top">
  <div class="container">
    <div class="site-header__inner glass">
      <a class="brand" href="index.html" aria-label="${esc(S.nombre)} — Inicio">
        <span class="brand__text"><span class="brand__name">${esc(S.nombreCorto)}</span><span class="brand__role">${esc(S.rol)}</span></span>
      </a>
      <nav class="nav" aria-label="Principal">
        <ul class="nav__list">
          ${AREAS.map((a, i) => `<li class="nav__item">
            <button class="nav__link${activeArea === a.id ? " is-active" : ""}" type="button" aria-expanded="false" aria-controls="mega-${a.id}" data-mega="${a.id}">${a.t} ${icon("chevron")}</button>
            <div class="mega${a.aula ? " mega--aula" : ""}${i === AREAS.length - 1 ? " mega--right" : ""}" id="mega-${a.id}" hidden>
              <div class="mega__head"><strong>${a.t}</strong><span>${a.d}</span></div>
              ${areaLinks(a).map((l) => `<a href="${l.h}"${l.cur}><span class="mega__icon">${icon(l.ic)}</span><span><strong>${esc(l.t)}</strong><small>${esc(l.d || "")}</small></span></a>`).join("")}
            </div>
          </li>`).join("")}
        </ul>
      </nav>
      <div class="header-actions">
        <button class="search-trigger" type="button" data-search-open aria-label="Buscar en el sitio (Ctrl + K)">${icon("search")}<span class="search-trigger__label">Buscar…</span><kbd>Ctrl K</kbd></button>
        <button class="icon-btn" type="button" data-read-toggle aria-pressed="false">${icon("book")}</button>
        <a class="btn btn--primary btn--sm header-cta" href="contacto.html">Contacto</a>
        <button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menú">${icon("menu")}</button>
      </div>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" hidden>
    <ul><li><a href="index.html"${current === "inicio" ? ' aria-current="page"' : ""}>${icon("home")}Inicio</a></li></ul>
    ${AREAS.map((a) => `<div class="mobile-nav__group"><h2>${a.t} <span>${a.d}</span></h2><ul>${areaLinks(a).map((l) => `<li><a href="${l.h}"${l.cur}>${icon(l.ic)}${esc(l.t)}</a></li>`).join("")}</ul></div>`).join("")}
    <a class="btn btn--primary btn--lg" href="contacto.html">${icon("mail")} Contacto</a>
  </div>
</header>`;

    // Menús desplegables
    const buttons = $$("[data-mega]");
    const close = (except) => buttons.forEach((b) => { if (b !== except) { b.setAttribute("aria-expanded", "false"); $("#mega-" + b.dataset.mega).hidden = true; } });
    buttons.forEach((b) => b.addEventListener("click", (e) => {
      e.stopPropagation();
      const m = $("#mega-" + b.dataset.mega), open = m.hidden;
      close(b); m.hidden = !open; b.setAttribute("aria-expanded", open);
    }));
    document.addEventListener("click", (e) => { if (!e.target.closest(".mega")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const open = buttons.find((b) => b.getAttribute("aria-expanded") === "true"); close(); if (open) open.focus(); } });

    // Menú móvil
    const mt = $(".menu-toggle"), mn = $("#mobile-nav");
    mt.addEventListener("click", () => {
      const open = mn.hidden;
      mn.hidden = !open; mt.setAttribute("aria-expanded", open);
      mt.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      mt.innerHTML = icon(open ? "x" : "menu");
      document.body.classList.toggle("nav-open", open);
    });
    syncReadUI();
  }

  /* ---------- Modo lectura (claro) ---------- */
  function isRead() { return document.documentElement.getAttribute("data-theme") === "light"; }
  function setRead(on) {
    try { on ? localStorage.setItem("wf.theme", "light") : localStorage.removeItem("wf.theme"); } catch {}
    if (on) document.documentElement.setAttribute("data-theme", "light"); else document.documentElement.removeAttribute("data-theme");
    syncReadUI();
    document.dispatchEvent(new CustomEvent("wf:theme"));
  }
  function syncReadUI() {
    const on = isRead();
    $$("[data-read-toggle]").forEach((b) => {
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", on ? "Desactivar modo lectura (volver al modo oscuro)" : "Activar modo lectura (fondo claro, ideal para leer o proyectar)");
      b.title = on ? "Volver al modo oscuro" : "Modo lectura: fondo claro";
      if (b.classList.contains("read-toggle")) b.innerHTML = `${icon(on ? "moon" : "book")}${on ? "Modo oscuro" : "Modo lectura"}`;
      else b.innerHTML = icon(on ? "moon" : "book");
    });
  }
  document.addEventListener("click", (e) => { if (e.target.closest("[data-read-toggle]")) setRead(!isRead()); });

  /* ---------- Pie de página ---------- */
  function renderFooter() {
    const S = WF.sitio, host = $("#site-footer");
    if (!host) return;
    const social = [
      S.redes.github && `<a class="icon-btn" href="${esc(S.redes.github)}" target="_blank" rel="noopener" aria-label="GitHub">${icon("github")}</a>`,
      S.redes.linkedin && `<a class="icon-btn" href="${esc(S.redes.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>`,
      S.redes.youtube && `<a class="icon-btn" href="${esc(S.redes.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${icon("youtube")}</a>`,
      S.contacto.email && `<a class="icon-btn" href="mailto:${esc(S.contacto.email)}" aria-label="Correo">${icon("mail")}</a>`,
    ].filter(Boolean).join("");
    host.outerHTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="index.html"><span class="brand__text"><span class="brand__name">${esc(S.nombre)}</span><span class="brand__role">${esc(S.rol)}</span></span></a>
        <p>${esc(S.lema)} Portfolio docente y biblioteca abierta de informática, programación y tecnología.</p>
        <div class="social">${social}</div>
      </div>
      ${AREAS.map((a) => `<div><h2>${a.t}</h2><ul>${areaLinks(a).map((l) => `<li><a href="${l.h}">${esc(l.t)}</a></li>`).join("")}</ul></div>`).join("")}
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(S.nombre)} · Materiales CC BY-NC-SA 4.0 · <a href="privacidad.html">Privacidad</a></span>
      <button class="read-toggle" type="button" data-read-toggle aria-pressed="false"></button>
      <span>Actualizado: ${fmtDate(S.actualizado)}</span>
    </div>
  </div>
</footer>`;
    syncReadUI();
  }

  /* ---------- Índice de búsqueda global (con metadatos para filtrar) ---------- */
  let INDEX = null;
  function buildIndex() {
    if (INDEX) return INDEX;
    const I = [];
    const add = (o) => I.push({ ...o, _t: norm(o.titulo), _k: norm((o.tags || []).join(" ")), _x: norm(o.texto) });
    Object.entries(PAGES).filter(([, p]) => p.href).forEach(([k, p]) => add({ tipo: "Sección", icono: p.icon, titulo: p.t, texto: p.d || "", url: p.href, tags: [k] }));
    (WF.proyectos || []).forEach((p) => add({ tipo: "Proyecto", icono: areaIcon(p.area), titulo: p.titulo, texto: p.resumen, url: `proyecto.html?id=${p.id}`, tags: [areaName(p.area), ...p.tecnologias, ...p.conceptos], area: p.area, dificultad: p.nivel, dest: p.destinatario, tecs: p.tecnologias }));
    (WF.materiales || []).forEach((m) => add({ tipo: m.tipo === "video" ? "Video" : m.tipo === "tutorial" ? "Tutorial" : m.tipo === "codigo" ? "Código" : "Material", icono: areaIcon(m.tema), titulo: m.titulo, texto: m.descripcion, url: m.abrir || `materiales.html?q=${encodeURIComponent(m.titulo)}`, tags: [areaName(m.tema), T.tipos[m.tipo], T.formatos[m.formato], ...(m.etiquetas || [])], area: m.tema, dificultad: m.dificultad, dest: m.nivel, tecs: (m.etiquetas || []).filter((e) => /^(python|sql|html|css|javascript|java|c|c\+\+|arduino|vb\.net)$/i.test(e)).map((e) => e.replace(/^./, (c) => c.toUpperCase())) }));
    (WF.lenguajes || []).forEach((l) => {
      add({ tipo: "Programación", icono: "code", titulo: l.nombre, texto: l.descripcion, url: `lenguaje.html?l=${l.id}`, tags: ["programacion", "lenguaje", ...l.usos], area: "programacion", tecs: [l.nombre] });
      l.conceptos.forEach((c) => add({ tipo: "Tutorial", icono: "code", titulo: `${l.nombre}: ${c.titulo}`, texto: c.texto, url: `lenguaje.html?l=${l.id}#conceptos`, tags: [l.nombre, "concepto"], area: "programacion", dificultad: c.nivel, tecs: [l.nombre] }));
      l.ejercicios.forEach((x) => add({ tipo: "Ejercicio", icono: "target", titulo: `${l.nombre}: ${x.titulo}`, texto: x.enunciado, url: `lenguaje.html?l=${l.id}#ejercicios`, tags: [l.nombre, "ejercicio"], area: "programacion", dificultad: x.nivel, tecs: [l.nombre] }));
    });
    (WF.rutas || []).forEach((r) => add({ tipo: "Ruta", icono: "route", titulo: r.titulo, texto: r.descripcion, url: `ruta.html?id=${r.id}`, tags: [areaName(r.area), ...r.niveles.map((n) => n.titulo)], area: r.area, dificultad: r.nivel }));
    (WF.blog || []).forEach((a) => add({ tipo: "Artículo", icono: "pen", titulo: a.titulo, texto: a.resumen, url: `articulo.html?id=${a.id}`, tags: [T.blog[a.categoria]] }));
    (WF.alumnosProyectos || []).forEach((a) => add({ tipo: "Proyecto", icono: "users", titulo: a.titulo, texto: a.solucion, url: `proyectos-alumnos.html#${a.id}`, tags: a.tecnologias, area: a.area, tecs: a.tecnologias }));
    (T.alumnos || []).forEach((c) => add({ tipo: "Sección", icono: "grad", titulo: `${c.emoji} ${c.nombre} (alumnos)`, texto: "Recursos para alumnos", url: `alumnos.html?cat=${c.id}`, tags: [c.nombre], area: c.area || undefined }));
    const SE = WF.secciones || {};
    (SE.iaTemas || []).forEach((t) => add({ tipo: "Tutorial", icono: "sparkles", titulo: t.titulo, texto: t.texto, url: `ia.html#tema-${t.id}`, tags: ["ia", "inteligencia artificial"], area: "ia" }));
    (SE.tecnologiaAreas || []).forEach((t) => add({ tipo: "Sección", icono: t.icono, titulo: t.titulo, texto: t.texto, url: `tecnologia.html#${t.id}`, tags: t.temas, area: t.id }));
    (SE.herramientas || []).forEach((h) => add({ tipo: "Recurso", icono: "tool", titulo: h.nombre, texto: h.texto, url: h.url, tags: ["herramienta"], area: h.area }));
    Object.values(WF.descargas || {}).filter((f) => !f.ruta.startsWith("descargas/apuntes/")).forEach((f) => add({ tipo: "Código", icono: "download", titulo: f.nombre, texto: `Archivo ${f.tipo} · ${f.ruta.split("/").slice(1, -1).join(" / ")}`, url: `recursos.html?q=${encodeURIComponent(f.nombre)}`, tags: [f.ext, f.lenguaje || ""] }));
    return (INDEX = I);
  }
  WF.buildIndex = buildIndex;

  function search(q, limit = 60) {
    const terms = norm(q).split(/\s+/).filter((t) => t.length > 0);
    if (!terms.length) return [];
    const syn = (WF.taxonomia.sinonimos || {});
    const expanded = terms.map((t) => [t, ...(syn[t] || []).map(norm)]);
    const scoreTerm = (it, alts) => {
      let best = 0;
      for (const a of alts) {
        const w = a === alts[0] ? 1 : 0.6;
        const re = new RegExp("(^|[^a-z0-9])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        const short = a.length <= 3;
        const has = (f) => (short ? new RegExp("(^|[^a-z0-9])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z0-9])").test(f) : f.includes(a));
        let s = 0;
        if (it._t === a) s = 30;
        else if (has(it._t)) s = re.test(it._t) ? 14 : 8;
        else if (has(it._k)) s = re.test(it._k) ? 7 : 4;
        else if (has(it._x)) s = 2;
        best = Math.max(best, s * w);
      }
      return best;
    };
    const run = (mode) => buildIndex().map((it) => {
      const scores = expanded.map((alts) => scoreTerm(it, alts));
      if (mode === "and" && scores.some((s) => s === 0)) return null;
      const total = scores.reduce((a, b) => a + b, 0);
      return total > 0 ? { it, score: total + (it.tipo === "Sección" ? 1 : 0) } : null;
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, limit).map((r) => r.it);
    const res = run("and");
    return res.length ? res : run("or");
  }
  function markTerms(text, q) {
    const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
    const n = norm(text);
    const marks = new Array(text.length).fill(false);
    terms.forEach((t) => { let i = n.indexOf(t); while (i !== -1) { for (let j = i; j < i + t.length; j++) marks[j] = true; i = n.indexOf(t, i + 1); } });
    let out = "", open = false;
    for (let i = 0; i < text.length; i++) {
      if (marks[i] && !open) { out += "<mark>"; open = true; }
      if (!marks[i] && open) { out += "</mark>"; open = false; }
      out += esc(text[i]);
    }
    return out + (open ? "</mark>" : "");
  }
  WF.search = search;
  WF.markTerms = markTerms;

  /* ---------- Modal de búsqueda ---------- */
  const SUGGEST = ["Python", "SQL", "redes", "IA", "Word", "programación", "seguridad", "hardware", "HTML", "Excel"];
  let modal = null, lastFocus = null;
  function openSearch(initial = "") {
    if (modal) return;
    lastFocus = document.activeElement;
    modal = document.createElement("div");
    modal.className = "search-modal";
    modal.innerHTML = `
<div class="search-box" role="dialog" aria-modal="true" aria-label="Buscar en la plataforma">
  <div class="search-box__input">${icon("search")}
    <input type="search" placeholder="Buscar proyectos, materiales, lenguajes…" aria-label="Buscar" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="search-results" aria-autocomplete="list">
    <button class="icon-btn" type="button" data-close aria-label="Cerrar búsqueda">${icon("x")}</button>
  </div>
  <div class="search-box__results" id="search-results" role="listbox"></div>
  <div class="search-box__foot"><span><kbd>↑</kbd> <kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span><span><kbd>Esc</kbd> cerrar</span><a href="buscar.html" data-all>Ver todos los resultados →</a></div>
</div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
    const input = $("input", modal), results = $("#search-results", modal), all = $("[data-all]", modal);
    let sel = 0, items = [];
    const draw = () => {
      const q = input.value.trim();
      all.href = "buscar.html" + (q ? "?q=" + encodeURIComponent(q) : "");
      if (!q) {
        items = [];
        results.innerHTML = `<div class="search-suggest"><p>Probá con:</p><div class="chip-group">${SUGGEST.map((s) => `<button class="chip" type="button" data-sug="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`;
        return;
      }
      items = search(q, 24);
      if (!items.length) { results.innerHTML = `<div class="empty" style="margin:8px">${icon("search")}<strong>Sin resultados para “${esc(q)}”</strong>Probá con otra palabra o revisá la ortografía.</div>`; return; }
      const groups = {};
      items.forEach((it, i) => (groups[it.tipo] = groups[it.tipo] || []).push([it, i]));
      results.innerHTML = Object.entries(groups).map(([g, arr]) => `<div class="search-group" role="group" aria-label="${esc(g)}"><h3>${esc(g)}</h3>${arr.map(([it, i]) => `<a class="search-result" role="option" id="sr-${i}" href="${esc(it.url)}" aria-selected="${i === sel}"${extAttrs(it.url)}><span class="search-result__icon">${icon(it.icono)}</span><div><strong>${markTerms(it.titulo, q)}</strong><small>${esc(it.texto)}</small></div></a>`).join("")}</div>`).join("");
    };
    const order = () => $$(".search-result", results);
    const setSel = (n) => { const els = order(); if (!els.length) return; sel = (n + els.length) % els.length; els.forEach((el) => el.setAttribute("aria-selected", el.id === "sr-" + sel ? "true" : "false")); const cur = $("#sr-" + sel, results); if (cur) { cur.scrollIntoView({ block: "nearest" }); input.setAttribute("aria-activedescendant", cur.id); } };
    input.addEventListener("input", () => { sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      const ids = order().map((el) => +el.id.slice(3));
      const pos = ids.indexOf(sel);
      if (e.key === "ArrowDown") { e.preventDefault(); setSel(ids[(pos + 1) % ids.length]); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel(ids[(pos - 1 + ids.length) % ids.length]); }
      else if (e.key === "Enter") { const cur = $("#sr-" + sel, results); if (cur) { e.preventDefault(); cur.click(); } else if (input.value.trim()) location.href = all.href; }
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-close]")) closeSearch();
      const s = e.target.closest("[data-sug]"); if (s) { input.value = s.dataset.sug; draw(); input.focus(); }
    });
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearch();
      if (e.key === "Tab") { const f = $$("input, button, a[href]", modal); const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
    });
    input.value = initial; draw(); input.focus();
  }
  function closeSearch() { if (!modal) return; modal.remove(); modal = null; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  document.addEventListener("click", (e) => { if (e.target.closest("[data-search-open]")) { e.preventDefault(); openSearch(); } });
  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); modal ? closeSearch() : openSearch(); }
    else if (e.key === "/" && !typing && !modal) { e.preventDefault(); openSearch(); }
  });

  /* ---------- Exportar ---------- */
  Object.assign(WF, { $, $$, esc, norm, params, fmtDate, fmtBytes, hash, icon, level, status, tag, tags, areaName, areaIcon, downloadBtn, openBtn, fileInfo, cover, codeBlock, highlight, breadcrumb, autoCrumb, copyText, toast, isExternal, extAttrs, openSearch });
  WF.PAGES = PAGES;
  WF.AREAS = AREAS;

  // Íconos declarativos en HTML estático: <i data-icon="code"></i>
  function hydrateIcons(root = document) { $$("[data-icon]", root).forEach((el) => { el.outerHTML = icon(el.dataset.icon, el.className); }); }
  WF.hydrateIcons = hydrateIcons;

  renderHeader();
  renderFooter();
  hydrateIcons();
  const crumbHost = $("[data-crumb]");
  if (crumbHost && !crumbHost.dataset.manual) crumbHost.innerHTML = autoCrumb();
})();
