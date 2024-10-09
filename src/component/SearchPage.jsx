// src/components/SearchPage.js
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import omdbApi from "../Api/OpenMovieApi"; // Import the API file

import "./SearchPage.css"; // Import CSS

const SearchPage = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    const response = await omdbApi.searchMovies(query); // Use the API
    setMovies(response);
  };

  return (
    <div className="search-page">
      <h2 className="page-title">Search for Movies</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
