import React, { useEffect, useState } from 'react'
import Navbar from '../../../Layouts/Navbar/Navbar'
import Left from './Left'
import Footer from '../../../Layouts/Footer/Footer'
import axios from 'axios'
import { Box, Skeleton } from '@mui/material'

const SubAdminComp = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading,setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchClassrooms = async () => {
        setLoading(true);
        try {
    
          await axios.get('https://edusync-backend.onrender.com/subadmin/classrooms', {
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

      const fetchFeedbacks = async () => {
    
        try {
    
          await axios.get('https://edusync-backend.onrender.com/feedandnotice/get-feedbacks', {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              const feedbackArray = response?.data?.feedbacks;
              setFeedbacks(feedbackArray);
              
            } else {
              console.log("Status Code", response.status);
            }
          });
        } catch (error) {
          console.log("error", error);
        }
      }

      useEffect(()=>{
        fetchClassrooms();
        fetchFeedbacks();
      },[]);

  return (
    <div>
        <div>
    <Navbar/>
    <div className='xl:flex'>
      <div className='xl:w-[100%] w-[100%]'>
        <Left classrooms={classrooms} loading={loading} fetchFeedbacks={fetchFeedbacks} fetchClassrooms={fetchClassrooms} feedbacks={feedbacks} />
      </div>
      {/* <div className='w-[30%] hidden xl:block border-l-2 h-screen'>
        <Chat   chatArray={chatArray} setChatArray={setChatArray} chatLoading={chatLoading} submitChat={submitChat} />
      </div>
      <div className='w-[30%] block xl:hidden'>
        <MobileChat   chatArray={chatArray} setChatArray={setChatArray} chatLoading={chatLoading} submitChat={submitChat} />
      </div> */}

     </div>
    <Footer/>
    </div>
      
    </div>
  )
}

export default SubAdminComp
