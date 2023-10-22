import React, { useEffect, useState } from 'react'
import Home from '../Components/HomeComp/Home'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if( !localStorage.getItem("token") && localStorage.getItem("token") === ""){
     navigate("/login"); 
    }else{
      return
    }
},[])
  return (
    <div>
      <Home/>
    </div>
  )
}

export default HomePage
