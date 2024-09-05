import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = userAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-3xl font-bold cursor-pointer">
          NETBOX
        </h1>
      </Link>
      {user?.email ? (
        <div>
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
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign in</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-500 text-white px-5 py-3 rounded-lg">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
