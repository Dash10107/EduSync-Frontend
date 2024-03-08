import React, { useState } from "react";
import "./SignupComp.css";

import axios from "axios";
import Navbar from "../../../Layouts/Navbar/Navbar";
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
  const [severity,setSeverity] = useState("error")
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
    
    if(email==="" || name==="" || password === "" || password2===""){
     setSeverity("warning");
      setErrors({ error: "Please fill in all the details" });
      setToastOpen(true);
      return;
    }
    if(password!==password2){
      setSeverity("error")
      setErrors({error:"Please enter same passwords in both the fields"});
      setToastOpen(true);
      return;
    }

   
    try {
      // Send a POST request to the server
      const response = await axios.post(
        "https://edusync-backend.onrender.com/users/register",
        formData
      );
  


  // Access the response data directly
  const result = response.data;
  console.warn("Result", result);   
  
      if (response.status === 201) {
        // If the registration is successful, you can handle the response here

        
        setFormData({
          name: "",
          email: "",
          password: "",
          password2: "",
        });

    
        navigate("/verifyemail");

      } else { console.log(response.status) }

    } catch (error) {
      // If there's an error, handle it here
      console.error("Registration error", error);
      setErrors({error:error.message});
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



  return (
    <div className="login-main-div overflow-hidden">
      <Navbar isLogin={true} />

      {/* daksh ye div mene add kiya hai image and login ko ek container mein daalne k liye  */}
      <div className="flex md:space-x-10 lg:space-x-10 h-full justify-center">

        {/* ye img hai login card k baju wala */}
        <div>
          <img src="https://www.alphalearn.com/wp-content/uploads/2021/11/e-learning-2.jpg" alt="help" className="h-[31rem] hidden rounded md:block
          // responsive design css
          md:w-[25rem] lg:w-[43rem] mt-10 2xl:w-[50rem] 2xl:h-[37rem]" />
        </div>


        {/* This is login card */}
        <div className="md:mt-[2.5rem] mb-[200px] rounded-[20px] 
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
                
              />
              <i onClick={togglePasswordVisiblity2} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer", color: "black" }}>
                {eye2}
              </i>
            </div>

            <div className=" space-y-1 self-center ">
              <div className="flex">
                <hr className="bg-black text-black h-0.5 w-[7rem] lg:w-[10rem] mt-2.5 mr-3" />
                OR
                <hr className="bg-black text-black w-[7rem] h-0.5 lg:w-[10rem] mt-2.5 ml-3" />
              </div>

              <div className="underlining text-lg" onClick={() => { navigate("/login") }}> Already An User ? <span >Login</span></div>
            </div>
            {/* sm:ml-[0rem] md:ml-[4rem] lg:ml-[10rem] */}
            <div className="bg-[#324A5F] text-white border-2 border-blue-950 px-10 font-semibold py-0.5 rounded-lg text-xl self-center w-[25vw]">
              <button type="submit" className="login-submit-btn">
                Signup
              </button>
            </div>
          </form>
        </div>
        <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
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
