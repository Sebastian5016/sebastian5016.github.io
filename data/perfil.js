/* ==========================================================================
   PERFIL PROFESIONAL — fuente única del portfolio (portfolio.html) y del CV
   público en PDF (descargas/cv/).
   Jerarquía: 1 quién soy y qué hago · 2 qué aporto · 3 cómo enseño ·
   4 qué hago realmente (evidencias y proyectos) · 5 experiencia y formación ·
   6 tecnologías.
   REGLA: solo información real (CV de W. S. Fernández y datos indicados por él).
   Las escuelas actuales aparecen UNA sola vez (Dónde enseño hoy).
   ========================================================================== */
window.WF = window.WF || {};
WF.perfil = {
  nombre: "Walter Sebastián Fernández",
  titulo: "Profesor de Informática | NTICx | Tecnología Educativa",
  propuesta: "Experiencia profesional, formación tecnológica y docencia aplicadas a la educación.",
  bajada: "Doy clases de NTICx y Lenguajes Tecnológicos en escuelas secundarias de La Matanza. Integro programación, pensamiento lógico, robótica e IA en propuestas donde los estudiantes aprenden haciendo.",
  ubicacion: "Ramos Mejía, La Matanza · Buenos Aires",
  foto: "assets/img/walter.jpg",
  fotoAlt: "Retrato de Walter Sebastián Fernández, sonriendo, con camisa celeste y suéter oscuro.",
  cv: "descargas/cv/CV-Walter-Sebastian-Fernandez.pdf",

  // Una trayectoria diferente (bloque editorial, sin estadísticas)
  lema: "Gestión, técnica y aula: tres experiencias que normalmente no conviven en un mismo perfil docente.",
  rasgos: ["+25 años de experiencia profesional", "Formación tecnológica y programación", "Experiencia docente actual", "Gestión y coordinación educativa"],

  // Quién soy
  quienSoy: [
    "Soy profesor de Informática y Tecnología. Llegué al aula después de más de 25 años de trabajo en coordinación, capacitación y conducción de equipos, y de formarme como Técnico Superior en Análisis y Programación.",
    "Esa combinación es mi forma de enseñar: conocimiento técnico real, experiencia con personas y una mirada pedagógica que hoy sigo formando en el tramo pedagógico de nivel superior.",
  ],
  escuelas: [
    { escuela: "EES N.º 38", lugar: "Villa Madero", materia: "NTICx", cursos: "4.º 1.ª y 4.º 2.ª" },
    { escuela: "ES N.º 178 «Padre Bachi»", lugar: "San Justo", materia: "NTICx", cursos: "4.º 1.ª" },
    { escuela: "EEST N.º 10", lugar: "Villa Madero", materia: "Lenguajes Tecnológicos", cursos: "2.º 4.ª" },
  ],

  // Qué puedo aportar (tres columnas editoriales)
  aportes: [
    { icono: "learn", t: "En el aula", d: "Programación, informática, pensamiento lógico, resolución de problemas, proyectos y tecnología con propósito." },
    { icono: "users", t: "Con otros docentes", d: "Colaboración, capacitación, herramientas digitales, adaptación tecnológica y acompañamiento." },
    { icono: "school", t: "Para la institución", d: "Experiencia, organización, gestión, articulación y una mirada integral de los procesos educativos." },
  ],

  // Docencia
  frase: "No busco que el estudiante solamente use tecnología. Busco que entienda cómo funciona, pueda crear con ella y desarrolle criterio para utilizarla.",
  principios: [
    { t: "Aprender haciendo", d: "Cada tema termina en algo que funciona: un programa, un circuito, un proyecto." },
    { t: "Tecnología con propósito", d: "Las herramientas se eligen por lo que permiten hacer, no por moda." },
    { t: "Aprendizaje significativo", d: "Partimos de problemas reales y cercanos a los estudiantes." },
    { t: "Pensamiento lógico", d: "Ordenar ideas y descomponer problemas antes de tocar la computadora." },
    { t: "El error como información", d: "Equivocarse es parte del método: muestra qué corregir." },
    { t: "Acompañamiento", d: "Respeto los distintos ritmos y acompaño trayectorias diversas." },
  ],
  proceso: ["Desafío", "Exploración", "Comprensión", "Práctica", "Producción", "Reflexión"],
  procesoNota: "Una forma de organizar las experiencias de aprendizaje, no una receta rígida.",
  ia: {
    t: "IA como tutor que hace preguntas, no como atajo.",
    d: "Uso la inteligencia artificial para aprender, investigar, comparar y revisar; nunca como sustituto del pensamiento del estudiante.",
    temas: ["IA responsable", "Alfabetización en IA", "Herramientas para docentes", "Pensamiento crítico", "Verificación de información", "Aprender, no copiar"],
    enlace: { t: "Ver la guía de IA para el aula", u: "ia.html" },
  },

  // Áreas
  areas: [
    { icono: "monitor", t: "Informática", d: "Competencias digitales, sistemas y herramientas informáticas." },
    { icono: "code", t: "Programación", d: "Python, JavaScript, C/C++, lógica y resolución de problemas." },
    { icono: "globe", t: "NTICx", d: "Tecnología, ciudadanía digital, pensamiento crítico y cultura digital." },
    { icono: "cpu", t: "Robótica educativa", d: "Proyectos con Arduino, electrónica aplicada, programación y resolución de problemas." },
    { icono: "spark", t: "Inteligencia artificial", d: "Uso educativo responsable, herramientas de IA y alfabetización en IA." },
    { icono: "shield", t: "Seguridad digital", d: "Ciberseguridad, buenas prácticas, privacidad y ciudadanía digital." },
  ],
  niveles: ["Secundaria", "Educación Técnico-Profesional", "Formación de adultos"],

  // Así se ve mi trabajo (material real publicado)
  evidencias: [
    { tipo: "Actividad de programación", t: "Calculadora en Python, paso a paso", imagen: "assets/img/evidencias/proyecto-codigo.jpg", d: "Un problema concreto que se resuelve con funciones, validación de datos y manejo de errores.", u: "proyecto.html?id=calculadora-python", destacada: true },
    { tipo: "Robótica educativa", t: "Semáforo con Arduino", imagen: "assets/img/evidencias/arduino.jpg", d: "Circuito, pines digitales y programación: la tecnología sale de la pantalla.", u: "proyecto.html?id=semaforo-arduino", destacada: true },
    { tipo: "Material didáctico", t: "Apunte de programación", imagen: "assets/img/evidencias/apunte.jpg", d: "Objetivos, explicación, ejemplos y actividad final.", u: "apuntes/introduccion-programacion.html" },
    { tipo: "Producción en clase", t: "Verificador de contraseñas", imagen: "assets/img/evidencias/app-contrasenas.jpg", d: "Programación web aplicada a la seguridad digital.", u: "descargas/proyectos/contrasenas/index.html" },
    { tipo: "Recurso digital", t: "Ruta de aprendizaje", imagen: "assets/img/evidencias/ruta.jpg", d: "Niveles con progreso, para avanzar a ritmo propio.", u: "ruta.html?id=intro-programacion" },
    { tipo: "IA en el aula", t: "Constructor de prompts", imagen: "assets/img/evidencias/ia-prompts.jpg", d: "Formular buenas preguntas y verificar las respuestas.", u: "ia.html#prompts" },
  ],
  evidenciasNota: "Las producciones de estudiantes se sumarán con autorización de las familias y sin datos personales.",

  // Proyectos
  destacado: {
    tipo: "Proyecto destacado · Educativo y tecnológico",
    nombre: "Plataforma educativa abierta",
    que: "La diseñé y la desarrollé para que mis estudiantes —y cualquier persona— tengan apuntes, rutas de aprendizaje, ejercicios, proyectos y herramientas de IA en un solo lugar, a su ritmo.",
    imagen: "assets/img/evidencias/plataforma.jpg",
    alt: "Portada de la plataforma educativa con el lema Aprender tecnología haciendo.",
    demuestra: ["Desarrollo web al servicio de la enseñanza", "Diseño de materiales y recorridos", "Accesibilidad y uso desde el celular"],
    tecnologias: ["HTML", "CSS", "JavaScript", "Git/GitHub"],
    estado: "En desarrollo",
    enlaces: [{ t: "Ver la plataforma", u: "index.html" }, { t: "Código", u: "https://github.com/Sebastian5016/sebastian5016.github.io" }],
  },
  otros: [
    { nombre: "TecnoMayores — «Tecnología a tu ritmo»", tipo: "Educativo", d: "Programa propio de inclusión digital para adultos mayores: celular, WhatsApp, trámites y seguridad.", estado: "En curso", u: "proyecto.html?id=tecnomayores" },
    { nombre: "Proyectos didácticos", tipo: "Educativo", d: "Programación, bases de datos, redes, web y seguridad, con consigna, código y actividad.", estado: "Publicado", u: "proyectos.html?tipo=educativo" },
    { nombre: "Semáforo con Arduino", tipo: "Robótica", d: "Primer proyecto de programación física: LEDs, pines y funciones.", estado: "En desarrollo", u: "proyecto.html?id=semaforo-arduino" },
    { nombre: "El Paisa Servicios Integrales", tipo: "Profesional", d: "Sitio web y aplicaciones de gestión para mi emprendimiento, desde 2012.", estado: "En uso", u: "https://sebastian5016.github.io/ELPAISA/" },
  ],

  // Experiencia: evolución
  etapasTitulo: "Cada etapa agregó algo que hoy llevo al aula.",
  etapas: ["Experiencia profesional", "Liderazgo", "Formación", "Tecnología", "Coordinación educativa", "Docencia"],
  experiencia: [
    { periodo: "Actualidad", cargo: "Profesor de NTICx y Lenguajes Tecnológicos", lugar: "Escuelas secundarias de La Matanza", aporta: "" },
    { periodo: "2026 – actualidad", cargo: "Creador y docente — TecnoMayores", lugar: "Inclusión digital para adultos mayores", aporta: "Enseñanza adaptada a cada ritmo" },
    { periodo: "2021 – 2026", cargo: "Coordinador de Educación", lugar: "Ministerio de Justicia de la Provincia de Buenos Aires", aporta: "Acompañamiento de trayectorias y articulación con escuelas" },
    { periodo: "2017 – 2021", cargo: "Instructor de personal", lugar: "Servicio Penitenciario Bonaerense", aporta: "Capacitación y formación de personas" },
    { periodo: "2012 – actualidad", cargo: "Titular — El Paisa Servicios Integrales", lugar: "Desarrollo web y aplicaciones de gestión", aporta: "Tecnología aplicada a problemas reales" },
    { periodo: "2000 – 2026", cargo: "Ministerio de Justicia de la Provincia de Buenos Aires", lugar: "Instrucción, coordinación y conducción de equipos · Retirado", aporta: "Liderazgo, organización y toma de decisiones" },
  ],

  // Formación (estado explícito)
  formacion: [
    { grupo: "Formación docente", t: "Tramo pedagógico de nivel superior", i: "", a: "", estado: "en curso" },
    { grupo: "Formación superior", t: "Técnico Superior en Análisis y Programación de Aplicaciones", i: "ISFDyT N.º 46, Ramos Mejía", a: "2026", estado: "en trámite", destacado: true },
    { grupo: "Formación tecnológica", t: "Diplomatura en Ciberseguridad", i: "Universidad Nacional del Nordeste (UNNE)", a: "2024", estado: "certificado" },
    { grupo: "Formación superior", t: "Técnico Superior en Seguridad Institucional", i: "", a: "2009", estado: "obtenido" },
    { grupo: "Formación técnica", t: "Técnico en Refrigeración Industrial", i: "Universidad Tecnológica Nacional (UTN)", a: "2014", estado: "obtenido" },
  ],
  estadosFormacion: { "obtenido": "Título obtenido", "certificado": "Certificación obtenida", "en trámite": "Título en trámite", "en curso": "En curso" },
  credenciales: [{ t: "Inscripción docente DGCyE", d: "Listado 108 A 2027" }],
  idiomas: [{ t: "Español", n: "Nativo" }, { t: "Inglés", n: "Intermedio (B1)" }],

  // Competencias y tecnologías (compacto)
  competencias: [
    { t: "Pedagógicas", items: ["Planificación", "Comunicación clara", "Acompañamiento", "Aprendizaje basado en problemas", "Trabajo por proyectos", "Alfabetización digital"] },
    { t: "Profesionales", items: ["Organización", "Coordinación", "Liderazgo", "Trabajo en equipo", "Resolución de problemas"] },
  ],
  tecnologias: [
    { t: "Programación", items: ["Python", "C", "C++", "Java", "JavaScript", "VB.NET"] },
    { t: "Desarrollo web", items: ["HTML", "CSS", "React", "Next.js", "Node.js", "Express"] },
    { t: "Bases de datos", items: ["MySQL", "SQL Server", "PostgreSQL", "Prisma"] },
    { t: "Tecnología educativa", items: ["Arduino", "IA", "Herramientas digitales", "Plataformas educativas"] },
    { t: "Otros", items: ["Redes", "POO", "PLC", "SAP"] },
  ],

  // Cierre
  ctaTitulo: "¿Buscás un docente de Informática, NTICx o Tecnología?",
  ctaTexto: "Estoy disponible para incorporarme a instituciones educativas, proyectos institucionales y propuestas de formación tecnológica.",
};
