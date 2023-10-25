import React, { useEffect, useState } from "react"
import  "./AdminSubChapter.css"
import Navbar from "../../Layouts/Navbar/Navbar";
import axios from "axios";

import GridView from "./GridView/GridView";


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ModalComp from "./AddSubChapterModel/Modal";
import { Alert, Snackbar } from "@mui/material";
const AdminSubComp = (props) => {
  const navigate = useNavigate();
  const moduleId = localStorage.getItem("adminModuleId");
  const chapterId = parseInt(localStorage.getItem("adminChapterId"));
  const ChapterName = localStorage.getItem("adminChapterName");

    const [chapters,setChapters] = useState([]);
    const [subchapters,setSubChapters] = useState([]);
  

      const fetchChapters=async()=>{
        try {
          await axios.get(`https://edusync-backend.onrender.com/module/chapters/${moduleId}`,{
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
        }
      }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          setToastOpen(false);
          return;
        }
      }
    useEffect(()=>{
    fetchChapters();
    },[])
    
    useEffect(()=>{
      console.log(chapters);
      console.log(subchapters);
      
    },[chapters,subchapters])
    




    const [subChapterOpen,setSubChapterOpen]=useState(false);
    const [errors, setErrors] = useState({});
    const [toastOpen, setToastOpen] = useState(false);
    const handleSubmit = async (e,subtopicName) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`https://edusync-backend.onrender.com/admin/addSubtopic/${moduleId}/${chapterId}`, {
          name:subtopicName, 
        },
        {
          headers:{
            Authorization: localStorage.getItem("token"), // Include your authorization token here
 
          }
        });
  
        if (response.data.success) {
          
          //  alert('Subchapter added successfully');
          setSubChapterOpen(false);
          window.location.reload();
        } else {
          setErrors({error:'Failed to add subchapter'});
          setToastOpen(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({heading:'An error occurred while adding the module',error});
        setToastOpen(true);
      }
    };
    
  return (
    <div>
    <Navbar isLogin={true}/>
    <div className="subchapter-heading">
    <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/admin/chapter")}}><ArrowBackIosIcon fontSize="large"/> </p>
      <h3 className="subject-heading-text">{ChapterName}</h3> 
      </div>
      <div >
    
       <h3 className="subject-heading-text" onClick={()=>{setSubChapterOpen(true)}}>  <AddIcon fontSize="larger"/></h3>
   
      </div>

</div>
<div>

</div>
        
          <GridView subchapters={subchapters} setSubChapterOpen={setSubChapterOpen}/>
                
 <ModalComp
            modalOpen={subChapterOpen}
          setModalOpen={setSubChapterOpen}
          handleSubmit={handleSubmit}
 />
<Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {value}
                </li>
              ))}
            </ul>
          </Alert>
        </Snackbar>
    </div>
  )
};

export default AdminSubComp;
