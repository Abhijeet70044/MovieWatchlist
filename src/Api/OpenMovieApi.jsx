const API_KEY = "8474868d"; 

const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
};

const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${BASE_URL}&i=${imdbID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};


const omdbApi = {
  searchMovies,
  getMovieDetails,
};

export default omdbApi;
