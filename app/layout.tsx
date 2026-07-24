import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--fuente-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.nombre} — ${profile.rol}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.nombre} — ${profile.rol}`,
    description: profile.tagline,
    type: "website",
    locale: "es_ES",
  },
};

/**
 * Aplica el tema guardado antes del primer pintado para evitar el
 * parpadeo blanco cuando el usuario prefiere modo oscuro.
 */
const scriptTema = `
(function () {
  try {
    var guardado = localStorage.getItem('tema');
    var oscuro = guardado
      ? guardado === 'oscuro'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', oscuro);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
