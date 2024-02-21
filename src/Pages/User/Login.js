import React, { useEffect } from 'react'
import LoginComp from '../../Components/User/LoginComp/LoginComp'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if( !localStorage.getItem("token") || localStorage.getItem("token") === ""){
      return
    }else{
     navigate("/admin/home")
    }
},[])
  return (
    <div>
<LoginComp/>
    </div>
  )
}

export default Login
