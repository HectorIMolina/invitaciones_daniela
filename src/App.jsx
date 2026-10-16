import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ───── 1. CONFIGURACIÓN BASE DE LA BODA ───── */
export const BODA_DEFAULT = {
  novia: "Daniela",
  novio: "Jeshua",
  inicio: "2027-04-23T16:00:00-06:00",
  zona: "America/Mexico_City",
  ciudad: "Aguascalientes, Ags.",
  whatsappTel: "525512345678",
  driveURL: "https://drive.google.com/drive/folders/TU_ENLACE_DE_CARPETA_AQUI?usp=sharing",
  frase: {
    texto: "Amar no es mirarse el uno al otro, sino mirar juntos en la misma dirección.",
    autor: "Antoine de Saint-Exupéry",
  },
  itinerario: [
    { min: 0, titulo: "Ceremonia Religiosa", lugar: "Templo San Antonio, Aguascalientes" },
    { min: 90, titulo: "Cóctel de Bienvenida", lugar: "Jardín de Eventos, Ags." },
    { min: 165, titulo: "Banquete y Brindis", lugar: "Jardín de Eventos, Ags." },
    { min: 285, titulo: "Primer Baile", lugar: "Pista Principal" },
    { min: 315, titulo: "Fiesta y Celebración", lugar: "Pista Principal" },
  ],
  lugares: [
    { nombre: "Ceremonia Religiosa", sitio: "Templo de San Antonio", dir: "Zaragoza #601, Centro, Aguascalientes", mapa: "https://maps.google.com", min: 0 },
    { nombre: "Recepción & Fiesta", sitio: "Jardín de las Flores", dir: "Av. Las Américas #1200, Aguascalientes", mapa: "https://maps.google.com", min: 90 },
  ],
  vestimenta: {
    etiqueta: "Formal Elegante",
    mujeres: "Vestido largo en tonos pastel o florales",
    hombres: "Traje formal o Guayabera elegante (saco opcional)",
    paleta: ["#F2BACC", "#FBE47E", "#F2A04E", "#B4C5D2", "#94B488", "#D96A70"],
    nota: "Favor de reservar el color blanco exclusivamente para la novia.",
  },
  regalos: {
    mesaEvento: "50892341",
    tienda: "Liverpool / Sears",
    clabe: "012180000000000000",
    banco: "BBVA México",
    titular: "Daniela y Jeshua",
  },
  soloAdultos: true,
  canciones: [
    { id: 1, titulo: "Si tú eres mi hombre y yo tu mujer", artista: "Celine Dion", youtubeId: "k2XGXinaZ3Y", duracion: "5:21" },
    { id: 2, titulo: "Hasta Mi Final", artista: "Il Divo", youtubeId: "c-3vT02j62I", duracion: "3:36" },
    { id: 3, titulo: "Por Eso Te Amo", artista: "Río Roma", youtubeId: "M2S8_S7W5oI", duracion: "3:30" },
    { id: 4, titulo: "Solo Para Ti", artista: "Camila", youtubeId: "3eI2uT19fA4", duracion: "3:08" },
    { id: 5, titulo: "Thinking Out Loud", artista: "Ed Sheeran", youtubeId: "lp-EO5I60KA", duracion: "4:41" },
  ],
};

const INVITADOS_INICIALES = [
  { id: "INV-8821", nombre: "José y Laura Gómez", pasesMax: 2, pasesConfirmados: 2, estadoRsvp: "confirmado", ingresado: false, fechaIngreso: null },
  { id: "INV-4109", nombre: "Familia Martínez Silva", pasesMax: 4, pasesConfirmados: 4, estadoRsvp: "confirmado", ingresado: false, fechaIngreso: null },
  { id: "INV-9023", nombre: "Carlos Eduardo Ramos", pasesMax: 1, pasesConfirmados: 1, estadoRsvp: "pendiente", ingresado: false, fechaIngreso: null },
  { id: "INV-1154", nombre: "Dra. Sofía Mendoza", pasesMax: 2, pasesConfirmados: 2, estadoRsvp: "confirmado", ingresado: false, fechaIngreso: null },
];

// 1. Rosa Carmín
const FlorRosa = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,60 Q48,90 52,115 Q54,130 50,145" stroke="#2e7d32" strokeWidth="3" fill="none"/>
    <path d="M50,85 Q30,80 25,95 Q40,100 50,95Z" fill="#388e3c"/>
    <path d="M52,105 Q72,100 77,115 Q62,120 52,115Z" fill="#43a047"/>
    <circle cx="50" cy="45" r="24" fill="#c2185b"/>
    <path d="M50,21 Q66,33 50,45 Q34,33 50,21Z" fill="#e91e63"/>
    <path d="M50,45 Q66,57 50,69 Q34,57 50,45Z" fill="#e91e63"/>
    <path d="M26,45 Q38,60 50,45 Q38,30 26,45Z" fill="#ad1457"/>
    <path d="M74,45 Q62,60 50,45 Q62,30 74,45Z" fill="#ad1457"/>
    <circle cx="50" cy="45" r="7" fill="#880e4f"/>
  </svg>
);

// 2. Girasol
const FlorGirasol = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,70 Q48,110 50,145" stroke="#33691e" strokeWidth="4" fill="none"/>
    <path d="M50,90 Q20,85 15,110 Q35,115 50,105Z" fill="#43a047"/>
    <path d="M50,105 Q80,100 85,125 Q65,130 50,120Z" fill="#388e3c"/>
    <g transform="translate(50,45)" fill="#fdd835">
      <ellipse cx="0" cy="-28" rx="6" ry="14"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(30)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(60)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(90)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(120)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(150)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(180)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(210)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(240)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(270)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(300)"/>
      <ellipse cx="0" cy="-28" rx="6" ry="14" transform="rotate(330)"/>
      <circle r="14" fill="#5d4037"/>
      <circle r="9" fill="#3e2723"/>
    </g>
  </svg>
);

// 3. Margarita Blanca
const FlorMargarita = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,55 Q52,100 50,145" stroke="#388e3c" strokeWidth="2.5" fill="none"/>
    <path d="M50,85 Q32,88 28,105 Q42,105 50,95Z" fill="#4caf50"/>
    <path d="M50,100 Q68,103 72,120 Q58,120 50,110Z" fill="#43a047"/>
    <g transform="translate(50,45)">
      <g fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.8">
        <ellipse cx="0" cy="-22" rx="6" ry="16"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(45)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(90)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(135)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(180)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(225)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(270)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="16" transform="rotate(315)"/>
      </g>
      <circle r="9" fill="#ffeb3b"/>
    </g>
  </svg>
);

// 4. Orquídea Rosa
const FlorOrquidea = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,65 Q48,110 50,145" stroke="#33691e" strokeWidth="3" fill="none"/>
    <path d="M50,100 Q25,100 18,120 Q35,122 50,110Z" fill="#43a047"/>
    <g transform="translate(50,55)">
      <ellipse cx="-18" cy="0" rx="7" ry="20" fill="#f48fb1" transform="rotate(-40)"/>
      <ellipse cx="18" cy="0" rx="7" ry="20" fill="#f48fb1" transform="rotate(40)"/>
      <ellipse cx="-9" cy="-5" rx="7" ry="22" fill="#f06292" transform="rotate(-20)"/>
      <ellipse cx="9" cy="-5" rx="7" ry="22" fill="#f06292" transform="rotate(20)"/>
      <ellipse cx="0" cy="-8" rx="7" ry="24" fill="#ec407a"/>
      <circle cx="0" cy="-8" r="5" fill="#ffeb3b"/>
    </g>
  </svg>
);

// 5. Narciso Amarillo
const FlorNarciso = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,60 Q52,100 50,145" stroke="#2e7d32" strokeWidth="3" fill="none"/>
    <path d="M50,80 Q35,80 30,95 Q45,98 50,90Z" fill="#4caf50"/>
    <g transform="translate(50,50)">
      <path d="M0,0 Q-5,-25 -15,-35 Q-5,-20 0,0Z" fill="#fff9c4"/>
      <path d="M0,0 Q5,-25 15,-35 Q5,-20 0,0Z" fill="#fff59d"/>
      <path d="M0,0 Q-25,-10 -35,0 Q-20,-5 0,0Z" fill="#fff9c4"/>
      <path d="M0,0 Q25,-10 35,0 Q20,-5 0,0Z" fill="#fff59d"/>
      <circle r="6" fill="#ff9800"/>
    </g>
  </svg>
);

// 6. Dalia / Gerbera Naranja
const FlorGerbera = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,65 Q50,105 50,145" stroke="#33691e" strokeWidth="3.5" fill="none"/>
    <path d="M50,90 Q28,88 22,108 Q40,110 50,100Z" fill="#43a047"/>
    <g transform="translate(50,45)">
      <g fill="#ff7043">
        <ellipse cx="0" cy="-26" rx="6" ry="13"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(40)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(80)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(120)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(160)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(200)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(240)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(280)"/>
        <ellipse cx="0" cy="-26" rx="6" ry="13" transform="rotate(320)"/>
      </g>
      <circle r="6" fill="#bf360c"/>
    </g>
  </svg>
);

