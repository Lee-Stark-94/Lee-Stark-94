import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-500 sm:flex-row sm:px-8 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {profile.nombre}. Hecho con Next.js y
          Tailwind CSS.
        </p>
        <a
          href="#inicio"
          className="transition hover:text-marca-600 dark:hover:text-marca-300"
        >
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
