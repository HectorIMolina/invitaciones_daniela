import React, { useMemo } from "react";
import { rnd } from "../utils";

export const FloralCornerSVG = ({ className, color = "#D96A70" }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 110 C 20 70, 50 40, 110 10" stroke="#94B488" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M40 73 C 25 60, 20 45, 30 35 C 40 45, 35 60, 40 73 Z" fill="#94B488" opacity="0.85" />
    <path d="M73 40 C 60 25, 45 20, 35 30 C 45 40, 60 35, 73 40 Z" fill="#94B488" opacity="0.85" />
    <circle cx="30" cy="85" r="9" fill="#F2A04E" />
    <circle cx="23" cy="80" r="7" fill="#F2BACC" />
    <circle cx="37" cy="80" r="7" fill="#F2BACC" />
    <circle cx="30" cy="74" r="7" fill="#F2BACC" />
    <circle cx="30" cy="94" r="7" fill="#F2BACC" />
    <circle cx="30" cy="85" r="4" fill="#FBE47E" />
    <circle cx="85" cy="30" r="12" fill={color} />
    <circle cx="74" cy="25" r="8" fill="#F2BACC" />
    <circle cx="96" cy="25" r="8" fill="#F2BACC" />
    <circle cx="85" cy="15" r="8" fill="#F2BACC" />
    <circle cx="85" cy="45" r="8" fill="#F2BACC" />
    <circle cx="85" cy="30" r="5" fill="#FBE47E" />
    <circle cx="55" cy="55" r="6" fill="#B4C5D2" />
    <circle cx="68" cy="68" r="5" fill="#B4C5D2" />
    <circle cx="50" cy="40" r="4" fill="#F2A04E" />
    <circle cx="40" cy="50" r="4" fill="#D96A70" />
  </svg>
);

export const FloralDividerSVG = () => (
  <svg className="floral-divider" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20 Q 50 35, 100 20 T 190 20" stroke="#B4C5D2" strokeWidth="2" fill="none" />
    <circle cx="100" cy="20" r="8" fill="#D96A70" />
    <circle cx="82" cy="20" r="5" fill="#F2A04E" />
    <circle cx="118" cy="20" r="5" fill="#F2A04E" />
    <circle cx="65" cy="20" r="4" fill="#F2BACC" />
    <circle cx="135" cy="20" r="4" fill="#F2BACC" />
    <circle cx="100" cy="20" r="3" fill="#FBE47E" />
  </svg>
);

export const QRCodeSVG = ({ texto }) => {
  const matrix = useMemo(() => {
    const size = 15;
    const grid = Array(size).fill(0).map(() => Array(size).fill(0));
    let hash = 0;
    for (let i = 0; i < texto.length; i++) hash = texto.charCodeAt(i) + ((hash << 5) - hash);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) grid[r][c] = Math.abs((hash ^ (r * 13 + c * 37)) % 2) === 1;
    }
    const setFinder = (startR, startC) => {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          if (r === 0 || r === 4 || c === 0 || c === 4 || (r >= 1 && r <= 3 && c >= 1 && c <= 3 && (r === 2 || c === 2))) {
            grid[startR + r][startC + c] = 1;
          } else { grid[startR + r][startC + c] = 0; }
        }
      }
    };
    setFinder(0, 0); setFinder(0, size - 5); setFinder(size - 5, 0);
    return grid;
  }, [texto]);

  const cell = 10;
  return (
    <svg viewBox="0 0 170 170" width="170" height="170" className="qr-svg">
      <rect width="170" height="170" fill="#FFFFFF" rx="12" />
      <g transform="translate(10, 10)">
        {matrix.map((row, r) => row.map((val, c) => val ? (
          <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell - 0.8} height={cell - 0.8} rx={2} fill={r < 5 && c < 5 ? "#D96A70" : r < 5 && c >= 10 ? "#F2A04E" : r >= 10 && c < 5 ? "#94B488" : "#5C3D38"} />
        ) : null))}
      </g>
    </svg>
  );
};

export function PetalosFlotantes({ count = 40 }) {
  const colores = ["#F2BACC", "#FBE47E", "#F2A04E", "#B4C5D2", "#D96A70"];
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: `${rnd(2, 98)}%`, dx: `${rnd(-100, 100)}px`, size: `${rnd(12, 24)}px`,
    time: `${rnd(8, 16)}s`, delay: `${rnd(0, 10)}s`, color: colores[i % colores.length],
    rot: `${rnd(0, 360)}deg`, shape: i % 3,
  })), [count, colores]);

  return (
    <div className="petalos-container" aria-hidden="true">
      {items.map((st, i) => (
        <span
          key={i} className={`petalo petalo--shape-${st.shape}`}
          style={{ "--x": st.x, "--dx": st.dx, "--size": st.size, "--time": st.time, "--delay": st.delay, "--color": st.color, "--rot": st.rot }}
        />
      ))}
    </div>
  );
}