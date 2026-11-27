/* ==========================================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   --------------------------------------------------------------------------
   Archivo principal de personalización. Lo marcado con ✏️ está pendiente.
   Si un campo queda vacío (""), el componente correspondiente NO se muestra.
   PRIVACIDAD: no publicar DNI, teléfono personal ni domicilio.
   ========================================================================== */
window.WF = window.WF || {};
WF.sitio = {
  nombre: "Sebastián Fernández",        // marca profesional (nombre formal: Walter Sebastián Fernández, solo en CV y documentación)
  nombreCorto: "Sebastián Fernández",
  iniciales: "SF",
  rol: "Profesor de Informática",
  roles: ["Profesor de Informática", "Tecnología", "Programación", "Educación Digital"],
  niveles: "Secundaria, Educación Técnico-Profesional y adultos",
  lema: "Aprender tecnología haciendo.",
  url: "https://sebastian5016.github.io/",
  actualizado: "2026-11-26",

  presentacion:
    "Docente de tecnología con formación técnica superior en análisis y programación. Enseño programación, redes, bases de datos, ciberseguridad e inteligencia artificial a partir de proyectos concretos. Esta plataforma reúne mi trabajo profesional y es, al mismo tiempo, una biblioteca abierta para que mis alumnos —y cualquier persona— aprendan tecnología a su ritmo.",

  // --- Contacto -------------------------------------------------------------
  contacto: {
    // ✏️ Correo que querés mostrar públicamente (vacío = no se muestra).
    email: "walterlumi16@gmail.com",
    // ✏️ OPCIONAL: endpoint de Formspree. Vacío → el formulario arma un correo.
    formEndpoint: "",
    ubicacion: "Ramos Mejía, La Matanza · Buenos Aires",
    disponibilidad: "Disponible para horas cátedra de Informática, NTICx, Lenguajes Tecnológicos, Programación y Tecnología en secundaria, Educación Técnico-Profesional y formación de adultos.",
  },

  redes: {
    linkedin: "", // ✏️ pendiente
    github: "https://github.com/Sebastian5016",
    youtube: "",
    whatsapp: "5491165631842", // formato internacional sin "+"; se muestra como 11 6563-1842
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

  // El perfil profesional (trayectoria, formación, tecnologías, proyectos,
  // enfoque docente) vive en data/perfil.js.
};
