import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeComp from '../../Components/HomeComp/HomeComp';

const HomePage = () => {
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
    <HomeComp/>
    <br></br>
      <button onClick={()=>{navigate("/content")}}> Go to Content</button>
      <br></br>
      <button onClick={()=>{navigate("/classrooms")}}> Go to Classroom</button>
    </div>
  )
}

export default HomePage
