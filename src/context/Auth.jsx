import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Create a new user and store in localStorage
  const createUser = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[email]) {
      users[email] = { email, watchlist: [] };
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

 
  const loginUser = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
      setUser(users[email]);
      localStorage.setItem("currentUser", JSON.stringify(users[email]));
      return true; 
    } else {
      return false; 
    }
  };


  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Save the watchlist for the logged-in user
  const saveWatchlist = (watchlist) => {
    if (user) {
      const users = JSON.parse(localStorage.getItem("users")) || {};
      users[user.email].watchlist = watchlist;
      localStorage.setItem("users", JSON.stringify(users));
      setUser({ ...user, watchlist }); 
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, createUser, logoutUser, saveWatchlist }}>
      {children}
    </AuthContext.Provider>
  );
};
