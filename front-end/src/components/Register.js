
import React, { useState } from "react";
import './Register.css';
import axios from 'axios';
import logo from './Dish_Dealer_Logo.png';

const serverAddress = process.env.REACT_APP_SERVER_DEV;

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setValidEmail(event.target.value.includes("@"));
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
    if (!validEmail) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password === confirmPassword) {
      handleRegister();
    } else {
      alert("Passwords do not match.");
    }
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
        window.location.href = '/login';
      })
      .catch(function (error) {
        console.log("error: ", error);
        if (error.response.status === 401) {
          alert("Email is already taken.");
        } else {
          alert(error.response.data.message);
        }
      });
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="header" style={{backgroundColor: "#FAA101"}}>
      <img src={logo} width={350} height={200} alt="Dish Dealer Logo" />
      <section className="register-form">
        <div className="register-form__container">
          <h2 className="register-form__title">Register</h2>
          <form className="register-form__form" onSubmit={handleSubmit}>
            <div className="register-form__input-group">
              <label className="register-form__label" htmlFor="email">Email:</label>
              <input
                className="register-form__input"
                type="text"
                id="username"
                value={email}
                onChange={handleEmailChange}
              />
              {!validEmail && (
    <span className="register-form__error">
      Please enter a valid email address.
    </span>
  )}
            </div>
            <div className="register-form__input-group">
              <label className="register-form__label" htmlFor="password">Password:</label>
              <input
                className="register-form__input"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="register-form__input-group">
              <label className="register-form__label" htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className="register-form__input"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
             {!passwordsMatch && <span className="register-form__error">Passwords do not match.</span>}
          </div>
          <button class="register-form__button" onClick={handleRegister}disabled={!validEmail}>Register</button>
        </form>
        <br></br>
        <button class="register-form__login-button" onClick={handleLogIn}>Login Page</button>
      </div>
    </section> 
  </div>
  );
}