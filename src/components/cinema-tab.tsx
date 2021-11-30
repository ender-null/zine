import React from "react";
import { CinemaTabProps } from "../models/props.interface";

const CinemaTab = ({
  cinema,
  selected,
  selectCinema,
}: CinemaTabProps): React.ReactElement => {
  return (
    <button
      className={selected ? "tab selected" : "tab"}
      onClick={() => selectCinema(cinema)}
    >
      {cinema.name}
    </button>
  );
};

export default CinemaTab;
