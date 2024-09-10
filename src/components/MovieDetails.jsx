import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=dcbb228ead46fd9e81c4c1bc674a740d`
      )
      .then((response) => {
        setMovie(response.data);
      });
  }, [id]);

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full  h-full ">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
        <div className="absolute top-[5%] p-4 md:p-8">
          <Link to="/">
            <h1 className="text-sm cursor-pointer hover:text-slate-500 text-red-50">
              Return to homepage
            </h1>
          </Link>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%]  p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold py-5">
            {movie?.title}
          </h1>

          <p className="text-gray-500 text-sm py-5">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w[70%] lg:max-[50%] xl:max-w-[35%] text-gray-300">
            {movie.overview}
          </p>
          <div className="py-5 mb-10">
            <p className="text-gray-500 text-sm ">
              Vote Average:{movie.vote_average}
            </p>
            <p className="text-gray-500 text-sm">
              Vote Count:{movie.vote_count}
            </p>
            <p className="text-gray-500 text-sm">Tagline:{movie.tagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
