import React, { useEffect, useState } from "react";
import { LoaderProps } from "../models/props.interface";

const Loader = ({ text }: LoaderProps): React.ReactElement => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timeout);
    };
  }, []);

  return show ? (
    <div className="loader">{text || "Loading..."}</div>
  ) : (
    <div></div>
  );
};

export default Loader;
