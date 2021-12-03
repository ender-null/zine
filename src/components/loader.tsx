import React, { useEffect, useState } from "react";

const Loader = (): React.ReactElement => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return show ? <div className="loader">Loading...</div> : <div></div>;
};

export default Loader;
