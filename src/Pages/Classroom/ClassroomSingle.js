import React from 'react'
import { useNavigate } from 'react-router-dom';

const ClassroomSingle = () => {
    const navigate = useNavigate();
  return (
    <div>
     <button onClick={()=>{navigate("/classrooms/test")}}> Go to Give Surprise Test </button>
      <br></br>
     View  Posts 
     View Test Scores in a Modal 
    </div>
  )
}

export default ClassroomSingle
