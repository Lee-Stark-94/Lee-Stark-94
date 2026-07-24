import { vision } from "@/data/profile";
import Reveal from "./Reveal";
import Seccion from "./Seccion";

export default function Vision() {
  return (
    <Seccion
      id="vision"
      etiqueta="Hacia dónde voy"
      titulo="Visión de futuro"
      descripcion={vision.intro}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {vision.metas.map((m, i) => (
          <Reveal
            key={m.horizonte}
            delay={i * 120}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-marca-500/5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-marca-500 to-acento-500"
            />
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-marca-600 dark:text-marca-400">
                {m.horizonte}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500 dark:bg-white/10 dark:text-slate-400">
                {m.periodo}
              </span>
            </div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              {m.titulo}
            </h3>
            <ul className="space-y-3">
              {m.puntos.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="mt-0.5 size-4 shrink-0 text-marca-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
