import { sobreMi } from "@/data/profile";
import Reveal from "./Reveal";
import Seccion from "./Seccion";

export default function SobreMi() {
  return (
    <Seccion
      id="sobre-mi"
      etiqueta="Quién soy"
      titulo={sobreMi.titulo}
      className="bg-slate-50/60 dark:bg-white/[0.02]"
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {sobreMi.parrafos.map((p, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {sobreMi.datosRapidos.map((d, i) => (
            <Reveal
              key={d.etiqueta}
              delay={i * 90}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-marca-300 hover:shadow-lg hover:shadow-marca-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-marca-400/40"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {d.valor}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {d.etiqueta}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
