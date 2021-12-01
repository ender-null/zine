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
  director?: string;
  genres?: string[];
  actors?: string[];
  poster?: string;
  trailer?: string;
  source?: string;
}

export interface Session {
  time: string;
  room: string;
  type?: string;
  url?: string;
}

export interface CinemaData {
  [id: string]: Cinema;
}

export type Cinemas = Array<Cinema>;

export interface CinemaMovies extends Cinema {
  lastUpdated: string;
  movies: Movie[];
}
