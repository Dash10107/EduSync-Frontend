import React from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Popover, Progress } from 'antd';
import gear from "../../../Assets/gear.png";

const SingleChapter = (props) => {
  const { item, position,progress } = props;
  const navigate = useNavigate();
  
  
  const content = (
    <div>
    {item.content}
    </div>
  );
  return (
    <Popover content={content} title="Title">
   <div className={`outside-div ${position}`} onClick={() => {
      localStorage.setItem("chapterId", item.id);
      localStorage.setItem("ChapterName", item.title);
      navigate("/subjects");
    }}>
    <div className={`circle-div `} >
     {/* <div className="settings-icon"><img src={gear} alt="" /></div> */}
            <div className="circle-border">
            
        {progress? (    <Progress
              type="circle"
              size={250}
              strokeWidth={10}
              percent={progress.progressPercentage}
              format={() => item.title}
            />):(
               <Progress
            type="circle"
            percent={0} // Set the percentage to 0 to hide it
            format={() => item.title}
          />
            )}
         
        </div>
       
  
    </div>
    </div>
    </Popover>
  );
};

export default SingleChapter;
