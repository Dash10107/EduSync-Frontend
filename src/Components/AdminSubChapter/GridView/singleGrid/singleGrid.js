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
        localStorage.setItem("adminSubChapterId", subtopic.id);
        localStorage.setItem("adminSubChapter", subtopic.name);
        navigate("/admin/questions");
      }}
    >
    <div className="left-side-grid">
        <p>{subtopic.id}</p>
        </div>
        <div className="right-side-grid">
      <p key={subtopic.id}>{subtopic.name}</p>
      </div>
    </div>
  );
};

export default SingleGrid;
