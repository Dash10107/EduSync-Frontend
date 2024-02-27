import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeComp from '../../Components/HomeComp/HomeComp';

const HomePage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      if( !localStorage.getItem("token") || localStorage.getItem("token") === ""){
       navigate("/login"); 
      }else{
        return
      }
  },[])
  return (
    <div>
    <HomeComp/>

    </div>
  )
}

export default HomePage
