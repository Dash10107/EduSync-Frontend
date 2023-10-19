import React from "react"
import  "./SingleModule.css"
import { Progress } from "antd";

const SingleModule = (props) => {
    const {index,module,onClick}=props;
        const progressPercentage = module.moduleProgressPercentage || module.progressPercentage || module.correctPercentage; 
    const title = module.moduleName || module.chapterName || props?.Subchapter?.name;

    console.log('props.subchapterName',props.subchapterName);
    
  return (
    <div className="" key={index}>
            <div className="progress-card" onClick={onClick} >
  <div className="progress-container">
    <Progress
      type="circle"
      percent={Number(progressPercentage).toFixed(2)}
      strokeColor="#e92061" // Set the color to your desired col
      format={() => `${Number(progressPercentage).toFixed(2)}%`}
      size={100}
      trailColor="#5f3d9b" // Set the color of the empty progress bar
    />
  </div>
  <div className="text-container">
    <p>{title}</p>
  </div>
</div>
    
    </div>
  )
};

export default SingleModule;
