import React, { useEffect, useRef, useState } from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Popover, Progress } from 'antd';
// import gear from "../../../Assets/gear.png";
import { motion } from 'framer-motion';
const SingleChapter = (props) => {
  const { item, position, progress } = props;
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const content = (
    <div className="popover-content">
      {item.content}
    </div>
  );
  
  const title = (
    <div className="popover-title">
      {item.title}
    </div>
  );
  const isMobile = window.innerWidth <= 600;
  const slideDirection = position === "left" ? "right" : "left";

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
  
    <div className={`main-chapter-div`}  >
      <Popover content={content} title={title}>
      <motion.div 
      
        initial={{ x: 0 }} // Initial position (off-screen to the right)
        animate={{   x:  hovered ? position==="left"? 500: position==="right" && -500 : 0 }}   // Target position (on-screen)
        transition={{ duration: 1 }}
      
      className={`outside-div  ${position} `} 
      onClick={() => {
        localStorage.setItem("chapterId", item.id);
        localStorage.setItem("ChapterName", item.title);
        navigate("/subjects");
      }}
      onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {/* <div className="background-wheel" ref={wheelRef}> <img src={gear} alt=""/></div> */}
        <div className={`circle-div `} >
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

      </motion.div>
      {hovered && (
            <div className={`slide-text-${slideDirection}`}>
              <p className="item-title">{item.title}</p>
            </div>
          )}
          </Popover>
      </div>


  );
};

export default SingleChapter;
