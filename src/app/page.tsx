import Image from "next/image";
import type { ReactNode } from "react";

import { EnlaceBoton } from "@/components/boton";
import { Encabezado } from "@/components/encabezado";
import { GloboObras } from "@/components/globo-obras";
import { LogoConstruEx } from "@/components/marca";
import { RedObras } from "@/components/red-obras";
import { URL_APP } from "@/lib/sitio";

/**
 * Landing informativa de ConstruEx (Proyecto Final ISI · UTN FRM). Sigue la estética
 * de la app y vuelca el contenido del póster de la 20ª Exposición Anual de Proyectos.
 */

const RAINBOW = "bg-[linear-gradient(90deg,#e0447f_0%,#e8763a_35%,#e8b52e_65%,#9ac53f_100%)] bg-clip-text text-transparent";
const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(26,26,24,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,24,0.035) 1px, transparent 1px)",
  backgroundSize: "76px 76px",
};
const CONTENEDOR = "mx-auto max-w-[1440px] px-5 lg:px-10";
const TITULO_H2 = "mt-5 text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]";

const EJES = ["Planificación", "Abastecimiento", "Costos", "Avance", "Colaboración"];

const STATS = [
  { n: "8", c: "Módulos funcionales" },
  { n: "69", c: "Casos de uso" },
  { n: "158", c: "Historias de usuario" },
  { n: "~60", c: "Entidades de dominio" },
];

const PROBLEMAS = [
  { i: "01", t: "Información dispersa", d: "Planillas y chats que nadie consolida." },
  { i: "02", t: "Compras duplicadas", d: "Y faltantes que frenan la obra." },
  { i: "03", t: "Sobrantes sin reutilizar", d: "Materiales que otra obra cercana necesita." },
];

const SOLUCION = [
  "Planificación, stock, compras, avance y costos de cada obra",
  "Aislamiento de datos por empresa",
  "Permisos por rol",
  "IA aplicada a comprobantes y consultas",
];

const MODULOS = [
  { num: "01", cat: "Seguridad", titulo: "Administración, Seguridad y Usuarios", desc: "Organizaciones, usuarios, roles y permisos. Login con 2FA y RBAC." },
  { num: "02", cat: "Operación", titulo: "Gestión de Obras y Etapas", desc: "Obras, etapas, tareas, hitos y diagrama Gantt con camino crítico." },
  { num: "03", cat: "Inventario", titulo: "Materiales y Control de Stock", desc: "Existencias por obra y cada movimiento registrado." },
  { num: "04", cat: "Finanzas", titulo: "Presupuestos, Compras y Costos", desc: "Presupuestos, proveedores, compras con aprobación y comprobantes." },
  { num: "05", cat: "Avance", titulo: "Seguimiento, Avance y Trazabilidad", desc: "Avance físico, incidencias e historial trazable de eventos." },
  { num: "06", cat: "Datos", titulo: "Analítica, Estimación y Reportes", desc: "Plan vs. real, tableros, estimaciones y reportes sobre BigQuery." },
  { num: "07", cat: "Diferenciador", titulo: "Colaboración entre Obras", desc: "Publicación e intercambio de excedentes entre obras cercanas." },
  { num: "08", cat: "Soporte", titulo: "Parámetros, Maestros y Soporte", desc: "Catálogos, parámetros del sistema y mesa de soporte." },
];

const CAPTURAS = [
  {
    src: "/capturas/detalle-obra.png",
    ancho: 1830,
    alto: 921,
    titulo: "Detalle de obra",
    desc: "Responsable, ubicación, estructura de etapas e hitos y avance general.",
  },
  {
    src: "/capturas/gantt.png",
    ancho: 2148,
    alto: 921,
    titulo: "Diagrama Gantt",
    desc: "Planificado vs. avance real, camino crítico e hitos por etapa.",
  },
  {
    src: "/capturas/publicacion-excedente.png",
    ancho: 1644,
    alto: 921,
    titulo: "Publicación de excedente",
    desc: "Cantidad publicada, acordada y disponible, solicitudes y ubicación.",
  },
];

const DIFERENCIADOR = [
  { i: "01", t: "Publicar", d: "La obra con sobrante publica el material, la cantidad y una fecha límite." },
  { i: "02", t: "Solicitar y acordar", d: "Las obras cercanas piden lo que les falta; cada solicitud tiene su hilo." },
  { i: "03", t: "Trazabilidad", d: "Cada transferencia concretada queda registrada y auditada." },
];

