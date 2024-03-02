import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import TestComp from '../../Components/Classroom/TestComp/TestComp';

const SurpriseTest = () => {
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
     <TestComp/>

      
    </div>
  )
}

export default SurpriseTest
