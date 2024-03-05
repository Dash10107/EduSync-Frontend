import React from "react";
import "./singleGrid.css";
import { useNavigate } from "react-router-dom";

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
    <div className="left-side-grid">
        {/* <p>{subtopic.id}</p> */}
        </div>
        <div className="right-side-grid  text-lg">
      <p key={subtopic.id}>{subtopic.name}</p>
      </div>
    </div>
  );
};

export default SingleGrid;
