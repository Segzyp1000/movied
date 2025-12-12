import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import { FaSearch } from 'react-icons/fa'; 

function Navbar({ value, handleSearch }) {
  const { user, logOut } = userAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Hide Navbar on specific routes
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/account" ||
    /^\/movie\/\d+$/.test(location.pathname)
  ) {
    return null;
  }

  return (
    <div className="flex justify-between items-center p-4 z-[100] w-full absolute">
      
      {/* 1. Logo - RESPONSIVE FONT SIZE */}
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-red-600 text-xl sm:text-3xl font-bold cursor-pointer whitespace-nowrap">
            NETBOX
          </h1>
        </Link>
      </div>

      {/* 2. Optimized Search Bar - Remains responsive and centered */}
      <div className="flex items-center flex-grow justify-center mx-2 sm:mx-4">
        <div className="relative max-w-lg w-full">
          
          <FaSearch 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={16} 
          />
          
          <input
            type="text"
            placeholder="Search for movies..."
            // Reduced vertical padding (py-1) on mobile
            className="pl-10 pr-4 py-1 sm:py-2 w-full rounded-full text-white bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150 ease-in-out text-sm"
            value={value}
            onChange={handleSearch}
          />
          
        </div>
      </div>


      {/* 3. Account/Sign In/Logout Buttons - RESPONSIVE FONT SIZE & PADDING */}
      <div className="flex items-center">
        {user?.email ? (
          <div className="ml-4">
            <Link to="/account">
              {/* Responsive Text Size */}
              <button className="text-white pr-2 sm:pr-4 hover:text-gray-300 text-sm sm:text-base">Account</button>
            </Link>
            <button
              onClick={handleLogout}
              // Responsive Padding Size
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg transition duration-150 ease-in-out text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              {/* Responsive Padding Size */}
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-lg transition duration-150 ease-in-out text-sm sm:text-base">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;