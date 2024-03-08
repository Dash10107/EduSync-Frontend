import React, { useEffect } from 'react'
import FeedbackComp from '../../Components/User/ProfileFeedback/FeedbackComp'
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
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
    <FeedbackComp/>
    </div>
  )
}

export default Feedback
