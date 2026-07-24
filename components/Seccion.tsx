import Reveal from "./Reveal";

type Props = {
  id: string;
  etiqueta: string;
  titulo: string;
  descripcion?: string;
  children: React.ReactNode;
  className?: string;
};

/** Contenedor común de todas las secciones: encabezado + contenido. */
export default function Seccion({
  id,
  etiqueta,
  titulo,
  descripcion,
  children,
  className = "",
}: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-marca-600 dark:text-marca-400">
            {etiqueta}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {titulo}
          </h2>
          {descripcion && (
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {descripcion}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
