import React, { useEffect, useState } from "react"
import  "./SubjectComp.css"
import Navbar from "../../Layouts/Navbar/Navbar";
import axios from "axios";
import SingleTopic from "./singleTopic/SingleTopic";

const SubjectComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));

    const [chapters,setChapters] = useState([]);
    const [subchapters,setSubChapters] = useState([]);
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
            setChapters(response.data.chapters);
            const chapter = response.data.chapters.find((chap) => chap.id === chapterId);            
            setSubChapters(chapter ? chapter.subtopics : []);
    
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
    
    useEffect(()=>{
      console.log(chapters);
      console.log(subchapters);
      
    },[chapters,subchapters])
    
    
  return (
    <div>
    <Navbar/>
      <h2>Subtopics</h2><br/>
      <ul>
        {subchapters?.map((subtopic) => (
         <SingleTopic subtopic={subtopic} />
        ))}
        
      </ul>
    </div>
  )
};

export default SubjectComp;
