/**
 * ────────────────────────────────────────────────────────────────
 *  EDITA SOLO ESTE ARCHIVO PARA PERSONALIZAR TODA LA PÁGINA.
 *  Cada campo está comentado. No hace falta tocar los componentes.
 * ────────────────────────────────────────────────────────────────
 */

export const profile = {
  // ── Datos básicos ────────────────────────────────────────────
  nombre: "José Luis Arrioja",
  iniciales: "JA", // se muestran en el avatar si no pones foto
  rol: "Desarrollador de Software",
  // Frase corta que aparece bajo tu nombre en la portada
  tagline:
    "Construyo productos web que se sienten rápidos, claros y humanos. Me obsesiona el detalle que nadie nota pero todos agradecen.",
  ubicacion: "Ciudad de México, México",
  email: "joseluisarrioja20@gmail.com",
  // Ruta a tu foto dentro de /public (ej: "/foto.jpg"). Déjalo en null para usar las iniciales.
  foto: null as string | null,
  // Ruta a tu CV dentro de /public (ej: "/cv.pdf"). null = no se muestra el botón.
  cv: null as string | null,
  disponible: true, // muestra el badge "Disponible para proyectos"
};

// ── Redes y contacto ───────────────────────────────────────────
export const redes = [
  { nombre: "GitHub", url: "https://github.com/Lee-Stark-94", handle: "@Lee-Stark-94" },
  { nombre: "LinkedIn", url: "https://linkedin.com/in/tu-usuario", handle: "/in/tu-usuario" },
  { nombre: "X", url: "https://x.com/tu-usuario", handle: "@tu-usuario" },
];

// ── Sobre mí ───────────────────────────────────────────────────
export const sobreMi = {
  titulo: "Sobre mí",
  // Cada string es un párrafo
  parrafos: [
    "Soy desarrollador de software y, sobre todo, alguien a quien le gusta entender cómo funcionan las cosas por dentro. Empecé abriendo computadoras que no debía abrir y terminé escribiendo el código que las hace útiles.",
    "Hoy trabajo principalmente en la web: interfaces que la gente usa a diario y las APIs que las sostienen. Disfruto el momento en el que un problema confuso se vuelve simple, y creo que buena parte de mi trabajo consiste justo en eso: quitar complejidad, no añadirla.",
    "Fuera del teclado soy curioso por deporte. Si algo me despierta preguntas, probablemente termine leyendo sobre ello a la 1 de la mañana.",
  ],
  // Datos rápidos que se muestran como tarjetas pequeñas
  datosRapidos: [
    { etiqueta: "Años programando", valor: "5+" },
    { etiqueta: "Proyectos enviados", valor: "20+" },
    { etiqueta: "Café al día", valor: "3 ☕" },
    { etiqueta: "Idiomas", valor: "ES / EN" },
  ],
};

// ── Habilidades técnicas ───────────────────────────────────────
// nivel: número de 0 a 100 (se dibuja como barra de progreso)
export const habilidades = [
  {
    categoria: "Frontend",
    items: [
      { nombre: "React / Next.js", nivel: 90 },
      { nombre: "TypeScript", nivel: 85 },
      { nombre: "Tailwind CSS", nivel: 88 },
      { nombre: "HTML & CSS", nivel: 95 },
    ],
  },
  {
    categoria: "Backend",
    items: [
      { nombre: "Node.js", nivel: 80 },
      { nombre: "Python", nivel: 70 },
      { nombre: "PostgreSQL", nivel: 72 },
      { nombre: "APIs REST", nivel: 85 },
    ],
  },
  {
    categoria: "Herramientas",
    items: [
      { nombre: "Git & GitHub", nivel: 88 },
      { nombre: "Docker", nivel: 65 },
      { nombre: "Figma", nivel: 70 },
      { nombre: "Testing", nivel: 68 },
    ],
  },
];

// ── Características / cómo trabajo ─────────────────────────────
export const caracteristicas = [
  {
    icono: "🔍",
    titulo: "Curioso por defecto",
    texto: "Si no entiendo cómo funciona algo, no lo dejo pasar. Prefiero perder una tarde investigando que arrastrar una duda durante meses.",
  },
  {
    icono: "🎯",
    titulo: "Enfocado en el detalle",
    texto: "Un botón mal alineado o una animación brusca me quitan el sueño. Creo que la calidad se nota justamente en lo pequeño.",
  },
  {
    icono: "🤝",
    titulo: "Colaborativo",
    texto: "Explico lo que hago y pregunto lo que no sé. El mejor código sale de conversaciones honestas, no de trabajar en silencio.",
  },
  {
    icono: "⚡",
    titulo: "Rápido para aprender",
    texto: "Tecnología nueva no me asusta. Me interesan más los fundamentos que las modas: lo demás se aprende sobre la marcha.",
  },
  {
    icono: "🧩",
    titulo: "Resolutivo",
    texto: "Me gustan los problemas que nadie quiere tomar. Descomponer algo enorme en pasos pequeños es de las cosas que mejor hago.",
  },
  {
    icono: "📚",
    titulo: "Constante",
    texto: "Prefiero avanzar un poco todos los días que hacerlo todo en un fin de semana. La disciplina rinde más que la inspiración.",
  },
];

