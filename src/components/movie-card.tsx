import React from "react";
import { MovieCardProps } from "../models/props.interface";

const MovieCard = ({ movie }: MovieCardProps): React.ReactElement => {
  const handleCardClick = () => {
    const newWindow = window.open(
      movie.source,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="movie" onClick={handleCardClick}>
      <img className="poster" src={movie.poster} />
      <div className="name">{movie.name}</div>
    </div>
  );
};

export default MovieCard;
