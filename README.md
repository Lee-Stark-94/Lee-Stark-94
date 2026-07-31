# Presentación personal

Deck interactivo de diez diapositivas a pantalla completa, construido con
**Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS 4**.

Diapositivas: portada, origen, historial académico, Cancún, carrera, curiosidad,
entretenimiento, pasiones, datos rancios y datos random.

## Empezar

```bash
npm install
```

```bash
npm run dev
```

Abre <http://localhost:3000>. Otros comandos:

```bash
npm run build
```

```bash
npm run start
```

> `npm run lint` no funciona: llama a `next lint`, que Next 16 eliminó, y el
> proyecto no tiene ESLint instalado. O se instala ESLint o se borra el script.

## Cómo se navega

| Acción | Teclas |
| --- | --- |
| Avanzar | `↓` `→` `PageDown` `Espacio` |
| Retroceder | `↑` `←` `PageUp` |
| Ir al principio / al final | `Home` / `End` |

También funciona el scroll normal (cada diapositiva encaja sola) y los puntos de
la derecha, que llevan directamente a cualquier diapositiva.

## Personalizar el contenido

**Todo el contenido vive en un único archivo:
[`data/presentacion.ts`](data/presentacion.ts).** No hace falta tocar los
componentes.

| Bloque en `data/presentacion.ts` | Qué controla |
| --- | --- |
| `perfil` | Nombre, rol, tagline, entradilla y ruta del retrato |
| `diapositivas` | El orden del deck, los nombres de los puntos y el efecto de cada diapositiva |
| `origen` | Diapositiva 02: título, párrafo, imagen y pie |
| `educacion` | Diapositiva 03: una tarjeta por etapa (periodo, texto, imagen) |
| `cancun` | Diapositiva 04: los tres datos y el fondo |
| `carrera` | Diapositiva 05: las áreas de trabajo, imagen y pie |
| `entretenimiento` | Diapositiva 07: géneros, recomendación culposa y el collage de pósters |
| `pasiones` | Diapositiva 08: una tarjeta por afición (nombre, texto, imagen) |
| `datosRancios` | Diapositiva 09: los datos numerados |
| `datosRandom` | Diapositiva 10: las tarjetas de cierre |

Las listas se renderizan con `.map()`: puedes añadir o quitar elementos sin tocar
código. Tres pasiones o siete funcionan igual.

El texto de las diapositivas 01, 02, 04, 05 y 06 que va partido en varias líneas o
lleva cursivas está en [`app/page.tsx`](app/page.tsx), junto a su maquetación,
porque ahí el texto y el layout son inseparables.

### Añadir o quitar una diapositiva

1. Añade o quita sus datos en `data/presentacion.ts`.
2. Actualiza el array `diapositivas`, **en la posición que le toque**.
3. Añade o quita su `<Diapositiva>` en `app/page.tsx`, en esa misma posición.

El `id` debe ser el mismo en los tres sitios.

### Cambiar el efecto de una transición

En el array `diapositivas`, cambia el campo `fx`. Valores válidos:

`zoom` · `izq` · `der` · `flip` · `giro` · `desenfoque` · `caida`

### Poner las imágenes

Van en `public/` y sus rutas están en `data/presentacion.ts`:

- `public/img/` — retrato, memes y fotos de las diapositivas
- `public/posters/` — el collage de la diapositiva 07

> **Faltan diez imágenes.** Las rutas ya están puestas; basta con copiar los
> archivos con esos nombres exactos y aparecen solas. Mientras falten, los marcos
> muestran un hueco tenue en vez de una imagen rota, y el collage sale con cinco
> pósters en vez de diez. No se rompe nada.
>
> | Archivo | Diapositiva |
> | --- | --- |
> | `public/img/cancun.png` | 04 Cancún (fondo) |
> | `public/posters/p03.jpg` `p06` `p07` `p08` `p09` | 07 Entretenimiento |
> | `public/img/pas-parques.webp` `pas-videojuegos` `pas-cine` `pas-politica` | 08 Pasiones |

### Cambiar los colores

Están como variables CSS en [`app/globals.css`](app/globals.css), dentro del
bloque `@theme`:

```css
--color-fondo:      #161826;   /* fondo general */
--color-superficie: #232532;   /* tarjetas */
--color-texto:      #e9e9ed;
--color-acento:     #9184d9;   /* puntos, barra de progreso, etiquetas */
--color-seccion:    #262a60;   /* fondo de las diapositivas 03, 05 y 08 */
```

Cambia esos valores y se actualiza todo el deck. La única excepción son los halos
de fondo de cada diapositiva, que llevan sus `rgba()` en línea en `app/page.tsx`.

## Detalles incluidos

- Scroll-snap vertical: una diapositiva por pantalla, encajada por el navegador.
- Siete efectos de transición distintos, en CSS puro. Cero dependencias de animación.
- Entrada escalonada de los elementos de cada diapositiva.
- Navegación por teclado y por puntos, con contador y barra de progreso.
- Se adapta a pantallas bajas para que ninguna diapositiva necesite scroll interno.
- Respeta `prefers-reduced-motion`.
- Metadatos y Open Graph generados desde `data/presentacion.ts`.

## Estructura

```
app/
  layout.tsx           # metadatos, fuente
  page.tsx             # las diez diapositivas
  globals.css          # tokens, escenario y transiciones
components/
  Deck.tsx             # navegación y diapositiva activa
  Diapositiva.tsx      # envoltorio + Kicker + Marco
data/presentacion.ts   # ← tu contenido
public/img, public/posters
```

Para el detalle técnico —flujo de datos, frontera servidor/cliente, cómo funcionan
las transiciones y por qué se tomó cada decisión— ver
[`ARCHITECTURE.md`](ARCHITECTURE.md).

## Desplegar

Se despliega sin configuración en [Vercel](https://vercel.com/new): importa el
repositorio y listo.

Para un host de estáticos puro (GitHub Pages, Netlify drop, S3) hace falta añadir
`output: "export"` en [`next.config.ts`](next.config.ts); sin eso, `next build`
genera una salida pensada para el servidor de Next.
