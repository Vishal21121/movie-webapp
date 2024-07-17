import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "../components/Cards";
import { RotatingLines } from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";
import MovieWatched from "../components/MovieWatched";
import { useLocalStorage } from "../hooks/useLocalStorage";

function HomePage() {
  const [movieCard, setMovieCard] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showType, setShowType] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [currentResultType, setCurrentResultType] = useState("Trending Movies");
  const [movieList, setMovieList] = useState(null);
  const { getItem } = useLocalStorage();

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
        `https://api.themoviedb.org/3/search/multi?query=${movieName}&include_adult=false&language=en-US&page=1`,
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
      } else {
        setNoDataFound(true);
        setTimeout(() => {
          setNoDataFound(false);
        }, 3000);
      }
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
    let itemGot = getItem("movieList");
    if (itemGot) {
      const items = JSON.parse(itemGot);
      setMovieList(items);
    }
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
      </div>
      {currentResultType === "Trending Movies" && (
        <div className="flex flex-col items-center w-full h-full">
          {movieList && movieList.length > 0 && (
            <h2 className="sm:text-4xl text-3xl text-gray-300 font-bold">
              Previosly Watched
            </h2>
          )}
          <div className="w-full flex flex-wrap justify-center gap-4 p-4">
            {movieList &&
              movieList.map((el) => (
                <MovieWatched
                  key={el.movieId}
                  src={el.src}
                  showType={el.showType}
                  movieId={el.movieId}
                />
              ))}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-4">
        <h2 className="sm:text-4xl text-3xl text-black dark:text-gray-300 font-bold">
          {currentResultType}
        </h2>
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
              wrapperclassName=""
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
                showType={el.media_type}
                name={el?.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
