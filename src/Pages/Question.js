import React, { useEffect } from 'react'
import QuestionComp from '../Components/QuestionsComp/QuestionComp'
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if( !localStorage.getItem("token") && localStorage.getItem("token") === ""){
     navigate("/login"); 
    }else{
      return
    }
},[])
  return (
    
  <QuestionComp/>
  )
}

export default Question
