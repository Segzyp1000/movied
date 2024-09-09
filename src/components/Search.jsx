import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import requests from "../Request";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchQuery = location.state.searchQuery;

  useEffect(() => {
    if (searchQuery) {
      const searchUrl = `${requests.API_SEARCH}&query=${searchQuery}`;
      fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results));
    }
  }, [searchQuery]);

  return (
    <div className="relative inline-block cursor-pointer mt-36 group">
      <div className="flex items-center justify-center group mx-24">
        <div className="w-full h-full  whitespace-wrap relative">
          {searchResults.length > 0 &&
            searchResults.map((item) => (
              <div
                key={item.id}
                className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                  alt={item.title}
                  className="w-full h-auto block"
                />
                <div className="w-full h-full hover:bg-black/80 opacity-100 text-white">
                  <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
