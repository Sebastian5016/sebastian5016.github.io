/* ==========================================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   --------------------------------------------------------------------------
   Archivo principal de personalización. Lo marcado con ✏️ está pendiente.
   Si un campo queda vacío (""), el componente correspondiente NO se muestra.
   PRIVACIDAD: no publicar DNI, teléfono personal ni domicilio.
   ========================================================================== */
window.WF = window.WF || {};
WF.sitio = {
  nombre: "Walter Sebastián Fernández",
  nombreCorto: "Walter Fernández",
  iniciales: "WF",
  rol: "Profesor de Informática",
  roles: ["Profesor de Informática", "Tecnología", "Programación", "Educación Digital"],
  niveles: "Nivel primario, secundario y adultos",
  lema: "Aprender tecnología haciendo.",
  url: "https://sebastian5016.github.io/",
  actualizado: "2026-11-26",
  foto: "assets/img/walter.jpg",
  fotoAlt: "Retrato de Walter Sebastián Fernández, sonriendo, con camisa celeste y suéter oscuro.",

  presentacion:
    "Docente de tecnología con formación técnica superior en análisis y programación. Enseño programación, redes, bases de datos, ciberseguridad e inteligencia artificial a partir de proyectos concretos. Esta plataforma reúne mi trabajo profesional y es, al mismo tiempo, una biblioteca abierta para que mis alumnos —y cualquier persona— aprendan tecnología a su ritmo.",

  // --- Contacto -------------------------------------------------------------
  contacto: {
    // ✏️ Correo que querés mostrar públicamente (vacío = no se muestra).
    email: "",
    // ✏️ OPCIONAL: endpoint de Formspree. Vacío → el formulario arma un correo.
    formEndpoint: "",
    ubicacion: "Ramos Mejía, La Matanza · Buenos Aires",
    disponibilidad: "Disponible para horas cátedra de Informática, NTICx, Lenguajes Tecnológicos, Programación y Tecnología en nivel primario, secundario, técnico y formación de adultos.",
  },

  redes: {
    linkedin: "", // ✏️ pendiente
    github: "https://github.com/Sebastian5016",
    youtube: "",
    whatsapp: "", // ✏️ número en formato internacional sin "+" (ej. 54911…) si querés mostrarlo
  },

  // --- Integraciones --------------------------------------------------------
  integraciones: {
    github: { activo: true, usuario: "Sebastian5016", repoSitio: "https://github.com/Sebastian5016/sebastian5016.github.io" },
    youtube: { activo: false, canal: "" },
    drive: { activo: false, carpetaPublica: "" },
    forms: { activo: false, autoevaluaciones: "" },
    classroom: { activo: false, nota: "Los códigos de clase se comparten solo en el aula, nunca en el sitio público." },
    calendar: { activo: false, embed: "" },
    canva: { activo: false, perfil: "" },
    notion: { activo: false, pagina: "" },
  },

  // --- Perfil ---------------------------------------------------------------
  perfilDocente:
    "Docente de tecnología con formación técnica superior en análisis y programación, experiencia en coordinación educativa y en el seguimiento de trayectorias diversas y discontinuas. Enseño adaptándome a distintos ritmos de aprendizaje y me propongo que cada estudiante use la tecnología de forma responsable, crítica y creativa.",

  perfilHumano: [
    "Vengo de muchos años de instrucción, coordinación y conducción de equipos. De ahí traigo algo que hoy aplico en el aula: escuchar primero y acompañar a cada persona desde donde está.",
    "Mi formación técnica —análisis y programación, ciberseguridad— y mi trabajo en desarrollo web me permiten enseñar con ejemplos reales, no solo desde el manual.",
    "Creo en el material abierto: lo que preparo para el aula queda publicado acá para que lo use quien lo necesite, a su ritmo.",
  ],

  enfoque: [
    "Escucha y acompañamiento de cada estudiante",
    "Respeto por los distintos ritmos de aprendizaje",
    "Uso responsable y crítico de la tecnología",
    "Trabajo en equipo con la institución",
  ],

  actualmente: [
    { escuela: "EES N.º 38", lugar: "Villa Madero", materia: "NTICx", cursos: "4.º 1.ª y 4.º 2.ª" },
    { escuela: "ES N.º 178 «Padre Bachi»", lugar: "San Justo", materia: "NTICx", cursos: "4.º 1.ª" },
    { escuela: "EEST N.º 10", lugar: "Villa Madero", materia: "Lenguajes Tecnológicos", cursos: "2.º 4.ª" },
  ],

  inscripcion: "DGCyE — Listado 108 A 2027",
  idiomas: ["Español — nativo", "Inglés — intermedio (B1)"],

  // tipo: formacion | experiencia | actual (orden cronológico inverso)
  lineaTemporal: [
    { tipo: "actual", etiqueta: "Docencia", titulo: "Docente de NTICx y Lenguajes Tecnológicos", lugar: "EES N.º 38 · ES N.º 178 · EEST N.º 10", periodo: "Actualidad", texto: "Nuevas Tecnologías de la Información y la Conectividad y Lenguajes Tecnológicos en escuelas secundarias de La Matanza." },
    { tipo: "actual", etiqueta: "Proyecto propio", titulo: "Creador y docente — Proyecto TecnoMayores", lugar: "«Tecnología a tu ritmo» · Adultos mayores", periodo: "2026 – actualidad", texto: "Inclusión digital con enseñanza adaptada al ritmo de cada participante. Programa de seis semanas con materiales y juegos didácticos propios." },
    { tipo: "formacion", etiqueta: "Formación docente", titulo: "Tramo pedagógico de nivel superior", lugar: "", periodo: "En curso", texto: "Formación pedagógica para el ejercicio de la docencia." },
    { tipo: "formacion", etiqueta: "Formación técnica", titulo: "Técnico Superior en Análisis y Programación de Aplicaciones", lugar: "ISFDyT N.º 46, Ramos Mejía", periodo: "2026 · título en trámite", texto: "Programación, análisis de sistemas, bases de datos y desarrollo de aplicaciones." },
    { tipo: "experiencia", etiqueta: "Educación", titulo: "Coordinador de Educación", lugar: "Ministerio de Justicia de la Provincia de Buenos Aires", periodo: "2021 – 2026", texto: "Acompañamiento de trayectorias educativas diversas y discontinuas. Articulación con escuelas y docentes." },
    { tipo: "formacion", etiqueta: "Especialización", titulo: "Diplomatura en Ciberseguridad", lugar: "UNNE", periodo: "2024", texto: "Seguridad de la información, amenazas, buenas prácticas y protección de datos." },
    { tipo: "experiencia", etiqueta: "Instrucción", titulo: "Instructor de personal — Sección Cinotecnia", lugar: "Servicio Penitenciario Bonaerense", periodo: "2017 – 2021", texto: "Instrucción práctica del personal. Guía y adiestrador de canes." },
    { tipo: "formacion", etiqueta: "Formación técnica", titulo: "Técnico en Refrigeración Industrial", lugar: "UTN", periodo: "2014", texto: "Formación técnica en sistemas e instalaciones industriales." },
    { tipo: "experiencia", etiqueta: "Desarrollo", titulo: "Titular — El Paisa Servicios Integrales", lugar: "Ramos Mejía", periodo: "2012 – actualidad", texto: "Plataforma de servicios técnicos. Desarrollo web y aplicaciones de gestión." },
    { tipo: "formacion", etiqueta: "Formación", titulo: "Técnico Superior en Seguridad Institucional", lugar: "", periodo: "2009", texto: "" },
    { tipo: "experiencia", etiqueta: "Trayectoria", titulo: "Ministerio de Justicia de la Provincia de Buenos Aires", lugar: "", periodo: "2000 – 2026 · Retirado", texto: "Funciones de instrucción, coordinación y conducción de equipos." },
  ],

  especializacion: [
    { icono: "code", titulo: "Programación y lenguajes", texto: "Python, C, C++, Java, JavaScript, VB.NET. Lógica, algoritmos y buenas prácticas." },
    { icono: "database", titulo: "Análisis de sistemas y bases de datos", texto: "Relevamiento, modelado, SQL y aplicaciones de gestión." },
    { icono: "network", titulo: "Redes", texto: "Modelos OSI y TCP/IP, direccionamiento, configuración y diagnóstico." },
    { icono: "globe", titulo: "Desarrollo web", texto: "HTML, CSS y JavaScript. Sitios y plataformas en producción desde 2012." },
    { icono: "shield", titulo: "Ciberseguridad", texto: "Diplomatura UNNE. Contraseñas, phishing, privacidad y protección de datos." },
    { icono: "sparkles", titulo: "Inteligencia artificial en el aula", texto: "IA generativa, prompts, uso responsable y pensamiento crítico." },
    { icono: "file", titulo: "Ofimática y alfabetización digital", texto: "Documentos, planillas, presentaciones y ciudadanía digital." },
    { icono: "cpu", titulo: "Hardware y mantenimiento", texto: "Componentes, armado, diagnóstico y mantenimiento de equipos." },
  ],

  intereses: ["Inclusión digital", "Pensamiento computacional", "Ciberseguridad", "IA aplicada a la educación", "Desarrollo web", "Software libre", "Robótica educativa"],

  metodologia: [
    { titulo: "Problema", texto: "Cada tema parte de una situación real que hay que resolver." },
    { titulo: "Explorar", texto: "Investigamos conceptos y herramientas antes de usarlos." },
    { titulo: "Construir", texto: "Se aprende haciendo: código, redes, diseños, documentos." },
    { titulo: "Compartir", texto: "Mostramos el resultado y lo documentamos para otros." },
    { titulo: "Reflexionar", texto: "Revisamos qué aprendimos y cómo podría mejorarse." },
  ],

  competencias: {
    docentes: [
      "Enseñanza adaptada a distintos ritmos de aprendizaje",
      "Acompañamiento de trayectorias diversas y discontinuas",
      "Diseño de materiales y juegos didácticos propios",
      "Planificación por proyectos y aprendizaje basado en problemas",
      "Articulación con escuelas, docentes e instituciones",
      "Coordinación y conducción de equipos",
    ],
    tecnologicas: [
      "Análisis y programación de aplicaciones",
      "Desarrollo web y aplicaciones de gestión",
      "Diseño y consulta de bases de datos",
      "Redes: modelos OSI y TCP/IP",
      "Ciberseguridad (Diplomatura UNNE)",
      "Herramientas de IA generativa",
    ],
  },

  herramientas: [
    { grupo: "Lenguajes", items: ["Python", "C", "C++", "Java", "JavaScript", "VB.NET", "SQL", "HTML", "CSS"] },
    { grupo: "Desarrollo", items: ["VS Code", "Git", "GitHub", "Visual Studio", "Replit", "Arduino IDE"] },
    { grupo: "Datos y redes", items: ["MySQL", "SQLite", "Packet Tracer", "Wireshark", "Linux"] },
    { grupo: "Aula digital", items: ["Google Classroom", "Google Forms", "Drive", "Canva", "YouTube"] },
    { grupo: "Pensamiento computacional", items: ["Scratch", "PSeInt", "Diagramas de flujo", "Robótica educativa"] },
    { grupo: "Ofimática", items: ["Word / Docs", "Excel / Sheets", "PowerPoint / Slides"] },
  ],

  aportes: [
    { icono: "monitor", titulo: "NTICx e informática", texto: "Contenidos actualizados con material propio, listos para el aula." },
    { icono: "code", titulo: "Programación y lenguajes", texto: "De la lógica y el pseudocódigo a proyectos en Python, C, Java o JavaScript." },
    { icono: "book", titulo: "Alfabetización digital", texto: "Uso crítico y seguro de herramientas digitales, también con adultos mayores." },
    { icono: "puzzle", titulo: "Pensamiento computacional", texto: "Descomposición, patrones, abstracción y algoritmos en cualquier materia." },
    { icono: "shield", titulo: "Ciberseguridad", texto: "Prevención de fraudes, privacidad y convivencia digital para toda la comunidad." },
    { icono: "layers", titulo: "Proyectos interdisciplinarios", texto: "Proyectos que conectan informática con otras áreas." },
    { icono: "sparkles", titulo: "IA educativa", texto: "Integración responsable de IA para estudiantes y para el equipo docente." },
    { icono: "users", titulo: "Acompañamiento de trayectorias", texto: "Experiencia en seguimiento de trayectorias diversas y articulación institucional." },
  ],
};
