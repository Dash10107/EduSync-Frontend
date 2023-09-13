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

    let loginInfo={
      email:userName,
      password:password
    }
       console.log(loginInfo);
try{
      const response = await fetch('http://localhost:5000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo)

        });

        const result = await response.json();
        console.warn("Result", result);

        if(result.success){
        if(result.token){
          localStorage.setItem("token",result.token);
          setUserName("");
          setPassword("");
          toast.success("Successfully Logged In")
          navigate("/");
        }else{
          console.log(result.token);
        }
        }else{
          console.log(result);
          
        }

      } catch (error) {
        console.error(error);
        toast.error(error);
      }

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
              <input type="email" id="email" className="login-input" name="email" onChange={(e)=>{setUserName(e.target.value)}} value={userName} required={true}></input>
            </div>
            <div className="input-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input type="password" id="password" className="login-input" name="password" onChange={(e)=>{setPassword(e.target.value)}} required={true} value={password}></input>
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
        <ToastContainer/>
      </div>
    
  )
};

export default LoginComp;
