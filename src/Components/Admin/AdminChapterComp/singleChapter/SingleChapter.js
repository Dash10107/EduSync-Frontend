import React, { useState } from "react";
import "./SingleChapter.css";
import { useNavigate } from "react-router-dom";
import { Dropdown, Popover, Progress } from 'antd';
// import gear from "../../../Assets/gear.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';
import { motion } from 'framer-motion';
import axios from "axios";
const SingleChapter = (props) => {
  const { item,fetchChapters, position, progress } = props;
  const moduleId = localStorage.getItem("adminModuleId");
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const content = (
    <div className="popover-content-admin">
      {item.content}
    </div>
  );
  
  const title = (
    <div className="popover-title-admin">
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
    const [newModuleName, setNewModuleName] = useState(item?.title);
  
    const handleEditClick = (e) => {
      e.stopPropagation();
      setIsEditing(true);
    };
  
    const handleSaveClick = (e) => {
      e.stopPropagation();
      setIsEditing(false);
      // Make a PUT request to update the module details with the authorization token in the headers
    axios.put(
      `https://edusync-backend.onrender.com/admin/updateChapter/${moduleId}/${item.id}`,
      { title: newModuleName },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        console.log("Response", response);
        item.title = newModuleName;
        setNewModuleName("");
        fetchChapters();
        // Handle the success response here, update the UI, etc.
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
 
    };
  
    const handleDelete = async(e) => {
      e.stopPropagation();
      // Make the DELETE request to delete the chapter
await axios.delete(`https://edusync-backend.onrender.com/admin/deleteChapter/${moduleId}/${item.id}`, {
  headers: {
    Authorization: localStorage.getItem("token"), // Replace with your authorization token
  },
})
  .then((response) => {
    console.log("Chapter deleted successfully:", response.data);
    fetchChapters();
  })
  .catch((error) => {
    console.error("Error deleting chapter:", error);
  });
    };
  
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
  
    <div className={`main-chapter-div-admin`}  >
      <Popover content={content} title={title}>
      <motion.div 
      
        initial={{ x: 0 }} // Initial position (off-screen to the right)
        animate={{   x:  hovered ? position==="left"? 500: position==="right" && -500 : 0 }}   // Target position (on-screen)
        transition={{ duration: 1 }}
      
      className={`outside-admin-div  ${position} `} 
      onClick={() => {
        localStorage.setItem("adminChapterId", item.id);
        localStorage.setItem("adminChapterName", item.title);
        navigate("/admin/subchapter");
      }}
      onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
                  <Dropdown menu={{ items }} trigger={["contextMenu"]} open={null}>
            
          
        {/* <div className="background-wheel" ref={wheelRef}> <img src={gear} alt=""/></div> */}
        <div className={`circle-div-admin `} >
        <MoreVertSharpIcon />
          <div className="item-text-container">

            {progress ? (
              <Progress
                type="circle"
                size={isMobile ? 124 : 240}
                strokeWidth={10}
                percent={progress.progressPercentage}
                style={{ opacity: "0.7", zIndex: "0" }}
                format={() => (
             isEditing ?  <input
            type="text"
            className="edit-input"
            value={newModuleName}
            onChange={(e) => { setNewModuleName(e.target.value)}}
            onClick={(e)=>{e.stopPropagation();}}
          />:
                <p className="item-text-admin">{item.id}</p>)}
              />
            ) : (
              <Progress
                type="circle"
                size={isMobile ? 124 : 248}
                strokeWidth={10}
                percent={0}
                format={() => (
             isEditing ? <div className="fit-middle-input"> <input
            type="text"
            className="edit-input-small"
            value={newModuleName}
            onChange={(e) => { setNewModuleName(e.target.value)}}
            
            onClick={(e)=>{e.stopPropagation();}}
          />
                   <button className="save-button" onClick={handleSaveClick}>
           &nbsp;&nbsp; <TrendingFlatSharpIcon/>
          </button></div>:
                <p className="item-text-admin">{item.id}</p>)}              />
            )}

          </div>

        </div>
</Dropdown>
      </motion.div>
      
      {hovered && (
            <div className={`slide-text-${slideDirection}-admin`}>
              <p className="item-title-admin">{item.title}</p>
            </div>
          )}
          </Popover>
      </div>


  );
};

export default SingleChapter;