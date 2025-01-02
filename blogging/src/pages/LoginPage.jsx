import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link,NavLink } from "react-router-dom";
const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); 
      return decodedToken;
    } catch (err) {
      throw new Error("Invalid token");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!userId || !password) {
      setError("User ID and password are required.");
      return;
    }
  
    try {
      const { data } = await axios.post("http://localhost:5000/login", { userId, password });
  
      const { token } = data;
      if (!token) {
        throw new Error("Token missing in the login response.");
      }
  
      sessionStorage.setItem("token", token);
  
      console.log("Token stored:", token);
  
      const response = await axios.get("http://localhost:5000/protected", {
        headers: { Authorization: `Bearer ${token}` }, 
      });
  
      console.log("Protected route response:", response.data);
      navigate("/homepage");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };
  
  

  return (
    <div style={{ backgroundColor: '#58999E' }} className="flex items-center justify-center min-h-screen">
      <div style={{ backgroundColor: '#FEF8E1' }} className=" p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p
            className="text-red-500 text-center mb-4"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your user ID"
              aria-required="true"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <p className="text-center mt-4">
          Don't have an account? 
          <Link to="/signup" className="r-0 px-2 underline text-blue-800 hover:text-blue-950">
           Sign Up
          </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
