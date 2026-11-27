/* ==========================================================================
   PERFIL PROFESIONAL — fuente única del portfolio (portfolio.html) y del CV
   público en PDF (descargas/cv/). Posicionamiento: primero docente, con la
   tecnología y la experiencia profesional como diferencial.
   REGLA: solo información real y verificable (CV de W. S. Fernández y datos
   indicados por él). Si un dato no está confirmado, se deja fuera.
   Para sumar un proyecto: agregar un objeto en `proyectosTec` o `proyectosEdu`.
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

  // Datos visibles en la portada (respuesta en 20 segundos)
  hoy: {
    titulo: "Hoy enseño",
    items: ["NTICx en EES N.º 38 y ES N.º 178 «Padre Bachi»", "Lenguajes Tecnológicos en EEST N.º 10"],
  },
  claves: [
    { t: "Docente de NTICx", d: "y Lenguajes Tecnológicos · 3 escuelas" },
    { t: "Técnico Superior", d: "Análisis y Programación de Aplicaciones" },
    { t: "Diplomatura", d: "Ciberseguridad · UNNE" },
    { t: "+25 años", d: "de coordinación, capacitación y conducción de equipos" },
  ],

  // Sobre mí: la trayectoria como fortaleza
  sobreMi: [
    "Soy profesor de Informática y Tecnología. Enseño NTICx y Lenguajes Tecnológicos en escuelas secundarias de La Matanza, y llevo adelante TecnoMayores, un proyecto propio de inclusión digital para adultos mayores.",
    "Llegué al aula con una trayectoria profesional amplia. Durante más de 25 años trabajé en el Ministerio de Justicia de la Provincia de Buenos Aires en tareas de instrucción, coordinación y conducción de equipos, y entre 2021 y 2026 coordiné el acompañamiento de trayectorias educativas, articulando con escuelas y docentes. Esa experiencia me enseñó a organizar, a comunicar con claridad y a acompañar a personas con recorridos muy distintos.",
    "En paralelo me formé en tecnología: soy Técnico Superior en Análisis y Programación de Aplicaciones (título en trámite), tengo una Diplomatura en Ciberseguridad (UNNE) y desde 2012 desarrollo sitios web y aplicaciones de gestión. Hoy curso el tramo pedagógico de nivel superior.",
  ],
  diferencial: "Mi diferencial no está únicamente en conocer tecnología. Está en poder combinar conocimientos técnicos, experiencia profesional, capacidad de organización y formación docente para convertir la tecnología en una herramienta de aprendizaje.",

  // Qué puedo aportar a una institución
  aportes: [
    { icono: "learn", t: "Tecnología aplicada al aprendizaje", d: "Integración de herramientas digitales, programación y recursos tecnológicos para desarrollar pensamiento lógico y resolución de problemas." },
    { icono: "code", t: "Formación tecnológica", d: "Programación, sistemas, bases de datos, desarrollo web y herramientas digitales, con formación técnica superior." },
    { icono: "briefcase", t: "Experiencia profesional", d: "Una trayectoria amplia que aporta organización, responsabilidad, comunicación, resolución de problemas y trabajo en equipo." },
    { icono: "users", t: "Trabajo con estudiantes", d: "Propuestas prácticas, claras y progresivas, que contemplan diferentes ritmos y niveles de conocimiento." },
    { icono: "layers", t: "Proyectos", d: "Transformar contenidos tecnológicos en actividades, proyectos y producciones concretas." },
    { icono: "school", t: "Trabajo institucional", d: "Integrarme a equipos docentes, proyectos interdisciplinarios y objetivos institucionales, con experiencia en articulación con escuelas." },
  ],

  // Propuesta docente
  ensenanza: [
    "Enseñar informática no consiste solamente en enseñar a usar herramientas. Busco que mis estudiantes comprendan cómo funciona la tecnología, desarrollen pensamiento lógico, resuelvan problemas y puedan crear con los recursos digitales, usándolos de manera responsable.",
    "Por eso trabajo con situaciones concretas, cercanas a ellos, y dejo espacio para probar, equivocarse y volver a intentar. El error es información: muestra qué entendimos y qué falta. Y respeto los distintos ritmos, porque no todos llegan al aula desde el mismo lugar.",
  ],
  busco: ["Aprendizaje significativo", "Pensamiento lógico y crítico", "Trabajo por proyectos", "Acompañamiento de trayectorias", "Inclusión y distintos ritmos", "Ciudadanía digital", "Uso responsable de la IA"],
  proceso: [
    { t: "Desafío", d: "Presentar un problema, una pregunta o una situación." },
    { t: "Exploración", d: "Observar, investigar, probar y formular hipótesis." },
    { t: "Explicación", d: "Construir juntos los conceptos necesarios." },
    { t: "Práctica", d: "Resolver actividades de dificultad progresiva." },
    { t: "Producción", d: "Crear una solución, un proyecto o un producto." },
    { t: "Reflexión", d: "Revisar lo aprendido, detectar errores y comunicar resultados." },
  ],
  procesoNota: "No es una receta rígida: es la forma en que suelo organizar las experiencias de aprendizaje. Se adapta al grupo, al tema y al tiempo disponible.",

  // Áreas (con evidencia real de cada una)
  areas: [
    { t: "NTICx", d: "Lo enseño actualmente en EES N.º 38 y ES N.º 178.", principal: true },
    { t: "Informática", d: "Hardware, sistemas, redes, bases de datos y ofimática.", principal: true },
    { t: "Programación", d: "Lenguajes Tecnológicos en EEST N.º 10. Técnico Superior en Análisis y Programación.", principal: true },
    { t: "Tecnología", d: "Sistemas, redes y seguridad, con base técnica y profesional.", principal: true },
    { t: "Alfabetización digital", d: "Desde estudiantes secundarios hasta adultos mayores (TecnoMayores)." },
    { t: "Pensamiento computacional", d: "Descomposición, patrones, abstracción y algoritmos." },
    { t: "Herramientas digitales", d: "Ofimática, entornos colaborativos y recursos para el aula." },
    { t: "Ciudadanía digital", d: "Seguridad, privacidad y uso responsable. Diplomatura en Ciberseguridad." },
  ],
  niveles: ["Secundaria", "Educación Técnico-Profesional", "Formación de adultos"],
  habilitacion: "Inscripción docente DGCyE — Listado 108 A 2027",

  // Proyectos tecnológicos (qué demuestran profesionalmente)
  proyectosTec: [
    {
      nombre: "Plataforma educativa y portfolio",
      descripcion: "Este sitio: portfolio profesional y biblioteca abierta de informática con apuntes, rutas de aprendizaje, proyectos y herramientas para el aula.",
      problema: "Los materiales de clase quedan dispersos y los estudiantes no tienen dónde consultarlos a su ritmo.",
      tecnologias: ["HTML", "CSS", "JavaScript", "Git/GitHub"],
      demuestra: ["Desarrollo web", "Organización de contenidos", "Accesibilidad", "Diseño para estudiantes"],
      estado: "En desarrollo",
      enlaces: [{ t: "Ver la plataforma", u: "index.html" }, { t: "Código en GitHub", u: "https://github.com/Sebastian5016/sebastian5016.github.io" }],
    },
    {
      nombre: "El Paisa Servicios Integrales",
      descripcion: "Sitio web y aplicaciones de gestión para mi emprendimiento de servicios técnicos, en funcionamiento desde 2012.",
      problema: "Un emprendimiento necesita mostrar sus servicios, recibir consultas y organizar el trabajo diario.",
      tecnologias: ["HTML", "CSS", "JavaScript", "Git/GitHub"],
      demuestra: ["Proyecto real sostenido en el tiempo", "Desarrollo y mantenimiento", "Resolución de problemas"],
      estado: "En uso",
      enlaces: [{ t: "Ver sitio", u: "https://sebastian5016.github.io/ELPAISA/" }, { t: "Código en GitHub", u: "https://github.com/Sebastian5016/ELPAISA" }],
    },
  ],

  // Proyectos y recursos educativos (publicados en la plataforma)
  proyectosEdu: [
    { nombre: "TecnoMayores — «Tecnología a tu ritmo»", tipo: "Experiencia educativa", descripcion: "Programa propio de seis semanas de inclusión digital para adultos mayores: celular, WhatsApp, trámites y seguridad, con materiales y juegos didácticos propios.", enlace: { t: "Ver el proyecto", u: "proyecto.html?id=tecnomayores" } },
    { nombre: "Proyectos para trabajar en clase", tipo: "Propuestas de programación", descripcion: "Calculadora en Python, sistema de notas en SQL, red de una escuela, verificador de contraseñas, primera página web y otros, con consigna, código y actividad.", enlace: { t: "Ver los proyectos", u: "proyectos.html?tipo=educativo" } },
    { nombre: "Apuntes y rutas de aprendizaje", tipo: "Materiales para estudiantes", descripcion: "Apuntes descargables en PDF y recorridos paso a paso de programación, desarrollo web, bases de datos e IA.", enlace: { t: "Ver los materiales", u: "materiales.html" } },
    { nombre: "IA con criterio en el aula", tipo: "Ciudadanía digital", descripcion: "Guía de uso responsable, ejemplos de buenas y malas consignas, constructor de prompts y lista de verificación para estudiantes.", enlace: { t: "Ver la sección", u: "ia.html" } },
  ],
  proyectosEduNota: "Este espacio va creciendo: cada nuevo proyecto o experiencia de aula se suma a la plataforma.",

  // Tecnologías (sin niveles de dominio)
  tecnologias: [
    { t: "Programación", items: ["Python", "Java", "C/C++", "JavaScript", "VB.NET"] },
    { t: "Desarrollo web", items: ["HTML", "CSS", "React", "Node.js"] },
    { t: "Bases de datos", items: ["MySQL", "SQL Server", "PostgreSQL"] },
    { t: "Herramientas y entornos", items: ["Visual Studio", "VS Code", "Git/GitHub"] },
    { t: "IA y nuevas tecnologías", items: ["Herramientas de IA generativa para el aula"] },
  ],

  // Experiencia
  expDocente: [
    { cargo: "Profesor de NTICx y Lenguajes Tecnológicos", lugar: "EES N.º 38 (Villa Madero) · ES N.º 178 «Padre Bachi» (San Justo) · EEST N.º 10 (Villa Madero)", periodo: "Actualidad", texto: "NTICx en 4.º año y Lenguajes Tecnológicos en 2.º año de escuela técnica.", actual: true },
    { cargo: "Creador y docente — Proyecto TecnoMayores", lugar: "«Tecnología a tu ritmo» · Adultos mayores", periodo: "2026 – actualidad", texto: "Inclusión digital con enseñanza adaptada al ritmo de cada participante." },
    { cargo: "Coordinador de Educación", lugar: "Ministerio de Justicia de la Provincia de Buenos Aires", periodo: "2021 – 2026", texto: "Acompañamiento de trayectorias educativas diversas y discontinuas. Articulación con escuelas y docentes." },
  ],
  expProfesional: [
    { cargo: "Titular — El Paisa Servicios Integrales", lugar: "Ramos Mejía", periodo: "2012 – actualidad", texto: "Plataforma de servicios técnicos. Desarrollo web y aplicaciones de gestión.", aporta: "Desarrollo, resolución técnica de problemas" },
    { cargo: "Instructor de personal", lugar: "Servicio Penitenciario Bonaerense", periodo: "2017 – 2021", texto: "Instrucción práctica y formación del personal.", aporta: "Capacitación y formación de personas" },
    { cargo: "Ministerio de Justicia de la Provincia de Buenos Aires", lugar: "Trayectoria completa · Retirado", periodo: "2000 – 2026", texto: "Funciones de instrucción, coordinación y conducción de equipos.", aporta: "Coordinación, liderazgo y trabajo bajo presión" },
  ],
  expAporta: ["Coordinación", "Liderazgo", "Capacitación", "Organización", "Responsabilidad", "Comunicación", "Resolución de problemas", "Trabajo bajo presión", "Trabajo en equipo", "Toma de decisiones", "Formación de personas"],

  // Formación (prioridad: docente → superior → tecnológica → otras)
  formacion: [
    { grupo: "Formación docente", t: "Tramo pedagógico de nivel superior", i: "", a: "En curso" },
    { grupo: "Formación docente", t: "Inscripción docente DGCyE", i: "Listado 108 A 2027", a: "Habilitación vigente" },
    { grupo: "Formación superior", t: "Técnico Superior en Análisis y Programación de Aplicaciones", i: "ISFDyT N.º 46, Ramos Mejía", a: "2026 · título en trámite", destacado: true },
    { grupo: "Formación tecnológica", t: "Diplomatura en Ciberseguridad", i: "Universidad Nacional del Nordeste (UNNE)", a: "2024" },
    { grupo: "Formación técnica", t: "Técnico en Refrigeración Industrial", i: "Universidad Tecnológica Nacional (UTN)", a: "2014" },
    { grupo: "Formación superior", t: "Técnico Superior en Seguridad Institucional", i: "", a: "2009" },
  ],
  idiomas: [{ t: "Español", n: "Nativo" }, { t: "Inglés", n: "Intermedio (B1)" }],

  // Competencias
  competencias: [
    { t: "Pedagógicas", items: ["Comunicación clara", "Planificación", "Acompañamiento de estudiantes", "Aprendizaje basado en problemas", "Trabajo por proyectos", "Alfabetización digital"] },
    { t: "Tecnológicas", items: ["Programación", "Bases de datos", "Desarrollo web", "Herramientas digitales", "IA aplicada al aula", "Resolución técnica de problemas"] },
    { t: "Profesionales", items: ["Organización", "Coordinación", "Liderazgo", "Trabajo en equipo", "Comunicación", "Resolución de problemas", "Responsabilidad"] },
  ],
};
