import React, { useEffect, useState } from 'react'
import Navbar from '../../../Layouts/Navbar/Navbar'
import SupriseTest from './SupriseTest'
import TestResults from './TestResults'
import Footer from '../../../Layouts/Footer/Footer'
import Main from './Main'
import axios from 'axios';

const SingleClassroom = () => {
    const [loading,setLoading] = useState(false);
    const [clasroom,setClassroom] = useState({});
    const code = localStorage.getItem("classroomCode");
    const fetchClassroom = async () => {
        setLoading(true);
        try {
    
          await axios.get(`http://localhost:5000/subadmin/classroom/${code}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              const classroom = response?.data?.classroom;
              setClassroom(classroom);
                console.log('Classroom',classroom);
                
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

    useEffect(()=>{fetchClassroom()},[])
  return (
<div className="page-container h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar />
        <div className='flex'>
          <div className='w-[20%] h-screen lg:block hidden'>
            <div className='h-[20%]'></div>
            <div className='h-[35%]'>
              <SupriseTest clasroom={clasroom} />
            </div>
            <div className='h-[35%]'>
              <TestResults clasroom={clasroom} />
            </div>
          </div>
          <div className='lg:w-[80%] flex justify-center w-full'>
            <Main clasroom={clasroom} />
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  )
}

export default SingleClassroom