const CICLO = [
  { n: "01", t: "Planificar", d: "Obra, etapas, tareas, hitos y diagrama Gantt." },
  { n: "02", t: "Abastecer", d: "Stock por obra y compras con aprobación." },
  { n: "03", t: "Ejecutar", d: "Avance físico e incidencias desde la obra." },
  { n: "04", t: "Controlar", d: "Plan vs. real, alertas y tablero de costos." },
  { n: "05", t: "Colaborar", d: "Intercambio de excedentes entre obras." },
];

const SERVICIOS = [
  { t: "IA", s: "Gemini API", d: "OCR de comprobantes · asistente IA" },
  { t: "ETL", s: "BigQuery", d: "Bronze · Silver · Gold" },
  { t: "Email", s: "Resend", d: "Correo transaccional" },
];

const ODS = [
  { src: "/ods/ods-9.png", alt: "ODS 9 — Industria, innovación e infraestructura" },
  { src: "/ods/ods-11.png", alt: "ODS 11 — Ciudades y comunidades sostenibles" },
  { src: "/ods/ods-12.png", alt: "ODS 12 — Producción y consumo responsables" },
];

const INTEGRANTES = ["Ambrogetti Ignacio", "Buxó Ezequiel", "Cervi Enzo", "Licciardi Ignacio", "Longarini Agustín"];

const CATEDRA = [
  "Dr. Ing. Raúl Moralejo",
  "Lic. Gustavo Manino",
  "Ing. Malena Casas Castrillejo",
  "Ing. María Teresita Cuccia",
  "Ing. Gonzalo Pozzoli",
  "Ing. Erica Caro",
];

