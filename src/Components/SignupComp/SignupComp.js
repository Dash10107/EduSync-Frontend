import React, { useState } from "react";
import "./SignupComp.css";
import { ToastContainer, toast } from "react-toastify";
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
const [errors,setErrors] = useState({});
  const [toastOpen,setToastOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />

  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisiblity2 = () => {
    setPasswordShown2(passwordShown2 ? false : true);
  };
  const eye2 = passwordShown2?<FontAwesomeIcon icon={faEye} />:<FontAwesomeIcon icon={faEyeSlash} />
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData
      );
      console.log("Response",response)
      if(response.status===200){
           // If the registration is successful, you can handle the response here
     setFormData({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  setErrors("Signed Up Successfully");
  setToastOpen(true);
  navigate("/login");
      
      }else{ console.log(response.status)}
   
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
  return (
    <div className="login-main-div overflow-hidden">
      <Navbar />
      {/* daksh ye div mene add kiya hai image and login ko ek container mein daalne k liye  */}
      <div className="flex md:space-x-14 lg:space-x-6 bg-[#f3f2f7] h-full justify-center">
        {/* ye img hai login card k baju wala */}
        <div>
          <img
            src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4="
            alt="help"
            className="h-[32rem] hidden md:block md:w-[58rem] lg:w-[48rem]  ml-8 mt-10 rounded"
          />
        </div>
        {/* This is login card */}
        <div className="mt-28 mb-[200px] hover:ring-4 ring-blue-950 ring-offset-4 rounded-[20px] md:w-[33rem] md:ml-0 lg:w-[33rem] lg:ml-0">
          <form onSubmit={handleSubmit} className="login-card ">
            <div className="input-group">
              <input
                type="text"
                className="rounded py-1 text-center bg-gray-200 placeholder-black  border-b-2 border-black text-black "
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
                className="rounded py-1 text-center bg-gray-200 placeholder-black  border-b-2 border-black text-black "
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
    className=" fa-solid fa-lock rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black"
    name="password"
    placeholder="Enter Password"
    value={password}
    onChange={handleChange}
    required={true}
  />
  <i onClick={togglePasswordVisiblity} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer",color:"black" }}>
    {eye}
  </i>
</div>
                <div className="input-group" style={{ display: "flex", alignItems: "center" }}>
  <input
    type={passwordShown2 ? "text" : "password"}
    id="password2"
    className=" fa-solid fa-lock rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black"
    name="password2"
    placeholder="Confirm Password"
    value={password2}
    onChange={handleChange}
    required={true}
  />
  <i onClick={togglePasswordVisiblity2} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer",color:"black" }}>
    {eye2}
  </i>
</div>
            <div className="sm:ml-[0rem] md:ml-[0rem] lg:ml-[3.5rem] space-y-1">
              <div className="flex ">
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 mr-3" />
                OR
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 ml-3" />
              </div>
              <div>
                Already A User?{" "}
                <span onClick={() => navigate("/login")}>Login</span>
              </div>
            </div>
            <div className="sm:ml-[0rem] md:ml-[4rem] lg:ml-[10rem] bg-[#CCC9DC] border-2 border-blue-950 text-black px-10  font-bold py-0.5 rounded-lg text-xl font-serif hover:ring-2 ring-[#CCC9DC]">
              <button type="submit" className="login-submit-btn">
                Signup
              </button>
            </div>
          </form>
        </div>
        <Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
  <Alert onClose={handleClose} severity="warning"     sx={{ width: '100%' }}>
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
