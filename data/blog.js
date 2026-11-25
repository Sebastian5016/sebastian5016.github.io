/* ==========================================================================
   BLOG / ARTÍCULOS
   - contenido: HTML simple (p, h2, h3, ul, ol, blockquote, code, a).
   - relacionados: { materiales: [ids], proyectos: [ids] }
   - portada: se genera automáticamente según la categoría (o "imagen" propia).
   ========================================================================== */
window.WF = window.WF || {};
WF.blog = [
  {
    id: "ia-para-estudiar-sin-dejar-de-pensar",
    titulo: "IA para estudiar sin dejar de pensar",
    fecha: "2026-11-18",
    categoria: "ia",
    resumen: "La inteligencia artificial puede ser el mejor tutor o la peor trampa. La diferencia está en cómo le preguntamos.",
    lectura: "6 min",
    imagenAlt: "Ilustración abstracta de una conversación entre una persona y una IA.",
    contenido: `
<p>Cada vez que aparece una tecnología nueva en el aula, la primera reacción es prohibirla o ignorarla. Con la inteligencia artificial generativa ninguna de las dos opciones funciona: los estudiantes ya la usan. La pregunta útil no es <em>si</em> la usan, sino <em>cómo</em>.</p>
<h2>El problema no es la IA, es la pregunta</h2>
<p>Si un estudiante escribe “resolvé este ejercicio”, obtiene una respuesta y nada más. Si escribe “no me des la respuesta, decime en qué paso me equivoqué”, obtiene una conversación que lo obliga a pensar. La herramienta es la misma; el aprendizaje, completamente distinto.</p>
<blockquote>La IA es una calculadora de palabras: rápida, útil y capaz de equivocarse con total seguridad.</blockquote>
<h2>Tres usos que recomiendo</h2>
<ol>
<li><strong>Explicar de otra manera.</strong> Pedir el mismo tema con un ejemplo cotidiano o para alguien de menor edad.</li>
<li><strong>Generar práctica.</strong> Ejercicios de dificultad creciente, sin soluciones hasta que se pidan.</li>
<li><strong>Entender errores.</strong> Sobre todo en programación: qué significa un mensaje de error y qué revisar.</li>
</ol>
<h2>Y una regla que no se negocia</h2>
<p>Todo lo que dice la IA se verifica. Contrastar con el apunte, con un libro o con un sitio confiable, y —lo más importante— poder explicarlo con las propias palabras. Si no podés explicarlo, todavía no lo aprendiste.</p>
<p>En la sección <a href="ia.html">IA y Educación</a> hay un constructor de prompts y una checklist de verificación para usar en clase.</p>`,
    relacionados: { materiales: ["ap-ia", "gu-prompts"], proyectos: ["asistente-estudio-ia"] },
  },
  {
    id: "por-que-ensenar-pensamiento-computacional",
    titulo: "Por qué enseñar pensamiento computacional (aunque no vayas a programar)",
    fecha: "2026-10-30",
    categoria: "educacion",
    resumen: "Descomponer, reconocer patrones, abstraer y diseñar algoritmos: habilidades que sirven en cualquier materia y en la vida.",
    lectura: "5 min",
    imagenAlt: "Diagrama abstracto de bloques conectados.",
    contenido: `
<p>Cuando digo que enseño programación, muchas personas imaginan que formo futuros programadores. Algunos lo serán. Pero el objetivo es otro: que cualquier estudiante pueda enfrentar un problema complejo sin paralizarse.</p>
<h2>Los cuatro pilares</h2>
<ul>
<li><strong>Descomposición:</strong> dividir un problema grande en partes manejables.</li>
<li><strong>Patrones:</strong> reconocer lo que se repite para no resolverlo dos veces.</li>
<li><strong>Abstracción:</strong> quedarse con lo importante y dejar de lado el detalle irrelevante.</li>
<li><strong>Algoritmos:</strong> ordenar los pasos para llegar a la solución.</li>
</ul>
<h2>Fuera de la computadora</h2>
<p>Organizar un torneo, planificar un viaje, resolver un problema de física o escribir un ensayo: todos se benefician de estas cuatro habilidades. Por eso trabajo actividades “desenchufadas”, con papel y lápiz, antes de abrir cualquier programa.</p>
<blockquote>Programar es una excusa excelente para aprender a pensar con orden.</blockquote>
<p>Si sos docente de otra materia y te interesa un proyecto interdisciplinario, <a href="contacto.html">escribime</a>.</p>`,
    relacionados: { materiales: ["ap-pc", "ext-scratch"], proyectos: ["calculadora-python"] },
  },
  {
    id: "contrasenas-lo-minimo",
    titulo: "Contraseñas: lo mínimo que todo estudiante debería saber",
    fecha: "2026-10-12",
    categoria: "ciberseguridad",
    resumen: "Longitud, una contraseña por servicio, gestor y doble factor. Cuatro hábitos que evitan la mayoría de los problemas.",
    lectura: "4 min",
    imagenAlt: "Ilustración de un candado digital.",
    contenido: `
<p>La mayoría de las cuentas robadas no se pierden por ataques sofisticados, sino por contraseñas débiles o repetidas. La buena noticia: protegerse es más fácil de lo que parece.</p>
<h2>Cuatro hábitos</h2>
<ol>
<li><strong>Largas antes que raras.</strong> Doce caracteres o más. Una frase como <code>MiPerro-Come3Galletas!</code> es fuerte y fácil de recordar.</li>
<li><strong>Una por servicio.</strong> Si se filtra una, las demás siguen a salvo.</li>
<li><strong>Un gestor de contraseñas.</strong> Recuerda por vos y genera contraseñas seguras.</li>
<li><strong>Doble factor (2FA).</strong> Aunque roben la contraseña, falta el segundo paso.</li>
</ol>
<h2>Probalo</h2>
<p>En clase construimos un <a href="proyecto.html?id=verificador-contrasenas">verificador de contraseñas</a> que funciona sin enviar datos a internet. Usalo con contraseñas inventadas y fijate qué reglas cumplen.</p>`,
    relacionados: { materiales: ["ap-seguridad", "pr-contrasenas"], proyectos: ["verificador-contrasenas"] },
  },
  {
    id: "aprender-haciendo-proyectos",
    titulo: "Aprender haciendo: cómo organizo una clase por proyectos",
    fecha: "2026-09-22",
    categoria: "experiencias",
    resumen: "Problema, exploración, construcción, presentación y reflexión. Así funciona la metodología detrás de esta plataforma.",
    lectura: "7 min",
    imagenAlt: "Esquema de cinco pasos de una metodología por proyectos.",
    contenido: `
<p>“¿Para qué sirve esto?” es una de las preguntas más honestas que puede hacer un estudiante. Trabajar por proyectos es mi manera de responderla antes de que la formulen.</p>
<h2>Las cinco etapas</h2>
<ol>
<li><strong>Problema:</strong> una situación real, cercana y con más de una solución posible.</li>
<li><strong>Explorar:</strong> investigamos conceptos y herramientas. Acá aparecen los apuntes.</li>
<li><strong>Construir:</strong> se aprende haciendo, equivocándose y corrigiendo.</li>
<li><strong>Compartir:</strong> mostrar el resultado obliga a ordenarlo y explicarlo.</li>
<li><strong>Reflexionar:</strong> ¿qué aprendimos?, ¿qué mejoraríamos?</li>
</ol>
<h2>Evaluar el proceso, no solo el producto</h2>
<p>Uso una <a href="materiales.html?q=rúbrica">rúbrica</a> con siete criterios que incluye planificación, documentación y reflexión. Un programa que funciona no alcanza: también hay que poder explicar cómo se llegó a él.</p>
<blockquote>El error no es el final del proceso: es el dato que nos dice qué aprender después.</blockquote>`,
    relacionados: { materiales: ["ev-rubrica"], proyectos: ["calculadora-python", "sistema-notas-sql"] },
  },
  {
    id: "python-primer-lenguaje",
    titulo: "¿Por qué Python como primer lenguaje?",
    fecha: "2026-08-28",
    categoria: "programacion",
    resumen: "Sintaxis clara, resultados rápidos y un ecosistema enorme. Pero también sus límites, y cuándo conviene otro lenguaje.",
    lectura: "5 min",
    imagenAlt: "Fragmento de código Python estilizado.",
    contenido: `
<p>Elegir el primer lenguaje es una decisión didáctica, no técnica. Busco que el estudiante se concentre en la lógica y no en los signos de puntuación.</p>
<h2>A favor</h2>
<ul><li>Se lee casi como lenguaje natural.</li><li>Pocas líneas para resultados visibles.</li><li>Usado de verdad en IA, datos y automatización.</li></ul>
<h2>Con cuidado</h2>
<ul><li>No obliga a declarar tipos: hay que enseñarlos igual.</li><li>Esconde detalles de memoria que C muestra con claridad.</li></ul>
<p>Por eso en la <a href="programacion.html">biblioteca de programación</a> conviven Python, C, C++, Java y otros: cada uno enseña algo distinto. Para empezar, la <a href="ruta.html?id=intro-programacion">ruta de introducción a la programación</a> es el mejor punto de partida.</p>`,
    relacionados: { materiales: ["ap-intro-prog", "ap-ej-python"], proyectos: ["calculadora-python"] },
  },
];
