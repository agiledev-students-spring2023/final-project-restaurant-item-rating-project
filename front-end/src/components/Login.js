
import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Login.css';


export function Login() {

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);
      
    const handleLogin = (event) => {
        event.preventDefault();
      
        // Perform authentication check here
        // Example: Assume that email is "test@example.com"
        // and password is "password123"
        if (email === 'test@example.com' && password === 'password123') {
        setRedirect(true);
        } else {
        setError(true);
        }
    };
      
/*     const handleForgetPassword = () => {
        // Redirect to register page
        // Replace "/register" with the path of your register page
        window.location.href = '/register';
    }; */
      
    if (redirect) {
        return <Link to="/home" />;
    }

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
        <a className="button" href="/home">Log In</a>
        <br />
        <a className="button" href="/register">Register Page</a>
      </form>
    </div>
    
  );    

}