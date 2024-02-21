import React from 'react'
import { useNavigate } from 'react-router-dom';

const Classroom = () => {
    const navigate = useNavigate();
  return (
    <div>
      Classrooms Dashboard Page 
      <br></br>
      <button onClick={()=>{navigate("/classrooms/single")}}> Go to Individual Classroom </button>
      <br></br>
      <button onClick={()=>{navigate("/content")}}> Go to Content</button>
    </div>
  )
}

export default Classroom
