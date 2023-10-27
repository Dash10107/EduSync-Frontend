import React, { useState } from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Popover, Progress } from 'antd';
// import gear from "../../../Assets/gear.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';
import { motion } from 'framer-motion';
import axios from "axios";
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

    // State to track whether the card is in edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [newModuleName, setNewModuleName] = useState(module?.name);
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = (e) => {
      e.stopPropagation();
      setIsEditing(false);
  
   // Make a PUT request to update the module details
   
    // Make a PUT request to update the module details with the authorization token in the headers
    axios.put(
      `https://edusync-backend.onrender.com/admin/updateModule/${module.id}`,
      { name: newModuleName, description: module.description },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log("Response", response);
        module.name = newModuleName;
        setNewModuleName("");
        // Handle the success response here, update the UI, etc.
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
 
    };
  
    const handleDelete = () => {};
  
    const items = [
      {
        label: (
          <button
            className="dropdown-item advance dropLinkA "
            onClick={handleEditClick}
          >
            <EditIcon />
            &nbsp; Rename
          </button>
        ),
        key: "0",
      },
      {
        label: (
          <button className="dropdown-item advance dropLinkA " onClick={handleDelete}>
            <DeleteIcon />
            &nbsp; Delete
          </button>
        ),
        key: "5",
      },
    ];
  return (
  
    <div className={`main-chapter-div`}  >
      <Popover content={content} title={title}>
      <motion.div 
      
        initial={{ x: 0 }} // Initial position (off-screen to the right)
        animate={{   x:  hovered ? position==="left"? 500: position==="right" && -500 : 0 }}   // Target position (on-screen)
        transition={{ duration: 1 }}
      
      className={`outside-div  ${position} `} 
      onClick={() => {
        localStorage.setItem("adminChapterId", item.id);
        localStorage.setItem("adminChapterName", item.title);
        navigate("/admin/subchapter");
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
