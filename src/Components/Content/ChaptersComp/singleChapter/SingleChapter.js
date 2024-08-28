import React, { useEffect, useRef, useState } from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Popover, Progress } from 'antd';
// import gear from "../../../Assets/gear.png";

const SingleChapter = (props) => {
  const { item, position, progress } = props;
  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 600;
  const slideDirection = position === "left" ? "left" : "right";


  return (
  
    <div className={`main-chapter-div`}       onClick={() => {
      localStorage.setItem("chapterId", item.id);
      localStorage.setItem("ChapterName", item.title);
      navigate("/subjects");
    }} >
    

        {/* <div className="background-wheel" ref={wheelRef}> <img src={gear} alt=""/></div> */}
        <div className={`circle-div ${position} `} >
          <div className="item-text-container">

            {progress ? (
              <Progress
                type="circle"
                size={isMobile ? 124 : 240}
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

   
      <div className={`slide-text-${slideDirection}`}>
              <p className="item-title">{item.title}</p>
              <div className="">
      {item.content}
    </div>
            </div>
            
    
      </div>


  );
};

export default SingleChapter;
