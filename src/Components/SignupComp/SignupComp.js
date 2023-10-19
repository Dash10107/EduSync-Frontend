import React, { useState } from "react";
import "./SignupComp.css";

import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Snackbar } from "@mui/material";
const SignupComp = (props) => {
  // Create state variables to store user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };
  const eye2 = passwordShown2 ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    const phrase = "somaiya.edu";

    if (!email.endsWith(phrase)) {
      console.log("The email does not end with 'somaiya.edu",);
      setErrors({ error: "Please use somaiya.edu Email", email });
      setToastOpen(true);
      return;
    }
    try {
      // Send a POST request to the server
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData
      );
      console.log("Response", response)
      if (response.status === 200) {
        // If the registration is successful, you can handle the response here

        Login(email, password);
        setFormData({
          name: "",
          email: "",
          password: "",
          password2: "",
        });


      } else { console.log(response.status) }

    } catch (error) {
      // If there's an error, handle it here
      console.error("Registration error", error.response.data);
      setErrors(error.response.data);
      setToastOpen(true);

    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }


  const Login = async (userName, passWord) => {
    const phrase = "somaiya.edu";

    if (!userName.endsWith(phrase)) {

      console.log("The string does not end with 'somaiya.edu : ", userName);
      return;
    }

    let loginInfo = {
      email: userName,
      password: passWord
    }
    console.log(loginInfo);
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)

      });

      const result = await response.json();
      console.warn("Result", result);

      if (result.success) {
        if (result.token) {
          localStorage.setItem("token", result.token);

          navigate("/home");
        } else {
          console.log(result.token);
        }
      } else {
        console.log(result);

      }

    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
      setToastOpen(true);
    }

  }
  return (
    <div className="login-main-div overflow-hidden">
      <Navbar />

      {/* daksh ye div mene add kiya hai image and login ko ek container mein daalne k liye  */}
      <div className="flex md:space-x-14 lg:space-x-14 h-full justify-center">

        {/* ye img hai login card k baju wala */}
        <div>
          <img src="https://www.alphalearn.com/wp-content/uploads/2021/11/e-learning-2.jpg" alt="help" className="h-[31rem] hidden rounded md:block
          // responsive design css
          md:w-[30rem] lg:w-[48rem] ml-8 mt-10 2xl:w-[55rem] 2xl:h-[37rem]" />
        </div>


        {/* This is login card */}
        <div className="md:mt-[5.5rem] mb-[200px] rounded-[20px] 
        // responsive css design 
      md:w-[28rem] md:ml-0 md:mr-24 md:h-96
      lg:w-[33rem] lg:ml-0">

          <form onSubmit={handleSubmit} className="login-card space-y-10 mt-20 md:mt-0 sm:mr-5 md:space-y-5 
           2xl:space-y-10">

<div className="input-group text-2xl font-bold">
            {/* yape font awesome ka icon add krna hai */}
              SIGNUP
            </div>

            <div className="input-group">
              <input
                type="text"
                className="rounded py-1 text-center bg-gray-200 placeholder-black  border-b-2 border-black text-black  signup-input"
                name="name"
                placeholder="Enter Your Name "
                value={name}
                onChange={handleChange}
                required={true}
              ></input>
            </div>

            <div className="input-group">
              <input
                type="email"
                className="rounded py-1 text-center bg-gray-200 placeholder-black  border-b-2 border-black text-black signup-input "
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={handleChange}
                required={true}
              ></input>
            </div>

            <div className="input-group" style={{ display: "flex", alignItems: "center" }}>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                className=" fa-solid fa-lock rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black signup-input"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={handleChange}
                required={true}
              />
              <i onClick={togglePasswordVisiblity} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer", color: "black" }}>
                {eye}
              </i>
            </div>

            <div className="input-group" style={{ display: "flex", alignItems: "center" }}>
              <input
                type={passwordShown2 ? "text" : "password"}
                id="password2"
                className=" fa-solid fa-lock rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black signup-input"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={handleChange}
                required={true}
              />
              <i onClick={togglePasswordVisiblity2} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer", color: "black" }}>
                {eye2}
              </i>
            </div>

            <div className=" space-y-1 self-center ">
              <div className="flex">
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 mr-3" />
                OR
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 ml-3" />
              </div>

              <div className="underlining" onClick={() => { navigate("/login") }}> Already An User ? <span >Login</span></div>
            </div>
            {/* sm:ml-[0rem] md:ml-[4rem] lg:ml-[10rem] */}
            <div className=" bg-[#CCC9DC] border-2 border-blue-950 text-black px-10  font-bold py-0.5 rounded-lg text-xl font-serif hover:ring-2 ring-[#CCC9DC] self-center">
              <button type="submit" className="login-submit-btn">
                Signup
              </button>
            </div>
          </form>
        </div>
        <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {value}
                </li>
              ))}
            </ul>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignupComp;
