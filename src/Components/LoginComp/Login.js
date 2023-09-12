import React, { useState } from "react"
import "./Login.css"
import { Button } from "@mui/material";

const Login = (props) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Add your login logic here using the userName and password state values
    console.log("Submitted");
  }

  return (
    <div className="login-main-div">
      <div className="login-header">
        Header
      </div>
      <div className="login-component">
        
          <form onSubmit={onSubmit} className="login-card">
            <div className="input-group">
              <label htmlFor="email" className="login-label">Email ID</label>
              <input type="text" id="email" className="login-input" name="email" placeholder="Enter your email"></input>
            </div>
            <div className="input-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input type="password" id="password" className="login-input" name="password" placeholder="Enter your password"></input>
            </div>
            <div className="login-or-comp">
              <p>Or</p>
              <p>Not an Account? Signup</p>
            </div>
            <div className="login-submit-">
              <button type="submit" className="login-submit-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    
  )
};

export default Login;
