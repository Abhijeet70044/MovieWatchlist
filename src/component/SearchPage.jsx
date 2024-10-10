import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import omdbApi from "../Api/OpenMovieApi";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const { user, saveWatchlist, logoutUser } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState(user?.watchlist || []); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.watchlist) {
      setWatchList(user.watchlist);
    }
  }, [user]);

  const handleSearch = async (query) => {
    const response = await omdbApi.searchMovies(query);
    setMovies(response);
  };

  const addToWatchList = (movie) => {
    if (!watchList.find((m) => m.imdbID === movie.imdbID)) {
      const updatedList = [...watchList, movie];
      setWatchList(updatedList);
      saveWatchlist(updatedList); 
    }
  };

  const removeFromWatchList = (movie) => {
    const updatedList = watchList.filter((m) => m.imdbID !== movie.imdbID);
    setWatchList(updatedList);
    saveWatchlist(updatedList); 
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="search-page">
      <div className="watchlist-sidebar">
        <h3>Your Watch List</h3>
        {watchList.length > 0 ? (
          <div className="sidebar-movie-grid">
            {watchList.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isInWatchList={true}
                onRemoveFromWatchList={() => removeFromWatchList(movie)}
              />
            ))}
          </div>
        ) : (
          <p>No movies in the watch list</p>
        )}

        {}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <h2 className="page-title">Search for Movies</h2>
        <SearchBar onSearch={handleSearch} />

        <div className="movie-grid">
          {movies.map((movie) => {
            const isInWatchList = watchList.some((watchMovie) => watchMovie.imdbID === movie.imdbID);
            return (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isInWatchList={isInWatchList}
                onAddToWatchList={() => addToWatchList(movie)}
                onRemoveFromWatchList={() => removeFromWatchList(movie)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
