import React, { useEffect } from 'react'
import ProfileComp from '../../Components/User/ProfileComp/ProfileComp'
import { useNavigate } from 'react-router-dom';

const ContentProfile = () => {
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
      <ProfileComp/>
    </div>
  )
}

export default ContentProfile
