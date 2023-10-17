import React, { useEffect, useState } from "react"
import  "./ModulesProgress.css"
import Navbar from "../../Layouts/Navbar/Navbar";
import axios from "axios";
const ModulesProg = (props) => {

  const [progressModules,setProgressModules] = useState([]);
  const fetchMainProgress = async()=>{
    try {
      await axios.get('http://localhost:5000/progress/modules',{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }).then(response => {
        console.log("Response",response);
        
        if(response.status===200){
          console.log("Response for Progress", response);
          setProgressModules(response.data?.allModulesProgress);
        }else{console.log("Status Code",response.status);
        }
       
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(()=>{
    fetchMainProgress()
  },[])
  return (
    <div>
    <Navbar/>
    <h2>Modules Progress</h2>
      <ul>
        {progressModules?.map((module, index) => (
          <li key={index}>
            <h3>{module.moduleName}</h3>
            <p>Progress Percentage: {module.moduleProgressPercentage}%</p>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default ModulesProg;
