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
    const [teacherName,setTeacherName] = useState("");
    const [studentNames,setStudentNames] = useState([]);
    const [results,setTestsResults] = useState([]);
    const [forms,setForms] = useState([]);
    const code = localStorage.getItem("classroomCode");
   
    const fetchClassroom = async () => {
        setLoading(true);
        try {
    
          await axios.get(`https://edusync-backend.onrender.com/subadmin/classroom/${code}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              const classroom = response?.data?.classroom;
              
              setClassroom(classroom);
                console.log('Classroom',classroom);
      // Use Promise.all to wait for both fetchUserDetail and fetchStudentDetail
       Promise.all([
        fetchUserDetail(classroom.faculty),
        fetchStudentDetail(classroom.students)
      ]);
                
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


      const fetchUserDetail = async (userId) => {
       
        try {
    
          await axios.get(`https://edusync-backend.onrender.com/users/user-details/${userId}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              setTeacherName(response.data.User?.name)
                
            } else {
              console.log("Status Code", response.status);
            }
          });
        } catch (error) {
          console.log("error", error);
        }
      }


      const fetchStudentDetail = async (userIds) => {
       
        try {
    
          await axios.post(`https://edusync-backend.onrender.com/users/user-details`,{
            ids:userIds
          }, {
            headers: {
              Authorization: localStorage.getItem("token"),
            }
          }).then(response => {
            console.log("Response", response);
    
            if (response.status === 200) {
              setStudentNames(response.data.users)
                
            } else {
              console.log("Status Code", response.status);
            }
          });
        } catch (error) {
          console.log("error", error);
        }
      }

      
      

    useEffect(()=>{fetchClassroom()},[])
    useEffect(()=>{setTestsResults(clasroom.test)},[clasroom]);
    useEffect(()=>{setForms(clasroom.forms)},[clasroom]);
  return (
<div className="page-container h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar  />
        <div className='flex'>
          <div className='w-[20%] h-screen lg:block hidden'>
            <div className='h-[20%]'></div>
            <div className='h-[35%]'>
              <SupriseTest clasroom={clasroom} forms={forms} />
            </div>
            <div className='h-[35%]'>
              <TestResults clasroom={clasroom} results={results}  />
            </div>
          </div>
          <div className='lg:w-[80%] flex justify-center w-full'>
            <Main clasroom={clasroom} results={results}  forms={forms} teacherName={teacherName} studentNames={studentNames} />
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
