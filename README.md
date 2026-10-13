# ConstruEx — Landing

Landing informativa de **ConstruEx**, plataforma web multiempresa para la gestión integral de obras de
construcción. Proyecto Final de Ingeniería en Sistemas de Información — UTN Facultad Regional Mendoza (Grupo N°3).

Contenido basado en el póster de la 20ª Exposición Anual de Proyectos de Sistemas (noviembre 2026), con la
misma estética que la app (paleta, Archivo + JetBrains Mono + Pixelify Sans, globo y red de obras).

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Página 100 % estática.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npm run build
```

## Variables de entorno (opcionales)

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_APP_URL` | URL pública de la app. Los botones "Ver la app" apuntan ahí; sin definir, llevan a las capturas. |
| `NEXT_PUBLIC_SITE_URL` | URL de la landing para Open Graph. En Vercel se toma sola del dominio de producción. |

## Deploy en Vercel

1. Importar este repositorio en Vercel (framework detectado: Next.js, sin configuración extra).
2. Cargar `NEXT_PUBLIC_APP_URL` en *Settings → Environment Variables* cuando la app tenga URL pública.
