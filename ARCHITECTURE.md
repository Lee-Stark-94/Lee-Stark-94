# Arquitectura

Documento técnico de la presentación personal: cómo está organizada, por qué se
tomó cada decisión y cómo extenderla sin romper nada.

Para instrucciones de uso y personalización de contenido, ver [`README.md`](README.md).

---

## 1. Resumen

**Deck de diapositivas a pantalla completa.** Diez pantallas, una por vista, con
scroll-snap vertical, navegación por teclado y transiciones distintas entre
diapositivas. Se compila a HTML estático: no hay backend, ni base de datos, ni
llamadas de red en tiempo de ejecución.

| Aspecto | Decisión |
| --- | --- |
| Framework | Next.js 16, App Router |
| UI | React 19 |
| Lenguaje | TypeScript en modo `strict` |
| Estilos | Tailwind CSS 4 (configuración en CSS, sin `tailwind.config.js`) |
| Sistema de diseño | Nocturne (tokens copiados al `@theme` de `globals.css`) |
| Renderizado | Prerenderizado estático en build (SSG) |
| Tema | Solo oscuro. No hay toggle: el diseño es un deck, no una web de lectura |
| Estado | Uno solo: qué diapositiva está activa |
| Datos | Un módulo TypeScript, `data/presentacion.ts` |

**Principio rector:** el contenido se separa de la presentación, y el cliente se
reserva para lo único que CSS no resuelve: saber en qué diapositiva estás.

