import React, { useState } from "react"
import "./LoginComp.css"
// import { Button } from "@mui/material";
// import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const LoginComp = (props) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //code to ping backend
  //   useEffect(()=>{
  // try {
  //        axios.get('http://localhost:5000/').then(res => {
  //       console.log(res.data.message);
  //       })
  //     } catch (error) {
  //       console.log("error", error)
  //     }
  //   },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    const phrase = "somaiya.edu";

    if (!userName.endsWith(phrase)) {
      console.log("The string does not end with 'somaiya.edu'");
      toast.warning("Please use somaiya.edu");
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
          localStorage.setItem("token", result.token);
          setUserName("");
          setPassword("");
          toast.success("Successfully Logged In")
          navigate("/home");
        } else {
          console.log(result.token);
        }
      } else {
        console.log(result);

      }

    } catch (error) {
      console.error(error);
      toast.error(error);
    }

  }


  return (
    <div className="login-main-div overflow-hidden">

      <div className="login-header justify-start pl-5 text-2xl text-red-500 ">
        Header
      </div>

{/* daksh ye div mene add kiya hai image and login ko ek container mein daalne k liye  */}
      <div className="flex md:space-x-14 lg:space-x-6 bg-[#f3f2f7] h-full justify-center">

      {/* ye img hai login card k baju wala */}

      <div>
        <img src="https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=" alt="help" className="h-[32rem] hidden md:block md:w-[58rem] lg:w-[48rem]  ml-8 mt-10 rounded" />
      </div>

      {/* This is login card */}
        <div className="mt-28 mb-[200px] hover:ring-4 ring-blue-950 ring-offset-4 rounded-[20px]  
      md:w-[33rem] md:ml-0 lg:w-[33rem] lg:ml-0">

          <form onSubmit={onSubmit} className="login-card ">

            <div className="input-group">
              {/* <label htmlFor="email" className="login-label ">Email ID</label> */}
              <input type="email" id="email"
                className="rounded py-1 text-center bg-gray-200 placeholder-black  border-b-2 border-black text-black "
                name="email" placeholder="Enter Your Mail" onChange={(e) => { setUserName(e.target.value) }} value={userName} required={true}></input>
            </div>

            <div className="input-group">
              {/* <label htmlFor="password" className="login-label">Password</label> */}
              <input type="password" id="password"
                className=" fa-solid fa-lock rounded py-1 text-center bg-gray-200 placeholder-black  border-b-2 border-black text-black "
                name="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} required={true} value={password}></input>
            </div>

            <div className="sm:ml-[0rem] md:ml-[0rem] lg:ml-[3.5rem] space-y-1">
              <div className="flex ">
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 mr-3" />
                OR
                <hr className="bg-black text-black w-[7rem] lg:w-[10rem] mt-3 ml-3" />
              </div>

              <div>Not an Account? <span onClick={()=>{navigate("/signup")}}>Signup</span></div>
            </div>

            <div className="sm:ml-[0rem] md:ml-[4rem] lg:ml-[10rem] bg-[#CCC9DC] border-2 border-blue-950 text-black px-10  font-bold py-0.5 rounded-lg text-xl font-serif hover:ring-2 ring-[#CCC9DC]">
              <button type="submit" className="login-submit-btn">
                Login
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>

  )
};

export default LoginComp;
