import React, { useEffect } from 'react'
import ProfileComp from '../Components/ProfileComp/ProfileComp'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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
      <ProfileComp/>
    </div>
  )
}

export default Profile