// ── Hobbies ────────────────────────────────────────────────────
export const hobbies = [
  { icono: "🎮", nombre: "Videojuegos", texto: "Sobre todo RPGs y estrategia. Me interesa tanto jugarlos como entender su diseño." },
  { icono: "🎧", nombre: "Música", texto: "Playlist infinita mientras programo. También intento aprender guitarra, con paciencia variable." },
  { icono: "📖", nombre: "Lectura", texto: "Ciencia ficción, divulgación y libros técnicos que dejo a medias con orgullo." },
  { icono: "🏋️", nombre: "Gimnasio", texto: "Mi forma de desconectar del monitor y volver con la cabeza más despejada." },
  { icono: "🎬", nombre: "Cine y series", texto: "Fan de las buenas historias, en cualquier formato. Me quedo a ver los créditos." },
  { icono: "✈️", nombre: "Viajar", texto: "Ciudades nuevas, comida rara y perderme sin mapa: mi combinación favorita." },
];

// ── Mi historia (línea de tiempo) ──────────────────────────────
export const historia = [
  {
    año: "2016",
    titulo: "La primera línea de código",
    texto: "Quise personalizar un blog y terminé descubriendo HTML y CSS. Ese fin de semana entendí que quería dedicarme a esto.",
  },
  {
    año: "2018",
    titulo: "Formación formal",
    texto: "Entré a estudiar desarrollo de software. Aprendí fundamentos, estructuras de datos y, sobre todo, a no rendirme con un error críptico.",
  },
  {
    año: "2020",
    titulo: "Primer proyecto real",
    texto: "Construí un sitio completo para un cliente. Aprendí que el código es solo la mitad del trabajo: la otra mitad es escuchar.",
  },
  {
    año: "2022",
    titulo: "Salto al ecosistema moderno",
    texto: "Me especialicé en React, TypeScript y Next.js. Empecé a pensar en arquitectura, rendimiento y experiencia de usuario, no solo en que funcionara.",
  },
  {
    año: "2024",
    titulo: "Trabajo en equipo y open source",
    texto: "Colaboré en equipos multidisciplinarios y contribuí a proyectos abiertos. Descubrí lo mucho que se aprende leyendo código ajeno.",
  },
  {
    año: "Hoy",
    titulo: "Siguiente capítulo",
    texto: "Buscando proyectos con impacto real, donde pueda construir cosas de las que se pueda estar orgulloso a largo plazo.",
  },
];

// ── Visión de futuro ───────────────────────────────────────────
export const vision = {
  intro:
    "No tengo un plan rígido a diez años, pero sí una dirección clara: seguir construyendo cosas que le sirvan a alguien de verdad, rodeado de gente que me haga mejor.",
  metas: [
    {
      horizonte: "Corto plazo",
      periodo: "1 año",
      titulo: "Profundizar, no dispersarme",
      puntos: [
        "Dominar arquitectura frontend a escala real",
        "Escribir más pruebas y automatizar lo que hoy hago a mano",
        "Publicar proyectos propios de forma constante",
      ],
    },
    {
      horizonte: "Mediano plazo",
      periodo: "3 años",
      titulo: "Construir con impacto",
      puntos: [
        "Liderar técnicamente un producto de principio a fin",
        "Mentorizar a quien empieza, como alguien lo hizo conmigo",
        "Contribuir de forma seria al open source",
      ],
    },
    {
      horizonte: "Largo plazo",
      periodo: "5+ años",
      titulo: "Dejar algo que dure",
      puntos: [
        "Crear un producto propio que resuelva un problema real",
        "Trabajar en la intersección de software, IA y educación",
        "Seguir aprendiendo con la misma curiosidad del primer día",
      ],
    },
  ],
};

// ── Secciones del menú de navegación ───────────────────────────
export const secciones = [
  { id: "sobre-mi", nombre: "Sobre mí" },
  { id: "habilidades", nombre: "Habilidades" },
  { id: "caracteristicas", nombre: "Características" },
  { id: "hobbies", nombre: "Hobbies" },
  { id: "historia", nombre: "Mi historia" },
  { id: "vision", nombre: "Visión" },
  { id: "contacto", nombre: "Contacto" },
];
