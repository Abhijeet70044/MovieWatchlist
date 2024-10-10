
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./component/Login";
import SearchPage from "./component/SearchPage";
import Watchlist from "./component/Watchlist";
import {AuthProvider} from "./context/Auth";
import "./App.css"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
