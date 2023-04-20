

import React, { useState } from "react";
import './Register.css';
import axios from 'axios'
const serverAddress = "http://localhost:3002"


export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
      setPasswordsMatch(event.target.value === password);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // if (password === confirmPassword) {
      //   handleRegister();
      // } else {
      //   alert("Passwords do not match.");
      // }
      // handle registration logic here, e.g. sending data to server
    };

    const handleLogIn = () => {
        // Redirect to register page
        // Replace "/register" with the path of your register page
        window.location.href = '/login';
    };

    const handleRegister = () => {
      // Redirect to register page
      // Replace "/register" with the path of your register page
      if (password === confirmPassword) {

        axios.post(`${serverAddress}/register`, {
          email: email,
          password: password
        }).then(function (response) {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          alert('User Details submitted')
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
          //alert(error.response.data.message);
        });
        
        window.location.href = '/login';
        
      } else {
        alert("Passwords do not match.");
      }
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
              value={email}
              onChange={handleEmailChange}
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
             {!passwordsMatch && <span className="register-form__error">Passwords do not match.</span>}
          </div>
          <button class="register-form__button" onClick={handleRegister}>Register</button>
        </form>
        <br></br>
        <button class="register-form__login-button" onClick={handleLogIn}>Login Page</button>
      </div>
    </section>
    
      );

}