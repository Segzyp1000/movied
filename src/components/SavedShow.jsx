import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SavedShow = () => {
  const [movies, setMovies] = useState([]);
  const { user } = userAuth();
  const navigate = useNavigate();

  // --- Scroll Logic ---
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

 


  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // --- Data Fetching Logic (Real-time update) ---
  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, "users", `${user.email}`), (docSnap) => {
        const savedShows = docSnap.data()?.savedShows;
        if (Array.isArray(savedShows)) {
          setMovies(savedShows);
        } else {
          setMovies([]);
        }
      });
      return () => unsubscribe();
    }
  }, [user?.email]);

  // --- Navigation Functionality ---
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition duration-200"
          size={40}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative"
        >
          {movies.map((item) => (
            <div
              key={item.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 rounded-lg overflow-hidden transition duration-300 transform hover:scale-[1.02]"
            >
              <img
                onClick={() => handleMovieClick(item.id)}
                className="w-full h-auto block rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/500x281/000000/FFFFFF?text=${item?.title}`;
                }}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition duration-300">
                <p
                  onClick={() => handleMovieClick(item.id)}
                  className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center p-2"
                >
                  {item?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition duration-200"
          size={40}
        />
      </div>
    </>
  );
};

export default SavedShow;