import React from "react"
import  "./GridView.css"
import SingleGrid from "./singleGrid/singleGrid";
import { Box, Grid } from "@mui/material";

const GridView = (props) => {

    const {subchapters} = props;


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {subchapters.map((subtopic, index) => (
    <Grid xs={6} sm={4} md={6} key={index}> 
    
    <SingleGrid subtopic={subtopic} />
    </Grid>
  ))}
</Grid>
</Box>
    </div>
  )
};

export default GridView;
