/* ==========================================================================
   RUTAS DE APRENDIZAJE
   Cada nivel puede enlazar materiales (ids de WF.materiales), lenguajes,
   proyectos o páginas. El progreso se guarda con WF.ProgressStore
   (hoy: navegador del estudiante; mañana: cuentas de usuario).
   ========================================================================== */
window.WF = window.WF || {};
WF.rutas = [
  {
    id: "intro-programacion",
    titulo: "Introducción a la programación",
    descripcion: "De cero a tu primer proyecto en Python. Sin conocimientos previos.",
    area: "programacion",
    nivel: "inicial",
    duracion: "6 semanas",
    estado: "publicado",
    niveles: [
      { titulo: "Conceptos básicos", objetivo: "Entender qué es un algoritmo y qué es un programa.", actividades: ["Leer el apunte de pensamiento computacional.", "Escribir el algoritmo de una tarea cotidiana.", "Instalar Python o abrir Replit."], recursos: ["ap-pc", "ap-intro-prog"] },
      { titulo: "Variables", objetivo: "Guardar datos y mostrarlos.", actividades: ["Ejecutar 01_variables.py.", "Ejercicios 1 a 5 de la guía."], recursos: ["cod-python", "ap-ej-python"], enlaces: [{ texto: "Python: conceptos", url: "lenguaje.html?l=python" }] },
      { titulo: "Condicionales", objetivo: "Que el programa tome decisiones.", actividades: ["Ejecutar 02_condicionales.py y modificarlo.", "Ejercicios 6 a 10 de la guía."], recursos: ["ap-ej-python"] },
      { titulo: "Bucles", objetivo: "Repetir instrucciones.", actividades: ["Ejecutar 03_bucles.py.", "Ejercicios 11 a 13 de la guía."], recursos: ["ap-ej-python"] },
      { titulo: "Funciones", objetivo: "Dividir el programa en partes reutilizables.", actividades: ["Ejecutar 04_funciones_listas.py.", "Ejercicios 14 a 19 de la guía."], recursos: ["cod-python"] },
      { titulo: "Proyecto final", objetivo: "Integrar todo en un programa completo.", actividades: ["Realizar el proyecto Calculadora de consola.", "Ampliarlo con la actividad propuesta.", "Presentarlo al curso."], enlaces: [{ texto: "Proyecto: Calculadora en Python", url: "proyecto.html?id=calculadora-python" }] },
    ],
  },
  {
    id: "desarrollo-web",
    titulo: "Desarrollo web desde cero",
    descripcion: "HTML, CSS y JavaScript para publicar tu propia página.",
    area: "web",
    nivel: "inicial",
    duracion: "8 semanas",
    estado: "publicado",
    niveles: [
      { titulo: "¿Cómo funciona la web?", objetivo: "Entender navegador, servidor, URL y DNS.", actividades: ["Leer el apunte de redes (secciones 1 y 4)."], recursos: ["ap-redes"] },
      { titulo: "HTML semántico", objetivo: "Estructurar contenido.", actividades: ["Estudiar la plantilla HTML.", "Ejercicios de HTML."], recursos: ["cod-html"], enlaces: [{ texto: "HTML: conceptos y ejercicios", url: "lenguaje.html?l=html" }] },
      { titulo: "CSS", objetivo: "Dar estilo y adaptar a celulares.", actividades: ["Jugar Flexbox Froggy.", "Ejercicios de CSS."], recursos: ["cod-css"], enlaces: [{ texto: "CSS: conceptos y ejercicios", url: "lenguaje.html?l=css" }] },
      { titulo: "JavaScript", objetivo: "Agregar interacción.", actividades: ["Estudiar el contador interactivo.", "Ejercicios de JavaScript."], recursos: ["cod-js-dom"], enlaces: [{ texto: "JavaScript", url: "lenguaje.html?l=javascript" }] },
      { titulo: "Proyecto final", objetivo: "Publicar tu página personal.", actividades: ["Proyecto Mi primera página web.", "Publicarla en GitHub Pages."], enlaces: [{ texto: "Proyecto: Mi primera página web", url: "proyecto.html?id=pagina-personal" }] },
    ],
  },
  {
    id: "bases-de-datos",
    titulo: "Bases de datos con SQL",
    descripcion: "Modelar información y hacerle preguntas con SQL.",
    area: "bd",
    nivel: "intermedio",
    duracion: "5 semanas",
    estado: "publicado",
    niveles: [
      { titulo: "Datos e información", objetivo: "Diferenciar dato, información y base de datos.", actividades: ["Leer el apunte de SQL (sección 1)."], recursos: ["ap-sql"] },
      { titulo: "Primeras consultas", objetivo: "SELECT, WHERE y ORDER BY.", actividades: ["Ejecutar los scripts de la biblioteca en SQLite Online."], recursos: ["cod-sql", "ext-sqlite"] },
      { titulo: "Relaciones", objetivo: "Claves y JOIN.", actividades: ["Analizar el diagrama del Sistema de notas."], enlaces: [{ texto: "Proyecto: Sistema de notas", url: "proyecto.html?id=sistema-notas-sql" }] },
      { titulo: "Proyecto final", objetivo: "Ampliar el sistema con asistencia.", actividades: ["Realizar la actividad propuesta del proyecto."], enlaces: [{ texto: "Actividad del proyecto", url: "proyecto.html?id=sistema-notas-sql#actividad" }] },
    ],
  },
  {
    id: "ia-responsable",
    titulo: "IA para estudiar (con criterio)",
    descripcion: "Usar inteligencia artificial para aprender más, no para pensar menos.",
    area: "ia",
    nivel: "inicial",
    duracion: "3 semanas",
    estado: "desarrollo",
    niveles: [
      { titulo: "¿Qué es la IA generativa?", objetivo: "Entender cómo funciona y sus límites.", actividades: ["Leer el apunte de IA."], recursos: ["ap-ia"] },
      { titulo: "Prompts", objetivo: "Escribir instrucciones claras.", actividades: ["Usar el constructor de prompts.", "Comparar un prompt vago y uno estructurado."], recursos: ["gu-prompts"], enlaces: [{ texto: "Constructor de prompts", url: "ia.html#prompts" }] },
      { titulo: "Verificar", objetivo: "Detectar errores y alucinaciones.", actividades: ["Verificar tres datos de una respuesta."], enlaces: [{ texto: "Checklist de verificación", url: "ia.html#verificar" }] },
      { titulo: "Proyecto final", objetivo: "Crear tu prompt de estudio para otra materia.", actividades: ["Actividad del proyecto Asistente de estudio con IA."], enlaces: [{ texto: "Proyecto: Asistente de estudio", url: "proyecto.html?id=asistente-estudio-ia" }] },
    ],
  },
];
