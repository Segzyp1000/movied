import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Netflix from "../assets/netflix background.jpeg";
import { userAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = userAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={Netflix}
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[500px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign up</h1>
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
                  Sign up
                </button>
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
                <p className="py-7 cursor-pointer">
                  <span className="text-gray-600 text-md">
                    Already sunscribed to Netflix?
                  </span>
                  <Link to="/login">Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}