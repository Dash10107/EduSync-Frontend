import React from "react"
import  "./Login.css"

const Login = (props) => {    
  return (
    <div className="login-main-div">
    <div className="login-header">
    Header
    </div>
    <div className="login-component">
    <div className="login-card">
    <div className="input-group">
      <label for="email" className="login-label">Email ID</label>
      <input type="text" id="email" className="login-input" name="email" placeholder="Enter your email"></input>
    </div>
    <div className="input-group">
      <label for="password" className="login-label">Password</label>
      <input type="password" id="password" className="login-input" name="password" placeholder="Enter your password"></input>
    </div>
    </div>
    </div>
  

      
    </div>
  )
};

export default Login;
