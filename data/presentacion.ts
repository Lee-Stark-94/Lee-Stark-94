/**
 * ────────────────────────────────────────────────────────────────
 *  Contenido de la presentación. Editar aquí, no en los componentes.
 *  Las listas se renderizan con .map(): añadir o quitar elementos
 *  no requiere tocar JSX.
 * ────────────────────────────────────────────────────────────────
 */

export const perfil = {
  nombre: "José Luis Arrioja",
  nombreCompleto: "José Luis Arrioja Zamudio",
  rol: "Ingeniero en software",
  tagline:
    "Ingeniero en software, veracruzano de nacimiento y caribeño por decisión propia.",
  entradilla:
    "Esto no es un currículum. Es más bien un tour por mi cabeza: de dónde vengo, qué me obsesiona y por qué llevo 12 años discutiendo con computadoras.",
  foto: "/img/foto.jpeg",
};

/** El orden de este array es el orden de las diapositivas y de los puntos
 *  de navegación. `fx` es el efecto de transición (ver globals.css). */
export const diapositivas = [
  { id: "portada", nombre: "Portada", fx: "zoom" },
  { id: "origen", nombre: "Origen", fx: "izq" },
  { id: "academico", nombre: "Historial académico", fx: "flip" },
  { id: "cancun", nombre: "Cancún", fx: "der" },
  { id: "carrera", nombre: "Trabajo", fx: "giro" },
  { id: "curiosidad", nombre: "Curiosidad", fx: "zoom" },
  { id: "entretenimiento", nombre: "Entretenimiento", fx: "caida" },
  { id: "pasiones", nombre: "Pasiones", fx: "desenfoque" },
  { id: "rancios", nombre: "Datos rancios", fx: "izq" },
  { id: "random", nombre: "Datos random", fx: "zoom" },
] as const;

// ── 02 Origen ──────────────────────────────────────────────────
export const origen = {
  kicker: "Capítulo uno",
  titulo: ["Veracruz, 6 de febrero", "de 1994"],
  parrafos: [
    "Nací en Veracruz, tierra de calor honesto, café de olla y gente que habla fuerte porque el ruido del puerto lo exige. Ahí aprendí a reírme de todo, sobre todo de mí mismo.",
  ],
  imagen: "/img/meme-origen.webp",
  pie: "Esta representacion del veracruzano promedio no es fiel a lore de veracruz pero casi.",
};

// ── 03 Historial académico ─────────────────────────────────────
export const educacion = [
  {
    periodo: "2000 — 2006",
    texto:
      "Primaria en tres escuelas y tres estados: Puebla, Veracruz y Oaxaca. Aprendí a llegar de nuevo a un salón donde ya todos se conocían.",
    imagen: "/img/edu-primaria.webp",
  },
  {
    periodo: "2006 — 2009",
    texto:
      "Secundaria, con un curso de computación: Word, Excel, PowerPoint y los primeros principios de HTML. Ahí empezó todo en serio.",
    imagen: "/img/edu-secundaria.webp",
  },
  {
    periodo: "2009 — 2012",
    texto:
      "Bachillerato con especialidad en cursos de Cisco y mantenimiento de redes. No fue la clase más divertida, pero aprendí de la infraestructura física detrás de los servidores.",
    imagen: "/img/edu-bachillerato.webp",
  },
  {
    periodo: "2012 — 2018",
    texto:
      "Ingeniería en Software. Entre exámenes ya trabajaba en proyectos pequeños: la escuela enseñaba la teoría y los clientes, la prisa.",
    imagen: "/img/edu-universidad.webp",
  },
];

// ── 04 Cancún ──────────────────────────────────────────────────
export const cancun = {
  datos: [
    { valor: "34°C", etiqueta: "Sensación real" },
    { valor: "20 min", etiqueta: "Al mar" },
    { valor: "0", etiqueta: "Intenciones de ir" },
  ],
  /** Fondo decorativo; si el archivo no existe simplemente no se pinta. */
  fondo: "/img/cancun.png",
};

// ── 05 Carrera ─────────────────────────────────────────────────
export const carrera = {
  areas: [
    {
      titulo: "Aplicaciones web",
      texto: "Lo que más hago: interfaces, APIs y todo lo que vive detrás de una URL.",
    },
    {
      titulo: "Escritorio",
      texto: "Aplicaciones que corren en la máquina del cliente, sin excusas de internet.",
    },
    {
      titulo: "Android",
      texto: "Móvil nativo, con su ciclo de vida y sus sorpresas de fragmentación.",
    },
    {
      titulo: "Configuración",
      texto: "Puntos de venta y software de seguridad: implementar, ajustar, sobrevivir.",
    },
  ],
  imagen: "/img/meme-titulo.jpg",
  pie: "Un usuario reportó un bug, listo usuario borrado...",
  /** Logos del stack. `escala` es el alto del logo dentro de su placa, en %:
   *  los apaisados (los que traen el nombre) piden menos alto que los
   *  cuadrados para que todos pesen parecido. Los PNG llevan el fondo del
   *  mismo color que la placa (--placa-tech en globals.css). */
  tecnologias: [
    { nombre: "React", logo: "/tech/react.png", escala: 60 },
    { nombre: "Django", logo: "/tech/django.png", escala: 46 },
    { nombre: "FastAPI", logo: "/tech/fastapi.png", escala: 56 },
    { nombre: "PostgreSQL", logo: "/tech/postgresql.png", escala: 66 },
    { nombre: "Docker", logo: "/tech/docker.png", escala: 58 },
    { nombre: "Firebase", logo: "/tech/firebase.png", escala: 40 },
    { nombre: "Android Studio", logo: "/tech/android-studio.png", escala: 46 },
  ],
};

