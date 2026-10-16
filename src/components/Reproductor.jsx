import React, { useState } from "react";
import { BODA } from "../config";

export default function ReproductorMusica({ reproduciendo, setReproduciendo, cancionActual, setCancionActual }) {
  const [desplegado, setDesplegado] = useState(false);
  const song = BODA.canciones[cancionActual];

  const toggleAudio = () => setReproduciendo(!reproduciendo);
  const cambiarCancion = (idx) => { setCancionActual(idx); setReproduciendo(true); };

  return (
    <>
      <div style={{ display: "none" }}>
        {reproduciendo && (
          <iframe width="100" height="100" src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&enablejsapi=1`} title="Música" allow="autoplay" />
        )}
      </div>

      <div className="audio-float-control">
        <button className={`btn-audio-float ${reproduciendo ? "btn-audio-float--active" : ""}`} onClick={toggleAudio}>
          {reproduciendo ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5" /><rect x="14" y="4" width="4" height="16" rx="1.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
          <span className="pulse-wave" />
        </button>
        <button className="btn-playlist-toggle" onClick={() => setDesplegado(!desplegado)}>🎵 Playlist</button>
      </div>

      {desplegado && (
        <div className="playlist-modal" onClick={() => setDesplegado(false)}>
          <div className="playlist-card" onClick={(e) => e.stopPropagation()}>
            <div className="playlist-header">
              <h3>🎶 Lista de Reproducción</h3>
              <button className="btn-close" onClick={() => setDesplegado(false)}>✕</button>
            </div>
            <div className="playlist-items">
              {BODA.canciones.map((s, idx) => (
                <div key={s.id} className={`playlist-item ${cancionActual === idx && reproduciendo ? "playlist-item--playing" : ""}`} onClick={() => cambiarCancion(idx)}>
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
