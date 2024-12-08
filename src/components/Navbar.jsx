import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Navbar({ value, handleSearch }) {
  // Add this line
  console.log(typeof handleSearch);
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

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/account" ||
    /^\/movie\/\d+$/.test(location.pathname)
  ) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-between items-center p-4 z-[100] w-full absolute">
      <div className="flex items-center flex-wrap whitespace-wrap">
        <Link to="/">
          <h1 className="text-red-600 text-3xl font-bold cursor-pointer">
            NETBOX
          </h1>
        </Link>
      </div>

      <div className="flex items-center last">
        {user?.email ? (
          <div className="ml-4">
            <Link to="/account">
              <button className="text-white pr-4">Account</button>
            </Link>
            <Link onClick={handleLogout}>
              <button className="bg-red-500 text-white px-5 py-3 rounded-lg">
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <div className="ml-4">
            <Link to="/login">
              <button className="bg-red-500 text-white px-5 py-3 rounded-lg">
                Sign in
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
