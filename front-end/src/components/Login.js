
import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';


export function Login() {

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
      
    const handleForgetPassword = () => {
        // Redirect to register page
        // Replace "/register" with the path of your register page
        window.location.href = '/register';
    };
      
    if (redirect) {
        return <Link to="/home" />;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={handleLogin}>
            <div>
            <h2>Log In</h2>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error && (
              <div className="error">Invalid authentication, please check your email and password</div>
            )}
            <br></br>
            <Link to="/home">Log In</Link>
            <br></br>
            <Link to="/register">Forgot Password</Link>
          </form>
        </div>
      );
      

}