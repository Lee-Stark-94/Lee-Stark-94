import { caracteristicas } from "@/data/profile";
import Reveal from "./Reveal";
import Seccion from "./Seccion";

export default function Caracteristicas() {
  return (
    <Seccion
      id="caracteristicas"
      etiqueta="Cómo trabajo"
      titulo="Características"
      descripcion="Lo que no aparece en un CV pero define cómo me muevo en un equipo y en un proyecto."
      className="bg-slate-50/60 dark:bg-white/[0.02]"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {caracteristicas.map((c, i) => (
          <Reveal
            key={c.titulo}
            delay={i * 80}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-marca-300 hover:shadow-xl hover:shadow-marca-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-marca-400/40"
          >
            <div
              aria-hidden
              className="absolute -top-12 -right-12 size-32 rounded-full bg-marca-500/5 transition group-hover:bg-marca-500/10"
            />
            <span className="relative mb-4 grid size-12 place-items-center rounded-xl bg-marca-500/10 text-2xl">
              {c.icono}
            </span>
            <h3 className="relative mb-2 text-lg font-semibold text-slate-900 dark:text-white">
              {c.titulo}
            </h3>
            <p className="relative text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {c.texto}
            </p>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
