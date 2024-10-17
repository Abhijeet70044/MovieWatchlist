import React from "react";
import "./MovieCard.css"; 
const MovieCard = ({ movie, isInWatchList, onAddToWatchList, onRemoveFromWatchList }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year">{movie.Year}</p>
      {isInWatchList ? (
        <button onClick={onRemoveFromWatchList} className="add-all-button">
          -
        </button>
      ) : (
        <button onClick={onAddToWatchList} className="add-all-button">
          +
        </button>
      )}
    </div>
  );
};
export default MovieCard;