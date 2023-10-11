import React from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Popover, Progress } from 'antd';

const SingleChapter = (props) => {
  const { item, position } = props;
  const navigate = useNavigate();

  
  
  const content = (
    <div>
    {item.content}
    </div>
  );
  return (
    <Popover content={content} title="Title">
    <div className={`circle-div ${position}`} onClick={() => {
      localStorage.setItem("chapterId", item.id);
      localStorage.setItem("ChapterName", item.title);
      navigate("/subjects");
    }}>
    
        <div className="circle-border">
          <Progress
            type="circle"
            percent={40} // Set the percentage to 0 to hide it
            format={() => item.title}
          />
        </div>
  
    </div>
    </Popover>
  );
};

export default SingleChapter;
