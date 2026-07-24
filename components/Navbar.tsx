"use client";

import { useEffect, useState } from "react";
import { profile, secciones } from "@/data/profile";
import BotonTema from "./BotonTema";

export default function Navbar() {
  const [conFondo, setConFondo] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState<string>("");

  useEffect(() => {
    const alHacerScroll = () => setConFondo(window.scrollY > 24);
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  // Resalta en el menú la sección que se está viendo.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiva(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    secciones.forEach(({ id }) => {
      const nodo = document.getElementById(id);
      if (nodo) observador.observe(nodo);
    });

    return () => observador.disconnect();
  }, []);

  // Evita el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        conFondo
          ? "border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#060814]/90"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#inicio"
          className="text-sm font-semibold tracking-tight text-slate-900 transition hover:text-marca-600 dark:text-white dark:hover:text-marca-300"
        >
          <span className="texto-degradado">{profile.iniciales}</span>
          <span className="ml-2 hidden text-slate-500 sm:inline dark:text-slate-400">
            {profile.nombre}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {secciones.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                activa === s.id
                  ? "bg-marca-500/10 font-medium text-marca-600 dark:bg-marca-400/10 dark:text-marca-300"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {s.nombre}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <BotonTema />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={abierto}
            className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-700 lg:hidden dark:border-white/10 dark:text-slate-300"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl transition-[max-height] duration-300 lg:hidden dark:border-white/10 dark:bg-[#060814]/95 ${
          abierto ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <ul className="space-y-1 px-5 py-4">
          {secciones.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setAbierto(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
              >
                {s.nombre}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
