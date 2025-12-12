import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// 1. Import the requests file to access the API key
import requests from "../Request";

// Extract the API Key from the imported requests object's first request
// We are slicing the string to get the key part: "d61bbaf8aaa5dcdef98b520fc1287fe4"
const API_KEY = requests.requestPopular.split('api_key=')[1].substring(0, 32);

// Constants for image path
const BASE_IMG_URL = "https://image.tmdb.org/t/p/";

// Component to display a single cast member (for reuse)
const CastMember = ({ actor }) => (
    <div className="flex flex-col items-center w-[120px] text-center p-2 flex-shrink-0">
        <img
            src={actor.profile_path ? `${BASE_IMG_URL}w300${actor.profile_path}` : 'https://via.placeholder.com/80?text=No+Image'}
            alt={actor.name}
            className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-gray-700"
        />
        <p className="text-white text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full">{actor.name}</p>
        <p className="text-gray-400 text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full">{actor.character}</p>
    </div>
);


function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        // 1. Fetch main movie details using the extracted API_KEY
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(movieResponse.data);

        // 2. Fetch cast and crew
        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        // Take the first 8 cast members
        setCast(creditsResponse.data.cast.slice(0, 8)); 

      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Helper to format runtime (e.g., 140 -> 2h 20m)
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  if (loading) {
    return <div className="pt-20 text-white text-center text-xl">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="pt-20 text-white text-center text-xl">Error loading movie details. Please check the movie ID or network connection.</div>;
  }

  return (
    <div className="w-full text-white pt-[50px]">
      
      {/* --- SECTION 1: HERO IMAGE AND PRIMARY DETAILS --- */}
      <div className="relative w-full h-[70vh] min-h-[500px]">
        
        {/* Background Image - Uses backdrop_path (or poster_path as fallback) */}
        <img
          src={
            movie.backdrop_path 
              ? `${BASE_IMG_URL}original/${movie.backdrop_path}`
              : movie.poster_path
              ? `${BASE_IMG_URL}original/${movie.poster_path}`
              : 'https://via.placeholder.com/1280x720/000000/FFFFFF?text=Image+Not+Available'
          }
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 top-1/4 left-0 p-4 md:p-8 flex flex-col justify-end">
          
          {/* Return Button */}
          <Link to="/">
            <h1 className="text-base cursor-pointer hover:text-red-600 text-gray-300 mb-9">
              ← Return to Home
            </h1>
          </Link>
          
          {/* Title and Tagline */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2">
            {movie.title}
          </h1>
          <p className="text-xl italic text-gray-300 mb-4">{movie.tagline}</p>

          {/* Key Info Row */}
          <div className="flex items-center space-x-4 mb-4 text-sm md:text-base">
            <span className="bg-red-600 px-3 py-1 rounded font-semibold">{movie.release_date?.substring(0, 4)}</span>
            <span className="text-white border border-gray-500 px-2 py-1 rounded">{formatRuntime(movie.runtime)}</span>
            <span className="text-yellow-400 font-semibold">★ {movie.vote_average?.toFixed(1)}</span>
            {movie.genres && (
              <span className="text-gray-400 hidden sm:block">
                {movie.genres.map(g => g.name).join(' / ')}
              </span>
            )}
          </div>

          {/* Overview */}
          <p className="max-w-[800px] text-base md:text-lg text-gray-300 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* --- SECTION 2: CAST AND ADDITIONAL DETAILS --- */}
      <div className="p-4 md:p-8 bg-[#141414]">
        
        {/* Cast Section */}
        <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">Top Cast</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
            {cast.length > 0 ? (
                cast.map((actor) => <CastMember key={actor.id} actor={actor} />)
            ) : (
                <p className="text-gray-500">Cast information not available.</p>
            )}
        </div>

        {/* Additional Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-l-4 border-red-600 pl-4">
                <p className="text-gray-400 font-semibold">Original Language</p>
                <p className="text-white">{movie.original_language?.toUpperCase()}</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
                <p className="text-gray-400 font-semibold">Status</p>
                <p className="text-white">{movie.status}</p>
            </div>
            <div className="border-l-4 border-red-600 pl-4">
                <p className="text-gray-400 font-semibold">Box Office Revenue</p>
                <p className="text-white">
                    {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
}

export default MovieDetails;