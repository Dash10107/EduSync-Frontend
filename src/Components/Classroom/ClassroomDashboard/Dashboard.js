import React, { useEffect, useState } from "react"
import  "./Dashboard.css"
import Navbar from "../../../Layouts/Navbar/Navbar";
import axios from "axios";
import CardLayout from "./CardLayout";
import EastIcon from '@mui/icons-material/East';
import AddIcon from '@mui/icons-material/Add';
import ModalComp from "./AddModuleModel/Modal";
import { Alert, Box, Snackbar,Skeleton } from "@mui/material";
import Loader from "../../../Layouts/Loader/Loader";
import Footer from "../../../Layouts/Footer/Footer";




const Dashboard = (props) => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading,setLoading] = useState(false);
  const [modalOpen,setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastOpen, setToastOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setToastOpen(false);
      return;
    }
  }
  const fetchClassrooms = async () => {
    setLoading(true);
    try {

      await axios.get('https://edu-sync-backend.vercel.app/subadmin/classrooms/student', {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }).then(response => {
        console.log("Response", response);

        if (response.status === 200) {
          const classroomsArray = response?.data?.classrooms;
          setClassrooms(classroomsArray);
          console.log(classroomsArray);
        } else {
          console.log("Status Code", response.status);
        }
      });
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false);
    }
  }

  const handleSubmit = async (e,code) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://edu-sync-backend.vercel.app/subadmin/classrooms/${code}/addstudents`,{},
      {
        headers:{
          Authorization: localStorage.getItem("token"), // Include your authorization token here

        }
      });

      if (response.data.success) {
        
        // alert('Module added successfully');
        setModalOpen(false);
        fetchClassrooms()
      } else {
        setErrors({error:'Failed to add module'});
        setToastOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({heading:'An error occurred while adding the module'});
      setToastOpen(true);
    }
  };
  useEffect(()=>{
    fetchClassrooms();
  },[]);



  return (
    <div>
          <Navbar />

 <div className="subbar">

        <p >Your Classrooms  <EastIcon /> </p>
       
        <div className="addingButton" onClick={()=>{console.log(modalOpen) ;setModalOpen(true)}}>
         <button > Join  <AddIcon/></button>
        </div>
 </div>
 <div className="all-classrooms">
 {
  loading ? (
    [1, 2, 3].map((index) => (
     
          <Box key={index} sx={{ pt: 0.5, width: '100%', maxWidth: '400px',     margin: '0 auto 10px',
    height: { xs: '100px', sm: '150px', md: '200px' }, }}>
             <Skeleton height="100%" width={{ xs: '80%', sm: '70%', md: '60%' }} />
                <Skeleton width={{ xs: '80%', sm: '70%', md: '60%' }} />
              </Box>
              
            ))
    
  ):(
 <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-10 justify-center px-6 md:px-8 xl:px-12'>
 
    { classrooms?.map(clasroom=>(<>
      <CardLayout clasroom={clasroom} />
      </>

    ))}
   
    </div>
  )}
 </div>
          <ModalComp
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
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
        <Footer/>
    </div>
  )
};

export default Dashboard;
