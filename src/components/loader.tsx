import React, { useEffect, useState } from "react";

const Loader = (): React.ReactElement => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  });
  return show ? <div className="loader">Loading...</div> : <div></div>;
};

export default Loader;
