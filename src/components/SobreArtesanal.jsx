import React from "react";
import { PetalosFlotantes, FloralCornerSVG } from "./Graficos";
import { BODA } from "../config";
import { fmt } from "../utils";

export default function SobreArtesanal({ fase, onAbrir }) {
  return (
    <div className={`sobre-wrapper ${fase >= 3 ? "sobre-wrapper--desaparecer" : ""}`}>
      
      {/* Pétalos cayendo de fondo */}
      <PetalosFlotantes count={35} />
      
      {/* Todo este contenedor detecta el clic para abrir y tiene el latido */}
      <div 
        className={`sobre-real ${fase >= 1 ? "sobre-real--abierto" : ""} ${fase === 0 ? "sobre-real--invitando" : ""}`}
        onClick={() => { if (fase === 0) onAbrir(); }}
        style={{ cursor: fase === 0 ? 'pointer' : 'default' }}
      >
        {/* 1. Fondo interior del sobre */}
        <div className="sobre-real__cuerpo" />

        {/* 2. Carta interna (blanca, sale hacia arriba) */}
        <div className="carta-interna">
          <div className="carta-interna__contenido">
            <span className="carta-interna__tag">Nuestra Boda</span>
            <h2 className="carta-interna__nombres">{BODA.novia} <br/><span style={{fontSize:'0.6em', color:'var(--naranja-coral)'}}>&</span><br/> {BODA.novio}</h2>
            <p className="carta-interna__fecha">
              {fmt(new Date(BODA.inicio), { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <span className="carta-interna__lugar">{BODA.ciudad}</span>
          </div>
        </div>

        {/* 3. Solapas Fijas (Izquierda, Derecha, Inferior) */}
        <div className="sobre-real__solapas-fijas">
          <div className="solapa-izq" />
          <div className="solapa-der" />
          <div className="solapa-inf" />
          {/* Flores esquinas inferiores (Se quedan fijas abajo) */}
          <FloralCornerSVG className="floral-esquina floral-bl" color="#94B488" />
          <FloralCornerSVG className="floral-esquina floral-br" color="#F2BACC" />
        </div>

        {/* 4. Solapa Superior (Es la que gira hacia arriba al hacer clic) */}
        <div className="sobre-real__solapa-sup">
          {/* Flores esquinas superiores (Giran junto con la solapa de papel) */}
          <FloralCornerSVG className="floral-esquina floral-tl" color="#D96A70" />
          <FloralCornerSVG className="floral-esquina floral-tr" color="#F2A04E" />
        </div>

        {/* 5. Sello de Lacre */}
        <button 
          className={`sello-lacre ${fase === 0 ? "sello-lacre--latido" : ""}`} 
          disabled={fase > 0} 
        >
          <div className="sello-lacre__inner">
            <span className="sello-lacre__heart">♥</span>
            <span className="sello-lacre__text">D & J</span>
          </div>
        </button>
      </div>

      <p className="instruccion-abrir">
        {fase === 0 ? "Toca el sobre para descubrir 🌸" : "Desplegando invitación..."}
      </p>
    </div>
  );
}