import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ id, title, poster_path, showType }) {
  const navigate = useNavigate();
  return (
    <>
      {poster_path ? (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-fit w-96">
          {poster_path && (
            <img
              className="rounded-t-lg bg-contain h-[25rem] w-full"
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
          )}
          <div className="p-5 flex flex-col py-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <button
              className="btn btn-accent"
              onClick={() =>
                navigate(`/${id}`, { state: { showType: showType } })
              }
            >
              Watch Now
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Cards;
