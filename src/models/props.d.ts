interface CinemaTabProps {
  cinema: Cinema;
  selected: boolean;
  selectCinema: (value: Cinema) => void;
}

interface MovieCardProps {
  movie: MoviePro;
  selectMovie: (movie: MoviePro) => void;
}

interface MovieDetailsProps {
  movie: MoviePro;
  onClose: () => void;
  updateTitle: (title: string | undefined) => void;
}

interface YoutubeEmbedProps {
  embedId?: string;
  url?: string;
}

interface CastProps {
  cast: Crew | Actor;
}

interface LoaderProps {
  text?: string;
}
