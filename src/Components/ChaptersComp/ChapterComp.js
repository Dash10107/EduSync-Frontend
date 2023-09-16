import React, { useEffect, useState } from "react"
import  "./Chapter.css"
import axios from "axios";

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
    <div>
    {loading?(
      <p>Loading</p>
    ):(
      <div>
      <h3>{module.name}</h3>
      <p>{module.description}</p>
      <br/>
      <br/>
      <ul>
        {chapters?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
        <br/>
      </ul>
      </div>)}
     
    </div>
  )
};

export default ChapterComp;
