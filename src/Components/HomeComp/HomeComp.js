import React, { useEffect, useState } from "react"
import  "./HomeComp.css"
import axios from "axios";
import Navbar from "../../Layouts/Navbar/Navbar";
import Left from "./Left";
import Chat from "./Chat";
import MobileChat from "./MobileChat";
import Footer from "../../Layouts/Footer/Footer";

const HomeComp = (props) => {

  const [modules,setModules] = useState([]);
  const [allLoading,setAllLoading] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [loading,setLoading] = useState(false);
  const [chatLoading,setChatLoading] = useState(false);
const [chatArray,setChatArray] = useState([
  { type: 'result', content: 'Hello,How can I Help You ?' },
])

  const submitChat= async(promp)=>{
    setChatLoading(true);
    try {

    if(promp===""){
      console.log('Please Enter a Prompt');
      
      return;
    }

    const response = await axios.post(
      'https://edu-sync-backend.vercel.app/feedandnotice/chatbot',
      {
        prompt:promp
      },{
        headers: {
          Authorization: localStorage.getItem("token"),
        }
       }
    );
    console.log("Response",response)

    if(response.status===200){
    const result = response.data; // response.data is used to get the data from the response
    console.warn('Result', result);
   setChatArray([...chatArray,{type:"prompt",content:promp},{type:"result",content:result.response}])

   
    }
  }catch (error) {
      console.log('Error',error);
           
    }finally{
      setChatLoading(false);
    }

  }

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
        setModules(modulesData.slice(0,3));
        console.log(modulesData);
       

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
          let lastThreeClassrooms = [];
          if (classroomsArray && classroomsArray.length >= 3) {
            // Shuffle the array randomly
            const shuffledClassrooms = classroomsArray.sort(() => Math.random() - 0.5);
          
            // Get the last three classrooms
             lastThreeClassrooms = shuffledClassrooms.slice(-3);
          
            console.log("Randomly selected last three classrooms:", lastThreeClassrooms);
          } else {
            console.log("Not enough classrooms to select from.");
            lastThreeClassrooms = classroomsArray
          }
          setClassrooms(lastThreeClassrooms);
          
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
  
  useEffect(()=>{fetchModules();fetchClassrooms()},[])
  return (
    <div>
    <Navbar/>
    <div className='xl:flex'>
      <div className='xl:w-[70%] w-[100%]'>
        <Left modules={modules} allLoading={allLoading} loading={loading} classrooms={classrooms} />
      </div>
      <div className='w-[30%] hidden xl:block border-l-2 h-screen'>
        <Chat   chatArray={chatArray} setChatArray={setChatArray} chatLoading={chatLoading} submitChat={submitChat} />
      </div>
      <div className='w-[30%] block xl:hidden'>
        <MobileChat   chatArray={chatArray} setChatArray={setChatArray} chatLoading={chatLoading} submitChat={submitChat} />
      </div>
     </div>
    <Footer/>
    </div>
  )
};

export default HomeComp;


