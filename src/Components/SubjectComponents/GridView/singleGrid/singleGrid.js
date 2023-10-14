import React from "react";
import "./singleGrid.css";
import { useNavigate } from "react-router-dom";

const SingleGrid = (props) => {
  const { subtopic } = props;
  const navigate = useNavigate();

  return (
    <div
      className="single-grid" // Add the class here
      onClick={() => {
        localStorage.setItem("subChapterId", subtopic.id);
        localStorage.setItem("SubChapter", subtopic.name);
        navigate("/questions");
      }}
    >
      <p key={subtopic.id}>{subtopic.name}</p>
    </div>
  );
};

export default SingleGrid;
