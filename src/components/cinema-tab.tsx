import React from "react";
import { CinemaTabProps } from "../models/props.interface";

const CinemaTab = ({
  cinema,
  selected,
  selectCinema,
}: CinemaTabProps): React.ReactElement => {
  return (
    <button
      className={selected ? "button selected" : "button"}
      onClick={() => selectCinema(cinema)}
    >
      {cinema.name}
    </button>
  );
};

export default CinemaTab;
