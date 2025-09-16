interface Cinema {
  id: string;
  name: string;
  address?: string;
  location?: string;
  website?: string;
  source?: string;
}

interface Movie {
  id: string;
  name: string;
  specialEdition?: string;
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

interface MoviePro extends Movie {
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

interface Session {
  room: string;
  time: string;
  date?: string;
  type?: string;
  url?: string;
}

interface Crew {
  name: string;
  picture?: string;
}

interface Actor extends Crew {
  character?: string;
}

interface CinemaData {
  [id: string]: Cinema;
}

type Cinemas = Array<Cinema>;

interface CinemaMovies extends Cinema {
  lastUpdated: string;
  movies: Movie[];
}

interface CinemaMoviesPro extends Cinema {
  lastUpdated: string;
  movies: MoviePro[];
}
