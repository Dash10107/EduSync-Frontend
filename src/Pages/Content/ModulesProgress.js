import React, { useEffect } from 'react'
//import ModulesProg from '../../Components/ProfileModulesComp/ModulesProg'
import { useNavigate } from 'react-router-dom';
import ModulesProg from '../../Components/User/ProfileModulesComp/ModulesProg';

const ModulesProgress = () => {
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
    
       <ModulesProg />
    </div>
  )
}

export default ModulesProgress
