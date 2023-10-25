import React, { useEffect, useState } from "react"
import  "./AdminHomeComp.css"
import axios from "axios";
import SingleCard from "./singleCard/singleCard";
import Navbar from "../../Layouts/Navbar/Navbar";
import EastIcon from '@mui/icons-material/East';
import addImg from "../../Assets/photo_6176814724801476459_x.jpg";
import { Alert, Box, Grid, Input, InputAdornment, Snackbar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ModalComp from "./AddModuleModel/Modal";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const AdminHomeComp = (props) => {
    const navigate=useNavigate();
    const [modules,setModules] = useState([]);
    const [addModuleOpen,setModuleOpen]=useState(false);
    const [allLoading,setAllLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [toastOpen, setToastOpen] = useState(false);

    const [searchInput, setSearchInput] = useState(""); 
    const [searchModules,setSearchModules] = useState([]);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        setToastOpen(false);
        return;
      }
    }

    const fetchModules = async()=>{
try {
      await axios.get('https://edusync-backend.onrender.com/module/',{
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

    const handleSubmit = async (e,moduleName) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('https://edusync-backend.onrender.com/admin/addModule', {
            name:moduleName,
            description:moduleName,
          },
          {
            headers:{
              Authorization: localStorage.getItem("token"), // Include your authorization token here
   
            }
          });
    
          if (response.data.success) {
            
            // alert('Module added successfully');
            setModuleOpen(false);
            fetchModules()
          } else {
            setErrors({error:'Failed to add module'});
            setToastOpen(true);
          }
        } catch (error) {
          console.error('Error:', error);
          setErrors({heading:'An error occurred while adding the module',error});
          setToastOpen(true);
        }
      };
    
    useEffect(()=>{
fetchModules();

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
        <Navbar isAdmin={true} />
        
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
        <div className="addingButton">
         <button onClick={()=>{setModuleOpen(true)}}> Add <AddIcon/></button>
        </div>
        </div>
{
  allLoading ? (
    <p>Loading...</p> // Display a loading indicator while data is being fetched
  ):(
    <div className="all-courses-content">
  <Box sx={{ flexGrow: 1 }}>
    <Grid
      container
      // spacing={{ xs: 2, sm: 2, md: 3 }}
      // columns={{ xs: 4, sm: 6, md: 12 }}
       rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      style={{ paddingBottom: "3vh" }}
    >
      {searchInput !== "" ? (
        searchModules.map((module, _i) => {
          const borderLeftColor =
            _i % 3 === 1 ? "#7A00F3" : _i % 3 === 2 ? "#EB8338" : "#569bf7";

          // Calculate a lighter shadow color
          const lighterShadowColor = `rgba(${parseInt(
            borderLeftColor.slice(1, 3),
            16
          )}, ${parseInt(borderLeftColor.slice(3, 5), 16)}, ${parseInt(
            borderLeftColor.slice(5, 7),
            16
          )}, 0.5)`;

          return (
            <Grid item xs={6}  key={module.id}>
              <SingleCard
                module={module}
                style={{
                  borderLeft: `10px solid ${borderLeftColor}`,
                  boxShadow: `0 5px 10px ${lighterShadowColor}`,
                }}
                tiltedColor={{backgroundColor:`${borderLeftColor}`}}
              />
            </Grid>
          );
        })
      ) : (
        modules.map((module, _i) => {
          const borderLeftColor =
            _i % 3 === 1 ? "#7A00F3" : _i % 3 === 2 ? "#EB8338" : "#569bf7";

          // Calculate a lighter shadow color
          const lighterShadowColor = `rgba(${parseInt(
            borderLeftColor.slice(1, 3),
            16
          )}, ${parseInt(borderLeftColor.slice(3, 5), 16)}, ${parseInt(
            borderLeftColor.slice(5, 7),
            16
          )}, 0.5)`;

          return (
            <Grid item xs={12} sm={6} md={4} key={module.id}>
              <SingleCard
                module={module}
                style={{
                  borderLeft: `10px solid ${borderLeftColor}`,
                  boxShadow: `0 5px 10px ${lighterShadowColor}`,
                }}
                tiltedColor={{backgroundColor:`${borderLeftColor}`}}
              />
            </Grid>
          );
        })
      )}
      <Grid item xs={12} sm={6} md={4} >
      <div key={module?.id} className="single-card-plus" style={{background:"#ced4da"}} onClick={()=>{setModuleOpen(true)}}>
      <h3 ><img className="addImg" src={addImg} alt=""/></h3>
        </div>
      </Grid>

    </Grid>
  </Box>
</div>

  )
}
        </div>
        <ModalComp
          
          modalOpen={addModuleOpen}
          setModalOpen={setModuleOpen}
          handleSubmit={handleSubmit}
         />

<Snackbar open={toastOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <ul>
              {Object.entries(errors).map(([key, value]) => (
                <li key={key}>
                  {value}
                </li>
              ))}
            </ul>
          </Alert>
        </Snackbar>
      </div>
    )
  };

export default AdminHomeComp;
