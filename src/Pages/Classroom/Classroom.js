import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Components/Classroom/ClassroomDashboard/Dashboard';

const Classroom = () => {
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
    
     <Dashboard/>

    </div>
  )
}

export default Classroom
