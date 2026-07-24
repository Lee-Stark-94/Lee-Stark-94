import { hobbies } from "@/data/profile";
import Reveal from "./Reveal";
import Seccion from "./Seccion";

export default function Hobbies() {
  return (
    <Seccion
      id="hobbies"
      etiqueta="Fuera del código"
      titulo="Hobbies"
      descripcion="Porque nadie es solo su trabajo. Esto es lo que hago cuando cierro el editor."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((h, i) => (
          <Reveal
            key={h.nombre}
            delay={i * 80}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-acento-500/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-acento-500/10 text-2xl">
              {h.icono}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {h.nombre}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {h.texto}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
