import Deck from "@/components/Deck";
import Diapositiva, { Kicker, Marco } from "@/components/Diapositiva";
import {
  cancun,
  carrera,
  datosRancios,
  datosRandom,
  diapositivas,
  educacion,
  entretenimiento,
  origen,
  pasiones,
  perfil,
} from "@/data/presentacion";

const fx = Object.fromEntries(diapositivas.map((d) => [d.id, d.fx]));
const contenedor = "relative mx-auto w-full max-w-[1240px]";
const cuerpo = "text-[clamp(14.5px,1.05vw,16px)] leading-relaxed text-texto/85";
const h2 = "m-0 text-[clamp(28px,3.2vw,46px)] font-medium leading-[1.1] tracking-[-0.02em]";

export default function Home() {
  return (
    <Deck>
      {/* ── 01 Portada ─────────────────────────────────────────── */}
      <Diapositiva id="portada" fx={fx.portada} inicial>
        <div
          data-halo
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(1100px 660px at 82% -6%, rgba(76,83,151,.55), transparent 62%), radial-gradient(760px 620px at -6% 106%, rgba(0,0,0,.45), transparent 58%)",
          }}
        />
        <div
          className={`${contenedor} grid items-center gap-[clamp(28px,5vw,76px)] lg:grid-cols-[1.15fr_0.85fr]`}
        >
          <div>
            <Kicker>Hola, mucho gusto</Kicker>
            <h1
              data-anim="1"
              className="m-0 -ml-[0.05em] text-[clamp(38px,5.4vw,80px)] font-medium leading-[1.06] tracking-[-0.025em]"
            >
              José Luis
              <br />
              Arrioja Zamudio
            </h1>
            <p
              data-anim="2"
              className="mt-5 text-[clamp(19px,2vw,28px)] leading-[1.3] text-acento-300"
            >
              {perfil.tagline}
            </p>
            <p
              data-anim="3"
              className="mt-[22px] max-w-[52ch] text-[clamp(15px,1.1vw,17px)] leading-[1.7] text-texto/80"
            >
              {perfil.entradilla}
            </p>
          </div>

          <figure data-anim="2" className="m-0 w-[min(330px,100%)] justify-self-center lg:justify-self-end">
            <div className="flotar relative aspect-square overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(145,132,217,.5),0_30px_70px_rgba(0,0,0,.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={perfil.foto}
                alt={perfil.nombreCompleto}
                className="size-full object-cover"
              />
            </div>
          </figure>
        </div>
        <p
          data-anim="6"
          className="bajar absolute bottom-[clamp(20px,4vh,40px)] left-1/2 m-0 text-xs uppercase tracking-[0.14em] text-texto/45"
        >
          Baja ↓
        </p>
      </Diapositiva>

      {/* ── 02 Origen ──────────────────────────────────────────── */}
      <Diapositiva id="origen" fx={fx.origen}>
        <div
          data-halo
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(820px 560px at 12% 8%, rgba(53,59,128,.45), transparent 62%)",
          }}
        />
        <div
          className={`${contenedor} grid items-center gap-[clamp(26px,4vw,70px)] lg:grid-cols-[6fr_5fr]`}
        >
          <div>
            <Kicker>{origen.kicker}</Kicker>
            <h2 data-anim="1" className={`${h2} text-[clamp(30px,3.8vw,56px)]`}>
              {origen.titulo[0]}
              <br />
              {origen.titulo[1]}
            </h2>
            <p data-anim="2" className={`mt-[22px] max-w-[50ch] ${cuerpo} text-[clamp(15px,1.1vw,17px)] leading-[1.7]`}>
              {origen.parrafos[0]}
            </p>
            <p data-anim="3" className={`mt-[18px] max-w-[50ch] ${cuerpo} text-[clamp(15px,1.1vw,17px)] leading-[1.7]`}>
              Ese mismo día, en 1917, se establecieron en México el sufragio efectivo y
              la no reelección, y salió del país la expedición punitiva que llevaba meses
              buscando a Villa. Y ese mismo año, 1994, el cine estrenó{" "}
              <em>Cadena perpetua</em>, <em>Forrest Gump</em> y <em>El Rey León</em>.
            </p>
          </div>
          <figure data-anim="3" className="m-0 grid gap-2.5">
            <Marco src={origen.imagen} ratio="609 / 812" className="w-full" />
            <figcaption className="m-0 text-[12.5px] leading-normal text-texto/55">
              {origen.pie}
            </figcaption>
          </figure>
        </div>
      </Diapositiva>

      {/* ── 03 Historial académico ─────────────────────────────── */}
      <Diapositiva id="academico" fx={fx.academico} fondo="seccion">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 84% -10%, rgba(53,59,128,.75), transparent 64%)",
          }}
        />
        <div className={contenedor}>
          <Kicker tenue>Historial académico</Kicker>
          <h2 data-anim="1" className={h2}>
            Lo que estudié
            <br />y lo que aprendí aparte
          </h2>
          <p data-anim="2" className="mt-3 max-w-[60ch] text-[clamp(14px,1vw,15.5px)] leading-[1.55] text-texto/85">
            El título dice ingeniero en software. El resto lo pusieron la curiosidad,
            Stack Overflow y muchas noches de prueba y error.
          </p>
          <div className="mt-[clamp(16px,2.6vh,28px)] grid gap-[clamp(14px,2vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
            {educacion.map((e, i) => (
              <div key={e.periodo} data-anim={i < 2 ? 3 : 4} className="grid content-start gap-2.5">
                <Marco src={e.imagen} ratio="16 / 10" className="w-full shadow-[var(--sombra-sm)]" />
                <div className="bg-[linear-gradient(to_right,rgba(233,233,237,.3),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat pt-3.5">
                  <p className="m-0 text-[clamp(19px,1.8vw,26px)] leading-none tabular-nums">
                    {e.periodo}
                  </p>
                  <p className="mt-2 text-[13px] leading-normal text-texto/80">{e.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Diapositiva>

      {/* ── 04 Cancún ──────────────────────────────────────────── */}
      <Diapositiva id="cancun" fx={fx.cancun} className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cancun.fondo}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full scale-x-[-1] object-cover opacity-[.58] mix-blend-lighten"
          style={{ objectPosition: "30% 60%" }}
        />
        <div
          data-halo
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "linear-gradient(to left, rgba(22,24,38,.94) 0%, rgba(22,24,38,.86) 34%, rgba(22,24,38,.25) 70%, rgba(22,24,38,0) 100%), radial-gradient(900px 600px at 88% 96%, rgba(76,83,151,.42), transparent 62%)",
          }}
        />
        <div className={`${contenedor} grid justify-items-end`}>
          <div className="max-w-[54ch] text-left">
            <Kicker>Dónde vivo</Kicker>
            <h2 data-anim="1" className={h2}>
              Cancún,
              <br />
              Quintana Roo
            </h2>
            <p data-anim="2" className={`mt-3.5 ${cuerpo}`}>
              Sí, vivo donde otros van de vacaciones. No, no estoy en la playa ahora
              mismo: estoy en una silla, frente a dos monitores, con el aire acondicionado
              peleando contra 34 grados.
            </p>
            <div
              data-anim="4"
              className="mt-5 grid gap-4 bg-[linear-gradient(to_right,rgba(233,233,237,.16),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat pt-4 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]"
            >
              {cancun.datos.map((d) => (
                <div key={d.etiqueta}>
                  <p className="m-0 text-[26px] tabular-nums">{d.valor}</p>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.1em] text-texto/60">
                    {d.etiqueta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Diapositiva>

      {/* ── 05 Carrera ─────────────────────────────────────────── */}
      <Diapositiva id="carrera" fx={fx.carrera} fondo="seccion">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 560px at 10% -8%, rgba(53,59,128,.7), transparent 62%)",
          }}
        />
        <div className={contenedor}>
          <Kicker tenue>El bloque laboral (breve, lo prometo)</Kicker>
          <div className="grid items-center gap-[clamp(22px,3vw,48px)] lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 data-anim="1" className={`${h2} text-[clamp(26px,2.9vw,40px)]`}>
                12 años escribiendo
                <br />
                software
              </h2>
              <p data-anim="2" className={`mt-3.5 max-w-[54ch] ${cuerpo}`}>
                Ingeniero en software titulado. Web, escritorio, Android y proyectos de
                configuración: puntos de venta, software de seguridad y todo lo que
                alguien necesitaba que <em>por fin</em> funcionara.
              </p>
              <div
                data-anim="3"
                className="mt-[clamp(12px,1.8vh,20px)] grid gap-x-8 gap-y-2.5 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]"
              >
                {carrera.areas.map((a) => (
                  <div
                    key={a.titulo}
                    className="grid gap-[3px] bg-[linear-gradient(to_right,rgba(233,233,237,.22),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat py-2.5"
                  >
                    <p className="m-0 text-[15px]">{a.titulo}</p>
                    <p className="m-0 text-[13px] leading-snug text-texto/75">{a.texto}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure data-anim="4" className="m-0 grid justify-items-center gap-2 self-start">
              <Marco
                src={carrera.imagen}
                ratio="488 / 650"
                className="w-[min(100%,calc(53vh*488/650))] shadow-[var(--sombra-md)]"
              />
              <figcaption className="m-0 text-xs leading-snug text-texto/60">
                {carrera.pie}
              </figcaption>
            </figure>
          </div>

          {/* Stack: placas claras para que los logos oscuros se lean */}
          <div
            data-anim="5"
            className="mt-[clamp(14px,2.4vh,26px)] bg-[linear-gradient(to_right,rgba(233,233,237,.22),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat pt-[clamp(12px,2vh,18px)]"
          >
            <p className="m-0 text-[11.5px] uppercase tracking-[0.14em] text-texto/60">
              Con lo que trabajo
            </p>
            <ul
              className="m-0 mt-3 grid list-none gap-[clamp(8px,1vw,14px)] p-0 [--placa:clamp(50px,6.4vh,72px)] [grid-template-columns:repeat(auto-fit,minmax(104px,1fr))]"
            >
              {carrera.tecnologias.map((t) => (
                <li key={t.nombre} className="grid justify-items-center gap-1.5">
                  <div className="grid h-[var(--placa)] w-full place-items-center rounded-[10px] bg-placa-tech px-3 shadow-[var(--sombra-sm)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.logo}
                      alt={t.nombre}
                      loading="lazy"
                      className="max-w-[78%] object-contain"
                      style={{ maxHeight: `calc(var(--placa) * ${t.escala / 100})` }}
                    />
                  </div>
                  <span className="text-[11px] leading-none text-texto/60">{t.nombre}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Diapositiva>

      {/* ── 06 Curiosidad ──────────────────────────────────────── */}
      <Diapositiva id="curiosidad" fx={fx.curiosidad}>
        <div
          data-halo
          aria-hidden
          className="latir pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(760px 760px at 50% 50%, rgba(76,83,151,.35), transparent 62%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1080px]">
          <Kicker>El flechazo</Kicker>
          <h2 data-anim="1" className={`${h2} text-[clamp(28px,3.4vw,50px)] leading-[1.08] tracking-[-0.022em]`}>
            Todo empezó con
            <br />
            una bicicleta rota
          </h2>
          <div className="mt-[clamp(16px,2.6vh,28px)] grid gap-[clamp(20px,3vw,44px)] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            <p data-anim="2" className={`m-0 ${cuerpo} leading-[1.65]`}>
              Se rompió mi bicicleta y, en lugar de pedir que la arreglaran, la desarmé.
              Sobraron dos piezas, pero volvió a rodar.
            </p>
            <p data-anim="3" className={`m-0 ${cuerpo} leading-[1.65]`}>
              Con la computadora fue igual, pero sin grasa en las manos: emuladores, chats
              y el lado turbio de internet.
            </p>
          </div>
          <p
            data-anim="4"
            className="mt-[clamp(18px,3vh,32px)] max-w-[62ch] text-[clamp(16px,1.4vw,21px)] leading-snug text-texto/90"
          >
            Desde entonces todo problema me parece una bicicleta rota: se abre, se
            entiende y se vuelve a armar.
          </p>
        </div>
      </Diapositiva>

      {/* ── 07 Entretenimiento ─────────────────────────────────── */}
      <Diapositiva id="entretenimiento" fx={fx.entretenimiento} className="items-center">
        <div
          data-halo
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(900px 520px at 20% 100%, rgba(53,59,128,.4), transparent 60%)",
          }}
        />
        <div
          className={`${contenedor} grid items-start gap-[clamp(24px,4vw,60px)] lg:grid-cols-[1fr_30%]`}
        >
          <div>
            <Kicker>Pantalla (chica o grande)</Kicker>
            <h2 data-anim="1" className={`${h2} text-[clamp(28px,3.4vw,50px)] leading-[1.08] tracking-[-0.022em]`}>
              Entretenimiento y gustos culposos
            </h2>
            <div className="mt-[clamp(16px,2.6vh,28px)] grid gap-[clamp(18px,2.6vw,40px)] [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
              {entretenimiento.generos.map((g, i) => (
                <div key={g.titulo} data-anim={i + 2}>
                  <p className="m-0 text-[clamp(16px,1.4vw,20px)]">{g.titulo}</p>
                  <p className="mt-2.5 text-[clamp(13.5px,1vw,15px)] leading-relaxed text-texto/80">
                    {g.texto}
                  </p>
                </div>
              ))}
            </div>
            <p
              data-anim="4"
              className="mt-[clamp(16px,2.6vh,26px)] max-w-[58ch] text-[clamp(13.5px,1vw,15px)] leading-relaxed text-texto/70"
            >
              {entretenimiento.culposos}
            </p>
            <div
              data-anim="5"
              className="mt-[clamp(14px,2.2vh,22px)] grid max-w-[48ch] grid-cols-[84px_minmax(0,1fr)] items-center gap-3.5 rounded-[var(--radius-lg)] bg-superficie/70 px-4 py-3.5 shadow-[var(--sombra-sm)]"
            >
              <Marco
                src={entretenimiento.recomendacion.imagen}
                ratio="2 / 3"
                className="w-full !rounded-md"
              />
              <div className="grid gap-1.5">
                <p className="m-0 text-[11.5px] uppercase tracking-[0.12em] text-acento">
                  Recomendación culposa
                </p>
                <p className="m-0 text-[clamp(15px,1.3vw,18px)] leading-[1.3]">
                  {entretenimiento.recomendacion.titulo}
                </p>
                <p className="m-0 text-[13px] leading-[1.55] text-texto/75">
                  {entretenimiento.recomendacion.texto}
                </p>
              </div>
            </div>
          </div>

          {/* Collage de pósters */}
          <div data-anim="2" className="relative aspect-[3/4] w-full min-w-0">
            {entretenimiento.posters.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.src}
                src={p.src}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute rounded-[5px] shadow-[0_10px_26px_rgba(0,0,0,.6)]"
                style={{
                  left: p.left,
                  top: p.top,
                  width: p.ancho,
                  zIndex: p.z,
                  transform: `rotate(${p.giro}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </Diapositiva>

      {/* ── 08 Pasiones ────────────────────────────────────────── */}
      <Diapositiva id="pasiones" fx={fx.pasiones} fondo="seccion">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1000px 620px at 78% 108%, rgba(53,59,128,.75), transparent 62%)",
          }}
        />
        <div className={contenedor}>
          <Kicker tenue>Pasiones y pasatiempos</Kicker>
          <h2 data-anim="1" className={h2}>
            En qué se me va
            <br />
            el tiempo libre
          </h2>
          <div className="mt-[clamp(18px,3vh,30px)] grid gap-[clamp(14px,2vw,28px)] [grid-template-columns:repeat(auto-fit,minmax(165px,1fr))]">
            {pasiones.map((p, i) => (
              <div key={p.nombre} data-anim={2 + Math.floor(i / 2)} className="grid content-start gap-2.5">
                <Marco src={p.imagen} ratio="4 / 3" className="w-full shadow-[var(--sombra-sm)]" />
                <div className="bg-[linear-gradient(to_right,rgba(233,233,237,.3),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat pt-3">
                  <p className="m-0 text-[clamp(15px,1.3vw,18px)] leading-tight">{p.nombre}</p>
                  <p className="mt-[7px] text-[12.5px] leading-normal text-texto/80">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Diapositiva>

      {/* ── 09 Datos rancios ───────────────────────────────────── */}
      <Diapositiva id="rancios" fx={fx.rancios}>
        <div
          data-halo
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(900px 600px at 88% 4%, rgba(76,83,151,.42), transparent 62%)",
          }}
        />
        <div className={contenedor}>
          <Kicker>Datos rancios</Kicker>
          <h2 data-anim="1" className={h2}>
            Conocimiento inútil
            <br />
            que colecciono
          </h2>
          <p data-anim="2" className={`mt-3.5 max-w-[58ch] ${cuerpo}`}>
            Noticias viejas, datos sueltos y sabiduría sin aplicación práctica. No sirven
            para nada y por eso me fascinan.
          </p>
          <div className="mt-[clamp(18px,3vh,30px)] grid gap-[clamp(16px,2.4vw,36px)] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {datosRancios.map((d, i) => (
              <div
                key={d.titulo}
                data-anim={i < 2 ? 3 : 4}
                className="grid grid-cols-[34px_minmax(0,1fr)] items-start gap-3.5 bg-[linear-gradient(to_right,rgba(233,233,237,.22),transparent)] bg-[length:100%_1px] bg-top bg-no-repeat pt-4"
              >
                <p className="m-0 text-[13px] tabular-nums text-acento-300">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="m-0 text-[clamp(16px,1.4vw,20px)] leading-[1.25]">{d.titulo}</p>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-texto/80">{d.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Diapositiva>

      {/* ── 10 Datos random ────────────────────────────────────── */}
      <Diapositiva id="random" fx={fx.random} className="py-[clamp(84px,11vh,132px)]">
        <div
          data-halo
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(1000px 620px at 86% 106%, rgba(76,83,151,.5), transparent 62%)",
          }}
        />
        <div className={contenedor}>
          <Kicker>Para cerrar</Kicker>
          <h2
            data-anim="1"
            className="m-0 mb-[clamp(22px,3.5vh,40px)] text-[clamp(32px,4.2vw,62px)] font-medium leading-[1.08] tracking-[-0.025em]"
          >
            Cosas que nadie
            <br />
            me preguntó
          </h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
            {datosRandom.map((d, i) => (
              <div
                key={d}
                data-anim={2 + Math.floor(i / 2)}
                className="rounded-[var(--radius-lg)] bg-superficie/70 p-[18px] text-[14.5px] leading-relaxed text-texto/85 shadow-[var(--sombra-sm)]"
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </Diapositiva>
    </Deck>
  );
}
