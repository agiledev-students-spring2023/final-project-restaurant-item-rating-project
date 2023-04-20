
import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Redirect, Link, useNavigate } from 'react-router-dom';
import './Login.css';

import axios from 'axios'

const serverAddress = "http://localhost:3002"


export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
      
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${serverAddress}/login`, {
        email: email,
        password: password
      });
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        navigate("/home");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  
      
  return (
    <div className="login-form">
      <form class="form" onSubmit={handleLogin}>
        <div className="title">
          <h3 className="heading">Log In</h3>
        </div>
        <div className="input-container">
          <label className="label" htmlFor="email">Email:</label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="label" htmlFor="password">Password:</label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && (
          <div className="error-message">Invalid authentication, please check your email and password</div>
        )}
        <br />
        <button className="button">Log In</button>
        <br />
        <a className="button" href="/register">Register Page</a>
      </form>
    </div>    
  );    
}