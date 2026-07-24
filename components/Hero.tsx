import Image from "next/image";
import { profile, redes } from "@/data/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Fondo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-24 size-[34rem] rounded-full bg-marca-400/25 blur-3xl dark:bg-marca-600/25" />
        <div className="absolute top-40 -left-32 size-[28rem] rounded-full bg-acento-400/20 blur-3xl dark:bg-acento-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.07)_1px,transparent_0)] [background-size:32px_32px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {profile.disponible && (
            <Reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Disponible para nuevos proyectos
            </Reveal>
          )}

          <Reveal delay={80}>
            <p className="mb-3 text-sm font-medium text-slate-500 dark:text-slate-400">
              Hola, soy
            </p>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              {profile.nombre}
            </h1>
            <p className="mt-3 text-xl font-semibold sm:text-2xl">
              <span className="texto-degradado">{profile.rol}</span>
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="rounded-full bg-marca-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-marca-600/25 transition hover:-translate-y-0.5 hover:bg-marca-700 hover:shadow-xl hover:shadow-marca-600/30"
            >
              Hablemos
            </a>
            <a
              href="#sobre-mi"
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/5"
            >
              Conóceme
            </a>
            {profile.cv && (
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-4 py-3 text-sm font-semibold text-marca-600 underline-offset-4 transition hover:underline dark:text-marca-300"
              >
                Descargar CV ↓
              </a>
            )}
          </Reveal>

          <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-5">
            {redes.map((r) => (
              <a
                key={r.nombre}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 underline-offset-4 transition hover:text-marca-600 hover:underline dark:text-slate-400 dark:hover:text-marca-300"
              >
                {r.nombre}
              </a>
            ))}
            <span className="text-sm text-slate-400 dark:text-slate-600">·</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              📍 {profile.ubicacion}
            </span>
          </Reveal>
        </div>

        {/* Avatar */}
        <Reveal delay={200} className="justify-self-center lg:justify-self-end">
          <div className="relative flotar">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-gradient-to-tr from-marca-500/30 via-acento-500/25 to-transparent blur-2xl"
            />
            <div className="relative grid size-56 place-items-center overflow-hidden rounded-full border border-white/60 bg-gradient-to-br from-marca-500 to-acento-600 shadow-2xl shadow-marca-900/20 sm:size-72 dark:border-white/10">
              {profile.foto ? (
                <Image
                  src={profile.foto}
                  alt={profile.nombre}
                  fill
                  sizes="(max-width: 640px) 14rem, 18rem"
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="text-6xl font-bold tracking-tight text-white sm:text-7xl">
                  {profile.iniciales}
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
