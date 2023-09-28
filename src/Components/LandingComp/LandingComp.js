import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

const LandingComp = () => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate("/login")}}>
      LandingComp
      <ToastContainer/>
    </div>
  )
}

export default LandingComp
