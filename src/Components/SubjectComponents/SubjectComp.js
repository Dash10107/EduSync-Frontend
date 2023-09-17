import React, { useEffect } from "react"
import  "./SubjectComp.css"
import Navbar from "../../Layouts/Navbar/Navbar";
import axios from "axios";

const SubjectComp = (props) => {
    console.log("ModuleId",localStorage.getItem("moduleId"));
    console.log("ChapterId",localStorage.getItem("chapterId"));    
  return (
    <div>
    <Navbar/>
      Subject Comp
    </div>
  )
};

export default SubjectComp;
