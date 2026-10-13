/** Isotipo de ConstruEx: dos cuadrados superpuestos (tinta + acento naranja). */
export function Isotipo({ tamanio = 26 }: { tamanio?: number }) {
  return (
    <svg width={tamanio} height={tamanio} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect x="8" y="8" width="34" height="34" rx="2" stroke="currentColor" strokeWidth="3.5" />
      <rect x="22" y="22" width="34" height="34" rx="2" stroke="#d85a30" strokeWidth="3.5" />
    </svg>
  );
}

/** Logotipo completo: isotipo + "construEx" con el "Ex" en acento. */
export function LogoConstruEx({ tamanio = 26 }: { tamanio?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[19px] font-bold tracking-[-0.01em] text-tinta">
      <Isotipo tamanio={tamanio} />
      <span>
        constru<span className="text-primario">Ex</span>
      </span>
    </span>
  );
}