// 7. Flor Silvestre Amarilla
const FlorAmarilla = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,60 Q50,105 50,145" stroke="#388e3c" strokeWidth="3" fill="none"/>
    <g transform="translate(50,45)">
      <g fill="#fff9c4">
        <ellipse cx="0" cy="-24" rx="9" ry="17"/>
        <ellipse cx="0" cy="-24" rx="9" ry="17" transform="rotate(60)"/>
        <ellipse cx="0" cy="-24" rx="9" ry="17" transform="rotate(120)"/>
        <ellipse cx="0" cy="-24" rx="9" ry="17" transform="rotate(180)"/>
        <ellipse cx="0" cy="-24" rx="9" ry="17" transform="rotate(240)"/>
        <ellipse cx="0" cy="-24" rx="9" ry="17" transform="rotate(300)"/>
      </g>
      <circle r="12" fill="#ffb300"/>
    </g>
  </svg>
);

// 8. Peonía Fucsia
const FlorPeonia = ({ className }) => (
  <svg className={className} viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,65 Q52,105 50,145" stroke="#2e7d32" strokeWidth="3.5" fill="none"/>
    <g transform="translate(50,48)">
      <g fill="#f8bbd0">
        <circle cx="0" cy="-20" r="15"/>
        <circle cx="17" cy="-6" r="15"/>
        <circle cx="11" cy="16" r="15"/>
        <circle cx="-11" cy="16" r="15"/>
        <circle cx="-17" cy="-6" r="15"/>
      </g>
      <circle r="8" fill="#ec407a"/>
    </g>
  </svg>
);

// 9. Rama de Eucalipto
const RamaEucalipto = ({ className }) => (
  <svg className={className} viewBox="0 0 80 160" xmlns="http://www.w3.org/2000/svg">
    <path d="M40,10 Q42,80 40,150" stroke="#526e45" strokeWidth="3" fill="none" />
    <circle cx="22" cy="35" r="14" fill="#88a375" opacity="0.85" />
    <circle cx="58" cy="45" r="15" fill="#7a9a6b" opacity="0.85" />
    <circle cx="20" cy="75" r="16" fill="#608053" opacity="0.9" />
    <circle cx="60" cy="85" r="17" fill="#88a375" opacity="0.85" />
    <circle cx="24" cy="115" r="15" fill="#7a9a6b" opacity="0.85" />
  </svg>
);

// 10. Flor Lavanda
const FlorLavanda = ({ className }) => (
  <svg className={className} viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,50 L30,135" stroke="#388e3c" strokeWidth="2.5" fill="none" />
    <circle cx="30" cy="20" r="7" fill="#8e24aa" />
    <circle cx="22" cy="32" r="8" fill="#ab47bc" />
    <circle cx="38" cy="32" r="8" fill="#ab47bc" />
    <circle cx="20" cy="48" r="9" fill="#8e24aa" />
    <circle cx="40" cy="48" r="9" fill="#8e24aa" />
  </svg>
);

const FloralDividerSVG = () => (
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

const fmt = (d, o) => new Intl.DateTimeFormat("es-MX", { timeZone: BODA_DEFAULT.zona, ...o }).format(d);
const rnd = (a, b) => a + Math.random() * (b - a);

const tilt = (e) => {
  const el = e.currentTarget;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
};

const untilt = (e) => {
  if (e?.currentTarget) e.currentTarget.style.transform = "";
};

// Flor en PNG (archivos /1.png ... /16.png en la carpeta public)
const FlorImg = ({ n, className = "" }) => (
  <img src={`/${n}.png`} alt="" aria-hidden="true" draggable="false" loading="lazy" className={`flor-img ${className}`} />
);

function useCuenta(destino) {
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

function PetalosFlotantes({ count = 28 }) {
  const colores = ["#F2BACC", "#FBE47E", "#F2A04E", "#B4C5D2", "#D96A70"];
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: `${rnd(2, 98)}%`, dx: `${rnd(-100, 100)}px`, size: `${rnd(10, 20)}px`,
    time: `${rnd(8, 16)}s`, delay: `${rnd(0, 10)}s`, color: colores[i % colores.length],
    rot: `${rnd(0, 360)}deg`, shape: i % 3,
  })), [count]);

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

