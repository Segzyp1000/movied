import React from "react";
import Main from "../components/Main";
import MovieCard from "../components/MovieCard";
import requests from "../Request";
function Home() {
  return (
    <>
      <Main />
      <MovieCard
        rowId="1"
        title="Upcoming"
        fetchURL={requests.requestUpcoming}
      />
      <MovieCard rowId="2" title="Popular" fetchURL={requests.requestPopular} />
      <MovieCard
        rowId="3"
        title="Trending"
        fetchURL={requests.requestTrending}
      />
      <MovieCard
        rowId="4"
        title="TopRated"
        fetchURL={requests.requestTopRated}
      />
      <MovieCard rowId="5" title="Horror" fetchURL={requests.requestHorror} />
    </>
  );
}

export default Home;
