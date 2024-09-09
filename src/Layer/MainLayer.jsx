import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import requests from "../Request";

function MainLayer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    console.log("handleSearch called");
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    navigate("/search", { state: { searchQuery } });
    if (searchQuery.trim() !== "") {
      const searchUrl = `${requests.API_SEARCH}&query=${searchQuery}`;
      fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results));
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar value={searchQuery} handleSearch={handleSearch} />
      <Outlet />
    </div>
  );
}

export default MainLayer;
