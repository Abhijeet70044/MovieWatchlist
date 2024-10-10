  import React, { useState } from "react";
  import SearchBar from "./SearchBar";
  import MovieCard from "./MovieCard";
  import omdbApi from "../Api/OpenMovieApi"; // Import the API file
  import "./SearchPage.css"; // Import CSS

  const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]); // Watch list state
  const handleSearch = async (query) => {
    const response = await omdbApi.searchMovies(query); // Use the API
    setMovies(response);
    };
    // Add movie to watch list
    const addToWatchList = (movie) => {
    if (!watchList.find((m) => m.imdbID === movie.imdbID)) {
    setWatchList([...watchList, movie]);
    }
    };
    // Remove movie from watch list
    const removeFromWatchList = (movie) => {
    setWatchList(watchList.filter((m) => m.imdbID !== movie.imdbID));
    };
    // Add all movies from the current search result to the watch list
    const addAllToWatchList = () => {
    const newMovies = movies.filter(
    (movie) => !watchList.find((m) => m.imdbID === movie.imdbID)
    );
    setWatchList([...watchList, ...newMovies]);
    };
    return (
    <div className="search-page">
    <h2 className="page-title">Search for Movies</h2>
    <SearchBar onSearch={handleSearch} />
    {/* Add All to Watch List Button */}
    {movies.length > 0 && (
    <button className="add-all-button" onClick={addAllToWatchList}>
    Add All to Watch List
    </button>
    )}
    {/* Movies Grid */}
    <div className="movie-grid">
    {movies.map((movie) => {
    const isInWatchList = watchList.some(
      (watchMovie) => watchMovie.imdbID === movie.imdbID
  );
  return (
  <MovieCard
  key={movie.imdbID}
  movie={movie}
  isInWatchList={isInWatchList} // Pass if movie is in the watch list
  onAddToWatchList={() => addToWatchList(movie)} // Pass add function
  onRemoveFromWatchList={() => removeFromWatchList(movie)} // Pass remove
  function
  />
  );
  })}
  </div>
  {/* Watch List Section */}
  {watchList.length > 0 && (
  <div className="watch-list">
  <h3>Your Watch List</h3>
  <div className="movie-grid">
  {watchList.map((movie) => (
  <MovieCard
  key={movie.imdbID}
  movie={movie}
  isInWatchList={true} // In the watch list, always true
  onRemoveFromWatchList={() => removeFromWatchList(movie)} // Allow
  removal
  />
  ))}
  </div>
  </div>
  )}
  </div>
  );
  };
  export default SearchPage;