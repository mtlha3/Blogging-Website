import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState(""); 
  const [userId, setUserId] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !userId || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
  
    if (!/^[a-zA-Z0-9]*$/.test(password)) {
      setError("Password must not contain special characters.");
      return;
    }
  
    if (!/[a-zA-Z]/.test(password)) {
      setError("Password must contain at least one alphabet.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        userId,
        password,
      });
  
      setSuccess(response.data.message);
      setError(""); 
      setName(""); 
      setUserId("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Error registering user. Please try again.");
    }
  };
  

  return (
    <div style={{ backgroundColor: '#58999E' }} className="flex justify-center items-center min-h-screen bg-gray-100">
      <div style={{ backgroundColor: '#FEF8E1' }} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-2">{success}</div>}
        
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
          <p className="text-center mt-4">
          Already have an account? 
          <Link to="/login" className="r-0 px-2 underline text-blue-800 hover:text-blue-950">
           Sign In
          </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
