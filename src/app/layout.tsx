import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";

// Mismas fuentes de marca que la app: Archivo (UI), JetBrains Mono (datos/etiquetas)
// y Pixelify Sans para los acentos "pixel".
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const pixelifySans = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixelify", display: "swap" });

function resolverUrlDelSitio(): URL | undefined {
  // En Vercel, si no se configuró la URL, se usa el dominio de producción que inyecta la plataforma.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const configurado = process.env.NEXT_PUBLIC_SITE_URL?.trim() || (vercel ? `https://${vercel}` : undefined);
  if (!configurado) {
    return undefined;
  }
  try {
    return new URL(configurado);
  } catch {
    return undefined;
  }
}

const DESCRIPCION =
  "Plataforma web multiempresa para la gestión integral de obras de construcción. Proyecto Final de Ingeniería en Sistemas de Información — UTN Facultad Regional Mendoza.";

export const metadata: Metadata = {
  metadataBase: resolverUrlDelSitio(),
  title: "ConstruEx — Gestión integral de obras de construcción",
  description: DESCRIPCION,
  applicationName: "ConstruEx",
  keywords: ["ConstruEx", "gestión de obras", "construcción", "UTN FRM", "proyecto final", "Mendoza"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "ConstruEx",
    title: "ConstruEx — Gestión integral de obras de construcción",
    description: DESCRIPCION,
    images: ["/capturas/detalle-obra.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${jetbrainsMono.variable} ${pixelifySans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
