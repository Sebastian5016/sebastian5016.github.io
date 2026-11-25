/* ==========================================================================
   PROYECTOS DE ALUMNOS
   ⚠ Antes de publicar: contar con autorización escrita (ver privacidad.html
   y descargas/docentes/autorizacion-publicacion.txt).
   - autor: SOLO iniciales, nombre de pila o un identificador ("Equipo 3").
   - Nunca: apellidos, fotos de personas, datos de contacto ni notas.
   - ejemplo: true → se muestra la etiqueta "Ejemplo de formato".
   ========================================================================== */
window.WF = window.WF || {};
WF.alumnosProyectos = [
  {
    id: "quiz-ciberseguridad", ejemplo: true,
    titulo: "Quiz de ciberseguridad para la escuela",
    autor: "Equipo 2 · 4º año", curso: "4º año", anio: 2026, area: "seguridad",
    problema: "Muchos compañeros no sabían reconocer mensajes de phishing.",
    solucion: "Un cuestionario web con 10 situaciones reales (anonimizadas) y explicación en cada respuesta.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    resultado: "Lo respondieron otros cursos durante la semana de la seguridad digital.",
    aprendizaje: "“Aprendimos a guardar preguntas en arreglos de objetos y que explicar un tema es la mejor forma de entenderlo.”",
    enlace: "",
  },
  {
    id: "biblioteca-sql", ejemplo: true,
    titulo: "Catálogo de la biblioteca escolar",
    autor: "L. M. y T. R.", curso: "5º año", anio: 2026, area: "bd",
    problema: "La biblioteca registraba los préstamos en un cuaderno.",
    solucion: "Base de datos con libros, préstamos y consultas para saber qué libros están prestados y vencidos.",
    tecnologias: ["SQL", "SQLite"],
    resultado: "Modelo y consultas entregados a la bibliotecaria como propuesta.",
    aprendizaje: "“Diseñar las tablas antes de escribir SQL nos ahorró muchísimo trabajo.”",
    enlace: "",
  },
  {
    id: "riego-arduino", ejemplo: true,
    titulo: "Riego automático para la huerta",
    autor: "Equipo Huerta · 3º año", curso: "3º año", anio: 2026, area: "hardware",
    problema: "Las plantas de la huerta escolar se secaban los fines de semana.",
    solucion: "Sensor de humedad + Arduino que activa una bomba de agua cuando la tierra está seca.",
    tecnologias: ["Arduino", "C++", "Sensor de humedad"],
    resultado: "Prototipo funcionando en Tinkercad y maqueta física en la feria de ciencias.",
    aprendizaje: "“Entendimos que un sensor da números y que nosotros decidimos qué significan.”",
    enlace: "",
  },
];
