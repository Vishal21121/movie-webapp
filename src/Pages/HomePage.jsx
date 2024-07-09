import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "../components/Cards";

function HomePage() {
  const [movieCard, setMovieCard] = useState(null);
  const [movieName, setMovieName] = useState("");

  const getMovie = async (movieName) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.total_results > 0) {
        setMovieCard(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#131330] to-[#0a0a12]">
      <div className="flex flex-col items-center gap-10 p-12">
        <h1 className="text-4xl text-white font-bold">
          What would you like to watch?
        </h1>
        <div className="flex w-full justify-center gap-4">
          <div className="flex items-center w-1/2 gap-4 input input-bordered input-info ">
            <FaSearch className="text-xl" />
            <input
              type="text"
              placeholder="What you would like to watch?"
              className="w-3/4 bg-transparent text-white"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline btn-info"
            onClick={() => getMovie(movieName)}
          >
            Search
          </button>
        </div>
      </div>
      <div
        className="w-full flex justify-center flex-wrap p-4 gap-8"
        id="movieContainer"
      >
        {movieCard &&
          movieCard.map((el) => (
            <Cards
              key={el.id}
              id={el.id}
              title={el.title}
              poster_path={el.poster_path}
            />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
