import React, { useEffect, useState } from "react";
import { CastProps } from "../models/props.interface";

const Cast = ({ cast }: CastProps): React.ReactElement => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateTheme);

    setTheme(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateTheme);
    };
  }, []);

  const updateTheme = (e: MediaQueryListEvent) =>
    setTheme(e.matches ? "dark" : "light");

  const getPicture = () => {
    if (cast.picture) return cast.picture;
    if (theme === "dark") {
      return "https://fakeimg.pl/100x150/000000/1b1b1b/?text=?&font_size=64&font=museo";
    } else {
      return "https://fakeimg.pl/100x150/ffffff/e4e4e4/?text=?&font_size=64&font=museo";
    }
  };

  return (
    <div className="cast">
      <img src={getPicture()} />
      <span className="cast-name">{cast.name}</span>
      {"character" in cast && cast.character ? (
        <span className="character">{cast.character}</span>
      ) : null}
    </div>
  );
};

export default Cast;