/* ───── SOBRE CON IMÁGENES (/sobre-cerrado.png, /sobre-abierto.png, /sello-lacre.png en la carpeta public) ───── */
function SobreArtesanal({ fase, onAbrir, invitado }) {
  const nombreInvitado = invitado?.nombre || "Invitado Especial";

  return (
    <div className={`sobre-wrapper ${fase >= 3 ? "sobre-wrapper--desaparecer" : ""}`}>

      {/* Marco floral abundante que abraza el sobre sin estorbar la carta */}
      <div className="guirnalda-abrazo-svg">
        <FlorRosa className="fl-svg pos-tl-1" />
        <FlorGirasol className="fl-svg pos-tl-2" />
        <RamaEucalipto className="fl-svg pos-tl-3" />

        <FlorGerbera className="fl-svg pos-tr-1" />
        <FlorPeonia className="fl-svg pos-tr-2" />
        <FlorLavanda className="fl-svg pos-tr-3" />

        <FlorOrquidea className="fl-svg pos-ml-1" />
        <FlorMargarita className="fl-svg pos-ml-2" />

        <FlorAmarilla className="fl-svg pos-mr-1" />
        <FlorNarciso className="fl-svg pos-mr-2" />

        <FlorGerbera className="fl-svg pos-bl-1" />
        <FlorOrquidea className="fl-svg pos-bl-2" />
        <RamaEucalipto className="fl-svg pos-bl-3" />

        <FlorGirasol className="fl-svg pos-br-1" />
        <FlorRosa className="fl-svg pos-br-2" />
        <FlorLavanda className="fl-svg pos-br-3" />
      </div>

      <div
        className={`sobre-real ${fase >= 1 ? "sobre-real--abierto" : ""} ${fase === 0 ? "sobre-real--invitando" : ""}`}
        onClick={() => { if (fase === 0) onAbrir(); }}
        style={{ cursor: fase === 0 ? 'pointer' : 'default' }}
      >
        {/* 1. Fondo: sobre abierto (forro + cuerpo), queda atrás de todo */}
        <div className="sobre-real__cuerpo" />

        {/* 2. Carta interna: sube desde adentro, por detrás del bolsillo frontal */}
        <div className="carta-interna">
          <div className="carta-interna__contenido">
            <span className="carta-interna__tag">Nuestra Boda</span>
            <h2 className="carta-interna__nombres">{BODA_DEFAULT.novia} & {BODA_DEFAULT.novio}</h2>
            <p className="carta-interna__invitado">
              Invitación Especial para:<br/>
              <strong>{nombreInvitado}</strong>
            </p>
            <p className="carta-interna__fecha">
              {fmt(new Date(BODA_DEFAULT.inicio), { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <span className="carta-interna__lugar">{BODA_DEFAULT.ciudad}</span>
          </div>
        </div>

        {/* 3. Bolsillo frontal del sobre abierto (tapa la carta por delante) */}
        <div className="sobre-real__bolsillo-frontal" />

        {/* 4. Sobre cerrado (sin solapa); se desvanece cuando la solapa ya se levantó */}
        <div className="sobre-real__cerrado" />

        {/* 5. Solapa 3D: por fuera = sobre cerrado + sello, por dentro = forro floral abierto */}
        <div className="sobre-real__solapa-sup">
          <div className="solapa-cara solapa-cara--frente">
            <div className="solapa-cara__papel" />
            <img className="sello-lacre-img" src="/sello-lacre.png" alt="Sello D&J" draggable="false" />
          </div>
          <div className="solapa-cara solapa-cara--dorso" />
        </div>
      </div>

      <p className="instruccion-abrir">
        {fase === 0 ? "Toca el sobre para descubrir" : "Desplegando invitación..."}
      </p>
    </div>
  );
}

function ReproductorMusica({ reproduciendo, setReproduciendo, cancionActual, setCancionActual }) {
  const [desplegado, setDesplegado] = useState(false);
  const song = BODA_DEFAULT.canciones[cancionActual] || BODA_DEFAULT.canciones[0];

  return (
    <>
      <div style={{ display: "none" }}>
        {reproduciendo && (
          <iframe 
            width="100" 
            height="100" 
            src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&enablejsapi=1`} 
            title="Música de boda" 
            allow="autoplay" 
          />
        )}
      </div>

      <div className="audio-float-control">
        <button 
          className={`btn-audio-float ${reproduciendo ? "btn-audio-float--active" : ""}`} 
          onClick={() => setReproduciendo(!reproduciendo)}
          type="button"
          aria-label={reproduciendo ? "Pausar música" : "Reproducir música"}
        >
          {reproduciendo ? "⏸" : "▶"}
          <span className="pulse-wave" />
        </button>
        <button 
          className="btn-playlist-toggle" 
          onClick={() => setDesplegado(!desplegado)}
          type="button"
        >
          🎵 Playlist
        </button>
      </div>

      {desplegado && (
        <div className="playlist-modal" onClick={() => setDesplegado(false)}>
          <div className="playlist-card" onClick={(e) => e.stopPropagation()}>
            <div className="playlist-header">
              <h3>🎶 Lista de Reproducción</h3>
              <button className="btn-close" onClick={() => setDesplegado(false)} type="button">✕</button>
            </div>
            <div className="playlist-items">
              {BODA_DEFAULT.canciones.map((s, idx) => (
                <div 
                  key={s.id} 
                  className={`playlist-item ${cancionActual === idx && reproduciendo ? "playlist-item--playing" : ""}`} 
                  onClick={() => { setCancionActual(idx); setReproduciendo(true); }}
                >
                  <div className="song-icon">{cancionActual === idx && reproduciendo ? "▶" : "🎵"}</div>
                  <div className="song-info">
                    <p className="song-title">{s.titulo}</p>
                    <p className="song-artist">{s.artista}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PanelAdmin({ invitados, setInvitados, setInvitadoActual, volverAInvitacion }) {
  const [nombreInput, setNombreInput] = useState("");
  const [pasesInput, setPasesInput] = useState(2);
  const [editandoId, setEditandoId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editPases, setEditPases] = useState(2);

  const [codigoEscanear, setCodigoEscanear] = useState("");
  const [resultadoEscaneo, setResultadoEscaneo] = useState(null);

  const totalInvitados = invitados.length;
  const totalPasesConfirmados = invitados.reduce((acc, curr) => acc + Number(curr.pasesConfirmados || 0), 0);
  const totalIngresados = invitados.filter(i => i.ingresado).length;

  const agregarInvitado = (e) => {
    e.preventDefault();
    if (!nombreInput.trim()) return;
    const nuevo = {
      id: "INV-" + Math.floor(1000 + Math.random() * 9000),
      nombre: nombreInput.trim(),
      pasesMax: Number(pasesInput),
      pasesConfirmados: Number(pasesInput),
      estadoRsvp: "pendiente",
      ingresado: false,
      fechaIngreso: null,
    };
    const act = [...invitados, nuevo];
    setInvitados(act);
    localStorage.setItem("boda_invitados_db", JSON.stringify(act));
    setNombreInput("");
    setPasesInput(2);
  };

  const guardarEdicion = (id) => {
    const act = invitados.map(inv => 
      inv.id === id ? { ...inv, nombre: editNombre, pasesMax: Number(editPases), pasesConfirmados: Number(editPases) } : inv
    );
    setInvitados(act);
    localStorage.setItem("boda_invitados_db", JSON.stringify(act));
    setEditandoId(null);
  };

  const eliminarInvitado = (id) => {
    const act = invitados.filter(inv => inv.id !== id);
    setInvitados(act);
    localStorage.setItem("boda_invitados_db", JSON.stringify(act));
  };

  const compartirWhatsApp = (inv) => {
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/admin\/?$/, "");
    const linkPersonalizado = `${baseUrl}?guestId=${inv.id}`;
    const mensajeWA = `¡Hola ${inv.nombre}! Daniela y Jeshua te invitan cordialmente a celebrar su boda. Consulta tu invitación digital y pase con código QR aquí:\n${linkPersonalizado}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensajeWA)}`, "_blank");
  };

  const procesarValidacionQR = (e) => {
    e.preventDefault();
    setResultadoEscaneo(null);
    const idLimpio = codigoEscanear.trim().toUpperCase();
    const inv = invitados.find(i => i.id.toUpperCase() === idLimpio);

    if (!inv) {
      setResultadoEscaneo({ tipo: "error", titulo: "❌ CÓDIGO INVÁLIDO", detalle: "No existe ninguna invitación registrada con este código QR." });
      return;
    }

    if (inv.ingresado) {
      setResultadoEscaneo({
        tipo: "alerta",
        titulo: "⚠️ ¡ALERTA! INVITACIÓN YA UTILIZADA",
        detalle: `Esta invitación perteneciente a "${inv.nombre}" ya fue ingresada el ${inv.fechaIngreso}.`,
      });
    } else {
      const horaIngreso = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + new Date().toLocaleDateString();
      const act = invitados.map(i => i.id === inv.id ? { ...i, ingresado: true, fechaIngreso: horaIngreso } : i);
      setInvitados(act);
      localStorage.setItem("boda_invitados_db", JSON.stringify(act));
      setResultadoEscaneo({
        tipo: "exito",
        titulo: "✅ ¡ENTRADA VÁLIDA Y CONFIRMADA!",
        detalle: `Bienvenido(a) ${inv.nombre}.\nPases autorizados: ${inv.pasesConfirmados} persona(s).`,
      });
    }
    setCodigoEscanear("");
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <div>
          <h2>🛠️ Panel de Control - Boda Daniela & Jeshua</h2>
          <p className="text-suave">Ruta activa: <code>/admin</code>. Gestión de lista, pases y scanner de accesos en recepción.</p>
        </div>
        <button className="btn-action btn-outline" onClick={volverAInvitacion} type="button">
          Ver Invitación Pública
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-val">{totalInvitados}</span>
          <span className="stat-lbl">Familias / Grupos</span>
        </div>
        <div className="stat-card">
          <span className="stat-val" style={{ color: "var(--verde-menta)" }}>{totalPasesConfirmados}</span>
          <span className="stat-lbl">Pases Confirmados</span>
        </div>
        <div className="stat-card">
          <span className="stat-val" style={{ color: "var(--rojo-amapola)" }}>{totalIngresados} / {totalInvitados}</span>
          <span className="stat-lbl">Pases Escaneados en Puerta</span>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>➕ Agregar Nuevo Invitado</h3>
          <form onSubmit={agregarInvitado} className="admin-form">
            <div className="form-group">
              <label className="form-label">Nombre del Invitado / Familia:</label>
              <input 
                type="text" 
                className="form-input" 
                value={nombreInput} 
                onChange={e => setNombreInput(e.target.value)} 
                placeholder="Ej. Familia Rodríguez" 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Número de Pases Asignados:</label>
              <input 
                type="number" 
                min="1" 
                max="10" 
                className="form-input" 
                value={pasesInput} 
                onChange={e => setPasesInput(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-action btn-coral">Generar Invitación & QR</button>
          </form>
        </div>

        <div className="admin-card">
          <h3>🔍 Escáner / Validador de Pase QR</h3>
          <p className="text-suave" style={{ fontSize: "0.85rem" }}>
            Escribe o escanea el ID de la tarjeta digital (ejemplo: <code>INV-8821</code>):
          </p>
          <form onSubmit={procesarValidacionQR} className="admin-form">
            <input 
              type="text" 
              className="form-input" 
              value={codigoEscanear} 
              onChange={e => setCodigoEscanear(e.target.value)} 
              placeholder="Ingresar o escanear ID de QR..." 
              required 
            />
            <button type="submit" className="btn-action btn-coral">Validar Entrada en Recepción</button>
          </form>

          {resultadoEscaneo && (
            <div className={`alerta-box alerta-${resultadoEscaneo.tipo}`}>
              <h4>{resultadoEscaneo.titulo}</h4>
              <p style={{ whiteSpace: "pre-line" }}>{resultadoEscaneo.detalle}</p>
            </div>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: "2rem" }}>
        <h3>📜 Lista General de Invitados ({invitados.length})</h3>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Código ID</th>
                <th>Invitado / Familia</th>
                <th>Pases</th>
                <th>Estado Acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invitados.map(inv => (
                <tr key={inv.id}>
                  <td><code>{inv.id}</code></td>
                  <td>
                    {editandoId === inv.id ? (
                      <input 
                        type="text" 
                        className="form-input form-input-sm" 
                        value={editNombre} 
                        onChange={e => setEditNombre(e.target.value)} 
                      />
                    ) : (
                      <strong>{inv.nombre}</strong>
                    )}
                  </td>
                  <td>
                    {editandoId === inv.id ? (
                      <input 
                        type="number" 
                        min="1" 
                        max="10" 
                        className="form-input form-input-sm" 
                        value={editPases} 
                        onChange={e => setEditPases(e.target.value)} 
                      />
                    ) : (
                      <span>{inv.pasesConfirmados} pases</span>
                    )}
                  </td>
                  <td>
                    {inv.ingresado ? (
                      <span className="badge badge-rojo">INGRESADO ({inv.fechaIngreso})</span>
                    ) : (
                      <span className="badge badge-verde">PENDIENTE ENTRADA</span>
                    )}
                  </td>
                  <td className="table-actions">
                    {editandoId === inv.id ? (
                      <button className="btn-action btn-small btn-coral" onClick={() => guardarEdicion(inv.id)} type="button">Guardar</button>
                    ) : (
                      <button 
                        className="btn-action btn-small btn-outline" 
                        onClick={() => { setEditandoId(inv.id); setEditNombre(inv.nombre); setEditPases(inv.pasesConfirmados); }}
                        type="button"
                      >
                        Editar
                      </button>
                    )}
                    <button className="btn-action btn-small btn-coral" onClick={() => compartirWhatsApp(inv)} type="button">📲 WhatsApp</button>
                    <button 
                      className="btn-action btn-small btn-outline" 
                      onClick={() => { setInvitadoActual(inv); volverAInvitacion(); }}
                      type="button"
                    >
                      Ver
                    </button>
                    <button className="btn-action btn-small btn-danger" onClick={() => eliminarInvitado(inv.id)} type="button">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const datos = BODA_DEFAULT;
  const inicio = new Date(datos.inicio);

  // Detección automática por URL: /admin, ?admin=true, ?view=admin o hash #admin
  const [esRutaAdmin, setEsRutaAdmin] = useState(() => {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname.toLowerCase();
    const q = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    return (
      path.endsWith("/admin") ||
      path.endsWith("/admin/") ||
      q.get("admin") === "true" ||
      q.get("view") === "admin" ||
      hash === "#admin"
    );
  });

  const [invitados, setInvitados] = useState(() => {
    try {
      const local = localStorage.getItem("boda_invitados_db");
      return local ? JSON.parse(local) : INVITADOS_INICIALES;
    } catch {
      return INVITADOS_INICIALES;
    }
  });

  const [invitadoActual, setInvitadoActual] = useState(invitados[0] || INVITADOS_INICIALES[0]);

  // Listener para teclado: Presiona Alt + A o Ctrl + Shift + A para probar el admin de inmediato
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.altKey && e.key.toLowerCase() === "a") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a")) {
        setEsRutaAdmin(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Cargar invitado vía URL param ?guestId=INV-XXXX o sincronizar rutas
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkRuta = () => {
      const path = window.location.pathname.toLowerCase();
      const q = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      const esAdmin = (
        path.endsWith("/admin") ||
        path.endsWith("/admin/") ||
        q.get("admin") === "true" ||
        q.get("view") === "admin" ||
        hash === "#admin"
      );
      setEsRutaAdmin(esAdmin);

      const guestIdParam = q.get("guestId");
      if (guestIdParam) {
        const hallado = invitados.find(i => i.id.toUpperCase() === guestIdParam.trim().toUpperCase());
        if (hallado) setInvitadoActual(hallado);
      }
    };

    checkRuta();
    window.addEventListener("popstate", checkRuta);
    window.addEventListener("hashchange", checkRuta);
    return () => {
      window.removeEventListener("popstate", checkRuta);
      window.removeEventListener("hashchange", checkRuta);
    };
  }, [invitados]);

  const [fase, setFase] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [cancionActual, setCancionActual] = useState(0);
  const [copiado, setCopiado] = useState(null);
  const [rsvp, setRsvp] = useState({ asistira: "si", pasesConfirmados: invitadoActual?.pasesConfirmados || 2 });

  const cuenta = useCuenta(inicio.getTime());
  const dentro = fase >= 3;

  useEffect(() => {
    if (invitadoActual) {
      setRsvp(prev => ({ ...prev, pasesConfirmados: invitadoActual.pasesConfirmados }));
    }
  }, [invitadoActual]);

  const abrirSobre = () => {
    setFase(1);
    setReproduciendo(true);
    setTimeout(() => setFase(2), 1200);
    setTimeout(() => setFase(3), 2100);
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = dentro || esRutaAdmin ? "" : "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [dentro, esRutaAdmin]);

  const hora = (min) => fmt(new Date(inicio.getTime() + min * 60000), { hour: "numeric", minute: "2-digit", hour12: true });
  const fechaLarga = fmt(inicio, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const copiarTexto = (txt, clave) => {
    navigator.clipboard.writeText(txt);
    setCopiado(clave);
    setTimeout(() => setCopiado(null), 2500);
  };

  const enviarWhatsApp = (e) => {
    e.preventDefault();
    const estado = rsvp.asistira === "si" ? "¡Sí, asistiré con mucho gusto!" : "Lamentablemente no podré asistir";
    const textoWA = `*CONFIRMACIÓN DE ASISTENCIA - BODA DANIELA & JESHUA*\n\n👤 *Invitado:* ${invitadoActual.nombre}\n✅ *Respuesta:* ${estado}\n🎟️ *Pases a utilizar:* ${rsvp.pasesConfirmados} de ${invitadoActual.pasesMax}\n\n¡Gracias por la invitación! ✨`;
    window.open(`https://api.whatsapp.com/send?phone=${datos.whatsappTel}&text=${encodeURIComponent(textoWA)}`, "_blank");
  };

  const irAInvitacion = () => {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search);
      q.delete("admin");
      q.delete("view");
      const searchStr = q.toString() ? `?${q.toString()}` : "";
      const nuevaUrl = window.location.pathname.replace(/\/admin\/?$/, "") || "/";
      window.history.pushState({}, "", nuevaUrl + searchStr);
      window.location.hash = "";
    }
    setEsRutaAdmin(false);
  };

  // Código QR real
  const urlQrReal = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(invitadoActual.id)}`;

  // Vista exclusiva si está en /admin
  if (esRutaAdmin) {
    return (
      <>
        <style>{ESTILOS_CSS}</style>
        <PanelAdmin 
          invitados={invitados} 
          setInvitados={setInvitados} 
          setInvitadoActual={setInvitadoActual}
          volverAInvitacion={irAInvitacion}
        />
      </>
    );
  }

  return (
    <div className="invitacion-root">
      <style>{ESTILOS_CSS}</style>

      {/* Fondo Global */}
      <div className="floral-bg">
        <FlorRosa className="floral-bg__item f-1" />
        <FlorGirasol className="floral-bg__item f-2" />
        <FlorMargarita className="floral-bg__item f-3" />
        <FlorOrquidea className="floral-bg__item f-4" />
        <FlorGerbera className="floral-bg__item f-5" />
      </div>
      
      <PetalosFlotantes count={28} />

      {!dentro && <SobreArtesanal fase={fase} onAbrir={abrirSobre} invitado={invitadoActual} />}

      {dentro && (
        <ReproductorMusica 
          reproduciendo={reproduciendo} 
          setReproduciendo={setReproduciendo} 
          cancionActual={cancionActual} 
          setCancionActual={setCancionActual} 
        />
      )}

      <main className={`invitacion-contenido ${dentro ? "invitacion-contenido--visible" : ""}`}>
        <header className="hero-section">
          <FlorImg n={13} className="fi-hero-wash" />
          <FlorImg n={4} className="fi-hero-l" />
          <FlorImg n={10} className="fi-hero-r" />
          <FlorRosa className="corner-decor corner-tl" />
          <FlorGerbera className="corner-decor corner-tr" />

          <div className="hero-card">
            <span className="hero-sub">Nos Casamos</span>
            <h1 className="hero-title">
              <span className="novia">{datos.novia}</span>
              <span className="ampersand">&</span>
              <span className="novio">{datos.novio}</span>
            </h1>
            <FloralDividerSVG />
            <p className="hero-fecha">{fechaLarga}</p>
            <p className="hero-ciudad">✦ {datos.ciudad} ✦</p>

            <div className="countdown-box" role="timer">
              {cuenta.map(([label, val]) => (
                <div key={label} className="countdown-item">
                  <span className="countdown-val">{String(val).padStart(2, "0")}</span>
                  <span className="countdown-lbl">{label}</span>
                </div>
              ))}
            </div>

            <a 
              className="btn-action btn-coral" 
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Daniela+y+Jeshua&dates=20270423T220000Z/20270424T060000Z&location=${encodeURIComponent(datos.ciudad)}`} 
              target="_blank" 
              rel="noreferrer"
            >
              Agendar en Google Calendar
            </a>
          </div>
        </header>

        {/* Sección Pase Digital & Código QR Real */}
        <section className="section-padding section-pase">
          <FlorImg n={16} className="fi-pase" />
          <div className="pase-card">
            <FlorRosa className="corner-decor-small top-left" />
            <FlorGerbera className="corner-decor-small top-right" />

            <div className="pase-header">
              {/* EMOJI DE FLOR ÚNICAMENTE EN LA CINTA ROSA */}
              <span className="pase-badge">🌸 Pase Digital & Acceso</span>
            </div>
            <p className="pase-pre">Tenemos el honor de invitar a:</p>
            <h3 className="pase-nombre">{invitadoActual.nombre}</h3>
            <div className="pase-divider" />
            <p className="pase-cupo">
              {invitadoActual.pasesMax === 1 ? "Reserva válida para 1 persona" : `Reserva válida para ${invitadoActual.pasesMax} personas`}
            </p>

            <div className="qr-container">
              <p className="qr-instruccion">Muestra este código QR en recepción el día del evento:</p>
              <img src={urlQrReal} alt="Código QR de Acceso" className="qr-img-real" />
              <span className="qr-code-text">CÓDIGO DE ACCESO: {invitadoActual.id}</span>
            </div>
          </div>
        </section>

        {/* Sección Música & Vinilo Giratorio */}
        <section className="section-padding section-crema">
          <FlorImg n={1} className="fi-musica" />
          <div className="container-narrow text-center">
            <img src="/3.png" alt="" aria-hidden="true" draggable="false" loading="lazy" className="flor-divisor" />
            <span className="music-note-badge">🎵 Música de Nuestra Boda</span>
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>Nuestra Canción</h2>
            <p className="section-sub">"{datos.canciones[cancionActual].titulo}" — {datos.canciones[cancionActual].artista}</p>
            <div className="music-player-card">
              <div className="player-disk-wrap">
                {/* EMOJI DE FLOR ÚNICAMENTE EN EL DISCO GIRATORIO DE VINILO */}
                <div className={`player-disk ${reproduciendo ? "player-disk--spinning" : ""}`}>
                  <span>🌸</span>
                </div>
              </div>
              <div className="player-controls">
                <button className="btn-action btn-coral" onClick={() => setReproduciendo(!reproduciendo)} type="button">
                  {reproduciendo ? "Pausar Música" : "Reproducir Canción"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerario */}
        <section className="section-padding">
          <FlorImg n={9} className="fi-itin-l" />
          <FlorImg n={12} className="fi-itin-r" />
          <div className="container-narrow">
            <h2 className="section-title text-center">Itinerario del Día</h2>
            <p className="section-sub text-center">Acompáñanos en cada momento especial</p>
            <div className="timeline">
              {datos.itinerario.map((e) => (
                <div key={e.titulo} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <span className="timeline-time">{hora(e.min)}</span>
                    <h3 className="timeline-title">{e.titulo}</h3>
                    <p className="timeline-lugar">{e.lugar}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicaciones */}
        <section className="section-padding section-crema">
          <FlorImg n={2} className="fi-ubi-l" />
          <FlorImg n={7} className="fi-ubi-r" />
          <div className="container">
            <h2 className="section-title text-center">Ubicaciones</h2>
            <p className="section-sub text-center">¿Cómo llegar a nuestros eventos?</p>
            <div className="cards-grid">
              {datos.lugares.map((l) => (
                <div key={l.nombre} className="card-lugar" onMouseMove={tilt} onMouseLeave={untilt}>
                  <FlorLavanda className="corner-decor-small top-right" />
                  <span className="card-lugar__tag">{l.nombre}</span>
                  <h3 className="card-lugar__sitio">{l.sitio}</h3>
                  <p className="card-lugar__dir">{l.dir}</p>
                  <p className="card-lugar__hora">Horario: {hora(l.min)} hrs</p>
                  <a className="btn-action btn-outline" href={l.mapa} target="_blank" rel="noreferrer">
                    Ver en Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Álbum Digital */}
        <section className="section-padding">
          <FlorImg n={6} className="fi-alb-l" />
          <FlorImg n={8} className="fi-alb-r" />
          <div className="container-narrow text-center">
            <h2 className="section-title">Captura el Momento</h2>
            <p className="section-sub">Ayúdanos a recopilar los mejores recuerdos subiendo tus fotos a nuestro álbum compartido.</p>
            <div className="card-regalo text-center" onMouseMove={tilt} onMouseLeave={untilt}>
              <FlorMargarita className="corner-decor-small top-left" />
              <div className="card-regalo__icon">☁️</div>
              <h3 className="card-regalo__titulo">Álbum Digital en Drive</h3>
              <a href={datos.driveURL} target="_blank" rel="noreferrer" className="btn-action btn-coral">Subir Fotos a Drive</a>
            </div>
          </div>
        </section>

        {/* Mesa de Regalos */}
        <section className="section-padding section-crema">
          <FlorImg n={5} className="fi-mesa-tl" />
          <FlorImg n={5} className="fi-mesa-br" />
          <div className="container-narrow">
            <h2 className="section-title text-center">Mesa de Regalos</h2>
            <div className="card-regalo text-center" onMouseMove={tilt} onMouseLeave={untilt}>
              <FlorNarciso className="corner-decor-small top-right" />
              <div className="card-regalo__icon">🎁</div>
              <h3 className="card-regalo__titulo">Mesa de Regalos & Transferencia</h3>
              <p className="card-regalo__texto"><b>Evento en Tienda:</b> {datos.regalos.tienda} (Num: {datos.regalos.mesaEvento})</p>
              <div className="datos-bancarios">
                <p><b>Banco:</b> {datos.regalos.banco}</p>
                <p><b>CLABE:</b> {datos.regalos.clabe}</p>
                <p><b>Titular:</b> {datos.regalos.titular}</p>
              </div>
              <div className="regalo-btn-group">
                <button className="btn-action btn-coral btn-small" onClick={() => copiarTexto(datos.regalos.clabe, "clabe")} type="button">
                  {copiado === "clabe" ? "✓ ¡CLABE Copiada!" : "Copiar CLABE Bancaria"}
                </button>
                <button className="btn-action btn-outline btn-small" onClick={() => copiarTexto(datos.regalos.mesaEvento, "tienda")} type="button">
                  {copiado === "tienda" ? "✓ ¡Num. Copiado!" : "Copiar N° Evento Tienda"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Vestimenta */}
        <section className="section-padding">
          <FlorImg n={15} className="fi-vest-tr" />
          <FlorImg n={15} className="fi-vest-bl" />
          <div className="container-narrow text-center">
            <h2 className="section-title">Código de Vestimenta</h2>
            <p className="vestimenta-etiqueta">{datos.vestimenta.etiqueta}</p>
            <div className="vestimenta-detalles">
              <p><b>Damas:</b> {datos.vestimenta.mujeres}</p>
              <p><b>Caballeros:</b> {datos.vestimenta.hombres}</p>
            </div>
            <div className="paleta-box">
              <FlorAmarilla className="corner-decor-small top-left" />
              <FlorRosa className="corner-decor-small bottom-right" />
              <p className="paleta-titulo">Paleta de Colores de Referencia</p>
              <div className="paleta-swatches">
                {datos.vestimenta.paleta.map((color) => (
                  <div key={color} className="swatch-wrap"><span className="swatch" style={{ backgroundColor: color }} /></div>
                ))}
              </div>
              <p className="vestimenta-nota">{datos.vestimenta.nota}</p>
            </div>
          </div>
        </section>

        {/* RSVP Formulario */}
        <section className="section-padding section-crema">
          <FlorImg n={7} className="fi-rsvp-l" />
          <FlorImg n={10} className="fi-rsvp-r" />
          <div className="container-narrow">
            <div className="rsvp-card">
              <FlorPeonia className="corner-decor-small top-right" />
              <h2 className="section-title text-center">Confirmar Asistencia</h2>
              <form onSubmit={enviarWhatsApp} className="rsvp-form">
                <div className="form-group">
                  <label className="form-label">Nombre del Invitado / Familia:</label>
                  <input type="text" className="form-input" value={invitadoActual.nombre} readOnly />
                </div>
                <div className="form-group">
                  <label className="form-label">¿Nos acompañarás?:</label>
                  <div className="radio-options">
                    <label className={`radio-btn ${rsvp.asistira === "si" ? "radio-btn--selected" : ""}`}>
                      <input 
                        type="radio" 
                        name="asistira" 
                        value="si" 
                        checked={rsvp.asistira === "si"} 
                        onChange={(e) => setRsvp({ ...rsvp, asistira: e.target.value })} 
                      /> 
                      ¡Sí, ahí estaré!
                    </label>
                    <label className={`radio-btn ${rsvp.asistira === "no" ? "radio-btn--selected" : ""}`}>
                      <input 
                        type="radio" 
                        name="asistira" 
                        value="no" 
                        checked={rsvp.asistira === "no"} 
                        onChange={(e) => setRsvp({ ...rsvp, asistira: e.target.value })} 
                      /> 
                      No podré asistir
                    </label>
                  </div>
                </div>
                {rsvp.asistira === "si" && (
                  <div className="form-group">
                    <label className="form-label">Pases a confirmar (Máximo {invitadoActual.pasesMax}):</label>
                    <select 
                      className="form-input" 
                      value={rsvp.pasesConfirmados} 
                      onChange={(e) => setRsvp({ ...rsvp, pasesConfirmados: Number(e.target.value) })}
                    >
                      {Array.from({ length: invitadoActual.pasesMax }, (_, idx) => (
                        <option key={idx + 1} value={idx + 1}>{idx + 1} {idx + 1 === 1 ? "Pase" : "Pases"}</option>
                      ))}
                    </select>
                  </div>
                )}
                <button type="submit" className="btn-action btn-coral btn-block">Enviar Confirmación por WhatsApp</button>
              </form>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <FlorImg n={14} className="fi-footer" />
          <FlorRosa className="corner-decor corner-bl" />
          <FlorGirasol className="corner-decor corner-br" />
          <blockquote className="footer-quote">"{datos.frase.texto}"<cite>— {datos.frase.autor}</cite></blockquote>
          <div className="footer-signature">
            <span>{datos.novia}</span><span className="ampersand-small">&</span><span>{datos.novio}</span>
          </div>
          <p className="footer-copy">#DanielaYJeshua2027</p>
        </footer>
      </main>
    </div>
  );
}

const ESTILOS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Jost:wght@300;400;500;600&display=swap');

:root {
  --rosa-pastel: #F2BACC;
  --amarillo-pastel: #FBE47E;
  --naranja-coral: #F2A04E;
  --azul-pastel: #B4C5D2;
  --verde-menta: #94B488;
  --rojo-amapola: #D96A70;
  
  --fondo-crema: #FAF7F2;
  --blanco-puro: #FFFFFF;
  --texto-oscuro: #5C3D38; 
  --texto-suave: #8C6D68;
  --sombra-suave: rgba(217, 106, 112, 0.12);
  --sombra-fuerte: rgba(92, 61, 56, 0.18);
  
  --textura-papel: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
}

.invitacion-root { 
  font-family: 'Jost', sans-serif; 
  background-color: var(--fondo-crema); 
  color: var(--texto-oscuro); 
  min-height: 100vh; 
  overflow-x: hidden; 
  position: relative; 
}

/* Panel Admin Styles */
.admin-wrapper { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; background: #FFFFFF; min-height: 100vh; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid var(--rosa-pastel); padding-bottom: 1rem; flex-wrap: wrap; gap: 1rem; }
.text-suave { color: var(--texto-suave); margin: 0.2rem 0 0; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
.stat-card { background: var(--fondo-crema); border: 1px solid var(--rosa-pastel); border-radius: 16px; padding: 1.2rem; text-align: center; display: flex; flex-direction: column; }
.stat-val { font-family: 'Bodoni Moda', serif; font-size: 2rem; font-weight: 600; color: var(--texto-oscuro); }
.stat-lbl { font-size: 0.8rem; color: var(--texto-suave); text-transform: uppercase; margin-top: 0.3rem; }

.admin-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media(min-width: 768px) { .admin-grid { grid-template-columns: 1fr 1fr; } }
.admin-card { background: var(--fondo-crema); padding: 1.8rem; border-radius: 20px; border: 1.5px solid var(--rosa-pastel); position: relative; }
.admin-form { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }

.admin-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.admin-table th, .admin-table td { padding: 0.8rem; text-align: left; border-bottom: 1px solid rgba(0,0,0,0.08); font-size: 0.85rem; }
.table-responsive { overflow-x: auto; }
.table-actions { display: flex; gap: 0.4rem; flex-wrap: wrap; }

.badge { padding: 0.25rem 0.6rem; border-radius: 12px; font-size: 0.72rem; font-weight: 600; display: inline-block; }
.badge-verde { background: #D4EDDA; color: #155724; }
.badge-rojo { background: #F8D7DA; color: #721C24; }

.alerta-box { margin-top: 1rem; padding: 1rem; border-radius: 14px; font-size: 0.9rem; }
.alerta-exito { background: #D4EDDA; color: #155724; border: 1.5px solid #C3E6CB; }
.alerta-alerta { background: #FFF3CD; color: #856404; border: 2px solid #FFEEBA; animation: sacudir 0.3s ease; }
.alerta-error { background: #F8D7DA; color: #721C24; border: 1.5px solid #F5C6CB; }
@keyframes sacudir { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

/* Fondo Global */
.floral-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; opacity: 0.75; }
.floral-bg__item { position: absolute; width: 140px; height: 180px; opacity: 0.35; filter: blur(1px); }
.f-1 { top: -5%; left: -2%; transform: rotate(25deg); }
.f-2 { bottom: -5%; right: -2%; transform: rotate(-25deg); }
.f-3 { top: 35%; left: -4%; transform: rotate(90deg); }
.f-4 { top: 10%; right: -3%; transform: rotate(15deg); }
.f-5 { bottom: 20%; left: 5%; transform: rotate(-70deg); }

.petalos-container { position: fixed; inset: 0; pointer-events: none; z-index: 8; overflow: hidden; }
.petalo { position: absolute; top: -10%; left: var(--x); width: var(--size); height: var(--size); background-color: var(--color); opacity: 0.75; border-radius: 80% 0 80% 0; transform: rotate(var(--rot)); animation: caerPetalo var(--time) var(--delay) linear infinite; }
.petalo--shape-1 { border-radius: 50% 50% 50% 0; }
.petalo--shape-2 { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
@keyframes caerPetalo { 0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.8; } 50% { transform: translateY(50vh) rotate(180deg) translateX(var(--dx)); opacity: 0.9; } 100% { transform: translateY(110vh) rotate(360deg) translateX(calc(var(--dx) * -1)); opacity: 0; } }

/* ── GUIRNALDA ENVOLVENTE CON SVGS ── */
.guirnalda-abrazo-svg {
  position: absolute;
  width: min(130vw, 680px);
  height: min(90vh, 480px);
  pointer-events: none;
  z-index: 1;
}

.fl-svg {
  position: absolute;
  width: min(25vw, 130px);
  height: min(35vw, 180px);
  filter: drop-shadow(0 6px 10px rgba(0,0,0,0.08));
}

.pos-tl-1 { top: -40px; left: -30px; transform: rotate(-15deg); }
.pos-tl-2 { top: -60px; left: 60px; transform: rotate(20deg); }
.pos-tl-3 { top: 20px; left: -50px; transform: rotate(-45deg); }

.pos-tr-1 { top: -40px; right: -30px; transform: rotate(15deg); }
.pos-tr-2 { top: -60px; right: 60px; transform: rotate(-20deg); }
.pos-tr-3 { top: 20px; right: -50px; transform: rotate(45deg); }

.pos-ml-1 { top: 35%; left: -60px; transform: rotate(-25deg); }
.pos-ml-2 { top: 50%; left: -45px; transform: rotate(10deg); }
.pos-mr-1 { top: 35%; right: -60px; transform: rotate(25deg); }
.pos-mr-2 { top: 50%; right: -45px; transform: rotate(-10deg); }

.pos-bl-1 { bottom: -40px; left: -30px; transform: rotate(-120deg); }
.pos-bl-2 { bottom: -60px; left: 70px; transform: rotate(-80deg); }
.pos-bl-3 { bottom: 30px; left: -50px; transform: rotate(-150deg); }

.pos-br-1 { bottom: -40px; right: -30px; transform: rotate(120deg); }
.pos-br-2 { bottom: -60px; right: 70px; transform: rotate(80deg); }
.pos-br-3 { bottom: 30px; right: -50px; transform: rotate(150deg); }

/* ── SOBRE CON IMÁGENES (cerrado / abierto) ── */
.sobre-wrapper { position: fixed; inset: 0; z-index: 100; background-color: transparent; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; transition: opacity 0.8s ease, visibility 0.8s; }
.sobre-wrapper--desaparecer { opacity: 0; visibility: hidden; pointer-events: none; }

.sobre-real {
  --img-cerrado: url('/sobre-cerrado.png');
  --img-abierto: url('/sobre-abierto.png');
  position: relative;
  width: min(90vw, 450px, 66vh);
  aspect-ratio: 734 / 517;           /* proporción del sobre cerrado */
  perspective: 1400px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  z-index: 2;
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}
/* Al abrir, la solapa sube y se sale del área: bajamos el sobre para que todo quede centrado */
.sobre-real--abierto { transform: translateY(38%); }

@keyframes latidoSobre {
  0%, 100% { transform: scale(1); }
  10% { transform: scale(1.02); }
  20% { transform: scale(1); }
  30% { transform: scale(1.02); }
  60% { transform: scale(1); }
}
.sobre-real--invitando { animation: latidoSobre 2.5s ease-in-out infinite; }

/* sombra suave debajo del sobre */
.sobre-real::before {
  content: ""; position: absolute; inset: 10% 3% -4%;
  background: rgba(92, 61, 56, 0.35); filter: blur(22px); border-radius: 50%;
  z-index: 0; pointer-events: none;
}

/* 1. FONDO: sobre abierto (forro floral + cuerpo). Se ve la mitad inferior de la imagen */
.sobre-real__cuerpo {
  position: absolute; inset: 0; z-index: 1;
  background: var(--img-abierto) center bottom / 100% 177.6% no-repeat;
  opacity: 0; transition: opacity 0.1s linear;
}
.sobre-real--abierto .sobre-real__cuerpo { opacity: 1; }

/* 2. CARTA INTERNA: queda siempre en z-index 2, por detrás del bolsillo frontal (z-index 10) */
.carta-interna {
  position: absolute;
  left: 6%; top: 7.5%;
  width: 88%; height: 85%;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border: 1px solid var(--rosa-pastel);
  border-radius: 8px;
  padding: 1rem 0.8rem;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  display: flex; align-items: center; justify-content: center; text-align: center;
  transform: translateY(0);
  transition: transform 1s 0.8s cubic-bezier(0.34, 1.25, 0.64, 1);   /* sube cuando la solapa ya terminó de abrir */
}
.sobre-real--abierto .carta-interna { transform: translateY(-73.5%); z-index: 2; }

.carta-interna__contenido { display: flex; flex-direction: column; gap: 0.3rem; }
.carta-interna__tag { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: var(--rojo-amapola); }
.carta-interna__nombres { font-family: 'Bodoni Moda', serif; font-size: 1.6rem; color: var(--texto-oscuro); margin: 0; }
.carta-interna__invitado { font-size: 0.85rem; color: var(--texto-oscuro); margin: 0.3rem 0; }
.carta-interna__fecha { font-size: 0.85rem; color: var(--texto-suave); margin: 0; }
.carta-interna__lugar { font-size: 0.75rem; color: var(--verde-menta); font-weight: 500; }

/* 3. BOLSILLO FRONTAL (sobre abierto): solo la parte de adelante, para que la carta salga por detrás */
.sobre-real__bolsillo-frontal {
  position: absolute; inset: 0; z-index: 10; pointer-events: none;
  background: var(--img-abierto) center bottom / 100% 177.6% no-repeat;
  clip-path: polygon(0 0, 36.2% 43.9%, 63.8% 43.9%, 100% 0, 100% 100%, 0 100%);
  opacity: 0; transition: opacity 0.1s linear;
}
.sobre-real--abierto .sobre-real__bolsillo-frontal { opacity: 1; }

/* 4. SOBRE CERRADO (sin solapa ni sello). Se desvanece cuando la solapa ya va a medio camino */
.sobre-real__cerrado {
  position: absolute; inset: 0; z-index: 11; pointer-events: none;
  background: var(--img-cerrado) center / 100% 100% no-repeat;
  clip-path: polygon(0 6.5%, 50% 69%, 100% 6.1%, 100% 100%, 0 100%);
  transition: opacity 0.3s ease 0.35s;
}
.sobre-real--abierto .sobre-real__cerrado { opacity: 0; }

/* 5. SOLAPA 3D: gira sobre su borde superior; por fuera se ve el sobre cerrado + sello, por dentro el forro */
.sobre-real__solapa-sup {
  position: absolute; inset: 0; z-index: 12; pointer-events: none;
  transform-origin: top center;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.75s;
}
.sobre-real--abierto .sobre-real__solapa-sup { transform: rotateX(180deg); z-index: 1; }

.solapa-cara { position: absolute; left: 0; width: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.solapa-cara--frente { top: 0; height: 100%; }
.solapa-cara__papel {
  position: absolute; inset: 0;
  background: var(--img-cerrado) center / 100% 100% no-repeat;
  clip-path: polygon(0 0, 100% 0, 100% 6.6%, 50% 70%, 0 7%);
}
.sello-lacre-img {
  position: absolute; left: 38%; top: 42%; width: 22.6%; height: auto;
  filter: drop-shadow(0 4px 6px rgba(92, 61, 56, 0.35));
  pointer-events: none; user-select: none;
}
/* cara interior de la solapa: parte superior de la imagen del sobre abierto (el forro) */
.solapa-cara--dorso {
  top: 0; height: 77.6%;
  background: var(--img-abierto) center top / 100% 228.8% no-repeat;
  transform: rotateX(180deg);
}

.instruccion-abrir { margin-top: 2rem; font-size: 0.95rem; color: var(--texto-suave); font-weight: 500; animation: pulso 2s infinite; z-index: 1; }
@keyframes pulso { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

.audio-float-control { position: fixed; bottom: 24px; right: 24px; z-index: 90; display: flex; align-items: center; gap: 0.6rem; }
.btn-audio-float { width: 50px; height: 50px; border-radius: 50%; background: var(--rojo-amapola); color: #FFFFFF; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(217, 106, 112, 0.4); position: relative; transition: transform 0.2s ease, background-color 0.2s ease; }
.btn-audio-float:hover { transform: scale(1.08); }
.btn-audio-float--active { background: var(--naranja-coral); }
.btn-audio-float .pulse-wave { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid var(--rojo-amapola); animation: wavePulse 2s infinite; opacity: 0; }
.btn-audio-float--active .pulse-wave { opacity: 1; }
@keyframes wavePulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.4); opacity: 0; } }

.btn-playlist-toggle { background: var(--blanco-puro); color: var(--texto-oscuro); border: 1px solid var(--rosa-pastel); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.06); transition: all 0.2s ease; }
.btn-playlist-toggle:hover { background: var(--rosa-pastel); }
.playlist-modal { position: fixed; inset: 0; z-index: 100; background: rgba(92, 61, 56, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.playlist-card { width: min(92vw, 480px); background: var(--blanco-puro); border-radius: 20px; padding: 1.8rem; box-shadow: 0 15px 35px rgba(0,0,0,0.15); border: 1.5px solid var(--rosa-pastel); }
.playlist-header { display: flex; justify-content: space-between; align-items: center; }
.playlist-header h3 { font-family: 'Bodoni Moda', serif; font-size: 1.3rem; margin: 0; color: var(--texto-oscuro); }
.btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--texto-suave); }
.playlist-items { display: flex; flex-direction: column; gap: 0.6rem; max-height: 320px; overflow-y: auto; }
.playlist-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.75rem; border-radius: 12px; background: var(--fondo-crema); cursor: pointer; transition: background-color 0.2s; }
.playlist-item:hover, .playlist-item--playing { background: rgba(242, 186, 204, 0.4); }
.song-icon { width: 32px; height: 32px; border-radius: 50%; background: var(--rojo-amapola); color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; }
.song-info { flex: 1; }
.song-title { font-size: 0.9rem; font-weight: 600; margin: 0; color: var(--texto-oscuro); }
.song-artist { font-size: 0.78rem; color: var(--texto-suave); margin: 0; }

.music-note-badge { background: var(--amarillo-pastel); color: var(--texto-oscuro); font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 12px; font-weight: 500; }
.music-player-card { margin-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1.2rem; position: relative; z-index: 2; }
.player-disk-wrap { position: relative; }

/* VINILO CON EMOJI ÚNICAMENTE AQUÍ */
.player-disk { width: 110px; height: 110px; border-radius: 50%; background: radial-gradient(circle, #333 30%, #111 70%); border: 4px solid var(--rosa-pastel); display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,0,0,0.15); font-size: 2.2rem; position: relative; z-index: 2; }
.player-disk--spinning { animation: spinDisk 6s linear infinite; }
@keyframes spinDisk { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.invitacion-contenido { opacity: 0; transition: opacity 1s ease; position: relative; z-index: 1;}
.invitacion-contenido--visible { opacity: 1; }
.barra-progreso { position: fixed; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--rosa-pastel), var(--amarillo-pastel), var(--naranja-coral), var(--rojo-amapola)); transform-origin: left; transform: scaleX(var(--p, 0)); z-index: 99; }

.hero-section { position: relative; overflow: hidden; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 3rem 1.5rem; background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9), transparent); }
.corner-decor { position: absolute; width: 150px; height: 150px; pointer-events: none; opacity: 0.85; z-index: 0; }
.corner-tl { top: 15px; left: 15px; } .corner-tr { top: 15px; right: 15px; transform: scaleX(-1); } .corner-bl { bottom: 15px; left: 15px; transform: scaleY(-1); } .corner-br { bottom: 15px; right: 15px; transform: scale(-1); }
.corner-decor-small { position: absolute; width: 85px; height: 85px; pointer-events: none; opacity: 0.75; z-index: 0; }
.corner-decor-small.top-left { top: -10px; left: -10px; } .corner-decor-small.top-right { top: -10px; right: -10px; transform: scaleX(-1); } .corner-decor-small.bottom-left { bottom: -10px; left: -10px; transform: scaleY(-1); } .corner-decor-small.bottom-right { bottom: -10px; right: -10px; transform: scale(-1); }

.hero-card { position: relative; z-index: 2; width: min(90vw, 580px); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); border: 1.5px solid var(--rosa-pastel); border-radius: 120px 120px 24px 24px; padding: 4.5rem 2rem 3rem; text-align: center; box-shadow: 0 20px 40px var(--sombra-suave); }
.hero-sub { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 3px; color: var(--rojo-amapola); font-weight: 500; }
.hero-title { font-family: 'Bodoni Moda', serif; font-size: clamp(2.8rem, 8vw, 4.8rem); margin: 0.8rem 0; line-height: 1.1; display: flex; flex-direction: column; align-items: center; }
.hero-title .novia, .hero-title .novio { color: var(--texto-oscuro); }
.hero-title .ampersand { font-style: italic; font-size: 0.5em; color: var(--naranja-coral); margin: -0.2em 0; }
.floral-divider { width: 160px; height: 24px; margin: 1.5rem auto; }
.hero-fecha { font-size: 1.25rem; color: var(--texto-oscuro); text-transform: capitalize; margin: 0.5rem 0 0.2rem; }
.hero-ciudad { font-size: 0.95rem; color: var(--verde-menta); font-weight: 500; letter-spacing: 1px; }

.countdown-box { display: flex; justify-content: center; gap: 1rem; margin: 2rem 0 1.8rem; }
.countdown-item { display: flex; flex-direction: column; align-items: center; min-width: 55px; padding: 0.6rem 0.4rem; background: var(--fondo-crema); border-radius: 12px; border: 1px solid var(--rosa-pastel); }
.countdown-val { font-family: 'Bodoni Moda', serif; font-size: 1.6rem; font-weight: 600; color: var(--rojo-amapola); }
.countdown-lbl { font-size: 0.7rem; text-transform: uppercase; color: var(--texto-suave); letter-spacing: 1px; }

.section-padding { padding: 5rem 1.5rem; position: relative; z-index: 2; overflow: hidden; }
.section-pase { padding-top: 8.5rem; }
.section-crema { background-color: rgba(242, 186, 204, 0.15); }
.container { max-width: 960px; margin: 0 auto; position: relative; z-index: 2; }
.container-narrow { max-width: 680px; margin: 0 auto; position: relative; z-index: 2; }
.text-center { text-align: center; }
.section-title { font-family: 'Bodoni Moda', serif; font-size: clamp(2rem, 5vw, 2.8rem); color: var(--texto-oscuro); margin: 0 0 0.5rem; position: relative; z-index: 2; }
.section-sub { color: var(--texto-suave); font-size: 1.05rem; margin-bottom: 2.5rem; position: relative; z-index: 2; }

/* PASE DIGITAL CON EMOJI ÚNICAMENTE EN CINTA ROSA */
.pase-card { max-width: 500px; margin: 0 auto; background: #FFFFFF; border: 2px solid var(--amarillo-pastel); border-radius: 20px; padding: 2.5rem 2rem; text-align: center; position: relative; box-shadow: 0 10px 30px var(--sombra-suave); overflow: hidden; }
.pase-card::before { content: ""; position: absolute; inset: 8px; border: 1px dashed var(--naranja-coral); border-radius: 14px; pointer-events: none; z-index: 1;}
.pase-badge { background: var(--rosa-pastel); color: var(--texto-oscuro); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; padding: 0.4rem 1.2rem; border-radius: 12px; font-weight: 600; position: relative; z-index: 2;}
.pase-pre { color: var(--texto-suave); margin-top: 1.2rem; font-size: 0.95rem; position: relative; z-index: 2;}
.pase-nombre { font-family: 'Bodoni Moda', serif; font-size: clamp(1.8rem, 5vw, 2.5rem); color: var(--rojo-amapola); margin: 0.4rem 0; position: relative; z-index: 2;}
.pase-divider { width: 50px; height: 2px; background: var(--rosa-pastel); margin: 1rem auto; position: relative; z-index: 2;}
.pase-cupo { font-size: 0.95rem; color: var(--verde-menta); font-weight: 500; position: relative; z-index: 2;}

.qr-container { margin-top: 1.8rem; padding-top: 1.5rem; border-top: 1px dashed rgba(180, 197, 210, 0.6); display: flex; flex-direction: column; align-items: center; gap: 0.6rem; position: relative; z-index: 2;}
.qr-instruccion { font-size: 0.85rem; color: var(--texto-suave); margin-bottom: 0.2rem; }
.qr-img-real { width: 180px; height: 180px; border-radius: 12px; border: 2px solid var(--rosa-pastel); padding: 0.4rem; background: #FFFFFF; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
.qr-code-text { font-size: 0.75rem; letter-spacing: 1.5px; color: var(--texto-suave); font-weight: 600; }

.timeline { position: relative; padding: 1.5rem 0; max-width: 550px; margin: 2rem auto 0; z-index: 2; }
.timeline::before { content: ""; position: absolute; left: 18px; top: 0; bottom: 0; width: 2px; background: var(--rosa-pastel); }
.timeline-item { position: relative; padding-left: 50px; margin-bottom: 2rem; }
.timeline-dot { position: absolute; left: 10px; top: 4px; width: 18px; height: 18px; border-radius: 50%; background: var(--rojo-amapola); border: 3px solid #FFFFFF; box-shadow: 0 0 0 2px var(--rosa-pastel); }
.timeline-card { background: #FFFFFF; padding: 1.2rem 1.5rem; border-radius: 14px; border: 1px solid rgba(180, 197, 210, 0.4); box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
.timeline-time { font-size: 0.85rem; font-weight: 600; color: var(--naranja-coral); }
.timeline-title { font-family: 'Bodoni Moda', serif; font-size: 1.25rem; color: var(--texto-oscuro); margin: 0.2rem 0; }
.timeline-lugar { font-size: 0.9rem; color: var(--texto-suave); margin: 0; }

.cards-grid { display: grid; grid-template-columns: 1fr; gap: 1.8rem; margin-top: 2rem; position: relative; z-index: 2; }
@media(min-width: 640px) { .cards-grid { grid-template-columns: 1fr 1fr; } }
.card-lugar, .card-regalo { background: #FFFFFF; border-radius: 20px; padding: 2.2rem 1.8rem; border: 1.5px solid var(--rosa-pastel); box-shadow: 0 8px 24px var(--sombra-suave); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
.card-lugar:hover, .card-regalo:hover { box-shadow: 0 12px 32px rgba(217, 106, 112, 0.2); }
.card-lugar__tag { background: var(--azul-pastel); color: var(--texto-oscuro); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; padding: 0.3rem 0.8rem; border-radius: 10px; font-weight: 500; align-self: center; position: relative; z-index: 2; }
.card-regalo__icon { font-size: 2.5rem; margin-bottom: 0.5rem; position: relative; z-index: 2; }
.card-lugar__sitio, .card-regalo__titulo { font-family: 'Bodoni Moda', serif; font-size: 1.5rem; color: var(--texto-oscuro); margin: 0.8rem 0 0.4rem; position: relative; z-index: 2; }
.card-lugar__dir, .card-regalo__texto { font-size: 0.95rem; color: var(--texto-suave); margin-bottom: 0.8rem; line-height: 1.5; position: relative; z-index: 2; }
.card-lugar__hora { font-size: 0.85rem; color: var(--verde-menta); font-weight: 600; margin-bottom: 1.2rem; position: relative; z-index: 2; }

.datos-bancarios { background: var(--fondo-crema); padding: 1rem; border-radius: 12px; font-size: 0.85rem; text-align: left; margin: 1rem 0; line-height: 1.6; border: 1px dashed var(--rosa-pastel); position: relative; z-index: 2; }
.regalo-btn-group { display: flex; flex-direction: column; gap: 0.5rem; position: relative; z-index: 2; }

.vestimenta-etiqueta { font-family: 'Bodoni Moda', serif; font-size: 1.6rem; color: var(--rojo-amapola); margin-bottom: 1.2rem; position: relative; z-index: 2; }
.vestimenta-detalles p { font-size: 1.05rem; margin: 0.4rem 0; position: relative; z-index: 2; }
.paleta-box { margin-top: 2.5rem; background: #FFFFFF; padding: 2rem; border-radius: 20px; border: 1px solid var(--rosa-pastel); position: relative; overflow: hidden; z-index: 2; }
.paleta-titulo { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--texto-suave); margin-bottom: 1.2rem; position: relative; z-index: 2; }
.paleta-swatches { display: flex; justify-content: center; gap: 0.8rem; flex-wrap: wrap; margin-bottom: 1rem; position: relative; z-index: 2; }
.swatch-wrap { display: flex; flex-direction: column; align-items: center; }
.swatch { width: 44px; height: 44px; border-radius: 50%; border: 3px solid #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
.swatch:hover { transform: scale(1.15) translateY(-4px); }
.vestimenta-nota { font-size: 0.85rem; color: var(--rojo-amapola); font-style: italic; margin-top: 1rem; position: relative; z-index: 2; }

.rsvp-card { background: #FFFFFF; border-radius: 24px; padding: 2.5rem 2rem; border: 2px solid var(--rosa-pastel); box-shadow: 0 12px 32px var(--sombra-suave); position: relative; overflow: hidden; z-index: 2; }
.rsvp-form { display: flex; flex-direction: column; gap: 1.4rem; position: relative; z-index: 2; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; text-align: left; }
.form-label { font-size: 0.9rem; font-weight: 600; color: var(--texto-oscuro); }
.form-input { padding: 0.8rem 1rem; border-radius: 12px; border: 1.5px solid rgba(180, 197, 210, 0.6); font-family: inherit; font-size: 0.95rem; color: var(--texto-oscuro); background: var(--fondo-crema); transition: border-color 0.2s; }
.form-input-sm { padding: 0.4rem 0.6rem; font-size: 0.85rem; }
.form-input:focus { outline: none; border-color: var(--rojo-amapola); }
.radio-options { display: flex; gap: 1rem; flex-wrap: wrap; }
.radio-btn { flex: 1; min-width: 140px; padding: 0.8rem; border-radius: 12px; border: 1.5px solid rgba(180, 197, 210, 0.6); background: var(--fondo-crema); display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
.radio-btn--selected { border-color: var(--rojo-amapola); background: rgba(242, 186, 204, 0.3); font-weight: 500; }

.btn-action { position: relative; z-index: 2; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.8rem 1.6rem; border-radius: 30px; font-size: 0.95rem; font-weight: 500; text-decoration: none; transition: all 0.3s ease; cursor: pointer; border: none; }
.btn-coral { background: var(--rojo-amapola); color: #FFFFFF; box-shadow: 0 4px 14px rgba(217, 106, 112, 0.3); }
.btn-coral:hover { background: #C5585E; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(217, 106, 112, 0.4); }
.btn-outline { background: transparent; color: var(--texto-oscuro); border: 1.5px solid var(--rojo-amapola); }
.btn-outline:hover { background: var(--rojo-amapola); color: #FFFFFF; transform: translateY(-2px); }
.btn-danger { background: #DC3545; color: #FFFFFF; }
.btn-small { padding: 0.4rem 0.8rem; font-size: 0.8rem; }
.btn-block { width: 100%; }

.footer-section { position: relative; padding: 6rem 1.5rem 14rem; background: #FFFFFF; text-align: center; overflow: hidden; z-index: 2;}
.footer-quote { font-family: 'Bodoni Moda', serif; font-size: clamp(1.3rem, 4vw, 1.8rem); color: var(--texto-oscuro); max-width: 600px; margin: 0 auto 2.5rem; font-style: italic; line-height: 1.4; position: relative; z-index: 2; }
.footer-quote cite { display: block; font-family: 'Jost', sans-serif; font-size: 0.9rem; font-style: normal; color: var(--naranja-coral); margin-top: 0.8rem; }
.footer-signature { font-family: 'Bodoni Moda', serif; font-size: clamp(2.2rem, 6vw, 3.5rem); color: var(--rojo-amapola); display: flex; align-items: center; justify-content: center; gap: 0.8rem; position: relative; z-index: 2; }
.ampersand-small { font-size: 0.6em; color: var(--naranja-coral); font-style: italic; }
.footer-copy { margin-top: 2rem; font-size: 0.85rem; color: var(--texto-suave); letter-spacing: 2px; position: relative; z-index: 2; }

/* ── FLORES PNG ── */
.flor-img { position: absolute; z-index: 0; max-width: none; height: auto; pointer-events: none; user-select: none; mix-blend-mode: multiply; }
.flor-divisor { display: block; width: min(86vw, 520px); aspect-ratio: 3 / 1; object-fit: cover; object-position: center 50%; margin: -1rem auto 1rem; pointer-events: none; user-select: none; mix-blend-mode: multiply; }

.fi-hero-wash { top: 0; left: 50%; width: min(120vw, 820px); transform: translateX(-50%); }
.fi-hero-l { left: -2vw; bottom: 0; width: min(24vw, 210px); }
.fi-hero-r { right: -2vw; bottom: 0; width: min(24vw, 210px); transform: scaleX(-1); }

.fi-pase { top: 1rem; left: 50%; width: min(70vw, 340px); transform: translateX(-50%); }
.fi-musica { left: -70px; bottom: -70px; width: min(40vw, 230px); }

.fi-itin-l { left: -4vw; top: 50%; height: min(100%, 760px); width: auto; transform: translateY(-50%); }
.fi-itin-r { right: 0; top: 50%; height: min(78%, 640px); width: auto; transform: translateY(-50%); }

.fi-ubi-l { left: -2vw; top: 0; width: min(26vw, 190px); }
.fi-ubi-r { right: 0; top: 0; width: min(30vw, 250px); transform: scaleX(-1); }

.fi-alb-l { left: 0; top: 0; width: min(22vw, 160px); }
.fi-alb-r { right: -1vw; bottom: 0; width: min(18vw, 130px); }

.fi-mesa-tl { left: 0; top: 0; width: min(32vw, 250px); }
.fi-mesa-br { right: 0; bottom: 0; width: min(32vw, 250px); transform: rotate(180deg); }

.fi-vest-tr { right: 0; top: 0; width: min(36vw, 300px); }
.fi-vest-bl { left: 0; bottom: 0; width: min(36vw, 300px); transform: rotate(180deg); }

.fi-rsvp-l { left: 0; top: 0; width: min(30vw, 240px); }
.fi-rsvp-r { right: 0; bottom: 0; width: min(22vw, 170px); transform: scaleX(-1); }

.fi-footer { left: 50%; bottom: 0; width: min(100%, 520px); transform: translateX(-50%); }

/* En pantallas chicas las flores se aclaran para no estorbar la lectura */
@media (max-width: 640px) {
  .flor-img { opacity: 0.55; }
  .fi-hero-wash, .fi-pase, .fi-footer { opacity: 0.9; }
}
`;