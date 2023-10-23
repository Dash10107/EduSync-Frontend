import React from "react"
import left from "../../Assets/left.jpg"
import right from "../../Assets/right.jpg";
import "./Zigzag.css"
const Zigzag = (props) => {
  const {position} = props;
    return (
<div className="border-img">
{
  position==="left"?<img className="leftImg" src={left} alt=""/>:
  position==="right"?<img className="rightImg" src={right} alt=""/>:
 <></> 
}
</div>
      );
};

export default Zigzag;
