import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { user } = userAuth();
  const navigate = useNavigate();

  const movieRef = doc(db, "users", user?.email); // Document reference

  // Sync "liked" state with Firestore in real-time
  useEffect(() => {
    if (!user?.email) return;

    const unsubscribe = onSnapshot(movieRef, (docSnap) => {
      const saved = docSnap.data()?.savedShows || [];
      setLike(saved.some((movie) => movie.id === item.id));
    });

    return () => unsubscribe();
  }, [user?.email, item.id]);

  const saveShow = async () => {
    if (!user?.email) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    const movieData = {
      id: item.id,
      title: item.title,
      img: item.backdrop_path,
    };

    try {
      if (!like) {
        // Save movie → create document if not exists
        await setDoc(
          movieRef,
          { savedShows: arrayUnion(movieData) },
          { merge: true }
        );
      } else {
        // Unsave movie
        await updateDoc(movieRef, {
          savedShows: arrayRemove(movieData),
        });
      }

      setLike(!like); // Optimistic UI update
    } catch (err) {
      console.error("Error saving show:", err);
    }
  };

  const handleMovieClick = () => {
    navigate(`/movie/${item.id}`);
  };

  return (
    <>
      <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer rounded-lg overflow-hidden transition duration-300 transform hover:scale-[1.02]">
        <img
          onClick={handleMovieClick}
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/500x281/000000/FFFFFF?text=${item?.title}`;
          }}
        />

        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white transition duration-300">
          <p
            onClick={handleMovieClick}
            className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center p-2"
          >
            {item?.title}
          </p>

          <p
            onClick={saveShow}
            className="absolute top-4 right-4 text-xl z-10"
          >
            {like ? (
              <FaHeart className="text-red-500 hover:text-red-400 drop-shadow-lg cursor-pointer transition duration-150 transform hover:scale-110" />
            ) : (
              <FaRegHeart className="text-gray-300 hover:text-red-500 drop-shadow-lg cursor-pointer transition duration-150 transform hover:scale-110" />
            )}
          </p>
        </div>
      </div>

      {showLoginAlert && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
          <div className="bg-red-600 text-white p-4 rounded-xl shadow-2xl text-sm font-medium">
            <span className="font-bold mr-2">🔒 Please Log In</span>
            You must be logged in to save movies.
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;