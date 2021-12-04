import { Actor, Cinema, Crew, MoviePro } from "./cinema.interface";

export interface CinemaTabProps {
  cinema: Cinema;
  selected: boolean;
  selectCinema: (value: Cinema) => void;
}

export interface MovieCardProps {
  movie: MoviePro;
  selectMovie: (movie: MoviePro) => void;
}

export interface MovieDetailsProps {
  movie: MoviePro;
  onClose: () => void;
}

export interface YoutubeEmbedProps {
  embedId?: string;
  url?: string;
}

export interface CastProps {
  cast: Crew | Actor;
}

export interface LoaderProps {
  text?: string;
}
