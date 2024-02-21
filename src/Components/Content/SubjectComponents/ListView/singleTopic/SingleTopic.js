import React from "react";
import "./SingleTopic.css";
import { useNavigate } from "react-router-dom";

const SingleTopic = (props) => {
  const { subtopic } = props;
  const navigate = useNavigate();

  return (
    <div
      className="single-topic" // Add the class here
      onClick={() => {
        localStorage.setItem("subChapterId", subtopic.id);
        localStorage.setItem("SubChapter", subtopic.name);
        navigate("/questions");
      }}
    >
    <p>{subtopic.id}</p>
      <p key={subtopic.id}>{subtopic.name}</p>
    </div>
  );
};

export default SingleTopic;
