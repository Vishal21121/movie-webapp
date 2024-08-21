import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

function MoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { pushElement } = useLocalStorage();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
    pushElement(
      {
        src: location.state.src,
        showType: state?.showType === "tv" ? "tv" : "movie",
        movieId: movieId,
      },
      "movieList"
    );
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div
        className="flex items-center gap-1 p-4 cursor-pointer w-fit ring hover:ring-blue-700 rounded-xl"
        onClick={() => navigate("/")}
      >
        <CiLogout className="text-3xl" />
        <button className="w-fit">Previous Page</button>
      </div>
      <div className="w-full sm:w-3/4  mx-auto sm:h-[80vh] h-[40vh] flex justify-center  px-4 py-16 rounded-lg border">
        <iframe
          className="w-full h-full"
          src={`https://vidsrc.xyz/embed/${state?.showType}/${movieId}`}
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default MoviePage;
