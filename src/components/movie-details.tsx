import React, { useCallback, useEffect } from "react";
import { Session } from "../models/cinema.interface";
import { MovieDetailsProps } from "../models/props.interface";
import YoutubeEmbed from "./youtube-embed";

const MovieDetails = ({
  movie,
  onClose,
}: MovieDetailsProps): React.ReactElement => {
  useEffect(() => {
    document.addEventListener("keyup", exit, false);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keyup", exit, false);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOpenInTab = (url: string | undefined) => {
    if (!url) return;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const exit = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, []);

  const formatSession = (session: Session): string => {
    const text = `Sala ${session.room} | ${session.time}`;
    return session.type ? `[${session.type}] ${text}` : text;
  };

  return (
    <div className="movie-details">
      <div className="header">
        <h3 className="h3 name">{movie.name}</h3>
        <div className="buttons">
          <button
            className="button"
            onClick={() => handleOpenInTab(movie.source)}
          >
            Página web
          </button>
          <button className="button danger" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
      <div className="content">
        <div className="sidebar">
          <img className="poster" src={movie.poster} />
          <div className="sessions">
            <h5 className="heading">Compra de entradas</h5>
            {movie.sessions.map((session) => {
              return (
                <button
                  key={session.time}
                  className="button session"
                  onClick={() => handleOpenInTab(session.url)}
                >
                  {formatSession(session)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="details">
          {movie.synopsis && (
            <div className="detail">
              <h5 className="heading">Sinopsis</h5>
              <span>{movie.synopsis}</span>
            </div>
          )}
          {movie.director && (
            <div className="detail">
              <h5 className="heading">Director</h5>
              <span>{movie.director}</span>
            </div>
          )}
          {movie.actors && (
            <div className="detail">
              <h5 className="heading">Intérpretes</h5>
              <span>{movie.actors.join(", ")}</span>
            </div>
          )}
          {movie.genres && (
            <div className="detail">
              <h5 className="heading">Género</h5>
              <span>{movie.genres.join(", ")}</span>
            </div>
          )}
          {movie.duration && (
            <div className="detail">
              <h5 className="heading">Duración</h5>
              <span>
                {movie.durationReadable} / {movie.duration} min.
              </span>
            </div>
          )}
          {movie.trailer && (
            <div className="detail">
              <YoutubeEmbed url={movie.trailer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
