import React, { useEffect, useState } from "react"
import  "./Home.css"
import axios from "axios";
import SingleCard from "./singleCard/singleCard";
import Navbar from "../../../Layouts/Navbar/Navbar";
import EastIcon from '@mui/icons-material/East';
import { Box, Grid, Input, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Loader from "../../../Layouts/Loader/Loader";
import Footer from "../../../Layouts/Footer/Footer";
const Content = (props) => {
    const [modules,setModules] = useState([]);
    const [continueLoading, setContinueLoading] = useState(true);  
    const [allLoading,setAllLoading] = useState(true);
    const [progressIds,setProgressIds] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 
    const [searchModules,setSearchModules] = useState([]);
    const fetchModules = async()=>{
      setAllLoading(true);
try {
      await axios.get('https://edu-sync-backend.vercel.app/module/',{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }).then(response => {
        console.log("Response",response);
        
        if(response.status===200){

          const modulesData = response?.data;
          setModules(modulesData);
          console.log(modules);
         

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
      setContinueLoading(true);
      try {
        await axios.get('https://edu-sync-backend.vercel.app/progress/',{
          headers: {
            Authorization: localStorage.getItem("token"),
          }
         }).then(response => {
          console.log("Response",response);
          
          if(response.status===200){
            console.log(response);
            let progressData = response?.data?.progressData
            // Extract the moduleId values from the last 3 entries of user's progress data
            const lastThreeProgress = progressData.slice(-3);
             const moduleIds = lastThreeProgress.map((progress) => progress.moduleId);
            setProgressIds(moduleIds);           
  
          }else{console.log("Status Code",response.status);
          }
         
        })
      } catch (error) {
        console.log("error", error)
      }finally {
        // Set loading to false when data fetching is complete
        setContinueLoading(false);
      }
    }
    useEffect(()=>{
fetchModules();
fetchProgress();
    },[]);

      // Event handler for updating the search input value
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

    // Filter modules based on search input
    useEffect(() => {
      // Filter modules based on the search input value
      const searchedModulesData = modules.filter((module) =>
        module.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchModules(searchedModulesData)
    }, [searchInput, modules]);


    return (
      <div>
        <Navbar />
        
        <div className="continue-courses-main">
          <p className="continue-courses-header">Continue With Courses  <EastIcon /></p>
          { continueLoading===true ? (
           <Loader/>
          ) : (
            <div className="continue-courses-content">
              <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      style={{ paddingBottom: "3vh" }}
    >
            {modules
              .filter((module) => progressIds.includes(module.id)) // Filter modules based on progressIds
              .map((module, _i) => {


                return (
                  <Grid item xs={12} sm={6} md={4} key={module.id}>
                  <SingleCard
                    module={module}

                    key={module.id}
                  />
                  </Grid>
                );
              })}
              </Grid>
    </Box>
            </div>
          )}
        </div>


        <div className="all-courses-main">
        <div className="all-courses-title">
        <p >All Courses  <EastIcon /> </p>
        <Input disableUnderline={true} className='search-input-for-home'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon className='searchicon' />
                </InputAdornment>
              }
              placeholder='Search' type="text"
            value={searchInput} // Bind the input value to the state
            onChange={handleSearchInputChange} // Handle input changes
            >

            </Input>
        
        </div>
{
  allLoading ? (
    <Loader/>// Display a loading indicator while data is being fetched
  ):(
    <div className="all-courses-content">
  <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      // spacing={{ xs: 2, sm: 2, md: 3 }}
      // columns={{ xs: 4, sm: 6, md: 12 }}
       rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ paddingBottom: "3vh" }}
    >
      {searchInput !== "" ? (
        searchModules.map((module, _i) => {


          return (
            <Grid item xs={6}  key={module.id}>
              <SingleCard
                module={module}

              />
            </Grid>
          );
        })
      ) : (
        modules.map((module, _i) => {

          return (
            <Grid item xs={12} sm={6} md={4} key={module.id}>
              <SingleCard
                module={module}
              />
            </Grid>
          );
        })
      )}
    </Grid>
  </Box>
</div>

  )
}
        </div>
        <Footer/>
      </div>
    )
  };

export default Content;
