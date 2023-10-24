import React, { useEffect, useState } from "react"
import  "./Chapter.css"
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import SingleChapter from "./singleChapter/SingleChapter";
import { useNavigate } from "react-router-dom";
import Zigzag from "./Zigzag";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const ChapterComp = (props) => {
  const navigate = useNavigate();
  const moduleId = localStorage.getItem("moduleId");
  const [chapters,setChapters] = useState([]);
  const [module,setModule] = useState({});
  const [loading,setLoading] = useState(true);
  const [progressPercentages, setProgressPercentages] = useState([]);

  const fetchProgressPercentages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/progress/${moduleId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        setProgressPercentages(response.data.progressPercentages);
      } else {
        console.log("Status Code", response.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProgressPercentages();
  }, []);


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

  
  return (
    <div className="chapters-main">
    <Navbar />
    {loading ? (
      <p>Loading</p>
    ) : (
      <div>
        <div className="subject-header">
          <h3 className="subject-heading-text"> 
          
          <div className="goBack">
    <p className="back-icon" onClick={()=>{navigate("/home")}}><ArrowBackIosIcon fontSize="large"/> </p>
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
    progress={progressPercentages[index] || null} // Pass progress or null
  />

  </div>
  
))}

</ul>

      </div>
    )}
  </div>
  )
};

export default ChapterComp;
