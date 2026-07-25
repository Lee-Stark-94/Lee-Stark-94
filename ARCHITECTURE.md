# Arquitectura

Documento técnico del portfolio personal: cómo está organizado, por qué se tomó
cada decisión y cómo extenderlo sin romper nada.

Para instrucciones de uso y personalización de contenido, ver [`README.md`](README.md).

---

## 1. Resumen

Sitio de **una sola página** (single page, múltiples secciones ancladas) que se
compila a HTML estático. No hay backend, ni base de datos, ni llamadas de red en
tiempo de ejecución.

| Aspecto | Decisión |
| --- | --- |
| Framework | Next.js 16, App Router |
| UI | React 19 |
| Lenguaje | TypeScript en modo `strict` |
| Estilos | Tailwind CSS 4 (configuración en CSS, sin `tailwind.config.js`) |
| Renderizado | Prerenderizado estático en build (SSG) |
| Estado | Ninguno global: solo estado local de UI en 3 componentes |
| Datos | Un módulo TypeScript, `data/profile.ts` |
| Despliegue | Cualquier host de estáticos (Vercel sin configuración) |

**Principio rector:** el contenido se separa por completo de la presentación.
Editar la página no debería requerir leer JSX.

---

## 2. Estructura de carpetas

```
.
├── app/
│   ├── layout.tsx        Shell HTML: <html lang="es">, fuente, metadatos,
│   │                     script anti-parpadeo del tema
│   ├── page.tsx          Única ruta (/). Ensambla las secciones en orden
│   └── globals.css       Tema de diseño, animaciones y estilos base
│
├── components/           Una responsabilidad por archivo
│   ├── Navbar.tsx        [client] Barra fija, scroll spy, menú móvil
│   ├── BotonTema.tsx     [client] Toggle claro/oscuro
│   ├── Reveal.tsx        [client] Primitiva de animación al hacer scroll
│   ├── Seccion.tsx       [server] Envoltorio común: encabezado + contenido
│   ├── Hero.tsx          [server] Portada
│   ├── SobreMi.tsx       [server]
│   ├── Habilidades.tsx   [server]
│   ├── Caracteristicas.tsx
│   ├── Hobbies.tsx
│   ├── Historia.tsx
│   ├── Vision.tsx
│   ├── Contacto.tsx
│   └── Footer.tsx
│
├── data/
│   └── profile.ts        ← ÚNICA fuente de contenido
│
├── next.config.ts
├── postcss.config.mjs    Registra @tailwindcss/postcss
└── tsconfig.json         Alias @/* → raíz del proyecto
```

No hay carpeta `src/`: el proyecto es lo bastante pequeño como para que añadir un
nivel de anidación reste más de lo que aporta.

---

## 3. Flujo de datos

El flujo es unidireccional y se resuelve **en tiempo de compilación**:

```
data/profile.ts
      │  import estático
      ▼
componentes de sección (Server Components)
      │  JSX
      ▼
app/page.tsx
      │  next build
      ▼
HTML estático prerenderizado
```

Consecuencias de este diseño:

- **Cero fetching.** El contenido es un módulo de JS; el bundler lo inlinea.
- **Errores en build, no en producción.** Si borras un campo de `profile.ts`,
  TypeScript falla al compilar, no el navegador del visitante.
- **Cambiar contenido = editar un archivo.** Ningún componente conoce datos
  literales de la persona; todos los leen de `data/profile.ts`.

### El contrato de datos

`data/profile.ts` exporta siete constantes, cada una consumida por exactamente un
componente:

| Export | Consumido por | Forma |
| --- | --- | --- |
| `profile` | `Hero`, `Navbar`, `Contacto`, `Footer`, `layout` | Objeto plano |
| `redes` | `Hero`, `Contacto` | `{ nombre, url, handle }[]` |
| `sobreMi` | `SobreMi` | `{ titulo, parrafos[], datosRapidos[] }` |
| `habilidades` | `Habilidades` | `{ categoria, items: { nombre, nivel }[] }[]` |
| `caracteristicas` | `Caracteristicas` | `{ icono, titulo, texto }[]` |
| `hobbies` | `Hobbies` | `{ icono, nombre, texto }[]` |
| `historia` | `Historia` | `{ año, titulo, texto }[]` |
| `vision` | `Vision` | `{ intro, metas[] }` |
| `secciones` | `Navbar` | `{ id, nombre }[]` |

Los tipos son **inferidos**, no declarados: escribir `interface Hobby { … }`
duplicaría información que la propia estructura literal ya expresa. Las
excepciones son los campos opcionales (`foto`, `cv`), anotados como
`null as string | null` para que aceptar una ruta más tarde no sea un error de
tipo.

