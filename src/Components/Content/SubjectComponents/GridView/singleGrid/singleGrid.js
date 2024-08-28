import React from "react";
import "./singleGrid.css";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const SingleGrid = (props) => {
  const { subtopic } = props;
  const navigate = useNavigate();

  return (
    <div
      className="single-grid w-[60%] "// Add the class here
      onClick={() => {
        localStorage.setItem("subChapterId", subtopic.id);
        localStorage.setItem("SubChapter", subtopic.name);
        navigate("/questions");
      }}
    >
    <div className="left-side-grid ">
        <div className="flex lg:p-4 p-2 pb-1 text-2xl lg:text-4xl font-bold">{subtopic.id}</div>
        <Divider className="bg-white font-bold"/> 
      
        </div>
        <div className="right-side-grid font-semibold text-md lg:text-lg p-1 lg:p-5">
      <p key={subtopic.id}>{subtopic.name}</p>
      </div>
    </div>
  );
};

export default SingleGrid;
