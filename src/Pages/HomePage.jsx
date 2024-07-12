import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "../components/Cards";
import { RotatingLines } from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";

function HomePage() {
  const [movieCard, setMovieCard] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showType, setShowType] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [currentResultType, setCurrentResultType] = useState("Trending Movies");

  const getMovie = async (movieName) => {
    setCurrentResultType("Search Result");
    if (!movieName) {
      fetchTrendigMovies();
      return;
    }
    setNoDataFound(false);
    try {
      setIsLoading(true);
      setMovieCard(null);
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
        setShowType("movie");
      } else {
        const data = await getTvShow(movieName);
        if (data.total_results > 0) {
          setShowType("tv");
          setMovieCard(data.results);
        } else {
          setNoDataFound(true);
          setTimeout(() => {
            setNoDataFound(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTvShow = async (tvShow) => {
    try {
      setIsLoading(true);
      setMovieCard(null);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${tvShow}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceGetMovie = useDebouncedCallback(getMovie, 1000);

  const fetchTrendigMovies = async () => {
    setCurrentResultType("Trending Movies");
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data) {
        setMovieCard(data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendigMovies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#131330] to-[#0a0a12]">
      <div className="flex flex-col items-center gap-10 p-12">
        <h1 className="text-4xl text-white font-bold text-center">
          What would you like to watch?
        </h1>
        <div className="flex w-full justify-center gap-4">
          <div className="flex items-center sm:w-1/2 w-3/4 gap-4 input input-bordered input-info ">
            <FaSearch className="sm:text-xl text-base" />
            <input
              type="text"
              placeholder="What you would like to watch?"
              className="hidden sm:block w-full bg-transparent text-black placeholder:text dark:text-white"
              value={movieName}
              autoFocus
              onChange={(e) => {
                setMovieName(e.target.value);
                debounceGetMovie(e.target.value);
              }}
            />
            {/* Input for smaller screens */}
            <input
              type="text"
              placeholder="Search"
              className="block sm:hidden w-full bg-transparent text-black placeholder:text dark:text-neutral-content"
              value={movieName}
              autoFocus
              onChange={(e) => {
                setMovieName(e.target.value);
                debounceGetMovie(e.target.value);
              }}
            />
          </div>
        </div>
        <h2 className="sm:text-4xl text-3xl text-black dark:text-gray-300 font-bold ">
          {currentResultType}
        </h2>
      </div>
      <div
        className="w-full flex justify-center flex-wrap p-4 gap-4"
        id="movieContainer"
      >
        {isLoading && (
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {noDataFound && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-warning">
              <span>Nothing found</span>
            </div>
          </div>
        )}
        {movieCard &&
          movieCard.map((el) => (
            <Cards
              key={el.id}
              id={el.id}
              title={el.title}
              poster_path={el.poster_path}
              showType={showType}
            />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
