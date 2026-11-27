/* ==========================================================================
   PERFIL PROFESIONAL — fuente única del portfolio (portfolio.html) y del CV
   público en PDF (descargas/cv/). Jerarquía: docencia → experiencia docente
   actual → propuesta pedagógica → tecnología → experiencia profesional →
   proyectos → formación → detalles técnicos.
   REGLA: solo información real (CV de W. S. Fernández y datos indicados por él).
   Evidencias: solo material real publicado. Para sumar una, agregar un objeto
   en `evidencias` (con `imagen` o sin ella: se muestra como espacio reservado).
   ========================================================================== */
window.WF = window.WF || {};
WF.perfil = {
  nombre: "Walter Sebastián Fernández",
  titulo: "Profesor de Informática | NTICx | Tecnología Educativa",
  propuesta: "Docencia, tecnología y experiencia profesional al servicio del aprendizaje.",
  bajada: "Docente con formación tecnológica y experiencia profesional en programación, sistemas, capacitación y coordinación. Orientado a integrar tecnología, pensamiento lógico y resolución de problemas en propuestas de aprendizaje significativas.",
  ubicacion: "Ramos Mejía, La Matanza · Buenos Aires",
  foto: "assets/img/walter.jpg",
  fotoAlt: "Retrato de Walter Sebastián Fernández, sonriendo, con camisa celeste y suéter oscuro.",
  cv: "descargas/cv/CV-Walter-Sebastian-Fernandez.pdf",

  // Portada: lo que hoy hace (respuesta en 20 segundos)
  hoy: ["NTICx en EES N.º 38 y ES N.º 178 «Padre Bachi»", "Lenguajes Tecnológicos en EEST N.º 10"],
  claves: [
    { t: "Docente en 3 escuelas", d: "NTICx y Lenguajes Tecnológicos" },
    { t: "Formación técnica superior", d: "Análisis y Programación · Ciberseguridad" },
    { t: "+25 años", d: "de experiencia profesional en coordinación y capacitación" },
  ],
  lema: "Gestión, técnica y aula: tres experiencias que normalmente no conviven en un mismo perfil docente.",

  // Quién soy
  quienSoy: "Soy profesor de Informática y Tecnología en escuelas secundarias de La Matanza. Antes de llegar al aula trabajé más de 25 años en coordinación, capacitación y conducción de equipos; en paralelo me formé como Técnico Superior en Análisis y Programación y desarrollé proyectos web propios. Hoy curso el tramo pedagógico de nivel superior. Mi diferencial está en combinar esos conocimientos técnicos, esa experiencia profesional y la formación docente para convertir la tecnología en una herramienta de aprendizaje.",
  etapasTitulo: "Cada etapa agregó algo que hoy llevo al aula",
  etapas: [
    { t: "Gestión y coordinación", d: "Organización, liderazgo, toma de decisiones y trabajo en contextos complejos." },
    { t: "Capacitación", d: "Formación de personas con distintos puntos de partida." },
    { t: "Tecnología", d: "Programación, sistemas y proyectos web reales." },
    { t: "Docencia", d: "Enseñanza de NTICx y Lenguajes Tecnológicos." },
  ],

  // Experiencia docente actual (prioritaria, datos del CV)
  docenciaActual: [
    { escuela: "EES N.º 38", lugar: "Villa Madero", nivel: "Secundaria", materia: "NTICx", cursos: "4.º 1.ª y 4.º 2.ª" },
    { escuela: "ES N.º 178 «Padre Bachi»", lugar: "San Justo", nivel: "Secundaria", materia: "NTICx", cursos: "4.º 1.ª" },
    { escuela: "EEST N.º 10", lugar: "Villa Madero", nivel: "Educación Técnico-Profesional", materia: "Lenguajes Tecnológicos", cursos: "2.º 4.ª" },
  ],
  docenciaPeriodo: "Actualidad",

  // Qué puedo aportar: tres destinatarios, tres funciones distintas
  aportes: [
    { para: "A los estudiantes", foco: "Aprender haciendo", items: ["Aprendizaje significativo y acompañamiento", "Pensamiento lógico y resolución de problemas", "Creatividad y participación", "Uso responsable de la tecnología"] },
    { para: "Al equipo docente", foco: "Sumar herramientas", items: ["Colaboración y recursos digitales", "Tecnología educativa e IA responsable", "Proyectos compartidos", "Acompañamiento tecnológico a colegas"] },
    { para: "A la institución", foco: "Sostener proyectos", items: ["Proyectos tecnológicos e interdisciplinarios", "Organización y experiencia profesional", "Capacidad técnica propia", "Articulación con equipos y escuelas"] },
  ],

  // Cómo entiendo la enseñanza
  ensenanza: "Enseñar informática no es enseñar a usar programas. Busco que mis estudiantes entiendan cómo funciona la tecnología, piensen con lógica, resuelvan problemas y creen con ella de forma responsable.",
  enfoque: [
    { t: "Aprendizaje significativo", d: "Partimos de problemas reales y cercanos." },
    { t: "Tecnología con sentido", d: "Las herramientas se eligen por lo que permiten hacer." },
    { t: "El error como información", d: "Para corregir y mejorar, no para sancionar." },
    { t: "Acompaño trayectorias diversas", d: "Cada estudiante tiene su ritmo y su punto de partida." },
    { t: "Pensamiento crítico", d: "Preguntar de dónde viene la información." },
    { t: "Participación", d: "Cada uno tiene algo para hacer y algo para aportar." },
  ],
  estudiante: [
    { t: "Resolver", d: "Problemas y desafíos tecnológicos." },
    { t: "Crear", d: "Aplicaciones, producciones y proyectos." },
    { t: "Comprender", d: "Cómo funcionan las tecnologías." },
    { t: "Pensar", d: "Lógica, análisis y pensamiento crítico." },
    { t: "Experimentar", d: "Prueba, error y mejora." },
    { t: "Usar con responsabilidad", d: "Tecnología, información e IA." },
  ],
  ia: {
    t: "IA con criterio",
    d: "La inteligencia artificial es una herramienta para aprender, investigar, preguntar, comparar, crear y revisar; no un sustituto del pensamiento del estudiante. La uso como un tutor que hace preguntas, no como un atajo.",
    enlace: { t: "Ver la guía de IA para el aula", u: "ia.html" },
  },

  // Cómo trabajo en el aula
  proceso: [
    { t: "Desafío", d: "Partir de una situación, un problema o una pregunta." },
    { t: "Exploración", d: "Investigar, probar y formular hipótesis." },
    { t: "Comprensión", d: "Construir los conceptos necesarios." },
    { t: "Práctica", d: "Resolver actividades progresivas." },
    { t: "Producción", d: "Crear una solución o un proyecto." },
    { t: "Reflexión", d: "Revisar, explicar, corregir y compartir lo aprendido." },
  ],
  procesoNota: "No es una metodología rígida: es una forma de organizar las experiencias de aprendizaje, que se adapta al grupo y al tema.",

  // Así se ve mi trabajo (material real publicado en la plataforma)
  evidencias: [
    { tipo: "Material didáctico", t: "Apunte de introducción a la programación", imagen: "assets/img/evidencias/apunte.jpg", alt: "Página del apunte Introducción a la programación con Python, con objetivos, explicación y ejemplo de algoritmo.", trabaja: "Algoritmos, variables, condicionales y bucles, con objetivos y actividad final.", demuestra: "Diseño de materiales propios y lenguaje claro para estudiantes.", u: "apuntes/introduccion-programacion.html" },
    { tipo: "Actividad de programación", t: "Calculadora en Python, paso a paso", imagen: "assets/img/evidencias/proyecto-codigo.jpg", alt: "Ficha del proyecto Calculadora en Python mostrando el código comentado.", trabaja: "Funciones, validación de datos y manejo de errores, a partir de un problema.", demuestra: "Programación, resolución de problemas y aprendizaje práctico.", u: "proyecto.html?id=calculadora-python" },
    { tipo: "Producción en clase", t: "Verificador de contraseñas", imagen: "assets/img/evidencias/app-contrasenas.jpg", alt: "Aplicación web Verificador de contraseñas evaluando una contraseña de prueba como fuerte.", trabaja: "Programación web y seguridad digital: una aplicación que funciona en el navegador.", demuestra: "Ciudadanía digital llevada a un producto concreto.", u: "descargas/proyectos/contrasenas/index.html" },
    { tipo: "Recurso digital", t: "Ruta de aprendizaje con progreso", imagen: "assets/img/evidencias/ruta.jpg", alt: "Ruta de aprendizaje Introducción a la programación, con niveles completados y barra de progreso.", trabaja: "Un recorrido por niveles para avanzar a ritmo propio.", demuestra: "Acompañamiento de distintos ritmos y autonomía del estudiante.", u: "ruta.html?id=intro-programacion" },
    { tipo: "IA en el aula", t: "Constructor de prompts", imagen: "assets/img/evidencias/ia-prompts.jpg", alt: "Herramienta Constructor de prompts con un ejemplo de consigna para estudiar.", trabaja: "Formular buenas preguntas a la IA y verificar sus respuestas.", demuestra: "Uso responsable y crítico de la inteligencia artificial.", u: "ia.html#prompts" },
    { tipo: "Producciones de estudiantes", t: "Espacio reservado", imagen: "", trabaja: "Se publicarán con autorización de las familias y sin datos personales.", demuestra: "Cuidado de la privacidad de los estudiantes.", u: "" },
  ],
  evidenciasNota: "Todo el material está publicado en la plataforma educativa y puede abrirse.",

  // Áreas (foco: secundaria, ETP, Informática, NTICx, Tecnología)
  areas: [
    { t: "Informática", principal: true },
    { t: "NTICx", d: "Actualmente en EES N.º 38 y ES N.º 178", principal: true },
    { t: "Tecnología", principal: true },
    { t: "Programación", d: "Lenguajes Tecnológicos en EEST N.º 10", principal: true },
    { t: "Pensamiento computacional" },
    { t: "Alfabetización digital" },
    { t: "Ciudadanía digital" },
    { t: "Herramientas digitales" },
  ],
  niveles: ["Secundaria", "Educación Técnico-Profesional", "Formación de adultos"],

  // Proyectos (evidencia, no decoración)
  proyectos: [
    { tipo: "Proyecto educativo", nombre: "TecnoMayores — «Tecnología a tu ritmo»", que: "Programa propio de seis semanas de inclusión digital para adultos mayores: celular, WhatsApp, trámites y seguridad.", problema: "Personas mayores que dependen de otros para usar el celular y quedan expuestas a estafas.", tecnologias: ["Alfabetización digital", "Materiales y juegos propios"], demuestra: "Capacidad pedagógica, adaptación y trabajo con estudiantes de otros perfiles.", estado: "En curso", enlaces: [{ t: "Ver el proyecto", u: "proyecto.html?id=tecnomayores" }] },
    { tipo: "Proyecto tecnológico", nombre: "Plataforma educativa y portfolio", que: "Este sitio: portfolio y biblioteca abierta de informática con apuntes, rutas, proyectos y herramientas para el aula.", problema: "Materiales de clase dispersos, sin un lugar donde consultarlos a ritmo propio.", tecnologias: ["HTML", "CSS", "JavaScript", "Git/GitHub"], demuestra: "Desarrollo web al servicio de la enseñanza, organización y accesibilidad.", estado: "En desarrollo", enlaces: [{ t: "Ver la plataforma", u: "index.html" }, { t: "Código", u: "https://github.com/Sebastian5016/sebastian5016.github.io" }] },
    { tipo: "Proyecto profesional", nombre: "El Paisa Servicios Integrales", que: "Sitio web y aplicaciones de gestión para mi emprendimiento de servicios técnicos, desde 2012.", problema: "Mostrar servicios, recibir consultas y organizar el trabajo diario.", tecnologias: ["HTML", "CSS", "JavaScript"], demuestra: "Iniciativa, gestión y tecnología aplicada a un caso real.", estado: "En uso", enlaces: [{ t: "Ver sitio", u: "https://sebastian5016.github.io/ELPAISA/" }] },
  ],

  // Experiencia profesional y educativa previa
  experiencia: [
    { cargo: "Coordinador de Educación", lugar: "Ministerio de Justicia de la Provincia de Buenos Aires", periodo: "2021 – 2026", texto: "Acompañamiento de trayectorias educativas diversas y discontinuas. Articulación con escuelas y docentes.", aporta: "Acompañamiento, articulación institucional" },
    { cargo: "Instructor de personal", lugar: "Servicio Penitenciario Bonaerense", periodo: "2017 – 2021", texto: "Instrucción práctica y formación del personal.", aporta: "Capacitación y formación de personas" },
    { cargo: "Titular — El Paisa Servicios Integrales", lugar: "Ramos Mejía", periodo: "2012 – actualidad", texto: "Desarrollo web y aplicaciones de gestión.", aporta: "Desarrollo y resolución técnica de problemas" },
    { cargo: "Ministerio de Justicia de la Provincia de Buenos Aires", lugar: "Trayectoria completa · Retirado", periodo: "2000 – 2026", texto: "Instrucción, coordinación y conducción de equipos.", aporta: "Liderazgo, organización y toma de decisiones" },
  ],
  expAporta: ["Liderazgo", "Coordinación", "Capacitación", "Organización", "Responsabilidad", "Comunicación", "Resolución de problemas", "Trabajo en equipo", "Toma de decisiones"],

  // Formación (estado explícito: obtenido · en trámite · en curso)
  formacion: [
    { grupo: "Formación docente", t: "Tramo pedagógico de nivel superior", i: "", a: "", estado: "en curso" },
    { grupo: "Formación superior", t: "Técnico Superior en Análisis y Programación de Aplicaciones", i: "ISFDyT N.º 46, Ramos Mejía", a: "2026", estado: "en trámite", destacado: true },
    { grupo: "Formación tecnológica", t: "Diplomatura en Ciberseguridad", i: "Universidad Nacional del Nordeste (UNNE)", a: "2024", estado: "certificado" },
    { grupo: "Formación técnica", t: "Técnico en Refrigeración Industrial", i: "Universidad Tecnológica Nacional (UTN)", a: "2014", estado: "obtenido" },
    { grupo: "Formación superior", t: "Técnico Superior en Seguridad Institucional", i: "", a: "2009", estado: "obtenido" },
  ],
  estadosFormacion: { "obtenido": "Título obtenido", "certificado": "Certificación obtenida", "en trámite": "Título en trámite", "en curso": "En curso" },
  credenciales: [{ t: "Inscripción docente DGCyE", d: "Listado 108 A 2027" }],
  idiomas: [{ t: "Español", n: "Nativo" }, { t: "Inglés", n: "Intermedio (B1)" }],

  // Competencias y tecnologías
  competencias: [
    { t: "Pedagógicas", items: ["Comunicación clara", "Planificación", "Acompañamiento de estudiantes", "Aprendizaje basado en problemas", "Trabajo por proyectos", "Alfabetización digital"] },
    { t: "Profesionales", items: ["Organización", "Coordinación", "Liderazgo", "Trabajo en equipo", "Resolución de problemas", "Responsabilidad"] },
  ],
  tecnologias: [
    { t: "Programación", items: ["Python", "Java", "C/C++", "JavaScript", "VB.NET"] },
    { t: "Desarrollo web", items: ["HTML", "CSS", "React", "Node.js", "Next.js"] },
    { t: "Bases de datos", items: ["MySQL", "SQL Server", "PostgreSQL"] },
    { t: "Herramientas", items: ["Visual Studio", "VS Code", "Git/GitHub"] },
    { t: "IA y tecnología", items: ["Herramientas de IA generativa aplicadas al aula"] },
  ],

  // Cierre
  ctaTitulo: "¿Buscás un docente de Informática, NTICx o Tecnología?",
  ctaTexto: "Estoy disponible para incorporarme a instituciones educativas, proyectos institucionales y propuestas de formación tecnológica.",
};
