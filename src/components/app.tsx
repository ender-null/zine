import React, { useEffect, useState } from "react";
import { Cinema, CinemaMovies, Movie } from "../models/cinema.interface";
import CinemaTab from "./cinema-tab";
import Loader from "./loader";
import MovieCard from "./movie-card";
import MovieDetails from "./movie-details";

const api = "https://api.drk.cat";

const App = (): React.ReactElement => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(
    undefined
  );
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(
    undefined
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${api}/zine/cinema`)
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
    fetch(`${api}/zine/cinema/${cinema.id}`)
      .then(async (resp) => {
        const cinemaMovies: CinemaMovies = await resp.json();
        setMovies(cinemaMovies.movies);
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  const handleSelectMovie = (movie: Movie | undefined) => {
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
      <h1>Zine</h1>
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

      <h2>{selectedCinema?.name}</h2>
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
