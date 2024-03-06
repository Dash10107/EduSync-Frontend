import React, { useState } from "react";
import "./singleGrid.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';
import axios from "axios";
import { Dropdown } from "antd";

const SingleGrid = (props) => {
  const { subtopic,fetchChapters,subchapters } = props;
  const navigate = useNavigate();
  const chapterId = parseInt(localStorage.getItem("adminChapterId"));
  const moduleId = localStorage.getItem("adminModuleId");
    // State to track whether the card is in edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [newModuleName, setNewModuleName] = useState(subtopic?.name);
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleSaveClick = (e) => {
      e.stopPropagation();
      setIsEditing(false);
    
  // Find the subtopic to update by ID
  const updatedSubtopics = subchapters.map((sub) => {
    if (sub.id === subtopic.id) {
      return { ...sub, name: newModuleName };
    }
    return sub;
  });
      // Make a PUT request to update the chapter's subtopics with the new data
      axios.put(
        `https://edusync-backend.onrender.com/admin/updateChapter/${moduleId}/${chapterId}`,
        {
          subtopics:updatedSubtopics
          
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          console.log("Response", response);
          // Handle the success response here, update the UI, etc.
          fetchChapters()
        })
        .catch((error) => {
          console.error(error);
          // Handle the error here
        });
    };
    
    const handleDelete = () => {
      // Find the subtopic to delete by ID
      const subtopicToDelete = subchapters.find((sub) => sub.id === subtopic.id);
      
      if (subtopicToDelete) {
        // Filter out the subtopic to delete from the subtopics array
        const updatedSubtopics = subchapters.filter((sub) => sub.id !== subtopicToDelete.id);
        
        // Make a PUT request to update the chapter's subtopics with the new data (excluding the deleted subtopic)
        axios.put(
          `https://edusync-backend.onrender.com/admin/updateChapter/${moduleId}/${chapterId}`,
          {
            subtopics: updatedSubtopics,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
          .then((response) => {
            console.log("Response", response);
            // Handle the success response here, update the UI, etc.
            fetchChapters()
          })
          .catch((error) => {
            console.error(error);
            // Handle the error here
          });
      }
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
    <div
      className="single-grid-admin" // Add the class here
      onClick={() => {
        localStorage.setItem("adminSubChapterId", subtopic.id);
        localStorage.setItem("adminSubChapter", subtopic.name);
        navigate("/admin/questions");
      }}
    >
            <div className="setttings" onClick={(e) => e.stopPropagation()}>
          <Dropdown menu={{ items }} trigger={["click"]} open={null}>
            <MoreVertSharpIcon />
          </Dropdown>
        </div>
    <div className="left-side-grid-admin">
        <p>{subtopic.id}</p>
        </div>
        <div className="right-side-grid-admin">
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={newModuleName}
            onChange={(e) => { setNewModuleName(e.target.value)}}
            onClick={(e)=>{e.stopPropagation();}}
          />
          
        ) : (
      <p key={subtopic.id}>{subtopic.name}</p>
        )}
        {isEditing && (
          <button className="save-button-admin" onClick={handleSaveClick}>
           &nbsp;&nbsp; <TrendingFlatSharpIcon/>
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleGrid;