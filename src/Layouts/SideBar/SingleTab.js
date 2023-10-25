import React from 'react'
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom';
const SingleTab = (props) => {
    const {module} = props;
    const navigate = useNavigate();
  return (
    <div>
              <div key={module.id} className="single-tab" 
        onClick={()=>{
        localStorage.setItem("moduleId",module.id);
        localStorage.setItem("SubjectName",module.name);
        navigate("/chapters")

        }}>
         {module.name}   
        </div>
    </div>
  )
}

export default SingleTab
