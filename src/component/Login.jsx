// src/components/LoginComponent.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import "./Login.css"; // Import the CSS for this component

const Login = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) {
      setErrorMessage("Email is required");
    } else if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
    } else {
      loginUser({ email });
      navigate("/search");
    }
  };

  // Function to validate email format using regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login or Create Account</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(""); // Clear error message when typing
          }}
          className="email-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin} className="login-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
