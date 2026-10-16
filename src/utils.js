import { useState, useEffect, useMemo, useCallback } from "react";
import { BODA } from "./config";

export const fmt = (d, o) => new Intl.DateTimeFormat("es-MX", { timeZone: BODA.zona, ...o }).format(d);
export const rnd = (a, b) => a + Math.random() * (b - a);

export function useCuenta(destino) {
  const calc = useCallback(() => Math.max(0, destino - Date.now()), [destino]);
  const [ms, setMs] = useState(calc);
  
  useEffect(() => {
    setMs(calc());
    const t = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(t);
  }, [calc]);
  
  const s = Math.floor(ms / 1000);
  return [
    ["Días", Math.floor(s / 86400)],
    ["Horas", Math.floor((s % 86400) / 3600)],
    ["Min", Math.floor((s % 3600) / 60)],
    ["Seg", s % 60],
  ];
}

export function useInvitado() {
  return useMemo(() => {
    if (typeof window === "undefined") return BODA.invitadoEjemplo;
    const q = new URLSearchParams(window.location.search);
    const ej = BODA.invitadoEjemplo;
    return {
      nombre: q.get("invitado") || ej.nombre,
      pases: Math.min(10, Math.max(1, Number(q.get("pases")) || ej.pases)),
    };
  }, []);
}

export const tilt = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
};

export const untilt = (e) => {
  e.currentTarget.style.transform = "";
};