Todas las listas se renderizan con `.map()`, así que **añadir o quitar elementos
no requiere tocar código**: tres hobbies o nueve funcionan igual.

---

## 4. Frontera servidor / cliente

Next.js App Router renderiza en el servidor por defecto. Solo tres componentes
llevan `"use client"`, y cada uno por un motivo concreto:

| Componente | Por qué necesita cliente |
| --- | --- |
| `Navbar` | Listener de `scroll`, `IntersectionObserver` (scroll spy), estado del menú móvil |
| `BotonTema` | Lee y escribe `localStorage`, manipula `classList` |
| `Reveal` | `IntersectionObserver` para disparar la animación de entrada |

Todo lo demás —las ocho secciones de contenido— es **Server Component**: se
convierte en HTML durante el build y no envía JavaScript al navegador. El JS del
cliente se limita a la navegación, el tema y las animaciones.

Esta frontera es deliberada. `Reveal` existe precisamente para que las secciones
puedan seguir siendo componentes de servidor: en vez de convertir `Habilidades`
en cliente para animarla, se envuelve su contenido en una primitiva de cliente
mínima.

---

## 5. Sistema de diseño

### Tokens

Tailwind 4 se configura **en CSS**, no en un archivo JS. El bloque `@theme` de
`app/globals.css` define la paleta:

```css
@theme {
  --color-marca-500:  #3563f5;   /* azul principal */
  --color-acento-500: #06b6d4;   /* cian de apoyo  */
  --font-sans: var(--fuente-sans), …;
}
```

Cada variable genera utilidades automáticamente: `--color-marca-500` habilita
`bg-marca-500`, `text-marca-500`, `border-marca-500`, etc. **Cambiar la marca
entera es cambiar esas variables**; no hay colores hardcodeados repartidos por
los componentes.

La fuente (Inter) se carga con `next/font/google`, que la autoaloja en el build:
sin peticiones a Google en tiempo de ejecución y sin desplazamiento de layout.

### Modo oscuro

Estrategia: **clase `.dark` en `<html>`**, no `prefers-color-scheme` puro, para
que el usuario pueda sobrescribir la preferencia del sistema.

```css
@custom-variant dark (&:where(.dark, .dark *));
```

El problema clásico de esta estrategia es el **parpadeo blanco**: el HTML llega
sin la clase y React la aplica después de hidratar. Se resuelve con un script
síncrono en `<head>` (`layout.tsx`), que corre antes del primer pintado:

```
localStorage.tema  →  si no existe, prefers-color-scheme  →  html.classList.toggle('dark')
```

`BotonTema` monta con `montado = false` y solo entonces lee el DOM, de modo que
el HTML del servidor y el del cliente coinciden y no hay error de hidratación.
`<html>` lleva `suppressHydrationWarning` porque el script modifica su
`className` legítimamente antes de que React tome el control.

---

## 6. Animaciones

Un único mecanismo, usado en toda la página:

1. `Reveal` observa su propio nodo con `IntersectionObserver`.
2. Al entrar en pantalla añade la clase `.visible` y **se desconecta** (la
   animación ocurre una sola vez; no se repite al volver a subir).
3. El CSS hace el resto: `.reveal` parte de `opacity: 0` y `.reveal.visible`
   dispara el keyframe `aparecer`.

El escalonado entre tarjetas se logra con la prop `delay`, aplicada como
`animation-delay` en línea (`delay={i * 90}`), no con timers en JS.

**Barras de habilidades.** `Reveal` añade también la clase `group`, lo que
permite que un hijo reaccione al estado del padre solo con CSS:

```tsx
style={{ "--nivel": `${item.nivel}%` }}
className="w-0 transition-[width] duration-1000 group-[.visible]:w-(--nivel)"
```

El ancho vive en una variable CSS y la transición la dispara la clase del padre.
Ni un solo `useState` por barra.

**Accesibilidad.** Todo el bloque `prefers-reduced-motion: reduce` de
`globals.css` neutraliza el sistema: `opacity: 1`, `animation: none`, scroll no
suave y transiciones a `0.01ms`. Quien haya pedido menos movimiento ve la página
completa y estática.

Si `IntersectionObserver` no existe, `Reveal` muestra el contenido
inmediatamente: la degradación es hacia "visible", nunca hacia "invisible".

---

## 7. Navegación

- **Anclas nativas.** Los enlaces son `<a href="#seccion">` y el desplazamiento
  suave lo aporta `scroll-behavior: smooth` en CSS. Sin router, sin JS.
- **Compensación de la barra fija.** `scroll-padding-top: 5.5rem` en `<html>`
  más `scroll-mt-24` en cada sección evitan que el encabezado quede tapado.
