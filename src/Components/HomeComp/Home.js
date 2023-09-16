import React, { useEffect, useState } from "react"
import  "./Home.css"
import axios from "axios";
import SingleCard from "./singleCard/singleCard";
import Navbar from "../../Layouts/Navbar/Navbar";
import EastIcon from '@mui/icons-material/East';
import { Box, Grid } from "@mui/material";

const Home = (props) => {
    const [modules,setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  
    const [allLoading,setAllLoading] = useState(true);
    const [filteredModules, setFilteredModules] = useState([]); 
    const fetchModules = async()=>{
try {
      await axios.get('http://localhost:5000/module/',{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }).then(response => {
        console.log("Response",response);
        
        if(response.status===200){

          const modulesData = response?.data;
          setModules(modulesData);
          console.log(modules);
          fetchProgress();

        }else{console.log("Status Code",response.status);
        }
       
      })
    } catch (error) {
      console.log("error", error)
    }finally {
      // Set loading to false when data fetching is complete
      setAllLoading(false);
    }
    }

    const fetchProgress = async()=>{
      try {
        await axios.get('http://localhost:5000/progress/',{
          headers: {
            Authorization: localStorage.getItem("token"),
          }
         }).then(response => {
          console.log("Response",response);
          
          if(response.status===200){
            console.log(response);
            let progressData = response?.data?.progress
            // Extract the moduleId values from the last 3 entries of user's progress data
            const lastThreeProgress = progressData.slice(-3);
            const moduleIds = lastThreeProgress.map((progress) => progress.moduleId);

            // Filter the modules array based on the extracted moduleIds
            const filteredModulesData = modules.filter((module) =>
              moduleIds.includes(module.id)
            );

            setFilteredModules(filteredModulesData);
            
  
          }else{console.log("Status Code",response.status);
          }
         
        })
      } catch (error) {
        console.log("error", error)
      }finally {
        // Set loading to false when data fetching is complete
        setIsLoading(false);
      }
    }
    useEffect(()=>{
fetchModules();

    },[]);




    return (
      <div>
        <Navbar />
        <div className="continue-courses-main">
          <p className="continue-courses-header">Continue With Courses  <EastIcon /></p>
          {isLoading ? (
            <p>Loading...</p> // Display a loading indicator while data is being fetched
          ) : (
            <div className="continue-courses-content">
              {filteredModules?.map((module,_i) => {

                const borderLeftColor =
        _i % 3 === 1 ? "#7A00F3" : _i % 3 === 2 ? "#EB8338" : "#569bf7";

               console.log(module)
                return(
                <SingleCard module={module} style={{ height: "22vh", width: "24vw",    borderLeft: `10px solid ${borderLeftColor}`, }} />
              )
              })}
            </div>
          )}
        </div>


        <div className="all-courses-main">
        <p className="all-courses-title">All Courses  <EastIcon /> </p>
{
  allLoading ? (
    <p>Loading...</p> // Display a loading indicator while data is being fetched
  ):(
    <div className="all-courses-content">
       
       <Box sx={{ flexGrow: 1 }}>
<Grid
 container
 spacing={{ xs: 2, md: 3 }}
 columns={{ xs: 4, sm: 8, md: 12 }}
 style={{ paddingBottom: "3vh" }}
>
 {modules?.map((module, _i) => {
   const borderLeftColor =
     _i % 3 === 1 ? "#7A00F3" : _i % 3 === 2 ? "#EB8338" : "#569bf7";

   return (
     <Grid item xs={12} sm={6} md={4} key={module.id}>
       <SingleCard
         module={module}
         style={{
           borderLeft: `10px solid ${borderLeftColor}`,
         
         }}
       />
     </Grid>
   );
 })}
</Grid>
</Box>

   </div>
  )
}
        </div>
      </div>
    )
  };

export default Home;
