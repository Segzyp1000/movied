import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for password toggle

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false); 
  
  const { user, logIn } = userAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await logIn(email, password);
      navigate("/"); // Navigate home on success
    } catch (error) {
      console.error("Login failed:", error);
      // Firebase errors often have a format like 'auth/wrong-password'. We clean this up for the user.
      const errorMessage = error.message.replace(/firebase: Error \([^)]+\)/, '').trim();
      setError(errorMessage || "Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="Login background"
      />
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>
      
      {/* Login Form Container - Centered using Flexbox */}
      <div className="fixed w-full max-w-lg mx-auto z-50 p-4 md:p-8">
        <div className="bg-black/80 rounded-xl shadow-2xl p-6 md:p-12 text-white">
          <div className="max-w-[380px] mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-center">Sign In</h1>
            
            {/* Error Message Display */}
            {error && (
                <div className="bg-red-700 p-3 mb-4 rounded-md text-sm font-medium text-white shadow-lg">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
              {/* Email Input */}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email" // FIX: Corrected typo from "enail"
                placeholder="Email"
                autoComplete="email"
                required
                className="p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 hover:bg-gray-200 hover:text-gray-700"
              />
              
              {/* Password Input with Toggle */}
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="w-full p-4 rounded-md bg-gray-700 text-white placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-red-600 pr-12 transition duration-200 hover:bg-gray-200 hover:text-gray-700"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit"
                className="bg-red-600 py-4 my-6 rounded-md font-bold text-xl 
                           hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 
                           transition duration-200 shadow-xl"
              >
                Sign In
              </button>
              
              {/* Footer Links */}
              <div className="flex justify-between items-center text-gray-400 text-sm">
                <p className="flex items-center">
                  <input
                    className="mr-2 h-4 w-4 bg-gray-700 border-gray-600 rounded 
                               text-red-600 focus:ring-red-500 cursor-pointer"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </p>
                <p className="cursor-pointer hover:text-white transition">Need help?</p>
              </div>
              
              {/* Sign Up Link */}
              <p className="py-6 text-center text-md">
                <span className="text-gray-400 mr-1">New to The App?</span>
                <Link to="/signup" className="text-white font-semibold hover:text-red-400 transition">
                  Sign up now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;