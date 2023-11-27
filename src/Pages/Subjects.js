import React, { useEffect } from "react"
import SubjectComp from "../Components/SubjectComponents/SubjectComp";
import { useNavigate } from "react-router-dom";


const Subjects = (props) => {
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
      <SubjectComp/>
    </div>
  )
};

export default Subjects;
