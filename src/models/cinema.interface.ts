export interface Cinema {
  id: string;
  name: string;
  address?: string;
  location?: string;
  website?: string;
  source?: string;
}

export interface Movie {
  id: string;
  name: string;
  sessions: Session[];
  synopsis?: string;
  duration?: number;
  durationReadable?: string;
  director?: Crew;
  genres: string[];
  actors?: Actor[];
  poster?: string;
  trailer: string | null;
  source?: string;
}

export interface MoviePro extends Movie {
  originalName: string | null;
  writers: Crew[];
  theMovieDbId?: string;
  imDbId?: string;
  tagline: string | null;
  year: number;
  releaseDate: string;
  budget: number;
  revenue: number;
  popularity: number;
  voteAverage: number;
  voteCount: number;
}

export interface Session {
  room: string;
  time: string;
  date?: string;
  type?: string;
  url?: string;
}

export interface Crew {
  name: string;
  picture?: string;
}

export interface Actor extends Crew {
  character?: string;
}

export interface CinemaData {
  [id: string]: Cinema;
}

export type Cinemas = Array<Cinema>;

export interface CinemaMovies extends Cinema {
  lastUpdated: string;
  movies: Movie[];
}

export interface CinemaMoviesPro extends Cinema {
  lastUpdated: string;
  movies: MoviePro[];
}
