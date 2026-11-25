/* ==========================================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   --------------------------------------------------------------------------
   Este es el archivo más importante para personalizar la plataforma.
   Todo lo marcado con  ✏️ COMPLETAR  debe revisarse antes de publicar.
   Si un campo queda vacío (""), el componente correspondiente NO se muestra.
   ========================================================================== */
window.WF = window.WF || {};
WF.sitio = {
  nombre: "Walter Sebastián Fernández",
  nombreCorto: "Walter Fernández",
  iniciales: "WF",
  rol: "Profesor de Informática",
  roles: ["Profesor de Informática", "Tecnología", "Programación", "Educación Digital"],
  lema: "Aprender tecnología haciendo.",
  // ✏️ COMPLETAR: URL definitiva del sitio (se usa para compartir y SEO)
  url: "https://sebastian5016.github.io/",
  actualizado: "2026-11-25",

  presentacion:
    "Soy docente de Informática. Enseño programación, redes, sistemas, seguridad informática e inteligencia artificial a partir de proyectos reales: problemas concretos que se resuelven construyendo. Esta plataforma reúne mi trabajo profesional y, al mismo tiempo, es una biblioteca abierta para que mis alumnos —y cualquier persona— aprendan tecnología de forma autónoma.",

  // --- Contacto -------------------------------------------------------------
  contacto: {
    // ✏️ COMPLETAR: correo profesional (no usar un correo personal)
    email: "",
    // ✏️ OPCIONAL: endpoint de Formspree / Getform / Basin. Si está vacío,
    // el formulario abre el cliente de correo con el mensaje armado.
    formEndpoint: "",
    ubicacion: "Argentina",
    disponibilidad: "Disponible para cátedras de Informática, Tecnología y Programación en nivel secundario, técnico y formación de adultos.",
  },

  redes: {
    // ✏️ COMPLETAR los enlaces. Los vacíos no se muestran.
    linkedin: "",
    github: "https://github.com/sebastian5016",
    youtube: "",
  },

  // --- Integraciones --------------------------------------------------------
  // Pegar el ID / URL cuando se active cada servicio.
  integraciones: {
    github: { activo: true, usuario: "sebastian5016", repoSitio: "https://github.com/sebastian5016/sebastian5016.github.io" },
    youtube: { activo: false, canal: "" },
    drive: { activo: false, carpetaPublica: "" },
    forms: { activo: false, autoevaluaciones: "" },
    classroom: { activo: false, nota: "Los códigos de clase se comparten solo en el aula, nunca en el sitio público." },
    calendar: { activo: false, embed: "" },
    canva: { activo: false, perfil: "" },
    notion: { activo: false, pagina: "" },
  },

  // --- Sobre mí / Portfolio -------------------------------------------------
  perfilDocente:
    "Entiendo la informática como una herramienta para pensar, crear y resolver problemas, no solo como un conjunto de programas que hay que aprender a usar. En mis clases cada tema termina en algo que funciona: un programa, una red, una base de datos, una página web o un análisis crítico.",

  perfilHumano: [
    "Me interesa que cada estudiante salga de la clase sabiendo hacer algo que antes no sabía, y entendiendo por qué funciona.",
    "Combino la formación docente con experiencia técnica en sistemas, programación y seguridad informática. Esa mezcla me permite enseñar con ejemplos reales y no solo desde el manual.",
    "Creo en el material abierto: todo lo que preparo para el aula queda publicado aquí para que lo use quien lo necesite.",
  ],

  // ✏️ COMPLETAR con instituciones y años reales. "periodo" puede quedar vacío.
  lineaTemporal: [
    { tipo: "formacion", etiqueta: "Formación docente", titulo: "Profesorado de Informática", periodo: "", texto: "Didáctica de la informática, diseño de secuencias, evaluación y planificación por proyectos." },
    { tipo: "formacion", etiqueta: "Formación técnica", titulo: "Programación, sistemas y redes", periodo: "", texto: "Desarrollo de software, bases de datos, administración de sistemas, hardware y redes." },
    { tipo: "experiencia", etiqueta: "Experiencia profesional", titulo: "Sistemas y soporte tecnológico", periodo: "", texto: "Trabajo con equipos, redes, usuarios y resolución de problemas reales en entornos de producción." },
    { tipo: "formacion", etiqueta: "Especialización", titulo: "Seguridad informática y ciberseguridad", periodo: "", texto: "Buenas prácticas, protección de datos, análisis de riesgos y concientización." },
    { tipo: "experiencia", etiqueta: "Docencia", titulo: "Profesor de Informática y Tecnología", periodo: "", texto: "Enseñanza de informática, programación y alfabetización digital en nivel secundario." },
    { tipo: "actual", etiqueta: "Actualidad", titulo: "IA educativa y producción de materiales abiertos", periodo: "Hoy", texto: "Integración responsable de inteligencia artificial en el aula y desarrollo de esta plataforma." },
  ],

  especializacion: [
    { icono: "code", titulo: "Programación", texto: "Python, C, C++, Java, JavaScript, VB.NET. Lógica, estructuras de datos y buenas prácticas." },
    { icono: "database", titulo: "Bases de datos", texto: "Modelado, SQL, normalización y sistemas de gestión." },
    { icono: "network", titulo: "Redes", texto: "Modelo TCP/IP, direccionamiento, configuración y diagnóstico." },
    { icono: "cpu", titulo: "Hardware y sistemas", texto: "Arquitectura de computadoras, sistemas operativos y mantenimiento." },
    { icono: "shield", titulo: "Seguridad informática", texto: "Ciberseguridad, contraseñas, ingeniería social, privacidad y protección de datos." },
    { icono: "sparkles", titulo: "Inteligencia artificial", texto: "IA generativa, prompts, uso responsable y pensamiento crítico." },
  ],

  intereses: ["Pensamiento computacional", "Alfabetización digital", "Software libre", "Robótica educativa", "Ciberseguridad", "IA aplicada a la educación", "Divulgación tecnológica"],

  metodologia: [
    { titulo: "Problema", texto: "Cada tema parte de una situación real que hay que resolver." },
    { titulo: "Explorar", texto: "Investigamos conceptos y herramientas antes de usarlos." },
    { titulo: "Construir", texto: "Se aprende haciendo: código, redes, diseños, documentos." },
    { titulo: "Compartir", texto: "Mostramos el resultado y lo documentamos para otros." },
    { titulo: "Reflexionar", texto: "Revisamos qué aprendimos y cómo podría mejorarse." },
  ],

  competencias: {
    docentes: [
      "Planificación por proyectos y secuencias didácticas",
      "Diseño de materiales educativos propios",
      "Evaluación formativa con rúbricas",
      "Aprendizaje basado en problemas",
      "Atención a la diversidad y accesibilidad",
      "Integración de TIC e IA en el aula",
    ],
    tecnologicas: [
      "Programación en múltiples lenguajes",
      "Desarrollo web (HTML, CSS, JavaScript)",
      "Diseño y consulta de bases de datos",
      "Configuración de redes y sistemas",
      "Seguridad informática y buenas prácticas",
      "Herramientas de IA generativa",
    ],
  },

  herramientas: [
    { grupo: "Lenguajes", items: ["Python", "C", "C++", "Java", "JavaScript", "VB.NET", "SQL", "HTML", "CSS"] },
    { grupo: "Desarrollo", items: ["VS Code", "Git", "GitHub", "Visual Studio", "Replit", "Arduino IDE"] },
    { grupo: "Datos y redes", items: ["MySQL", "SQLite", "Packet Tracer", "Wireshark", "Linux"] },
    { grupo: "Aula digital", items: ["Google Classroom", "Google Forms", "Drive", "Canva", "Notion", "YouTube"] },
    { grupo: "Pensamiento computacional", items: ["Scratch", "PSeInt", "Diagramas de flujo", "Robótica educativa"] },
    { grupo: "Ofimática", items: ["Word / Docs", "Excel / Sheets", "PowerPoint / Slides"] },
  ],

  aportes: [
    { icono: "monitor", titulo: "Enseñanza de informática", texto: "Contenidos actualizados de informática para todos los niveles, con material propio." },
    { icono: "code", titulo: "Programación", texto: "Desde la lógica y el pseudocódigo hasta proyectos en Python, C, Java o JavaScript." },
    { icono: "book", titulo: "Alfabetización digital", texto: "Uso crítico y seguro de herramientas digitales, ofimática y comunicación." },
    { icono: "puzzle", titulo: "Pensamiento computacional", texto: "Descomposición, patrones, abstracción y algoritmos aplicados a cualquier materia." },
    { icono: "tool", titulo: "Tecnología aplicada", texto: "Hardware, redes, sistemas y robótica con actividades prácticas." },
    { icono: "layers", titulo: "Proyectos interdisciplinarios", texto: "Proyectos que conectan informática con matemática, ciencias, arte o lengua." },
    { icono: "sparkles", titulo: "IA educativa", texto: "Integración responsable de IA para estudiantes y para el equipo docente." },
    { icono: "users", titulo: "Acompañamiento tecnológico", texto: "Apoyo a colegas e institución en plataformas, herramientas y seguridad digital." },
  ],
};
