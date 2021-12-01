import React from "react";
import { MovieDetailsProps } from "../models/props.interface";
import YoutubeEmbed from "./youtube-embed";

const MovieDetails = ({
  movie,
  onClose,
}: MovieDetailsProps): React.ReactElement => {
  const handleOpenInTab = (url: string | undefined) => {
    if (!url) return;
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="movie-details">
      <div className="header">
        <h3 className="name">{movie.name}</h3>
        <button className="close" onClick={onClose}>
          Cerrar
        </button>
      </div>
      <div className="content">
        <div className="sidebar">
          <img className="poster" src={movie.poster} />
          <div className="sessions">
            {movie.sessions.map((session) => {
              return (
                <button
                  key={session.time}
                  className="session"
                  onClick={() => handleOpenInTab(session.url)}
                >
                  Sala {session.room} | {session.time}
                </button>
              );
            })}
          </div>
        </div>
        <div className="details">
          {movie.synopsis && (
            <div className="detail">
              <h5>Sinopsis</h5>
              <span>{movie.synopsis}</span>
            </div>
          )}
          {movie.director && (
            <div className="detail">
              <h5>Director</h5>
              <span>{movie.director}</span>
            </div>
          )}
          {movie.actors && (
            <div className="detail">
              <h5>Actores</h5>
              <span>{movie.actors.join(", ")}</span>
            </div>
          )}
          {movie.genres && (
            <div className="detail">
              <h5>Generos</h5>
              <span>{movie.genres.join(", ")}</span>
            </div>
          )}
          {movie.duration && (
            <div className="detail">
              <h5>Duración</h5>
              <span>{movie.duration} min.</span>
            </div>
          )}
          {movie.trailer && (
            <div className="detail">
              <h5>Trailer</h5>
              <YoutubeEmbed url={movie.trailer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
