import React, { useEffect, useState } from "react"
import  "./Chapter.css"
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import SingleChapter from "./singleChapter/SingleChapter";

const ChapterComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const [chapters,setChapters] = useState([]);
const [module,setModule] = useState({});
  const [loading,setLoading] = useState(true);

  const fetchChapters=async()=>{
    try {
      await axios.get(`http://localhost:5000/module/chapters/${moduleId}`,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }).then(response => {
        console.log("Response",response);
        
        if(response.status===200){
        setChapters(response.data.chapters)
        setModule(response.data.module);
        

        }else{console.log("Status Code",response.status);
        }
       
      })
    } catch (error) {
      console.log("error", error)
    }finally {
      // Set loading to false when data fetching is complete
      setLoading(false);
    }
  }

useEffect(()=>{
fetchChapters();
},[])

// useEffect(()=>{
//   console.log(chapters);
  
// },[chapters])
useEffect(()=>{
  console.log(module);
  
},[module])
  
  return (
    <div className="chapters-main">
    <Navbar />
    {loading?(
      <p>Loading</p>
    ):(
      <div>
      <div className="subject-header">
      <h3 className="subject-heading-text">{module.name}</h3>
      </div>
    
      <ul>
        {chapters?.map((item) => (
         <SingleChapter item={item} />
        ))}
        <br/>
      </ul>
      </div>)}
      
     
    </div>
  )
};

export default ChapterComp;
