/* eslint-disable react-hooks/exhaustive-deps */
import { useAptabase } from "@aptabase/react";
import React, { useEffect, useState } from "react";
import Loader from "./components/loader";
import MovieCard from "./components/movie-card";
import MovieDetails from "./components/movie-details";

const App = (): React.ReactElement => {
  const { trackEvent } = useAptabase();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(
    undefined,
  );
  const [selectedMovie, setSelectedMovie] = useState<MoviePro | undefined>(
    undefined,
  );
  const [movies, setMovies] = useState<MoviePro[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    updateTitle(undefined);
    initialLoad();
  }, []);

  const initialLoad = () => {
    setLoading(true);
    let _cinemas = null;
    const savedCinemas = localStorage.getItem("cinemas");
    if (savedCinemas) {
      _cinemas = JSON.parse(savedCinemas);
      setCinemas(_cinemas);
    }
    let _selectedCinema = null;
    const savedSelectedCinemas = localStorage.getItem("selectedCinema");
    if (savedSelectedCinemas) {
      _selectedCinema = JSON.parse(savedSelectedCinemas);
      setSelectedCinema(_selectedCinema);
    }
    loadCinemas(_selectedCinema);
  };

  const loadCinemas = (_selectedCinema: Cinema) => {
    fetch(`${import.meta.env.VITE_API_URL}/zine/cinema`)
      .then(async (resp) => {
        const _cinemas = await resp.json();
        localStorage.setItem("cinemas", JSON.stringify(_cinemas));
        setCinemas(_cinemas);
        if (_selectedCinema) {
          handleChangeCinema(_selectedCinema);
        } else {
          handleChangeCinema(_cinemas[0]);
        }
        setLoading(false);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };

  const handleChangeCinema = (cinema: Cinema) => {
    if (selectedCinema && selectedCinema.id === cinema.id) return;
    trackEvent("change_cinema", { cinema: cinema.id });

    setLoading(true);
    localStorage.setItem("selectedCinema", JSON.stringify(cinema));
    setSelectedCinema(cinema);
    fetch(`${import.meta.env.VITE_API_URL}/zine/cinema/${cinema.id}`)
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
    localStorage.setItem("movie", JSON.stringify(movie));
    setSelectedMovie(movie);
    trackEvent("select_movie", { movie: movie?.name || "unknown" });
  };

  const handleClose = () => {
    localStorage.removeItem("movie");
    setSelectedMovie(undefined);
  };

  const updateTitle = (title: string | undefined) => {
    const baseTitle = capitalize(import.meta.env.VITE_TITLE || "");
    const description = import.meta.env.VITE_DESCRIPTION || "";
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
        {capitalize(import.meta.env.VITE_TITLE || "")}{" "}
        <span className="version">v{import.meta.env.VITE_VERSION}</span>
      </h1>
      <p className="description">{import.meta.env.VITE_DESCRIPTION}</p>
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
