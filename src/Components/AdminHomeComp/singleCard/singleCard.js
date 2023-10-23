import React from "react"
import  "./singleCard.css"
import { useNavigate } from "react-router-dom";

const SingleCard = (props) => {
    const {module,style,tiltedColor} = props;

    
  const navigate = useNavigate();
    
  return (
   <div>
        <div key={module?.id} className="single-card" style={style}
        onClick={()=>{
        // localStorage.setItem("moduleId",module?.id);
        // localStorage.setItem("SubjectName",module?.name);
        // navigate("/chapters")
        }}>
        <div className="tilted-div" style={tiltedColor} ></div>
          <h3 className="single-card-title">{module?.name}</h3>
        </div>
    </div>
   
  )
};

export default SingleCard;
