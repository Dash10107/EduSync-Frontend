import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SingleClassroom from '../../Components/Classroom/SingleClassroom/SingleClassroom';

const ClassroomSingle = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if( !localStorage.getItem("token") || localStorage.getItem("token") === ""){
     navigate("/login"); 
    }else{
      return
    }
},[])
  return (
    // <div>
    //  <button onClick={()=>{navigate("/classrooms/test")}}> Go to Give Surprise Test </button>
    //   <br></br>
    //  View  Posts 
    //  View Test Scores in a Modal 
    // </div>
    <SingleClassroom/>
  )
}

export default ClassroomSingle
