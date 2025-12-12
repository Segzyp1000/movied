import { useState, useEffect, useCallback } from "react";
import requests from "../Request";
import axios from "axios";

// 1. Extract the API Key safely from your requests config
const API_KEY = requests.requestPopular.split('api_key=')[1].substring(0, 32);
const BASE_VIDEO_URL = "https://api.themoviedb.org/3/movie/";
const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/";

function Main() {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch the trailer key for a given movie ID
  const fetchTrailer = useCallback(async (movieId) => {
    try {
      const videoResponse = await axios.get(
        `${BASE_VIDEO_URL}${movieId}/videos?api_key=${API_KEY}`
      );
      
      const videos = videoResponse.data.results;
      
      // Filter for the best trailer: official, type 'Trailer', and on YouTube
      const trailer = videos.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
        console.warn(`No official trailer found for movie ID: ${movieId}`);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerKey(null);
    }
  }, []); // Dependency array is empty as it uses external constants

  // Effect to fetch popular movies and the featured movie's trailer
  useEffect(() => {
    setLoading(true);
    axios.get(requests.requestPopular)
      .then((response) => {
        const results = response.data.results;
        setMovies(results);
        
        if (results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          const selectedMovie = results[randomIndex];
          setFeaturedMovie(selectedMovie);
          
          // Now fetch the trailer key for the selected movie
          fetchTrailer(selectedMovie.id);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      });
  }, [fetchTrailer]);

  // Handler to toggle play state
  const handlePlay = () => {
    if (trailerKey) {
      setIsPlaying(true);
    } else {
      alert("Trailer not found for this movie.");
    }
  };

  // Handler to exit video player
  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  if (loading || !featuredMovie) {
    return (
        <div className="w-full h-[500px] text-white flex items-center justify-center pt-[50px]">
            <p className="text-xl">Loading featured movie...</p>
        </div>
    );
  }
  
  const movie = featuredMovie;

  // --- CONDITIONAL RENDERING ---
  
  // 2. Render the YouTube Player when isPlaying is true
  if (isPlaying) {
    return (
      <div className="w-full h-screen relative bg-black">
        <button 
          onClick={handleClosePlayer}
          className="absolute top-4 right-4 z-[100] text-white text-3xl p-2 rounded-full bg-black/50 hover:bg-black/80 transition"
        >
          &times; {/* Simple close (X) icon */}
        </button>
        <iframe
          className="w-full h-full"
          src={`${YOUTUBE_EMBED_URL}${trailerKey}?autoplay=1&rel=0&showinfo=0&controls=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={`Trailer for ${movie.title}`}
        />
      </div>
    );
  }

  // 3. Render the static movie banner when isPlaying is false
  return (
    <div className="w-full h-[500px] text-white">
      <div className="w-full h-full relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8 z-20">
          <h1 className="text-3xl md:text-5xl font-bold py-5">
            {movie?.title}
          </h1>
          <div className="my-4">
            {/* Play button is active only if trailerKey is available */}
            <button 
              onClick={handlePlay}
              disabled={!trailerKey}
              className={`border py-2 px-5 mr-4 transition duration-200 ${
                trailerKey 
                  ? 'bg-gray-300 text-black hover:bg-white border-gray-300' 
                  : 'bg-gray-500 text-gray-800 border-gray-500 cursor-not-allowed'
              }`}
            >
              Play
            </button>
            <button className="border text-white py-2 px-5 border-gray-300 hover:bg-gray-700 transition duration-200">
              Watch later
            </button>
          </div>
          <p className="text-gray-500 text-sm py-5">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-300">
            {truncateString(movie?.overview, 200)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;