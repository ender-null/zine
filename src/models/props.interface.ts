import { Cinema, Movie } from "./cinema.interface";

export interface CinemaTabProps {
  cinema: Cinema;
  selected: boolean;
  selectCinema: (value: Cinema) => void;
}

export interface MovieCardProps {
  movie: Movie;
  selectMovie: (movie: Movie) => void;
}

export interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

export interface YoutubeEmbedProps {
  embedId?: string;
  url?: string;
}
