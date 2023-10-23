import React from "react"
import  "./SingleModule.css"
import { Progress } from "antd";

const SingleModule = (props) => {
    const {index,module,onClick}=props;
        const progressPercentage = module.moduleProgressPercentage || module.progressPercentage || module.correctPercentage || 0.00; 
    const title = module.moduleName || module.chapterName || props?.Subchapter?.name;
    
  return (
    <div className="" key={index}>
            <div className="progress-card" onClick={onClick} >
  <div className="progress-container" style={{paddingLeft:"3vw"}}>
    <Progress
      type="circle"
      percent={Number(progressPercentage).toFixed(2)}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
      format={() => `${Number(progressPercentage).toFixed(2)}%`}
      size={window.innerWidth <= 600 ? 100 : 180} 
      trailColor="#fff" // Set the color of the empty progress bar
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
