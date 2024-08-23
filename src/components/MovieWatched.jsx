import React from "react";
import { MdDelete } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

function MovieWatched({ src, movieId, showType, setMovieList }) {
  const navigate = useNavigate();
  const { removeElement } = useLocalStorage();
  const removeMovie = () => {
    let movieList = removeElement(movieId);
    setMovieList(movieList);
  };
  return (
    <div className="relative group">
      <img
        className="rounded-lg bg-contain h-[20rem] w-80"
        src={src}
        loading="lazy"
        alt="..."
        onClick={() =>
          navigate(`${movieId}`, {
            state: {
              showType: showType,
            },
          })
        }
      />
      <MdDelete
        className="absolute m-2 text-2xl text-black transition-opacity duration-300 bg-white rounded-lg opacity-0 cursor-pointer top-2 right-2 group-hover:opacity-100 "
        onClick={removeMovie}
      />
    </div>
  );
}

export default MovieWatched;
