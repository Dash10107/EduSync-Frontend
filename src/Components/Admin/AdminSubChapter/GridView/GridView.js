import React, { useState } from "react"
import  "./GridView.css"
import SingleGrid from "./singleGrid/singleGrid";
import { Box, Grid } from "@mui/material";
//import addSubChapImg from "../../../../../Assets/addChap.png";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
const GridView = (props) => {

    const {subchapters,fetchChapters,setSubChapterOpen} = props;

  

  return (
    <div className="mainGrid">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {subchapters?.map((subtopic, index) => (
    <Grid xs={6} sm={4} md={6} key={index}> 
    
    <SingleGrid subtopic={subtopic} fetchChapters={fetchChapters} subchapters={subchapters} />
    </Grid>
  ))}
  <Grid 
    xs={6} sm={4} md={6}
  />
  <div className="single-grid-add" onClick={()=>{setSubChapterOpen(true)}}>
{/* <img className="addSubChapImg" src={addSubChapImg} alt=""/> */}
<AddIcon  fontSize="large"/>
  </div>
  <div>

  </div>
</Grid>
</Box>
    </div>
  )
};

export default GridView;
