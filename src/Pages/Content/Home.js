import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeComp from '../../Components/HomeComp/HomeComp';

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div>
    <HomeComp/>
    <br></br>
      <button onClick={()=>{navigate("/classrooms")}}> Go to Content</button>
      <br></br>
      <button onClick={()=>{navigate("/content")}}> Go to Classroom</button>
    </div>
  )
}

export default HomePage
