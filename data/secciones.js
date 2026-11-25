/* ==========================================================================
   CONTENIDO DE SECCIONES: IA y Educación, Tecnología, Herramientas e
   Integraciones. También alimenta la búsqueda global.
   ========================================================================== */
window.WF = window.WF || {};
WF.secciones = {
  iaTemas: [
    { id: "generativa", icono: "sparkles", titulo: "IA generativa", texto: "Sistemas que crean texto, imágenes, audio o código a partir de instrucciones. Predicen la respuesta más probable, no la verdadera." },
    { id: "chatgpt", icono: "message", titulo: "ChatGPT y asistentes", texto: "Qué son los asistentes conversacionales (ChatGPT, Claude, Gemini, Copilot), en qué se parecen y qué cuidados requieren." },
    { id: "responsable", icono: "shield", titulo: "Uso responsable", texto: "Autoría, honestidad académica, privacidad y cuándo NO conviene usar IA." },
    { id: "prompts", icono: "pen", titulo: "Prompts", texto: "Cómo escribir instrucciones claras: rol, tarea, contexto, formato y límites." },
    { id: "estudiar", icono: "book", titulo: "IA para estudiar", texto: "Explicaciones alternativas, preguntas de práctica y tutorías que hacen pensar." },
    { id: "programar", icono: "code", titulo: "IA para programar", texto: "Entender errores, revisar código y aprender buenas prácticas sin copiar a ciegas." },
    { id: "docentes", icono: "grad", titulo: "IA para docentes", texto: "Planificar, diferenciar actividades, crear rúbricas y ahorrar tiempo con criterio pedagógico." },
    { id: "verificar", icono: "checkCircle", titulo: "Verificación de información", texto: "Contrastar, buscar fuentes primarias y detectar alucinaciones." },
    { id: "critico", icono: "lightbulb", titulo: "Pensamiento crítico", texto: "Preguntarse quién, por qué, con qué datos y con qué sesgos se produjo una respuesta." },
    { id: "riesgos", icono: "alert", titulo: "Riesgos y limitaciones", texto: "Errores, sesgos, dependencia, desinformación, deepfakes y uso de datos personales." },
  ],

  tecnologiaAreas: [
    { id: "hardware", icono: "cpu", titulo: "Hardware", texto: "Componentes, arquitectura de computadoras, mantenimiento y armado de equipos.", temas: ["CPU y memoria", "Almacenamiento", "Periféricos", "Mantenimiento"] },
    { id: "redes", icono: "network", titulo: "Redes e Internet", texto: "Cómo se conectan los dispositivos y cómo viaja la información.", temas: ["TCP/IP", "Direccionamiento", "Wi‑Fi", "DNS"] },
    { id: "sistemas", icono: "terminal", titulo: "Sistemas operativos", texto: "Windows, Linux y Android: archivos, procesos, usuarios y terminal.", temas: ["Archivos y carpetas", "Linux básico", "Usuarios y permisos", "Terminal"] },
    { id: "seguridad", icono: "shield", titulo: "Seguridad informática", texto: "Ciberseguridad, privacidad, contraseñas e ingeniería social.", temas: ["Contraseñas", "Phishing", "Privacidad", "Copias de seguridad"] },
    { id: "bd", icono: "database", titulo: "Bases de datos", texto: "Organizar información y consultarla con SQL.", temas: ["Modelo relacional", "SQL", "Normalización"] },
    { id: "ofimatica", icono: "file", titulo: "Ofimática", texto: "Procesador de textos, planillas de cálculo y presentaciones profesionales.", temas: ["Word / Docs", "Excel / Sheets", "Presentaciones"] },
    { id: "diseno", icono: "palette", titulo: "Diseño digital", texto: "Comunicación visual, infografías, imagen y diseño web.", temas: ["Canva", "Infografías", "Color y tipografía"] },
    { id: "ia", icono: "sparkles", titulo: "Inteligencia artificial", texto: "Cómo funciona la IA, usos en la escuela y sus límites.", temas: ["IA generativa", "Prompts", "Ética"] },
  ],

  herramientas: [
    { nombre: "Python", url: "https://www.python.org/", texto: "Lenguaje para empezar a programar.", area: "programacion" },
    { nombre: "VS Code", url: "https://code.visualstudio.com/", texto: "Editor de código gratuito.", area: "programacion" },
    { nombre: "Replit", url: "https://replit.com/", texto: "Programar en el navegador.", area: "programacion" },
    { nombre: "PSeInt", url: "https://pseint.sourceforge.net/", texto: "Pseudocódigo y diagramas de flujo.", area: "pensamiento" },
    { nombre: "Scratch", url: "https://scratch.mit.edu/", texto: "Programación con bloques.", area: "pensamiento" },
    { nombre: "Cisco Packet Tracer", url: "https://www.netacad.com/cisco-packet-tracer", texto: "Simulador de redes.", area: "redes" },
    { nombre: "Tinkercad", url: "https://www.tinkercad.com/", texto: "Circuitos, Arduino y diseño 3D.", area: "hardware" },
    { nombre: "SQLite Online", url: "https://sqliteonline.com/", texto: "SQL sin instalar nada.", area: "bd" },
    { nombre: "GitHub", url: "https://github.com/", texto: "Código, versiones y publicación de sitios.", area: "programacion" },
    { nombre: "Canva", url: "https://www.canva.com/education/", texto: "Diseño de presentaciones e infografías.", area: "diseno" },
  ],

  integraciones: [
    { id: "github", icono: "github", nombre: "GitHub", uso: "Código fuente, README y demos de los proyectos de programación." },
    { id: "youtube", icono: "youtube", nombre: "YouTube", uso: "Videotutoriales embebidos en modo de privacidad mejorada." },
    { id: "drive", icono: "folder", nombre: "Google Drive", uso: "Archivos editables (DOC, PPT, XLS) y carpetas compartidas." },
    { id: "forms", icono: "clipboard", nombre: "Google Forms", uso: "Autoevaluaciones y cuestionarios de cada ruta." },
    { id: "classroom", icono: "grad", nombre: "Google Classroom", uso: "Entregas y comunicación de cada curso (acceso privado)." },
    { id: "calendar", icono: "calendar", nombre: "Google Calendar", uso: "Calendario de entregas y clases de consulta." },
    { id: "canva", icono: "palette", nombre: "Canva", uso: "Presentaciones e infografías embebidas." },
    { id: "notion", icono: "bookOpen", nombre: "Notion", uso: "Planificaciones y documentación de proyectos." },
  ],
};
