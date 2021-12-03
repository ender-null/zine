import React, { useEffect, useState } from "react";
import { Cinema, CinemaMoviesPro, MoviePro } from "../models/cinema.interface";
import CinemaTab from "./cinema-tab";
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
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/zine/cinema`)
      .then(async (resp) => {
        const _cinemas = await resp.json();
        setCinemas(_cinemas);
        handleSelectCinema(_cinemas[0]);
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  }, []);

  const handleSelectCinema = (cinema: Cinema) => {
    if (selectedCinema && selectedCinema.id === cinema.id) return;

    setLoading(true);
    setSelectedCinema(cinema);
    fetch(`${process.env.REACT_APP_API_URL}/zine/cinema/${cinema.id}/pro`)
      .then(async (resp) => {
        const cinemaMovies: CinemaMoviesPro = await resp.json();
        setMovies(cinemaMovies.movies);
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  const handleSelectMovie = (movie: MoviePro | undefined) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(undefined);
  };

  return (
    <div className="app">
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleClose} />
      )}
      <h1 className="h1">
        {process.env.REACT_APP_TITLE}{" "}
        <span className="version">v{process.env.REACT_APP_VERSION}</span>
      </h1>
      <div className="cinemas">
        {cinemas?.map((cinema) => {
          return (
            <CinemaTab
              key={cinema.id}
              cinema={cinema}
              selected={selectedCinema?.id === cinema.id}
              selectCinema={handleSelectCinema}
            />
          );
        })}
      </div>
      <h2 className="h2">{selectedCinema?.name}</h2>
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
      {loading && <Loader />}
    </div>
  );
};

export default App;
