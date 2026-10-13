"use client";

import { useEffect, useState } from "react";

import { EnlaceBoton } from "@/components/boton";
import { LogoConstruEx } from "@/components/marca";
import { URL_APP } from "@/lib/sitio";

const ENLACES = [
  { texto: "Resumen", href: "#resumen" },
  { texto: "Sistema", href: "#sistema" },
  { texto: "Cómo funciona", href: "#como-funciona" },
  { texto: "Arquitectura", href: "#arquitectura" },
  { texto: "Equipo", href: "#equipo" },
];

/**
 * Header de la landing: fijo arriba, gana fondo translúcido al hacer scroll.
 * En desktop muestra la navegación por anclas; en mobile colapsa en un menú.
 */
export function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);

  useEffect(() => {
    const alScrollear = () => setConScroll(window.scrollY > 8);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-borde-marcado transition-colors ${
        conScroll ? "bg-fondo/90 backdrop-blur" : "bg-fondo"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-6 px-5 lg:px-10">
        <a href="#" aria-label="ConstruEx — inicio">
          <LogoConstruEx />
        </a>

        <nav className="ml-6 hidden items-center gap-8 lg:flex">
          {ENLACES.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="text-[13px] font-semibold uppercase tracking-[0.08em] text-tinta transition-colors hover:text-primario"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>

        <span className="flex-1" />

        <EnlaceBoton href={URL_APP} variante="oscuro" className="hidden sm:inline-flex">
          Ver la app ↗
        </EnlaceBoton>

        <button
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md border border-borde-marcado lg:hidden"
        >
          <span className="h-0.5 w-4 bg-tinta" />
          <span className="h-0.5 w-4 bg-tinta" />
          <span className="h-0.5 w-4 bg-tinta" />
        </button>
      </div>

      {menuAbierto && (
        <div className="border-t border-borde bg-fondo px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {ENLACES.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={() => setMenuAbierto(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-semibold text-tinta hover:bg-fondo-secundario"
              >
                {enlace.texto}
              </a>
            ))}
          </nav>
          <EnlaceBoton href={URL_APP} variante="oscuro" className="mt-3 w-full" onClick={() => setMenuAbierto(false)}>
            Ver la app ↗
          </EnlaceBoton>
        </div>
      )}
    </header>
  );
}