- **Scroll spy.** Un `IntersectionObserver` con
  `rootMargin: "-45% 0px -45% 0px"` define una banda estrecha en el centro de la
  pantalla; la sección que la ocupa es la activa. Cuando varias entran a la vez,
  gana la de mayor `intersectionRatio`.
- **Menú móvil.** Bloquea `body.overflow` mientras está abierto y lo restaura al
  desmontar; se cierra al pulsar cualquier enlace.

El orden de las secciones en el menú lo dicta el array `secciones` de
`profile.ts`; el orden visual lo dicta `app/page.tsx`. **Mantenerlos
sincronizados es manual** — es la única duplicación consciente del proyecto, a
cambio de poder ocultar una sección del menú sin borrarla de la página.

---

## 8. Rendimiento y SEO

- Ruta única prerenderizada como estática (`○ /` en la salida del build).
- Sin dependencias de terceros más allá de React, Next y Tailwind: ni librería
  de animaciones, ni de iconos (los iconos son SVG en línea), ni de estado.
- Fuente autoalojada con `display: swap`.
- Los fondos decorativos son gradientes CSS, no imágenes.
- La foto opcional pasa por `next/image` con `priority` y `sizes` declarados.
- Metadatos y Open Graph se generan en `layout.tsx` **desde `profile.ts`**: el
  título de la pestaña y el de la tarjeta al compartir nunca se desincronizan
  del contenido.
- Idioma declarado (`<html lang="es">`) y jerarquía de encabezados correcta: un
  único `<h1>` en la portada, `<h2>` por sección, `<h3>` en tarjetas.
- Los elementos puramente decorativos llevan `aria-hidden`; los botones de icono,
  `aria-label`.

---

## 9. Cómo extender

### Añadir una sección nueva

1. Añade sus datos como un export nuevo en `data/profile.ts`.
2. Crea `components/MiSeccion.tsx` usando `<Seccion>` como envoltorio y
   `<Reveal>` para los elementos que deban animarse.
3. Impórtala y colócala en `app/page.tsx`.
4. Añade `{ id: "mi-seccion", nombre: "Mi sección" }` al array `secciones`.

El `id` del array **debe coincidir** con el `id` que le pasas a `<Seccion>`:
de ahí salen tanto el ancla del enlace como el nodo que observa el scroll spy.

### Añadir una página (ej. `/proyectos`)

Crear `app/proyectos/page.tsx`. `layout.tsx` ya envuelve todas las rutas, así que
el tema y la fuente se heredan sin tocar nada. `Navbar` está pensada para anclas
de una sola página: para navegación entre rutas habría que usar `next/link` y
distinguir enlaces internos de anclas.

### Cambiar la paleta

Editar `--color-marca-*` y `--color-acento-*` en el `@theme` de `globals.css`.
Los degradados (`.texto-degradado`, barras, bordes superiores de las tarjetas de
visión) están construidos sobre esas mismas variables y se actualizan solos.

---

## 10. Decisiones y sus alternativas

| Decisión | Alternativa descartada | Motivo |
| --- | --- | --- |
| Contenido en `data/profile.ts` | Texto dentro del JSX | Editar la página no debe exigir entender React |
| Módulo TS | CMS, Markdown, JSON | Sin build extra, sin parser, y con verificación de tipos gratis |
| Server Components por defecto | Todo cliente | Menos JS enviado; el cliente se reserva para lo que de verdad lo necesita |
| `IntersectionObserver` propio | Framer Motion, AOS | ~40 líneas frente a una dependencia; cero peso añadido |
| Tema por clase `.dark` | Solo `prefers-color-scheme` | Permite que el usuario decida, no solo su sistema operativo |
| Script síncrono en `<head>` | Aplicar el tema en `useEffect` | Elimina el parpadeo blanco en la primera carga |
| Anclas nativas + CSS | Scroll suave en JS | Menos código y respeta `prefers-reduced-motion` de serie |
| Tipos inferidos | Interfaces explícitas | Los literales ya describen la forma; declararla dos veces envejece mal |
| Sin `src/` | `src/app`, `src/components` | Proyecto pequeño: la anidación extra no aporta |

---

## 11. Limitaciones conocidas

- **Una sola página.** Crecer a varias rutas exige adaptar la navegación (ver §9).
- **Un solo idioma.** Los textos son español fijo; internacionalizar implicaría
  convertir `profile.ts` en un mapa por locale y usar el enrutado i18n de Next.
- **`secciones` y `page.tsx` se sincronizan a mano** (ver §7).
- **Sin tests.** El proyecto no tiene lógica de negocio; lo que podría fallar
  —el scroll spy, la persistencia del tema— es comportamiento de navegador, que
  requeriría tests E2E con Playwright, no unitarios.
- **Niveles de habilidad como porcentaje.** Es una convención visual, no una
  medida; se documenta aquí para que nadie busque una métrica detrás.
