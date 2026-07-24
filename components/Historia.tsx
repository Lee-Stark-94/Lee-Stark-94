import { historia } from "@/data/profile";
import Reveal from "./Reveal";
import Seccion from "./Seccion";

export default function Historia() {
  return (
    <Seccion
      id="historia"
      etiqueta="El camino"
      titulo="Mi historia"
      descripcion="Ningún camino es una línea recta. Este es el mío, resumido en los momentos que sí importaron."
      className="bg-slate-50/60 dark:bg-white/[0.02]"
    >
      <ol className="relative ml-3 space-y-10 border-l border-slate-200 pl-8 sm:ml-6 dark:border-white/10">
        {historia.map((h, i) => (
          <Reveal as="li" key={h.año + h.titulo} delay={i * 90} className="relative">
            {/* Punto de la línea de tiempo */}
            <span
              aria-hidden
              className="absolute top-1.5 -left-[2.31rem] size-3.5 rounded-full border-2 border-white bg-gradient-to-br from-marca-500 to-acento-500 ring-4 ring-marca-500/10 dark:border-[#060814]"
            />
            <span className="inline-block rounded-full bg-marca-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-marca-600 dark:text-marca-300">
              {h.año}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
              {h.titulo}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
              {h.texto}
            </p>
          </Reveal>
        ))}
      </ol>
    </Seccion>
  );
}
