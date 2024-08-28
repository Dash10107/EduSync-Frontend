import React, { useEffect, useState } from "react"
import  "./AdminChapterComp.css"
import axios from "axios";
import Navbar from "../../../Layouts/Navbar/Navbar";
import SingleChapter from "./singleChapter/SingleChapter";
import { useNavigate } from "react-router-dom";
import Zigzag from "./Zigzag";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Progress } from "antd";
import addChapImg from "../../../Assets/addChap.png";
import ModalComp from "./AddChapterModel/Modal";
import { Alert, Snackbar } from "@mui/material";
const AdminChapterComp = (props) => {
  const navigate = useNavigate();
  const moduleId = localStorage.getItem("adminModuleId");
  const [chapters,setChapters] = useState([]);
  const [module,setModule] = useState({});
  const [loading,setLoading] = useState(true);
  const [addChapterOpen,setChapterOpen]=useState(false);
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }
  const fetchChapters=async()=>{
    try {
      await axios.get(`https://edu-sync-backend.vercel.app/module/chapters/${moduleId}`,{
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

    const isMobile = window.innerWidth <= 600;

    const handleSubmit = async (e,chapterName,chapterDescription) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`https://edu-sync-backend.vercel.app/admin/addChapter/${moduleId}`, {
            title:chapterName,
            content:chapterDescription,
            subtopics:[]
          },
          {
            headers:{
              Authorization: localStorage.getItem("token"), // Include your authorization token here
   
            }
          });
    
          if (response.data.success) {
            
            setErrors({heading:'Added chapter successfully'});
            setToastOpen(true)
            setChapterOpen(false);
            fetchChapters();
          } else {
            setErrors({error:'Failed to add module'});
            setToastOpen(true);
          }
        } catch (error) {
          console.error('Error:', error);
          setErrors({heading:'An error occurred while adding the module',error});
          setToastOpen(true);
        }
      };


    return (
    <div className="chapters-main">
    <Navbar isAdmin={true} />
    {loading ? (
      <p>Loading</p>
    ) : (
      <div>
        <div className="subject-header">
          <h3 className="subject-heading-text"> 
          
          <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/admin/home")}}><ArrowBackIosIcon fontSize="large"/> </p>
     <p>{module.name}</p>
     </div></h3>
        </div>

        <ul className="zigzag-list">
        {chapters?.map((item, index) => (
          <div className="single-chapter">
          <Zigzag   position={index === 0 ? "center" : (index % 2 === 1 ? "left" : "right")}/>
  <SingleChapter
    item={item}
    key={item.id}
    position={index === 0 ? "center" : (index % 2 === 1 ? "left" : "right")}
    fetchChapters={fetchChapters}
   
  />

  </div>
  
))}
<div className="single-chapter"
onClick={()=>{setChapterOpen(true)}}
>
<div
className="main-chapter-div"
>
<div className="outside-div  center ">
<div className="circle-div-add" >
          <div className="item-text-container">
          <Progress
                type="circle"
                size={isMobile ? 124 : 248}
                strokeWidth={10}
                percent={0}
               format={()=>(<div className="addChapDiv"><img className="addChapImg" src={addChapImg} alt=""/></div>)}
              />
          </div>
          </div>
</div>

</div>
</div>
</ul>

      </div>
    )}

    <ModalComp
          
          modalOpen={addChapterOpen}
          setModalOpen={setChapterOpen}
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

export default AdminChapterComp;
