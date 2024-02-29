import React, { useEffect, useState } from "react"
import  "./Sidebar.css"
import axios from "axios";
import SingleTab from "./SingleTab";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Loader from "../Loader/Loader";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SchoolIcon from '@mui/icons-material/School';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
const Sidebar = (props) => {
  const {onClose}=props;
    const navigate=useNavigate();
    const currentPath = window.location.pathname;
    const isClassroom = currentPath.startsWith("/classrooms");
  const [modules, setModules] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading,setLoading] = useState(false);
  const fetchModules = async () => {
    setLoading(true);
    try {

      await axios.get('https://edusync-backend.onrender.com/module/', {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {
          const modulesData = response?.data;
          setModules(modulesData);
          console.log(modules);
        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false);
    }
  }
  const fetchClassrooms = async () => {
    setLoading(true);
    try {

      await axios.get('https://edusync-backend.onrender.com/subadmin/classrooms/student', {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {
          const classroomsArray = response?.data?.classrooms;
          setClassrooms(classroomsArray);
          console.log(classroomsArray);
        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    isClassroom ?fetchClassrooms() : 
    fetchModules();
    
  }, []);

  return (
    <div className="sidebar">
    <button className="home-button" onClick={()=>{navigate("/home")}}> <HomeRoundedIcon/> <p>Home</p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/content")}}> <FolderCopyIcon/> <p>Content</p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/classrooms")}}> <SchoolIcon/> <p>Classrooms</p> </button>
    
    <button className="home-button" onClick={()=>{navigate("/noticeboard")}}> <DynamicFeedIcon/> <p>Noticeboard</p> </button>
    <hr className="bg-black text-black h-0.5 mb-2 mr-3"></hr>
      <ul className="sidelist">
        {
          !isClassroom ? (
          loading ? (<div className="loaderforsidebar"><Loader/></div>):
          modules.map(module => (
          <SingleTab key={module.id} module={module}  onClose={onClose}/>
          
        )) ):(
          loading ? (<div className="loaderforsidebar"><Loader/></div>):
          classrooms?.map(classroom => (
          <SingleTab key={classroom.code} classroom={classroom}  onClose={onClose}/>
          
        ))
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
