import React from "react"
import  "./SingleVideo.css"

const SingleVideo = (props) => {
    const {url,index} = props
  return (
    <div key={index}>
    <video controls width="400">
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  )
};

export default SingleVideo;
