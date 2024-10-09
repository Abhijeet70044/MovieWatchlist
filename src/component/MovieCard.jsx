// src/components/MovieCard.js
import React from "react";
import "./MovieCard.css"; // Import CSS for MovieCard

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
