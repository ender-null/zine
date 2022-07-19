import React, { useEffect, useState } from "react";
import { Cinema, CinemaMoviesPro, MoviePro } from "../models/cinema.interface";
import { MoviesProps } from "../models/props.interface";
import MovieCard from "./movie-card";

const Movies = ({setLoading, updateTitle}: MoviesProps): React.ReactElement => {
  const [movies, setMovies] = useState<MoviePro[]>([]);

  useEffect(() => {
    updateTitle(undefined);
    initialLoad();
  }, []);

  const initialLoad = () => {
    setLoading(true);
    let _selectedCinema = null;
    const savedSelectedCinemas = localStorage.getItem("selectedCinema");
    if (savedSelectedCinemas) {
      _selectedCinema = JSON.parse(savedSelectedCinemas);
    }
    loadMovies(_selectedCinema);
  };

  const loadMovies = (cinema: Cinema) => {
    setLoading(true);
    let cinemaMovies: CinemaMoviesPro | null = null;
    const savedMovies = localStorage.getItem("movies");
    if (savedMovies) {
      cinemaMovies = JSON.parse(savedMovies);
    }
    fetch(`${process.env.REACT_APP_API_URL}/zine/cinema/${cinema.id}`)
      .then(async (resp) => {
        cinemaMovies = await resp.json();
        if (cinemaMovies) {
          localStorage.setItem("movies", JSON.stringify(cinemaMovies));
          setMovies(cinemaMovies.movies);
        }
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  }

  const handleSelectMovie = (movie: MoviePro | undefined) => {
    localStorage.setItem("movie", JSON.stringify(movie));
  };

  return (
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
  );
};

export default Movies;
