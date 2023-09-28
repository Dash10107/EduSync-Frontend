import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

const LandingComp = () => {
  const navigate = useNavigate();
  //code to ping backend
    useEffect(()=>{
try {
       axios.get('http://localhost:5000/').then(res => {
      console.log(res.data.message);
      })
    } catch (error) {
      console.log("error", error)
    }
  },[])

  
  return (
    <div onClick={()=>{navigate("/login")}}>
      LandingComp
      <ToastContainer/>
    </div>
  )
}

export default LandingComp
