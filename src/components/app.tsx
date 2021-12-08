import React, { useEffect, useState } from "react";
import { Cinema, CinemaMoviesPro, MoviePro } from "../models/cinema.interface";
import Loader from "./loader";
import MovieCard from "./movie-card";
import MovieDetails from "./movie-details";

const App = (): React.ReactElement => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(
    undefined
  );
  const [selectedMovie, setSelectedMovie] = useState<MoviePro | undefined>(
    undefined
  );
  const [movies, setMovies] = useState<MoviePro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    updateTitle(undefined);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/zine/cinema`)
      .then(async (resp) => {
        const _cinemas = await resp.json();
        setCinemas(_cinemas);
        handleChangeCinema(_cinemas[0]);
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  }, []);

  const handleChangeCinema = (cinema: Cinema) => {
    if (selectedCinema && selectedCinema.id === cinema.id) return;

    setLoading(true);
    setSelectedCinema(cinema);
    fetch(`${process.env.REACT_APP_API_URL}/zine/cinema/${cinema.id}`)
      .then(async (resp) => {
        const cinemaMovies: CinemaMoviesPro = await resp.json();
        setMovies(cinemaMovies.movies);
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const item = cinemas.find((item) => item.id === event.target.value);
    if (item) handleChangeCinema(item);
  };

  const handleSelectMovie = (movie: MoviePro | undefined) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(undefined);
  };

  const updateTitle = (title: string | undefined) => {
    const baseTitle = capitalize(process.env.REACT_APP_TITLE || "");
    const description = process.env.REACT_APP_DESCRIPTION || "";
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = `${baseTitle}: ${description}`;
    }
  };

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="app">
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleClose}
          updateTitle={updateTitle}
        />
      )}
      <h1 className="h1 title">
        {capitalize(process.env.REACT_APP_TITLE || "")}{" "}
        <span className="version">v{process.env.REACT_APP_VERSION}</span>
      </h1>
      <p className="description">{process.env.REACT_APP_DESCRIPTION}</p>
      <div className="select-cinema">
        <select
          className="h2"
          value={selectedCinema?.id}
          onChange={(e) => handleSelect(e)}
        >
          {cinemas?.map((cinema) => {
            return (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name} ({cinema.location})
              </option>
            );
          })}
        </select>
      </div>
      <div className="movies">
        {movies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              selectMovie={handleSelectMovie}
            />
          );
        })}
      </div>
      {loading && <Loader text="Cargando..." />}
    </div>
  );
};

export default App;
