import React from 'react'
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom';
const SingleTab = (props) => {
    const {module,classroom,onClose} = props;
    const navigate = useNavigate();


  return (
    <div>
    {classroom?(
      <div key={classroom.code} className="single-tab" 
        onClick={()=>{
        localStorage.setItem("ClassroomCode",classroom.code);
        localStorage.setItem("ClassroomName",classroom.name);
          navigate("/classrooms/single");
          onClose();
        }}>
         {classroom.name}   
        </div>
    ):(
      <div key={module.id} className="single-tab" 
        onClick={()=>{
        localStorage.setItem("moduleId",module.id);
        localStorage.setItem("SubjectName",module.name);
          navigate("/chapters");
          onClose();
        }}>
         {module.name}   
        </div>
    )}

              
    </div>
  )
}

export default SingleTab
