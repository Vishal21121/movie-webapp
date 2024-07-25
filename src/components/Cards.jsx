import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ id, title, poster_path, showType, name }) {
  const navigate = useNavigate();
  return (
    <>
      {poster_path ? (
        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 h-fit w-80 shadow-gray-600 shadow-lg cursor-pointer"
          onClick={() =>
            navigate(`/${id}`, {
              state: {
                showType: showType,
                src: `https://image.tmdb.org/t/p/w185${poster_path}`,
              },
            })
          }
        >
          {poster_path && (
            <img
              className="rounded-lg bg-contain h-[20rem] w-full hover:scale-95 transition-transform duration-150"
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
            />
          )}
          <div className="p-5 flex flex-col py-4">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {title ? title : name}
            </h5>
            <p>{showType}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Cards;
