import React, { useState } from "react"
import "./LoginComp.css"
// import { Button } from "@mui/material";
// import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Layouts/Navbar/Navbar";



const LoginComp = (props) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = passwordShown ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    const phrase = "somaiya.edu";

    if (!userName.endsWith(phrase)) {
      console.log("The string does not end with 'somaiya.edu'");
      setErrors({ error: "Please use somaiya.edu Email" });
      setToastOpen(true);
      setUserName("");
      setPassword("");
      return;
    }

    let loginInfo = {
      email: userName,
      password: password
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
           // Check if it's the user's first login
           if (!localStorage.getItem("firstLogin")) {
            localStorage.setItem("firstLogin", "true");
          }
          localStorage.setItem("token", result.token);
          setUserName("");
          setPassword("");
          // Redirect to the home page or handle it in your route configuration
         
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
      <div className="flex md:space-x-14 lg:space-x-14 bg-[#f3f2f7] h-full justify-center">

        {/* ye img hai login card k baju wala */}

        <div>
          <img src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=" alt="help" className="h-[28rem] hidden rounded md:block
          // responsive design css
          md:w-[30rem] lg:w-[48rem] ml-8 mt-10 2xl:w-[55rem] 2xl:h-[34rem]" />
        </div>


        {/* css that is removed from below div :
hover:ring-4 ring-blue-950 ring-offset-4 */}

        {/* This is login card */}
        <div className="md:mt-[6.5rem] mb-[200px] rounded-[20px] 
        // responsive css design 
      md:w-[28rem] md:ml-0 md:mr-24 md:h-96
      lg:w-[33rem] lg:ml-0 ">

          <form onSubmit={onSubmit} className="login-card space-y-10 mt-20 md:mt-0 sm:mr-5 md:h-80 md:space-y-5 
          2xl:h-[26rem] 2xl:space-y-10">
            <div className="input-group">
              <input
                type="email"
                className="rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black "
                name="name"
                placeholder="Enter Your Email"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
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
                onChange={(e) => { setPassword(e.target.value) }}
                required={true}
              />
              <i onClick={togglePasswordVisiblity} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer", color: "black" }}>
                {eye}
              </i>
            </div>
{/* sm:ml-[0rem] md:ml-[0rem] lg:ml-[3.5rem] */}
            <div className=" space-y-1 self-center ">
              <div className="flex ">
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 mr-3" />
                OR
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 ml-3" />
              </div>

              <div>Not an Account? <span onClick={() => { navigate("/signup") }}>Signup</span></div>
            </div>
{/* sm:ml-[0rem] md:ml-[4rem] lg:ml-[10rem] */}
            <div className=" bg-[#CCC9DC] border-2 border-blue-950 text-black px-10  font-bold py-0.5 rounded-lg text-xl font-serif hover:ring-2 ring-[#CCC9DC] self-center">
              <button type="submit" className="login-submit-btn">
                Login
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

  )
};

export default LoginComp;
