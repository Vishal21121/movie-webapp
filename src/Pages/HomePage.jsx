import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Cards from "../components/Cards";
import { RotatingLines } from "react-loader-spinner";
import { useDebouncedCallback } from "use-debounce";
import MovieWatched from "../components/MovieWatched";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function HomePage() {
  const [movieCard, setMovieCard] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [currentResultType, setCurrentResultType] = useState("Trending Movies");
  const [movieList, setMovieList] = useState(null);
  const { getItem, clearElements } = useLocalStorage();

  function getMovie() {
    return axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
  }

  function getShow() {
    return axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/tv?query=${movieName}&include_adult=false&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });
  }

  const getSearchResults = async (movieName) => {
    setCurrentResultType("Search Result");
    if (!movieName) {
      fetchTrendigMovies();
      return;
    }
    setNoDataFound(false);
    try {
      setIsLoading(true);
      setMovieCard(null);
      const [movieResponse, showResponse] = await Promise.all([
        getMovie(movieName),
        getShow(movieName),
      ]);
      const movieData = movieResponse.data.results;
      const showData = showResponse.data.results;
      if (movieData.length > 0 || showData.length > 0) {
        let finalMovieData = movieData.map((el) => ({
          ...el,
          media_type: "Movie",
        }));
        let finalShowData = showData.map((el) => ({
          ...el,
          media_type: "Show",
        }));
        let results = [...finalMovieData, ...finalShowData];
        console.log("results", finalMovieData, finalShowData);
        setMovieCard(results);
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

  const debounceGetMovie = useDebouncedCallback(getSearchResults, 1000);

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
        <h1 className="text-4xl font-bold text-center text-white">
          What would you like to watch?
        </h1>
        <div className="flex justify-center w-full gap-4">
          <div className="flex items-center w-3/4 gap-4 sm:w-1/2 input input-bordered input-info ">
            <FaSearch className="text-base sm:text-xl" />
            <input
              type="text"
              placeholder="What you would like to watch?"
              className="hidden w-full text-black bg-transparent sm:block placeholder:text dark:text-white"
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
              className="block w-full text-black bg-transparent sm:hidden placeholder:text dark:text-neutral-content"
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
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-3xl font-bold text-gray-300 sm:text-4xl">
                Previosly Watched
              </h2>
              <button
                className="mt-1 text-white cursor-pointer btn btn-primary"
                onClick={() => {
                  setMovieList([]);
                  clearElements();
                }}
              >
                Clear All
              </button>
            </div>
          )}
          <div className="flex flex-wrap justify-center w-full gap-4 p-4">
            {movieList &&
              movieList.map((el) => (
                <MovieWatched
                  key={el.movieId}
                  src={el.src}
                  showType={el.showType}
                  movieId={el.movieId}
                  setMovieList={setMovieList}
                />
              ))}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold text-white">{currentResultType}</h2>
        <div
          className="flex flex-wrap justify-center w-full gap-4 p-4"
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
