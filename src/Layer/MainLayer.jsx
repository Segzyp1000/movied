import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayer() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayer;
