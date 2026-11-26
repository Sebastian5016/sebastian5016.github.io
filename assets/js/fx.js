/* ==========================================================================
   EFECTOS VISUALES — "menos efectos, mejor ejecutados"
   - Aurora WebGL (solo en el hero de inicio), media resolución, pausada fuera
     de pantalla, con alternativa CSS sin WebGL / bajo rendimiento / reducción
     de movimiento.
   - Ambiente: 3 manchas lentas + grano casi imperceptible.
   - Cursor: halo sutil y foco en tarjetas (solo escritorio con mouse).
   - Entradas: opacity + transform, conteo de cifras reales, barras escalonadas.
   Todo usa transform/opacity. Nada de esto es necesario para leer el contenido.
   ========================================================================== */
(function () {
  "use strict";
  const root = document.documentElement;
  const mq = (q) => window.matchMedia && window.matchMedia(q).matches;
  const reduced = mq("(prefers-reduced-motion: reduce)");
  const finePointer = mq("(hover: hover) and (pointer: fine)");
  const narrow = mq("(max-width: 760px)");
  const nav = navigator;
  const lowPerf = !!(nav.connection && nav.connection.saveData) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) || (nav.deviceMemory && nav.deviceMemory <= 2);
  const lightMode = () => root.getAttribute("data-theme") === "light";

  /* ---------- Ambiente (manchas + grano) ---------- */
  const amb = document.createElement("div");
  amb.className = "ambient"; amb.setAttribute("aria-hidden", "true");
  amb.innerHTML = "<i></i><i></i><i></i>";
  document.body.prepend(amb);
  if (!lowPerf) { const g = document.createElement("div"); g.className = "grain"; g.setAttribute("aria-hidden", "true"); document.body.appendChild(g); }

  /* ---------- Aurora (WebGL puro) ---------- */
  function aurora(canvas) {
    const fallback = () => { const d = document.createElement("div"); d.className = "hero__aurora hero__aurora--css"; d.setAttribute("aria-hidden", "true"); canvas.replaceWith(d); };
    if (reduced || lowPerf) return fallback();
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power", premultipliedAlpha: false });
    if (!gl) return fallback();
    const vs = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
    const fs = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 c1;uniform vec3 c2;uniform vec3 bg;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=vec2(uv.x*r.x/r.y,uv.y)*1.5;
  float T=t*.018;
  vec2 q=vec2(fbm(p+vec2(0.,T)),fbm(p+vec2(5.2,1.3)-T));
  vec2 w=vec2(fbm(p+2.*q+vec2(1.7,9.2)+T*.7),fbm(p+2.*q+vec2(8.3,2.8)-T*.5));
  float f=fbm(p+2.4*w);
  float y=uv.y-.52-(f-.5)*.55;
  float band=exp(-abs(y)*7.);
  float fil=pow(abs(sin((p.x+w.x*2.2)*7.+f*5.)),14.)*exp(-abs(y)*16.);
  float v=smoothstep(.02,.45,uv.y)*smoothstep(1.,.6,uv.y);
  float lr=smoothstep(.05,.7,uv.x)*.65+.35;
  vec3 col=mix(c1,c2,smoothstep(.25,.85,w.x+uv.x*.35));
  float a=(band*f*.85+fil*.42)*v*lr;
  gl_FragColor=vec4(bg+col*a*.78,1.);
}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return fallback();
    const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return fallback();
    gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (k) => gl.getUniformLocation(pr, k);
    gl.uniform3f(U("c1"), 115 / 255, 87 / 255, 255 / 255);
    gl.uniform3f(U("c2"), 44 / 255, 201 / 255, 234 / 255);
    gl.uniform3f(U("bg"), 7 / 255, 4 / 255, 14 / 255);
    const scale = narrow ? 0.33 : 0.5;
    const resize = () => { const w = Math.max(1, Math.round(canvas.clientWidth * scale)), hh = Math.max(1, Math.round(canvas.clientHeight * scale)); if (canvas.width !== w || canvas.height !== hh) { canvas.width = w; canvas.height = hh; gl.viewport(0, 0, w, hh); gl.uniform2f(U("r"), w, hh); } };
    resize(); window.addEventListener("resize", resize, { passive: true });
    let visible = true, raf = 0, last = 0, t0 = performance.now() - 40000;
    const frameMs = narrow ? 1000 / 20 : 1000 / 30;
    const draw = (now) => {
      raf = 0;
      if (!visible || document.hidden || lightMode()) return;
      if (now - last >= frameMs) { last = now; gl.uniform1f(U("t"), (now - t0) / 1000); gl.drawArrays(gl.TRIANGLES, 0, 3); }
      raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(canvas);
    document.addEventListener("visibilitychange", start);
    document.addEventListener("wf:theme", start);
    start();
  }
  const auroraCanvas = document.querySelector("canvas.hero__aurora");
  if (auroraCanvas) aurora(auroraCanvas);

  /* ---------- Cursor: halo + foco en tarjetas (solo mouse) ---------- */
  if (finePointer && !reduced) {
    const halo = document.createElement("div");
    halo.className = "cursor-halo"; halo.setAttribute("aria-hidden", "true");
    document.body.appendChild(halo);
    let x = 0, y = 0, pending = false, card = null;
    const paint = () => {
      pending = false;
      halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (card) { const r = card.getBoundingClientRect(); card.style.setProperty("--mx", `${x - r.left}px`); card.style.setProperty("--my", `${y - r.top}px`); }
    };
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY; card = e.target.closest && e.target.closest(".card");
      halo.classList.add("on");
      if (!pending) { pending = true; requestAnimationFrame(paint); }
    }, { passive: true });
    document.addEventListener("pointerleave", () => halo.classList.remove("on"));
    document.documentElement.addEventListener("mouseleave", () => halo.classList.remove("on"));
  }

  /* ---------- Entradas al viewport ---------- */
  if (!("IntersectionObserver" in window)) return;
  // Bordes premium: girar solo cuando se ven
  const pio = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-visible", e.isIntersecting)), { rootMargin: "80px" });
  document.querySelectorAll(".premium").forEach((el) => pio.observe(el));

  if (reduced) return; // contenido inmediato, sin animaciones

  // Título principal palabra por palabra
  const splitWords = (el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", i++); s.textContent = part; frag.appendChild(s);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1) walk(ch);
      });
    };
    el.setAttribute("aria-label", el.textContent.trim());
    walk(el);
    el.querySelectorAll(".w").forEach((w) => w.setAttribute("aria-hidden", "true"));
    el.classList.add("words");
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in")));
  };
  const h1 = document.querySelector(".hero h1");
  if (h1) splitWords(h1);

  // Secciones y tarjetas
  const SEL = ".section-head, .pillars > *, .audience > *, .steps > *, .grid > *, .doc-block, .timeline__item, .guide-step, .route-level, .stat, .cta-band, .featured-post, .hero-stage > *, .now-list > li, .big-tiles > *";
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  const seen = new WeakSet();
  const arm = (scope) => {
    scope.querySelectorAll(SEL).forEach((el) => {
      if (seen.has(el) || el.closest(".rv:not(.in)") || el.closest(".site-header, .mobile-nav, .search-modal")) return;
      seen.add(el);
      const sibs = el.parentElement ? [...el.parentElement.children] : [];
      el.style.setProperty("--i", Math.min(sibs.indexOf(el), 6));
      el.classList.add("rv");
      io.observe(el);
    });
  };
  arm(document);

  // Cifras reales con conteo progresivo
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.countup, dur = 1100, t0 = performance.now();
    const step = (now) => { const k = Math.min(1, (now - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    el.textContent = "0"; requestAnimationFrame(step);
  }), { threshold: 0.6 });
  document.querySelectorAll("[data-countup]").forEach((el) => cio.observe(el));

  // Barras de progreso escalonadas
  const bio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; bio.unobserve(e.target);
    e.target.querySelectorAll("[data-on]").forEach((i) => i.classList.add("on"));
    const bar = e.target.querySelector(".progress__bar[data-val]"); if (bar) bar.style.setProperty("--p-val", bar.dataset.val);
  }), { threshold: 0.4 });
  const armBars = () => document.querySelectorAll(".mini-route, .progress").forEach((m) => {
    if (m.dataset.armed) return; m.dataset.armed = 1;
    m.querySelectorAll("i.on").forEach((i) => { i.classList.remove("on"); i.dataset.on = 1; });
    const bar = m.querySelector(".progress__bar"); if (bar) { bar.dataset.val = getComputedStyle(bar).getPropertyValue("--p-val").trim() || "0"; bar.style.setProperty("--p-val", 0); }
    bio.observe(m.closest(".card") || m);
  });
  armBars();
  window.WF && (window.WF.fxArm = () => {});
})();
