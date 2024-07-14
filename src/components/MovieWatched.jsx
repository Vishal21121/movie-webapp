import React from "react";

import { useNavigate } from "react-router-dom";

function MovieWatched({ src, movieId, showType }) {
  const navigate = useNavigate();

  return (
    <img
      className="h-[25rem] bg-contain cursor-pointer rounded-lg"
      src={src}
      alt="..."
      onClick={() =>
        navigate(`${movieId}`, {
          state: {
            showType: showType,
          },
        })
      }
    />
  );
}

export default MovieWatched;
