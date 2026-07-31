type Props = {
  id: string;
  /** Efecto de transición. Los estilos viven en globals.css. */
  fx: string;
  /** La primera arranca visible; el resto esperan bajo el pliegue. */
  inicial?: boolean;
  fondo?: "base" | "seccion";
  className?: string;
  children: React.ReactNode;
};

/**
 * Una diapositiva a pantalla completa. El controlador (`Deck`) le cambia
 * `data-state` a active / ahead / behind y el CSS anima el contenido.
 */
export default function Diapositiva({
  id,
  fx,
  inicial = false,
  fondo = "base",
  className = "",
  children,
}: Props) {
  return (
    <section
      id={id}
      data-slide=""
      data-fx={fx}
      data-state={inicial ? "active" : "ahead"}
      className={`relative grid min-h-[100dvh] content-center items-start px-6 py-[clamp(70px,9vh,104px)] sm:px-12 lg:px-22 ${
        fondo === "seccion" ? "bg-seccion" : "bg-fondo"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/** Etiqueta pequeña en versalitas con la rayita de acento delante. */
export function Kicker({
  children,
  tenue = false,
  anim = 0,
}: {
  children: React.ReactNode;
  tenue?: boolean;
  anim?: number;
}) {
  return (
    <p
      data-anim={anim}
      className={`m-0 mb-4 flex items-center gap-3.5 text-[13px] uppercase tracking-[0.16em] ${
        tenue ? "text-texto/70" : "text-acento"
      }`}
    >
      <span
        aria-hidden
        className={`h-px w-11 ${tenue ? "bg-texto/70" : "bg-acento"}`}
      />
      {children}
    </p>
  );
}

/** Marco de imagen. Si el archivo falta se ve un hueco tenue, no un roto. */
export function Marco({
  src,
  alt = "",
  ratio,
  className = "",
}: {
  src: string;
  alt?: string;
  ratio: string;
  className?: string;
}) {
  return (
    <div
      className={`marco overflow-hidden rounded-[var(--radius-lg)] leading-none ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
