"use client";

import { useEffect, useRef } from "react";

/**
 * Globo de obras de la landing: una esfera "wireframe" (meridianos + paralelos)
 * dibujada en canvas que rota lentamente y acelera al pasar el mouse. Sobre la
 * superficie orbitan puntos con las localidades de Mendoza (rotan con la esfera;
 * sus etiquetas solo se dibujan cuando el punto mira al frente, para que se lean
 * derechas). Canvas — no CSS 3D — porque necesitamos etiquetas planas que sigan
 * a cada punto y una interacción de hover fluida.
 *
 * Las posiciones son estilizadas (las 4 localidades reales caen casi en el mismo
 * punto del planeta): se reparten sobre la esfera para leerse como una red.
 */

interface Localidad {
  nombre: string;
  lat: number;
  lon: number;
}

const LOCALIDADES: Localidad[] = [
  { nombre: "Godoy Cruz", lat: -12, lon: 24 },
  { nombre: "Guaymallén", lat: 24, lon: -34 },
  { nombre: "Ciudad", lat: 4, lon: 76 },
  { nombre: "Luján de Cuyo", lat: -34, lon: -74 },
];

const GRADOS = Math.PI / 180;
const TILT = 0.34; // leve inclinación del eje, como en la referencia

export function GloboObras() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(false);
  // Reanuda el loop al entrar el mouse (con movimiento reducido queda detenido hasta el hover).
  const reanudarRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // El font de canvas no resuelve var(--...): leemos el nombre real (hasheado
    // por next/font) de la variable CSS para usar JetBrains Mono en las etiquetas.
    const familiaMono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim() ||
      "monospace";

    const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const velocidadInactiva = prefiereMenosMovimiento ? 0 : 0.08; // rad/s
    const velocidadHover = prefiereMenosMovimiento ? 0.22 : 0.6;

    let ancho = 0;
    let alto = 0;
    let radio = 0;
    let centroX = 0;
    let centroY = 0;

    const ajustarTamanio = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      ancho = rect.width;
      alto = rect.height;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radio = (Math.min(ancho, alto) / 2) * 0.82;
      centroX = ancho / 2;
      centroY = alto / 2;
    };
    ajustarTamanio();

    // Proyección ortográfica de (lat, lon) a pantalla; z>0 = hemisferio de frente.
    const proyectar = (lat: number, lon: number, rotacion: number) => {
      const phi = lat * GRADOS;
      const lambda = lon * GRADOS + rotacion;
      const x = Math.cos(phi) * Math.sin(lambda);
      const y = Math.sin(phi);
      const z = Math.cos(phi) * Math.cos(lambda);
      const yInclinado = y * Math.cos(TILT) - z * Math.sin(TILT);
      const zInclinado = y * Math.sin(TILT) + z * Math.cos(TILT);
      return { x: centroX + x * radio, y: centroY - yInclinado * radio, z: zInclinado };
    };

    const alfaPorProfundidad = (z: number, frente: number, fondo: number) =>
      fondo + (frente - fondo) * ((z + 1) / 2);

    const dibujarAnillo = (
      puntos: { x: number; y: number; z: number }[],
      colorRgb: string,
    ) => {
      for (let i = 1; i < puntos.length; i++) {
        const anterior = puntos[i - 1];
        const actual = puntos[i];
        const zMedio = (anterior.z + actual.z) / 2;
        ctx.strokeStyle = `rgba(${colorRgb}, ${alfaPorProfundidad(zMedio, 0.34, 0.05).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(anterior.x, anterior.y);
        ctx.lineTo(actual.x, actual.y);
        ctx.stroke();
      }
    };

    const dibujarArco = (rExtra: number, desde: number, hasta: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centroX, centroY, radio + rExtra, desde, hasta);
      ctx.stroke();
      ctx.lineWidth = 1;
    };

    const LINEA = "26, 26, 24";

    const dibujar = (rotacion: number) => {
      ctx.clearRect(0, 0, ancho, alto);

      // Relleno tenue (aspecto "vidrio") dentro del borde de la esfera.
      ctx.save();
      ctx.beginPath();
      ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
      ctx.clip();
      const gradiente = ctx.createRadialGradient(
        centroX - radio * 0.3,
        centroY - radio * 0.35,
        radio * 0.1,
        centroX,
        centroY,
        radio,
      );
      gradiente.addColorStop(0, "rgba(120, 150, 200, 0.14)");
      gradiente.addColorStop(1, "rgba(120, 150, 200, 0.02)");
      ctx.fillStyle = gradiente;
      ctx.fillRect(centroX - radio, centroY - radio, radio * 2, radio * 2);
      ctx.restore();

      // Arcos decorativos (estáticos) alrededor del borde.
      dibujarArco(10, -0.7, 0.4, "rgba(94, 197, 214, 0.75)"); // cian, arriba-derecha
      dibujarArco(6, 2.15, 3.55, "rgba(232, 85, 127, 0.75)"); // rosa, abajo-izquierda
      dibujarArco(15, 2.45, 3.2, "rgba(229, 181, 46, 0.7)"); // amarillo, abajo-izquierda

      ctx.lineWidth = 1;

      // Meridianos (longitud constante).
      for (let lon = 0; lon < 360; lon += 30) {
        const puntos = [];
        for (let lat = -90; lat <= 90; lat += 6) puntos.push(proyectar(lat, lon, rotacion));
        dibujarAnillo(puntos, LINEA);
      }
      // Paralelos (latitud constante).
      for (let lat = -60; lat <= 60; lat += 30) {
        const puntos = [];
        for (let lon = 0; lon <= 360; lon += 6) puntos.push(proyectar(lat, lon, rotacion));
        dibujarAnillo(puntos, LINEA);
      }

      // Borde de la esfera.
      ctx.strokeStyle = `rgba(${LINEA}, 0.22)`;
      ctx.beginPath();
      ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
      ctx.stroke();

      // Puntos de localidades (orbitan con la esfera).
      for (const localidad of LOCALIDADES) {
        const punto = proyectar(localidad.lat, localidad.lon, rotacion);
        const alFrente = punto.z > 0;
        const escala = (punto.z + 1) / 2;

        if (alFrente) {
          ctx.beginPath();
          ctx.arc(punto.x, punto.y, 3 + 3 * escala, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(216, 90, 48, ${(0.5 + 0.5 * escala).toFixed(3)})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(punto.x, punto.y, 7 + 3 * escala, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(216, 90, 48, ${(0.35 * escala).toFixed(3)})`;
          ctx.stroke();

          ctx.font = `11px ${familiaMono}, ui-monospace, monospace`;
          ctx.fillStyle = `rgba(26, 26, 24, ${(0.9 * escala).toFixed(3)})`;
          ctx.textBaseline = "middle";
          ctx.fillText(localidad.nombre, punto.x + 12, punto.y);
        } else {
          ctx.beginPath();
          ctx.arc(punto.x, punto.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(216, 90, 48, ${(0.12).toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    let rotacion = 0;
    let velocidad = velocidadInactiva;
    let ultimo = 0;
    let cuadro = 0;
    // El loop corre solo con el canvas a la vista y la pestaña visible: fuera de pantalla
    // seguía redibujando ~660 trazos por cuadro a 60 fps (CPU y batería en celulares).
    let aLaVista = true;

    const animar = (tiempo: number) => {
      if (ultimo === 0) ultimo = tiempo;
      const dt = Math.min((tiempo - ultimo) / 1000, 0.05);
      ultimo = tiempo;

      const objetivo = hoverRef.current ? velocidadHover : velocidadInactiva;
      velocidad += (objetivo - velocidad) * Math.min(dt * 3, 1); // suavizado
      rotacion += velocidad * dt;

      dibujar(rotacion);
      // Con movimiento reducido la esfera está quieta: sin hover, ya frenada, no hay nada que animar.
      if (prefiereMenosMovimiento && !hoverRef.current && velocidad < 0.001) {
        velocidad = 0;
        cuadro = 0;
        return;
      }
      cuadro = requestAnimationFrame(animar);
    };

    // Dueño único del loop: siempre se cancela el frame pendiente antes de
    // agendar otro. Evita apilar dos loops si el componente monta con la pestaña
    // oculta (el frame inicial queda encolado) y luego se la enfoca.
    const iniciar = () => {
      cancelAnimationFrame(cuadro);
      ultimo = 0;
      cuadro = requestAnimationFrame(animar);
    };
    const detener = () => {
      cancelAnimationFrame(cuadro);
      cuadro = 0;
    };
    const reanudarSiCorresponde = () => {
      if (aLaVista && !document.hidden) iniciar();
      else detener();
    };
    reanudarSiCorresponde();
    reanudarRef.current = reanudarSiCorresponde;

    const alCambiarVisibilidad = () => reanudarSiCorresponde();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);

    const observadorDeVista = new IntersectionObserver(([entrada]) => {
      aLaVista = entrada?.isIntersecting ?? true;
      reanudarSiCorresponde();
    });
    observadorDeVista.observe(canvas);

    // Al cambiar el tamaño se redibuja aunque el loop esté detenido (si no, quedaba en blanco).
    const observador = new ResizeObserver(() => {
      ajustarTamanio();
      dibujar(rotacion);
    });
    observador.observe(canvas);

    return () => {
      detener();
      reanudarRef.current = () => {};
      observador.disconnect();
      observadorDeVista.disconnect();
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => {
        hoverRef.current = true;
        reanudarRef.current();
      }}
      onMouseLeave={() => (hoverRef.current = false)}
      className="h-full w-full"
      aria-label="Globo interactivo con las obras geolocalizadas en Mendoza"
      role="img"
    />
  );
}
