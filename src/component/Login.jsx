import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginUser, createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    if (validateEmail(email)) {
      createUser(email); 
      setErrorMessage("Account created successfully! You can now log in.");
    } else {
      setErrorMessage("Please enter a valid email.");
    }
  };

  const handleLogin = () => {
    if (validateEmail(email)) {
      const isSuccess = loginUser(email);
      if (isSuccess) {
        navigate("/search"); 
      } else {
        setErrorMessage("User does not exist. Please create an account.");
      }
    } else {
      setErrorMessage("Please enter a valid email.");
    }
  };

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
            setErrorMessage("");
          }}
          className="email-input"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <button onClick={handleCreateAccount} className="login-button">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
