

import React, { useState } from "react";
import './Register.css';


export function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // handle registration logic here, e.g. sending data to server
    };

    const handleLogIn = () => {
        // Redirect to register page
        // Replace "/register" with the path of your register page
        window.location.href = '/login';
    };

    return (
    <section class="register-form">
      <div class="register-form__container">
        <h2 class="register-form__title">Register</h2>
        <form class="register-form__form" onSubmit={handleSubmit}>
          <div class="register-form__input-group">
            <label class="register-form__label" htmlFor="username">Email:</label>
            <input
              class="register-form__input"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div class="register-form__input-group">
            <label class="register-form__label" htmlFor="password">Password:</label>
            <input
              class="register-form__input"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div class="register-form__input-group">
            <label class="register-form__label" htmlFor="confirmPassword">Confirm Password:</label>
            <input
              class="register-form__input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button class="register-form__button" type="submit">Register</button>
        </form>
        <br></br>
        <button class="register-form__login-button" onClick={handleLogIn}>Login Page</button>
      </div>
    </section>
    
      );

}