import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import requests from "../Request";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;

  useEffect(() => {
    if (searchQuery) {
      // Safely encode the search query before adding it to the URL
      const encodedQuery = encodeURIComponent(searchQuery);
      const searchUrl = `${requests.API_SEARCH}&query=${encodedQuery}`;
      
      fetch(searchUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch search results");
          return res.json();
        })
        .then((data) => setSearchResults(data.results || [])) // fallback to []
        .catch((error) => {
          console.error("Search API error:", error);
          setSearchResults([]); // handle errors gracefully
        });
    }
  }, [searchQuery]);

  // Placeholder URL that can be used when backdrop_path is missing
  const PLACEHOLDER_IMG_URL = "https://placehold.co/500x281/000000/FFFFFF?text=No+Image";


  return (
    <div className="relative inline-block cursor-pointer mt-36 group">
      <div className="flex items-center justify-center group mx-24">
        <div className="w-full h-full whitespace-wrap relative flex flex-wrap justify-center gap-4"> 
         
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Link
                key={item.id}
                to={`/movie/${item.id}`} // route to your detail page
                state={{ movie: item }} // optional: pass full data
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src={
                    // Primary fallback in the src attribute
                    item.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
                      : PLACEHOLDER_IMG_URL
                  }
                  alt={item.title || item.name || "Untitled"}
                  className="w-full h-auto block min-h-[140px] object-cover" // Ensure consistent height for cards without image
                  // Secondary fallback using onError
                  onError={(e) => {
                      e.currentTarget.onerror = null; // prevents infinite loop
                      e.currentTarget.src = PLACEHOLDER_IMG_URL;
                  }}
                />
                
                {/* Overlay for Title */}
                <div className="absolute inset-0 bg-black/50 hover:bg-black/80 flex items-center justify-center opacity-100 text-white transition duration-300">
                  <p className="whitespace-normal text-xs md:text-sm font-bold text-center p-2">
                    {item.title || item.name || "Untitled"}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-white text-xl p-8">
              {searchQuery 
                ? `No results found for "${searchQuery}".`
                : "Enter a search term to find movies and shows."}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Search;