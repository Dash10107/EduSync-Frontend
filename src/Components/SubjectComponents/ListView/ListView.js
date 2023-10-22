import React from "react"
import  "./ListView.css"

import Loader from "../../../Layouts/Loader/Loader";
import SingleVideo from "../Video/SingleVideo";
import { Box, Grid } from "@mui/material";

const ListView = (props) => {
   
const {videosName,videoUrls} = props;
    return (
<div className="videosMainDiv">
<Box sx={{ flexGrow: 1 }}>
        <Grid container       
         spacing={{ xs: 2, sm: 2, md: 3 }}
       columns={{ xs: 4, sm: 6, md: 12 }}
      >
      {videoUrls && videoUrls.length > 0 ? (
        videoUrls.map((url, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}> 
         <SingleVideo url={url} index={index} videoName={videosName[index]}/>
         </Grid>
        ))
      ) : (
        <Loader/>
      )}
      </Grid>
      </Box>
      </div>
  )
};

export default ListView;
