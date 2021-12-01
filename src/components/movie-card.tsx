import React from "react";
import { MovieCardProps } from "../models/props.interface";

const MovieCard = ({
  movie,
  selectMovie,
}: MovieCardProps): React.ReactElement => {
  return (
    <div className="movie" onClick={() => selectMovie(movie)}>
      <img className="poster" src={movie.poster} />
      <div className="name">{movie.name}</div>
    </div>
  );
};

export default MovieCard;
