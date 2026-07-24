"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Retraso de la animación en milisegundos */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
};

/**
 * Envuelve contenido y le añade la clase `visible` cuando entra en
 * pantalla. Las animaciones viven en globals.css (.reveal / .visible).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    // Sin soporte de IntersectionObserver: mostramos el contenido tal cual.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error el ref genérico sirve para cualquiera de los tags permitidos
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`reveal group ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
