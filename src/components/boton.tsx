import type { AnchorHTMLAttributes } from "react";

/**
 * Botón-enlace de la app (`.btn`): monoespaciado, mayúsculas y con borde de 1.5px.
 * - primario: acento naranja relleno
 * - secundario: borde neutro sobre transparente
 * - oscuro: tinta rellena
 * - claro: blanco relleno (sobre fondos naranja/oscuros)
 */
type VarianteDeBoton = "primario" | "secundario" | "oscuro" | "claro";

const CLASES_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[7px] border-[1.5px] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.05em] transition-colors";

const CLASES_POR_VARIANTE: Record<VarianteDeBoton, string> = {
  primario: "border-primario bg-primario text-white hover:opacity-90",
  secundario: "border-borde-marcado bg-transparent text-tinta hover:bg-fondo-secundario",
  oscuro: "border-tinta bg-tinta text-white hover:opacity-90",
  claro: "border-white bg-white text-tinta hover:opacity-90",
};

interface PropiedadesDeEnlaceBoton extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variante?: VarianteDeBoton;
}

export function EnlaceBoton({ href, variante = "secundario", className = "", ...resto }: PropiedadesDeEnlaceBoton) {
  const externo = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${CLASES_BASE} ${CLASES_POR_VARIANTE[variante]} ${className}`}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...resto}
    />
  );
}
