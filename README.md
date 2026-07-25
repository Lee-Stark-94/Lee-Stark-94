# Portfolio personal

Página personal de una sola vista construida con **Next.js 16 (App Router)**, **React 19**,
**TypeScript** y **Tailwind CSS 4**.

Secciones: portada, sobre mí, habilidades, características, hobbies, mi historia,
visión de futuro y contacto.

## Empezar

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción
npm run start    # sirve el build
```

## Personalizar el contenido

**Todo el contenido vive en un único archivo: [`data/profile.ts`](data/profile.ts).**
No hace falta tocar los componentes: edita ahí tu nombre, redes, textos,
habilidades, hobbies, línea de tiempo y metas, y la página se actualiza sola.

Lo que puedes cambiar:

| Bloque en `data/profile.ts` | Qué controla |
| --- | --- |
| `profile` | Nombre, iniciales, rol, tagline, ubicación, email, foto, CV, badge de disponibilidad |
| `redes` | Enlaces a GitHub, LinkedIn, X… (añade o quita los que quieras) |
| `sobreMi` | Párrafos de presentación y las tarjetas de datos rápidos |
| `habilidades` | Categorías y skills con su nivel (`0`–`100`, se dibuja como barra) |
| `caracteristicas` | Rasgos / forma de trabajar, con emoji, título y texto |
| `hobbies` | Aficiones, con emoji, nombre y descripción |
| `historia` | Línea de tiempo: año, título y texto de cada hito |
| `vision` | Intro + metas a corto, mediano y largo plazo |
| `secciones` | Los enlaces del menú de navegación |

### Poner tu foto

1. Copia tu imagen en la carpeta `public/` (ej. `public/foto.jpg`).
2. En `data/profile.ts` cambia `foto: null` por `foto: "/foto.jpg"`.

Si lo dejas en `null`, se muestra un avatar con tus iniciales.

### Poner tu CV

Igual que la foto: copia el PDF en `public/` y pon `cv: "/cv.pdf"`.
Si es `null`, el botón de descarga no aparece.

### Cambiar los colores

Los colores de la marca están definidos como variables CSS en
[`app/globals.css`](app/globals.css), dentro del bloque `@theme`
(`--color-marca-*` y `--color-acento-*`). Cambia esos valores y el degradado,
los botones y los acentos se actualizan en toda la página.

## Detalles incluidos

- Modo claro/oscuro con toggle, guardado en `localStorage` y sin parpadeo al cargar.
- Navegación fija con resaltado automático de la sección visible y menú móvil.
- Animaciones de entrada al hacer scroll (`IntersectionObserver`).
- Respeta `prefers-reduced-motion`.
- Diseño responsive y metadatos para compartir en redes.

## Estructura

```
app/
  layout.tsx      # metadatos, fuente y script anti-parpadeo del tema
  page.tsx        # ensambla las secciones
  globals.css     # tema, colores y animaciones
components/       # una sección por archivo (Hero, Habilidades, Historia…)
data/profile.ts   # ← tu contenido
```

Para el detalle técnico —flujo de datos, frontera servidor/cliente, sistema de
diseño y decisiones de arquitectura— ver [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Desplegar

El proyecto es estático y se despliega sin configuración en
[Vercel](https://vercel.com/new): importa el repositorio y listo.
