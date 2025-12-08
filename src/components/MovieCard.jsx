import { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Movie from "./Movie";

function MovieCard({ title, fetchURL, rowId }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const sliderLeft = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 50;
  };

  const sliderRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 50;
  };

  return (
    <>
      <h1 className="text-white font-bold md:text-xl p-4">{title}</h1>
      <div className="relative flex items-center group">
        <FaChevronLeft
          onClick={sliderLeft}
          size={30}
          className="bg-white rounded-full left-0 absolute opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block z-10"
        />
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide   relative"
        >
          {movies.map((item, id) => (
            <Movie item={item} />
          ))}
        </div>
        <FaChevronRight
          onClick={sliderRight}
          size={30}
          className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer hidden group-hover:block z-10"
        />
      </div>
    </>
  );
}

export default MovieCard;
