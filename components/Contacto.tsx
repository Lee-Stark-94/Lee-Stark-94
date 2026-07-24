import { profile, redes } from "@/data/profile";
import Reveal from "./Reveal";

export default function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10 text-center sm:p-16 dark:border-white/10 dark:from-white/[0.06] dark:to-white/[0.02]">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-marca-500/15 blur-3xl"
          />
          <div className="relative">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-marca-600 dark:text-marca-400">
              Contacto
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              ¿Construimos algo juntos?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Estoy abierto a proyectos, colaboraciones o simplemente a una buena
              conversación sobre tecnología. Escríbeme y te respondo.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-marca-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-marca-600/25 transition hover:-translate-y-0.5 hover:bg-marca-700"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {profile.email}
            </a>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {redes.map((r) => (
                <a
                  key={r.nombre}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 underline-offset-4 transition hover:text-marca-600 hover:underline dark:text-slate-400 dark:hover:text-marca-300"
                >
                  {r.nombre} <span className="text-slate-400 dark:text-slate-600">{r.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
