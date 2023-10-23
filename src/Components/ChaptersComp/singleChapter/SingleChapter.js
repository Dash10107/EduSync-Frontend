import React from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Popover, Progress } from 'antd';
import gear from "../../../Assets/gear.png";

const SingleChapter = (props) => {
  const { item, position, progress } = props;
  const navigate = useNavigate();

  const content = (
    <div>
      {item.content}
    </div>
  );

  const isMobile = window.innerWidth <= 600;
  const showTitleOnLeft = position === "right" && isMobile;
  const showTitleOnRight = position === "left" && isMobile;

  return (
    <Popover content={content} title={item.title}>
    <div className="main-chapter-div">
      <div className={`outside-div ${position}`} onClick={() => {
        localStorage.setItem("chapterId", item.id);
        localStorage.setItem("ChapterName", item.title);
        navigate("/subjects");
      }}>
        <div className="background-wheel"> <img src={gear} alt=""/></div>
        <div className={`circle-div `} >
          <div className="item-text-container">

            {progress ? (
              <Progress
                type="circle"
                size={isMobile ? 124 : 248}
                strokeWidth={10}
                percent={progress.progressPercentage}
                style={{ opacity: "0.7", zIndex: "0" }}
                format={() => (<p className="item-text">{item.id}</p>)}
              />
            ) : (
              <Progress
                type="circle"
                size={isMobile ? 124 : 248}
                strokeWidth={10}
                percent={0}
                format={() => (<p className="item-text">{item.id}</p>)}
              />
            )}

          </div>
        </div>
      </div>
     
      </div>
    </Popover>
  );
};

export default SingleChapter;

// {showTitleOnLeft ? (
//   <div className="left-text-container">
//     <p className="item-title">{item.title}</p>
//   </div>
// ):showTitleOnRight?(
//   <div className="right-text-container">
//     <p className="item-title">{item.title}</p>
//   </div>
// ):(
//   <div className="center-text-container">
//     <p className="item-title">{item.title}</p>
//   </div>
// )}