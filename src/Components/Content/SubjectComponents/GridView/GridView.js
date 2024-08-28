import React from "react"
import  "./GridView.css"
import SingleGrid from "./singleGrid/singleGrid";
import { Box, Grid } from "@mui/material";

const GridView = (props) => {

    const {subchapters} = props;


  return (
    <div className=" main-grid">
      {subchapters.map((subtopic, index) => (
      
          <SingleGrid subtopic={subtopic} />
     
      ))}
    </div>

  )
};

export default GridView;
