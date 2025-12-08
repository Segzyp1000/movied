import { useState, useEffect } from "react";
import requests from "../Request";
import axios from "axios";

function Main() {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  //   console.log(movie);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[500px] text-white">
      <div className="w-full  h-full ">
        <div className="absolute w-full h-[500px] bg-gradient-to-r from-black"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%]  p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold py-5">
            {movie?.title}
          </h1>
          <button className="border bg-gray-300 text-black py-2 px-5 border-gray-300">
            Play
          </button>
          <button className="border  text-white py-2 px-5 border-gray-300">
            Watch later
          </button>
          <p className="text-gray-500 text-sm py-5">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w[70%] lg:max-[50%] xl:max-w-[35%] text-gray-300">
            {truncateString(movie?.overview, 200)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
