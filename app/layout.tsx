import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { perfil } from "@/data/presentacion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--fuente-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${perfil.nombre} — ${perfil.rol}`,
  description: perfil.tagline,
  openGraph: {
    title: `${perfil.nombre} — ${perfil.rol}`,
    description: perfil.tagline,
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