Este proyecto viene de un diseño hecho en [Claude
Design](https://claude.ai/design) (proyecto *Presentación personal interactiva*).
La §10 explica qué se trajo y qué se dejó fuera deliberadamente.

---

## 2. Estructura de carpetas

```
.
├── app/
│   ├── layout.tsx        Shell HTML: <html lang="es" class="dark">, fuente,
│   │                     metadatos y Open Graph desde presentacion.ts
│   ├── page.tsx          Única ruta (/). Las diez diapositivas, en orden
│   └── globals.css       Tokens de Nocturne, escenario y transiciones
│
├── components/
│   ├── Deck.tsx          [client] Controlador: diapositiva activa, teclado,
│   │                              puntos, contador y barra de progreso
│   └── Diapositiva.tsx   [server] Envoltorio de diapositiva + Kicker + Marco
│
├── data/
│   └── presentacion.ts   ← ÚNICA fuente de contenido
│
├── public/
│   ├── img/              Retrato, memes y fotos de las diapositivas
│   └── posters/          Collage de la diapositiva 07
│
├── next.config.ts
├── postcss.config.mjs    Registra @tailwindcss/postcss
└── tsconfig.json         Alias @/* → raíz del proyecto
```

Dos componentes. No hay carpeta `src/`: el proyecto es lo bastante pequeño como
para que añadir un nivel de anidación reste más de lo que aporta.

---

## 3. Flujo de datos

Unidireccional y resuelto **en tiempo de compilación**:

```
data/presentacion.ts
      │  import estático
      ▼
app/page.tsx (Server Components)
      │  JSX
      ▼
<Deck> como children
      │  next build
      ▼
HTML estático prerenderizado
```

- **Cero fetching.** El contenido es un módulo de JS; el bundler lo inlinea.
- **Errores en build, no en producción.** Si borras un campo, TypeScript falla al
  compilar, no el navegador del visitante.
- **`Deck` nunca toca el contenido.** Recibe las diapositivas como `children` ya
  renderizadas y solo les cambia un atributo (§5). Por eso pueden seguir siendo
  componentes de servidor.

### El contrato de datos

| Export | Consumido por | Forma |
| --- | --- | --- |
| `perfil` | `Deck`, portada, `layout` | Objeto plano |
| `diapositivas` | `Deck` (puntos), `page` (efectos) | `{ id, nombre, fx }[]` |
| `origen` | Diapositiva 02 | `{ kicker, titulo[], parrafos[], imagen, pie }` |
| `educacion` | Diapositiva 03 | `{ periodo, texto, imagen }[]` |
| `cancun` | Diapositiva 04 | `{ datos[], fondo }` |
| `carrera` | Diapositiva 05 | `{ areas[], imagen, pie }` |
| `entretenimiento` | Diapositiva 07 | `{ generos[], culposos, recomendacion, posters[] }` |
| `pasiones` | Diapositiva 08 | `{ nombre, texto, imagen }[]` |
| `datosRancios` | Diapositiva 09 | `{ titulo, texto }[]` |
| `datosRandom` | Diapositiva 10 | `string[]` |

`diapositivas` es el array rector: **su orden es el orden de los puntos de
navegación, del contador y de los efectos de transición**. El orden visual lo
dicta `app/page.tsx`. Mantenerlos sincronizados es manual — ver §9.

Los tipos son **inferidos**, no declarados: los literales ya describen la forma.
`diapositivas` lleva `as const` para que `fx` sea una unión de literales y no
`string`.

Las listas se renderizan con `.map()`: añadir o quitar elementos no requiere
tocar código. Las diapositivas de prosa a medida (01, 02, 04, 05, 06) llevan su
texto en el JSX cuando ese texto es indisociable del layout —una frase partida en
dos líneas con `<br>`, un `<em>` en mitad del párrafo—. Forzar eso a pasar por el
módulo de datos añadiría indirección sin ganar nada.

---

## 4. Frontera servidor / cliente

Next.js App Router renderiza en el servidor por defecto. **Un solo componente**
lleva `"use client"`:

| Componente | Por qué necesita cliente |
| --- | --- |
| `Deck` | `IntersectionObserver` sobre el escenario, listener de teclado, y el estado de qué diapositiva está activa |

Todo lo demás —las diez diapositivas y sus piezas— es **Server Component**: se
convierte en HTML durante el build y no envía JavaScript al navegador.

El criterio para cruzar la frontera es estrecho: **solo pasa a cliente lo que
necesita una API del navegador sin equivalente en CSS**. Saber qué diapositiva
ocupa la pantalla es exactamente eso; animar la entrada del contenido no lo es, y
por eso vive entero en CSS (§5).

---

## 5. El mecanismo de las transiciones

Un único mecanismo para todo el deck, y el contenido no se entera de que existe.

1. `Deck` observa el escenario con `IntersectionObserver` (`threshold: 0.5`).
2. A cada `<section data-slide>` le pone **`data-state`**: `active` la que se ve,
   `behind` las que quedan arriba, `ahead` las de abajo.
3. El CSS hace el resto. Cada elemento marcado con `data-anim` reacciona al
   estado de su diapositiva padre:

```css
[data-state="active"] [data-anim] { opacity: 1; transform: none; }
[data-state="ahead"]  [data-anim] { opacity: 0; transform: translateY(70px) scale(.97); }
[data-state="behind"] [data-anim] { opacity: 0; transform: translateY(-70px) scale(.97); }
```

**Efecto por diapositiva.** El atributo `data-fx` sobreescribe ese transform por
defecto. Hay siete: `zoom`, `izq`, `der`, `flip`, `giro`, `desenfoque` y `caida`.
Cambiar el efecto de una diapositiva es cambiar una cadena en `presentacion.ts`.

**Escalonado.** El *valor* de `data-anim` (0 a 6) es el orden de entrada: cada
número añade 80 ms de `transition-delay`. No hay timers en JS.

**Ventaja de atarlo a un atributo y no a la posición del scroll:** la animación es
un cambio de estado discreto, no algo *scrubbeado*. Entra una vez al llegar y se
queda; al subir se invierte de forma limpia porque el estado cambia de golpe, no
proporcionalmente al scroll.

**Accesibilidad.** El bloque `prefers-reduced-motion: reduce` neutraliza el
sistema entero: `transition: none`, `opacity: 1`, `transform: none`. Quien haya
pedido menos movimiento ve cada diapositiva completa y quieta.

---

## 6. Navegación

- **Scroll-snap.** `#escenario` lleva `scroll-snap-type: y mandatory` y cada
  diapositiva `scroll-snap-align: start`. El encaje lo hace el navegador; no hay
  JavaScript interceptando la rueda del ratón.
- **Teclado.** `↓ → PageDown Espacio` avanzan, `↑ ← PageUp` retroceden, `Home` y
  `End` van a los extremos. El listener ignora la pulsación si el foco está en un
  campo de texto.
- **Puntos laterales.** Uno por diapositiva, generados desde `diapositivas`. El
  activo se ensancha y toma el color de acento. Llevan `aria-label` con el nombre
  de la sección y `aria-current` el que está activo.
- **Contador y barra de progreso.** Ambos derivan del mismo estado; no hay una
  segunda fuente de verdad que se pueda desincronizar.

El scroll se hace sobre `#escenario`, no sobre `<body>`: `html, body` llevan
`overflow: hidden` porque la página no debe desplazarse por detrás del deck.

---

## 7. Sistema de diseño

### Tokens

Tailwind 4 se configura **en CSS**. El bloque `@theme` de `app/globals.css`
contiene los tokens de **Nocturne**, copiados del sistema de diseño del proyecto
original:

```css
@theme {
  --color-fondo:      #161826;   /* ground */
  --color-superficie: #232532;   /* tarjetas */
  --color-texto:      #e9e9ed;
  --color-acento:     #9184d9;   /* blurple */
  --color-seccion:    #262a60;   /* fondo de diapositivas divisorias */
}
```

Cada variable genera utilidades automáticamente: `--color-acento` habilita
`bg-acento`, `text-acento`, `border-acento`. **Cambiar la marca entera es cambiar
esas variables.**

Dos familias de fondo, y la distinción es deliberada: las diapositivas normales
usan `--color-fondo` (neutro desaturado) y las divisorias —03, 05 y 08—
`--color-seccion` (índigo saturado). La saturación marca el ritmo del deck. Es un
relleno a escala de diapositiva, nunca un color de interfaz.

Los degradados radiales de cada diapositiva (los halos) van en línea: son
composiciones únicas, no tokens reutilizables, y sacarlos a CSS solo añadiría un
nombre que buscar.

La fuente (Inter) se carga con `next/font/google`, que la autoaloja en el build:
sin peticiones a Google en tiempo de ejecución y sin desplazamiento de layout.

### Pantallas bajas

Un deck a pantalla completa tiene un enemigo claro: la altura. Tres `@media
(max-height: …)` reducen paddings, títulos y line-height en 780 px, 660 px y
580 px para que ninguna diapositiva necesite scroll interno.

---

## 8. Imágenes

`Marco` ([`components/Diapositiva.tsx`](components/Diapositiva.tsx)) envuelve cada
imagen con un `aspect-ratio` fijo y un fondo tenue. Ese fondo no es decorativo:
**si el archivo falta se ve un hueco discreto en vez de un icono de imagen rota**,
y el layout no se mueve porque la proporción está declarada en CSS.

Son `<img>` planos, no `next/image`. El collage de la diapositiva 07 posiciona
diez pósters en absoluto por porcentaje y rotación; `next/image` no aporta nada
ahí y estorba. El resto son archivos pequeños ya optimizados.

Las extensiones no están normalizadas (`.jpg`, `.jpeg`, `.png`, `.webp` conviven):
cada ruta de `presentacion.ts` apunta al archivo tal cual está en `public/`. Al
reemplazar una imagen por otra de distinto formato hay que actualizar su ruta.

---

## 9. Cómo extender

### Añadir una diapositiva

1. Añade sus datos como export nuevo en `data/presentacion.ts`.
2. Añade `{ id: "mi-slide", nombre: "Mi sección", fx: "zoom" }` al array
   `diapositivas`, **en la posición que le toque**.
3. En `app/page.tsx`, añade un `<Diapositiva id="mi-slide" fx={fx["mi-slide"]}>`
   en esa misma posición.
4. Marca con `data-anim="0"`, `"1"`, `"2"`… los elementos que deban entrar
   escalonados.

El `id` **debe coincidir** en los tres sitios: de ahí salen el punto de
navegación, el efecto y el ancla.

### Cambiar el efecto de una diapositiva

Editar su `fx` en `diapositivas`. Los siete valores válidos están en §5 y
definidos en `globals.css`.

### Cambiar la paleta

Editar las variables del `@theme` en `globals.css`. Los halos en línea usan
`rgba()` literal y **no** se actualizan solos: es la contrapartida consciente de
no haberlos convertido en tokens.

### Añadir una página (ej. `/proyectos`)

Crear `app/proyectos/page.tsx`. `layout.tsx` ya envuelve todas las rutas. `Deck`
está pensado para un deck de una sola ruta: para navegación entre rutas habría
que usar `next/link` fuera del escenario.

---

## 10. Decisiones y sus alternativas

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Contenido en `data/presentacion.ts` | Todo el texto dentro del JSX | Editar la presentación no debe exigir entender React |
| Módulo TS | CMS, Markdown, JSON | Sin build extra, sin parser, y con verificación de tipos gratis |
| Next.js + React | Astro, generador estático, HTML a mano | Ver nota abajo: la razón **no** es técnica |
| Un solo componente cliente | Convertir cada diapositiva en cliente | El contenido es estático; solo el índice activo cambia |
| Transiciones por `data-state` | Scroll-driven (`animation-timeline`) | Un deck quiere estados discretos, no animación proporcional al scroll |
| Transiciones en CSS | Framer Motion, GSAP | Cero dependencias; lo hace el compositor |
| Scroll-snap nativo | Librería de deck (Reveal.js, Swiper) | El navegador ya encaja las diapositivas; el resto son ~90 líneas |
| `<img>` plano | `next/image` | El collage se posiciona en absoluto; los archivos ya son pequeños |
| Solo tema oscuro | Toggle claro/oscuro | Nocturne está diseñado en oscuro; un deck no se lee como un blog |
| Tipos inferidos | Interfaces explícitas | Los literales ya describen la forma |
| Sin `src/` | `src/app`, `src/components` | Dos componentes: la anidación extra no aporta |

### Nota honesta sobre Next.js y React

Conviene no venderlo como una decisión de rendimiento, porque no lo es. De todo
Next.js el proyecto usa el tipo `Metadata` (cero runtime) y `Inter` de
`next/font/google`. No hay API routes, ni server actions, ni middleware, ni rutas
dinámicas, ni ISR, ni caché. Los Server Components no renderizan nada en
servidor: producen HTML constante en build. Eso es JSX haciendo de motor de
plantillas.

Un generador estático bastaría técnicamente, y enviaría menos JS. Las razones
reales para quedarse en Next.js son dos, y las dos son legítimas:

1. **Tooling incluido**: autoalojado de fuentes sin CLS, API de metadatos y Open
   Graph, prerenderizado.
2. **El repo es parte del CV.** Quien revisa el código ve el stack que la persona
   dice dominar.

### Qué se dejó fuera del proyecto de Design

El HTML original venía envuelto en el runtime de la herramienta: `<x-dc>`, la
clase `DCLogic`, `support.js`, `_ds_bundle.js` y el componente `<image-slot>`.
Nada de eso se importó, y no por purismo:

- `<image-slot>` es un custom element con Shadow DOM cuyo único trabajo era
  aceptar una imagen y ajustar el marco. En React eso es un `<img>` dentro de un
  `div` con `aspect-ratio`.
- El original corregía los marcos con **dos `setInterval` de 400 ms y 600 ms**
  que reinyectaban estilos en cada Shadow Root indefinidamente. Aquí las
  proporciones son CSS estático: se resuelven una vez, en el build.
- Los estilos en línea de cada elemento se tradujeron a utilidades de Tailwind, y
  los tokens del sistema al `@theme`.

Lo que **sí** se conservó tal cual: la paleta, los siete efectos de transición,
el escalonado de 80 ms, los tres breakpoints por altura y el copy completo.

---

## 11. Limitaciones conocidas

- **Imágenes sin optimizar.** Nadie ha pasado los archivos de `public/` por un
  compresor. Los dos casos que más pesan frente a lo que ocupan en pantalla:
  `pas-politica.png` son 2,2 MB para una tarjeta que se dibuja a ~300 px, y
  `posters/p06.jpg` son 2000×3000 px para un póster de ~90 px en el collage.
  Comprimir y reescalar quitaría la mayor parte del peso de la página.
- **`cancun.png` se ve blando.** Son 612×408 px estirados a pantalla completa con
  `object-fit: cover`; en un monitor de 1920 px eso es un aumento de 3×. Se nota
  en las hojas de las palmeras. Al 58 % de opacidad y bajo el degradado pasa
  bastante desapercibido, pero una versión de más resolución lo arreglaría.

  Mientras falten, los marcos muestran un hueco tenue y el collage sale con cinco
  pósters en vez de diez. No rompe el layout.
- **No hay sección de proyectos ni de contacto.** Como presentación personal el
  deck funciona; como CV no le dice a quien lo lee qué has construido ni dónde
  escribirte.
- **Los halos no siguen a los tokens** (ver §9).
- **`diapositivas` y `page.tsx` se sincronizan a mano** (ver §3).
- **Una sola ruta y un solo idioma.**
- **Sin tests.** No hay lógica de negocio; lo que podría fallar —el observer del
  escenario, la navegación por teclado— es comportamiento de navegador, que
  requeriría tests E2E con Playwright, no unitarios.
- **`npm run lint` está roto.** El script llama a `next lint`, que Next 16
  eliminó, y el proyecto no tiene ESLint instalado ni configurado. O se instala
  ESLint o se borra el script.
