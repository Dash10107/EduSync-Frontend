import React, { useState } from 'react';
import CardLayout from './CardLayout';
import PendingList from './PendingList';
import { Box, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ModalComp from './AddModuleModel/Modal';
import axios from 'axios';

function Left({classrooms,loading,feedbacks,fetchFeedbacks,fetchClassrooms}) {

    const [modalOpen,setModalOpen] = useState(false);

    const handleSubmit = async (e,name) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`https://edusync-backend.onrender.com/subadmin/addlassrooms`,{
          name:name,
        },
        {
          headers:{
            Authorization: localStorage.getItem("token"), // Include your authorization token here
  
          }
        });
  
        if (response.data.success) {
          
          // alert('Module added successfully');
          setModalOpen(false);
          fetchClassrooms()
        } 
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <>
    <div className='px-4 py-6 md:p-8 lg:p-10 flex justify-between'>
      <span className='text-lg md:text-lg lg:text-xl xl:text-2xl font-medium'>Your Classrooms {'->'} </span>
      <div className="addingButton text-lg md:text-lg lg:text-xl xl:text-2xl" onClick={()=>{console.log(modalOpen) ;setModalOpen(true)}}>
         <button > Create  <AddIcon className='text-lg md:text-lg lg:text-xl xl:text-2xl'/></button>
        </div>
    </div>
    <div className='grid md:grid-cols-2 xl:grid-cols-3 justify-center px-6 md:px-8 xl:px-12'>
    {
     
      loading?(
        [1, 2, 3].map((index) => (
          <Box key={index} sx={{ pt: 0.5, width: '100%', maxWidth: '400px',     margin: '0 auto 10px',
    height: { xs: '100px', sm: '150px', md: '200px' }, }}>
             <Skeleton height="100%" width={{ xs: '80%', sm: '70%', md: '60%' }} />
                <Skeleton width={{ xs: '80%', sm: '70%', md: '60%' }} />
              </Box>
            ))

      ):(
         classrooms?.map(clasroom=>(<>
      <CardLayout clasroom={clasroom} />
      </>

    ))
    )}
   
    </div>
    <div className='px-4 py-6 md:p-8 lg:p-10'>
      <span className='text-lg md:text-lg lg:text-xl xl:text-2xl font-medium'>Pending Works {'->'} </span>
    </div>
    <div className='px-6 md:mx-12 lg:grid lg:grid-cols-2 md:px-8 xl:px-12'>
    {feedbacks?.map((feedback)=>(<PendingList fetchFeedbacks={fetchFeedbacks} feedback={feedback} />))}

    </div>
          <ModalComp
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleSubmit={handleSubmit}
         />
    </>
  );
}

export default Left;
