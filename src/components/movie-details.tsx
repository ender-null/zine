import React, { useCallback, useEffect } from "react";
import Cast from "./cast";
import YoutubeEmbed from "./youtube-embed";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MovieDetails = ({
  movie,
  onClose,
  updateTitle,
}: MovieDetailsProps): React.ReactElement => {
  useEffect(() => {
    document.addEventListener("keyup", exit, false);
    document.body.style.overflow = "hidden";
    updateTitle(
      `${movie.name}${
        movie.specialEdition ? ` [${movie.specialEdition}]` : ""
      }${movie.year ? ` (${movie.year})` : ""}`
    );

    return () => {
      document.removeEventListener("keyup", exit, false);
      document.body.style.overflow = "unset";
      updateTitle(undefined);
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
    let text = session.time;
    if (session.room) text = `Sala   ${session.room} | ${text}`;
    if (session.type) text = `${text}   [${session.type}]`;
    return text.trim();
  };

  return (
    <>
      <div className="floating-buttons">
        <button className="button circle danger" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="movie-details">
        <div className="header">
          <div className="title">
            <h3 className="h3 name">
              {movie.name}
              {movie.specialEdition ? (
                <span className="special-edition">
                  [{movie.specialEdition}]
                </span>
              ) : null}
              {movie.year ? <span className="year">({movie.year})</span> : null}
            </h3>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          </div>
        </div>
        <div className="content">
          <div className="sidebar">
            <img className="poster" src={movie.poster} />
            <div className="links">
              <h5 className="heading">Enlaces</h5>
              <div className="buttons">
                <button
                  className="button"
                  onClick={() => handleOpenInTab(movie.source)}
                >
                  Página web del Cine
                </button>
                {movie.theMovieDbId && (
                  <button
                    className="button"
                    onClick={() =>
                      handleOpenInTab(
                        `https://www.themoviedb.org/movie/${movie.theMovieDbId}?language=es-ES`
                      )
                    }
                  >
                    The Movie Database
                  </button>
                )}
                {movie.imDbId && (
                  <button
                    className="button"
                    onClick={() =>
                      handleOpenInTab(
                        `https://www.imdb.com/title/${movie.imDbId}/`
                      )
                    }
                  >
                    IMDb
                  </button>
                )}
              </div>
            </div>
            {movie.sessions.length > 0 && (
              <div className="sessions">
                <h5 className="heading">Compra de entradas</h5>
                <div className="buttons">
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
            )}
          </div>
          <div className="details">
            {movie.originalName && (
              <div className="detail">
                <h5 className="heading">Título original</h5>
                <span>{movie.originalName}</span>
              </div>
            )}
            {movie.synopsis && (
              <div className="detail">
                <h5 className="heading">Sinopsis</h5>
                <span>{movie.synopsis}</span>
              </div>
            )}
            {movie.genres?.length > 0 && (
              <div className="detail">
                <h5 className="heading">Género</h5>
                <span>{movie.genres.join(", ")}</span>
              </div>
            )}
            {movie.releaseDate && (
              <div className="detail">
                <h5 className="heading">Fecha de estreno</h5>
                <span>{movie.releaseDate}</span>
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
            {movie.budget > 0 && (
              <div className="detail">
                <h5 className="heading">Presupuesto</h5>
                <span>{formatter.format(movie.budget)}</span>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className="detail">
                <h5 className="heading">Recaudación</h5>
                <span>{formatter.format(movie.revenue)}</span>
              </div>
            )}
            {movie.voteAverage > 0 && (
              <div className="detail">
                <h5 className="heading">Puntuación (The Movie Database)</h5>
                <span>{movie.voteAverage}</span>
              </div>
            )}
            {movie.director && (
              <div className="detail">
                <h5 className="heading">Director</h5>
                <div className="cast-list">
                  <Cast key={movie.director.name} cast={movie.director} />
                </div>
              </div>
            )}
            {movie.actors && (
              <div className="detail">
                <h5 className="heading">Intérpretes</h5>
                <div className="cast-list">
                  {movie.actors.map((actor) => {
                    return <Cast key={actor.name} cast={actor} />;
                  })}
                </div>
              </div>
            )}
            {movie.writers && (
              <div className="detail">
                <h5 className="heading">Guionistas</h5>
                <div className="cast-list">
                  {movie.writers.map((writer) => {
                    return <Cast key={writer.name} cast={writer} />;
                  })}
                </div>
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
    </>
  );
};

export default MovieDetails;
