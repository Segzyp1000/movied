import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = userAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      navigate("/");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen py-10"></div>
        <div className="fixed w-full px-4 py-10 mt-16 md:mt-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16 ">
              <h1 className="text-3xl font-bold">Sign in</h1>
              <form
                action=""
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="enail"
                  placeholder="Email"
                  autoComplete="email"
                  className="p-3 my-2 rounded bg-gray-700"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="p-3 my-2 rounded bg-gray-700"
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold ">
                  Sign in
                </button>
                {error ? <p className="text-red-600">{error}</p> : null}
                <div className="flex justify-between items-center text-gray-600 text-sm">
                  <p>
                    <input
                      className="mr-2 text-gray-600 text-sm cursor-pointer"
                      type="checkbox"
                    />
                    Remember me
                  </p>
                  <p className="cursor-pointer">Need help?</p>
                </div>
                <p className="py-5 cursor-pointer">
                  <span className="text-gray-600 text-md">New to Netbox?</span>
                  <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
