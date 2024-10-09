// src/components/Watchlist.js
import React, { useContext } from "react";
import { AuthContext } from "../context/Auth";
import "./Watchlist.css"; // Import CSS for Watchlist

const Watchlist = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="watchlist-page">
      <h2>{user.email}'s Watchlist</h2>
      {/* Here you can map through the user's watchlist */}
    </div>
  );
};

export default Watchlist;
