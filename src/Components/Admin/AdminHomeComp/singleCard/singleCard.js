import React, { useState } from "react";
import "./singleCard.css";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';
import axios from "axios";
const SingleCard = (props) => {
  const { module, style, tiltedColor ,fetchModules} = props;
  const navigate = useNavigate();

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
    `https://edu-sync-backend.vercel.app/admin/updateModule/${module.id}`,
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
 fetchModules();
  };

  const handleDelete = async(e) => {
    e.stopPropagation();
    // Make the DELETE request to delete the chapter
await axios.delete(`https://edu-sync-backend.vercel.app/admin/deleteModule/${module.id}`, {
headers: {
  Authorization: localStorage.getItem("token"), // Replace with your authorization token
},
})
.then((response) => {
  console.log("Chapter deleted successfully:", response.data);
  fetchModules();
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
    <div>
      <div
        key={module?.id}
        className="single-card"
        style={style}
        onClick={() => {
          localStorage.setItem("adminModuleId", module.id);
          localStorage.setItem("adminModuleName", module.id);
          navigate("/admin/chapter");
        }}
      >
        <div className="tilted-div" style={tiltedColor}></div>
        <div className="setttings" onClick={(e) => e.stopPropagation()}>
          <Dropdown menu={{ items }} trigger={["click"]} open={null}>
            <MoreVertSharpIcon />
          </Dropdown>
        </div>

        {/* Render an input field when in edit mode, otherwise render the h3 */}
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={newModuleName}
            onChange={(e) => { setNewModuleName(e.target.value)}}
            onClick={(e)=>{e.stopPropagation();}}
          />
        ) : (
          <h3 className="single-card-title">{module?.name}</h3>
        )}

        {/* Render Save button when in edit mode */}
        {isEditing && (
          <button className="save-button" onClick={handleSaveClick}>
           &nbsp;&nbsp; <TrendingFlatSharpIcon/>
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleCard;