/* ==========================================================================
   TAXONOMÍA ÚNICA
   Todas las secciones (proyectos, materiales, lenguajes, rutas, blog y
   búsqueda) usan estas mismas claves. Para sumar un área nueva, agregala acá.
   ========================================================================== */
window.WF = window.WF || {};
WF.taxonomia = {
  areas: {
    programacion: { nombre: "Programación", icono: "code" },
    bd: { nombre: "Bases de datos", icono: "database" },
    redes: { nombre: "Redes", icono: "network" },
    hardware: { nombre: "Hardware", icono: "cpu" },
    sistemas: { nombre: "Sistemas", icono: "terminal" },
    seguridad: { nombre: "Seguridad", icono: "shield" },
    ia: { nombre: "Inteligencia artificial", icono: "sparkles" },
    web: { nombre: "Desarrollo web", icono: "globe" },
    ofimatica: { nombre: "Ofimática", icono: "file" },
    pensamiento: { nombre: "Pensamiento computacional", icono: "puzzle" },
    diseno: { nombre: "Diseño digital", icono: "palette" },
    inclusion: { nombre: "Inclusión digital", icono: "heart" },
  },

  niveles: {
    inicial: { nombre: "Inicial", valor: 1 },
    intermedio: { nombre: "Intermedio", valor: 2 },
    avanzado: { nombre: "Avanzado", valor: 3 },
  },

  materias: {
    informatica: "Informática",
    programacion: "Programación",
    tecnologia: "Tecnología",
    redes: "Redes y comunicaciones",
    bd: "Bases de datos",
    ciudadania: "Ciudadanía digital",
  },

  destinatarios: {
    "ciclo-basico": "Secundario · ciclo básico",
    "ciclo-superior": "Secundario · ciclo superior",
    tecnico: "Escuela técnica",
    adultos: "Adultos / autodidactas",
    docentes: "Docentes",
  },

  tipos: {
    apunte: "Apunte",
    guia: "Guía",
    ejercicios: "Ejercicios",
    evaluacion: "Evaluación",
    proyecto: "Proyecto",
    tutorial: "Tutorial",
    video: "Video",
    codigo: "Código",
    enlace: "Enlace",
    presentacion: "Presentación",
  },

  formatos: {
    pdf: "PDF",
    doc: "DOC",
    ppt: "PPT",
    xls: "XLS",
    codigo: "Código",
    video: "Video",
    enlace: "Enlace",
    html: "HTML",
    txt: "TXT",
  },

  estados: {
    publicado: "Publicado",
    desarrollo: "En desarrollo",
    planificado: "Planificado",
  },

  // Categorías de la sección "Recursos para alumnos"
  alumnos: [
    { id: "apuntes", emoji: "📚", nombre: "Apuntes", area: null },
    { id: "programacion", emoji: "💻", nombre: "Programación", area: "programacion" },
    { id: "internet", emoji: "🌐", nombre: "Internet", area: "web" },
    { id: "hardware", emoji: "🖥️", nombre: "Hardware", area: "hardware" },
    { id: "seguridad", emoji: "🔐", nombre: "Seguridad", area: "seguridad" },
    { id: "ia", emoji: "🤖", nombre: "Inteligencia artificial", area: "ia" },
    { id: "bd", emoji: "🗄️", nombre: "Bases de datos", area: "bd" },
    { id: "diseno", emoji: "🎨", nombre: "Diseño digital", area: "diseno" },
    { id: "pensamiento", emoji: "🧠", nombre: "Pensamiento computacional", area: "pensamiento" },
  ],

  // Categorías del blog
  blog: {
    educacion: "Educación",
    tecnologia: "Tecnología",
    programacion: "Programación",
    ia: "IA",
    ciberseguridad: "Ciberseguridad",
    informatica: "Informática",
    experiencias: "Experiencias docentes",
  },

  // Sinónimos para la búsqueda global
  sinonimos: {
    ia: ["inteligencia artificial", "chatgpt", "prompt", "ia generativa"],
    redes: ["red", "tcp", "ip", "router", "internet", "packet tracer"],
    bd: ["base de datos", "sql", "mysql", "sqlite", "tabla"],
    sql: ["base de datos", "consulta", "mysql"],
    word: ["procesador de texto", "ofimatica", "documento", "docs"],
    excel: ["planilla", "hoja de calculo", "ofimatica", "sheets"],
    programacion: ["codigo", "programar", "algoritmo", "python", "javascript"],
    seguridad: ["ciberseguridad", "contrasena", "phishing", "privacidad"],
    hardware: ["computadora", "componentes", "cpu", "memoria"],
    web: ["html", "css", "javascript", "pagina"],
  },
};
