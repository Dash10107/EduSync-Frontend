import React from "react"
import  "./singleCard.css"
import { useNavigate } from "react-router-dom";

const SingleCard = (props) => {
    const {module,style} = props;
  const navigate = useNavigate();
    
  return (
   
        <div key={module.id} className="single-card" style={style}
        onClick={()=>{
        localStorage.setItem("moduleId",module.id);
        navigate("/chapters")
        }}>
          <h3 className="single-card-title">{module.name}</h3>
        </div>
   
  )
};

export default SingleCard;
