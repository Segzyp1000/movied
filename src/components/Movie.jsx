import React, { useState, useEffect } from "react"; // Added useEffect
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { userAuth } from "../context/AuthContext";
import { setDoc } from "firebase/firestore";
import { db } from "../firebase";
// Import arrayRemove for the unsaving functionality
import { arrayUnion, doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Movie = ({ item }) => {
  // 'like' state now tracks if the show is saved by the user
  const [like, setLike] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { user } = userAuth();
  const navigate = useNavigate();

  // Reference to the user's document in Firestore
  const movieId = doc(db, "users", `${user?.email}`);

  // FIX 1: Add useEffect to synchronize 'like' state with the database on mount
  useEffect(() => {
    // Only attempt to listen if a user email is available
    if (user?.email) {
      const unsubscribe = onSnapshot(movieId, (doc) => {
        if (doc.exists()) {
          const savedShows = doc.data().savedShows || [];
          // Check if the current movie ID exists in the savedShows array
          const isLiked = savedShows.some(show => show.id === item.id);
          setLike(isLiked);
        } else {
          setLike(false);
        }
      });
      // Cleanup listener when the component unmounts or dependencies change
      return () => unsubscribe();
    }
  }, [user?.email, item.id]); // Dependency array ensures listener is set up correctly

  const saveShow = async () => {
    if (user?.email) {
      // 1. Determine the new state (optimistically update the UI)
      const newLikeState = !like;
      setLike(newLikeState);
      // Removed setSaved(true) as it's redundant

      try {
        // FIX 2: Implement toggle logic using arrayUnion (to save) or arrayRemove (to unsave)
        const updateOperation = newLikeState ? arrayUnion : arrayRemove;

        await setDoc(movieId, {
  savedShows: [
    {
      id: item.id,
      title: item.title,
      img: item.backdrop_path,
    },
  ],
}, { merge: true });

      } catch (error) {
        console.error("Failed to update saved shows:", error);
        // Rollback the UI state if the Firestore operation fails
        setLike(like); 
      }

    } else {
      // User is not logged in: show custom alert
      setShowLoginAlert(true);
      setTimeout(() => {
        setShowLoginAlert(false);
      }, 3000); 
    }
  };

  const handleMovieClick = () => {
    navigate(`/movie/${item.id}`);
  };

  return (
    <>
      {/* This is the main Movie Card element. It needs to remain a single root 
        element for proper layout within the Row component's map function.
      */}
      <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer rounded-lg overflow-hidden transition duration-300 transform hover:scale-[1.02]">
        <img
          onClick={handleMovieClick}
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
          key={item.id}
          // Add fallback for missing image
          onError={(e) => {
              e.currentTarget.onerror = null; 
              e.currentTarget.src = `https://placehold.co/500x281/000000/FFFFFF?text=${item?.title}`;
          }}
        />
        
        {/* Overlay for title and heart icon */}
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
      
      {/* Login Alert Message (Visually outside the card via 'fixed' positioning) */}
      {showLoginAlert && (
        <div 
            // The fixed positioning places this element relative to the viewport, 
            // ensuring it is always visible on top, outside of the card's flow.
            className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 transition-transform duration-300 ease-out transform translate-y-0 pointer-events-none"
        >
            <div 
                className="bg-red-600 text-white p-4 rounded-xl shadow-2xl text-sm font-medium 
                transform transition-all duration-300 translate-y-0"
                // The alert uses opacity and scale to smoothly appear/disappear
                // We use conditional classes (not possible in this component structure) but rely on the fixed wrapper's positioning for timing.
            >
                <span className="font-bold mr-2">🔒 Please Log In</span> 
                You must be logged in to save movies to your list.
            </div>
        </div>
      )}
    </>
  );
};

export default Movie;