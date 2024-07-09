import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import ReactPlayer from "react-player";

function MoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div
        className="flex gap-1 items-center w-fit ring hover:ring-blue-700 p-4 rounded-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <CiLogout className="text-3xl" />
        <button className="w-fit">Previous Page</button>
      </div>
      <div className="mockup-browser bg-base-300 border w-1/2 mx-auto h-[80vh]">
        <div className="mockup-browser-toolbar">
          <div className="input">{`https://vidsrc.xyz/embed/movie/${movieId}`}</div>
        </div>
        <div className="bg-base-200 flex justify-center px-4 py-16 h-full">
          <iframe
            className="w-full h-full"
            src={`https://vidsrc.xyz/embed/movie/${movieId}`}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
