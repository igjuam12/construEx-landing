/**
 * Visualización "NETWORK · MENDOZA" del módulo diferenciador: nodos de obras con
 * excedentes/faltantes conectados por líneas punteadas (que fluyen para dar
 * sensación de "en vivo"). Es un SVG presentacional; las animaciones viven en
 * globals.css y respetan `prefers-reduced-motion`.
 */

interface Nodo {
  id: string;
  x: number;
  y: number;
  color: string;
  obra: string;
  detalle: string;
  /** Nodos cerca del borde derecho llevan su etiqueta a la izquierda (evita recorte del viewBox). */
  etiquetaIzquierda?: boolean;
}

const NODOS: Record<string, Nodo> = {
  cityTowers: { id: "cityTowers", x: 140, y: 250, color: "#d85a30", obra: "OBRA · CITY TOWERS", detalle: "+ 4.2t cemento" },
  losCedros: { id: "losCedros", x: 340, y: 120, color: "#e5b52e", obra: "OBRA · LOS CEDROS", detalle: "− 2.1t cemento" },
  columnas: { id: "columnas", x: 500, y: 230, color: "#d85a30", obra: "OBRA · COLUMNAS", detalle: "+ 80m varilla", etiquetaIzquierda: true },
  alameda: { id: "alameda", x: 250, y: 350, color: "#e5b52e", obra: "OBRA · ALAMEDA", detalle: "60m varilla" },
  palmares: { id: "palmares", x: 440, y: 390, color: "#5ec5d6", obra: "OBRA · PALMARES", detalle: "match 92%" },
};

const CONEXIONES: [string, string][] = [
  ["cityTowers", "losCedros"],
  ["losCedros", "columnas"],
  ["cityTowers", "alameda"],
  ["alameda", "palmares"],
  ["columnas", "palmares"],
];

const MONO = { fontFamily: "var(--font-mono)" };

export function RedObras() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#100f0e] p-5 sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Network · Mendoza</span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-primario">
          <span className="red-latido h-1.5 w-1.5 rounded-full bg-primario" />
          Live
        </span>
      </div>

      <svg viewBox="0 0 600 460" className="h-auto w-full" role="img" aria-label="Red de obras con excedentes y faltantes que se cruzan entre sí">
        {/* Grilla de fondo */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={460} stroke="#ffffff" strokeOpacity={0.04} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 40} x2={600} y2={i * 40} stroke="#ffffff" strokeOpacity={0.04} />
        ))}

        {/* Conexiones punteadas */}
        {CONEXIONES.map(([desde, hasta]) => {
          const a = NODOS[desde];
          const b = NODOS[hasta];
          return (
            <line
              key={`${desde}-${hasta}`}
              className="red-linea"
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#d85a30"
              strokeWidth={1.5}
              strokeOpacity={0.5}
              strokeDasharray="5 7"
            />
          );
        })}

        {/* Nodos */}
        {Object.values(NODOS).map((nodo) => {
          const anclaFin = nodo.etiquetaIzquierda ?? false;
          const textoX = anclaFin ? nodo.x - 20 : nodo.x + 20;
          return (
            <g key={nodo.id}>
              <circle cx={nodo.x} cy={nodo.y} r={14} fill="none" stroke={nodo.color} strokeOpacity={0.4} />
              <circle cx={nodo.x} cy={nodo.y} r={6} fill={nodo.color} />
              <text x={textoX} y={nodo.y - 3} textAnchor={anclaFin ? "end" : "start"} style={MONO} fontSize={13} fill="#e8e6df">
                {nodo.obra}
              </text>
              <text x={textoX} y={nodo.y + 15} textAnchor={anclaFin ? "end" : "start"} style={MONO} fontSize={13} fill={nodo.color}>
                {nodo.detalle}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
