import React from "react";
import "./SingleVideo.css";

const SingleVideo = (props) => {
  const { url, index, videoName } = props;

  // Remove the ".mp4" extension and unnecessary parts from videoName.name
  let displayName = videoName.name.replace(".mp4", "");
  displayName = displayName.replace(/\([\d]+\)|-\d+/g, "");

  return (
    <div className="video-container" key={index}>
      <video controls width="100%">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="video-title">{displayName}</p>
    </div>
  );
};

export default SingleVideo;
