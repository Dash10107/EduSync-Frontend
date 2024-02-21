import React, { useEffect } from 'react'
import ChapterComp from '../../Components/Content/ChaptersComp/ChapterComp'
import { useNavigate } from 'react-router-dom';

const Chapters = () => {
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
      <ChapterComp/>
    </div>
  )
}

export default Chapters
