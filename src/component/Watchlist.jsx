import React, { useContext } from "react";
import { AuthContext } from "../context/Auth";
import "./Watchlist.css"; 

const Watchlist = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="watchlist-page">
      <h2>{user.email}'s Watchlist</h2>
      {}
    </div>
  );
};

export default Watchlist;
