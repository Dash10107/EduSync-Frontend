import React from "react"
import  "./SingleChapter.css"
import { useNavigate } from "react-router-dom";

const SingleChapter = (props) => {
    const {item} = props;
  const navigate = useNavigate();
    return (
  <div onClick={()=>{
    localStorage.setItem("chapterId",item.id);
    localStorage.setItem("ChapterName",item.title);
    navigate("/subjects");
  }}>
      <li key={item.id}>{item.title}</li>
<br/>
</div>
  )
};

export default SingleChapter;
