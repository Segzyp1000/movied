const key = "dcbb228ead46fd9e81c4c1bc674a740d";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
  requestTrending: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
  requestHorror: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
  API_SEARCH: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
};
export default requests;
