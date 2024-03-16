"use client"
import React, { useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Convert username and password to JSON
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        console.log('Login successful:', data);
        // Handle successful login here (e.g., redirect, store tokens, etc.)
      } else {
        console.error('Login failed:', data.detail);
        // Handle login failure here (e.g., show an error message)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors here
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state on input change
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
