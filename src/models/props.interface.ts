import { Cinema, Movie } from "./cinema.interface";

export interface CinemaTabProps {
  cinema: Cinema;
  selected: boolean;
  selectCinema: (value: Cinema) => void;
}

export interface MovieCardProps {
  movie: Movie;
}
