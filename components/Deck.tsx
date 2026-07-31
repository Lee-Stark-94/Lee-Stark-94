"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { diapositivas, perfil } from "@/data/presentacion";

/**
 * Controlador del deck. Es el único componente cliente: observa qué
 * diapositiva está en pantalla, marca su `data-state` (lo demás lo anima
 * el CSS) y ofrece navegación por teclado y por los puntos laterales.
 *
 * Las diapositivas llegan como `children` y son Server Components: aquí
 * solo se les toca el atributo, nunca el contenido.
 */
export default function Deck({ children }: { children: React.ReactNode }) {
  const escenario = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState(0);
  const total = diapositivas.length;

  const pintar = useCallback((i: number) => {
    const nodos = escenario.current?.querySelectorAll("[data-slide]");
    if (!nodos) return;
    nodos.forEach((s, n) =>
      s.setAttribute("data-state", n === i ? "active" : n < i ? "behind" : "ahead"),
    );
    setActiva(i);
  }, []);

  const irA = useCallback(
    (i: number) => {
      const stage = escenario.current;
      const nodos = stage?.querySelectorAll<HTMLElement>("[data-slide]");
      if (!stage || !nodos?.length) return;
      const n = Math.max(0, Math.min(nodos.length - 1, i));
      stage.scrollTo({ top: nodos[n].offsetTop, behavior: "smooth" });
      pintar(n);
    },
    [pintar],
  );

  // Marca como activa la diapositiva que ocupa la pantalla.
  useEffect(() => {
    const stage = escenario.current;
    if (!stage) return;
    const nodos = Array.from(stage.querySelectorAll("[data-slide]"));

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) pintar(nodos.indexOf(visible.target));
      },
      { root: stage, threshold: 0.5 },
    );

    nodos.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, [pintar]);

  // Teclado: flechas, avance de página, espacio, inicio y fin.
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        irA(activa + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        irA(activa - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        irA(0);
      } else if (e.key === "End") {
        e.preventDefault();
        irA(total - 1);
      }
    };
    addEventListener("keydown", alPulsar);
    return () => removeEventListener("keydown", alPulsar);
  }, [activa, irA, total]);

  return (
    <div className="relative h-[100dvh] font-sans text-texto">
      {/* Barra de progreso */}
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-texto/10">
        <div
          className="h-full bg-acento transition-[width] duration-[550ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: `${((activa + 1) / total) * 100}%` }}
        />
      </div>

      {/* Encabezado fijo: nombre y contador */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center gap-4 px-6 py-5 sm:px-10 lg:px-14">
        <span className="text-[15px] font-medium tracking-[-0.01em]">{perfil.nombre}</span>
        <span className="ml-auto text-xs uppercase tracking-[0.14em] text-texto/55 tabular-nums">
          {String(activa + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      {/* Puntos de navegación */}
      <nav
        aria-label="Secciones"
        className="fixed right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-[11px] sm:right-7"
      >
        {diapositivas.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => irA(i)}
            aria-label={d.nombre}
            aria-current={i === activa ? "true" : undefined}
            className={`h-[3px] rounded-sm transition-all duration-300 ${
              i === activa ? "w-7 bg-acento" : "w-[13px] bg-texto/25 hover:bg-texto/50"
            }`}
          />
        ))}
      </nav>

      <div id="escenario" ref={escenario}>
        {children}
      </div>
    </div>
  );
}
