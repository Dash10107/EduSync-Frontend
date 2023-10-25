import React, { useEffect, useState } from "react"
import  "./Sidebar.css"
import axios from "axios";
import SingleTab from "./SingleTab";
import { useNavigate } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
const Sidebar = (props) => {
    const navigate=useNavigate();
  const [modules, setModules] = useState([]);
  
  const fetchModules = async () => {
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
    }
  }

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="sidebar">
    <button className="home-button" onClick={()=>{navigate("/home")}}> <HomeRoundedIcon/> <p>Home</p> </button>
    <hr className="bg-black text-black h-0.5 mb-2 mr-3"></hr>
      <ul className="sidelist">
        {modules.map(module => (
          <SingleTab key={module.id} module={module} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
