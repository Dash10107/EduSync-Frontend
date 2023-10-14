import React, { useEffect, useState } from "react"
import  "./SubjectComp.css"
import Navbar from "../../Layouts/Navbar/Navbar";
import axios from "axios";
import ListView from "./ListView/ListView";
import GridView from "./GridView/GridView";
import GridViewIcon from '@mui/icons-material/GridView';
import MenuIcon from '@mui/icons-material/Menu';
const SubjectComp = (props) => {
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));
  const ChapterName = localStorage.getItem("ChapterName")
    const [chapters,setChapters] = useState([]);
    const [subchapters,setSubChapters] = useState([]);
      const [loading,setLoading] = useState(true);
      const [listView,setListView] = useState(false);
    
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
    <div className="subchapter-heading">
      <h3 className="subject-heading-text">{ChapterName}</h3> 
      <div >
    
       <h3 className="subject-heading-text" onClick={()=>{setListView(!listView)}}> {listView ? (<MenuIcon fontSize="large"/>):(<GridViewIcon fontSize="large"/>)}</h3>
   
      </div>
</div>
        {
          listView?(<ListView subchapters={subchapters}  />):(<GridView subchapters={subchapters}/>)
        }
        
 
    </div>
  )
};

export default SubjectComp;
