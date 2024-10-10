import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load currently logged-in user from localStorage
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

  // Login user if the user is found in localStorage
  const loginUser = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
      setUser(users[email]);
      localStorage.setItem("currentUser", JSON.stringify(users[email]));
      return true; // Successfully logged in
    } else {
      return false; // User not found
    }
  };

  // Logout user and clear current user session
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
      setUser({ ...user, watchlist }); // Update local state as well
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, createUser, logoutUser, saveWatchlist }}>
      {children}
    </AuthContext.Provider>
  );
};
