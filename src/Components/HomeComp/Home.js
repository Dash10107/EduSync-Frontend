import React, { useEffect, useState } from "react"
import  "./Home.css"
import axios from "axios";
import SingleCard from "./singleCard/singleCard";


const Home = (props) => {
    const [modules,setModules] = useState([]);
    const fetchModules = async()=>{
try {
      await axios.get('http://localhost:5000/module/',{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }).then(response => {
        console.log("Response",response);
        
        if(response.status===200){

          const modulesData = response?.data;
          setModules(modulesData);
          console.log(modules);
          

        }else{console.log("Status Code",response.status);
        }
       
      })
    } catch (error) {
      console.log("error", error)
    }
    }
    useEffect(()=>{
fetchModules();
    },[])


  return (
    <div>
    <h1>Modules</h1>
    <br></br>
    <ul>
      {modules.map((module) => (
       <SingleCard module={module}/>
      ))}
    </ul>
  </div>
  )
};

export default Home;
