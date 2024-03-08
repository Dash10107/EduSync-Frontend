import React, { useEffect } from 'react'
//import ProfileComp from '../../Components/ProfileComp/ProfileComp'
import { useNavigate } from 'react-router-dom';
// import ProfileComp from '../../Components/User/ProfileComp/ProfileComp';
import ProfileMain from '../../Components/User/ProfileMain/ProfileMain';

const Profile = () => {
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
      <ProfileMain/>
    </div>
  )
}

export default Profile



