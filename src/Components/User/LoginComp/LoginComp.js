import React, { useState } from "react"
import "./LoginComp.css"
// import { Button } from "@mui/material";
// import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Layouts/Navbar/Navbar";
import loginIcon from "../../../Assets/Login-removebg-preview.png";
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';

const LoginComp = (props) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [severity,setSeverity] = useState("error");
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

  const checkSubAdmin = async() => {
    // Perform the GET request to check if the user is an admin
   await fetch('https://edusync-backend.onrender.com/subadmin/checkSubAdmin', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Not an Sub admin');
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("SubAdmin",true);
        navigate("/subadmin/home");
      })
      .catch((error) => {
      console.log(error);
      localStorage.setItem("SubAdmin",false);
       navigate("/home");
      });
  }

  const checkAdmin = async() => {
    // Perform the GET request to check if the user is an admin
   await fetch('https://edusync-backend.onrender.com/admin/checkAdmin', {
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Not an admin');
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("Admin",true);
        navigate("/admin/home");
      })
      .catch((error) => {
      console.log(error);
      localStorage.setItem("Admin",false);
       checkSubAdmin();
      });
  }



  const onSubmit = async (e) => {
    e.preventDefault();
    
   

    if(userName==="" || password===""){
      setSeverity("warning");
      setErrors({error:"Please fill in the required fields"})
      setToastOpen(true);
      setUserName("");
      setPassword("");
      setSeverity("error")
      return
    }
    
    let loginInfo = {
      email: userName,
      password: password
    }
    console.log(loginInfo);
    try {
      const response = await fetch('https://edusync-backend.onrender.com/users/login', {
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
          
          checkAdmin();
          setUserName("");
          setPassword("");
          
        } else {
          console.log(result.token);
        }
      } else {
        console.log(result);
        setErrors(result);
     
        setToastOpen(true);
      }
     

    } catch (error) {
      console.error(error);
      setErrors(error.response);
     
      setToastOpen(true);
    }

  }


  return (
 <>
 <div className="login-main-div overflow-hidden">

      <Navbar isLogin={true} />

      {/* daksh ye div mene add kiya hai image and login ko ek container mein daalne k liye  */}
      <div className="flex md:space-x-10 lg:space-x-10 h-full justify-center">

        {/* ye img hai login card k baju wala */}

        <div>
          <img src="https://www.alphalearn.com/wp-content/uploads/2021/11/e-learning-2.jpg" alt="help" className="h-[28rem] hidden rounded md:block
          // responsive design css
          md:w-[25rem] lg:w-[43rem] mt-10 2xl:w-[50rem] 2xl:h-[37rem]" />
        </div>


        {/* css that is removed from below div :
hover:ring-4 ring-blue-950 ring-offset-4 */}

        {/* This is login card */}
        <div className="md:mt-[6.5rem] mb-[200px] rounded-[20px]
        // responsive css design 
      md:w-[28rem] md:ml-0 md:mr-24 md:h-96
      lg:w-[33rem] lg:ml-0 ">



          <form onSubmit={onSubmit} className="login-card space-y-6 pt-6 mt-20 md:mt-0 sm:mr-5 md:h-80 md:space-y-5 
          2xl:h-[26rem] 2xl:space-y-10">

            <div className="input-group text-2xl font-bold" >
            
              <p className="loginText">LOGIN <span><img src={loginIcon} className="loginImg" alt=""/></span></p> 
            </div>

            <div className="input-group">
              <input
                type="email"
                className="rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black login-input "
                name="name"
                placeholder="Enter Your Email"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
                
              ></input>
             <div className="mailIcon"> <MailRoundedIcon/> </div>
            </div>

            <div className="input-group" >
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                className=" fa-solid fa-lock rounded py-1 text-center bg-gray-200 placeholder-black border-b-2 border-black text-black login-input "
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                
              />
              <div className="mailIcon"><LockResetRoundedIcon/></div>
              <i onClick={togglePasswordVisiblity} className="eyeImgsec" style={{ marginLeft: "10%", cursor: "pointer", color: "black" }}>
                {eye}
              </i>
            </div>

            {/* sm:ml-[0rem] md:ml-[0rem] lg:ml-[3.5rem] */}
            <div className=" space-y-1 self-center ">
              <div className="flex ">
                <hr className="bg-black text-black h-0.5 w-[7rem] lg:w-[10rem] mt-2.5 mr-3" />
                OR
                <hr className="bg-black text-black w-[7rem] h-0.5 lg:w-[10rem] mt-2.5 ml-3" />
              </div>

              <div  className="underlining text-lg" onClick={() => { navigate("/signup") }}>Not an Account? <span >Signup</span></div>
            </div>
            {/* sm:ml-[0rem] md:ml-[4rem] lg:ml-[10rem] */}
            <div className="bg-[#324A5F] text-white border-2 border-blue-950 px-10 font-semibold py-0.5 rounded-lg text-xl self-center w-[25vw]">
              <button type="submit" className="login-submit-btn">
                Login
              </button>
            </div>
          </form>
        </div>




      </div>


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
    </>

  )
};

export default LoginComp;