export default function PaginaLanding() {
  return (
    <div className="bg-fondo">
      <Encabezado />

      {/* HERO */}
      <section style={GRID_BG}>
        <div className={`${CONTENEDOR} grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20`}>
          <div>
            <Eyebrow>20ª Exposición Anual de Proyectos · Noviembre 2026</Eyebrow>
            <h1 className="mt-7 text-[clamp(2.8rem,7.5vw,5.75rem)] font-bold leading-[0.95] tracking-[-0.02em]">
              <span className="block">Tech para</span>
              <span className={`block font-pixel text-[0.82em] leading-tight ${RAINBOW}`}>Gestión</span>
              <span className="block text-tinta-apagada">de Obras.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-tinta-secundaria">
              ConstruEx es una plataforma web multiempresa para la gestión integral de obras de construcción.
              Proyecto Final de Ingeniería en Sistemas de Información — UTN Facultad Regional Mendoza.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-apagada">
              {EJES.map((eje, indice) => (
                <li key={eje} className="flex items-center gap-3">
                  {indice > 0 && <span className="h-1 w-1 bg-primario" aria-hidden />}
                  {eje}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <EnlaceBoton href={URL_APP} variante="oscuro" className="px-6 py-3.5">
                Ver la app ↗
              </EnlaceBoton>
              <EnlaceBoton href="#resumen" variante="secundario" className="px-6 py-3.5">
                Conocer el proyecto ↓
              </EnlaceBoton>
            </div>
          </div>

          <div className="mx-auto aspect-square w-full max-w-[460px]">
            <GloboObras />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-borde-marcado">
        <div className={`${CONTENEDOR} grid grid-cols-2 md:grid-cols-4`}>
          {STATS.map((stat, indice) => (
            <div
              key={stat.c}
              className={`border-borde-marcado px-6 py-12 ${indice % 2 !== 0 ? "border-l" : ""} ${
                indice >= 2 ? "border-t md:border-t-0" : ""
              } md:border-l md:first:border-l-0`}
            >
              <div className="text-[clamp(2.5rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.02em]">{stat.n}</div>
              <div className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-tinta-apagada">
                {stat.c}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 01 · RESUMEN */}
      <section id="resumen" className="scroll-mt-24 border-t border-borde-marcado">
        <div className={`${CONTENEDOR} grid gap-8 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28`}>
          <div>
            <Eyebrow>01 · Resumen</Eyebrow>
            <h2 className={TITULO_H2}>Toda la obra, en una sola plataforma.</h2>
          </div>
          <p className="self-end text-[19px] leading-relaxed text-tinta-secundaria">
            ConstruEx digitaliza y centraliza la gestión integral de obras para reducir sobrecostos y desorganización.
            Cuenta con <strong className="font-semibold text-tinta">ocho módulos funcionales</strong>, destacando el de{" "}
            <strong className="font-semibold text-primario">colaboración</strong> para intercambiar excedentes de
            materiales entre obras cercanas. De este modo, optimiza el control de costos, el seguimiento del avance y la
            toma de decisiones en un único entorno.
          </p>
        </div>
      </section>

      {/* 02 · PROBLEMA / 03 · SOLUCIÓN */}
      <section id="problema" className="scroll-mt-24 border-t border-borde-marcado bg-fondo-secundario">
        <div className={`${CONTENEDOR} grid gap-14 py-20 lg:grid-cols-2 lg:gap-0 lg:py-28`}>
          <div className="lg:pr-12">
            <Eyebrow>02 · El problema</Eyebrow>
            <h2 className={TITULO_H2}>El sector construcción está fragmentado.</h2>
            <div className="mt-12 border-t border-borde-marcado">
              {PROBLEMAS.map((problema) => (
                <div key={problema.i} className="flex gap-6 border-b border-borde-marcado py-6">
                  <span className="font-pixel text-[26px] leading-none text-[#e0447f]">{problema.i}</span>
                  <div>
                    <h3 className="text-[20px] font-semibold">{problema.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-tinta-apagada">{problema.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-borde-marcado lg:border-l lg:pl-12">
            <Eyebrow>03 · La solución</Eyebrow>
            <h2 className={TITULO_H2}>Integrada, segura y con IA aplicada.</h2>
            <p className="mt-6 text-[17px] leading-relaxed text-tinta-secundaria">
              ConstruEx reúne en un mismo lugar todo lo que hoy vive en correos, WhatsApp y Excel, para cada obra de cada
              empresa.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {SOLUCION.map((punto) => (
                <li key={punto} className="flex gap-3 rounded-[10px] border border-borde-marcado bg-superficie p-5">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-primario" aria-hidden />
                  <span className="text-[15px] leading-snug">{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos" className="scroll-mt-24 border-t border-borde-marcado py-20 lg:py-28">
        <div className={CONTENEDOR}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Módulos del sistema</Eyebrow>
              <h2 className={TITULO_H2}>Ocho módulos. Una plataforma integrada.</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-tinta-apagada">
              Un monolito modular: cada módulo es dueño de su dominio y expone servicios al resto, desde la seguridad
              hasta la analítica.
            </p>
          </div>

          <div className="mt-14 grid border-l border-t border-borde-marcado sm:grid-cols-2 lg:grid-cols-4">
            {MODULOS.map((modulo) => (
              <div
                key={modulo.num}
                className="group flex flex-col border-b border-r border-borde-marcado bg-superficie p-7 transition-colors hover:bg-primario"
              >
                <div className="mb-8 flex items-start justify-between">
                  <CuadroPixel />
                  <span className="font-pixel text-[26px] text-tinta-apagada/45 transition-colors group-hover:text-white/70">
                    {modulo.num}
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-tinta-apagada transition-colors group-hover:text-white/75">
                  {modulo.cat}
                </div>
                <h3 className="mt-2 text-[20px] font-semibold leading-tight text-tinta transition-colors group-hover:text-white">
                  {modulo.titulo}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-tinta-apagada transition-colors group-hover:text-white/85">
                  {modulo.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · SISTEMA */}
      <section id="sistema" className="scroll-mt-24 border-t border-borde-marcado bg-fondo-secundario py-20 lg:py-28">
        <div className={CONTENEDOR}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <Eyebrow>04 · Sistema</Eyebrow>
              <h2 className={TITULO_H2}>Pantallas reales.</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-tinta-apagada">
              Capturas del sistema en ejecución, con datos de prueba.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {CAPTURAS.map((captura, indice) => (
              <figure
                key={captura.src}
                className={`overflow-hidden rounded-xl border border-borde-marcado bg-superficie ${
                  indice === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 border-b border-borde px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-borde-marcado" />
                  <span className="h-2.5 w-2.5 rounded-full bg-borde-marcado" />
                  <span className="h-2.5 w-2.5 rounded-full bg-borde-marcado" />
                  <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.1em] text-tinta-apagada">
                    {captura.titulo}
                  </span>
                </div>
                <Image
                  src={captura.src}
                  alt={`Captura de ConstruEx: ${captura.titulo}`}
                  width={captura.ancho}
                  height={captura.alto}
                  sizes={indice === 0 ? "(min-width: 1024px) 1360px, 100vw" : "(min-width: 1024px) 680px, 100vw"}
                  className="h-auto w-full"
                  priority={indice === 0}
                />
                <figcaption className="border-t border-borde px-5 py-4 text-[14px] text-tinta-apagada">
                  {captura.desc}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIADOR (oscuro) */}
      <section id="diferenciador" className="scroll-mt-24 bg-lateral py-20 lg:py-28">
        <div className={`${CONTENEDOR} grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center`}>
          <div>
            <Eyebrow oscuro>Módulo diferenciador</Eyebrow>
            <h2 className={`${TITULO_H2} text-white`}>Tus excedentes, valor de otra obra.</h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-lateral-texto">
              Los materiales que sobran en una obra son, muchas veces, los que le faltan a la obra de al lado. ConstruEx
              conecta a las obras cercanas para que ese sobrante se reutilice en vez de perderse.
            </p>
            <div className="mt-9">
              {DIFERENCIADOR.map((punto) => (
                <div key={punto.i} className="flex gap-5 border-t border-lateral-linea py-5">
                  <span className={`font-pixel text-[22px] ${RAINBOW}`}>{punto.i}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-white">{punto.t}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-lateral-apagado">{punto.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <RedObras />
        </div>
      </section>

      {/* 05 · CÓMO FUNCIONA */}
      <section id="como-funciona" style={GRID_BG} className="scroll-mt-24 border-t border-borde-marcado">
        <div className={`${CONTENEDOR} py-20 lg:py-28`}>
          <Eyebrow>05 · ¿Cómo funciona?</Eyebrow>
          <h2 className={TITULO_H2}>El ciclo de una obra.</h2>

          <ol className="mt-14 grid gap-x-8 gap-y-12 border-t border-borde-marcado pt-12 sm:grid-cols-2 lg:grid-cols-5">
            {CICLO.map((paso) => (
              <li key={paso.n}>
                <div className="flex items-center gap-3">
                  <span className={`font-pixel text-[24px] ${RAINBOW}`}>{paso.n}</span>
                  <span className="h-px flex-1 bg-borde-marcado" />
                </div>
                <h3 className="mt-5 text-[21px] font-semibold">{paso.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-tinta-apagada">{paso.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 · ARQUITECTURA */}
      <section id="arquitectura" className="scroll-mt-24 border-t border-borde-marcado bg-fondo-secundario py-20 lg:py-28">
        <div className={CONTENEDOR}>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <Eyebrow>06 · Arquitectura</Eyebrow>
              <h2 className={TITULO_H2}>¿Cómo está construido?</h2>
            </div>
            <p className="text-[17px] leading-relaxed text-tinta-apagada">
              Un cliente web, un backend modular que valida cada pedido y servicios gestionados para datos, archivos,
              IA, analítica y correo.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.35fr_1fr] lg:items-stretch">
            {/* Cliente */}
            <Nodo etiqueta="Cliente web" titulo="Next.js 16">
              <p>React · TypeScript · Tailwind CSS</p>
            </Nodo>

            {/* Backend */}
            <div className="relative mt-3 rounded-xl border-[1.5px] border-tinta bg-lateral p-6 pt-8 text-white lg:mt-0">
              <Conector texto="← REST + WebSocket · JWT" className="left-6" />
              <Conector texto="datos · archivos · auth →" className="right-6 hidden sm:inline-flex" />
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-primario">Backend</div>
              <div className="mt-2 text-[24px] font-bold">Spring Boot 4</div>
              <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-lateral-apagado">
                Java 21 · 8 módulos
              </div>
              <ul className="mt-5 space-y-2 border-t border-lateral-linea pt-5 text-[14px] text-lateral-texto">
                <li>Spring Security · JWT · RBAC</li>
                <li>Aislamiento por organización y obra</li>
                <li>API REST · WebSocket · tareas programadas</li>
              </ul>
            </div>

            {/* Supabase */}
            <div className="rounded-xl border border-borde-marcado bg-superficie p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-apagada">Supabase</div>
              <dl className="mt-3 divide-y divide-borde">
                {[
                  { t: "Auth", d: "Email · OAuth · 2FA" },
                  { t: "PostgreSQL", d: "Base transaccional" },
                  { t: "Storage", d: "Comprobantes y adjuntos" },
                ].map((item) => (
                  <div key={item.t} className="py-3">
                    <dt className="text-[17px] font-semibold">{item.t}</dt>
                    <dd className="text-[14px] text-tinta-apagada">{item.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {SERVICIOS.map((servicio) => (
              <Nodo key={servicio.t} etiqueta={servicio.t} titulo={servicio.s}>
                <p>{servicio.d}</p>
              </Nodo>
            ))}
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-tinta-apagada">
            Deploy · Vercel (front) · Render (back) · Redis 7 como broker
          </p>
        </div>
      </section>

      {/* ODS */}
      <section className="border-t border-borde-marcado">
        <div className={`${CONTENEDOR} grid gap-10 py-20 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:py-24`}>
          <div>
            <Eyebrow>Objetivos de Desarrollo Sostenible</Eyebrow>
            <h2 className={TITULO_H2}>Un aporte a la Agenda 2030.</h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-tinta-secundaria">
              Digitalizar la construcción, reutilizar materiales entre obras y reducir el desperdicio se alinea con
              tres ODS de Naciones Unidas.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {ODS.map((ods) => (
              <Image key={ods.src} src={ods.src} alt={ods.alt} width={300} height={300} className="h-auto w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section id="equipo" className="scroll-mt-24 bg-lateral py-20 lg:py-28">
        <div className={CONTENEDOR}>
          <Eyebrow oscuro>Equipo · Grupo N°3</Eyebrow>
          <h2 className={`${TITULO_H2} text-white`}>Quiénes lo hicimos.</h2>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr_auto]">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-lateral-apagado">Integrantes</h3>
              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {INTEGRANTES.map((nombre) => (
                  <li key={nombre} className="flex items-center gap-3 border-t border-lateral-linea py-4 text-[18px] font-semibold text-white">
                    <span className="h-2 w-2 bg-primario" aria-hidden />
                    {nombre}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-lateral-apagado">Equipo de cátedra</h3>
              <ul className="mt-5">
                {CATEDRA.map((nombre) => (
                  <li key={nombre} className="border-t border-lateral-linea py-3 text-[15px] text-lateral-texto">
                    {nombre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <Image src="/utn-frm.png" alt="UTN Facultad Regional Mendoza" width={705} height={360} className="h-auto w-56" />
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-lateral-apagado lg:text-right">
                Ingeniería en Sistemas de Información
                <br />
                Cátedra Proyecto Final
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="bg-primario px-5 py-24 text-center text-white lg:py-32">
        <h2 className="mx-auto max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.0] tracking-[-0.02em]">
          Mirá el proyecto.
        </h2>
        <p className="mt-6 text-[18px] text-white/85">ConstruEx en producción, con datos de prueba.</p>
        <div className="mt-9 flex justify-center">
          <EnlaceBoton href={URL_APP} variante="oscuro" className="px-7 py-4">
            Abrir ConstruEx ↗
          </EnlaceBoton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-borde-marcado">
        <div className={`${CONTENEDOR} flex flex-wrap items-end justify-between gap-6 py-12`}>
          <div>
            <LogoConstruEx />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-tinta-apagada">
              Plataforma web multiempresa para la gestión integral de obras de construcción.
            </p>
          </div>
          <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-tinta-apagada sm:items-end">
            <span>© 2026 ConstruEx · Proyecto Final · UTN FRM · ISI</span>
            <span>Mendoza · Argentina</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Eyebrow({ children, oscuro = false }: { children: ReactNode; oscuro?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${
        oscuro ? "text-primario" : "text-tinta-apagada"
      }`}
    >
      <span className={`h-[1.5px] w-10 ${oscuro ? "bg-primario" : "bg-tinta-apagada"}`} />
      {children}
    </p>
  );
}

/** Ícono cuadrado "pixel" de las tarjetas de módulo; pasa a blanco en el hover de la tarjeta. */
function CuadroPixel() {
  return (
    <span className="flex h-7 w-7 items-center justify-center border-[2.5px] border-tinta transition-colors group-hover:border-white">
      <span className="h-3 w-3 bg-tinta transition-colors group-hover:bg-white" />
    </span>
  );
}

function Nodo({ etiqueta, titulo, children }: { etiqueta: string; titulo: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-borde-marcado bg-superficie p-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-apagada">{etiqueta}</div>
      <div className="mt-2 text-[22px] font-bold">{titulo}</div>
      <div className="mt-2 text-[14px] text-tinta-apagada">{children}</div>
    </div>
  );
}

/** Etiqueta de las conexiones del backend en el diagrama de arquitectura. */
function Conector({ texto, className = "" }: { texto: string; className?: string }) {
  return (
    <span
      className={`absolute -top-3 inline-flex whitespace-nowrap rounded-full border border-borde-marcado bg-fondo px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-tinta ${className}`}
    >
      {texto}
    </span>
  );
}
