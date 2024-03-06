import React, { useEffect } from 'react'
import ProfileClassComp from '../../Components/User/ProfileClassroom/ProfileClassroomComp'
import { useNavigate } from 'react-router-dom';

const ClassroomProgress = () => {
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
   <ProfileClassComp/>
    </div>
  )
}

export default ClassroomProgress
