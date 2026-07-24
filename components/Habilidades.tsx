import { habilidades } from "@/data/profile";
import Reveal from "./Reveal";
import Seccion from "./Seccion";

export default function Habilidades() {
  return (
    <Seccion
      id="habilidades"
      etiqueta="Lo que sé hacer"
      titulo="Habilidades"
      descripcion="Las herramientas con las que trabajo a diario. Más que la lista, me interesa saber cuándo usar cada una."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {habilidades.map((grupo, i) => (
          <Reveal
            key={grupo.categoria}
            delay={i * 120}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-marca-300 hover:shadow-lg hover:shadow-marca-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-marca-400/40"
          >
            <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
              {grupo.categoria}
            </h3>
            <ul className="space-y-4">
              {grupo.items.map((item) => (
                <li key={item.nombre}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.nombre}
                    </span>
                    <span className="text-xs tabular-nums text-slate-400 dark:text-slate-500">
                      {item.nivel}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                    <div
                      style={{ ["--nivel" as string]: `${item.nivel}%` }}
                      className="h-full w-0 rounded-full bg-gradient-to-r from-marca-500 to-acento-500 transition-[width] duration-1000 ease-out group-[.visible]:w-(--nivel)"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
