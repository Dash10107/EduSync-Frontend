import React from "react"

// import newleft from "../../../Assets/newlef.png"
// import newright from "../../../Assets/newright.png";
import finalleft from "../../../Assets/finalleft.png"
import finalright from "../../../Assets/finalright.png";
import "./Zigzag.css"
const Zigzag = (props) => {
  const {position,style} = props;
    return (
<div className="border-img" style={style}>
{
  position==="left"?<img className="leftImg" src={finalleft} alt=""/>:
  position==="right"?<img className="rightImg" src={finalright} alt=""/>:
  <img className="centerImg" src={finalright} alt=""/>
}
</div>
      );
};

export default Zigzag;