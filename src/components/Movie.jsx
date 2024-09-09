import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = userAuth();
  const navigate = useNavigate();

  const movieId = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const handleMovieClick = () => {
    navigate(`/movie/${item.id}`);
  };

  return (
    <div className=" relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer">
      <img
        onClick={handleMovieClick}
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
        key={item.id}
      />
      <div className="w-full h-full hove:bg-black/80 opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-0 left-0 text-gray-300 opacity-50 hover:opacity-100 cursor-pointer" />
          ) : (
            <FaRegHeart className="absolute top-0 left-0 text-gray-300 opacity-50 hover:opacity-100 cursor-pointer" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
