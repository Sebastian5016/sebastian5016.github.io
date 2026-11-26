/* ==========================================================================
   PERFIL PROFESIONAL — fuente única del portfolio (portfolio.html)
   REGLA: solo información real y verificable. Si un dato no está confirmado,
   se deja fuera. Fuentes: CV de W. S. Fernández + tecnologías indicadas por él.
   Para agregar un proyecto: sumar un objeto a `proyectos` (estado:
   "finalizado" | "desarrollo" | "concepto").
   ========================================================================== */
window.WF = window.WF || {};
WF.perfil = {
  nombre: "Walter Sebastián Fernández",
  rol: "Docente de Informática · Tecnología · Educación Digital",
  frase: "Experiencia profesional, formación técnica y tecnología aplicadas a la educación.",
  ubicacion: "Ramos Mejía, La Matanza · Buenos Aires",
  foto: "assets/img/walter.jpg",
  fotoAlt: "Retrato de Walter Sebastián Fernández, sonriendo, con camisa celeste y suéter oscuro.",

  sobreMi: [
    "Soy docente de Informática y Tecnología. Antes de llegar al aula trabajé más de 25 años en el Ministerio de Justicia de la Provincia de Buenos Aires, en funciones de instrucción, coordinación y conducción de equipos. Entre 2021 y 2026 coordiné el acompañamiento de trayectorias educativas y la articulación con escuelas y docentes.",
    "En paralelo me formé en tecnología. Soy Técnico Superior en Análisis y Programación de Aplicaciones (título en trámite) y tengo una Diplomatura en Ciberseguridad (UNNE). Desde 2012 desarrollo sitios web y aplicaciones de gestión para mi propio emprendimiento.",
    "Hoy enseño NTICx y Lenguajes Tecnológicos en escuelas secundarias de La Matanza, curso el tramo pedagógico de nivel superior y llevo adelante TecnoMayores, un proyecto propio de inclusión digital para adultos mayores.",
  ],
  sintesis: "Gestión, técnica y aula: tres experiencias que normalmente no conviven en un mismo perfil docente.",

  // Una trayectoria diferente: 4 ejes con datos reales
  ejes: [
    { id: "experiencia", titulo: "Experiencia", dato: "+25", unidad: "años", detalle: "en el Ministerio de Justicia de la Provincia de Buenos Aires (2000–2026).", texto: "Instrucción, coordinación y conducción de equipos en un entorno exigente, con responsabilidad real." },
    { id: "tecnologia", titulo: "Tecnología", dato: "2012", unidad: "", detalle: "desarrollando sitios web y aplicaciones de gestión.", texto: "Técnico Superior en Análisis y Programación. Diplomatura en Ciberseguridad (UNNE, 2024)." },
    { id: "educacion", titulo: "Educación", dato: "3", unidad: "escuelas", detalle: "secundarias de La Matanza, en NTICx y Lenguajes Tecnológicos.", texto: "Creador y docente de TecnoMayores, inclusión digital para adultos mayores." },
    { id: "gestion", titulo: "Gestión", dato: "2021–2026", unidad: "", detalle: "Coordinador de Educación.", texto: "Acompañamiento de trayectorias diversas y discontinuas, y articulación con escuelas y docentes." },
  ],

  // ¿Qué puedo aportar? — pensado desde la mirada de un director
  aportes: [
    { para: "Para los estudiantes", items: [
      { t: "Enseñanza tecnológica", d: "Informática, programación, redes y ciberseguridad con ejemplos reales, no solo de manual." },
      { t: "Pensamiento lógico", d: "Descomponer problemas, ordenar ideas y anticipar resultados." },
      { t: "Programación", d: "De la lógica y el pseudocódigo a proyectos que funcionan." },
      { t: "Resolución de problemas", d: "El error como información para corregir y mejorar." },
    ] },
    { para: "Para el equipo docente", items: [
      { t: "Capacitación", d: "Años de experiencia instruyendo personal y adultos con distintos niveles de partida." },
      { t: "Educación digital", d: "Herramientas digitales y uso responsable de la IA, con criterio pedagógico." },
      { t: "Adaptación tecnológica", d: "Acompañamiento a colegas en plataformas y herramientas nuevas." },
    ] },
    { para: "Para la institución", items: [
      { t: "Experiencia de gestión", d: "Coordinación educativa y conducción de equipos durante años." },
      { t: "Articulación", d: "Trabajo con escuelas, docentes y equipos directivos." },
      { t: "Compromiso con las trayectorias", d: "Seguimiento de estudiantes con recorridos diversos y discontinuos." },
    ] },
  ],

  // Experiencia: orden cronológico para mostrar la evolución
  experiencia: [
    { etapa: "Operativa y liderazgo", desde: "2000", hasta: "2026", cargo: "Ministerio de Justicia de la Provincia de Buenos Aires", lugar: "Trayectoria completa · Retirado", texto: "Funciones de instrucción, coordinación y conducción de equipos." },
    { etapa: "Tecnología", desde: "2012", hasta: "Actualidad", cargo: "Titular — El Paisa Servicios Integrales", lugar: "Ramos Mejía", texto: "Plataforma de servicios técnicos. Desarrollo web y aplicaciones de gestión." },
    { etapa: "Capacitación", desde: "2017", hasta: "2021", cargo: "Instructor de personal — Sección Cinotecnia", lugar: "Servicio Penitenciario Bonaerense", texto: "Instrucción práctica del personal. Guía y adiestrador de canes." },
    { etapa: "Coordinación", desde: "2021", hasta: "2026", cargo: "Coordinador de Educación", lugar: "Ministerio de Justicia de la Provincia de Buenos Aires", texto: "Acompañamiento de trayectorias educativas diversas y discontinuas. Articulación con escuelas y docentes." },
    { etapa: "Educación", desde: "2026", hasta: "Actualidad", cargo: "Creador y docente — Proyecto TecnoMayores", lugar: "«Tecnología a tu ritmo» · Adultos mayores", texto: "Inclusión digital adaptada al ritmo de cada participante. Programa de seis semanas: celular, WhatsApp, trámites y seguridad." },
    { etapa: "Educación", desde: "", hasta: "Actualidad", cargo: "Docente de NTICx y Lenguajes Tecnológicos", lugar: "EES N.º 38 · ES N.º 178 «Padre Bachi» · EEST N.º 10", texto: "Enseñanza de tecnologías de la información y lenguajes tecnológicos en nivel secundario.", actual: true },
  ],
  evolucion: ["Experiencia operativa", "Liderazgo", "Coordinación", "Capacitación", "Tecnología", "Educación"],

  // Tecnologías (sin niveles de dominio: no se muestran datos no respaldados)
  tecnologias: [
    { id: "programacion", titulo: "Programación", nota: "Lenguajes", items: ["C", "C++", "Python", "Java", "VB.NET", "JavaScript", "HTML", "CSS"] },
    { id: "desarrollo", titulo: "Desarrollo", nota: "Frameworks y entornos", items: ["React", "React Native", "Expo", "Node.js", "Express", "Next.js"] },
    { id: "datos", titulo: "Bases de datos", nota: "Motores y ORM", items: ["MySQL", "SQL Server", "PostgreSQL", "Prisma"] },
    { id: "otras", titulo: "Otras áreas", nota: "Conocimientos complementarios", items: ["Redes", "Sistemas", "POO", "PLC", "SAP", "IA", "Herramientas digitales"] },
  ],

  // Proyectos como casos
  proyectos: [
    {
      id: "plataforma", nombre: "Plataforma educativa y portfolio", tipo: "Desarrollo propio",
      descripcion: "Este mismo sitio: portfolio profesional y biblioteca abierta de informática con materiales, rutas de aprendizaje, proyectos didácticos y herramientas para el aula.",
      objetivo: "Reunir en un solo lugar mi trabajo profesional y materiales que mis alumnos —y cualquier persona— puedan usar a su ritmo.",
      tecnologias: ["HTML", "CSS", "JavaScript", "GitHub Pages"], estado: "desarrollo",
      enlaces: [{ t: "Ver plataforma", u: "index.html" }, { t: "Código en GitHub", u: "https://github.com/Sebastian5016/sebastian5016.github.io" }],
    },
    {
      id: "tecnomayores", nombre: "TecnoMayores — «Tecnología a tu ritmo»", tipo: "Proyecto educativo propio",
      descripcion: "Programa de inclusión digital para adultos mayores: celular, WhatsApp, trámites y seguridad, en seis semanas.",
      objetivo: "Que cada participante gane autonomía digital, aprendiendo a su propio ritmo, con materiales y juegos didácticos propios.",
      tecnologias: ["Alfabetización digital", "Seguridad digital", "Materiales propios"], estado: "desarrollo",
      enlaces: [{ t: "Ver ficha del proyecto", u: "proyecto.html?id=tecnomayores" }],
    },
    {
      id: "el-paisa", nombre: "El Paisa Servicios Integrales", tipo: "Emprendimiento propio",
      descripcion: "Plataforma web de servicios técnicos y aplicaciones de gestión para mi emprendimiento, en funcionamiento desde 2012.",
      objetivo: "Mostrar los servicios, recibir consultas y organizar el trabajo diario con herramientas propias.",
      tecnologias: ["HTML", "CSS", "JavaScript", "GitHub Pages"], estado: "finalizado", nota: "En uso",
      enlaces: [{ t: "Ver sitio", u: "https://sebastian5016.github.io/ELPAISA/" }, { t: "Código en GitHub", u: "https://github.com/Sebastian5016/ELPAISA" }],
    },
    {
      id: "didacticos", nombre: "Proyectos didácticos para el aula", tipo: "Material educativo",
      descripcion: "Proyectos documentados para trabajar en clase: calculadora en Python, sistema de notas en SQL, red escolar, verificador de contraseñas, página web y más.",
      objetivo: "Que cada tema termine en algo que funciona: problema, desarrollo, código, actividad y material descargable.",
      tecnologias: ["Python", "SQL", "C", "JavaScript", "Redes", "Arduino"], estado: "desarrollo",
      enlaces: [{ t: "Ver proyectos didácticos", u: "proyectos.html?tipo=educativo" }],
    },
  ],

  // Docencia
  enfoqueIntro: "Enseño tecnología para que mis estudiantes puedan entenderla, usarla con criterio y crear con ella. Vengo de muchos años de instrucción y coordinación: primero escucho, después acompaño a cada persona desde donde está.",
  enfoque: [
    { t: "Aprendizaje significativo", d: "Partimos de problemas reales y cercanos. Lo que se aprende tiene que servir para algo." },
    { t: "Tecnología con sentido", d: "Las herramientas se eligen por lo que permiten hacer, no por moda." },
    { t: "Pensamiento lógico", d: "Ordenar ideas y descomponer problemas antes de tocar la computadora." },
    { t: "Resolución de problemas", d: "Equivocarse es parte del método: cada error da información para corregir." },
    { t: "Práctica", d: "Se aprende haciendo: programas, redes, documentos y proyectos que funcionan." },
    { t: "Pensamiento crítico", d: "Preguntarse de dónde viene la información, sobre todo cuando responde una IA." },
    { t: "Participación", d: "Clases donde cada estudiante tiene algo para hacer y algo para aportar." },
    { t: "Acompañamiento", d: "Respeto los distintos ritmos y acompaño trayectorias diversas." },
  ],
  escuelas: [
    { escuela: "EES N.º 38", lugar: "Villa Madero", materia: "NTICx", cursos: "4.º 1.ª y 4.º 2.ª" },
    { escuela: "ES N.º 178 «Padre Bachi»", lugar: "San Justo", materia: "NTICx", cursos: "4.º 1.ª" },
    { escuela: "EEST N.º 10", lugar: "Villa Madero", materia: "Lenguajes Tecnológicos", cursos: "2.º 4.ª" },
  ],
  habilitacion: "Inscripción docente DGCyE — Listado 108 A 2027",
  niveles: "Nivel primario, secundario y adultos",

  // IA y tecnología educativa (interés y formación, no especialización)
  iaIntro: "Es una línea de trabajo en evolución. Me interesa cómo la inteligencia artificial y las herramientas digitales pueden ayudar a aprender más, sin reemplazar el pensamiento propio.",
  iaTemas: [
    { t: "Uso responsable de la IA", d: "Autoría, verificación y privacidad en el uso escolar." },
    { t: "Herramientas para docentes", d: "Recursos digitales que ahorran tiempo sin perder criterio pedagógico." },
    { t: "Alfabetización digital", d: "Desde estudiantes secundarios hasta adultos mayores." },
    { t: "Aprendizaje asistido por tecnología", d: "IA como tutor que hace preguntas, no como atajo." },
    { t: "Nuevas tecnologías", d: "Seguimiento de herramientas y su impacto real en el aula." },
  ],
  iaEvidencia: { t: "En la plataforma ya hay un constructor de prompts, una guía de uso responsable y una checklist de verificación para el aula.", u: "ia.html" },

  // Formación (lo más relevante primero)
  formacion: [
    { grupo: "Formación académica", items: [
      { t: "Técnico Superior en Análisis y Programación de Aplicaciones", i: "ISFDyT N.º 46, Ramos Mejía", a: "2026 · título en trámite", destacado: true },
      { t: "Técnico Superior en Seguridad Institucional", i: "", a: "2009" },
    ] },
    { grupo: "Formación docente", items: [
      { t: "Tramo pedagógico de nivel superior", i: "", a: "En curso" },
      { t: "Inscripción docente DGCyE", i: "Listado 108 A 2027", a: "Habilitación" },
    ] },
    { grupo: "Capacitación profesional", items: [
      { t: "Diplomatura en Ciberseguridad", i: "Universidad Nacional del Nordeste (UNNE)", a: "2024" },
    ] },
    { grupo: "Formación técnica", items: [
      { t: "Técnico en Refrigeración Industrial", i: "Universidad Tecnológica Nacional (UTN)", a: "2014" },
    ] },
  ],
  idiomas: [{ t: "Español", n: "Nativo" }, { t: "Inglés", n: "Intermedio (B1)" }],
};
