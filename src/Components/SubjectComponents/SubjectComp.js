import React, { useEffect, useState } from "react"
import  "./SubjectComp.css"
import Navbar from "../../Layouts/Navbar/Navbar";
import axios from "axios";
import ListView from "./ListView/ListView";
import GridView from "./GridView/GridView";

import QuizIcon from '@mui/icons-material/Quiz'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import Loader from "../../Layouts/Loader/Loader";

const SubjectComp = (props) => {
  const navigate = useNavigate();
  const moduleId = localStorage.getItem("moduleId");
  const chapterId = parseInt(localStorage.getItem("chapterId"));
  const ChapterName = localStorage.getItem("ChapterName");
  const SubjectName = localStorage.getItem("SubjectName")
    const [chapters,setChapters] = useState([]);
    const [subchapters,setSubChapters] = useState([]);
      const [loading,setLoading] = useState(true);
      const [listView,setListView] = useState(false);
      const [videoUrls, setVideoUrls] = useState([]);
      const [videosName,setVideosName] = useState([]);
      const fetchChapters=async()=>{
        setLoading(true);
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
    


  
const fetchVideos = async () => {
  setLoading(true);
  try {
    // Make a request to your backend route to get video URLs.
    const response = await fetch(`https://edusync-backend.onrender.com/videos/${SubjectName}/${ChapterName}`, {
      method: 'POST', // You may need to adjust the request method
      body: JSON.stringify({
          "token":{
          "access_token": "ya29.a0AfB_byCD3BU3FP-WfnA8dCBtupKiQm-XIT2WmRgsi1T8DzPztW_6K6f-W2ONyDPlCFMReXlP5vhmG3VqNeq3Oc1vFVE4nys7PKslh1GBsNQ8HzWwUKbio9LddpFLGzDujxteEnaW0Nij1JcjH1UmxfUnKfGHiYPfWRqKaCgYKAVMSARASFQGOcNnCuk58Eqt-ilggoZ68Z_d5UA0171",
          "refresh_token": "1//0gWK8RdEAEhfNCgYIARAAGBASNwF-L9IrjBgc8JrfXfkTCVzyeQ-8vUVH7nr4ZviNCngQUhZtpFyKJohUsYgNvr6EDLpY1IWmqEc",
          "scope": "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file",
          "token_type": "Bearer",
          "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MjYzZDA5NzQ1YjUwMzJlNTdmYTZlMWQwNDFiNzdhNTQwNjZkYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDEyMzE4OTgzMy01YzRmNHVpZWRxOTRsbjVxY2tmbDc3bHR1b21kM3UyZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQwMTIzMTg5ODMzLTVjNGY0dWllZHE5NGxuNXFja2ZsNzdsdHVvbWQzdTJlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE3MzA1NTU1MDg0NjYzNjU2NzUyIiwiYXRfaGFzaCI6IkRENjZMZ1BvQW5sTnh2WTg1ckREdEEiLCJuYW1lIjoiRWR1IFN5bmMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWRSc2FqZjJ6elNXcGs4UGlsNi1YWDJSTm5UYUlEZ3NVMFQtbnA4LVJGPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkVkdSIsImZhbWlseV9uYW1lIjoiU3luYyIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNjk3MzczMjk1LCJleHAiOjE2OTczNzY4OTV9.DBzuUIrVtUqavt1HMcUZSpnKC3wq83ad0HQXBq0LTpsebUKNbJ9KDcwm_meTeCJVkdsvNROyob2SUe5z8J-pVdB9NA11GLthMJG2rVPP7ib9TedmmYab3ADylbWRSZ_7VpBAiVOb2uYvXMAQvNHzfoEqmfgz_-2APozkwR6gtl7BYOnhturATtGNbSBBMk7WqtZRJyQgau9AUjYAAIy7prMlX6yn0FlYqrjROz5qXpszORukx6gtDl7fUd5sJ3Oksm8AGxw5ap_2UlanpaMhV0pRRnH4Tfzpun0xZXZPOMDYhxHk3psCveMAAbcYO7PLKWQfDpepSKry6QegZAeiKQ",
          "expiry_date": 1697376894145
      }
      }), // Add your authentication token here
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video URLs');
    }

    const data = await response.json();
    console.log('Response',data);
    setVideosName(data.files);
    setVideoUrls(data.videoUrls);
  } catch (error) {
    console.error('Error fetching video URLs:', error);
  }finally{
    setLoading(false);
  }
};

useEffect(() => {
  fetchVideos();
}, []);
    
  return (
    <div>
    <Navbar/>
    <div className="subchapter-heading">
    <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/chapters")}}><ArrowBackIosIcon fontSize="large"/> </p>
      <h3 className="subject-heading-text">{ChapterName}</h3> 
      </div>
      <div >
    
       <h3 className="subject-heading-text" onClick={()=>{setListView(!listView)}}> {listView ? (< QuizIcon fontSize="large"/>):(<OndemandVideoIcon fontSize="large"/>)}</h3>
   
      </div>

</div>
<div>

</div>
        {
          loading ? (<Loader/>): 
          listView?(<ListView videoUrls={videoUrls} videosName={videosName}  />):(<GridView subchapters={subchapters}/>)
        }
        
 
    </div>
  )
};

export default SubjectComp;