// ── 07 Entretenimiento ─────────────────────────────────────────
export const entretenimiento = {
  generos: [
    {
      titulo: "Ciencia ficción adulta",
      texto:
        "La que no explica todo y te deja pensando dos días. Si el guion respeta mi inteligencia, ya me ganó.",
    },
    {
      titulo: "Comedia y drama largo",
      texto:
        "Del humor negro a las series de mafiosos: personajes imperfectos contados con paciencia.",
    },
  ],
  culposos:
    "Culposos declarados: animación para adultos que veo como si fuera documental, y sagas completas que puedo repetir sin culpa.",
  recomendacion: {
    titulo: "Horns, con Daniel Radcliffe",
    texto: "Es mala, palomera, llena de sinsentidos y confusa. Tan mala que es buena.",
    imagen: "/img/rec-culposa.webp",
  },
  /** Collage: posición absoluta en % dentro del contenedor. */
  posters: [
    { src: "/posters/p04.jpg", left: "0%", top: "15%", ancho: "45%", z: 3, giro: -3 },
    { src: "/posters/p09.jpeg", left: "46%", top: "1%", ancho: "31%", z: 5, giro: 2.5 },
    { src: "/posters/p03.jpg", left: "78%", top: "12%", ancho: "22%", z: 2, giro: -2 },
    { src: "/posters/p05.jpg", left: "9%", top: "0%", ancho: "35%", z: 6, giro: 2 },
    { src: "/posters/p08.jpg", left: "43%", top: "27%", ancho: "27%", z: 4, giro: -4 },
    { src: "/posters/p10.jpg", left: "73%", top: "38%", ancho: "27%", z: 7, giro: 3 },
    { src: "/posters/p06.jpg", left: "0%", top: "62%", ancho: "28%", z: 4, giro: -2.5 },
    { src: "/posters/p07.jpg", left: "31%", top: "58%", ancho: "32%", z: 8, giro: 1.5 },
    { src: "/posters/p01.jpg", left: "66%", top: "70%", ancho: "26%", z: 5, giro: -3 },
    { src: "/posters/p02.jpg", left: "10%", top: "76%", ancho: "22%", z: 6, giro: 2 },
  ],
};

// ── 08 Pasiones ────────────────────────────────────────────────
export const pasiones = [
  {
    nombre: "Viajar",
    texto: "Ciudades nuevas, comida rara y perderme sin mapa.",
    imagen: "/img/pas-viajar.webp",
  },
  {
    nombre: "Parques de atracciones",
    texto: "Filas larguísimas por noventa segundos de adrenalina. Vale la pena.",
    imagen: "/img/pas-parques.jpeg",
  },
  {
    nombre: "Videojuegos",
    texto: "Los RPG y los juegos de acción son lo mío.",
    imagen: "/img/pas-videojuegos.jpeg",
  },
  {
    nombre: "Películas y series",
    texto: "Ciencia ficción seria, comedia y drama largo. Veo maratones como quien lee.",
    imagen: "/img/pas-cine.jpeg",
  },
  {
    nombre: "Política y economía",
    texto: "Los temas que no caben en un tuit: entender por qué el mundo funciona así.",
    imagen: "/img/pas-politica.png",
  },
];

// ── 09 Datos rancios ───────────────────────────────────────────
export const datosRancios = [
  {
    titulo: "Una alberca con nombre de ahogado",
    texto:
      "En Australia hay una alberca pública donde se enseña a nadar, nombrada en honor a un primer ministro que se cree que murió ahogado.",
  },
  {
    titulo: "El desastre nuclear que México olvidó",
    texto:
      "Hubo un accidente radiológico en México y, gracias a la corrupción y al descuido, fue bastante peor de lo que la gente cree.",
  },
  {
    titulo: "El lugar más solo del planeta",
    texto:
      "Hay un punto en el océano tan alejado de cualquier costa que la Estación Espacial Internacional pasa más cerca que el suelo firme.",
  },
];

// ── 10 Datos random ────────────────────────────────────────────
export const datosRandom = [
  "Cuando trato de resolver algo, camino y hablo de cualquier cosa en voz alta solo para aclarar la mente.",
  "Tener más de diez pestañas abiertas me da ansiedad.",
  "Más de una vez me he quedado dormido en la silla, frente a la computadora.",
  "Meto frases de series y películas en las conversaciones, como un tic social.",
];
