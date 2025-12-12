import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import requests from "../Request";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;

useEffect(() => {
  if (searchQuery) {
    const searchUrl = `${requests.API_SEARCH}&query=${searchQuery}`;
    fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => setSearchResults(data.results || [])) // fallback to []
      .catch(() => setSearchResults([])); // handle errors gracefully
  }
}, [searchQuery]);


  return (
    <div className="relative inline-block cursor-pointer mt-36 group">
      <div className="flex items-center justify-center group mx-24">
        <div className="w-full h-full whitespace-wrap relative">
         
  {searchResults.length > 0 &&
  searchResults.map((item) => (
    <Link
      key={item.id}
      to={`/movie/${item.id}`} // route to your detail page
      state={{ movie: item }} // optional: pass full data
      className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer"
    >
      <img
        src={
          item.backdrop_path
            ? `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
            : "/fallback.jpg"
        }
        alt={item.title || item.name || "Untitled"}
        className="w-full h-auto block"
      />
      <div className="w-full h-full hover:bg-black/80 opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center">
          {item.title || item.name}
        </p>
      </div>
    </Link>
  ))}

        </div>
      </div>
    </div>
  );
}

export default Search;
