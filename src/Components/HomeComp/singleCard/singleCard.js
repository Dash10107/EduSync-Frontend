import React from "react"
import  "./singleCard.css"

const SingleCard = (props) => {
    const {module} = props;
  return (
   
        <li key={module.id}>
          <h3>{module.name}</h3>
          <p>{module.description}</p>
          <br></br>
        </li>
   
  )
};

export default SingleCard;
