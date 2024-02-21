import React, { useEffect, useState } from 'react'
import Content from '../../Components/Content/ContentComp/Content'
import { useNavigate } from 'react-router-dom';

const ContentPage = () => {
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
      <Content/>
    </div>
  )
}

export default ContentPage
